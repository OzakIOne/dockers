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
  qbittorrent: shouldRun("qbittorrent", "sonarr", "radarr"),
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

  const QBittorrent = yield* Effect.tryPromise(() => import("./services/qbittorrent"))
  const Sonarr = yield* Effect.tryPromise(() => import("./services/sonarr"))
  const Radarr = yield* Effect.tryPromise(() => import("./services/radarr"))
  const Prowlarr = yield* Effect.tryPromise(() => import("./services/prowlarr"))
  const Wizarr = yield* Effect.tryPromise(() => import("./services/wizarr"))
  const Seerr = yield* Effect.tryPromise(() => import("./services/seerr"))
  const Jellyfin = yield* Effect.tryPromise(() => import("./services/jellyfin"))
  const Homarr = yield* Effect.tryPromise(() => import("./services/homarr"))
  const Maintainerr = yield* Effect.tryPromise(() => import("./services/maintainerr"))
  const Qui = yield* Effect.tryPromise(() => import("./services/qui"))

  if (WITH.qbittorrent) yield* withState(QBittorrent.preSeedCategories())

  yield* Docker.up()

  if (WITH.wizarr) yield* withState(Wizarr.configure())

  const waits: Array<[string, string]> = []
  if (shouldRun("sonarr", "prowlarr", "seerr")) waits.push(["http://localhost:8989/ping", "Sonarr"])
  if (shouldRun("radarr", "prowlarr", "seerr")) waits.push(["http://localhost:7878/ping", "Radarr"])
  if (shouldRun("prowlarr")) waits.push(["http://localhost:9696/ping", "Prowlarr"])
  if (shouldRun("qbittorrent", "sonarr", "radarr")) waits.push(["http://localhost:6767/", "qBittorrent"])
  if (shouldRun("jellyfin")) waits.push(["http://localhost:8096/web/", "Jellyfin"])
  if (shouldRun("maintainerr")) waits.push(["http://localhost:6246/", "Maintainerr"])
  if (shouldRun("qui")) waits.push(["http://localhost:7476/health", "qui"])
  yield* Wait.all(waits)

  if (shouldRun("qbittorrent", "sonarr", "radarr")) {
    yield* withState(QBittorrent.extractPassword())
    if (shouldRun("qbittorrent")) yield* withState(QBittorrent.setPreferences())
  }

  if (WITH.sonarr) yield* withState(Sonarr.configure())
  if (WITH.radarr) yield* withState(Radarr.configure())
  if (WITH.prowlarr) yield* withState(Prowlarr.configure())

  if (WITH.qui) yield* withState(Qui.configure())

  if (WITH.homarr) yield* withState(Homarr.configure())
  if (WITH.seerr) yield* withState(Seerr.configure())
  if (WITH.jellyfin) yield* withState(Jellyfin.configure())
  if (WITH.maintainerr) yield* withState(Maintainerr.configure())

  const final = yield* Ref.get(stateRef)
  yield* Console.log("")
  yield* Console.log("=== Setup complete ===")
  yield* Console.log("")
  yield* Console.log("Access:")
  yield* Console.log("  qBittorrent:  http://localhost:6767  (user: admin)")
  if (final.qbPass) yield* Console.log(`              password: ${final.qbPass}`)
  else yield* Console.log("              password: check  docker logs qbittorrent")
  yield* Console.log("  Sonarr:       http://localhost:8989")
  yield* Console.log("  Radarr:       http://localhost:7878")
  yield* Console.log("  Prowlarr:     http://localhost:9696")
  yield* Console.log("  Jellyfin:     http://localhost:8096")
  yield* Console.log("  Homarr:       http://localhost:7575")
  yield* Console.log("  Seerr:        http://localhost:5055")
  yield* Console.log("  Maintainerr:  http://localhost:6246")
  yield* Console.log("")
  yield* Console.log("Manual steps:")
  yield* Console.log("  1. Set qBittorrent password: docker logs qbittorrent, then add QBITTORRENT_PASSWORD=<pw> to setup.env")
  yield* Console.log("  2. Set QUI_USERNAME and QUI_PASSWORD in setup.env for qui (cross-seed)")
  yield* Console.log("  3. Generate Wizarr API key in WebUI, add WIZARR_API_KEY=<key> to setup.env")
  if (!Bun.env.HOMARR_API_KEY) {
    yield* Console.log("  4. Generate Homarr API key (Management -> Tools -> API -> Authentication)")
    yield* Console.log("     Add to setup.env as HOMARR_API_KEY=<id>.<token>, then re-run setup")
  }
  yield* Console.log("  5. Set username/password in each *arr service (Settings > General)")
  yield* Console.log("  6. Add indexers in Prowlarr (Settings > Indexers)")
  yield* Console.log("  7. Configure Jellyfin libraries: /data/media/tv and /data/media/movies")
})

const appLayer = Layer.mergeAll(BunServices.layer, FetchHttpClient.layer)

BunRuntime.runMain(
  program.pipe(Effect.provide(appLayer)) as Effect.Effect<void>,
)
