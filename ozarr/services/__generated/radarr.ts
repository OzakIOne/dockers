// @ts-nocheck
import type * as __TypedOpenapi from "./radarr.types.js";

  import { Effect, Schema, SchemaTransformation } from "effect";

// <DefaultSchemas>
const Union_default_false_prop = Schema.Union([Schema.Boolean, Schema.String, Schema.Number]).pipe(Schema.decodeTo(Schema.Boolean, SchemaTransformation.transform({ decode: (x) => x === true || x === "true" || x === 1 || x === "1", encode: (a) => a }))).pipe(Schema.withDecodingDefaultType(Effect.succeed(false)));

// </DefaultSchemas>

// <Schemas>
export type ApplyTags = __TypedOpenapi.Schemas.ApplyTags;
export const ApplyTags = Schema.Literals(["add", "remove", "replace"]);

export type SelectOption = __TypedOpenapi.Schemas.SelectOption;
export const SelectOption = Schema.Struct({ value: Schema.optional(Schema.Int), name: Schema.optional(Schema.NullOr(Schema.String)), order: Schema.optional(Schema.Int), hint: Schema.optional(Schema.NullOr(Schema.String)), dividerAfter: Schema.optional(Schema.Boolean) });

export type PrivacyLevel = __TypedOpenapi.Schemas.PrivacyLevel;
export const PrivacyLevel = Schema.Literals(["normal", "password", "apiKey", "userName"]);

export type Field = __TypedOpenapi.Schemas.Field;
export const Field = Schema.Struct({ order: Schema.optional(Schema.Int), name: Schema.optional(Schema.NullOr(Schema.String)), label: Schema.optional(Schema.NullOr(Schema.String)), unit: Schema.optional(Schema.NullOr(Schema.String)), helpText: Schema.optional(Schema.NullOr(Schema.String)), helpTextWarning: Schema.optional(Schema.NullOr(Schema.String)), helpLink: Schema.optional(Schema.NullOr(Schema.String)), value: Schema.optional(Schema.Null), type: Schema.optional(Schema.NullOr(Schema.String)), advanced: Schema.optional(Schema.Boolean), selectOptions: Schema.optional(Schema.NullOr(Schema.Array(SelectOption))), selectOptionsProviderAction: Schema.optional(Schema.NullOr(Schema.String)), section: Schema.optional(Schema.NullOr(Schema.String)), hidden: Schema.optional(Schema.NullOr(Schema.String)), privacy: Schema.optional(PrivacyLevel), placeholder: Schema.optional(Schema.NullOr(Schema.String)), isFloat: Schema.optional(Schema.Boolean) });

export type DownloadProtocol = __TypedOpenapi.Schemas.DownloadProtocol;
export const DownloadProtocol = Schema.Literals(["unknown", "usenet", "torrent"]);

export type DownloadClientBulkResource = __TypedOpenapi.Schemas.DownloadClientBulkResource;
export const DownloadClientBulkResource = Schema.Struct({ ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.Int))), tags: Schema.optional(Schema.NullOr(Schema.Array(Schema.Int))), applyTags: Schema.optional(ApplyTags), enable: Schema.optional(Schema.NullOr(Schema.Boolean)), priority: Schema.optional(Schema.NullOr(Schema.Int)), removeCompletedDownloads: Schema.optional(Schema.NullOr(Schema.Boolean)), removeFailedDownloads: Schema.optional(Schema.NullOr(Schema.Boolean)) });

export type ProviderMessageType = __TypedOpenapi.Schemas.ProviderMessageType;
export const ProviderMessageType = Schema.Literals(["info", "warning", "error"]);

export type ProviderMessage = __TypedOpenapi.Schemas.ProviderMessage;
export const ProviderMessage = Schema.Struct({ message: Schema.optional(Schema.NullOr(Schema.String)), type: Schema.optional(ProviderMessageType) });

export type DownloadClientResource = __TypedOpenapi.Schemas.DownloadClientResource;
export const DownloadClientResource = Schema.suspend(() => Schema.Struct({ id: Schema.optional(Schema.Int), name: Schema.optional(Schema.NullOr(Schema.String)), fields: Schema.optional(Schema.NullOr(Schema.Array(Field))), implementationName: Schema.optional(Schema.NullOr(Schema.String)), implementation: Schema.optional(Schema.NullOr(Schema.String)), configContract: Schema.optional(Schema.NullOr(Schema.String)), infoLink: Schema.optional(Schema.NullOr(Schema.String)), message: Schema.optional(ProviderMessage), tags: Schema.optional(Schema.NullOr(Schema.Array(Schema.Int).check(Schema.isUnique()))), presets: Schema.optional(Schema.NullOr(Schema.Array(DownloadClientResource))), enable: Schema.optional(Schema.Boolean), protocol: Schema.optional(DownloadProtocol), priority: Schema.optional(Schema.Int), removeCompletedDownloads: Schema.optional(Schema.Boolean), removeFailedDownloads: Schema.optional(Schema.Boolean) }));

export type FileDateType = __TypedOpenapi.Schemas.FileDateType;
export const FileDateType = Schema.Literals(["none", "cinemas", "release"]);

export type ProperDownloadTypes = __TypedOpenapi.Schemas.ProperDownloadTypes;
export const ProperDownloadTypes = Schema.Literals(["preferAndUpgrade", "doNotUpgrade", "doNotPrefer"]);

export type RescanAfterRefreshType = __TypedOpenapi.Schemas.RescanAfterRefreshType;
export const RescanAfterRefreshType = Schema.Literals(["always", "afterManual", "never"]);

export type MediaManagementConfigResource = __TypedOpenapi.Schemas.MediaManagementConfigResource;
export const MediaManagementConfigResource = Schema.Struct({ id: Schema.optional(Schema.Int), autoUnmonitorPreviouslyDownloadedMovies: Schema.optional(Schema.Boolean), recycleBin: Schema.optional(Schema.NullOr(Schema.String)), recycleBinCleanupDays: Schema.optional(Schema.Int), downloadPropersAndRepacks: Schema.optional(ProperDownloadTypes), createEmptyMovieFolders: Schema.optional(Schema.Boolean), deleteEmptyFolders: Schema.optional(Schema.Boolean), fileDate: Schema.optional(FileDateType), rescanAfterRefresh: Schema.optional(RescanAfterRefreshType), autoRenameFolders: Schema.optional(Schema.Boolean), pathsDefaultStatic: Schema.optional(Schema.Boolean), setPermissionsLinux: Schema.optional(Schema.Boolean), chmodFolder: Schema.optional(Schema.NullOr(Schema.String)), chownGroup: Schema.optional(Schema.NullOr(Schema.String)), skipFreeSpaceCheckWhenImporting: Schema.optional(Schema.Boolean), minimumFreeSpaceWhenImporting: Schema.optional(Schema.Int), copyUsingHardlinks: Schema.optional(Schema.Boolean), useScriptImport: Schema.optional(Schema.Boolean), scriptImportPath: Schema.optional(Schema.NullOr(Schema.String)), importExtraFiles: Schema.optional(Schema.Boolean), extraFileExtensions: Schema.optional(Schema.NullOr(Schema.String)), enableMediaInfo: Schema.optional(Schema.Boolean) });

export type UnmappedFolder = __TypedOpenapi.Schemas.UnmappedFolder;
export const UnmappedFolder = Schema.Struct({ name: Schema.optional(Schema.NullOr(Schema.String)), path: Schema.optional(Schema.NullOr(Schema.String)), relativePath: Schema.optional(Schema.NullOr(Schema.String)) });

export type RootFolderResource = __TypedOpenapi.Schemas.RootFolderResource;
export const RootFolderResource = Schema.Struct({ id: Schema.optional(Schema.Int), path: Schema.optional(Schema.NullOr(Schema.String)), accessible: Schema.optional(Schema.Boolean), freeSpace: Schema.optional(Schema.NullOr(Schema.Int)), unmappedFolders: Schema.optional(Schema.NullOr(Schema.Array(UnmappedFolder))) });

// </Schemas>

// <Endpoints>
export type get__api_v3_downloadclient = __TypedOpenapi.Endpoints.get__api_v3_downloadclient;
export const get__api_v3_downloadclient = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/v3/downloadclient"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(DownloadClientResource) },
};

export type post__api_v3_downloadclient = __TypedOpenapi.Endpoints.post__api_v3_downloadclient;
export const post__api_v3_downloadclient = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/v3/downloadclient"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ forceSave: Union_default_false_prop })), body: DownloadClientResource },
  responses: { 200: DownloadClientResource },
};

export type put__api_v3_downloadclient_Id = __TypedOpenapi.Endpoints.put__api_v3_downloadclient_Id;
export const put__api_v3_downloadclient_Id = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/v3/downloadclient/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ forceSave: Union_default_false_prop })), path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }), body: DownloadClientResource },
  responses: { 200: DownloadClientResource },
};

export type delete__api_v3_downloadclient_Id = __TypedOpenapi.Endpoints.delete__api_v3_downloadclient_Id;
export const delete__api_v3_downloadclient_Id = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/v3/downloadclient/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Unknown },
};

export type get__api_v3_downloadclient_Id = __TypedOpenapi.Endpoints.get__api_v3_downloadclient_Id;
export const get__api_v3_downloadclient_Id = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/v3/downloadclient/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: DownloadClientResource },
};

export type put__api_v3_downloadclient_bulk = __TypedOpenapi.Endpoints.put__api_v3_downloadclient_bulk;
export const put__api_v3_downloadclient_bulk = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/v3/downloadclient/bulk"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: DownloadClientBulkResource },
  responses: { 200: DownloadClientResource },
};

export type delete__api_v3_downloadclient_bulk = __TypedOpenapi.Endpoints.delete__api_v3_downloadclient_bulk;
export const delete__api_v3_downloadclient_bulk = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/v3/downloadclient/bulk"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: DownloadClientBulkResource },
  responses: { 200: Schema.Unknown },
};

export type get__api_v3_downloadclient_schema = __TypedOpenapi.Endpoints.get__api_v3_downloadclient_schema;
export const get__api_v3_downloadclient_schema = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/v3/downloadclient/schema"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(DownloadClientResource) },
};

export type post__api_v3_downloadclient_test = __TypedOpenapi.Endpoints.post__api_v3_downloadclient_test;
export const post__api_v3_downloadclient_test = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/v3/downloadclient/test"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ forceTest: Union_default_false_prop })), body: DownloadClientResource },
  responses: { 200: Schema.Unknown },
};

export type post__api_v3_downloadclient_testall = __TypedOpenapi.Endpoints.post__api_v3_downloadclient_testall;
export const post__api_v3_downloadclient_testall = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/v3/downloadclient/testall"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post__api_v3_downloadclient_action_Name = __TypedOpenapi.Endpoints.post__api_v3_downloadclient_action_Name;
export const post__api_v3_downloadclient_action_Name = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/v3/downloadclient/action/{name}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ name: Schema.String }), body: DownloadClientResource },
  responses: { 200: Schema.Unknown },
};

export type get__api_v3_config_mediamanagement = __TypedOpenapi.Endpoints.get__api_v3_config_mediamanagement;
export const get__api_v3_config_mediamanagement = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/v3/config/mediamanagement"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: MediaManagementConfigResource },
};

export type put__api_v3_config_mediamanagement_Id = __TypedOpenapi.Endpoints.put__api_v3_config_mediamanagement_Id;
export const put__api_v3_config_mediamanagement_Id = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/v3/config/mediamanagement/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }), body: MediaManagementConfigResource },
  responses: { 200: MediaManagementConfigResource },
};

export type get__api_v3_config_mediamanagement_Id = __TypedOpenapi.Endpoints.get__api_v3_config_mediamanagement_Id;
export const get__api_v3_config_mediamanagement_Id = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/v3/config/mediamanagement/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: MediaManagementConfigResource },
};

export type post__api_v3_rootfolder = __TypedOpenapi.Endpoints.post__api_v3_rootfolder;
export const post__api_v3_rootfolder = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/v3/rootfolder"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: RootFolderResource },
  responses: { 200: RootFolderResource },
};

export type get__api_v3_rootfolder = __TypedOpenapi.Endpoints.get__api_v3_rootfolder;
export const get__api_v3_rootfolder = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/v3/rootfolder"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(RootFolderResource) },
};

export type delete__api_v3_rootfolder_Id = __TypedOpenapi.Endpoints.delete__api_v3_rootfolder_Id;
export const delete__api_v3_rootfolder_Id = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/v3/rootfolder/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Unknown },
};

export type get__api_v3_rootfolder_Id = __TypedOpenapi.Endpoints.get__api_v3_rootfolder_Id;
export const get__api_v3_rootfolder_Id = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/v3/rootfolder/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: RootFolderResource },
};

// </Endpoints>

  
     // <EndpointByMethod>
     export const EndpointByMethod: __TypedOpenapi.EndpointByMethod = {
     get: {
           "/api/v3/downloadclient": get__api_v3_downloadclient as any,
"/api/v3/downloadclient/{id}": get__api_v3_downloadclient_Id as any,
"/api/v3/downloadclient/schema": get__api_v3_downloadclient_schema as any,
"/api/v3/config/mediamanagement": get__api_v3_config_mediamanagement as any,
"/api/v3/config/mediamanagement/{id}": get__api_v3_config_mediamanagement_Id as any,
"/api/v3/rootfolder": get__api_v3_rootfolder as any,
"/api/v3/rootfolder/{id}": get__api_v3_rootfolder_Id as any
         },
post: {
           "/api/v3/downloadclient": post__api_v3_downloadclient as any,
"/api/v3/downloadclient/test": post__api_v3_downloadclient_test as any,
"/api/v3/downloadclient/testall": post__api_v3_downloadclient_testall as any,
"/api/v3/downloadclient/action/{name}": post__api_v3_downloadclient_action_Name as any,
"/api/v3/rootfolder": post__api_v3_rootfolder as any
         },
put: {
           "/api/v3/downloadclient/{id}": put__api_v3_downloadclient_Id as any,
"/api/v3/downloadclient/bulk": put__api_v3_downloadclient_bulk as any,
"/api/v3/config/mediamanagement/{id}": put__api_v3_config_mediamanagement_Id as any
         },
delete: {
           "/api/v3/downloadclient/{id}": delete__api_v3_downloadclient_Id as any,
"/api/v3/downloadclient/bulk": delete__api_v3_downloadclient_bulk as any,
"/api/v3/rootfolder/{id}": delete__api_v3_rootfolder_Id as any
         }
     }
     export type EndpointByMethod = __TypedOpenapi.EndpointByMethod;
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type GetEndpoints = EndpointByMethod["get"]
export type PostEndpoints = EndpointByMethod["post"]
export type PutEndpoints = EndpointByMethod["put"]
export type DeleteEndpoints = EndpointByMethod["delete"]
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
    export const defaultSecurityRequirements = [["X-Api-Key"],["apikey"]] as SecurityRequirements;
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
  validate: ValidateSide = "none";
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
put<Path extends keyof PutEndpoints, TEndpoint extends PutEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<ApiCallParams<TEndpoint>>
  ): Effect.Effect<
    InferSuccessData<TEndpoint>,
    TypedStatusError | HttpClientError,
    never
  > {
    return this.request<"put", Path, PutEndpoints[Path]>("put", path, ...params);
  }
delete<Path extends keyof DeleteEndpoints, TEndpoint extends DeleteEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<ApiCallParams<TEndpoint>>
  ): Effect.Effect<
    InferSuccessData<TEndpoint>,
    TypedStatusError | HttpClientError,
    never
  > {
    return this.request<"delete", Path, DeleteEndpoints[Path]>("delete", path, ...params);
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

  