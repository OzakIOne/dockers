import { Effect, Console, pipe, Ref } from "effect"
import { createApi, configureFetcher } from "./__generated/homarr-fetcher"
import { SetupState } from "./state"

const icon = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/${slug}.png`

const APPS = [
  { name: "Jellyfin", description: "Media Server", iconUrl: icon("jellyfin"), href: "http://jellyfin:8096", pingUrl: "http://jellyfin:8096" },
  { name: "Sonarr", description: "TV Series Manager", iconUrl: icon("sonarr"), href: "http://sonarr:8989", pingUrl: "http://sonarr:8989/ping" },
  { name: "Radarr", description: "Movie Manager", iconUrl: icon("radarr"), href: "http://radarr:7878", pingUrl: "http://radarr:7878/ping" },
  { name: "Prowlarr", description: "Indexer Manager", iconUrl: icon("prowlarr"), href: "http://prowlarr:9696", pingUrl: "http://prowlarr:9696/ping" },
  { name: "qBittorrent", description: "Torrent Client", iconUrl: icon("qbittorrent"), href: "http://qbittorrent:8888", pingUrl: "http://qbittorrent:8888" },
  { name: "Seerr", description: "Media Requests", iconUrl: icon("overseerr"), href: "http://seerr:5055", pingUrl: "http://seerr:5055" },
]

export const configure = Effect.fn("Homarr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)

  if (!state.homarrKey) {
    yield* Console.log("  Skipping Homarr — no HOMARR_API_KEY")
    return
  }

  yield* Console.log("Configuring Homarr apps...")

  configureFetcher({ getAuth: () => ({ apikey: state.homarrKey! }) })
  const api = createApi("http://localhost:7575")

  for (const app of APPS) {
    yield* pipe(
      api.post("/api/apps", { body: app }),
      Effect.catchCause(() =>
        state.debug
          ? Console.log(`  \x1b[33m[debug]\x1b[0m Homarr app ${app.name} may already exist`)
          : Effect.void,
      ),
    )
  }

  yield* Console.log("  Homarr done.")
})
