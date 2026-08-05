import { Effect, Schedule, Duration, pipe, Layer, Console, Ref } from "effect"
import { FetchHttpClient } from "effect/unstable/http"
import { BunServices, BunRuntime } from "@effect/platform-bun"
import { SetupState } from "./services/state"
import * as Env from "./services/env"
import * as Docker from "./services/docker"
import * as Wait from "./services/wait"

const TARGET_SERVICE = (() => {
  const idx = Bun.argv.indexOf("--service")
  if (idx >= 0 && idx + 1 < Bun.argv.length) return Bun.argv[idx + 1].toLowerCase()
  const shortIdx = Bun.argv.indexOf("-s")
  if (shortIdx >= 0 && shortIdx + 1 < Bun.argv.length)
    return Bun.argv[shortIdx + 1].toLowerCase()
  return null
})()

const FOLDER_ONLY = Bun.argv.includes("--folder")

if (Bun.argv.includes("--api")) {
  const apiKeys: Record<string, string> = {}

  const xmlFiles = [
    "config/prowlarr/config.xml",
    "config/radarr/config.xml",
    "config/sonarr/config.xml",
  ]
  for (const path of xmlFiles) {
    try {
      const content = await Bun.file(path).text()
      const m = content.match(/<ApiKey>([^<]+)<\/ApiKey>/)
      const service = path.split("/")[1]
      if (m) apiKeys[service] = m[1]
      else console.log(`${service}: ApiKey not found in ${path}`)
    } catch {
      console.log(`${path.split("/")[1]}: ${path} not found`)
    }
  }

  try {
    const seerrPath = "config/seerr/settings.json"
    const content = await Bun.file(seerrPath).text()
    const settings = JSON.parse(content)
    if (settings.main?.apiKey) apiKeys.seerr = settings.main.apiKey
    else console.log("seerr: apiKey not found in settings.json")
  } catch {
    console.log("seerr: config/seerr/settings.json not found")
  }

  console.log("")
  for (const [service, key] of Object.entries(apiKeys)) {
    console.log(`${service}: ${key}`)
  }
  process.exit(0)
}

const shouldRun = (...svcs: string[]) =>
  !TARGET_SERVICE || svcs.includes(TARGET_SERVICE)

const WITH = {
  sonarr: shouldRun("sonarr"),
  radarr: shouldRun("radarr"),
  prowlarr: shouldRun("prowlarr"),
  wizarr: shouldRun("wizarr"),
  seerr: shouldRun("seerr"),
  jellyfin: shouldRun("jellyfin"),
  homarr: shouldRun("homarr"),
  maintainerr: shouldRun("maintainerr"),
  qui: shouldRun("qui"),
}

const provideState = (stateRef: Ref.Ref<typeof import("./services/state").SetupData.Type>) =>
  <A, E, R>(eff: Effect.Effect<A, E, R | SetupState>): Effect.Effect<A, E, R> =>
    eff.pipe(Effect.provideService(SetupState, stateRef))

const program = Effect.gen(function* () {
  yield* Env.ensureEnvFiles()
  yield* Env.loadSetupEnvIntoProcess()
  const initialData = yield* Env.buildInitialData()
  const stateRef = yield* Ref.make(initialData)
  const withState = provideState(stateRef)

  yield* Console.log("Creating directories...")
  const s0 = yield* Ref.get(stateRef)
  yield* Effect.tryPromise(() =>
    Bun.$`mkdir -p ${s0.cfgDir}/{jellyfin,qbittorrent/qBittorrent,sonarr,radarr,homarr,seerr,bazarr,prowlarr,flaresolverr}`.quiet(),
  )
  yield* Effect.tryPromise(() =>
    Bun.$`mkdir -p ${s0.datDir}/downloads/torrents/{tv,movies,music,books} ${s0.datDir}/downloads/cross-seed ${s0.datDir}/media/{tv,movies,music,books}`.quiet(),
  )
  yield* Effect.tryPromise(() =>
    Bun.$`chmod -R a=,a+rX,u+w,g+w ${s0.datDir}/ ${s0.cfgDir}/ 2>/dev/null || true`.quiet(),
  )

  if (FOLDER_ONLY) {
    yield* Console.log("Directories created.")
    return
  }

  const tryImport = <T>(path: string, name: string) =>
    Effect.tryPromise(() => import(path) as Promise<T>).pipe(
      Effect.catchCause((cause) =>
        Effect.sync(() => {
          console.log(`  Skipping ${name} — import failed: ${String(cause).slice(0, 120)}`)
          return null as T | null
        }),
      ),
    )

  const sm = {
    sonarr: yield* tryImport<typeof import("./services/sonarr")>("./services/sonarr", "Sonarr"),
    radarr: yield* tryImport<typeof import("./services/radarr")>("./services/radarr", "Radarr"),
    prowlarr: yield* tryImport<typeof import("./services/prowlarr")>("./services/prowlarr", "Prowlarr"),
    wizarr: yield* tryImport<typeof import("./services/wizarr")>("./services/wizarr", "Wizarr"),
    seerr: yield* tryImport<typeof import("./services/seerr")>("./services/seerr", "Seerr"),
    jellyfin: yield* tryImport<typeof import("./services/jellyfin")>("./services/jellyfin", "Jellyfin"),
    homarr: yield* tryImport<typeof import("./services/homarr")>("./services/homarr", "Homarr"),
    maintainerr: yield* tryImport<typeof import("./services/maintainerr")>("./services/maintainerr", "Maintainerr"),
    qui: yield* tryImport<typeof import("./services/qui")>("./services/qui", "qui"),
  }

  if (WITH.wizarr && sm.wizarr) yield* withState(sm.wizarr.configure())

  yield* Docker.up()

  if (WITH.wizarr && sm.wizarr) yield* withState(sm.wizarr.configure())

  const waits: Array<[string, string]> = []
  if (shouldRun("sonarr", "prowlarr", "seerr")) waits.push(["http://localhost:8989/ping", "Sonarr"])
  if (shouldRun("radarr", "prowlarr", "seerr")) waits.push(["http://localhost:7878/ping", "Radarr"])
  if (shouldRun("prowlarr")) waits.push(["http://localhost:9696/ping", "Prowlarr"])
  if (shouldRun("qbittorrent", "sonarr", "radarr", "qui")) waits.push(["http://localhost:6767/", "qBittorrent"])
  if (shouldRun("jellyfin")) waits.push(["http://localhost:8096/web/", "Jellyfin"])
  if (shouldRun("maintainerr")) waits.push(["http://localhost:6246/", "Maintainerr"])
  if (shouldRun("qui")) waits.push(["http://localhost:7476/health", "qui"])
  yield* Wait.all(waits)

  if (WITH.sonarr && sm.sonarr) yield* withState(sm.sonarr.configure())
  if (WITH.radarr && sm.radarr) yield* withState(sm.radarr.configure())
  if (WITH.prowlarr && sm.prowlarr) yield* withState(sm.prowlarr.configure())

  if (WITH.qui && sm.qui) yield* withState(sm.qui.configure())

  if (WITH.homarr && sm.homarr) yield* withState(sm.homarr.configure())
  if (WITH.seerr && sm.seerr) yield* withState(sm.seerr.configure())
  if (WITH.jellyfin && sm.jellyfin) yield* withState(sm.jellyfin.configure())
  if (WITH.maintainerr && sm.maintainerr) yield* withState(sm.maintainerr.configure())

  const final = yield* Ref.get(stateRef)
  yield* Console.log("")
  yield* Console.log("=== Setup complete ===")
  yield* Console.log("")
  yield* Console.log("Access:")
  yield* Console.log("  qBittorrent:  http://localhost:6767  (user: admin)")
  if (final.qbPass) yield* Console.log(`              password: ${final.qbPass}`)
  yield* Console.log("  Sonarr:       http://localhost:8989")
  yield* Console.log("  Radarr:       http://localhost:7878")
  yield* Console.log("  Prowlarr:     http://localhost:9696")
  yield* Console.log("  Jellyfin:     http://localhost:8096")
  yield* Console.log("  Homarr:       http://localhost:7575")
  yield* Console.log("  Seerr:        http://localhost:5055")
  yield* Console.log("  Maintainerr:  http://localhost:6246")
  if (!Bun.env.HOMARR_API_KEY) {
    yield* Console.log("")
    yield* Console.log("Manual steps:")
    yield* Console.log("  1. Generate Homarr API key (Management -> Tools -> API -> Authentication)")
    yield* Console.log("     Add to setup.env as HOMARR_API_KEY=<id>.<token>, then re-run setup")
  }
})

const appLayer = Layer.mergeAll(BunServices.layer, FetchHttpClient.layer)

BunRuntime.runMain(
  program.pipe(Effect.provide(appLayer)) as Effect.Effect<void>,
)
