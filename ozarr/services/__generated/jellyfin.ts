// @ts-nocheck
import type * as __TypedOpenapi from "./jellyfin.types.js";

  import { Effect, Schema, SchemaTransformation, Struct } from "effect";

// <DefaultSchemas>
const Boolean_default_false_prop = Schema.Boolean.pipe(Schema.withDecodingDefaultType(Effect.succeed(false)));
const Boolean_default_true_prop = Schema.Boolean.pipe(Schema.withDecodingDefaultType(Effect.succeed(true)));
const NullOr_default_System_prop = Schema.NullOr(Schema.String).pipe(Schema.withDecodingDefaultType(Effect.succeed("System")));
const NullOr_default_X64_prop = Schema.NullOr(Schema.String).pipe(Schema.withDecodingDefaultType(Effect.succeed("X64")));

// </DefaultSchemas>

// <Schemas>
export type DynamicDayOfWeek = __TypedOpenapi.Schemas.DynamicDayOfWeek;
export const DynamicDayOfWeek = Schema.Literals(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Everyday", "Weekday", "Weekend"]);

export type AccessSchedule = __TypedOpenapi.Schemas.AccessSchedule;
export const AccessSchedule = Schema.Struct({ Id: Schema.optional(Schema.Int), UserId: Schema.optional(Schema.String.check(Schema.isUUID())), DayOfWeek: Schema.optional(DynamicDayOfWeek.mapFields(Struct.assign((Schema.Literals(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Everyday", "Weekday", "Weekend"])).fields))), StartHour: Schema.optional(Schema.Number), EndHour: Schema.optional(Schema.Number) });

export type SubtitlePlaybackMode = __TypedOpenapi.Schemas.SubtitlePlaybackMode;
export const SubtitlePlaybackMode = Schema.Literals(["Default", "Always", "OnlyForced", "None", "Smart"]);

export type UserConfiguration = __TypedOpenapi.Schemas.UserConfiguration;
export const UserConfiguration = Schema.Struct({ AudioLanguagePreference: Schema.optional(Schema.NullOr(Schema.String)), PlayDefaultAudioTrack: Schema.optional(Schema.Boolean), SubtitleLanguagePreference: Schema.optional(Schema.NullOr(Schema.String)), DisplayMissingEpisodes: Schema.optional(Schema.Boolean), GroupedFolders: Schema.optional(Schema.Array(Schema.String.check(Schema.isUUID()))), SubtitleMode: Schema.optional(SubtitlePlaybackMode.mapFields(Struct.assign((Schema.Literals(["Default", "Always", "OnlyForced", "None", "Smart"])).fields))), DisplayCollectionsView: Schema.optional(Schema.Boolean), EnableLocalPassword: Schema.optional(Schema.Boolean), OrderedViews: Schema.optional(Schema.Array(Schema.String.check(Schema.isUUID()))), LatestItemsExcludes: Schema.optional(Schema.Array(Schema.String.check(Schema.isUUID()))), MyMediaExcludes: Schema.optional(Schema.Array(Schema.String.check(Schema.isUUID()))), HidePlayedInLatest: Schema.optional(Schema.Boolean), RememberAudioSelections: Schema.optional(Schema.Boolean), RememberSubtitleSelections: Schema.optional(Schema.Boolean), EnableNextEpisodeAutoPlay: Schema.optional(Schema.Boolean), CastReceiverId: Schema.optional(Schema.NullOr(Schema.String)) });

export type UnratedItem = __TypedOpenapi.Schemas.UnratedItem;
export const UnratedItem = Schema.Literals(["Movie", "Trailer", "Series", "Music", "Book", "LiveTvChannel", "LiveTvProgram", "ChannelContent", "Other"]);

export type SyncPlayUserAccessType = __TypedOpenapi.Schemas.SyncPlayUserAccessType;
export const SyncPlayUserAccessType = Schema.Literals(["CreateAndJoinGroups", "JoinGroups", "None"]);

export type UserPolicy = __TypedOpenapi.Schemas.UserPolicy;
export const UserPolicy = Schema.Struct({ IsAdministrator: Schema.optional(Schema.Boolean), IsHidden: Schema.optional(Schema.Boolean), EnableCollectionManagement: Boolean_default_false_prop, EnableSubtitleManagement: Boolean_default_false_prop, EnableLyricManagement: Boolean_default_false_prop, IsDisabled: Schema.optional(Schema.Boolean), MaxParentalRating: Schema.optional(Schema.NullOr(Schema.Int)), MaxParentalSubRating: Schema.optional(Schema.NullOr(Schema.Int)), BlockedTags: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))), AllowedTags: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))), EnableUserPreferenceAccess: Schema.optional(Schema.Boolean), AccessSchedules: Schema.optional(Schema.NullOr(Schema.Array(AccessSchedule))), BlockUnratedItems: Schema.optional(Schema.NullOr(Schema.Array(UnratedItem))), EnableRemoteControlOfOtherUsers: Schema.optional(Schema.Boolean), EnableSharedDeviceControl: Schema.optional(Schema.Boolean), EnableRemoteAccess: Schema.optional(Schema.Boolean), EnableLiveTvManagement: Schema.optional(Schema.Boolean), EnableLiveTvAccess: Schema.optional(Schema.Boolean), EnableMediaPlayback: Schema.optional(Schema.Boolean), EnableAudioPlaybackTranscoding: Schema.optional(Schema.Boolean), EnableVideoPlaybackTranscoding: Schema.optional(Schema.Boolean), EnablePlaybackRemuxing: Schema.optional(Schema.Boolean), ForceRemoteSourceTranscoding: Schema.optional(Schema.Boolean), EnableContentDeletion: Schema.optional(Schema.Boolean), EnableContentDeletionFromFolders: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))), EnableContentDownloading: Schema.optional(Schema.Boolean), EnableSyncTranscoding: Schema.optional(Schema.Boolean), EnableMediaConversion: Schema.optional(Schema.Boolean), EnabledDevices: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))), EnableAllDevices: Schema.optional(Schema.Boolean), EnabledChannels: Schema.optional(Schema.NullOr(Schema.Array(Schema.String.check(Schema.isUUID())))), EnableAllChannels: Schema.optional(Schema.Boolean), EnabledFolders: Schema.optional(Schema.NullOr(Schema.Array(Schema.String.check(Schema.isUUID())))), EnableAllFolders: Schema.optional(Schema.Boolean), InvalidLoginAttemptCount: Schema.optional(Schema.Int), LoginAttemptsBeforeLockout: Schema.optional(Schema.Int), MaxActiveSessions: Schema.optional(Schema.Int), EnablePublicSharing: Schema.optional(Schema.Boolean), BlockedMediaFolders: Schema.optional(Schema.NullOr(Schema.Array(Schema.String.check(Schema.isUUID())))), BlockedChannels: Schema.optional(Schema.NullOr(Schema.Array(Schema.String.check(Schema.isUUID())))), RemoteClientBitrateLimit: Schema.optional(Schema.Int), AuthenticationProviderId: Schema.String.check(Schema.isMinLength(1)), PasswordResetProviderId: Schema.String.check(Schema.isMinLength(1)), SyncPlayAccess: Schema.optional(SyncPlayUserAccessType.mapFields(Struct.assign((Schema.Literals(["CreateAndJoinGroups", "JoinGroups", "None"])).fields))) });

export type UserDto = __TypedOpenapi.Schemas.UserDto;
export const UserDto = Schema.Struct({ Name: Schema.optional(Schema.NullOr(Schema.String)), ServerId: Schema.optional(Schema.NullOr(Schema.String)), ServerName: Schema.optional(Schema.NullOr(Schema.String)), Id: Schema.optional(Schema.String.check(Schema.isUUID())), PrimaryImageTag: Schema.optional(Schema.NullOr(Schema.String)), HasPassword: Schema.optional(Schema.NullOr(Schema.Boolean)), HasConfiguredPassword: Schema.optional(Schema.NullOr(Schema.Boolean)), HasConfiguredEasyPassword: Schema.optional(Schema.NullOr(Schema.Boolean)), EnableAutoLogin: Schema.optional(Schema.NullOr(Schema.Boolean)), LastLoginDate: Schema.optional(Schema.NullOr(Schema.String)), LastActivityDate: Schema.optional(Schema.NullOr(Schema.String)), Configuration: Schema.optional(Schema.NullOr(UserConfiguration)), Policy: Schema.optional(Schema.NullOr(UserPolicy)), PrimaryImageAspectRatio: Schema.optional(Schema.NullOr(Schema.Number)) });

export type CastReceiverApplication = __TypedOpenapi.Schemas.CastReceiverApplication;
export const CastReceiverApplication = Schema.Struct({ Id: Schema.String, Name: Schema.String });

export type VersionInfo = __TypedOpenapi.Schemas.VersionInfo;
export const VersionInfo = Schema.Struct({ version: Schema.optional(Schema.String), VersionNumber: Schema.optional(Schema.String), changelog: Schema.optional(Schema.NullOr(Schema.String)), targetAbi: Schema.optional(Schema.NullOr(Schema.String)), sourceUrl: Schema.optional(Schema.NullOr(Schema.String)), checksum: Schema.optional(Schema.NullOr(Schema.String)), timestamp: Schema.optional(Schema.NullOr(Schema.String)), repositoryName: Schema.optional(Schema.String), repositoryUrl: Schema.optional(Schema.String) });

export type PackageInfo = __TypedOpenapi.Schemas.PackageInfo;
export const PackageInfo = Schema.Struct({ name: Schema.optional(Schema.String), description: Schema.optional(Schema.String), overview: Schema.optional(Schema.String), owner: Schema.optional(Schema.String), category: Schema.optional(Schema.String), guid: Schema.optional(Schema.String.check(Schema.isUUID())), versions: Schema.optional(Schema.Array(VersionInfo)), imageUrl: Schema.optional(Schema.NullOr(Schema.String)) });

export type InstallationInfo = __TypedOpenapi.Schemas.InstallationInfo;
export const InstallationInfo = Schema.Struct({ Guid: Schema.optional(Schema.String.check(Schema.isUUID())), Name: Schema.optional(Schema.NullOr(Schema.String)), Version: Schema.optional(Schema.NullOr(Schema.String)), Changelog: Schema.optional(Schema.NullOr(Schema.String)), SourceUrl: Schema.optional(Schema.NullOr(Schema.String)), Checksum: Schema.optional(Schema.NullOr(Schema.String)), PackageInfo: Schema.optional(Schema.NullOr(PackageInfo)) });

export type ProblemDetails = __TypedOpenapi.Schemas.ProblemDetails;
export const ProblemDetails = Schema.StructWithRest(Schema.Struct({ type: Schema.optional(Schema.NullOr(Schema.String)), title: Schema.optional(Schema.NullOr(Schema.String)), status: Schema.optional(Schema.NullOr(Schema.Int)), detail: Schema.optional(Schema.NullOr(Schema.String)), instance: Schema.optional(Schema.NullOr(Schema.String)) }), [Schema.Record(Schema.String, Schema.Unknown)]);

export type RepositoryInfo = __TypedOpenapi.Schemas.RepositoryInfo;
export const RepositoryInfo = Schema.Struct({ Name: Schema.optional(Schema.NullOr(Schema.String)), Url: Schema.optional(Schema.NullOr(Schema.String)), Enabled: Schema.optional(Schema.Boolean) });

export type SystemInfo = __TypedOpenapi.Schemas.SystemInfo;
export const SystemInfo = Schema.Struct({ LocalAddress: Schema.optional(Schema.NullOr(Schema.String)), ServerName: Schema.optional(Schema.NullOr(Schema.String)), Version: Schema.optional(Schema.NullOr(Schema.String)), ProductName: Schema.optional(Schema.NullOr(Schema.String)), OperatingSystem: Schema.optional(Schema.NullOr(Schema.String)), Id: Schema.optional(Schema.NullOr(Schema.String)), StartupWizardCompleted: Schema.optional(Schema.NullOr(Schema.Boolean)), OperatingSystemDisplayName: Schema.optional(Schema.NullOr(Schema.String)), PackageName: Schema.optional(Schema.NullOr(Schema.String)), HasPendingRestart: Schema.optional(Schema.Boolean), IsShuttingDown: Schema.optional(Schema.Boolean), SupportsLibraryMonitor: Schema.optional(Schema.Boolean), WebSocketPortNumber: Schema.optional(Schema.Int), CompletedInstallations: Schema.optional(Schema.NullOr(Schema.Array(InstallationInfo))), CanSelfRestart: Boolean_default_true_prop, CanLaunchWebBrowser: Boolean_default_false_prop, ProgramDataPath: Schema.optional(Schema.NullOr(Schema.String)), WebPath: Schema.optional(Schema.NullOr(Schema.String)), ItemsByNamePath: Schema.optional(Schema.NullOr(Schema.String)), CachePath: Schema.optional(Schema.NullOr(Schema.String)), LogPath: Schema.optional(Schema.NullOr(Schema.String)), InternalMetadataPath: Schema.optional(Schema.NullOr(Schema.String)), TranscodingTempPath: Schema.optional(Schema.NullOr(Schema.String)), CastReceiverApplications: Schema.optional(Schema.NullOr(Schema.Array(CastReceiverApplication))), HasUpdateAvailable: Boolean_default_false_prop, EncoderLocation: NullOr_default_System_prop, SystemArchitecture: NullOr_default_X64_prop });

// </Schemas>

// <Endpoints>
export type post_InstallPackage = __TypedOpenapi.Endpoints.post_InstallPackage;
export const post_InstallPackage = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/Packages/Installed/{name}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ assemblyGuid: Schema.optional(Schema.String.check(Schema.isUUID())), version: Schema.optional(Schema.String), repositoryUrl: Schema.optional(Schema.String) })), path: Schema.Struct({ name: Schema.String }) },
  responses: { 204: Schema.Unknown, 401: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Union([ProblemDetails, ProblemDetails, ProblemDetails]), 503: Schema.Unknown },
  responseHeaders: { 503: Schema.Struct({ "Retry-After": Schema.Int, Message: Schema.String }) },
};

export type get_GetRepositories = __TypedOpenapi.Endpoints.get_GetRepositories;
export const get_GetRepositories = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/Repositories"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Union([Schema.Array(RepositoryInfo), Schema.Array(RepositoryInfo), Schema.Array(RepositoryInfo)]), 401: Schema.Unknown, 403: Schema.Unknown, 503: Schema.Unknown },
  responseHeaders: { 503: Schema.Struct({ "Retry-After": Schema.Int, Message: Schema.String }) },
};

export type post_SetRepositories = __TypedOpenapi.Endpoints.post_SetRepositories;
export const post_SetRepositories = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/Repositories"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Array(RepositoryInfo) },
  responses: { 204: Schema.Unknown, 401: Schema.Unknown, 403: Schema.Unknown, 503: Schema.Unknown },
  responseHeaders: { 503: Schema.Struct({ "Retry-After": Schema.Int, Message: Schema.String }) },
};

export type get_GetSystemInfo = __TypedOpenapi.Endpoints.get_GetSystemInfo;
export const get_GetSystemInfo = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/System/Info"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Union([SystemInfo, SystemInfo, SystemInfo]), 401: Schema.Unknown, 403: Schema.Union([ProblemDetails, ProblemDetails, ProblemDetails]), 503: Schema.Unknown },
  responseHeaders: { 503: Schema.Struct({ "Retry-After": Schema.Int, Message: Schema.String }) },
};

export type get_GetUsers = __TypedOpenapi.Endpoints.get_GetUsers;
export const get_GetUsers = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/Users"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ isHidden: Schema.optional(Schema.Union([Schema.Boolean, Schema.String, Schema.Number]).pipe(Schema.decodeTo(Schema.Boolean, SchemaTransformation.transform({ decode: (x) => x === true || x === "true" || x === 1 || x === "1", encode: (a) => a })))), isDisabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.String, Schema.Number]).pipe(Schema.decodeTo(Schema.Boolean, SchemaTransformation.transform({ decode: (x) => x === true || x === "true" || x === 1 || x === "1", encode: (a) => a })))) })) },
  responses: { 200: Schema.Union([Schema.Array(UserDto), Schema.Array(UserDto), Schema.Array(UserDto)]), 401: Schema.Unknown, 403: Schema.Unknown, 503: Schema.Unknown },
  responseHeaders: { 503: Schema.Struct({ "Retry-After": Schema.Int, Message: Schema.String }) },
};

// </Endpoints>

  
     // <EndpointByMethod>
     export const EndpointByMethod: __TypedOpenapi.EndpointByMethod = {
     post: {
           "/Packages/Installed/{name}": post_InstallPackage as any,
"/Repositories": post_SetRepositories as any
         },
get: {
           "/Repositories": get_GetRepositories as any,
"/System/Info": get_GetSystemInfo as any,
"/Users": get_GetUsers as any
         }
     }
     export type EndpointByMethod = __TypedOpenapi.EndpointByMethod;
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type PostEndpoints = EndpointByMethod["post"]
export type GetEndpoints = EndpointByMethod["get"]
    // </EndpointByMethod.Shorthands>
    
  
// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: unknown;
  header?: unknown;
  path?: unknown;
  cookie?: unknown;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | "options" | MutationMethod;

export type RequestFormat = "json" | "form-data" | "form-url" | "binary" | "text";
export type ResponseFormat = "json" | "sse";
export type SecurityRequirements = readonly (readonly string[])[];


    // <EndpointRequestFormats>
    /** Non-json request body encodings; missing entries default to `"json"`. */
    export const endpointRequestFormats = {
    
    } as Partial<{ [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: RequestFormat }> }>;
    // </EndpointRequestFormats>
    

    // <EndpointResponseFormats>
    /** Non-json response body modes; missing entries default to `"json"`. SSE skips JSON parse + output validation. */
    export const endpointResponseFormats = {
    
    } as Partial<{ [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: ResponseFormat }> }>;
    // </EndpointResponseFormats>
    

    // <EndpointSecurityRequirements>
    /** OpenAPI security requirements applied when an endpoint has no explicit entry. */
    export const defaultSecurityRequirements = [["CustomAuthentication"]] as SecurityRequirements;
    /** Endpoint-specific security requirements that differ from the default. */
    export const endpointSecurityRequirements = {
    
    } as Partial<{ [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: SecurityRequirements }> }>;
    // </EndpointSecurityRequirements>
    

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  responses?: Record<string, unknown>;
  responseHeaders?: Record<string, unknown>;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  requestFormat: RequestFormat;
  responseFormat: ResponseFormat;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  responses?: TConfig["responses"];
  responseHeaders?: TConfig["responseHeaders"]
};

/**
 * Minimal response surface used by ApiClient — avoids depending on the DOM `Response`
 * global (helpful for Node without DOM lib). Structural typing accepts fetch Response.
 */
export interface FetcherResponse {
  ok: boolean;
  status: number;
  statusText: string;
  headers: {
    get(name: string): string | null;
    getSetCookie?: () => string[];
  };
  /** Present on fetch Response; used for SSE / streaming bodies. */
  body?: ReadableStream<Uint8Array> | null;
  json(): Promise<unknown>;
  text(): Promise<string>;
  arrayBuffer(): Promise<ArrayBuffer>;
  clone(): FetcherResponse;
}

export interface Fetcher {
    decodePathParams?: (path: string, pathParams: unknown) => string
  encodeSearchParams?: (searchParams: unknown) => URLSearchParams | undefined
  /** Merge cookie params into request headers (default: Cookie header). */
  encodeCookies?: (cookies: unknown, headers: Headers) => void
    //
    fetch: (input: {
      method: Method;
      url: URL;
      urlSearchParams?: URLSearchParams | undefined;
      parameters?: EndpointParameters | undefined;
      path: string;
      /** How to encode `parameters.body` (from OpenAPI requestBody content type). */
      requestFormat: RequestFormat;
      /** OpenAPI security requirements for this operation. Empty means no credentials are required. */
      security?: SecurityRequirements;
      overrides?: RequestInit;
      throwOnStatusError?: boolean
    }) => Promise<FetcherResponse>;
    parseResponseData?: (response: FetcherResponse) => Promise<unknown>
}

export const successStatusCodes = [200,201,202,203,204,205,206,207,208,226,300,301,302,303,304,305,306,307,308] as const;
export type SuccessStatusCode = typeof successStatusCodes[number];

export const errorStatusCodes = [400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,421,422,423,424,425,426,428,429,431,451,500,501,502,503,504,505,506,507,508,510,511] as const;
export type ErrorStatusCode = typeof errorStatusCodes[number];

// Taken from https://github.com/unjs/fetchdts/blob/ec4eaeab5d287116171fc1efd61f4a1ad34e4609/src/fetch.ts#L3
export interface TypedHeaders<TypedHeaderValues extends Record<string, string> | unknown> extends Omit<Headers, 'append' | 'delete' | 'get' | 'getSetCookie' | 'has' | 'set' | 'forEach'> {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/append) */
  append: <Name extends Extract<keyof TypedHeaderValues, string> | string & {}> (name: Name, value: Lowercase<Name> extends keyof TypedHeaderValues ? TypedHeaderValues[Lowercase<Name>] : string) => void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/delete) */
  delete: <Name extends Extract<keyof TypedHeaderValues, string> | string & {}> (name: Name) => void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/get) */
  get: <Name extends Extract<keyof TypedHeaderValues, string> | string & {}> (name: Name) => (Lowercase<Name> extends keyof TypedHeaderValues ? TypedHeaderValues[Lowercase<Name>] : string) | null
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/getSetCookie) */
  getSetCookie: () => string[]
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/has) */
  has: <Name extends Extract<keyof TypedHeaderValues, string> | string & {}> (name: Name) => boolean
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/set) */
  set: <Name extends Extract<keyof TypedHeaderValues, string> | string & {}> (name: Name, value: Lowercase<Name> extends keyof TypedHeaderValues ? TypedHeaderValues[Lowercase<Name>] : string) => void
  forEach: (callbackfn: (value: TypedHeaderValues[keyof TypedHeaderValues] | string & {}, key: Extract<keyof TypedHeaderValues, string> | string & {}, parent: TypedHeaders<TypedHeaderValues>) => void, thisArg?: any) => void
}

/** @see https://developer.mozilla.org/en-US/docs/Web/API/Response */
export interface TypedSuccessResponse<TSuccess, TStatusCode, THeaders> extends Omit<FetcherResponse, "ok" | "status" | "json" | "headers"> {
  ok: true;
  status: TStatusCode;
  headers: never extends THeaders ? FetcherResponse["headers"] : TypedHeaders<THeaders>;
  data: TSuccess;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) */
  json: () => Promise<TSuccess>;
}

/** @see https://developer.mozilla.org/en-US/docs/Web/API/Response */
export interface TypedErrorResponse<TData, TStatusCode, THeaders> extends Omit<FetcherResponse, "ok" | "status" | "json" | "headers"> {
  ok: false;
  status: TStatusCode;
  headers: never extends THeaders ? FetcherResponse["headers"] : TypedHeaders<THeaders>;
  data: TData;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) */
  json: () => Promise<TData>;
}

export type TypedApiResponse<TAllResponses = {}, THeaders = {}> = {
    [K in keyof TAllResponses]: K extends string
      ? K extends `${infer TStatusCode extends number}`
        ? TStatusCode extends SuccessStatusCode
          ? TypedSuccessResponse<TAllResponses[K], TStatusCode, K extends keyof THeaders ? THeaders[K] : never>
          : TypedErrorResponse<TAllResponses[K], TStatusCode, K extends keyof THeaders ? THeaders[K] : never>
        : never
      : K extends number
        ? K extends SuccessStatusCode
          ? TypedSuccessResponse<TAllResponses[K], K, K extends keyof THeaders ? THeaders[K] : never>
          : TypedErrorResponse<TAllResponses[K], K, K extends keyof THeaders ? THeaders[K] : never>
        : never;
  }[keyof TAllResponses];

type __TypedOpenapiSchema<TOutput, TInput = TOutput> = {
  readonly __typedOpenapiOutput?: TOutput;
  readonly __typedOpenapiInput?: TInput;
};
type OptionalUndefinedKeys<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
} & {
  [K in keyof T as undefined extends T[K] ? K : never]?: Exclude<T[K], undefined>;
};
type InferSchemaValue<T> = T extends __TypedOpenapiSchema<infer O> ? O : T extends { Type: infer O } ? O : T extends object ? { [K in keyof T]: InferSchemaValue<T[K]> } : T;
type InferSchemaInputRaw<T> = T extends __TypedOpenapiSchema<infer _O, infer I> ? I : T extends { Encoded: infer I } ? I : T extends object ? { [K in keyof T]: InferSchemaInputRaw<T[K]> } : T;
type InferSchemaInput<T> = OptionalUndefinedKeys<InferSchemaInputRaw<T>>;

export type SafeApiResponse<TEndpoint> = TEndpoint extends { responses: infer TResponses }
  ? TResponses extends Record<string, unknown>
    ? TypedApiResponse<InferSchemaValue<TResponses>, TEndpoint extends { responseHeaders: infer THeaders } ? InferSchemaValue<THeaders> : never>
    : never
  : never

export type InferResponseByStatus<TEndpoint, TStatusCode> = Extract<SafeApiResponse<TEndpoint>, { status: TStatusCode }>

/**
 * Success-body payload — InferSchemaValue only on success statuses.
 * Filter with extends {} like the old Extract { data: {} } so unknown bodies (e.g. 304) drop out.
 */
export type InferSuccessData<TEndpoint> = TEndpoint extends { responses: infer TResponses }
  ? {
      [K in keyof TResponses]: K extends string
        ? K extends `${infer TStatusCode extends number}`
          ? TStatusCode extends SuccessStatusCode
            ? InferSchemaValue<TResponses[K]> extends infer D
              ? D extends {}
                ? D
                : never
              : never
            : never
          : never
        : K extends number
          ? K extends SuccessStatusCode
            ? InferSchemaValue<TResponses[K]> extends infer D
              ? D extends {}
                ? D
                : never
              : never
            : never
          : never;
    }[keyof TResponses]
  : never;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];
type NotNever<T> = [T] extends [never] ? false : true;

/** Call options merged onto inferred endpoint parameters. */
type ApiRequestOptions = {
  overrides?: RequestInit;
  withResponse?: boolean;
  throwOnStatusError?: boolean;
  validate?: ValidateSide;
};

/** Parameter bag for an endpoint + request options. */
export type ApiCallParams<TEndpoint> = TEndpoint extends { parameters: infer UParams }
  ? NotNever<UParams> extends true
    ? InferSchemaInput<UParams> & ApiRequestOptions
    : ApiRequestOptions
  : ApiRequestOptions;

/** Resolve response type from withResponse flag on the call config. */
export type ApiCallResult<TEndpoint, TParams> = TParams extends { withResponse: true }
  ? SafeApiResponse<TEndpoint>
  : InferSuccessData<TEndpoint>;

export type ValidateSide = "none" | "input" | "output" | "both";
export type OnValidate = (ctx: {
  side: "input" | "output";
  method: string;
  path: string;
  schema: unknown;
  value: unknown;
}) => unknown | Promise<unknown>;

// </ApiClientTypes>

// <TypedStatusError>
export class TypedStatusError<TData = unknown> extends Error {
  response: TypedErrorResponse<TData, ErrorStatusCode, unknown>;
  status: number;
  constructor(response: TypedErrorResponse<TData, ErrorStatusCode, unknown>) {
    super(`HTTP ${response.status}: ${response.statusText}`);
    this.name = 'TypedStatusError';
    this.response = response;
    this.status = response.status;
  }
}
// </TypedStatusError>








// <HttpClientError>
export class HttpClientError extends Error {
  readonly _tag = "HttpClientError";
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "HttpClientError";
  }
}
// </HttpClientError>


// <ValidateHelpers>
const defaultParse = (schema: unknown, value: unknown): unknown => {
  return Schema.decodeUnknownSync(schema as Schema.Codec<unknown>)(value);
};

const runValidate = async (ctx: {
  side: "input" | "output";
  method: string;
  path: string;
  schema: unknown;
  value: unknown;
  onValidate?: OnValidate;
}): Promise<unknown> => {
  if (ctx.onValidate) return ctx.onValidate(ctx);
  return defaultParse(ctx.schema, ctx.value);
};
// </ValidateHelpers>


export type EffectFetcher = {
  decodePathParams?: (path: string, pathParams: unknown) => string;
  encodeSearchParams?: (searchParams: unknown) => URLSearchParams | undefined;
  encodeCookies?: (cookies: unknown, headers: Headers) => void;
  parseResponseData?: (response: FetcherResponse) => Promise<unknown>;
  fetch: (input: Parameters<Fetcher["fetch"]>[0]) => Effect.Effect<FetcherResponse, HttpClientError, never>;
};

const wrapPromiseFetcher = (fetcher: Fetcher): EffectFetcher => ({
  ...(fetcher.decodePathParams ? { decodePathParams: fetcher.decodePathParams } : {}),
  ...(fetcher.encodeSearchParams ? { encodeSearchParams: fetcher.encodeSearchParams } : {}),
  ...(fetcher.encodeCookies ? { encodeCookies: fetcher.encodeCookies } : {}),
  ...(fetcher.parseResponseData ? { parseResponseData: fetcher.parseResponseData } : {}),
  fetch: (input) =>
    Effect.tryPromise({
      try: () => fetcher.fetch(input),
      catch: (cause) => new HttpClientError("fetch failed", cause),
    }),
});

// <EffectApiClient>
export class EffectApiClient {
  baseUrl: string = "";
  successStatusCodes = successStatusCodes;
  errorStatusCodes = errorStatusCodes;
  validate: ValidateSide = "both";
  onValidate?: OnValidate;
  private effectFetcher: EffectFetcher;

  constructor(
    fetcher: Fetcher | EffectFetcher,
    options?: { validate?: ValidateSide; onValidate?: OnValidate; effectFetcher?: boolean },
  ) {
    this.effectFetcher = options?.effectFetcher ? (fetcher as EffectFetcher) : wrapPromiseFetcher(fetcher as Fetcher);
    if (options?.validate !== undefined) this.validate = options.validate;
    if (options?.onValidate) this.onValidate = options.onValidate;
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  request<
    TMethod extends keyof EndpointByMethod,
    TPath extends keyof EndpointByMethod[TMethod],
    TEndpoint extends EndpointByMethod[TMethod][TPath]
  >(
    method: TMethod,
    path: TPath,
    ...params: MaybeOptionalArg<ApiCallParams<TEndpoint>>
  ): Effect.Effect<
    InferSuccessData<TEndpoint>,
    TypedStatusError | HttpClientError,
    never
  > {
    const self = this;
    return Effect.gen(function* () {
      // Implementation reads a loose param bag; call sites stay typed via MaybeOptionalArg<>.
      const requestParams = params[0] as
        | (EndpointParameters & {
            overrides?: RequestInit;
            validate?: ValidateSide;
            withResponse?: boolean;
            throwOnStatusError?: boolean;
          })
        | undefined;
      const withResponse = Boolean(requestParams?.withResponse);
      const throwOnStatusError = requestParams?.throwOnStatusError ?? (withResponse ? false : true);
      const validateSide: ValidateSide = requestParams?.validate ?? self.validate;
      const parametersToSend: EndpointParameters = {};
      if (requestParams?.body !== undefined) parametersToSend.body = requestParams.body;
      if (requestParams?.query !== undefined) parametersToSend.query = requestParams.query;
      if (requestParams?.header !== undefined) parametersToSend.header = requestParams.header;
      if (requestParams?.path !== undefined) parametersToSend.path = requestParams.path;
      if (requestParams?.cookie !== undefined) parametersToSend.cookie = requestParams.cookie;

      type RuntimeEndpoint = {
        parameters?: Partial<Record<"body" | "query" | "header" | "path" | "cookie", unknown>>;
        responses?: Record<string, unknown>;
      };
      const endpointSchema = EndpointByMethod[method][path] as RuntimeEndpoint;
      if ((validateSide === "input" || validateSide === "both") && endpointSchema.parameters) {
        for (const key of ["body", "query", "header", "path", "cookie"] as const) {
          const schema = endpointSchema.parameters[key];
          const value = parametersToSend[key];
          if (schema !== undefined && value !== undefined) {

          if (self.onValidate) {
            const onValidate = self.onValidate;
            parametersToSend[key] = yield* Effect.tryPromise({
              try: () =>
                runValidate({
                  side: "input",
                  method: String(method),
                  path: String(path),
                  schema: schema,
                  value: value,
                  onValidate,
                }),
              catch: (cause) => new HttpClientError("validation failed", cause),
            });
          } else {
            parametersToSend[key] = yield* Schema.decodeUnknownEffect(schema as Schema.Codec<unknown>)(value).pipe(
              Effect.mapError((cause) => new HttpClientError("decode failed", cause)),
            );
          }
          }
        }
      }

      const decodePath =
        self.effectFetcher.decodePathParams ??
        ((url: string, p: unknown) => {
          const record = (p ?? {}) as Record<string, unknown>;
          return url
            .replace(/{(\w+)}/g, (_, key: string) => (record[key] != null ? String(record[key]) : `{${key}}`))
            .replace(/:([a-zA-Z0-9_]+)/g, (_, key: string) => (record[key] != null ? String(record[key]) : `:${key}`));
        });
      const encodeSearch =
        self.effectFetcher.encodeSearchParams ??
        ((queryParams: unknown) => {
          if (!queryParams || typeof queryParams !== "object") return undefined;
          const searchParams = new URLSearchParams();
          Object.entries(queryParams as Record<string, unknown>).forEach(([key, value]) => {
            if (value != null) {
              if (Array.isArray(value)) value.forEach((val) => val != null && searchParams.append(key, String(val)));
              else searchParams.append(key, String(value));
            }
          });
          return searchParams;
        });
      const encodeCookies =
        self.effectFetcher.encodeCookies ??
        ((cookies: unknown, headers: Headers) => {
          if (!cookies || typeof cookies !== "object") return;
          const parts = Object.entries(cookies as Record<string, unknown>)
            .filter(([, value]) => value != null)
            .map(([key, value]) => `${key}=${String(value)}`);
          if (!parts.length) return;
          const existing = headers.get("cookie");
          headers.set("cookie", existing ? `${existing}; ${parts.join("; ")}` : parts.join("; "));
        });
      const parseData =
        self.effectFetcher.parseResponseData ??
        (async (response: FetcherResponse) => {
          const contentType = response.headers.get("content-type") ?? "";
          if (contentType.includes("text/event-stream")) {
            return response.body ?? null;
          }
          if (contentType.includes("json") || contentType === "*/*") {
            try {
              return await response.json();
            } catch {
              return undefined;
            }
          }
          if (contentType.startsWith("text/")) return response.text();
          return undefined;
        });

      const resolvedPath = decodePath(self.baseUrl + (path as string), parametersToSend.path ?? {});
      const url = new URL(resolvedPath);
      const urlSearchParams = encodeSearch(parametersToSend.query);

      let overrides = requestParams?.overrides as RequestInit | undefined;
      if (parametersToSend.cookie) {
        const headers = new Headers(overrides?.headers);
        encodeCookies(parametersToSend.cookie, headers);
        overrides = { ...overrides, headers };
      }

      const response = yield* self.effectFetcher.fetch({
        method: method as Method,
        path: path as string,
        url,
        ...(urlSearchParams ? { urlSearchParams } : {}),
        ...(Object.keys(parametersToSend).length ? { parameters: parametersToSend } : {}),
        requestFormat: endpointRequestFormats[method]?.[path] ?? "json",
        security: endpointSecurityRequirements[method]?.[path] ?? defaultSecurityRequirements,
        ...(overrides ? { overrides } : {}),
      });

      const responseFormat = endpointResponseFormats[method]?.[path] ?? "json";
      let data =
        responseFormat === "sse"
          ? (response.body ?? null)
          : yield* Effect.tryPromise({
              try: () => parseData(response),
              catch: (cause) => new HttpClientError("parse failed", cause),
            });

      if (responseFormat !== "sse" && (validateSide === "output" || validateSide === "both") && response.ok && endpointSchema?.responses) {
        const responseSchema =
          endpointSchema.responses[String(response.status)] ?? endpointSchema.responses["default"];
        if (responseSchema) {

          if (self.onValidate) {
            const onValidate = self.onValidate;
            data = yield* Effect.tryPromise({
              try: () =>
                runValidate({
                  side: "output",
                  method: String(method),
                  path: String(path),
                  schema: responseSchema,
                  value: data,
                  onValidate,
                }),
              catch: (cause) => new HttpClientError("validation failed", cause),
            });
          } else {
            data = yield* Schema.decodeUnknownEffect(responseSchema as Schema.Codec<unknown>)(data).pipe(
              Effect.mapError((cause) => new HttpClientError("decode failed", cause)),
            );
          }
        }
      }

      const typedResponse = Object.assign(response, {
        data,
        json: () => Promise.resolve(data),
      });

      if ((errorStatusCodes as readonly number[]).includes(response.status)) {
        if (throwOnStatusError) {
          return yield* Effect.fail(
            new TypedStatusError(typedResponse as TypedErrorResponse<unknown, ErrorStatusCode, unknown>),
          );
        }
        return (withResponse ? typedResponse : data) as InferSuccessData<TEndpoint>;
      }

      return (withResponse ? typedResponse : data) as InferSuccessData<TEndpoint>;
    });
  }

  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<ApiCallParams<TEndpoint>>
  ): Effect.Effect<
    InferSuccessData<TEndpoint>,
    TypedStatusError | HttpClientError,
    never
  > {
    return this.request<"post", Path, PostEndpoints[Path]>("post", path, ...params);
  }
get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<ApiCallParams<TEndpoint>>
  ): Effect.Effect<
    InferSuccessData<TEndpoint>,
    TypedStatusError | HttpClientError,
    never
  > {
    return this.request<"get", Path, GetEndpoints[Path]>("get", path, ...params);
  }
}

export function createEffectApiClient(
  fetcher: Fetcher | EffectFetcher,
  baseUrl?: string,
  options?: { validate?: ValidateSide; onValidate?: OnValidate; effectFetcher?: boolean },
) {
  return new EffectApiClient(fetcher, options).setBaseUrl(baseUrl ?? "");
}
// </EffectApiClient>

  