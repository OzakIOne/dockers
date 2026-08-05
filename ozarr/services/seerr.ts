import { Effect, Schedule, Duration, Console, pipe, Ref } from "effect"
import { createApi, configureFetcher } from "./__generated/seerr-fetcher"
import { SetupState } from "./state"

export const configure = Effect.fn("Seerr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  const baseUrl = "http://localhost:5055/api/v1"

  if (!state.seerrKey || !state.sonarrKey || !state.radarrKey) {
    yield* Console.log("  Skipping Seerr — missing API keys")
    return
  }

  yield* Console.log("Configuring Seerr services...")
  yield* Console.log("  Waiting for Seerr...")

  configureFetcher({ getAuth: () => ({ apiKey: state.seerrKey }) })
  const api = createApi(baseUrl)

  yield* pipe(
    api.get("/status"),
    Effect.retry(
      pipe(
        Schedule.spaced(Duration.seconds(2)),
        Schedule.upTo({ times: 90 }),
      ),
    ),
  )

  yield* Console.log("  Seerr ready")

  const existingSonarrs = yield* pipe(
    api.get("/settings/sonarr"),
    Effect.catchCause(() => Effect.succeed([])),
  )
  const sonarrExists =
    Array.isArray(existingSonarrs) &&
    existingSonarrs.some(
      (s) => s.name === "Sonarr" && s.hostname === "sonarr" && s.port === 8989 && s.apiKey === state.sonarrKey,
    )

  if (sonarrExists) {
    yield* Console.log("  Seerr → Sonarr already configured, skipping")
  } else {
    yield* pipe(
      api.post("/settings/sonarr", {
        body: {
          name: "Sonarr",
          hostname: "sonarr",
          port: 8989,
          apiKey: state.sonarrKey,
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
      Effect.catchCause((e) =>
        Console.log(`  Seerr → Sonarr: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  const existingRadarrs = yield* pipe(
    api.get("/settings/radarr"),
    Effect.catchCause(() => Effect.succeed([])),
  )
  const radarrExists =
    Array.isArray(existingRadarrs) &&
    existingRadarrs.some(
      (s) => s.name === "Radarr" && s.hostname === "radarr" && s.port === 7878 && s.apiKey === state.radarrKey,
    )

  if (radarrExists) {
    yield* Console.log("  Seerr → Radarr already configured, skipping")
  } else {
    yield* pipe(
      api.post("/settings/radarr", {
        body: {
          name: "Radarr",
          hostname: "radarr",
          port: 7878,
          apiKey: state.radarrKey,
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
      Effect.catchCause((e) =>
        Console.log(`  Seerr → Radarr: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Console.log("  Seerr done.")
})
