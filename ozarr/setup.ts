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
import { Seerr } from "tsarr";
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
  waitFor,
} from "./utils";

const QB_USER = "admin";
const DEBUG = Bun.env.DEBUG === "true" || Bun.env.LOG_LEVEL === "DEBUG";

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
});

// ── Main program ──

const program = Effect.gen(function* () {
  // ---- Step 0: Populate and validate .env ----
  const dcContent = yield* Effect.tryPromise(() =>
    Bun.file("docker-compose.yml").text(),
  );

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

  // Validate parsed env values
  yield* Effect.sync(() => {
    const parsed: Record<string, string> = {};
    for (const line of envContent.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) parsed[m[1]] = m[2];
    }
    try {
      Schema.decodeUnknownSync(EnvSchema)(parsed);
      console.log("  .env validation passed.");
    } catch (e) {
      if (Schema.isSchemaError(e)) {
        console.log(
          `  Warning: .env validation failed:\n  ${e.message.split("\n").join("\n  ")}`,
        );
      }
      console.log("  Some setup steps may fail.");
    }
  });

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

  // ---- Step 2: Pre-seed qBittorrent categories ----
  yield* Console.log("Seeding qBittorrent categories...");

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
  let qbPass = "";
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

    yield* ignoreFail(
      "qBittorrent preferences",
      qbtSetPreferences(
        "http://localhost:8888",
        QB_USER,
        qbPass,
        {
          alternative_webui_enabled: true,
          alternative_webui_path: "/vuetorrent",
          autorun_enabled: true,
          autorun_program: 'chmod -R 775 "%F/"',
          save_path: "/data/torrents/",
          temp_path_enabled: false,
        },
      ),
    );
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
  const seerrKey = yield* extractSeerrKey();
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
          `  Warning: .env validation issues:\n  ${e.message.split("\n").join("\n  ")}`,
        );
      }
    }
  });

  // ---- Step 12: Configure Seerr services (requires API key) ----

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
      Effect.tryPromise(async () => {
        const r = await Seerr.getSettingsSonarr();
        return r.data ?? [];
      }),
      Effect.catchAll(() =>
        Effect.succeed([] as Array<{ name: string; hostname: string; port: number; apiKey: string }>),
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
        Effect.tryPromise(() =>
          Seerr.postSettingsSonarr({
            body: {
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
          }),
        ),
      );
    }

    const existingRadarrs = yield* pipe(
      Effect.tryPromise(async () => {
        const r = await Seerr.getSettingsRadarr();
        return r.data ?? [];
      }),
      Effect.catchAll(() =>
        Effect.succeed([] as Array<{ name: string; hostname: string; port: number; apiKey: string }>),
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
        Effect.tryPromise(() =>
          Seerr.postSettingsRadarr({
            body: {
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
          }),
        ),
      );
    }

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
  if (!Bun.env.HOMARR_API_KEY) {
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

const appLayer = Layer.mergeAll(BunServices.layer, FetchHttpClient.layer);

BunRuntime.runMain(
  program.pipe(Effect.provide(appLayer)) as Effect.Effect<void, unknown>,
);
