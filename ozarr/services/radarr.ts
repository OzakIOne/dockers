import { Effect, Console, pipe, Ref } from "effect"
import { createApi, configureFetcher } from "./__generated/radarr-fetcher"
import { SetupState } from "./state"

export const configure = Effect.fn("Radarr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  if (!state.radarrKey) {
    yield* Console.log("  Skipping Radarr — no API key")
    return
  }

  yield* Console.log("Configuring Radarr...")
  configureFetcher({ getAuth: () => ({ X_Api_Key: state.radarrKey }) })
  const api = createApi(state.radarrUrl.replace(/\/+$/, ""))

  yield* pipe(
    api.post("/api/v3/rootfolder", { body: { path: "/data/media/movies" } }),
    Effect.catchCause((e) =>
      Console.log(`  Radarr root folder (may already exist): ${String(e).slice(0, 120)}`),
    ),
  )

  const mediaConfig = {
    id: 1,
    autoUnmonitorPreviouslyDownloadedMovies: false,
    recycleBin: "",
    recycleBinCleanupDays: 7,
    downloadPropersAndRepacks: "preferAndUpgrade",
    createEmptyMovieFolders: false,
    deleteEmptyFolders: false,
    fileDate: "none",
    rescanAfterRefresh: "always",
    autoRenameFolders: false,
    setPermissionsLinux: false,
    chmodFolder: "755",
    chownGroup: "",
    skipFreeSpaceCheckWhenImporting: false,
    minimumFreeSpaceWhenImporting: 100,
    copyUsingHardlinks: true,
    importExtraFiles: true,
    enableMediaInfo: true,
  }

  yield* pipe(
    api.put("/api/v3/config/mediamanagement/{id}", {
      path: { id: "1" },
      body: mediaConfig,
    }),
    Effect.catchCause((e) =>
      Console.log(`  Radarr media management: ${String(e).slice(0, 120)}`),
    ),
  )

  if (state.qbPass) {
    yield* pipe(
      api.post("/api/v3/downloadclient", {
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
            { name: "movieCategory", value: "radarr" },
            { name: "firstAndLast", value: true },
            { name: "useSsl", value: false },
          ],
        },
      }),
      Effect.catchCause((e) =>
        Console.log(`  Radarr download client: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Console.log("  Radarr done.")
})
