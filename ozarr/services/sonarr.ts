import { Effect, Console, pipe, Ref } from "effect"
import { createApi, configureFetcher } from "./__generated/sonarr-fetcher"
import { SetupState } from "./state"

export const configure = Effect.fn("Sonarr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  if (!state.sonarrKey) {
    yield* Console.log("  Skipping Sonarr — no API key")
    return
  }

  yield* Console.log("Configuring Sonarr...")
  configureFetcher({ getAuth: () => ({ X_Api_Key: state.sonarrKey }) })
  const api = createApi(state.sonarrUrl.replace(/\/+$/, ""))

  yield* pipe(
    api.post("/api/v5/rootfolder", { body: { path: "/data/media/tv" } }),
    Effect.catchCause((e) =>
      Console.log(`  Sonarr root folder (may already exist): ${String(e).slice(0, 120)}`),
    ),
  )

  const mediaConfig = {
    id: 1,
    autoUnmonitorPreviouslyDownloadedEpisodes: false,
    recycleBin: "",
    recycleBinCleanupDays: 7,
    downloadPropersAndRepacks: "preferAndUpgrade",
    createEmptySeriesFolders: false,
    deleteEmptyFolders: false,
    fileDate: "none",
    rescanAfterRefresh: "always",
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
    api.put("/api/v5/settings/mediamanagement/{id}", {
      path: { id: "1" },
      body: mediaConfig,
    }),
    Effect.catchCause((e) =>
      Console.log(`  Sonarr media management: ${String(e).slice(0, 120)}`),
    ),
  )

  if (state.qbPass) {
    yield* pipe(
      api.post("/api/v5/downloadclient", {
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
            { name: "tvCategory", value: "sonarr" },
            { name: "firstAndLast", value: true },
            { name: "useSsl", value: false },
          ],
        },
      }),
      Effect.catchCause((e) =>
        Console.log(`  Sonarr download client: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Console.log("  Sonarr done.")
})
