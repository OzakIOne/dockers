import { Effect, Console, pipe, Ref } from "effect"
import { QBittorrentClient, QBittorrent } from "tsarr"
import { SetupState } from "./state"
import { ApiError } from "./errors"

export const preSeedCategories = Effect.fn("QBittorrent.preSeedCategories")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  yield* Console.log("Seeding qBittorrent categories...")
  yield* Effect.tryPromise(() =>
    Bun.write(
      `${state.cfgDir}/qbittorrent/qBittorrent/categories.json`,
      JSON.stringify(
        {
          sonarr: { savePath: "/data/downloads/torrents/tv" },
          radarr: { savePath: "/data/downloads/torrents/movies" },
        },
        null,
        2,
      ),
    ),
  )
})

export const extractPassword = Effect.fn("QBittorrent.extractPassword")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)

  let qbPass = ""

  const logs = yield* Effect.tryPromise(() =>
    Bun.$`docker logs qbittorrent 2>/dev/null`.text(),
  ).pipe(Effect.catchCause(() => Effect.succeed("")))

  const m = logs.match(/session:\s*['"]?(\S+)['"]?/)
  if (m) qbPass = m[1]

  if (!qbPass && state.qbPass) qbPass = state.qbPass

  yield* Ref.set(ref, { ...state, qbPass })

  if (qbPass) {
    yield* Effect.tryPromise(() => {
      const client = new QBittorrentClient({
        baseUrl: "http://localhost:8888",
        username: state.qbUser,
        password: qbPass,
      })
      return client.getSystemStatus()
    }).pipe(
      Effect.tap(() => Console.log("  qBittorrent SDK connection verified.")),
      Effect.catchCause(() =>
        Console.log("  Warning: qBittorrent SDK connection failed."),
      ),
    )
  }
})

export const setPreferences = Effect.fn("QBittorrent.setPreferences")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  if (!state.qbPass) return

  yield* Console.log("  Setting qBittorrent preferences...")
  const baseUrl = "http://localhost:8888"

  const loginResult = yield* pipe(
    Effect.tryPromise(() =>
      QBittorrent.authLoginPost({
        baseUrl,
        headers: { Referer: baseUrl, Origin: baseUrl } as Record<string, string>,
        body: { username: state.qbUser, password: state.qbPass },
      }),
    ),
    Effect.flatMap((r) => {
      if (r.error) return Effect.fail(String(r.error))
      return Effect.succeed(r)
    }),
  ).pipe(
    Effect.catchCause((e) =>
      Console.log(`  qBittorrent login failed: ${String(e).slice(0, 120)}`),
    ),
  )

  if (!loginResult) return

  const setCookie = loginResult.response?.headers?.get("set-cookie")
  if (!setCookie) {
    yield* Console.log("  qBittorrent login succeeded but no SID cookie received")
    return
  }
  const sidMatch = setCookie.match(/(SID|QBT_SID_\d+)=([^;]+)/)
  if (!sidMatch) {
    yield* Console.log("  No SID cookie found")
    return
  }

  yield* pipe(
    Effect.tryPromise(() =>
      QBittorrent.appSetPreferencesPost({
        baseUrl,
        headers: { Cookie: `${sidMatch[1]}=${sidMatch[2]}` } as Record<string, string>,
        body: {
          json: {
            alternative_webui_enabled: true,
            alternative_webui_path: "/vuetorrent",
            autorun_enabled: true,
            autorun_program: 'chmod -R 775 "%F/"',
            save_path: "/data/downloads/torrents/",
            temp_path_enabled: false,
            auto_tmm_enabled: true,
            torrent_changed_tmm_enabled: true,
            save_path_changed_tmm_enabled: true,
            category_changed_tmm_enabled: true,
          },
        },
      }),
    ),
    Effect.tap(() => Console.log("  qBittorrent preferences set.")),
    Effect.catchCause((e) =>
      Console.log(`  Warning: qBittorrent preferences failed: ${String(e).slice(0, 120)}`),
    ),
  )
})