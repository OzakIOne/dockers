import { Effect, Schedule, Duration, Console, pipe, Ref } from "effect"
import { SeerrClient } from "tsarr/seerr"
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http"
import { SetupState } from "./state"
import type { SonarrSettings, RadarrSettings } from "tsarr/seerr/types"

const apiHeaders = (key: string) => (req: any) =>
  pipe(req, HttpClientRequest.setHeader("X-Api-Key", key))

const get = (url: string, key: string) =>
  pipe(
    HttpClientRequest.get(url),
    apiHeaders(key),
    HttpClient.execute,
    Effect.flatMap(HttpClientResponse.filterStatusOk),
    Effect.flatMap((res) => Effect.tryPromise(() => res.json())),
  )

const post = (url: string, key: string, body: unknown) =>
  pipe(
    HttpClientRequest.post(url),
    apiHeaders(key),
    HttpClientRequest.bodyJson(body),
    HttpClient.execute,
    Effect.flatMap(HttpClientResponse.filterStatusOk),
    Effect.asVoid,
  )

export const extractKey = Effect.fn("Seerr.extractKey")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  const key = yield* Effect.sync(() => {
    try {
      const raw = require("fs").readFileSync("config/seerr/settings.json", "utf-8")
      const parsed = JSON.parse(raw)
      return parsed?.main?.apiKey ?? ""
    } catch {
      return ""
    }
  })
  yield* Ref.set(ref, { ...state, seerrKey: key })
  return key
})

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

  const existingSonarrs = yield* pipe(
    get(`${baseUrl}/api/v1/settings/sonarr`, state.seerrKey),
    Effect.map((v) => v as SonarrSettings[]),
    Effect.catchCause(() => Effect.succeed([] as SonarrSettings[])),
  )

  const sonarrExists = existingSonarrs.some(
    (s) => s.name === "Sonarr" && s.hostname === "sonarr" && s.port === 8989 && s.apiKey === state.sonarrKey,
  )

  if (sonarrExists) {
    yield* Console.log("  Seerr → Sonarr already configured, skipping")
  } else {
    yield* pipe(
      post(`${baseUrl}/api/v1/settings/sonarr`, state.seerrKey, {
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
      }),
      Effect.catchCause((e) =>
        Console.log(`  Seerr → Sonarr: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  const existingRadarrs = yield* pipe(
    get(`${baseUrl}/api/v1/settings/radarr`, state.seerrKey),
    Effect.map((v) => v as RadarrSettings[]),
    Effect.catchCause(() => Effect.succeed([] as RadarrSettings[])),
  )

  const radarrExists = existingRadarrs.some(
    (s) => s.name === "Radarr" && s.hostname === "radarr" && s.port === 7878 && s.apiKey === state.radarrKey,
  )

  if (radarrExists) {
    yield* Console.log("  Seerr → Radarr already configured, skipping")
  } else {
    yield* pipe(
      post(`${baseUrl}/api/v1/settings/radarr`, state.seerrKey, {
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
      }),
      Effect.catchCause((e) =>
        Console.log(`  Seerr → Radarr: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Console.log("  Seerr done.")
})
