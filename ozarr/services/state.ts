import { Context, Effect, Layer, Ref, Schema } from "effect"

export const SetupData = Schema.Struct({
  cfgDir: Schema.String,
  datDir: Schema.String,
  sonarrUrl: Schema.String,
  radarrUrl: Schema.String,
  prowlarrUrl: Schema.String,
  sonarrKey: Schema.String,
  radarrKey: Schema.String,
  prowlarrKey: Schema.String,
  seerrKey: Schema.String,
  jellyfinKey: Schema.String,
  homarrKey: Schema.String,
  qbUser: Schema.String,
  qbPass: Schema.String,
  jellyfinServerName: Schema.String,
  jellyfinUserId: Schema.String,
  debug: Schema.Boolean,
})

export interface SetupData extends Schema.Schema.Type<typeof SetupData> {}

export class SetupState extends Context.Service<SetupState, Ref.Ref<SetupData>>()("SetupState") {}

export const makeRef = (initial: SetupData): Effect.Effect<Ref.Ref<SetupData>> =>
  Ref.make(initial)

export const layer = (initial: SetupData) =>
  Layer.effect(SetupState, makeRef(initial))
