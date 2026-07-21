import {
  Effect,
  Schedule,
  Duration,
  pipe,
  Layer,
  Console,
  Schema,
} from "effect";
import { FetchHttpClient } from "effect/unstable/http";
import { BunServices, BunRuntime } from "@effect/platform-bun";
import { QBittorrentClient } from "tsarr/qbittorrent";
import { SeerrClient } from "tsarr/seerr";
import { SqliteClient } from "@effect/sql-sqlite-node";

import {
  extractHostPort,
  readEnv,
  getEnvValue,
  setEnvValue,
  writeEnv,
  extractApiKey,
  extractSeerrKey,
  apiGet as baseApiGet,
  apiPost as baseApiPost,
  apiPut as baseApiPut,
  apiGetJson as baseApiGetJson,
  apiPostJson as baseApiPostJson,
  homarrPost as baseHomarrPost,
  ignoreFail as baseIgnoreFail,
  qbtSetPreferences as baseQbtSetPreferences,
  jellyfinPost as baseJellyfinPost,
  jellyfinGetJson as baseJellyfinGetJson,
  waitFor,
} from "./utils";

const QB_USER = "admin";
const DEBUG = Bun.env.DEBUG === "true" || Bun.env.LOG_LEVEL === "DEBUG";

// Load setup.env so Bun.env.* works
try {
  const setupContent = require("fs").readFileSync("setup.env", "utf-8");
  for (const line of setupContent.split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2];
  }
} catch {}

const TARGET_SERVICE = (() => {
  const idx = Bun.argv.indexOf("--service");
  if (idx >= 0 && idx + 1 < Bun.argv.length)
    return Bun.argv[idx + 1].toLowerCase();
  const shortIdx = Bun.argv.indexOf("-s");
  if (shortIdx >= 0 && shortIdx + 1 < Bun.argv.length)
    return Bun.argv[shortIdx + 1].toLowerCase();
  return null;
})();
const shouldRun = (...svcs: string[]) =>
  !TARGET_SERVICE || svcs.includes(TARGET_SERVICE);

// ── Thin wrappers with debug baked in ──

const apiGet = (url: string, key: string) => baseApiGet(url, key, DEBUG);
const apiPost = (url: string, key: string, body: unknown) =>
  baseApiPost(url, key, body, DEBUG);
const apiPut = (url: string, key: string, body: unknown) =>
  baseApiPut(url, key, body, DEBUG);
const apiGetJson = <T>(url: string, key: string) =>
  baseApiGetJson<T>(url, key, DEBUG);
const apiPostJson = <T>(url: string, key: string, body: unknown) =>
  baseApiPostJson<T>(url, key, body, DEBUG);
const homarrPost = (url: string, body: unknown) =>
  baseHomarrPost(url, body, Bun.env.HOMARR_API_KEY || "", DEBUG);
const ignoreFail = <A, E, R>(
  label: string,
  eff: Effect.Effect<A, E, R>,
): Effect.Effect<void> => baseIgnoreFail(label, eff, DEBUG);
const qbtSetPreferences = (
  baseUrl: string,
  username: string,
  password: string,
  prefs: Record<string, unknown>,
) => baseQbtSetPreferences(baseUrl, username, password, prefs);
const jellyfinPost = (url: string, key: string, body: unknown | null = null) =>
  baseJellyfinPost(url, key, body, DEBUG);
const jellyfinGetJson = <T>(url: string, key: string) =>
  baseJellyfinGetJson<T>(url, key, DEBUG);

// ── Env schema ──

const EnvSchema = Schema.Struct({
  PUID: Schema.String,
  PGID: Schema.String,
  TZ: Schema.String,
  UMASK: Schema.String,
  HOMARR_SECRET: Schema.String,
  HOMARR_API_KEY: Schema.String,
  SONARR_API_KEY: Schema.NonEmptyString,
  SONARR_URL: Schema.NonEmptyString,
  RADARR_API_KEY: Schema.NonEmptyString,
  RADARR_URL: Schema.NonEmptyString,
  PROWLARR_API_KEY: Schema.String,
  SEERR_API_KEY: Schema.String,
  JELLYFIN_API_KEY: Schema.String,
});

const JELLYFIN_PLUGINS = [
  {
    name: "Intro Skipper",
    guid: "c83d86bb-a1e0-4c35-a113-e2101cf4ee6b",
    repoUrl: "https://intro-skipper.org/manifest.json",
  },
  // {
  //   name: "JellyBridge",
  //   guid: "8ecc808c-d6e9-432f-9219-b638fbfb37e6",
  //   repoUrl:
  //     "https://raw.githubusercontent.com/kinggeorges12/JellyBridge/refs/heads/main/manifest.json",
  // },
];

// ── Main program ──

const program = Effect.gen(function* () {
  // ---- Step 0: Populate and validate env files ----
  const dcContent = yield* Effect.tryPromise(() =>
    Bun.file("docker-compose.yml").text(),
  );

  // Ensure .env (Docker Compose) exists
  const dcEnvExists = yield* Effect.tryPromise(() =>
    Bun.file(".env").exists(),
  ).pipe(Effect.catchAll(() => Effect.succeed(false)));
  if (!dcEnvExists) {
    yield* Effect.tryPromise(() =>
      Bun.$`cp .env.example .env`.quiet(),
    );
    yield* Console.log("  Created .env from .env.example");
  }

  // Ensure setup.env exists
  const setupEnvExists = yield* Effect.tryPromise(() =>
    Bun.file("setup.env").exists(),
  ).pipe(Effect.catchAll(() => Effect.succeed(false)));
  if (!setupEnvExists) {
    yield* Effect.tryPromise(() =>
      Bun.$`cp setup.env.example setup.env`.quiet(),
    );
    yield* Console.log("  Created setup.env from setup.env.example");
  }

  let envContent = readEnv();

  const sonarrUrl = getEnvValue(envContent, "SONARR_URL");
  const radarrUrl = getEnvValue(envContent, "RADARR_URL");

  if (!sonarrUrl) {
    const port = extractHostPort(dcContent, "sonarr");
    if (port) {
      yield* Console.log(
        `  Auto-populating SONARR_URL from docker-compose.yml → http://localhost:${port}`,
      );
      envContent = setEnvValue(
        envContent,
        "SONARR_URL",
        `http://localhost:${port}`,
      );
    }
  }

  if (!radarrUrl) {
    const port = extractHostPort(dcContent, "radarr");
    if (port) {
      yield* Console.log(
        `  Auto-populating RADARR_URL from docker-compose.yml → http://localhost:${port}`,
      );
      envContent = setEnvValue(
        envContent,
        "RADARR_URL",
        `http://localhost:${port}`,
      );
    }
  }

  writeEnv(envContent);

  // Merge .env and setup.env for validation
  const mergedEnv = (() => {
    const dc = (() => {
      try { return require("fs").readFileSync(".env", "utf-8"); } catch { return ""; }
    })();
    const setup = envContent;
    const all = new Set([...dc.split("\n"), ...setup.split("\n")]);
    return [...all].join("\n");
  })();

  yield* Effect.sync(() => {
    const parsed: Record<string, string> = {};
    for (const line of mergedEnv.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) parsed[m[1]] = m[2];
    }
    try {
      Schema.decodeUnknownSync(EnvSchema)(parsed);
      console.log("  .env / setup.env validation passed.");
    } catch (e) {
      if (Schema.isSchemaError(e)) {
        console.log(
          `  Warning: env validation failed:\n  ${e.message.split("\n").join("\n  ")}`,
        );
      }
      console.log("  Some setup steps may fail.");
    }
  });

  // ---- Step 1: Create directories ----
  yield* Console.log("Creating directories...");
  yield* Effect.tryPromise(() =>
    Bun.$`mkdir -p config/{jellyfin,qbittorrent/qBittorrent,sonarr,radarr,homarr,seerr,bazarr,prowlarr,flaresolverr}`.quiet(),
  );
  yield* Effect.tryPromise(() =>
    Bun.$`mkdir -p data/downloads/torrents/{tv,movies,music,books} data/downloads/cross-seed data/media/{tv,movies,music,books}`.quiet(),
  );
  yield* Effect.tryPromise(() =>
    Bun.$`chmod -R a=,a+rX,u+w,g+w data/ config/ 2>/dev/null || true`.quiet(),
  );

  // ---- Step 2: Pre-seed qBittorrent categories ----
  if (shouldRun("qbittorrent")) {
    yield* Console.log("Seeding qBittorrent categories...");

    yield* Effect.sync(() =>
      Bun.write(
        "config/qbittorrent/qBittorrent/categories.json",
        JSON.stringify(
          {
            sonarr: { savePath: "/data/downloads/torrents/tv" },
            radarr: { savePath: "/data/downloads/torrents/movies" },
          },
          null,
          2,
        ),
      ),
    );
  }

  // ---- Step 3: Start containers ----
  yield* Console.log("Starting containers...");
  yield* Effect.tryPromise(() => Bun.$`docker compose up -d`.quiet());

  // ---- Step 4: Configure Wizarr database ----
  if (shouldRun("wizarr")) {
    yield* Console.log("Configuring Wizarr database...");

    const wizarrMarkdown = `- 📱 **Mobile**: [iOS Streamyfin](https://apps.apple.com/us/app/streamyfin/id6593660679) ou [Android Streamyfin](https://play.google.com/store/apps/details?id=com.fredrikburmester.streamyfin)
- 📺 **Smart TVs & Streaming Devices**: [Apple TV](https://apps.apple.com/us/app/streamyfin/id6593660679?platform=tv), Fire TV, Roku, Chromecast, Android TV (Recherche jellyfin dans l'app store)
- 🎮 **Consoles**: PlayStation & Xbox (Recherche jellyfin dans l'app store)
|||

{{ widget:button url="https://jellyfin.org/downloads" text=_("⬇️ Download Jellyfin Clients") }}

{{ widget:button url="external_url" text=_("Go to Jellyfin") }}`;

    yield* ignoreFail(
      "Wizarr media server",
      pipe(
        Effect.gen(function* () {
          const jellyfinKey = yield* pipe(
            Effect.gen(function* () {
              const jfClient = yield* SqliteClient.make({
                filename: "./config/jellyfin/data/data/jellyfin.db",
                readonly: true,
              });
              const rows = yield* jfClient<{ AccessToken: string }>`
                SELECT AccessToken FROM ApiKeys WHERE Name = ${"Seerr"} LIMIT 1
              `;
              return rows[0]?.AccessToken ?? "";
            }),
            Effect.scoped,
            Effect.catchAll(() => Effect.succeed("")),
          );

          const client = yield* SqliteClient.make({
            filename: "./config/wizarr/database/database.db",
          });

          yield* client`
            INSERT OR IGNORE INTO media_server (id, name, server_type, url, api_key, verified, created_at, external_url, allow_downloads, allow_live_tv, allow_mobile_uploads)
            VALUES (${1}, ${"Jelly"}, ${"jellyfin"}, ${"http://jellyfin:8096"}, ${jellyfinKey}, ${true}, ${"2026-07-06 00:09:17.980554"}, ${""}, ${false}, ${false}, ${false})
          `;

          yield* client.unsafe(
            `DELETE FROM wizard_step WHERE server_type = 'jellyfin'`,
          );

          yield* client`
            INSERT INTO wizard_step (server_type, category, position, title, markdown, requires, require_interaction, created_at, updated_at)
            VALUES (${"jellyfin"}, ${"post_invite"}, ${1}, ${"{{ _('Jellyfin Clients') }}"}, ${wizarrMarkdown}, ${"[]"}, ${false}, ${"2026-07-06 00:04:40.531209"}, ${"2026-07-06 18:13:12.643772"})
          `;

          if (jellyfinKey) {
            let env = readEnv();
            env = setEnvValue(env, "JELLYFIN_API_KEY", jellyfinKey);
            writeEnv(env);
            yield* Console.log("  JELLYFIN_API_KEY → setup.env");
          }
        }),
        Effect.scoped,
        Effect.provide(
          Layer.unwrapEffect(
            Effect.tryPromise(
              () => import("@effect/experimental/Reactivity"),
            ).pipe(
              Effect.map((m) => m.Reactivity.layer),
              Effect.catchAll(() => Effect.succeed(Layer.empty)),
            ),
          ),
        ),
      ),
    );

    yield* Console.log("  Wizarr done.");
  }

  // ---- Step 5: Wait for services ----
  const waits: Effect.Effect<void>[] = [];
  if (shouldRun("sonarr", "prowlarr", "seerr"))
    waits.push(waitFor("http://localhost:8989/ping", "Sonarr"));
  if (shouldRun("radarr", "prowlarr", "seerr"))
    waits.push(waitFor("http://localhost:7878/ping", "Radarr"));
  if (shouldRun("prowlarr"))
    waits.push(waitFor("http://localhost:9696/ping", "Prowlarr"));
  if (shouldRun("qbittorrent", "sonarr", "radarr"))
    waits.push(waitFor("http://localhost:8888/", "qBittorrent"));
  if (shouldRun("jellyfin"))
    waits.push(waitFor("http://localhost:8096/web/", "Jellyfin"));
  if (shouldRun("maintainerr"))
    waits.push(waitFor("http://localhost:6246/", "Maintainerr"));

  if (waits.length > 0) {
    yield* Console.log("Waiting for services...");
    yield* Effect.all(waits, { concurrency: "unbounded" });
  }

  // ---- Step 5: Get qBittorrent password ----
  let qbPass = "";
  if (shouldRun("qbittorrent", "sonarr", "radarr")) {
    if (!qbPass) {
      const logs = yield* Effect.tryPromise(() =>
        Bun.$`docker logs qbittorrent 2>/dev/null`.text(),
      ).pipe(Effect.catchCause(() => Effect.succeed("")));
      const m = logs.match(/session:\s*['"]?(\S+)['"]?/);
      if (m) qbPass = m[1];
      if (!qbPass) {
        const env = readEnv();
        qbPass = getEnvValue(env, "QBITTORRENT_PASSWORD") || "";
      }
    }

    if (qbPass) {
      yield* Effect.tryPromise(() => {
        const client = new QBittorrentClient({
          baseUrl: "http://localhost:8888",
          username: QB_USER,
          password: qbPass,
        });
        return client.getSystemStatus();
      }).pipe(
        Effect.tap(() => Console.log("  qBittorrent SDK connection verified.")),
        Effect.catchCause(() =>
          Console.log("  Warning: qBittorrent SDK connection failed."),
        ),
      );

      if (shouldRun("qbittorrent")) {
        yield* ignoreFail(
          "qBittorrent preferences",
          qbtSetPreferences("http://localhost:8888", QB_USER, qbPass, {
            alternative_webui_enabled: true,
            alternative_webui_path: "/vuetorrent",
            autorun_enabled: true,
            autorun_program: 'chmod -R 775 "%F/"',
            save_path: "/data/downloads/torrents/",
            temp_path_enabled: false,
            auto_tmm_enabled: true,
            torrent_changed_tmm_enabled: true,
            save_path_changed_tmm_enabled: true,
            category_changed_tmm_enabled: true,
          }),
        );
      }
    }
  }

  // ---- Step 6: Extract API keys ----
  const sonarrKey = yield* extractApiKey("config/sonarr/config.xml");
  const radarrKey = yield* extractApiKey("config/radarr/config.xml");
  const prowlarrKey = yield* extractApiKey("config/prowlarr/config.xml");

  // ---- Step 7: Configure Sonarr ----
  if (shouldRun("sonarr")) {
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
  }

  // ---- Step 8: Configure Radarr ----
  if (shouldRun("radarr")) {
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
  }

  // ---- Step 9: Configure Prowlarr ----
  if (shouldRun("prowlarr")) {
    if (prowlarrKey) {
      yield* Console.log("Configuring Prowlarr...");

      yield* ignoreFail(
        "Prowlarr FlareSolverr",
        apiPost("http://localhost:9696/api/v1/indexerproxy", prowlarrKey, {
          name: "FlareSolverr",
          implementation: "FlareSolverr",
          configContract: "FlareSolverrSettings",
          fields: [{ name: "host", value: "http://flaresolverr:8191" }],
          tags: ["flare"],
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

      const qbUser = getEnvValue(readEnv(), "QBITTORRENT_USER") || "admin";
      const qbPassFromEnv = getEnvValue(readEnv(), "QBITTORRENT_PASSWORD");
      const effectiveQbPass = qbPassFromEnv ?? qbPass;

      if (effectiveQbPass) {
        yield* ignoreFail(
          "Prowlarr qBittorrent client",
          apiPost(
            "http://localhost:9696/api/v1/downloadclient",
            prowlarrKey,
            {
              enable: true,
              protocol: "torrent",
              name: "qBittorrent",
              implementation: "QBittorrent",
              configContract: "QBittorrentSettings",
              fields: [
                { name: "host", value: "qbittorrent" },
                { name: "port", value: 8888 },
                { name: "username", value: qbUser },
                { name: "password", value: effectiveQbPass },
                { name: "category", value: "prowlarr" },
                { name: "sequentialOrder", value: true },
                { name: "firstAndLast", value: true },
                { name: "initialState", value: 0 },
                { name: "useSsl", value: false },
                { name: "priority", value: 1 },
                { name: "contentLayout", value: 0 },
              ],
            },
          ),
        );
      }

      yield* Console.log("  Prowlarr done.");
    }
  }

  // ---- Step 10: Configure Homarr (requires HOMARR_API_KEY in setup.env) ----
  if (shouldRun("homarr")) {
    if (Bun.env.HOMARR_API_KEY) {
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
          name: "Seerr",
          description: "Media Requests",
          iconUrl: icon("overseerr"),
          href: "http://seerr:5055",
          pingUrl: "http://seerr:5055",
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
        "  Skipping Homarr — set HOMARR_API_KEY in setup.env and re-run",
      );
    }
  }

  // ---- Step 11: Export API keys to setup.env ----
  yield* Console.log("Exporting API keys to setup.env...");
  const seerrKey = yield* extractSeerrKey();
  yield* Effect.sync(() => {
    const envPath = "setup.env";
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
    setOrReplace("SEERR_API_KEY", seerrKey);

    require("fs").writeFileSync(envPath, env);
  });

  if (sonarrKey) yield* Console.log("  SONARR_API_KEY  → setup.env");
  if (radarrKey) yield* Console.log("  RADARR_API_KEY  → setup.env");
  if (prowlarrKey) yield* Console.log("  PROWLARR_API_KEY → setup.env");
  yield* Console.log(
    sonarrKey || radarrKey || prowlarrKey || seerrKey
      ? "  SEERR_API_KEY   → setup.env"
      : "",
  );
  const jellyfinKey = getEnvValue(readEnv(), "JELLYFIN_API_KEY");
  if (jellyfinKey) yield* Console.log("  JELLYFIN_API_KEY → setup.env");

  // Validate final .env state
  yield* Effect.sync(() => {
    const content = readEnv();
    const parsed: Record<string, string> = {};
    for (const line of content.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) parsed[m[1]] = m[2];
    }
    // Run sync validation and log warnings
    try {
      Schema.decodeUnknownSync(EnvSchema)(parsed);
    } catch (e) {
      if (Schema.isSchemaError(e)) {
        console.log(
          `  Warning: setup.env validation issues:\n  ${e.message.split("\n").join("\n  ")}`,
        );
      }
    }
  });

  // ---- Step 12: Configure Seerr services (requires API key) ----

  if (shouldRun("seerr")) {
    if (seerrKey && sonarrKey && radarrKey) {
      yield* Console.log("Configuring Seerr services...");

      // Wait for Seerr to be ready
      yield* Console.log("  Waiting for Seerr...");
      yield* Effect.retry(
        Effect.tryPromise(() => {
          const sc = new SeerrClient({
            baseUrl: "http://localhost:5055",
            apiKey: seerrKey,
          });
          return sc.getSystemStatus();
        }),
        pipe(
          Schedule.spaced(Duration.seconds(2)),
          Schedule.both(Schedule.recurs(90)),
        ),
      );
      yield* Console.log("  Seerr ready");

      const existingSonarrs = yield* pipe(
        apiGetJson<
          Array<{
            name: string;
            hostname: string;
            port: number;
            apiKey: string;
          }>
        >("http://localhost:5055/api/v1/settings/sonarr", seerrKey),
        Effect.catchAll(() =>
          Effect.succeed(
            [] as Array<{
              name: string;
              hostname: string;
              port: number;
              apiKey: string;
            }>,
          ),
        ),
      );

      if (
        existingSonarrs.some(
          (s) =>
            s.name === "Sonarr" &&
            s.hostname === "sonarr" &&
            s.port === 8989 &&
            s.apiKey === sonarrKey,
        )
      ) {
        yield* Console.log("  Seerr → Sonarr already configured, skipping");
      } else {
        yield* ignoreFail(
          "Seerr → Sonarr",
          apiPostJson(
            "http://localhost:5055/api/v1/settings/sonarr",
            seerrKey,
            {
              name: "Sonarr",
              hostname: "sonarr",
              port: 8989,
              apiKey: sonarrKey,
              useSsl: false,
              baseUrl: "",
              activeProfileId: 1,
              activeProfileName: "HD-720p/1080p",
              activeDirectory: "/data/media/tv",
              is4k: false,
              enableSeasonFolders: true,
              isDefault: true,
              syncEnabled: true,
            },
          ),
        );
      }

      const existingRadarrs = yield* pipe(
        apiGetJson<
          Array<{
            name: string;
            hostname: string;
            port: number;
            apiKey: string;
          }>
        >("http://localhost:5055/api/v1/settings/radarr", seerrKey),
        Effect.catchAll(() =>
          Effect.succeed(
            [] as Array<{
              name: string;
              hostname: string;
              port: number;
              apiKey: string;
            }>,
          ),
        ),
      );

      if (
        existingRadarrs.some(
          (s) =>
            s.name === "Radarr" &&
            s.hostname === "radarr" &&
            s.port === 7878 &&
            s.apiKey === radarrKey,
        )
      ) {
        yield* Console.log("  Seerr → Radarr already configured, skipping");
      } else {
        yield* ignoreFail(
          "Seerr → Radarr",
          apiPostJson(
            "http://localhost:5055/api/v1/settings/radarr",
            seerrKey,
            {
              name: "Radarr",
              hostname: "radarr",
              port: 7878,
              apiKey: radarrKey,
              useSsl: false,
              baseUrl: "",
              activeProfileId: 1,
              activeProfileName: "HD-720p/1080p",
              activeDirectory: "/data/media/movies",
              is4k: false,
              minimumAvailability: "released",
              isDefault: true,
              syncEnabled: true,
            },
          ),
        );
      }

      yield* Console.log("  Seerr done.");
    }
  }

  // ---- Step 13: Configure Jellyfin plugins ----
  if (shouldRun("jellyfin")) {
    const jfKey = getEnvValue(readEnv(), "JELLYFIN_API_KEY");
    if (jfKey) {
      yield* Console.log("Configuring Jellyfin plugins...");

      const uniqueRepos = [
        ...new Map(
          JELLYFIN_PLUGINS.map((p) => [
            p.repoUrl,
            { name: p.name, repoUrl: p.repoUrl },
          ]),
        ).values(),
      ];

      for (const repo of uniqueRepos) {
        yield* ignoreFail(
          `Jellyfin add repo: ${repo.name}`,
          Effect.gen(function* () {
            const existing: Array<{
              Name: string;
              Url: string;
              Enabled: boolean;
            }> = yield* pipe(
              jellyfinGetJson<
                Array<{ Name: string; Url: string; Enabled: boolean }>
              >("http://localhost:8096/Repositories", jfKey),
              Effect.catchAll(() =>
                Effect.succeed(
                  [] as Array<{ Name: string; Url: string; Enabled: boolean }>,
                ),
              ),
            );

            const already = existing.some((r) => r.Url === repo.repoUrl);
            if (already) {
              yield* Console.log(
                `  Repository "${repo.name}" already registered`,
              );
            } else {
              const updated = [
                ...existing,
                { Name: repo.name, Url: repo.repoUrl, Enabled: true },
              ];
              yield* jellyfinPost(
                "http://localhost:8096/Repositories",
                jfKey,
                updated,
              );
              yield* Console.log(`  Repository "${repo.name}" added`);
            }
          }),
        );
      }

      for (const plugin of JELLYFIN_PLUGINS) {
        const encName = encodeURIComponent(plugin.name);
        yield* ignoreFail(
          `Jellyfin install ${plugin.name}`,
          jellyfinPost(
            `http://localhost:8096/Packages/Installed/${encName}?assemblyGuid=${plugin.guid}&repositoryUrl=${encodeURIComponent(plugin.repoUrl)}`,
            jfKey,
            null,
          ),
        );
      }

      yield* Effect.sync(() => {
        const branding = `<?xml version="1.0" encoding="utf-8"?>
<BrandingOptions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <LoginDisclaimer />
  <CustomCss>@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");@import url("https://cdn.jsdelivr.net/gh/intro-skipper/intro-skipper-css@main/skip-button.min.css");

:root {
    /* Skip button timing */
    --skip-hide-duration: 8s;
}</CustomCss>
  <SplashscreenEnabled>false</SplashscreenEnabled>
</BrandingOptions>`;
        require("fs").writeFileSync("config/jellyfin/branding.xml", branding);
      });
      yield* Console.log("  branding.xml written");

      yield* Console.log("  Jellyfin plugins done.");
    } else {
      yield* Console.log("  Skipping Jellyfin plugins — no JELLYFIN_API_KEY");
    }
  }

  // ---- Step 14: Configure Maintainerr ----
  if (shouldRun("maintainerr")) {
    const envNow = readEnv();
    const jfKey = getEnvValue(envNow, "JELLYFIN_API_KEY") || "";
    const seKey = getEnvValue(envNow, "SEERR_API_KEY") || "";

    if (sonarrKey && radarrKey) {
      yield* Console.log("Configuring Maintainerr...");

      const jellyfinServerName = jfKey
        ? yield* pipe(
            Effect.gen(function* () {
              const info = yield* pipe(
                jellyfinGetJson<{ ServerName: string }>(
                  "http://localhost:8096/System/Info",
                  jfKey,
                ),
                Effect.catchAll(() => Effect.succeed({ ServerName: "Jellyfin" })),
              );
              return info.ServerName || "Jellyfin";
            }),
          )
        : "Jellyfin";

      const jellyfinUserId = jfKey
        ? yield* pipe(
            Effect.gen(function* () {
              const users = yield* pipe(
                jellyfinGetJson<
                  Array<{
                    Id: string;
                    Name: string;
                    Policy?: { IsAdministrator?: boolean };
                  }>
                >("http://localhost:8096/Users", jfKey),
                Effect.catchAll(() => Effect.succeed([])),
              );
              const admin = users.find((u) => u.Policy?.IsAdministrator);
              return (admin ?? users[0])?.Id ?? "";
            }),
          )
        : "";

      yield* ignoreFail(
        "Maintainerr DB config",
        pipe(
          Effect.gen(function* () {
            const client = yield* SqliteClient.make({
              filename: "./config/maintainerr/maintainerr.sqlite",
            });

            yield* client`
              INSERT OR REPLACE INTO sonarr_settings (id, serverName, url, apiKey)
              VALUES (${1}, ${"sonarr"}, ${"http://sonarr:8989"}, ${sonarrKey})
            `;

            yield* client`
              INSERT OR REPLACE INTO radarr_settings (id, serverName, url, apiKey)
              VALUES (${1}, ${"radarr"}, ${"http://radarr:7878"}, ${radarrKey})
            `;

            yield* client`
              UPDATE settings SET
                media_server_type = ${"jellyfin"},
                jellyfin_url = ${"http://jellyfin:8096"},
                jellyfin_api_key = ${jfKey},
                jellyfin_user_id = ${jellyfinUserId},
                jellyfin_server_name = ${jellyfinServerName},
                seerr_url = ${"http://seerr:5055"},
                seerr_api_key = ${seKey}
              WHERE id = ${1}
            `;

            yield* Console.log("  Maintainerr configured.");
          }),
          Effect.scoped,
          Effect.provide(
            Layer.unwrapEffect(
              Effect.tryPromise(
                () => import("@effect/experimental/Reactivity"),
              ).pipe(
                Effect.map((m) => m.Reactivity.layer),
                Effect.catchAll(() => Effect.succeed(Layer.empty)),
              ),
            ),
          ),
        ),
      );
    } else {
      yield* Console.log(
        "  Skipping Maintainerr — missing Sonarr/Radarr API keys",
      );
    }
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
  yield* Console.log("  Homarr:       http://localhost:7575");
  yield* Console.log("  Seerr:        http://localhost:5055");
  yield* Console.log("  Maintainerr:  http://localhost:6246");
  yield* Console.log("");
  yield* Console.log("Manual steps:");
  yield* Console.log(
    "  1. Set username/password in each *arr service (Settings > General)",
  );
  yield* Console.log("  2. Add indexers in Prowlarr (Settings > Indexers)");
  yield* Console.log(
    "  3. Configure Jellyfin libraries: /data/media/tv and /data/media/movies",
  );
  if (!Bun.env.HOMARR_API_KEY) {
    yield* Console.log(
      "  4. Generate Homarr API key (Management → Tools → API → Authentication)",
    );
    yield* Console.log(
      "     Add to setup.env as HOMARR_API_KEY=<id>.<token>, then re-run setup",
    );
  }
  yield* Console.log(
    `  5. To re-run with qBittorrent creds: bun setup.ts admin <password>`,
  );
});

// ── Run ──

const appLayer = Layer.mergeAll(BunServices.layer, FetchHttpClient.layer);

BunRuntime.runMain(
  program.pipe(Effect.provide(appLayer)) as Effect.Effect<void, unknown>,
);
