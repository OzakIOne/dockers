import { Effect, Schedule, Duration, Console, pipe, Ref } from "effect"
import { SeerrClient, Seerr } from "tsarr"
import { SetupState } from "./state"
import { ApiError } from "./errors"
import type { SonarrSettings, RadarrSettings } from "tsarr/seerr/types"

const wrapSeerr = <T>(
  promise: Promise<{ data?: T; error?: unknown; response?: Response }>,
  label: string,
) =>
  Effect.tryPromise(() => promise).pipe(
    Effect.flatMap((result) => {
      if (result.error !== undefined) {
        return Effect.fail(
          new ApiError({
            service: "seerr",
            status: result.response?.status ?? 0,
            message: `${label}: ${String(result.error).slice(0, 200)}`,
          }),
        )
      }
      return Effect.succeed(result.data as T)
    }),
  )

export const configure = Effect.fn("Seerr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  const baseUrl = "http://localhost:5055"

  if (!state.seerrKey || !state.sonarrKey || !state.radarrKey) {
    yield* Console.log("  Skipping Seerr — missing API keys")
    return
  }

  yield* Console.log("Configuring Seerr services...")
  yield* Console.log("  Waiting for Seerr...")

  yield* Effect.tryPromise(() =>
    new SeerrClient({ baseUrl, apiKey: state.seerrKey }).getSystemStatus(),
  ).pipe(
    Effect.retry(
      pipe(
        Schedule.spaced(Duration.seconds(2)),
        Schedule.both(Schedule.recurs(90)),
      ),
    ),
  )

  yield* Console.log("  Seerr ready")

  const seerrOpts = { baseUrl, headers: { "X-Api-Key": state.seerrKey } as Record<string, string> }

  const existingSonarrs = yield* pipe(
    wrapSeerr(Seerr.getSettingsSonarr(seerrOpts), "getSettingsSonarr"),
    Effect.catchCause(() => Effect.succeed([] as SonarrSettings[])),
  )

  const sonarrExists = existingSonarrs.some(
    (s) => s.name === "Sonarr" && s.hostname === "sonarr" && s.port === 8989 && s.apiKey === state.sonarrKey,
  )

  if (sonarrExists) {
    yield* Console.log("  Seerr → Sonarr already configured, skipping")
  } else {
    yield* pipe(
      wrapSeerr(
        Seerr.postSettingsSonarr({
          ...seerrOpts,
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
        "postSettingsSonarr",
      ),
      Effect.catchCause((e) =>
        Console.log(`  Seerr → Sonarr: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  const existingRadarrs = yield* pipe(
    wrapSeerr(Seerr.getSettingsRadarr(seerrOpts), "getSettingsRadarr"),
    Effect.catchCause(() => Effect.succeed([] as RadarrSettings[])),
  )

  const radarrExists = existingRadarrs.some(
    (s) => s.name === "Radarr" && s.hostname === "radarr" && s.port === 7878 && s.apiKey === state.radarrKey,
  )

  if (radarrExists) {
    yield* Console.log("  Seerr → Radarr already configured, skipping")
  } else {
    yield* pipe(
      wrapSeerr(
        Seerr.postSettingsRadarr({
          ...seerrOpts,
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
        "postSettingsRadarr",
      ),
      Effect.catchCause((e) =>
        Console.log(`  Seerr → Radarr: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Console.log("  Seerr done.")
})