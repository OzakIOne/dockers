import { Effect, Console, Schema } from "effect"
import { DockerError } from "./errors"

export const up = Effect.fn("Docker.up")(function* () {
  yield* Console.log("Starting containers...")
  yield* Effect.tryPromise({
    try: () => Bun.$`docker compose up -d`.quiet(),
    catch: (cause) => new DockerError({ command: "up", message: String(cause) }),
  })
})

export const logs = (container: string) =>
  Effect.fn("Docker.logs")(function* () {
    return yield* Effect.tryPromise({
      try: () => Bun.$`docker logs ${container} 2>/dev/null`.text(),
      catch: (cause) => new DockerError({ command: `logs ${container}`, message: String(cause) }),
    })
  })
