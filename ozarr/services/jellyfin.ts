import { Effect, Console, pipe, Ref } from "effect"
import { createApi, configureFetcher } from "./__generated/jellyfin-fetcher"
import { SetupState } from "./state"

const JELLYFIN_PLUGINS = [
  {
    name: "Intro Skipper",
    guid: "c83d86bb-a1e0-4c35-a113-e2101cf4ee6b",
    repoUrl: "https://intro-skipper.org/manifest.json",
  },
]

export const configure = Effect.fn("Jellyfin.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)
  const jfKey = state.jellyfinKey

  if (!jfKey) {
    yield* Console.log("  Skipping Jellyfin plugins — no JELLYFIN_API_KEY")
    return
  }

  yield* Console.log("Configuring Jellyfin plugins...")

  configureFetcher({ getAuth: () => ({ CustomAuthentication: jfKey }) })
  const api = createApi("http://localhost:8096")

  const uniqueRepos = [
    ...new Map(
      JELLYFIN_PLUGINS.map((p) => [p.repoUrl, { name: p.name, repoUrl: p.repoUrl }]),
    ).values(),
  ]

  for (const repo of uniqueRepos) {
    yield* pipe(
      Effect.gen(function* () {
        const existing = yield* pipe(
          api.get("/Repositories"),
          Effect.catchCause(() => Effect.succeed([])),
        )

        const already = existing.some((r: { Url?: string | null }) => r.Url === repo.repoUrl)
        if (already) {
          yield* Console.log(`  Repository "${repo.name}" already registered`)
        } else {
          const updated = [...existing, { Name: repo.name, Url: repo.repoUrl, Enabled: true }]
          yield* api.post("/Repositories", { body: updated })
          yield* Console.log(`  Repository "${repo.name}" added`)
        }
      }),
      Effect.catchCause((e) =>
        Console.log(`  Jellyfin add repo ${repo.name}: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  for (const plugin of JELLYFIN_PLUGINS) {
    yield* pipe(
      api.post("/Packages/Installed/{name}", {
        path: { name: plugin.name },
        query: {
          assemblyGuid: plugin.guid,
          repositoryUrl: plugin.repoUrl,
        },
      }),
      Effect.catchCause((e) =>
        Console.log(`  Jellyfin install ${plugin.name}: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  yield* Effect.sync(() => {
    const branding = `<?xml version="1.0" encoding="utf-8"?>
<BrandingOptions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <LoginDisclaimer />
  <CustomCss>@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");@import url("https://cdn.jsdelivr.net/gh/intro-skipper/intro-skipper-css@main/skip-button.min.css");

:root {
    /* Skip button timing */
    --skip-hide-duration: 8s;
}</CustomCss>
  <SplashscreenEnabled>false</SplashscreenEnabled>
</BrandingOptions>`
    require("fs").writeFileSync(`${state.cfgDir}/jellyfin/branding.xml`, branding)
  })
  yield* Console.log("  branding.xml written")

  yield* Console.log("  Jellyfin plugins done.")
})
