import { Effect, Console, pipe, Ref } from "effect"
import { ProwlarrClient } from "tsarr/prowlarr"
import type { ApplicationResource } from "tsarr/prowlarr/types"
import { SetupState } from "./state"
import { ApiError } from "./errors"

const wrap = <T>(promise: Promise<{ data?: T; error?: unknown; response?: Response }>, label: string) =>
  Effect.tryPromise(() => promise).pipe(
    Effect.flatMap((result) => {
      if (result.error !== undefined) {
        return Effect.fail(
          new ApiError({
            service: "prowlarr",
            status: result.response?.status ?? 0,
            message: `${label}: ${String(result.error).slice(0, 200)}`,
          }),
        )
      }
      return Effect.succeed(result.data as T)
    }),
  )

export const extractKey = Effect.fn("Prowlarr.extractKey")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  const key = yield* Effect.sync(() => {
    try {
      const content = require("fs").readFileSync(`${state.cfgDir}/prowlarr/config.xml`, "utf-8")
      const m = content.match(/<ApiKey>([^<]+)<\/ApiKey>/)
      return m ? m[1] : ""
    } catch {
      return ""
    }
  })
  yield* Ref.set(ref, { ...state, prowlarrKey: key })
  return key
})

export const configure = Effect.fn("Prowlarr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  if (!state.prowlarrKey) {
    yield* Console.log("  Skipping Prowlarr — no API key")
    return
  }

  yield* Console.log("Configuring Prowlarr...")
  const client = new ProwlarrClient({ baseUrl: state.prowlarrUrl, apiKey: state.prowlarrKey })

  yield* pipe(
    Effect.tryPromise(() =>
      client.addIndexer({
        name: "FlareSolverr",
        implementation: "FlareSolverr",
        configContract: "FlareSolverrSettings",
        fields: [{ name: "host", value: "http://flaresolverr:8191" }],
        tags: [{ id: 0, label: "flare" }],
      }),
    ),
    Effect.catchCause((e) =>
      Console.log(`  Prowlarr FlareSolverr (may already exist): ${String(e).slice(0, 120)}`),
    ),
  )

  if (state.sonarrKey) {
    const sonarrApp: ApplicationResource = {
      name: "Sonarr",
      implementation: "Sonarr",
      configContract: "SonarrSettings",
      syncLevel: "fullSync",
      fields: [
        { name: "baseUrl", value: "http://sonarr:8989" },
        { name: "apiKey", value: state.sonarrKey },
        { name: "prowlarrUrl", value: "http://prowlarr:9696" },
        { name: "syncCategories", value: [5000, 5001, 5002, 5003, 5004, 5005] },
      ],
      tags: [],
    }
    yield* pipe(
      wrap(client.addApplication(sonarrApp), "sonarrApp"),
      Effect.catchCause((e) =>
        Console.log(`  Prowlarr → Sonarr app (may already exist): ${String(e).slice(0, 120)}`),
      ),
    )
  }

  if (state.radarrKey) {
    const radarrApp: ApplicationResource = {
      name: "Radarr",
      implementation: "Radarr",
      configContract: "RadarrSettings",
      syncLevel: "fullSync",
      fields: [
        { name: "baseUrl", value: "http://radarr:7878" },
        { name: "apiKey", value: state.radarrKey },
        { name: "prowlarrUrl", value: "http://prowlarr:9696" },
        { name: "syncCategories", value: [2000, 2010, 2020, 2030, 2040, 2045, 2050, 2060, 2070, 2080] },
      ],
      tags: [],
    }
    yield* pipe(
      wrap(client.addApplication(radarrApp), "radarrApp"),
      Effect.catchCause((e) =>
        Console.log(`  Prowlarr → Radarr app (may already exist): ${String(e).slice(0, 120)}`),
      ),
    )
  }

  const effectiveQbPass = state.qbPass
  if (effectiveQbPass) {
    yield* pipe(
      wrap(
        client.addDownloadClient({
          enable: true,
          protocol: "torrent",
          name: "qBittorrent",
          implementation: "QBittorrent",
          configContract: "QBittorrentSettings",
          fields: [
            { name: "host", value: "qbittorrent" },
            { name: "port", value: 8888 },
            { name: "username", value: state.qbUser },
            { name: "password", value: effectiveQbPass },
            { name: "category", value: "prowlarr" },
            { name: "sequentialOrder", value: true },
            { name: "firstAndLast", value: true },
            { name: "initialState", value: 0 },
            { name: "useSsl", value: false },
            { name: "priority", value: 1 },
            { name: "contentLayout", value: 0 },
          ],
        }),
        "downloadClient",
      ),
      Effect.catchCause((e) =>
        Console.log(`  Prowlarr download client: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Console.log("  Prowlarr done.")
})
