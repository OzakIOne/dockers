import { Schema } from "effect"

export class ConfigError extends Schema.TaggedErrorClass<ConfigError>()(
  "ConfigError",
  { key: Schema.String, message: Schema.String },
) {}

export class ApiError extends Schema.TaggedErrorClass<ApiError>()(
  "ApiError",
  { service: Schema.String, status: Schema.Number, message: Schema.String },
) {}

export class DockerError extends Schema.TaggedErrorClass<DockerError>()(
  "DockerError",
  { command: Schema.String, message: Schema.String },
) {}

export class SqliteError extends Schema.TaggedErrorClass<SqliteError>()(
  "SqliteError",
  { operation: Schema.String, message: Schema.String },
) {}
