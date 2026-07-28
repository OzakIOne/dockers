import { Effect, Console, pipe, Ref } from "effect"
import { createApi as createJfApi, configureFetcher } from "./__generated/jellyfin-fetcher"
import { createApi as createMaintainerrApi } from "./__generated/maintainerr-fetcher"
import { SetupState } from "./state"

export const configure = Effect.fn("Maintainerr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)

  if (!state.sonarrKey || !state.radarrKey) {
    yield* Console.log("  Skipping Maintainerr — missing API keys")
    return
  }

  yield* Console.log("Configuring Maintainerr...")

  let jellyfinServerName = "Jellyfin"
  let jellyfinUserId = ""

  if (state.jellyfinKey) {
    configureFetcher({ getAuth: () => ({ CustomAuthentication: state.jellyfinKey! }) })
    const jfApi = createJfApi("http://localhost:8096")

    const sysInfo = yield* pipe(
      jfApi.get("/System/Info"),
      Effect.catchCause(() => Effect.succeed(null)),
    )
    if (sysInfo) jellyfinServerName = sysInfo.ServerName ?? "Jellyfin"

    const users = yield* pipe(
      jfApi.get("/Users"),
      Effect.catchCause(() => Effect.succeed(null)),
    )
    if (users) {
      const admin = users.find(
        (u: { Policy?: { IsAdministrator?: boolean } }) => u.Policy?.IsAdministrator,
      )
      jellyfinUserId = (admin ?? users[0])?.Id ?? ""
    }
  }

  yield* Ref.set(ref, { ...state, jellyfinServerName, jellyfinUserId })

  const api = createMaintainerrApi("http://localhost:6246")

  if (state.jellyfinKey && jellyfinUserId) {
    yield* pipe(
      api.post("/api/settings/emby", {
        body: {
          emby_url: "http://jellyfin:8096",
          emby_api_key: state.jellyfinKey,
          emby_user_id: jellyfinUserId,
        },
      }),
      Effect.tap(() => Console.log("  Maintainerr: Jellyfin instance configured")),
      Effect.catchCause((e) =>
        Console.log(`  Maintainerr Jellyfin: ${String(e).slice(0, 180)}`),
      ),
    )
  }

  const settingsBody: Record<string, unknown> = {
    media_server_type: "jellyfin",
    seerr_url: "http://seerr:5055",
    seerr_api_key: state.seerrKey,
    sonarr_url: "http://sonarr:8989",
    sonarr_api_key: state.sonarrKey,
    radarr_url: "http://radarr:7878",
    radarr_api_key: state.radarrKey,
  }

  if (state.jellyfinKey) {
    settingsBody.jellyfin_url = "http://jellyfin:8096"
    settingsBody.jellyfin_api_key = state.jellyfinKey
    settingsBody.jellyfin_user_id = jellyfinUserId
    settingsBody.jellyfin_server_name = jellyfinServerName
  }

  yield* pipe(
    Effect.tryPromise(() =>
      fetch("http://localhost:6246/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsBody),
      }).then((r) => (r.ok ? r : Promise.reject(new Error(`HTTP ${r.status}`)))),
    ),
    Effect.tap(() => Console.log("  Maintainerr: settings updated")),
    Effect.catchCause((e) =>
      Console.log(`  Maintainerr settings: ${String(e).slice(0, 180)}`),
    ),
  )

  yield* Console.log("  Maintainerr done.")
})
