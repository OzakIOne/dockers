import { Effect, Schedule, Duration, pipe, Layer, Console, Ref } from "effect"
import { FetchHttpClient } from "effect/unstable/http"
import { BunServices, BunRuntime } from "@effect/platform-bun"
import { SetupState } from "./services/state"
import * as Env from "./services/env"
import * as Docker from "./services/docker"
import * as Wait from "./services/wait"
import * as QBittorrent from "./services/qbittorrent"
import * as Sonarr from "./services/sonarr"
import * as Radarr from "./services/radarr"
import * as Prowlarr from "./services/prowlarr"
import * as Wizarr from "./services/wizarr"
import * as Seerr from "./services/seerr"
import * as Jellyfin from "./services/jellyfin"
import * as Homarr from "./services/homarr"
import * as Maintainerr from "./services/maintainerr"

const TARGET_SERVICE = (() => {
  const idx = Bun.argv.indexOf("--service")
  if (idx >= 0 && idx + 1 < Bun.argv.length) return Bun.argv[idx + 1].toLowerCase()
  const shortIdx = Bun.argv.indexOf("-s")
  if (shortIdx >= 0 && shortIdx + 1 < Bun.argv.length)
    return Bun.argv[shortIdx + 1].toLowerCase()
  return null
})()

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

  if (WITH.qbittorrent) yield* withState(QBittorrent.preSeedCategories())

  yield* Docker.up()

  if (WITH.wizarr) yield* withState(Wizarr.configure())

  const waits: Array<[string, string]> = []
  if (shouldRun("sonarr", "prowlarr", "seerr")) waits.push(["http://localhost:8989/ping", "Sonarr"])
  if (shouldRun("radarr", "prowlarr", "seerr")) waits.push(["http://localhost:7878/ping", "Radarr"])
  if (shouldRun("prowlarr")) waits.push(["http://localhost:9696/ping", "Prowlarr"])
  if (shouldRun("qbittorrent", "sonarr", "radarr")) waits.push(["http://localhost:8888/", "qBittorrent"])
  if (shouldRun("jellyfin")) waits.push(["http://localhost:8096/web/", "Jellyfin"])
  if (shouldRun("maintainerr")) waits.push(["http://localhost:6246/", "Maintainerr"])
  yield* Wait.all(waits)

  if (shouldRun("qbittorrent", "sonarr", "radarr")) {
    yield* withState(QBittorrent.extractPassword())
    if (shouldRun("qbittorrent")) yield* withState(QBittorrent.setPreferences())
  }

  if (shouldRun("sonarr")) yield* withState(Sonarr.extractKey())
  if (shouldRun("radarr")) yield* withState(Radarr.extractKey())
  if (shouldRun("prowlarr")) yield* withState(Prowlarr.extractKey())
  yield* withState(Seerr.extractKey())

  if (WITH.sonarr) yield* withState(Sonarr.configure())
  if (WITH.radarr) yield* withState(Radarr.configure())
  if (WITH.prowlarr) yield* withState(Prowlarr.configure())

  yield* Console.log("Exporting API keys to setup.env...")
  const current = yield* Ref.get(stateRef)
  yield* Effect.sync(() => {
    let env = ""
    try { env = require("fs").readFileSync("setup.env", "utf-8") } catch {}
    const setOrReplace = (key: string, value: string) => {
      const line = `${key}=${value}`
      if (env.includes(`${key}=`)) {
        env = env.replace(new RegExp(`^${key}=.*$`, "m"), line)
      } else {
        env = env.trimEnd() + "\n" + line + "\n"
      }
    }
    setOrReplace("SONARR_API_KEY", current.sonarrKey)
    setOrReplace("RADARR_API_KEY", current.radarrKey)
    setOrReplace("PROWLARR_API_KEY", current.prowlarrKey)
    setOrReplace("SEERR_API_KEY", current.seerrKey)
    require("fs").writeFileSync("setup.env", env)
  })

  if (current.sonarrKey) yield* Console.log("  SONARR_API_KEY  → setup.env")
  if (current.radarrKey) yield* Console.log("  RADARR_API_KEY  → setup.env")
  if (current.prowlarrKey) yield* Console.log("  PROWLARR_API_KEY → setup.env")
  if (current.seerrKey) yield* Console.log("  SEERR_API_KEY   → setup.env")

  if (WITH.homarr) yield* withState(Homarr.configure())
  if (WITH.seerr) yield* withState(Seerr.configure())
  if (WITH.jellyfin) yield* withState(Jellyfin.configure())
  if (WITH.maintainerr) yield* withState(Maintainerr.configure())

  const final = yield* Ref.get(stateRef)
  yield* Console.log("")
  yield* Console.log("=== Setup complete ===")
  yield* Console.log("")
  yield* Console.log("Access:")
  yield* Console.log("  qBittorrent:  http://localhost:8888  (user: admin)")
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
  yield* Console.log("  1. Set username/password in each *arr service (Settings > General)")
  yield* Console.log("  2. Add indexers in Prowlarr (Settings > Indexers)")
  yield* Console.log("  3. Configure Jellyfin libraries: /data/media/tv and /data/media/movies")
  if (!Bun.env.HOMARR_API_KEY) {
    yield* Console.log("  4. Generate Homarr API key (Management → Tools → API → Authentication)")
    yield* Console.log("     Add to setup.env as HOMARR_API_KEY=<id>.<token>, then re-run setup")
  }
  yield* Console.log("  5. To re-run with qBittorrent creds: bun setup.ts admin <password>")
})

const appLayer = Layer.mergeAll(BunServices.layer, FetchHttpClient.layer)

BunRuntime.runMain(
  program.pipe(Effect.provide(appLayer)) as Effect.Effect<void>,
)
