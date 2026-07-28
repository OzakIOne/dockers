// @ts-nocheck
import type * as __TypedOpenapi from "./maintainerr.types.js";

  import { Effect, Schema } from "effect";

// <DefaultSchemas>
const String_default_value_prop = Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed("")));

// </DefaultSchemas>

// <Schemas>
export type LivenessResponse = __TypedOpenapi.Schemas.LivenessResponse;
export const LivenessResponse = Schema.Struct({ status: Schema.Literal("ok"), uptimeSeconds: Schema.Number, timestamp: Schema.String });

export type HealthResponse = __TypedOpenapi.Schemas.HealthResponse;
export const HealthResponse = Schema.Struct({ status: Schema.Literals(["ok", "degraded"]), uptimeSeconds: Schema.Number, database: Schema.Literals(["ok", "unreachable"]), timestamp: Schema.String });

export type SettingDto = __TypedOpenapi.Schemas.SettingDto;
export const SettingDto = Schema.Struct({  });

export type DownloadClientSetting = __TypedOpenapi.Schemas.DownloadClientSetting;
export const DownloadClientSetting = Schema.Struct({ download_client_url: Schema.String, download_client_username: String_default_value_prop, download_client_password: String_default_value_prop, download_client_delete_data: Schema.Boolean, download_client_fallback_ratio: Schema.Number.check(Schema.isGreaterThanOrEqualTo(0.5)) });

export type EmbySetting = __TypedOpenapi.Schemas.EmbySetting;
export const EmbySetting = Schema.Struct({ emby_url: Schema.String, emby_api_key: Schema.String, emby_user_id: Schema.optional(Schema.String) });

export type EmbyLoginRequest = __TypedOpenapi.Schemas.EmbyLoginRequest;
export const EmbyLoginRequest = Schema.Struct({ emby_url: Schema.String, username: Schema.String, password: Schema.String });

export type StreamystatsSetting = __TypedOpenapi.Schemas.StreamystatsSetting;
export const StreamystatsSetting = Schema.Struct({ url: Schema.String });

export type StreamystatsInfoResponse = __TypedOpenapi.Schemas.StreamystatsInfoResponse;
export const StreamystatsInfoResponse = Schema.Struct({ url: Schema.String, serverId: Schema.NullOr(Schema.Number) });

export type StreamystatsUser = __TypedOpenapi.Schemas.StreamystatsUser;
export const StreamystatsUser = Schema.Struct({ id: Schema.String, name: Schema.optional(Schema.NullOr(Schema.String)) });

export type StreamystatsItemUserStats = __TypedOpenapi.Schemas.StreamystatsItemUserStats;
export const StreamystatsItemUserStats = Schema.Struct({ user: StreamystatsUser, watchCount: Schema.Number, totalWatchTime: Schema.Number, completionRate: Schema.Number, firstWatched: Schema.NullOr(Schema.String), lastWatched: Schema.NullOr(Schema.String) });

export type StreamystatsItemWatchHistory = __TypedOpenapi.Schemas.StreamystatsItemWatchHistory;
export const StreamystatsItemWatchHistory = Schema.Struct({ user: Schema.NullOr(StreamystatsUser), watchDate: Schema.String, watchDuration: Schema.Number, completionPercentage: Schema.Number, playMethod: Schema.optional(Schema.NullOr(Schema.String)), deviceName: Schema.optional(Schema.NullOr(Schema.String)), clientName: Schema.optional(Schema.NullOr(Schema.String)) });

export type StreamystatsItemWatchCountByMonth = __TypedOpenapi.Schemas.StreamystatsItemWatchCountByMonth;
export const StreamystatsItemWatchCountByMonth = Schema.Struct({ month: Schema.Number, year: Schema.Number, watchCount: Schema.Number, uniqueUsers: Schema.Number, totalWatchTime: Schema.Number });

export type StreamystatsSeriesEpisodeStats = __TypedOpenapi.Schemas.StreamystatsSeriesEpisodeStats;
export const StreamystatsSeriesEpisodeStats = Schema.Struct({ totalSeasons: Schema.Number, totalEpisodes: Schema.Number, watchedEpisodes: Schema.Number, watchedSeasons: Schema.Number });

export type StreamystatsItem = __TypedOpenapi.Schemas.StreamystatsItem;
export const StreamystatsItem = Schema.Struct({ id: Schema.String, name: Schema.optional(Schema.NullOr(Schema.String)), type: Schema.optional(Schema.NullOr(Schema.String)) });

export type StreamystatsItemDetails = __TypedOpenapi.Schemas.StreamystatsItemDetails;
export const StreamystatsItemDetails = Schema.Struct({ item: StreamystatsItem, totalViews: Schema.Number, totalWatchTime: Schema.Number, completionRate: Schema.Number, firstWatched: Schema.NullOr(Schema.String), lastWatched: Schema.NullOr(Schema.String), usersWatched: Schema.Array(StreamystatsItemUserStats), watchHistory: Schema.Array(StreamystatsItemWatchHistory), watchCountByMonth: Schema.Array(StreamystatsItemWatchCountByMonth), episodeStats: Schema.optional(Schema.NullOr(StreamystatsSeriesEpisodeStats)) });

export type CronScheduleDto = __TypedOpenapi.Schemas.CronScheduleDto;
export const CronScheduleDto = Schema.Struct({  });

export type CollectionVisibilitySettings = __TypedOpenapi.Schemas.CollectionVisibilitySettings;
export const CollectionVisibilitySettings = Schema.Struct({ libraryId: Schema.optional(Schema.String), collectionId: Schema.optional(Schema.String), ownHome: Schema.optional(Schema.Boolean), sharedHome: Schema.optional(Schema.Boolean), recommended: Schema.optional(Schema.Boolean) });

export type CreateCollectionParams = __TypedOpenapi.Schemas.CreateCollectionParams;
export const CreateCollectionParams = Schema.Struct({ libraryId: Schema.String, title: Schema.String, summary: Schema.optional(Schema.String), type: Schema.Literals(["movie", "show", "season", "episode"]), sortTitle: Schema.optional(Schema.String), initialItemId: Schema.optional(Schema.String) });

export type RulesDto = __TypedOpenapi.Schemas.RulesDto;
export const RulesDto = Schema.Struct({  });

export type CommunityRule = __TypedOpenapi.Schemas.CommunityRule;
export const CommunityRule = Schema.Struct({  });

// </Schemas>

// <Endpoints>
export type get_HealthController_health = __TypedOpenapi.Endpoints.get_HealthController_health;
export const get_HealthController_health = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/health"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: HealthResponse, 503: HealthResponse },
};

export type get_HealthController_live = __TypedOpenapi.Endpoints.get_HealthController_live;
export const get_HealthController_live = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/health/live"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: LivenessResponse },
};

export type get_HealthController_ready = __TypedOpenapi.Endpoints.get_HealthController_ready;
export const get_HealthController_ready = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/health/ready"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: HealthResponse, 503: HealthResponse },
};

export type get_AppController_getAppStatus = __TypedOpenapi.Endpoints.get_AppController_getAppStatus;
export const get_AppController_getAppStatus = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/app/status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_getSettings = __TypedOpenapi.Endpoints.get_SettingsController_getSettings;
export const get_SettingsController_getSettings = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: SettingDto },
};

export type post_SettingsController_updateSettings = __TypedOpenapi.Endpoints.post_SettingsController_updateSettings;
export const post_SettingsController_updateSettings = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: SettingDto },
  responses: { 201: Schema.Unknown },
};

export type get_SettingsController_getVersion = __TypedOpenapi.Endpoints.get_SettingsController_getVersion;
export const get_SettingsController_getVersion = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/version"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_generateApiKey = __TypedOpenapi.Endpoints.get_SettingsController_generateApiKey;
export const get_SettingsController_generateApiKey = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/api/generate"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type delete_SettingsController_deletePlexApiAuth = __TypedOpenapi.Endpoints.delete_SettingsController_deletePlexApiAuth;
export const delete_SettingsController_deletePlexApiAuth = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/settings/plex/auth"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_updateAuthToken = __TypedOpenapi.Endpoints.post_SettingsController_updateAuthToken;
export const post_SettingsController_updateAuthToken = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/plex/token"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type get_SettingsController_testSetup = __TypedOpenapi.Endpoints.get_SettingsController_testSetup;
export const get_SettingsController_testSetup = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/test/setup"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_testOverseerr = __TypedOpenapi.Endpoints.get_SettingsController_testOverseerr;
export const get_SettingsController_testOverseerr = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/test/overseerr"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_testRadarr = __TypedOpenapi.Endpoints.get_SettingsController_testRadarr;
export const get_SettingsController_testRadarr = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/test/radarr"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_testSonarr = __TypedOpenapi.Endpoints.get_SettingsController_testSonarr;
export const get_SettingsController_testSonarr = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/test/sonarr"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_testPlex = __TypedOpenapi.Endpoints.get_SettingsController_testPlex;
export const get_SettingsController_testPlex = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/test/plex"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_testTautulli = __TypedOpenapi.Endpoints.get_SettingsController_testTautulli;
export const get_SettingsController_testTautulli = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/test/tautulli"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_getTmdbSetting = __TypedOpenapi.Endpoints.get_SettingsController_getTmdbSetting;
export const get_SettingsController_getTmdbSetting = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/tmdb"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_updateTmdbSetting = __TypedOpenapi.Endpoints.post_SettingsController_updateTmdbSetting;
export const post_SettingsController_updateTmdbSetting = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/tmdb"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type delete_SettingsController_removeTmdbSetting = __TypedOpenapi.Endpoints.delete_SettingsController_removeTmdbSetting;
export const delete_SettingsController_removeTmdbSetting = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/settings/tmdb"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_testTmdb = __TypedOpenapi.Endpoints.post_SettingsController_testTmdb;
export const post_SettingsController_testTmdb = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/test/tmdb"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type get_SettingsController_getTvdbSetting = __TypedOpenapi.Endpoints.get_SettingsController_getTvdbSetting;
export const get_SettingsController_getTvdbSetting = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/tvdb"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_updateTvdbSetting = __TypedOpenapi.Endpoints.post_SettingsController_updateTvdbSetting;
export const post_SettingsController_updateTvdbSetting = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/tvdb"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type delete_SettingsController_removeTvdbSetting = __TypedOpenapi.Endpoints.delete_SettingsController_removeTvdbSetting;
export const delete_SettingsController_removeTvdbSetting = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/settings/tvdb"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_testTvdb = __TypedOpenapi.Endpoints.post_SettingsController_testTvdb;
export const post_SettingsController_testTvdb = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/test/tvdb"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type get_SettingsController_getMetadataProviderPreference = __TypedOpenapi.Endpoints.get_SettingsController_getMetadataProviderPreference;
export const get_SettingsController_getMetadataProviderPreference = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/metadata-provider"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_updateMetadataProviderPreference = __TypedOpenapi.Endpoints.post_SettingsController_updateMetadataProviderPreference;
export const post_SettingsController_updateMetadataProviderPreference = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/metadata-provider"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type post_SettingsController_refreshMetadataCache = __TypedOpenapi.Endpoints.post_SettingsController_refreshMetadataCache;
export const post_SettingsController_refreshMetadataCache = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/metadata/refresh/{provider}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ provider: Schema.String }) },
  responses: { 201: Schema.Unknown },
};

export type get_SettingsController_getPlexServers = __TypedOpenapi.Endpoints.get_SettingsController_getPlexServers;
export const get_SettingsController_getPlexServers = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/plex/devices/servers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_SettingsController_getDownloadClientSetting = __TypedOpenapi.Endpoints.get_SettingsController_getDownloadClientSetting;
export const get_SettingsController_getDownloadClientSetting = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/download-client"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: DownloadClientSetting },
};

export type post_SettingsController_updateDownloadClientSetting = __TypedOpenapi.Endpoints.post_SettingsController_updateDownloadClientSetting;
export const post_SettingsController_updateDownloadClientSetting = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/download-client"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: DownloadClientSetting },
  responses: { 201: Schema.Unknown },
};

export type delete_SettingsController_removeDownloadClientSetting = __TypedOpenapi.Endpoints.delete_SettingsController_removeDownloadClientSetting;
export const delete_SettingsController_removeDownloadClientSetting = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/settings/download-client"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_testDownloadClient = __TypedOpenapi.Endpoints.post_SettingsController_testDownloadClient;
export const post_SettingsController_testDownloadClient = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/test/download-client"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: DownloadClientSetting },
  responses: { 201: Schema.Unknown },
};

export type get_SettingsController_getEmbySetting = __TypedOpenapi.Endpoints.get_SettingsController_getEmbySetting;
export const get_SettingsController_getEmbySetting = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/emby"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_saveEmbySettings = __TypedOpenapi.Endpoints.post_SettingsController_saveEmbySettings;
export const post_SettingsController_saveEmbySettings = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/emby"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: EmbySetting },
  responses: { 201: Schema.Unknown },
};

export type delete_SettingsController_removeEmbySettings = __TypedOpenapi.Endpoints.delete_SettingsController_removeEmbySettings;
export const delete_SettingsController_removeEmbySettings = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/settings/emby"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_testEmby = __TypedOpenapi.Endpoints.post_SettingsController_testEmby;
export const post_SettingsController_testEmby = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/emby/test"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: EmbySetting },
  responses: { 201: Schema.Unknown },
};

export type post_SettingsController_loginEmby = __TypedOpenapi.Endpoints.post_SettingsController_loginEmby;
export const post_SettingsController_loginEmby = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/emby/login"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: EmbyLoginRequest },
  responses: { 201: Schema.Unknown },
};

export type get_SettingsController_getStreamystatsSetting = __TypedOpenapi.Endpoints.get_SettingsController_getStreamystatsSetting;
export const get_SettingsController_getStreamystatsSetting = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/settings/streamystats"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_updateStreamystatsSetting = __TypedOpenapi.Endpoints.post_SettingsController_updateStreamystatsSetting;
export const post_SettingsController_updateStreamystatsSetting = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/streamystats"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: StreamystatsSetting },
  responses: { 201: Schema.Unknown },
};

export type delete_SettingsController_removeStreamystatsSetting = __TypedOpenapi.Endpoints.delete_SettingsController_removeStreamystatsSetting;
export const delete_SettingsController_removeStreamystatsSetting = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/settings/streamystats"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_SettingsController_testStreamystats = __TypedOpenapi.Endpoints.post_SettingsController_testStreamystats;
export const post_SettingsController_testStreamystats = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/test/streamystats"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: StreamystatsSetting },
  responses: { 201: Schema.Unknown },
};

export type post_SettingsController_validateSingleCron = __TypedOpenapi.Endpoints.post_SettingsController_validateSingleCron;
export const post_SettingsController_validateSingleCron = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/settings/cron/validate"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CronScheduleDto },
  responses: { 201: Schema.Unknown },
};

export type get_StreamystatsApiController_getInfo = __TypedOpenapi.Endpoints.get_StreamystatsApiController_getInfo;
export const get_StreamystatsApiController_getInfo = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/streamystats/info"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: StreamystatsInfoResponse },
};

export type get_StreamystatsApiController_getItemDetails = __TypedOpenapi.Endpoints.get_StreamystatsApiController_getItemDetails;
export const get_StreamystatsApiController_getItemDetails = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/streamystats/items/{itemId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ itemId: Schema.String }) },
  responses: { 200: StreamystatsItemDetails },
};

export type get_MediaServerController_getStatus = __TypedOpenapi.Endpoints.get_MediaServerController_getStatus;
export const get_MediaServerController_getStatus = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getLibraries = __TypedOpenapi.Endpoints.get_MediaServerController_getLibraries;
export const get_MediaServerController_getLibraries = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/libraries"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getLibraryContent = __TypedOpenapi.Endpoints.get_MediaServerController_getLibraryContent;
export const get_MediaServerController_getLibraryContent = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/library/{id}/content"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ page: Schema.optional(Schema.NumberFromString), limit: Schema.optional(Schema.NumberFromString) })), path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getMetadata = __TypedOpenapi.Endpoints.get_MediaServerController_getMetadata;
export const get_MediaServerController_getMetadata = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/meta/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getWatchHistory = __TypedOpenapi.Endpoints.get_MediaServerController_getWatchHistory;
export const get_MediaServerController_getWatchHistory = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/meta/{id}/seen"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getUsers = __TypedOpenapi.Endpoints.get_MediaServerController_getUsers;
export const get_MediaServerController_getUsers = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/users"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getChildrenMetadata = __TypedOpenapi.Endpoints.get_MediaServerController_getChildrenMetadata;
export const get_MediaServerController_getChildrenMetadata = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/meta/{id}/children"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getRecentlyAdded = __TypedOpenapi.Endpoints.get_MediaServerController_getRecentlyAdded;
export const get_MediaServerController_getRecentlyAdded = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/library/{id}/recent"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getCollections = __TypedOpenapi.Endpoints.get_MediaServerController_getCollections;
export const get_MediaServerController_getCollections = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/library/{id}/collections"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getCollection = __TypedOpenapi.Endpoints.get_MediaServerController_getCollection;
export const get_MediaServerController_getCollection = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/collection/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type delete_MediaServerController_deleteCollection = __TypedOpenapi.Endpoints.delete_MediaServerController_deleteCollection;
export const delete_MediaServerController_deleteCollection = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/media-server/collection/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_getCollectionChildren = __TypedOpenapi.Endpoints.get_MediaServerController_getCollectionChildren;
export const get_MediaServerController_getCollectionChildren = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/collection/{id}/children"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MediaServerController_searchContent = __TypedOpenapi.Endpoints.get_MediaServerController_searchContent;
export const get_MediaServerController_searchContent = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/media-server/search/{query}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ query: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type put_MediaServerController_addToCollection = __TypedOpenapi.Endpoints.put_MediaServerController_addToCollection;
export const put_MediaServerController_addToCollection = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/media-server/collection/{collectionId}/item/{itemId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ collectionId: Schema.String, itemId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type delete_MediaServerController_removeFromCollection = __TypedOpenapi.Endpoints.delete_MediaServerController_removeFromCollection;
export const delete_MediaServerController_removeFromCollection = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/media-server/collection/{collectionId}/item/{itemId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ collectionId: Schema.String, itemId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type put_MediaServerController_updateCollection = __TypedOpenapi.Endpoints.put_MediaServerController_updateCollection;
export const put_MediaServerController_updateCollection = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/media-server/collection"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_MediaServerController_createCollection = __TypedOpenapi.Endpoints.post_MediaServerController_createCollection;
export const post_MediaServerController_createCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/media-server/collection"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CreateCollectionParams },
  responses: { 201: Schema.Unknown },
};

export type put_MediaServerController_updateCollectionVisibility = __TypedOpenapi.Endpoints.put_MediaServerController_updateCollectionVisibility;
export const put_MediaServerController_updateCollectionVisibility = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/media-server/collection/visibility"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CollectionVisibilitySettings },
  responses: { 200: Schema.Unknown },
};

export type get_OverseerrApiController_getMovie = __TypedOpenapi.Endpoints.get_OverseerrApiController_getMovie;
export const get_OverseerrApiController_getMovie = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overseerr/movie/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_OverseerrApiController_getShow = __TypedOpenapi.Endpoints.get_OverseerrApiController_getShow;
export const get_OverseerrApiController_getShow = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overseerr/show/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type delete_OverseerrApiController_deleteRequest = __TypedOpenapi.Endpoints.delete_OverseerrApiController_deleteRequest;
export const delete_OverseerrApiController_deleteRequest = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/overseerr/request/{requestId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ requestId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type delete_OverseerrApiController_deleteMedia = __TypedOpenapi.Endpoints.delete_OverseerrApiController_deleteMedia;
export const delete_OverseerrApiController_deleteMedia = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/overseerr/media/{mediaId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ mediaId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type delete_OverseerrApiController_removeMediaByTmdbId = __TypedOpenapi.Endpoints.delete_OverseerrApiController_removeMediaByTmdbId;
export const delete_OverseerrApiController_removeMediaByTmdbId = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/overseerr/media/tmdb/{mediaId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ mediaId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_TmdbApiController_getPerson = __TypedOpenapi.Endpoints.get_TmdbApiController_getPerson;
export const get_TmdbApiController_getPerson = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/moviedb/person/{personId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ personId: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type get_TmdbApiController_getMovie = __TypedOpenapi.Endpoints.get_TmdbApiController_getMovie;
export const get_TmdbApiController_getMovie = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/moviedb/movie/imdb/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type get_TmdbApiController_getImage = __TypedOpenapi.Endpoints.get_TmdbApiController_getImage;
export const get_TmdbApiController_getImage = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/moviedb/image/{type}/{tmdbId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ tmdbId: Schema.NumberFromString, type: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_RulesController_getRuleConstants = __TypedOpenapi.Endpoints.get_RulesController_getRuleConstants;
export const get_RulesController_getRuleConstants = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/rules/constants"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type put_RulesController_updateSchedule = __TypedOpenapi.Endpoints.put_RulesController_updateSchedule;
export const put_RulesController_updateSchedule = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/rules/schedule/update"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_RulesController_getCommunityRules = __TypedOpenapi.Endpoints.get_RulesController_getCommunityRules;
export const get_RulesController_getCommunityRules = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/rules/community"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_RulesController_updateCommunityRules = __TypedOpenapi.Endpoints.post_RulesController_updateCommunityRules;
export const post_RulesController_updateCommunityRules = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/rules/community"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CommunityRule },
  responses: { 201: Schema.Unknown },
};

export type get_RulesController_getCommunityRuleKarmaHistory = __TypedOpenapi.Endpoints.get_RulesController_getCommunityRuleKarmaHistory;
export const get_RulesController_getCommunityRuleKarmaHistory = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/rules/community/karma/history"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_RulesController_getExclusion = __TypedOpenapi.Endpoints.get_RulesController_getExclusion;
export const get_RulesController_getExclusion = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/rules/exclusion"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_RulesController_setExclusion = __TypedOpenapi.Endpoints.post_RulesController_setExclusion;
export const post_RulesController_setExclusion = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/rules/exclusion"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type get_RulesController_getRules = __TypedOpenapi.Endpoints.get_RulesController_getRules;
export const get_RulesController_getRules = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/rules/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type delete_RulesController_deleteRuleGroup = __TypedOpenapi.Endpoints.delete_RulesController_deleteRuleGroup;
export const delete_RulesController_deleteRuleGroup = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/rules/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_RulesController_getRuleGroupByCollectionId = __TypedOpenapi.Endpoints.get_RulesController_getRuleGroupByCollectionId;
export const get_RulesController_getRuleGroupByCollectionId = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/rules/collection/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_RulesController_getRuleGroups = __TypedOpenapi.Endpoints.get_RulesController_getRuleGroups;
export const get_RulesController_getRuleGroups = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/rules"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_RulesController_updateJob = __TypedOpenapi.Endpoints.post_RulesController_updateJob;
export const post_RulesController_updateJob = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/rules"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type put_RulesController_updateRule = __TypedOpenapi.Endpoints.put_RulesController_updateRule;
export const put_RulesController_updateRule = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/rules"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: RulesDto },
  responses: { 200: Schema.Unknown },
};

export type post_RulesController_executeRules = __TypedOpenapi.Endpoints.post_RulesController_executeRules;
export const post_RulesController_executeRules = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/rules/execute"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type delete_RulesController_removeExclusion = __TypedOpenapi.Endpoints.delete_RulesController_removeExclusion;
export const delete_RulesController_removeExclusion = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/rules/exclusion/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type delete_RulesController_removeAllExclusion = __TypedOpenapi.Endpoints.delete_RulesController_removeAllExclusion;
export const delete_RulesController_removeAllExclusion = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/rules/exclusions/{plexId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ plexId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type post_RulesController_updateCommunityRuleKarma = __TypedOpenapi.Endpoints.post_RulesController_updateCommunityRuleKarma;
export const post_RulesController_updateCommunityRuleKarma = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/rules/community/karma"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type post_RulesController_yamlEncode = __TypedOpenapi.Endpoints.post_RulesController_yamlEncode;
export const post_RulesController_yamlEncode = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/rules/yaml/encode"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type post_RulesController_yamlDecode = __TypedOpenapi.Endpoints.post_RulesController_yamlDecode;
export const post_RulesController_yamlDecode = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/rules/yaml/decode"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type post_RulesController_testRuleGroup = __TypedOpenapi.Endpoints.post_RulesController_testRuleGroup;
export const post_RulesController_testRuleGroup = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/rules/test"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type post_CollectionsController_createCollection = __TypedOpenapi.Endpoints.post_CollectionsController_createCollection;
export const post_CollectionsController_createCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/collections"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type put_CollectionsController_updateCollection = __TypedOpenapi.Endpoints.put_CollectionsController_updateCollection;
export const put_CollectionsController_updateCollection = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/collections"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_CollectionsController_getCollections = __TypedOpenapi.Endpoints.get_CollectionsController_getCollections;
export const get_CollectionsController_getCollections = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ libraryId: Schema.NumberFromString, typeId: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type post_CollectionsController_addToCollection = __TypedOpenapi.Endpoints.post_CollectionsController_addToCollection;
export const post_CollectionsController_addToCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/collections/add"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type post_CollectionsController_removeFromCollection = __TypedOpenapi.Endpoints.post_CollectionsController_removeFromCollection;
export const post_CollectionsController_removeFromCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/collections/remove"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type post_CollectionsController_removeCollection = __TypedOpenapi.Endpoints.post_CollectionsController_removeCollection;
export const post_CollectionsController_removeCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/collections/removeCollection"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type post_CollectionsController_handleCollection = __TypedOpenapi.Endpoints.post_CollectionsController_handleCollection;
export const post_CollectionsController_handleCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/collections/handle"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type put_CollectionsController_updateSchedule = __TypedOpenapi.Endpoints.put_CollectionsController_updateSchedule;
export const put_CollectionsController_updateSchedule = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/collections/schedule/update"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_CollectionsController_deactivate = __TypedOpenapi.Endpoints.get_CollectionsController_deactivate;
export const get_CollectionsController_deactivate = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections/deactivate/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type get_CollectionsController_activate = __TypedOpenapi.Endpoints.get_CollectionsController_activate;
export const get_CollectionsController_activate = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections/activate/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type get_CollectionsController_getCollection = __TypedOpenapi.Endpoints.get_CollectionsController_getCollection;
export const get_CollectionsController_getCollection = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections/collection/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type post_CollectionsController_ManualActionOnCollection = __TypedOpenapi.Endpoints.post_CollectionsController_ManualActionOnCollection;
export const post_CollectionsController_ManualActionOnCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/collections/media/add"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 201: Schema.Unknown },
};

export type delete_CollectionsController_deleteMediaFromCollection = __TypedOpenapi.Endpoints.delete_CollectionsController_deleteMediaFromCollection;
export const delete_CollectionsController_deleteMediaFromCollection = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/collections/media"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ mediaId: Schema.NumberFromString, collectionId: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type get_CollectionsController_getMediaInCollection = __TypedOpenapi.Endpoints.get_CollectionsController_getMediaInCollection;
export const get_CollectionsController_getMediaInCollection = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections/media"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ collectionId: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type post_CollectionsController_handleCollectionMedia = __TypedOpenapi.Endpoints.post_CollectionsController_handleCollectionMedia;
export const post_CollectionsController_handleCollectionMedia = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/collections/media/handle"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type get_CollectionsController_getLibraryContent = __TypedOpenapi.Endpoints.get_CollectionsController_getLibraryContent;
export const get_CollectionsController_getLibraryContent = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections/media/{id}/content/{page}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ size: Schema.NumberFromString }), path: Schema.Struct({ id: Schema.NumberFromString, page: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type get_CollectionsController_getExclusions = __TypedOpenapi.Endpoints.get_CollectionsController_getExclusions;
export const get_CollectionsController_getExclusions = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections/exclusions/{id}/content/{page}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ size: Schema.NumberFromString }), path: Schema.Struct({ id: Schema.NumberFromString, page: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type get_CollectionsController_getCollectionLogs = __TypedOpenapi.Endpoints.get_CollectionsController_getCollectionLogs;
export const get_CollectionsController_getCollectionLogs = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections/logs/{id}/content/{page}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ size: Schema.NumberFromString, search: Schema.String, sort: Schema.String, filter: Schema.NumberFromString }), path: Schema.Struct({ id: Schema.NumberFromString, page: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type get_CollectionsController_getCollectionsForOverlayData = __TypedOpenapi.Endpoints.get_CollectionsController_getCollectionsForOverlayData;
export const get_CollectionsController_getCollectionsForOverlayData = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/collections/overlay-data"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ libraryId: Schema.optional(Schema.String), typeId: Schema.optional(Schema.String) })) },
  responses: { 200: Schema.Unknown },
};

export type get_MetadataController_getBackdropImage = __TypedOpenapi.Endpoints.get_MetadataController_getBackdropImage;
export const get_MetadataController_getBackdropImage = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/metadata/backdrop/{type}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ itemId: Schema.optional(Schema.String), tmdbId: Schema.optional(Schema.NumberFromString), tvdbId: Schema.optional(Schema.NumberFromString), imdbId: Schema.optional(Schema.String) })), path: Schema.Struct({ type: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_MetadataController_getImage = __TypedOpenapi.Endpoints.get_MetadataController_getImage;
export const get_MetadataController_getImage = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/metadata/image/{type}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ itemId: Schema.optional(Schema.String), tmdbId: Schema.optional(Schema.NumberFromString), tvdbId: Schema.optional(Schema.NumberFromString), imdbId: Schema.optional(Schema.String) })), path: Schema.Struct({ type: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_OverlaysController_getSettings = __TypedOpenapi.Endpoints.get_OverlaysController_getSettings;
export const get_OverlaysController_getSettings = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type put_OverlaysController_updateSettings = __TypedOpenapi.Endpoints.put_OverlaysController_updateSettings;
export const put_OverlaysController_updateSettings = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/overlays/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 200: Schema.Unknown },
};

export type get_OverlaysController_getSections = __TypedOpenapi.Endpoints.get_OverlaysController_getSections;
export const get_OverlaysController_getSections = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/sections"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_OverlaysController_getRandomItem = __TypedOpenapi.Endpoints.get_OverlaysController_getRandomItem;
export const get_OverlaysController_getRandomItem = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/random-item"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ sectionId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_OverlaysController_getRandomEpisode = __TypedOpenapi.Endpoints.get_OverlaysController_getRandomEpisode;
export const get_OverlaysController_getRandomEpisode = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/random-episode"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ sectionId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_OverlaysController_getPoster = __TypedOpenapi.Endpoints.get_OverlaysController_getPoster;
export const get_OverlaysController_getPoster = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/poster"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ plexId: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_OverlaysController_getStatus = __TypedOpenapi.Endpoints.get_OverlaysController_getStatus;
export const get_OverlaysController_getStatus = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_OverlaysController_processAll = __TypedOpenapi.Endpoints.post_OverlaysController_processAll;
export const post_OverlaysController_processAll = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/process"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.optional(Schema.Struct({ force: Schema.optional(Schema.Boolean) })) },
  responses: { 201: Schema.Unknown, 409: Schema.Unknown },
};

export type post_OverlaysController_processCollection = __TypedOpenapi.Endpoints.post_OverlaysController_processCollection;
export const post_OverlaysController_processCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/process/{collectionId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ collectionId: Schema.NumberFromString }) },
  responses: { 201: Schema.Unknown },
};

export type post_OverlaysController_revertCollection = __TypedOpenapi.Endpoints.post_OverlaysController_revertCollection;
export const post_OverlaysController_revertCollection = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/revert/{collectionId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ collectionId: Schema.NumberFromString }) },
  responses: { 201: Schema.Unknown },
};

export type delete_OverlaysController_resetAll = __TypedOpenapi.Endpoints.delete_OverlaysController_resetAll;
export const delete_OverlaysController_resetAll = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/overlays/reset"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown, 409: Schema.Unknown },
};

export type get_OverlaysController_listFonts = __TypedOpenapi.Endpoints.get_OverlaysController_listFonts;
export const get_OverlaysController_listFonts = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/fonts"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_OverlaysController_uploadFont = __TypedOpenapi.Endpoints.post_OverlaysController_uploadFont;
export const post_OverlaysController_uploadFont = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/fonts"),
  requestFormat: Schema.Literal("form-data"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type get_OverlaysController_getFont = __TypedOpenapi.Endpoints.get_OverlaysController_getFont;
export const get_OverlaysController_getFont = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/fonts/{name}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ name: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_OverlaysController_listImages = __TypedOpenapi.Endpoints.get_OverlaysController_listImages;
export const get_OverlaysController_listImages = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/images"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_OverlaysController_uploadImage = __TypedOpenapi.Endpoints.post_OverlaysController_uploadImage;
export const post_OverlaysController_uploadImage = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/images"),
  requestFormat: Schema.Literal("form-data"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type get_OverlaysController_getImage = __TypedOpenapi.Endpoints.get_OverlaysController_getImage;
export const get_OverlaysController_getImage = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/images/{name}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ name: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type delete_OverlaysController_deleteImage = __TypedOpenapi.Endpoints.delete_OverlaysController_deleteImage;
export const delete_OverlaysController_deleteImage = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/overlays/images/{name}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ name: Schema.String }) },
  responses: { 200: Schema.Unknown },
};

export type get_OverlaysController_listTemplates = __TypedOpenapi.Endpoints.get_OverlaysController_listTemplates;
export const get_OverlaysController_listTemplates = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/templates"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type post_OverlaysController_createTemplate = __TypedOpenapi.Endpoints.post_OverlaysController_createTemplate;
export const post_OverlaysController_createTemplate = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/templates"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type post_OverlaysController_importTemplate = __TypedOpenapi.Endpoints.post_OverlaysController_importTemplate;
export const post_OverlaysController_importTemplate = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/templates/import"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 201: Schema.Unknown },
};

export type get_OverlaysController_getTemplate = __TypedOpenapi.Endpoints.get_OverlaysController_getTemplate;
export const get_OverlaysController_getTemplate = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/overlays/templates/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type put_OverlaysController_updateTemplate = __TypedOpenapi.Endpoints.put_OverlaysController_updateTemplate;
export const put_OverlaysController_updateTemplate = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/overlays/templates/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }), body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 200: Schema.Unknown },
};

export type delete_OverlaysController_deleteTemplate = __TypedOpenapi.Endpoints.delete_OverlaysController_deleteTemplate;
export const delete_OverlaysController_deleteTemplate = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/overlays/templates/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 200: Schema.Unknown },
};

export type post_OverlaysController_duplicateTemplate = __TypedOpenapi.Endpoints.post_OverlaysController_duplicateTemplate;
export const post_OverlaysController_duplicateTemplate = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/templates/{id}/duplicate"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 201: Schema.Unknown },
};

export type post_OverlaysController_setDefaultTemplate = __TypedOpenapi.Endpoints.post_OverlaysController_setDefaultTemplate;
export const post_OverlaysController_setDefaultTemplate = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/templates/{id}/default"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 201: Schema.Unknown },
};

export type post_OverlaysController_exportTemplate = __TypedOpenapi.Endpoints.post_OverlaysController_exportTemplate;
export const post_OverlaysController_exportTemplate = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/templates/{id}/export"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 201: Schema.Unknown },
};

export type post_OverlaysController_previewTemplate = __TypedOpenapi.Endpoints.post_OverlaysController_previewTemplate;
export const post_OverlaysController_previewTemplate = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/overlays/templates/{id}/preview"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ plexId: Schema.String }), path: Schema.Struct({ id: Schema.NumberFromString }) },
  responses: { 201: Schema.Unknown },
};

export type get_StorageMetricsController_getMetrics = __TypedOpenapi.Endpoints.get_StorageMetricsController_getMetrics;
export const get_StorageMetricsController_getMetrics = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/storage-metrics"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get_StorageMetricsController_getLibrarySizes = __TypedOpenapi.Endpoints.get_StorageMetricsController_getLibrarySizes;
export const get_StorageMetricsController_getLibrarySizes = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/storage-metrics/library-sizes"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

// </Endpoints>

  
     // <EndpointByMethod>
     export const EndpointByMethod: __TypedOpenapi.EndpointByMethod = {
     get: {
           "/api/health": get_HealthController_health as any,
"/api/health/live": get_HealthController_live as any,
"/api/health/ready": get_HealthController_ready as any,
"/api/app/status": get_AppController_getAppStatus as any,
"/api/settings": get_SettingsController_getSettings as any,
"/api/settings/version": get_SettingsController_getVersion as any,
"/api/settings/api/generate": get_SettingsController_generateApiKey as any,
"/api/settings/test/setup": get_SettingsController_testSetup as any,
"/api/settings/test/overseerr": get_SettingsController_testOverseerr as any,
"/api/settings/test/radarr": get_SettingsController_testRadarr as any,
"/api/settings/test/sonarr": get_SettingsController_testSonarr as any,
"/api/settings/test/plex": get_SettingsController_testPlex as any,
"/api/settings/test/tautulli": get_SettingsController_testTautulli as any,
"/api/settings/tmdb": get_SettingsController_getTmdbSetting as any,
"/api/settings/tvdb": get_SettingsController_getTvdbSetting as any,
"/api/settings/metadata-provider": get_SettingsController_getMetadataProviderPreference as any,
"/api/settings/plex/devices/servers": get_SettingsController_getPlexServers as any,
"/api/settings/download-client": get_SettingsController_getDownloadClientSetting as any,
"/api/settings/emby": get_SettingsController_getEmbySetting as any,
"/api/settings/streamystats": get_SettingsController_getStreamystatsSetting as any,
"/api/streamystats/info": get_StreamystatsApiController_getInfo as any,
"/api/streamystats/items/{itemId}": get_StreamystatsApiController_getItemDetails as any,
"/api/media-server": get_MediaServerController_getStatus as any,
"/api/media-server/libraries": get_MediaServerController_getLibraries as any,
"/api/media-server/library/{id}/content": get_MediaServerController_getLibraryContent as any,
"/api/media-server/meta/{id}": get_MediaServerController_getMetadata as any,
"/api/media-server/meta/{id}/seen": get_MediaServerController_getWatchHistory as any,
"/api/media-server/users": get_MediaServerController_getUsers as any,
"/api/media-server/meta/{id}/children": get_MediaServerController_getChildrenMetadata as any,
"/api/media-server/library/{id}/recent": get_MediaServerController_getRecentlyAdded as any,
"/api/media-server/library/{id}/collections": get_MediaServerController_getCollections as any,
"/api/media-server/collection/{id}": get_MediaServerController_getCollection as any,
"/api/media-server/collection/{id}/children": get_MediaServerController_getCollectionChildren as any,
"/api/media-server/search/{query}": get_MediaServerController_searchContent as any,
"/api/overseerr/movie/{id}": get_OverseerrApiController_getMovie as any,
"/api/overseerr/show/{id}": get_OverseerrApiController_getShow as any,
"/api/moviedb/person/{personId}": get_TmdbApiController_getPerson as any,
"/api/moviedb/movie/imdb/{id}": get_TmdbApiController_getMovie as any,
"/api/moviedb/image/{type}/{tmdbId}": get_TmdbApiController_getImage as any,
"/api/rules/constants": get_RulesController_getRuleConstants as any,
"/api/rules/community": get_RulesController_getCommunityRules as any,
"/api/rules/community/karma/history": get_RulesController_getCommunityRuleKarmaHistory as any,
"/api/rules/exclusion": get_RulesController_getExclusion as any,
"/api/rules/{id}": get_RulesController_getRules as any,
"/api/rules/collection/{id}": get_RulesController_getRuleGroupByCollectionId as any,
"/api/rules": get_RulesController_getRuleGroups as any,
"/api/collections": get_CollectionsController_getCollections as any,
"/api/collections/deactivate/{id}": get_CollectionsController_deactivate as any,
"/api/collections/activate/{id}": get_CollectionsController_activate as any,
"/api/collections/collection/{id}": get_CollectionsController_getCollection as any,
"/api/collections/media": get_CollectionsController_getMediaInCollection as any,
"/api/collections/media/{id}/content/{page}": get_CollectionsController_getLibraryContent as any,
"/api/collections/exclusions/{id}/content/{page}": get_CollectionsController_getExclusions as any,
"/api/collections/logs/{id}/content/{page}": get_CollectionsController_getCollectionLogs as any,
"/api/collections/overlay-data": get_CollectionsController_getCollectionsForOverlayData as any,
"/api/metadata/backdrop/{type}": get_MetadataController_getBackdropImage as any,
"/api/metadata/image/{type}": get_MetadataController_getImage as any,
"/api/overlays/settings": get_OverlaysController_getSettings as any,
"/api/overlays/sections": get_OverlaysController_getSections as any,
"/api/overlays/random-item": get_OverlaysController_getRandomItem as any,
"/api/overlays/random-episode": get_OverlaysController_getRandomEpisode as any,
"/api/overlays/poster": get_OverlaysController_getPoster as any,
"/api/overlays/status": get_OverlaysController_getStatus as any,
"/api/overlays/fonts": get_OverlaysController_listFonts as any,
"/api/overlays/fonts/{name}": get_OverlaysController_getFont as any,
"/api/overlays/images": get_OverlaysController_listImages as any,
"/api/overlays/images/{name}": get_OverlaysController_getImage as any,
"/api/overlays/templates": get_OverlaysController_listTemplates as any,
"/api/overlays/templates/{id}": get_OverlaysController_getTemplate as any,
"/api/storage-metrics": get_StorageMetricsController_getMetrics as any,
"/api/storage-metrics/library-sizes": get_StorageMetricsController_getLibrarySizes as any
         },
post: {
           "/api/settings": post_SettingsController_updateSettings as any,
"/api/settings/plex/token": post_SettingsController_updateAuthToken as any,
"/api/settings/tmdb": post_SettingsController_updateTmdbSetting as any,
"/api/settings/test/tmdb": post_SettingsController_testTmdb as any,
"/api/settings/tvdb": post_SettingsController_updateTvdbSetting as any,
"/api/settings/test/tvdb": post_SettingsController_testTvdb as any,
"/api/settings/metadata-provider": post_SettingsController_updateMetadataProviderPreference as any,
"/api/settings/metadata/refresh/{provider}": post_SettingsController_refreshMetadataCache as any,
"/api/settings/download-client": post_SettingsController_updateDownloadClientSetting as any,
"/api/settings/test/download-client": post_SettingsController_testDownloadClient as any,
"/api/settings/emby": post_SettingsController_saveEmbySettings as any,
"/api/settings/emby/test": post_SettingsController_testEmby as any,
"/api/settings/emby/login": post_SettingsController_loginEmby as any,
"/api/settings/streamystats": post_SettingsController_updateStreamystatsSetting as any,
"/api/settings/test/streamystats": post_SettingsController_testStreamystats as any,
"/api/settings/cron/validate": post_SettingsController_validateSingleCron as any,
"/api/media-server/collection": post_MediaServerController_createCollection as any,
"/api/rules/community": post_RulesController_updateCommunityRules as any,
"/api/rules/exclusion": post_RulesController_setExclusion as any,
"/api/rules": post_RulesController_updateJob as any,
"/api/rules/execute": post_RulesController_executeRules as any,
"/api/rules/community/karma": post_RulesController_updateCommunityRuleKarma as any,
"/api/rules/yaml/encode": post_RulesController_yamlEncode as any,
"/api/rules/yaml/decode": post_RulesController_yamlDecode as any,
"/api/rules/test": post_RulesController_testRuleGroup as any,
"/api/collections": post_CollectionsController_createCollection as any,
"/api/collections/add": post_CollectionsController_addToCollection as any,
"/api/collections/remove": post_CollectionsController_removeFromCollection as any,
"/api/collections/removeCollection": post_CollectionsController_removeCollection as any,
"/api/collections/handle": post_CollectionsController_handleCollection as any,
"/api/collections/media/add": post_CollectionsController_ManualActionOnCollection as any,
"/api/collections/media/handle": post_CollectionsController_handleCollectionMedia as any,
"/api/overlays/process": post_OverlaysController_processAll as any,
"/api/overlays/process/{collectionId}": post_OverlaysController_processCollection as any,
"/api/overlays/revert/{collectionId}": post_OverlaysController_revertCollection as any,
"/api/overlays/fonts": post_OverlaysController_uploadFont as any,
"/api/overlays/images": post_OverlaysController_uploadImage as any,
"/api/overlays/templates": post_OverlaysController_createTemplate as any,
"/api/overlays/templates/import": post_OverlaysController_importTemplate as any,
"/api/overlays/templates/{id}/duplicate": post_OverlaysController_duplicateTemplate as any,
"/api/overlays/templates/{id}/default": post_OverlaysController_setDefaultTemplate as any,
"/api/overlays/templates/{id}/export": post_OverlaysController_exportTemplate as any,
"/api/overlays/templates/{id}/preview": post_OverlaysController_previewTemplate as any
         },
delete: {
           "/api/settings/plex/auth": delete_SettingsController_deletePlexApiAuth as any,
"/api/settings/tmdb": delete_SettingsController_removeTmdbSetting as any,
"/api/settings/tvdb": delete_SettingsController_removeTvdbSetting as any,
"/api/settings/download-client": delete_SettingsController_removeDownloadClientSetting as any,
"/api/settings/emby": delete_SettingsController_removeEmbySettings as any,
"/api/settings/streamystats": delete_SettingsController_removeStreamystatsSetting as any,
"/api/media-server/collection/{id}": delete_MediaServerController_deleteCollection as any,
"/api/media-server/collection/{collectionId}/item/{itemId}": delete_MediaServerController_removeFromCollection as any,
"/api/overseerr/request/{requestId}": delete_OverseerrApiController_deleteRequest as any,
"/api/overseerr/media/{mediaId}": delete_OverseerrApiController_deleteMedia as any,
"/api/overseerr/media/tmdb/{mediaId}": delete_OverseerrApiController_removeMediaByTmdbId as any,
"/api/rules/{id}": delete_RulesController_deleteRuleGroup as any,
"/api/rules/exclusion/{id}": delete_RulesController_removeExclusion as any,
"/api/rules/exclusions/{plexId}": delete_RulesController_removeAllExclusion as any,
"/api/collections/media": delete_CollectionsController_deleteMediaFromCollection as any,
"/api/overlays/reset": delete_OverlaysController_resetAll as any,
"/api/overlays/images/{name}": delete_OverlaysController_deleteImage as any,
"/api/overlays/templates/{id}": delete_OverlaysController_deleteTemplate as any
         },
put: {
           "/api/media-server/collection/{collectionId}/item/{itemId}": put_MediaServerController_addToCollection as any,
"/api/media-server/collection": put_MediaServerController_updateCollection as any,
"/api/media-server/collection/visibility": put_MediaServerController_updateCollectionVisibility as any,
"/api/rules/schedule/update": put_RulesController_updateSchedule as any,
"/api/rules": put_RulesController_updateRule as any,
"/api/collections": put_CollectionsController_updateCollection as any,
"/api/collections/schedule/update": put_CollectionsController_updateSchedule as any,
"/api/overlays/settings": put_OverlaysController_updateSettings as any,
"/api/overlays/templates/{id}": put_OverlaysController_updateTemplate as any
         }
     }
     export type EndpointByMethod = __TypedOpenapi.EndpointByMethod;
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type GetEndpoints = EndpointByMethod["get"]
export type PostEndpoints = EndpointByMethod["post"]
export type DeleteEndpoints = EndpointByMethod["delete"]
export type PutEndpoints = EndpointByMethod["put"]
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
    post: {
          "/api/overlays/fonts": "form-data",
"/api/overlays/images": "form-data"
        }
    } as Partial<{ [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: RequestFormat }> }>;
    // </EndpointRequestFormats>
    

    // <EndpointResponseFormats>
    /** Non-json response body modes; missing entries default to `"json"`. SSE skips JSON parse + output validation. */
    export const endpointResponseFormats = {
    
    } as Partial<{ [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: ResponseFormat }> }>;
    // </EndpointResponseFormats>
    

    // <EndpointSecurityRequirements>
    /** OpenAPI security requirements applied when an endpoint has no explicit entry. */
    export const defaultSecurityRequirements = [] as SecurityRequirements;
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
}

export function createEffectApiClient(
  fetcher: Fetcher | EffectFetcher,
  baseUrl?: string,
  options?: { validate?: ValidateSide; onValidate?: OnValidate; effectFetcher?: boolean },
) {
  return new EffectApiClient(fetcher, options).setBaseUrl(baseUrl ?? "");
}
// </EffectApiClient>

  