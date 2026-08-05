import { Effect, Console, pipe, Ref } from "effect"
import { createApi, configureFetcher } from "./__generated/prowlarr-fetcher"
import { SetupState } from "./state"

export const configure = Effect.fn("Prowlarr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  if (!state.prowlarrKey) {
    yield* Console.log("  Skipping Prowlarr — no API key")
    return
  }

  yield* Console.log("Configuring Prowlarr...")
  configureFetcher({ getAuth: () => ({ X_Api_Key: state.prowlarrKey }) })
  const api = createApi(state.prowlarrUrl.replace(/\/+$/, ""))

  yield* pipe(
    api.post("/api/v1/indexer", {
      body: {
        name: "FlareSolverr",
        implementation: "FlareSolverr",
        configContract: "FlareSolverrSettings",
        fields: [{ name: "host", value: "http://flaresolverr:8191" }],
        tags: [{ id: 0, label: "flare" }],
      },
    }),
    Effect.catchCause((e) =>
      Console.log(`  Prowlarr FlareSolverr (may already exist): ${String(e).slice(0, 120)}`),
    ),
  )

  if (state.sonarrKey) {
    yield* pipe(
      api.post("/api/v1/applications", {
        body: {
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
        },
      }),
      Effect.catchCause((e) =>
        Console.log(`  Prowlarr → Sonarr app (may already exist): ${String(e).slice(0, 120)}`),
      ),
    )
  }

  if (state.radarrKey) {
    yield* pipe(
      api.post("/api/v1/applications", {
        body: {
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
        },
      }),
      Effect.catchCause((e) =>
        Console.log(`  Prowlarr → Radarr app (may already exist): ${String(e).slice(0, 120)}`),
      ),
    )
  }

  if (state.qbPass) {
    yield* pipe(
      api.post("/api/v1/downloadclient", {
        body: {
          enable: true,
          protocol: "torrent",
          name: "qBittorrent",
          implementation: "QBittorrent",
          configContract: "QBittorrentSettings",
          fields: [
            { name: "host", value: "qbittorrent" },
            { name: "port", value: 6767 },
            { name: "username", value: state.qbUser },
            { name: "password", value: state.qbPass },
            { name: "category", value: "prowlarr" },
            { name: "sequentialOrder", value: true },
            { name: "firstAndLast", value: true },
            { name: "initialState", value: 0 },
            { name: "useSsl", value: false },
            { name: "priority", value: 1 },
            { name: "contentLayout", value: 0 },
          ],
        },
      }),
      Effect.catchCause((e) =>
        Console.log(`  Prowlarr download client: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Console.log("  Prowlarr done.")
})
