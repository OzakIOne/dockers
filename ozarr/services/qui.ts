import { Effect, Console, pipe, Ref } from "effect"
import { SetupState } from "./state"

const quiLogin = async (baseUrl: string, username: string, password: string): Promise<string> => {
  const resp = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`qui login returned ${resp.status}: ${body.slice(0, 200)}`)
  }
  const cookie = resp.headers.get("set-cookie")
  if (!cookie) throw new Error("qui login: no set-cookie header")
  return cookie
}

const createClientInstance = async (
  baseUrl: string,
  cookie: string,
  qbHost: string,
  qbUser: string,
  qbPass: string,
): Promise<void> => {
  const resp = await fetch(`${baseUrl}/api/instances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie,
    },
    body: JSON.stringify({
      name: "qBittorrent",
      host: qbHost,
      username: qbUser,
      password: qbPass,
      hasLocalFilesystemAccess: true,
      useHardlinks: true,
      hardlinkBaseDir: "/data",
    }),
  })
  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`qui create instance returned ${resp.status}: ${body.slice(0, 200)}`)
  }
}

const createArrInstance = async (
  baseUrl: string,
  cookie: string,
  type: "sonarr" | "radarr",
  name: string,
  arrBaseUrl: string,
  apiKey: string,
): Promise<void> => {
  const resp = await fetch(`${baseUrl}/api/arr/instances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie,
    },
    body: JSON.stringify({
      type,
      name,
      base_url: arrBaseUrl,
      api_key: apiKey,
      enabled: true,
      priority: 10,
      timeout_seconds: 15,
    }),
  })
  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`qui create arr instance ${name} returned ${resp.status}: ${body.slice(0, 200)}`)
  }
}

export const configure = Effect.fn("Qui.configure")(function* () {
  const ref = yield* SetupState
  const state = yield* Ref.get(ref)

  if (!state.quiUsername || !state.quiPassword) {
    yield* Console.log("  Skipping qui — no QUI_USERNAME / QUI_PASSWORD in setup.env")
    return
  }

  yield* Console.log("Configuring qui...")

  const cookie = yield* pipe(
    Effect.tryPromise(() => quiLogin(state.quiUrl, state.quiUsername, state.quiPassword)),
    Effect.catchCause((cause) => {
      yield* Console.log(`  qui login failed: ${String(cause).slice(0, 120)}`)
      return Effect.succeed("")
    }),
  )

  if (!cookie) return

  yield* Console.log("  qui login successful")

  yield* pipe(
    Effect.tryPromise(() =>
      createClientInstance(
        state.quiUrl,
        cookie,
        "http://qbittorrent:8888",
        state.qbUser,
        state.qbPass || "admin",
      ),
    ),
    Effect.tap(() => Console.log("  qui: qBittorrent client instance created")),
    Effect.catchCause((cause) =>
      Console.log(`  qui qBittorrent instance: ${String(cause).slice(0, 180)}`),
    ),
  )

  if (state.sonarrKey) {
    yield* pipe(
      Effect.tryPromise(() =>
        createArrInstance(
          state.quiUrl,
          cookie,
          "sonarr",
          "Sonarr",
          "http://sonarr:8989",
          state.sonarrKey,
        ),
      ),
      Effect.tap(() => Console.log("  qui: Sonarr arr instance created")),
      Effect.catchCause((cause) =>
        Console.log(`  qui Sonarr instance: ${String(cause).slice(0, 180)}`),
      ),
    )
  }

  if (state.radarrKey) {
    yield* pipe(
      Effect.tryPromise(() =>
        createArrInstance(
          state.quiUrl,
          cookie,
          "radarr",
          "Radarr",
          "http://radarr:7878",
          state.radarrKey,
        ),
      ),
      Effect.tap(() => Console.log("  qui: Radarr arr instance created")),
      Effect.catchCause((cause) =>
        Console.log(`  qui Radarr instance: ${String(cause).slice(0, 180)}`),
      ),
    )
  }

  yield* Console.log("  qui done.")
})
