import { Effect, Console, Schema } from "effect"
import { DockerError } from "./errors"

export const up = Effect.fn("Docker.up")(function* () {
  yield* Console.log("Starting containers...")
  yield* Effect.tryPromise({
    try: () => Bun.$`docker compose up -d`.quiet(),
    catch: (cause) => new DockerError({ command: "up", message: String(cause) }),
  })
})
