import { Effect, Console, pipe, Ref } from "effect"
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http"
import { SetupState } from "./state"
import { ApiError } from "./errors"

const jellyfinGetJson = <T>(url: string, key: string): Effect.Effect<T, ApiError> =>
  pipe(
    HttpClientRequest.get(url),
    HttpClientRequest.setHeader("X-MediaBrowser-Token", key),
    HttpClient.execute,
    Effect.flatMap(HttpClientResponse.filterStatusOk),
    Effect.flatMap((res) => res.json),
    Effect.map((v) => v as T),
    Effect.mapError(
      (e) => new ApiError({ service: "jellyfin", status: 0, message: String(e).slice(0, 200) }),
    ),
  )

const jellyfinPost = (url: string, key: string, body: unknown | null): Effect.Effect<void, ApiError> => {
  const req = pipe(HttpClientRequest.post(url))
  const withAuth = pipe(req, HttpClientRequest.setHeader("X-MediaBrowser-Token", key))
  const withBody = body !== null ? pipe(withAuth, HttpClientRequest.bodyJson(body)) : withAuth
  return pipe(
    withBody,
    HttpClient.execute,
    Effect.flatMap(HttpClientResponse.filterStatusOk),
    Effect.asVoid,
    Effect.mapError(
      (e) => new ApiError({ service: "jellyfin", status: 0, message: String(e).slice(0, 200) }),
    ),
  )
}

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

  const uniqueRepos = [
    ...new Map(
      JELLYFIN_PLUGINS.map((p) => [p.repoUrl, { name: p.name, repoUrl: p.repoUrl }]),
    ).values(),
  ]

  for (const repo of uniqueRepos) {
    yield* pipe(
      Effect.gen(function* () {
        const existing = yield* pipe(
          jellyfinGetJson<Array<{ Name: string; Url: string; Enabled: boolean }>>(
            "http://localhost:8096/Repositories",
            jfKey,
          ),
          Effect.catchCause(() =>
            Effect.succeed([] as Array<{ Name: string; Url: string; Enabled: boolean }>),
          ),
        )

        const already = existing.some((r) => r.Url === repo.repoUrl)
        if (already) {
          yield* Console.log(`  Repository "${repo.name}" already registered`)
        } else {
          const updated = [...existing, { Name: repo.name, Url: repo.repoUrl, Enabled: true }]
          yield* jellyfinPost("http://localhost:8096/Repositories", jfKey, updated)
          yield* Console.log(`  Repository "${repo.name}" added`)
        }
      }),
      Effect.catchCause((e) =>
        Console.log(`  Jellyfin add repo ${repo.name}: ${String(e).slice(0, 120)}`),
      ),
    )
  }

  for (const plugin of JELLYFIN_PLUGINS) {
    const encName = encodeURIComponent(plugin.name)
    yield* pipe(
      jellyfinPost(
        `http://localhost:8096/Packages/Installed/${encName}?assemblyGuid=${plugin.guid}&repositoryUrl=${encodeURIComponent(plugin.repoUrl)}`,
        jfKey,
        null,
      ),
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
