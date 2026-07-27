import { Effect, Console, pipe, Ref, Layer } from "effect"
import { SqliteClient } from "@effect/sql-sqlite-node"
import { createApi, configureFetcher } from "./__generated/jellyfin-fetcher"
import { SetupState } from "./state"

const reactivityLayer = Layer.unwrap(
  Effect.tryPromise(() => import("@effect/experimental/Reactivity")).pipe(
    Effect.map((m) => m.Reactivity.layer),
    Effect.catchCause(() => Effect.succeed(Layer.empty)),
  ),
)

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
    const api = createApi("http://localhost:8096")

    const sysInfo = yield* pipe(
      api.get("/System/Info"),
      Effect.catchCause(() => Effect.succeed(null)),
    )
    if (sysInfo) jellyfinServerName = sysInfo.ServerName ?? "Jellyfin"

    const users = yield* pipe(
      api.get("/Users"),
      Effect.catchCause(() => Effect.succeed(null)),
    )
    if (users) {
      const admin = users.find((u: { Policy?: { IsAdministrator?: boolean } }) => u.Policy?.IsAdministrator)
      jellyfinUserId = (admin ?? users[0])?.Id ?? ""
    }
  }

  yield* Ref.set(ref, { ...state, jellyfinServerName, jellyfinUserId })

  yield* pipe(
    Effect.gen(function* () {
      const client = yield* SqliteClient.make({
        filename: `${state.cfgDir}/maintainerr/maintainerr.sqlite`,
      })

      yield* client`
        INSERT OR REPLACE INTO sonarr_settings (id, serverName, url, apiKey)
        VALUES (${1}, ${"sonarr"}, ${"http://sonarr:8989"}, ${state.sonarrKey})
      `

      yield* client`
        INSERT OR REPLACE INTO radarr_settings (id, serverName, url, apiKey)
        VALUES (${1}, ${"radarr"}, ${"http://radarr:7878"}, ${state.radarrKey})
      `

      yield* client`
        UPDATE settings SET
          media_server_type = ${"jellyfin"},
          jellyfin_url = ${"http://jellyfin:8096"},
          jellyfin_api_key = ${state.jellyfinKey},
          jellyfin_user_id = ${jellyfinUserId},
          jellyfin_server_name = ${jellyfinServerName},
          seerr_url = ${"http://seerr:5055"},
          seerr_api_key = ${state.seerrKey}
        WHERE id = ${1}
      `

      yield* Console.log("  Maintainerr configured.")
    }),
    Effect.scoped,
    Effect.provide(reactivityLayer),
    Effect.catchCause((e) =>
      Console.log(`  Maintainerr config failed: ${String(e).slice(0, 200)}`),
    ),
  )
})
