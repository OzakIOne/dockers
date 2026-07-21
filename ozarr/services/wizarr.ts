import { Effect, Console, pipe, Ref, Layer } from "effect"
import { SqliteClient } from "@effect/sql-sqlite-node"
import { SetupState } from "./state"
import { SqliteError } from "./errors"

const reactivityLayer = Layer.unwrap(
  Effect.tryPromise(() => import("@effect/experimental/Reactivity")).pipe(
    Effect.map((m) => m.Reactivity.layer),
    Effect.catchCause(() => Effect.succeed(Layer.empty)),
  ),
)

export const configure = Effect.fn("Wizarr.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)

  const wizarrMarkdown = `- 📱 **Mobile**: [iOS Streamyfin](https://apps.apple.com/us/app/streamyfin/id6593660679) ou [Android Streamyfin](https://play.google.com/store/apps/details?id=com.fredrikburmester.streamyfin)
- 📺 **Smart TVs & Streaming Devices**: [Apple TV](https://apps.apple.com/us/app/streamyfin/id6593660679?platform=tv), Fire TV, Roku, Chromecast, Android TV (Recherche jellyfin dans l'app store)
- 🎮 **Consoles**: PlayStation & Xbox (Recherche jellyfin dans l'app store)
|||

{{ widget:button url="https://jellyfin.org/downloads" text=_("⬇️ Download Jellyfin Clients") }}

{{ widget:button url="external_url" text=_("Go to Jellyfin") }}`

  yield* Console.log("Configuring Wizarr database...")

  yield* pipe(
    Effect.gen(function* () {
      const jfClient = yield* SqliteClient.make({
        filename: `${state.cfgDir}/jellyfin/data/data/jellyfin.db`,
        readonly: true,
      })
      const rows = yield* jfClient<{ AccessToken: string }>`
        SELECT AccessToken FROM ApiKeys WHERE Name = ${"Seerr"} LIMIT 1
      `
      const jellyfinKey = rows[0]?.AccessToken ?? ""

      const client = yield* SqliteClient.make({
        filename: `${state.cfgDir}/wizarr/database/database.db`,
      })

      yield* client`
        INSERT OR IGNORE INTO media_server (id, name, server_type, url, api_key, verified, created_at, external_url, allow_downloads, allow_live_tv, allow_mobile_uploads)
        VALUES (${1}, ${"Jelly"}, ${"jellyfin"}, ${"http://jellyfin:8096"}, ${jellyfinKey}, ${true}, ${"2026-07-06 00:09:17.980554"}, ${""}, ${false}, ${false}, ${false})
      `

      yield* client.unsafe(
        `DELETE FROM wizard_step WHERE server_type = 'jellyfin'`,
      )

      yield* client`
        INSERT INTO wizard_step (server_type, category, position, title, markdown, requires, require_interaction, created_at, updated_at)
        VALUES (${"jellyfin"}, ${"post_invite"}, ${1}, ${"{{ _('Jellyfin Clients') }}"}, ${wizarrMarkdown}, ${"[]"}, ${false}, ${"2026-07-06 00:04:40.531209"}, ${"2026-07-06 18:13:12.643772"})
      `

      if (jellyfinKey) {
        yield* Ref.set(ref, { ...state, jellyfinKey })
        yield* Console.log("  JELLYFIN_API_KEY → setup.env")
      }
    }),
    Effect.scoped,
    Effect.provide(reactivityLayer),
    Effect.catchCause((e) =>
      Console.log(`  Wizarr config failed: ${String(e).slice(0, 200)}`),
    ),
  )

  yield* Console.log("  Wizarr done.")
})
