import {
  Effect,
  Schedule,
  Duration,
  pipe,
  Console,
  Cause,
} from "effect";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http";
import { YAML } from "bun";

// ── Docker compose helpers ──

export const extractHostPort = (
  yamlContent: string,
  serviceName: string,
): string | null => {
  try {
    const config = YAML.parse(yamlContent) as {
      services?: Record<string, { ports?: string[] }>;
    };
    const ports = config?.services?.[serviceName]?.ports;
    if (!ports || !Array.isArray(ports) || ports.length === 0) return null;
    const match = String(ports[0]).match(/^(\d+):/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

// ── Env file helpers ──

export const readEnv = (): string => {
  try {
    return require("fs").readFileSync(".env", "utf-8");
  } catch {
    return "";
  }
};

export const getEnvValue = (content: string, key: string): string | null => {
  const match = content.match(new RegExp(`^${key}=(.*)$`, "m"));
  return match ? match[1] : null;
};

export const setEnvValue = (content: string, key: string, value: string): string => {
  const line = `${key}=${value}`;
  if (content.includes(`${key}=`)) {
    return content.replace(new RegExp(`^${key}=.*$`, "m"), line);
  }
  return content.trimEnd() + "\n" + line + "\n";
};

export const writeEnv = (content: string) => {
  require("fs").writeFileSync(".env", content);
};

// ── API key extraction ──

export const extractApiKey = (xmlPath: string): Effect.Effect<string | null> =>
  Effect.sync(() => {
    try {
      const content = require("fs").readFileSync(xmlPath, "utf-8");
      const m = content.match(/<ApiKey>([^<]+)<\/ApiKey>/);
      return m ? m[1] : null;
    } catch {
      return null;
    }
  });

export const extractSeerrKey = (): Effect.Effect<string | null> =>
  Effect.sync(() => {
    try {
      const raw = require("fs").readFileSync(
        "config/seerr/settings.json",
        "utf-8",
      );
      const parsed = JSON.parse(raw);
      return parsed?.main?.apiKey ?? null;
    } catch {
      return null;
    }
  });

// ── HTTP helpers (accept optional debug flag) ──

export const apiPost = (url: string, key: string, body: unknown, debug = false) => {
  const req = pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.setHeader("X-Api-Key", key),
    HttpClientRequest.bodyJsonUnsafe(body),
    HttpClient.execute,
    Effect.flatMap(HttpClientResponse.filterStatusOk),
  );
  if (!debug) return req;
  return req.pipe(
    Effect.tap((res) =>
      Effect.sync(() =>
        console.error(`  \x1b[33m[debug]\x1b[0m POST ${url} → ${res.status}`),
      ),
    ),
    Effect.tapError((e) =>
      Effect.sync(() =>
        console.error(
          `  \x1b[33m[debug]\x1b[0m POST ${url} FAILED: ${String(e).slice(0, 120)}`,
        ),
      ),
    ),
  );
};

export const apiPut = (url: string, key: string, body: unknown, debug = false) => {
  const req = pipe(
    HttpClientRequest.put(url),
    HttpClientRequest.setHeader("X-Api-Key", key),
    HttpClientRequest.bodyJsonUnsafe(body),
    HttpClient.execute,
    Effect.flatMap(HttpClientResponse.filterStatusOk),
  );
  if (!debug) return req;
  return req.pipe(
    Effect.tap((res) =>
      Effect.sync(() =>
        console.error(`  \x1b[33m[debug]\x1b[0m PUT ${url} → ${res.status}`),
      ),
    ),
    Effect.tapError((e) =>
      Effect.sync(() =>
        console.error(
          `  \x1b[33m[debug]\x1b[0m PUT ${url} FAILED: ${String(e).slice(0, 120)}`,
        ),
      ),
    ),
  );
};

export const apiGet = (url: string, key: string, debug = false) => {
  const req = pipe(
    HttpClientRequest.get(url),
    HttpClientRequest.setHeader("X-Api-Key", key),
    HttpClient.execute,
    Effect.flatMap(HttpClientResponse.filterStatusOk),
  );
  if (!debug) return req;
  return req.pipe(
    Effect.tap((res) =>
      Effect.sync(() =>
        console.error(`  \x1b[33m[debug]\x1b[0m GET ${url} → ${res.status}`),
      ),
    ),
    Effect.tapError((e) =>
      Effect.sync(() =>
        console.error(
          `  \x1b[33m[debug]\x1b[0m GET ${url} FAILED: ${String(e).slice(0, 120)}`,
        ),
      ),
    ),
  );
};

export const apiGetJson = <T>(
  url: string,
  key: string,
  debug = false,
) =>
  pipe(
    apiGet(url, key, debug),
    Effect.flatMap((res) => res.json),
    Effect.map((v) => v as T),
  );

export const apiPostJson = <T>(
  url: string,
  key: string,
  body: unknown,
  debug = false,
) =>
  pipe(
    apiPost(url, key, body, debug),
    Effect.flatMap((res) => res.json),
    Effect.map((v) => v as T),
  );

export const homarrPost = (url: string, body: unknown, homarrKey: string, debug = false) => {
  const req = pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.setHeader("ApiKey", homarrKey),
    HttpClientRequest.bodyJsonUnsafe(body),
    HttpClient.execute,
  );
  if (!debug) return req;
  return req.pipe(
    Effect.tap((res) =>
      Effect.sync(() =>
        console.error(`  \x1b[33m[debug]\x1b[0m POST ${url} → ${res.status}`),
      ),
    ),
    Effect.tapError((e) =>
      Effect.sync(() =>
        console.error(
          `  \x1b[33m[debug]\x1b[0m POST ${url} FAILED: ${String(e).slice(0, 120)}`,
        ),
      ),
    ),
  );
};

// Ignore non-critical failures (root folder exists, already configured, etc.)
// In debug mode, logs the error to stderr.
export const ignoreFail = <A, E, R>(
  label: string,
  eff: Effect.Effect<A, E, R>,
  debug = false,
): Effect.Effect<void> =>
  eff.pipe(
    Effect.catchCause((cause) => {
      if (debug) {
        const msg = Cause.pretty(cause);
        console.error(
          `  \x1b[33m[debug]\x1b[0m ${label}: ${msg.slice(0, 200)}`,
        );
      }
      return Effect.void;
    }),
  );

export const qbtSetPreferences = (
  baseUrl: string,
  username: string,
  password: string,
  prefs: Record<string, unknown>,
) =>
  Effect.tryPromise(async () => {
    const loginRes = await fetch(`${baseUrl}/api/v2/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: baseUrl,
      },
      body: new URLSearchParams({ username, password }).toString(),
    });
    if (!loginRes.ok) {
      throw new Error(`qBittorrent login failed (${loginRes.status})`);
    }
    const text = (await loginRes.text()).trim();
    if (text && text !== "Ok.") {
      throw new Error(
        "qBittorrent authentication failed: invalid username or password",
      );
    }
    const setCookie = loginRes.headers.get("set-cookie");
    if (!setCookie) {
      throw new Error(
        "qBittorrent login succeeded but no SID cookie received",
      );
    }
    const sidMatch = setCookie.match(/(SID|QBT_SID_\d+)=([^;]+)/);
    if (!sidMatch) {
      throw new Error("No SID cookie found");
    }
    const cookieHeader = `${sidMatch[1]}=${sidMatch[2]}`;

    const prefsRes = await fetch(`${baseUrl}/api/v2/app/setPreferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ json: prefs }),
    });
    if (!prefsRes.ok) {
      throw new Error(
        `qBittorrent setPreferences failed (${prefsRes.status})`,
      );
    }
  });

// ── Jellyfin helpers (uses X-MediaBrowser-Token) ──

export const jellyfinPost = (
  url: string,
  key: string,
  body: unknown | null,
  debug = false,
) => {
  let req = pipe(HttpClientRequest.post(url));
  req = pipe(req, HttpClientRequest.setHeader("X-MediaBrowser-Token", key));
  if (body !== null) {
    req = pipe(req, HttpClientRequest.bodyJsonUnsafe(body));
  }
  req = pipe(req, HttpClient.execute, Effect.flatMap(HttpClientResponse.filterStatusOk));
  if (!debug) return req;
  return req.pipe(
    Effect.tap((res) =>
      Effect.sync(() =>
        console.error(`  \x1b[33m[debug]\x1b[0m JF POST ${url} → ${res.status}`),
      ),
    ),
    Effect.tapError((e) =>
      Effect.sync(() =>
        console.error(
          `  \x1b[33m[debug]\x1b[0m JF POST ${url} FAILED: ${String(e).slice(0, 120)}`,
        ),
      ),
    ),
  );
};

export const jellyfinGetJson = <T>(url: string, key: string, debug = false) =>
  pipe(
    jellyfinGet(url, key, debug),
    Effect.flatMap((res) => res.json),
    Effect.map((v) => v as T),
  );

export const jellyfinGet = (url: string, key: string, debug = false) => {
  let req = pipe(HttpClientRequest.get(url));
  req = pipe(req, HttpClientRequest.setHeader("X-MediaBrowser-Token", key));
  req = pipe(req, HttpClient.execute, Effect.flatMap(HttpClientResponse.filterStatusOk));
  if (!debug) return req;
  return req.pipe(
    Effect.tap((res) =>
      Effect.sync(() =>
        console.error(`  \x1b[33m[debug]\x1b[0m JF GET ${url} → ${res.status}`),
      ),
    ),
    Effect.tapError((e) =>
      Effect.sync(() =>
        console.error(
          `  \x1b[33m[debug]\x1b[0m JF GET ${url} FAILED: ${String(e).slice(0, 120)}`,
        ),
      ),
    ),
  );
};

// Wait for a service with retry (2s interval, up to 90 attempts = 3 min)
export const waitFor = (url: string, label: string) =>
  Effect.gen(function* () {
    yield* Console.log(`  Waiting for ${label}...`);
    yield* pipe(
      pipe(HttpClientRequest.get(url), HttpClient.execute),
      Effect.retry(
        pipe(
          Schedule.spaced(Duration.seconds(2)),
          Schedule.both(Schedule.recurs(90)),
        ),
      ),
    );
    yield* Console.log(`  ${label} ready`);
  });
