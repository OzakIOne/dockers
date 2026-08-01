import { Effect, Schedule, Duration, pipe, Console } from "effect"
import { HttpClient, HttpClientRequest } from "effect/unstable/http"

export type WaitOptions = {
  readonly timeout?: Duration.Input
  readonly skipOnTimeout?: boolean
  readonly attemptTimeout?: Duration.Input
}

export const one = Effect.fn("Wait.one")(function* (
  url: string,
  label: string,
  options: WaitOptions = {},
) {
  const timeout = options.timeout ?? Duration.minutes(1)
  const skipOnTimeout = options.skipOnTimeout ?? true
  const attemptTimeout = options.attemptTimeout ?? Duration.seconds(10)
  yield* Console.log(`  Waiting for ${label}...`)
  const ready = yield* pipe(
    pipe(HttpClientRequest.get(url), HttpClient.execute).pipe(
      Effect.timeout(attemptTimeout),
    ),
    Effect.retry(
      pipe(
        Schedule.spaced(Duration.seconds(2)),
        Schedule.upTo({ duration: timeout }),
      ),
    ),
    Effect.match({
      onSuccess: () => true,
      onFailure: () => false,
    }),
  )
  if (ready) {
    yield* Console.log(`  ${label} ready`)
  } else if (skipOnTimeout) {
    yield* Console.log(`  Skipping ${label} — not ready after ${Duration.toMillis(timeout)}ms`)
  } else {
    yield* Effect.fail(new Error(`${label} not ready after ${Duration.toMillis(timeout)}ms`))
  }
})

export const all = Effect.fn("Wait.all")(function* (
  entries: Array<[string, string]>,
  options: WaitOptions = {},
) {
  if (entries.length === 0) return
  yield* Console.log("Waiting for services...")
  yield* Effect.all(
    entries.map(([url, label]) => one(url, label, options)),
    { concurrency: "unbounded" },
  )
})
