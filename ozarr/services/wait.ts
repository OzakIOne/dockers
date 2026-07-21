import { Effect, Schedule, Duration, pipe, Console } from "effect"
import { HttpClient, HttpClientRequest } from "effect/unstable/http"

export const one = Effect.fn("Wait.one")(function* (url: string, label: string) {
  yield* Console.log(`  Waiting for ${label}...`)
  yield* pipe(
    pipe(HttpClientRequest.get(url), HttpClient.execute),
    Effect.retry(
      pipe(
        Schedule.spaced(Duration.seconds(2)),
        Schedule.both(Schedule.recurs(90)),
      ),
    ),
  )
  yield* Console.log(`  ${label} ready`)
})

export const all = Effect.fn("Wait.all")(function* (entries: Array<[string, string]>) {
  if (entries.length === 0) return
  yield* Console.log("Waiting for services...")
  yield* Effect.all(
    entries.map(([url, label]) => one(url, label)),
    { concurrency: "unbounded" },
  )
})
