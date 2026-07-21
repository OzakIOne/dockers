import {
  Effect,
  Schedule,
  Duration,
  pipe,
  Layer,
  Console,
} from "effect"
import { FetchHttpClient } from "effect/unstable/http"
import { BunServices, BunRuntime } from "@effect/platform-bun"
import { SonarrClient } from "tsarr/sonarr"
import { RadarrClient } from "tsarr/radarr"
import { ProwlarrClient } from "tsarr/prowlarr"
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs"
import { ConfigError, ApiError } from "./services/errors"

const DEBUG = Bun.env.DEBUG === "true" || Bun.env.LOG_LEVEL === "DEBUG"

const TARGET_SERVICE = (() => {
  const idx = Bun.argv.indexOf("--service")
  if (idx >= 0 && idx + 1 < Bun.argv.length) return Bun.argv[idx + 1].toLowerCase()
  const shortIdx = Bun.argv.indexOf("-s")
  if (shortIdx >= 0 && shortIdx + 1 < Bun.argv.length)
    return Bun.argv[shortIdx + 1].toLowerCase()
  return null
})()

const shouldRun = (name: string) => !TARGET_SERVICE || TARGET_SERVICE === name

const REQUEST_TIMEOUT = Duration.seconds(15)
const DOWNLOAD_TIMEOUT = Duration.minutes(5)

const stamp = new Date().toISOString().replace(/[:.]/g, "-").replace("T", "_").slice(0, 19)
const outDir = `backups/${stamp}`

const ensureDir = Effect.fn("Backup.ensureDir")(function* (dir: string) {
  yield* Effect.sync(() => mkdirSync(dir, { recursive: true }))
})

const triggerBackup = Effect.fn("Backup.trigger")(function* (
  svc: { name: string; url: string; key: string; apiVersion: string },
) {
  const res = yield* Effect.tryPromise(() =>
    fetch(`${svc.url}/api/${svc.apiVersion}/command`, {
      method: "POST",
      headers: {
        "X-Api-Key": svc.key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Backup" }),
    }),
  ).pipe(Effect.timeout(REQUEST_TIMEOUT))

  if (!res.ok) {
    return yield* Effect.fail(
      new ApiError({ service: svc.name, status: res.status, message: "trigger failed" }),
    )
  }

  const json = yield* Effect.tryPromise(() => res.json() as Promise<{ id: number }>)
  yield* Console.log(`  [${svc.name}] backup command queued (#${json.id})`)
  return json.id
})

const waitForCommand = Effect.fn("Backup.waitForCommand")(function* (
  svc: { name: string; url: string; key: string; apiVersion: string },
  id: number,
) {
  yield* pipe(
    Effect.tryPromise(() =>
      fetch(`${svc.url}/api/${svc.apiVersion}/command/${id}`, {
        headers: { "X-Api-Key": svc.key },
      }),
    ),
    Effect.timeout(REQUEST_TIMEOUT),
    Effect.flatMap((res) => Effect.tryPromise(() => res.json() as Promise<{ status: string }>)),
    Effect.flatMap((cmd) => {
      if (cmd.status === "completed") return Effect.succeed(cmd)
      if (["failed", "aborted", "cancelled", "orphaned"].includes(cmd.status))
        return Effect.fail(new Error(`[${svc.name}] backup command ${cmd.status}`))
      return Effect.fail(new Error("pending"))
    }),
    Effect.retry(
      pipe(
        Schedule.spaced(Duration.seconds(2)),
        Schedule.both(Schedule.recurs(60)),
      ),
    ),
  )
})

type BackupInfo = { id: number; name: string; path: string; size: number; time: string }

const latestBackup = Effect.fn("Backup.latest")(function* (
  svc: { name: string; url: string; key: string; apiVersion: string },
) {
  const res = yield* Effect.tryPromise(() =>
    fetch(`${svc.url}/api/${svc.apiVersion}/system/backup`, {
      headers: { "X-Api-Key": svc.key },
    }),
  ).pipe(Effect.timeout(REQUEST_TIMEOUT))

  if (!res.ok) {
    return yield* Effect.fail(
      new ApiError({ service: svc.name, status: res.status, message: "list backups failed" }),
    )
  }

  const backups = yield* Effect.tryPromise(() => res.json() as Promise<BackupInfo[]>)
  if (!backups || backups.length === 0)
    return yield* Effect.fail(new Error(`[${svc.name}] no backups found`))

  const latest = backups.slice().sort((a, b) => Date.parse(b.time) - Date.parse(a.time))[0]
  return latest
})

const downloadBackup = Effect.fn("Backup.download")(function* (
  svc: { name: string; url: string; key: string },
  backup: BackupInfo,
) {
  const filename = backup.path.split("/").pop() || `${svc.name}.zip`
  const dest = `${outDir}/${filename}`

  const res = yield* Effect.tryPromise(() =>
    fetch(`${svc.url}${backup.path}`, { headers: { "X-Api-Key": svc.key } }),
  ).pipe(Effect.timeout(DOWNLOAD_TIMEOUT))

  if (!res.ok) {
    return yield* Effect.fail(
      new ApiError({ service: svc.name, status: res.status, message: "download failed" }),
    )
  }

  const buf = yield* Effect.tryPromise(() => res.arrayBuffer())
  yield* Effect.sync(() => writeFileSync(dest, Buffer.from(buf)))
  yield* Console.log(
    `  [${svc.name}] downloaded ${filename} (${(buf.byteLength / 1024 / 1024).toFixed(2)} MB) → ${dest}`,
  )
})

const backupArr = Effect.fn("Backup.arr")(
  function* (svc: { name: string; url: string; key: string; apiVersion: string }) {
    yield* Console.log(`\n▶ ${svc.name} (${svc.url})`)
    const cmdId = yield* triggerBackup(svc)
    yield* waitForCommand(svc, cmdId)
    yield* Console.log(`  [${svc.name}] backup completed`)
    const backup = yield* latestBackup(svc)
    yield* downloadBackup(svc, backup)
  },
  (effect, svc: { name: string }) =>
    effect.pipe(
      Effect.catchCause((cause) =>
        Console.error(
          `  \x1b[31m✗ ${svc.name} backup failed\x1b[0m` +
            (DEBUG ? `\n${cause}` : ""),
        ),
      ),
    ),
)

const SEERR_CONFIG = "config/seerr"
const SEERR_FILES = ["settings.json", "db/db.sqlite3", "db/db.sqlite3-wal", "db/db.sqlite3-shm"]

const backupSeerr = Effect.fn("Backup.seerr")(
  function* () {
    yield* Console.log("\n▶ seerr (file-level: no backup API endpoint)")
    const dest = `${outDir}/seerr`
    yield* ensureDir(`${dest}/db`)
    let copied = 0
    for (const rel of SEERR_FILES) {
      const src = `${SEERR_CONFIG}/${rel}`
      if (existsSync(src)) {
        yield* Effect.sync(() => copyFileSync(src, `${dest}/${rel}`))
        copied++
      }
    }
    if (copied === 0)
      yield* Console.error(`  \x1b[33m! seerr config not found at ${SEERR_CONFIG}\x1b[0m`)
    else yield* Console.log(`  [seerr] copied ${copied} file(s) → ${dest}`)
  },
  (effect) =>
    effect.pipe(
      Effect.catchCause((cause) =>
        Console.error(
          `  \x1b[31m✗ seerr backup failed\x1b[0m` + (DEBUG ? `\n${cause}` : ""),
        ),
      ),
    ),
)

const extractApiKey = Effect.fn("Backup.extractApiKey")(function* (xmlPath: string) {
  return yield* Effect.sync(() => {
    try {
      const content = require("fs").readFileSync(xmlPath, "utf-8")
      const m = content.match(/<ApiKey>([^<]+)<\/ApiKey>/)
      return m ? m[1] : ""
    } catch {
      return ""
    }
  })
})

const readSetupEnv = Effect.fn("Backup.readSetupEnv")(function* () {
  return yield* Effect.sync(() => {
    try { return require("fs").readFileSync("setup.env", "utf-8") } catch { return "" }
  })
})

const getEnvValue = (content: string, key: string): string | null => {
  const match = content.match(new RegExp(`^${key}=(.*)$`, "m"))
  return match ? match[1] : null
}

const program = Effect.gen(function* () {
  yield* Console.log(`Backing up to ./${outDir}\n`)
  yield* ensureDir(outDir)

  const env = yield* readSetupEnv()

  const sonarrUrl = getEnvValue(env, "SONARR_URL") || "http://localhost:8989"
  const radarrUrl = getEnvValue(env, "RADARR_URL") || "http://localhost:7878"
  const prowlarrUrl = getEnvValue(env, "PROWLARR_URL") || "http://localhost:9696"

  const sonarrKey = getEnvValue(env, "SONARR_API_KEY") || (yield* extractApiKey("config/sonarr/config.xml"))
  const radarrKey = getEnvValue(env, "RADARR_API_KEY") || (yield* extractApiKey("config/radarr/config.xml"))
  const prowlarrKey = getEnvValue(env, "PROWLARR_API_KEY") || (yield* extractApiKey("config/prowlarr/config.xml"))

  const services = [
    { name: "sonarr", url: sonarrUrl, key: sonarrKey, apiVersion: "v3" },
    { name: "radarr", url: radarrUrl, key: radarrKey, apiVersion: "v3" },
    { name: "prowlarr", url: prowlarrUrl, key: prowlarrKey, apiVersion: "v1" },
  ]

  for (const svc of services) {
    if (!shouldRun(svc.name)) continue
    if (!svc.key) {
      yield* Console.error(`  \x1b[33m! ${svc.name}: no API key, skipping\x1b[0m`)
      continue
    }
    yield* backupArr(svc)
  }

  if (shouldRun("seerr")) yield* backupSeerr()

  yield* Console.log(`\n✓ Done → ./${outDir}`)
})

const appLayer = Layer.mergeAll(BunServices.layer, FetchHttpClient.layer)

BunRuntime.runMain(
  program.pipe(Effect.provide(appLayer)) as Effect.Effect<void>,
)
