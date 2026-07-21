import { Effect, pipe, Console, Schema } from "effect"
import { YAML } from "bun"
import { SetupData } from "./state"
import { ConfigError } from "./errors"

const extractHostPort = (yamlContent: string, serviceName: string): string | null => {
  try {
    const config = YAML.parse(yamlContent) as {
      services?: Record<string, { ports?: string[] }>
    }
    const ports = config?.services?.[serviceName]?.ports
    if (!ports || !Array.isArray(ports) || ports.length === 0) return null
    const match = String(ports[0]).match(/^(\d+):/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

const getEnvValue = (content: string, key: string): string | null => {
  const match = content.match(new RegExp(`^${key}=(.*)$`, "m"))
  return match ? match[1] : null
}

const EnvSchema = Schema.Struct({
  PUID: Schema.String,
  PGID: Schema.String,
  TZ: Schema.String,
  UMASK: Schema.String,
  HOMARR_SECRET: Schema.String,
  HOMARR_API_KEY: Schema.String,
  SONARR_API_KEY: Schema.NonEmptyString,
  SONARR_URL: Schema.NonEmptyString,
  RADARR_API_KEY: Schema.NonEmptyString,
  RADARR_URL: Schema.NonEmptyString,
  PROWLARR_API_KEY: Schema.String,
  SEERR_API_KEY: Schema.String,
  JELLYFIN_API_KEY: Schema.String,
})

const parseSetupEnv = (content: string): Record<string, string> => {
  const parsed: Record<string, string> = {}
  for (const line of content.split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/)
    if (m) parsed[m[1]] = m[2]
  }
  return parsed
}

const readFile = (path: string) =>
  Effect.tryPromise(() => Bun.file(path).text()).pipe(
    Effect.catchCause(() => Effect.succeed("")),
  )

export const loadSetupEnvIntoProcess = Effect.fn("Env.loadSetupEnvIntoProcess")(function* () {
  const content = yield* readFile("setup.env")
  for (const line of content.split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/)
    if (m) process.env[m[1]] = m[2]
  }
})

export const ensureEnvFiles = Effect.fn("Env.ensureEnvFiles")(function* () {
  const dcEnvExists = yield* Effect.tryPromise(() => Bun.file(".env").exists()).pipe(
    Effect.catchCause(() => Effect.succeed(false)),
  )
  if (!dcEnvExists) {
    yield* Effect.tryPromise(() => Bun.$`cp .env.example .env`.quiet())
    yield* Console.log("  Created .env from .env.example")
  }

  const setupEnvExists = yield* Effect.tryPromise(() => Bun.file("setup.env").exists()).pipe(
    Effect.catchCause(() => Effect.succeed(false)),
  )
  if (!setupEnvExists) {
    yield* Effect.tryPromise(() => Bun.$`cp setup.env.example setup.env`.quiet())
    yield* Console.log("  Created setup.env from setup.env.example")
  }
})

export const buildInitialData = Effect.fn("Env.buildInitialData")(function* () {
  const dcContent = yield* readFile("docker-compose.yml")
  const envContent = yield* readFile(".env")
  const setupContent = yield* readFile("setup.env")

  const cfgDir = getEnvValue(envContent, "CONFIG_DIR") || "config"
  const datDir = getEnvValue(envContent, "DATA_DIR") || "data"

  let sonarrUrl = getEnvValue(setupContent, "SONARR_URL") || ""
  if (!sonarrUrl) {
    const port = extractHostPort(dcContent, "sonarr")
    if (port) sonarrUrl = `http://localhost:${port}`
  }

  let radarrUrl = getEnvValue(setupContent, "RADARR_URL") || ""
  if (!radarrUrl) {
    const port = extractHostPort(dcContent, "radarr")
    if (port) radarrUrl = `http://localhost:${port}`
  }

  const prowlarrUrl = "http://localhost:9696"
  const debug = Bun.env.DEBUG === "true" || Bun.env.LOG_LEVEL === "DEBUG"
  const homarrKey = Bun.env.HOMARR_API_KEY || getEnvValue(setupContent, "HOMARR_API_KEY") || ""

  yield* Effect.sync(() => {
    const dc = envContent
    const setup = setupContent
    const all = new Set([...dc.split("\n"), ...setup.split("\n")])
    const merged = [...all].join("\n")
    const parsed = parseSetupEnv(merged)
    try {
      Schema.decodeUnknownSync(EnvSchema)(parsed)
      console.log("  .env / setup.env validation passed.")
    } catch (e) {
      if (Schema.isSchemaError(e)) {
        console.log(
          `  Warning: env validation failed:\n  ${e.message.split("\n").join("\n  ")}`,
        )
      }
      console.log("  Some setup steps may fail.")
    }
  })

  return SetupData.make({
    cfgDir,
    datDir,
    sonarrUrl,
    radarrUrl,
    prowlarrUrl,
    sonarrKey: "",
    radarrKey: "",
    prowlarrKey: "",
    seerrKey: "",
    jellyfinKey: "",
    homarrKey,
    qbUser: "admin",
    qbPass: "",
    jellyfinServerName: "",
    jellyfinUserId: "",
    debug,
  })
})
