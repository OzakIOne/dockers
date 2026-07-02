import { Effect, Schedule, Duration, pipe, Layer, Console } from "effect";
import {
  HttpClient,
  HttpClientRequest,
  FetchHttpClient,
} from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";

const QB_USER = Bun.argv[2] || "admin";
const QB_PASS_ARG = Bun.argv[3] || "";
const HOMARR_KEY = Bun.env.HOMARR_API_KEY || "";
const DEBUG = Bun.env.DEBUG === "true" || Bun.env.LOG_LEVEL === "DEBUG";

// ── Helpers ──

const extractApiKey = (xmlPath: string): Effect.Effect<string | null> =>
  Effect.sync(() => {
    try {
      const content = require("fs").readFileSync(xmlPath, "utf-8");
      const m = content.match(/<ApiKey>([^<]+)<\/ApiKey>/);
      return m ? m[1] : null;
    } catch {
      return null;
    }
  });

const extractSeerrKey = (): Effect.Effect<string | null> =>
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

const seerrPost = (url: string, key: string, body: unknown) => {
  const req = pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.setHeader("X-Api-Key", key),
    HttpClientRequest.bodyUnsafeJson(body),
    HttpClient.execute,
  );
  if (!DEBUG) return req;
  return req.pipe(
    Effect.tap((res) =>
      Effect.sync(() =>
        console.error(
          `  \x1b[33m[debug]\x1b[0m POST ${url} → ${res.status}`,
        ),
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

const apiPost = (url: string, key: string, body: unknown) => {
  const req = pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.setHeader("X-Api-Key", key),
    HttpClientRequest.bodyUnsafeJson(body),
    HttpClient.execute,
  );
  if (!DEBUG) return req;
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

const apiPut = (url: string, key: string, body: unknown) => {
  const req = pipe(
    HttpClientRequest.put(url),
    HttpClientRequest.setHeader("X-Api-Key", key),
    HttpClientRequest.bodyUnsafeJson(body),
    HttpClient.execute,
  );
  if (!DEBUG) return req;
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

const homarrPost = (url: string, body: unknown) => {
  const req = pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.setHeader("ApiKey", HOMARR_KEY),
    HttpClientRequest.bodyUnsafeJson(body),
    HttpClient.execute,
  );
  if (!DEBUG) return req;
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
const ignoreFail = <A, E, R>(
  label: string,
  eff: Effect.Effect<A, E, R>,
): Effect.Effect<void> =>
  eff.pipe(
    Effect.catchAll((error) => {
      if (DEBUG) {
        const msg =
          error instanceof Error ? error.message : JSON.stringify(error);
        console.error(
          `  \x1b[33m[debug]\x1b[0m ${label}: ${msg.slice(0, 200)}`,
        );
      }
      return Effect.void;
    }),
  );

// Wait for a service with retry (2s interval, up to 90 attempts = 3 min)
const waitFor = (url: string, label: string) =>
  Effect.gen(function* () {
    yield* Console.log(`  Waiting for ${label}...`);
    yield* pipe(
      pipe(HttpClientRequest.get(url), HttpClient.execute),
      Effect.retry(
        pipe(
          Schedule.spaced(Duration.seconds(2)),
          Schedule.compose(Schedule.recurs(90)),
        ),
      ),
    );
    yield* Console.log(`  ${label} ready`);
  });

// ── Main program ──

const program = Effect.gen(function* () {
  // ---- Step 1: Create directories ----
  yield* Console.log("Creating directories...");
  yield* Effect.tryPromise(() =>
    Bun.$`mkdir -p config/{jellyfin,qbittorrent/qBittorrent,sonarr,radarr,homarr,seerr,bazarr,prowlarr,flaresolverr,jackett}`.quiet(),
  );
  yield* Effect.tryPromise(() =>
    Bun.$`mkdir -p data/{torrents,media}/{tv,movies,music,books}`.quiet(),
  );
  yield* Effect.tryPromise(() =>
    Bun.$`chmod -R a=,a+rX,u+w,g+w data/ config/ 2>/dev/null || true`.quiet(),
  );

  // ---- Step 2: Pre-seed qBittorrent config ----
  yield* Console.log("Seeding qBittorrent config...");

  const qbtConf = `[AutoRun]
enabled=true
program=chmod -R 775 "%F/"

[LegalNotice]
Accepted=true

[Preferences]
Downloads\\SavePath=/data/torrents/
Downloads\\TempPathEnabled=false
WebUI\\AlternativeUIEnabled=true
WebUI\\RootFolder=/vuetorrent
`;
  yield* Effect.sync(() =>
    Bun.write("config/qbittorrent/qBittorrent/qBittorrent.conf", qbtConf),
  );

  yield* Effect.sync(() =>
    Bun.write(
      "config/qbittorrent/qBittorrent/categories.json",
      JSON.stringify(
        {
          sonarr: { savePath: "/data/torrents/tv" },
          radarr: { savePath: "/data/torrents/movies" },
        },
        null,
        2,
      ),
    ),
  );

  // ---- Step 3: Start containers ----
  yield* Console.log("Starting containers...");
  yield* Effect.tryPromise(() => Bun.$`docker compose up -d`.quiet());

  // ---- Step 4: Wait for all services concurrently ----
  yield* Console.log("Waiting for services...");
  yield* Effect.all(
    [
      waitFor("http://localhost:8989/ping", "Sonarr"),
      waitFor("http://localhost:7878/ping", "Radarr"),
      waitFor("http://localhost:9696/ping", "Prowlarr"),
      waitFor("http://localhost:8888/", "qBittorrent"),
    ],
    { concurrency: "unbounded" },
  );

  // ---- Step 5: Get qBittorrent password ----
  let qbPass = QB_PASS_ARG;
  if (!qbPass) {
    const logs = yield* Effect.tryPromise(() =>
      Bun.$`docker logs qbittorrent 2>/dev/null`.text(),
    ).pipe(Effect.catchAll(() => Effect.succeed("")));
    const m = logs.match(/session:\s*['"]?(\S+)['"]?/);
    if (m) qbPass = m[1];
  }

  // ---- Step 6: Extract API keys ----
  const sonarrKey = yield* extractApiKey("config/sonarr/config.xml");
  const radarrKey = yield* extractApiKey("config/radarr/config.xml");
  const prowlarrKey = yield* extractApiKey("config/prowlarr/config.xml");

  // ---- Step 7: Configure Sonarr ----
  if (sonarrKey) {
    yield* Console.log("Configuring Sonarr...");

    yield* ignoreFail(
      "Sonarr root folder",
      apiPost("http://localhost:8989/api/v3/rootfolder", sonarrKey, {
        path: "/data/media/tv",
      }),
    );

    yield* ignoreFail(
      "Sonarr media management",
      apiPut(
        "http://localhost:8989/api/v3/config/mediamanagement/1",
        sonarrKey,
        {
          autoUnmonitorPreviouslyDownloadedEpisodes: false,
          recycleBin: "",
          recycleBinCleanupDays: 7,
          downloadPropersAndRepacks: "preferAndUpgrade",
          createEmptySeriesFolders: false,
          deleteEmptyFolders: false,
          fileDate: "none",
          rescanAfterRefresh: "always",
          autoRenameFolders: false,
          setPermissionsLinux: false,
          chmodFolder: "755",
          chownGroup: "",
          skipFreeSpaceCheckWhenImporting: false,
          minimumFreeSpaceWhenImporting: 100,
          copyUsingHardlinks: true,
          importExtraFiles: true,
          enableMediaInfo: true,
          id: 1,
        },
      ),
    );

    if (qbPass) {
      yield* ignoreFail(
        "Sonarr qBittorrent client",
        apiPost("http://localhost:8989/api/v3/downloadclient", sonarrKey, {
          enable: true,
          protocol: "torrent",
          name: "qBittorrent",
          implementation: "QBittorrent",
          configContract: "QBittorrentSettings",
          fields: [
            { name: "host", value: "qbittorrent" },
            { name: "port", value: 8888 },
            { name: "username", value: QB_USER },
            { name: "password", value: qbPass },
            { name: "tvCategory", value: "sonarr" },
            { name: "firstAndLast", value: true },
            { name: "useSsl", value: false },
          ],
        }),
      );
    }

    yield* Console.log("  Sonarr done.");
  }

  // ---- Step 8: Configure Radarr ----
  if (radarrKey) {
    yield* Console.log("Configuring Radarr...");

    yield* ignoreFail(
      "Radarr root folder",
      apiPost("http://localhost:7878/api/v3/rootfolder", radarrKey, {
        path: "/data/media/movies",
      }),
    );

    yield* ignoreFail(
      "Radarr media management",
      apiPut(
        "http://localhost:7878/api/v3/config/mediamanagement/1",
        radarrKey,
        {
          autoUnmonitorPreviouslyDownloadedMovies: false,
          recycleBinPath: "",
          recycleBinCleanupDays: 7,
          downloadPropersAndRepacks: "preferAndUpgrade",
          createEmptyMovieFolders: false,
          deleteEmptyFolders: false,
          fileDate: "none",
          rescanAfterRefresh: "always",
          autoRenameFolders: false,
          setPermissionsLinux: false,
          chmodFolder: "755",
          chownGroup: "",
          skipFreeSpaceCheckWhenImporting: false,
          minimumFreeSpaceWhenImporting: 100,
          copyUsingHardlinks: true,
          importExtraFiles: true,
          enableMediaInfo: true,
          id: 1,
        },
      ),
    );

    if (qbPass) {
      yield* ignoreFail(
        "Radarr qBittorrent client",
        apiPost("http://localhost:7878/api/v3/downloadclient", radarrKey, {
          enable: true,
          protocol: "torrent",
          name: "qBittorrent",
          implementation: "QBittorrent",
          configContract: "QBittorrentSettings",
          fields: [
            { name: "host", value: "qbittorrent" },
            { name: "port", value: 8888 },
            { name: "username", value: QB_USER },
            { name: "password", value: qbPass },
            { name: "movieCategory", value: "radarr" },
            { name: "firstAndLast", value: true },
            { name: "useSsl", value: false },
          ],
        }),
      );
    }

    yield* Console.log("  Radarr done.");
  }

  // ---- Step 9: Configure Prowlarr ----
  if (prowlarrKey) {
    yield* Console.log("Configuring Prowlarr...");

    yield* ignoreFail(
      "Prowlarr FlareSolverr",
      apiPost("http://localhost:9696/api/v1/indexerproxy", prowlarrKey, {
        name: "FlareSolverr",
        implementation: "FlareSolverr",
        configContract: "FlareSolverrSettings",
        fields: [{ name: "host", value: "http://flaresolverr:8191" }],
        tags: [],
      }),
    );

    if (sonarrKey) {
      yield* ignoreFail(
        "Prowlarr → Sonarr app",
        apiPost("http://localhost:9696/api/v1/applications", prowlarrKey, {
          name: "Sonarr",
          implementation: "Sonarr",
          configContract: "SonarrSettings",
          syncLevel: "fullSync",
          fields: [
            { name: "baseUrl", value: "http://sonarr:8989" },
            { name: "apiKey", value: sonarrKey },
            { name: "prowlarrUrl", value: "http://prowlarr:9696" },
            {
              name: "syncCategories",
              value: [5000, 5001, 5002, 5003, 5004, 5005],
            },
          ],
          tags: [],
        }),
      );
    }

    if (radarrKey) {
      yield* ignoreFail(
        "Prowlarr → Radarr app",
        apiPost("http://localhost:9696/api/v1/applications", prowlarrKey, {
          name: "Radarr",
          implementation: "Radarr",
          configContract: "RadarrSettings",
          syncLevel: "fullSync",
          fields: [
            { name: "baseUrl", value: "http://radarr:7878" },
            { name: "apiKey", value: radarrKey },
            { name: "prowlarrUrl", value: "http://prowlarr:9696" },
            {
              name: "syncCategories",
              value: [
                2000, 2010, 2020, 2030, 2040, 2045, 2050, 2060, 2070, 2080,
              ],
            },
          ],
          tags: [],
        }),
      );
    }

    yield* Console.log("  Prowlarr done.");
  }

  // ---- Step 10: Configure Homarr (requires HOMARR_API_KEY in .env) ----
  if (HOMARR_KEY) {
    yield* Console.log("Configuring Homarr apps...");

    const icon = (slug: string) =>
      `https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/${slug}.png`;

    const apps: Array<{
      name: string;
      description: string;
      iconUrl: string;
      href: string;
      pingUrl: string;
    }> = [
      {
        name: "Jellyfin",
        description: "Media Server",
        iconUrl: icon("jellyfin"),
        href: "http://jellyfin:8096",
        pingUrl: "http://jellyfin:8096",
      },
      {
        name: "Sonarr",
        description: "TV Series Manager",
        iconUrl: icon("sonarr"),
        href: "http://sonarr:8989",
        pingUrl: "http://sonarr:8989/ping",
      },
      {
        name: "Radarr",
        description: "Movie Manager",
        iconUrl: icon("radarr"),
        href: "http://radarr:7878",
        pingUrl: "http://radarr:7878/ping",
      },
      {
        name: "Prowlarr",
        description: "Indexer Manager",
        iconUrl: icon("prowlarr"),
        href: "http://prowlarr:9696",
        pingUrl: "http://prowlarr:9696/ping",
      },
      {
        name: "qBittorrent",
        description: "Torrent Client",
        iconUrl: icon("qbittorrent"),
        href: "http://qbittorrent:8888",
        pingUrl: "http://qbittorrent:8888",
      },
      {
        name: "Bazarr",
        description: "Subtitle Manager",
        iconUrl: icon("bazarr"),
        href: "http://bazarr:6767",
        pingUrl: "http://bazarr:6767",
      },
      {
        name: "Seerr",
        description: "Media Requests",
        iconUrl: icon("overseerr"),
        href: "http://seerr:5055",
        pingUrl: "http://seerr:5055",
      },
      {
        name: "Jackett",
        description: "Indexer Proxy",
        iconUrl: icon("jackett"),
        href: "http://jackett:9117",
        pingUrl: "http://jackett:9117",
      },
    ];

    for (const app of apps) {
      yield* ignoreFail(
        `Homarr app: ${app.name}`,
        homarrPost("http://localhost:7575/api/apps", app),
      );
    }

    yield* Console.log("  Homarr done.");
  } else {
    yield* Console.log(
      "  Skipping Homarr — set HOMARR_API_KEY in .env and re-run",
    );
  }

  // ---- Step 11: Export API keys to .env ----
  yield* Console.log("Exporting API keys to .env...");
  yield* Effect.sync(() => {
    const envPath = ".env";
    let env = "";
    try {
      env = require("fs").readFileSync(envPath, "utf-8");
    } catch {}

    const setOrReplace = (key: string, value: string | null) => {
      const line = `${key}=${value ?? ""}`;
      if (env.includes(`${key}=`)) {
        env = env.replace(new RegExp(`^${key}=.*$`, "m"), line);
      } else {
        env = env.trimEnd() + "\n" + line + "\n";
      }
    };

    setOrReplace("SONARR_API_KEY", sonarrKey);
    setOrReplace("RADARR_API_KEY", radarrKey);
    setOrReplace("PROWLARR_API_KEY", prowlarrKey);

    let seerrKey: string | null = null;
    try {
      const seerrSettings = require("fs").readFileSync(
        "config/seerr/settings.json",
        "utf-8",
      );
      const parsed = JSON.parse(seerrSettings);
      seerrKey = parsed.main.apiKey ?? null;
    } catch {}
    setOrReplace("SEERR_API_KEY", seerrKey);

    require("fs").writeFileSync(envPath, env);
  });

  if (sonarrKey) yield* Console.log("  SONARR_API_KEY  → .env");
  if (radarrKey) yield* Console.log("  RADARR_API_KEY  → .env");
  if (prowlarrKey) yield* Console.log("  PROWLARR_API_KEY → .env");
  yield* Console.log(
    sonarrKey || radarrKey || prowlarrKey || seerrKey
      ? "  SEERR_API_KEY   → .env"
      : "",
  );

  // ---- Step 12: Configure Seerr services (requires API key) ----
  const seerrKey = yield* extractSeerrKey();

  if (seerrKey && sonarrKey && radarrKey) {
    yield* Console.log("Configuring Seerr services...");

    // Wait for Seerr to be ready
    yield* waitFor("http://localhost:5055/api/v1/status", "Seerr");

    // Get Sonarr quality profile ID (use first one)
    let sonarrProfileId = 1;
    let sonarrProfileName = "HD-720p/1080p";
    try {
      const snRes = yield* pipe(
        HttpClientRequest.get("http://localhost:8989/api/v3/qualityprofile"),
        HttpClientRequest.setHeader("X-Api-Key", sonarrKey),
        HttpClient.execute,
      );
      const snProfiles = yield* snRes.json as any;
      if (snProfiles?.length > 0) {
        sonarrProfileId = snProfiles[0].id;
        sonarrProfileName = snProfiles[0].name;
      }
    } catch {}

    // Get Radarr quality profile ID
    let radarrProfileId = 1;
    let radarrProfileName = "HD-720p/1080p";
    try {
      const rdRes = yield* pipe(
        HttpClientRequest.get("http://localhost:7878/api/v3/qualityprofile"),
        HttpClientRequest.setHeader("X-Api-Key", radarrKey),
        HttpClient.execute,
      );
      const rdProfiles = yield* rdRes.json as any;
      if (rdProfiles?.length > 0) {
        radarrProfileId = rdProfiles[0].id;
        radarrProfileName = rdProfiles[0].name;
      }
    } catch {}

    yield* ignoreFail(
      "Seerr → Sonarr",
      seerrPost("http://localhost:5055/api/v1/settings/sonarr", seerrKey, {
        name: "Sonarr",
        hostname: "sonarr",
        port: 8989,
        apiKey: sonarrKey,
        useSsl: false,
        baseUrl: "",
        activeProfileId: sonarrProfileId,
        activeProfileName: sonarrProfileName,
        activeDirectory: "/data/media/tv",
        is4k: false,
        enableSeasonFolders: true,
        isDefault: true,
        syncEnabled: true,
      }),
    );

    yield* ignoreFail(
      "Seerr → Radarr",
      seerrPost("http://localhost:5055/api/v1/settings/radarr", seerrKey, {
        name: "Radarr",
        hostname: "radarr",
        port: 7878,
        apiKey: radarrKey,
        useSsl: false,
        baseUrl: "",
        activeProfileId: radarrProfileId,
        activeProfileName: radarrProfileName,
        activeDirectory: "/data/media/movies",
        is4k: false,
        minimumAvailability: "released",
        isDefault: true,
        syncEnabled: true,
      }),
    );

    yield* Console.log("  Seerr done.");
  }

  // ---- Summary ----
  yield* Console.log("");
  yield* Console.log("=== Setup complete ===");
  yield* Console.log("");
  yield* Console.log("Access:");
  yield* Console.log("  qBittorrent:  http://localhost:8888  (user: admin)");
  if (qbPass) yield* Console.log(`              password: ${qbPass}`);
  else
    yield* Console.log(
      "              password: check  docker logs qbittorrent",
    );
  yield* Console.log("  Sonarr:       http://localhost:8989");
  yield* Console.log("  Radarr:       http://localhost:7878");
  yield* Console.log("  Prowlarr:     http://localhost:9696");
  yield* Console.log("  Jellyfin:     http://localhost:8096");
  yield* Console.log("  Bazarr:       http://localhost:6767");
  yield* Console.log("  Homarr:       http://localhost:7575");
  yield* Console.log("  Seerr:        http://localhost:5055");
  yield* Console.log("  Jackett:      http://localhost:9117");
  yield* Console.log("");
  yield* Console.log("Manual steps:");
  yield* Console.log(
    "  1. Set username/password in each *arr service (Settings > General)",
  );
  yield* Console.log("  2. Add indexers in Prowlarr (Settings > Indexers)");
  yield* Console.log(
    "  3. Configure Jellyfin libraries: /data/media/tv and /data/media/movies",
  );
  if (!HOMARR_KEY) {
    yield* Console.log(
      "  4. Generate Homarr API key (Management → Tools → API → Authentication)",
    );
    yield* Console.log(
      "     Add to .env as HOMARR_API_KEY=<id>.<token>, then re-run setup",
    );
  }
  yield* Console.log(
    `  5. To re-run with qBittorrent creds: bun setup.ts admin <password>`,
  );
});

// ── Run ──

const appLayer = Layer.mergeAll(BunContext.layer, FetchHttpClient.layer);

BunRuntime.runMain(program.pipe(Effect.provide(appLayer)));
