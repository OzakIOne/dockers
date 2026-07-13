import {
  Effect,
  Schedule,
  Duration,
  pipe,
  Layer,
  Console,
} from "effect";
import { FetchHttpClient } from "effect/unstable/http";
import { BunServices, BunRuntime } from "@effect/platform-bun";
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";

import {
  readEnv,
  getEnvValue,
  extractApiKey,
  apiGet as baseApiGet,
  apiGetJson as baseApiGetJson,
  apiPostJson as baseApiPostJson,
} from "./utils";

const DEBUG = Bun.env.DEBUG === "true" || Bun.env.LOG_LEVEL === "DEBUG";

// Optional single-service filter: `bun backup.ts --service radarr`
const TARGET_SERVICE = (() => {
  const idx = Bun.argv.indexOf("--service");
  if (idx >= 0 && idx + 1 < Bun.argv.length)
    return Bun.argv[idx + 1].toLowerCase();
  const shortIdx = Bun.argv.indexOf("-s");
  if (shortIdx >= 0 && shortIdx + 1 < Bun.argv.length)
    return Bun.argv[shortIdx + 1].toLowerCase();
  return null;
})();
const shouldRun = (name: string) =>
  !TARGET_SERVICE || TARGET_SERVICE === name;

// ── Thin wrappers with debug baked in ──

const apiGet = (url: string, key: string) => baseApiGet(url, key, DEBUG);
const apiGetJson = <T>(url: string, key: string) =>
  baseApiGetJson<T>(url, key, DEBUG);
const apiPostJson = <T>(url: string, key: string, body: unknown) =>
  baseApiPostJson<T>(url, key, body, DEBUG);

// ── Types (from the *arr OpenAPI specs) ──

type CommandResource = { id: number; name: string; status: string };
type BackupResource = {
  id: number;
  name: string;
  path: string; // e.g. /backup/manual/radarr_backup_v5..._....zip
  type: string;
  size: number;
  time: string; // ISO date-time
};

// The 3 *arr services expose an identical backup API (only the version differs):
//   POST /api/{v}/command            { name: "Backup" }   → trigger a manual backup
//   GET  /api/{v}/command/{id}                            → poll until completed
//   GET  /api/{v}/system/backup                           → list backups
//   GET  {path}                                           → download the .zip
// Seerr's OpenAPI spec exposes NO backup endpoint, so it falls back to a
// file-level copy of its config directory.
type ArrService = {
  name: string;
  url: string;
  key: string;
  apiVersion: "v1" | "v3";
};

const OUT_ROOT = "backups";
const stamp = new Date().toISOString().replace(/[:.]/g, "-").replace("T", "_").slice(0, 19);
const outDir = `${OUT_ROOT}/${stamp}`;

const ensureDir = (dir: string) =>
  Effect.sync(() => mkdirSync(dir, { recursive: true }));

// Fail fast when a service is down/unresponsive instead of hanging forever.
const REQUEST_TIMEOUT = Duration.seconds(15);
const DOWNLOAD_TIMEOUT = Duration.minutes(5);

// ── Backup flow for a single *arr service ──

const triggerBackup = (svc: ArrService) =>
  pipe(
    apiPostJson<CommandResource>(
      `${svc.url}/api/${svc.apiVersion}/command`,
      svc.key,
      { name: "Backup" },
    ),
    Effect.timeout(REQUEST_TIMEOUT),
    Effect.tap((cmd) =>
      Console.log(`  [${svc.name}] backup command queued (#${cmd.id})`),
    ),
  );

const waitForCommand = (svc: ArrService, id: number) =>
  pipe(
    apiGetJson<CommandResource>(
      `${svc.url}/api/${svc.apiVersion}/command/${id}`,
      svc.key,
    ),
    Effect.timeout(REQUEST_TIMEOUT),
    Effect.flatMap((cmd) => {
      if (cmd.status === "completed") return Effect.succeed(cmd);
      if (["failed", "aborted", "cancelled", "orphaned"].includes(cmd.status))
        return Effect.fail(
          new Error(`[${svc.name}] backup command ${cmd.status}`),
        );
      // still queued/started → retry
      return Effect.fail(new Error("pending"));
    }),
    Effect.retry(
      pipe(
        Schedule.spaced(Duration.seconds(2)),
        Schedule.both(Schedule.recurs(60)), // up to ~2 min
      ),
    ),
  );

const latestBackup = (svc: ArrService) =>
  pipe(
    apiGetJson<BackupResource[]>(
      `${svc.url}/api/${svc.apiVersion}/system/backup`,
      svc.key,
    ),
    Effect.timeout(REQUEST_TIMEOUT),
    Effect.flatMap((backups) => {
      if (!backups || backups.length === 0)
        return Effect.fail(new Error(`[${svc.name}] no backups found`));
      const latest = backups
        .slice()
        .sort((a, b) => Date.parse(b.time) - Date.parse(a.time))[0];
      return Effect.succeed(latest);
    }),
  );

const downloadBackup = (svc: ArrService, backup: BackupResource) => {
  const filename = backup.path.split("/").pop() || `${svc.name}.zip`;
  const dest = `${outDir}/${filename}`;
  return pipe(
    apiGet(`${svc.url}${backup.path}`, svc.key),
    Effect.flatMap((res) => res.arrayBuffer),
    Effect.timeout(DOWNLOAD_TIMEOUT),
    Effect.tap((buf) =>
      Effect.sync(() => writeFileSync(dest, Buffer.from(buf))),
    ),
    Effect.tap((buf) =>
      Console.log(
        `  [${svc.name}] downloaded ${filename} (${(buf.byteLength / 1024 / 1024).toFixed(2)} MB) → ${dest}`,
      ),
    ),
  );
};

const backupArr = (svc: ArrService) =>
  Effect.gen(function* () {
    yield* Console.log(`\n▶ ${svc.name} (${svc.url})`);
    const cmd = yield* triggerBackup(svc);
    yield* waitForCommand(svc, cmd.id);
    yield* Console.log(`  [${svc.name}] backup completed`);
    const backup = yield* latestBackup(svc);
    yield* downloadBackup(svc, backup);
  }).pipe(
    Effect.catchCause((cause) =>
      Console.error(
        `  \x1b[31m✗ ${svc.name} backup failed\x1b[0m` +
          (DEBUG ? `\n${cause}` : ""),
      ),
    ),
  );

// ── Seerr fallback: no backup endpoint in its OpenAPI spec ──

const SEERR_CONFIG = "config/seerr";
const SEERR_FILES = [
  "settings.json",
  "db/db.sqlite3",
  "db/db.sqlite3-wal",
  "db/db.sqlite3-shm",
];

const backupSeerr = () =>
  Effect.gen(function* () {
    yield* Console.log(`\n▶ seerr (file-level: no backup API endpoint)`);
    const dest = `${outDir}/seerr`;
    yield* ensureDir(`${dest}/db`);
    let copied = 0;
    for (const rel of SEERR_FILES) {
      const src = `${SEERR_CONFIG}/${rel}`;
      if (existsSync(src)) {
        yield* Effect.sync(() => copyFileSync(src, `${dest}/${rel}`));
        copied++;
      }
    }
    if (copied === 0)
      yield* Console.error(
        `  \x1b[33m! seerr config not found at ${SEERR_CONFIG}\x1b[0m`,
      );
    else yield* Console.log(`  [seerr] copied ${copied} file(s) → ${dest}`);
  }).pipe(
    Effect.catchCause((cause) =>
      Console.error(
        `  \x1b[31m✗ seerr backup failed\x1b[0m` + (DEBUG ? `\n${cause}` : ""),
      ),
    ),
  );

// ── Program ──

const program = Effect.gen(function* () {
  yield* Console.log(`Backing up to ./${outDir}\n`);
  yield* ensureDir(outDir);

  const env = readEnv();

  const sonarrUrl = getEnvValue(env, "SONARR_URL") || "http://localhost:8989";
  const radarrUrl = getEnvValue(env, "RADARR_URL") || "http://localhost:7878";
  const prowlarrUrl =
    getEnvValue(env, "PROWLARR_URL") || "http://localhost:9696";

  const sonarrKey =
    getEnvValue(env, "SONARR_API_KEY") ||
    (yield* extractApiKey("config/sonarr/config.xml"));
  const radarrKey =
    getEnvValue(env, "RADARR_API_KEY") ||
    (yield* extractApiKey("config/radarr/config.xml"));
  const prowlarrKey =
    getEnvValue(env, "PROWLARR_API_KEY") ||
    (yield* extractApiKey("config/prowlarr/config.xml"));

  const services: ArrService[] = [
    { name: "sonarr", url: sonarrUrl, key: sonarrKey || "", apiVersion: "v3" },
    { name: "radarr", url: radarrUrl, key: radarrKey || "", apiVersion: "v3" },
    {
      name: "prowlarr",
      url: prowlarrUrl,
      key: prowlarrKey || "",
      apiVersion: "v1",
    },
  ];

  for (const svc of services) {
    if (!shouldRun(svc.name)) continue;
    if (!svc.key) {
      yield* Console.error(`  \x1b[33m! ${svc.name}: no API key, skipping\x1b[0m`);
      continue;
    }
    yield* backupArr(svc);
  }

  if (shouldRun("seerr")) yield* backupSeerr();

  yield* Console.log(`\n✓ Done → ./${outDir}`);
});

// ── Run ──

const appLayer = Layer.mergeAll(BunServices.layer, FetchHttpClient.layer);

BunRuntime.runMain(
  program.pipe(Effect.provide(appLayer)) as Effect.Effect<void, unknown>,
);
