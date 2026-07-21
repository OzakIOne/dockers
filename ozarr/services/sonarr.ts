import { Effect, Console, pipe, Ref } from "effect"
import { SonarrClient } from "tsarr/sonarr"
import type { MediaManagementConfigResource } from "tsarr/sonarr/types"
import { SetupState } from "./state"
import { ApiError } from "./errors"

const wrap = <T>(promise: Promise<{ data?: T; error?: unknown; response?: Response }>, label: string) =>
  Effect.tryPromise(() => promise).pipe(
    Effect.flatMap((result) => {
      if (result.error !== undefined) {
        return Effect.fail(
          new ApiError({
            service: "sonarr",
            status: result.response?.status ?? 0,
            message: `${label}: ${String(result.error).slice(0, 200)}`,
          }),
        )
      }
      return Effect.succeed(result.data as T)
    }),
  )

export const extractKey = Effect.fn("Sonarr.extractKey")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  const key = yield* Effect.sync(() => {
    try {
      const content = require("fs").readFileSync(`${state.cfgDir}/sonarr/config.xml`, "utf-8")
      const m = content.match(/<ApiKey>([^<]+)<\/ApiKey>/)
      return m ? m[1] : ""
    } catch {
      return ""
    }
  })
  yield* Ref.set(ref, { ...state, sonarrKey: key })
  return key
})

export const configure = Effect.fn("Sonarr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  if (!state.sonarrKey) {
    yield* Console.log("  Skipping Sonarr — no API key")
    return
  }

  yield* Console.log("Configuring Sonarr...")
  const client = new SonarrClient({ baseUrl: state.sonarrUrl, apiKey: state.sonarrKey })

  yield* pipe(
    wrap(client.addRootFolder("/data/media/tv"), "rootFolder"),
    Effect.catchCause((e) =>
      Console.log(`  Sonarr root folder (may already exist): ${String(e).slice(0, 120)}`),
    ),
  )

  const mediaConfig: MediaManagementConfigResource = {
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
    wrap(client.updateMediaManagementConfig("1", mediaConfig), "mediaManagement"),
    Effect.catchCause((e) =>
      Console.log(`  Sonarr media management: ${String(e).slice(0, 120)}`),
    ),
  )

  if (state.qbPass) {
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
            { name: "password", value: state.qbPass },
            { name: "tvCategory", value: "sonarr" },
            { name: "firstAndLast", value: true },
            { name: "useSsl", value: false },
          ],
        }),
        "downloadClient",
      ),
      Effect.catchCause((e) =>
        Console.log(`  Sonarr download client: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Console.log("  Sonarr done.")
})
