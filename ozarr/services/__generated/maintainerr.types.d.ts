
  export namespace Schemas {
    // <Schemas>
  export type LivenessResponse = { status: "ok", uptimeSeconds: number, timestamp: string }
export type HealthResponse = { status: ("ok" | "degraded"), uptimeSeconds: number, database: ("ok" | "unreachable"), timestamp: string }
export type SettingDto = Partial<{  }>
export type DownloadClientSetting = { download_client_url: string, download_client_username?: string, download_client_password?: string, download_client_delete_data: boolean, download_client_fallback_ratio: number }
export type EmbySetting = { emby_url: string, emby_api_key: string, emby_user_id?: string }
export type EmbyLoginRequest = { emby_url: string, username: string, password: string }
export type StreamystatsSetting = { url: string }
export type StreamystatsInfoResponse = { url: string, serverId: (number | null) }
export type StreamystatsUser = { id: string, name?: (string | null) }
export type StreamystatsItemUserStats = { user: StreamystatsUser, watchCount: number, totalWatchTime: number, completionRate: number, firstWatched: (string | null), lastWatched: (string | null) }
export type StreamystatsItemWatchHistory = { user: ((StreamystatsUser) | null), watchDate: string, watchDuration: number, completionPercentage: number, playMethod?: (string | null), deviceName?: (string | null), clientName?: (string | null) }
export type StreamystatsItemWatchCountByMonth = { month: number, year: number, watchCount: number, uniqueUsers: number, totalWatchTime: number }
export type StreamystatsSeriesEpisodeStats = { totalSeasons: number, totalEpisodes: number, watchedEpisodes: number, watchedSeasons: number }
export type StreamystatsItem = { id: string, name?: (string | null), type?: (string | null) }
export type StreamystatsItemDetails = { item: StreamystatsItem, totalViews: number, totalWatchTime: number, completionRate: number, firstWatched: (string | null), lastWatched: (string | null), usersWatched: Array<StreamystatsItemUserStats>, watchHistory: Array<StreamystatsItemWatchHistory>, watchCountByMonth: Array<StreamystatsItemWatchCountByMonth>, episodeStats?: ((StreamystatsSeriesEpisodeStats) | null) }
export type CronScheduleDto = Partial<{  }>
export type CollectionVisibilitySettings = Partial<{ libraryId: string, collectionId: string, ownHome: boolean, sharedHome: boolean, recommended: boolean }>
export type CreateCollectionParams = {
  libraryId: string;
  title: string;
  summary?: string;
  type: ("movie" | "show" | "season" | "episode");
  sortTitle?: string;
  /**
   * Optional id of a single media-server item to include when the collection is created.
   */
  initialItemId?: string;
}
export type RulesDto = Partial<{  }>
export type CommunityRule = Partial<{  }>

    // </Schemas>
    }
  
  export namespace Endpoints {
  // <Endpoints>
  
  export type get_HealthController_health = {
      method: "GET",
      path: "/api/health",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.HealthResponse,
503: Schemas.HealthResponse,
},
      
    }
export type get_HealthController_live = {
      method: "GET",
      path: "/api/health/live",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.LivenessResponse,
},
      
    }
export type get_HealthController_ready = {
      method: "GET",
      path: "/api/health/ready",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.HealthResponse,
503: Schemas.HealthResponse,
},
      
    }
export type get_AppController_getAppStatus = {
      method: "GET",
      path: "/api/app/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_getSettings = {
      method: "GET",
      path: "/api/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.SettingDto,
},
      
    }
export type post_SettingsController_updateSettings = {
      method: "POST",
      path: "/api/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.SettingDto,
          }
      responses: {201: unknown,
},
      
    }
export type get_SettingsController_getVersion = {
      method: "GET",
      path: "/api/settings/version",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_generateApiKey = {
      method: "GET",
      path: "/api/settings/api/generate",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type delete_SettingsController_deletePlexApiAuth = {
      method: "DELETE",
      path: "/api/settings/plex/auth",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_updateAuthToken = {
      method: "POST",
      path: "/api/settings/plex/token",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type get_SettingsController_testSetup = {
      method: "GET",
      path: "/api/settings/test/setup",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_testOverseerr = {
      method: "GET",
      path: "/api/settings/test/overseerr",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_testRadarr = {
      method: "GET",
      path: "/api/settings/test/radarr",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_testSonarr = {
      method: "GET",
      path: "/api/settings/test/sonarr",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_testPlex = {
      method: "GET",
      path: "/api/settings/test/plex",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_testTautulli = {
      method: "GET",
      path: "/api/settings/test/tautulli",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_getTmdbSetting = {
      method: "GET",
      path: "/api/settings/tmdb",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_updateTmdbSetting = {
      method: "POST",
      path: "/api/settings/tmdb",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type delete_SettingsController_removeTmdbSetting = {
      method: "DELETE",
      path: "/api/settings/tmdb",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_testTmdb = {
      method: "POST",
      path: "/api/settings/test/tmdb",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type get_SettingsController_getTvdbSetting = {
      method: "GET",
      path: "/api/settings/tvdb",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_updateTvdbSetting = {
      method: "POST",
      path: "/api/settings/tvdb",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type delete_SettingsController_removeTvdbSetting = {
      method: "DELETE",
      path: "/api/settings/tvdb",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_testTvdb = {
      method: "POST",
      path: "/api/settings/test/tvdb",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type get_SettingsController_getMetadataProviderPreference = {
      method: "GET",
      path: "/api/settings/metadata-provider",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_updateMetadataProviderPreference = {
      method: "POST",
      path: "/api/settings/metadata-provider",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type post_SettingsController_refreshMetadataCache = {
      method: "POST",
      path: "/api/settings/metadata/refresh/{provider}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { provider: string },
        
        
        
          }
      responses: {201: unknown,
},
      
    }
export type get_SettingsController_getPlexServers = {
      method: "GET",
      path: "/api/settings/plex/devices/servers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_SettingsController_getDownloadClientSetting = {
      method: "GET",
      path: "/api/settings/download-client",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.DownloadClientSetting,
},
      
    }
export type post_SettingsController_updateDownloadClientSetting = {
      method: "POST",
      path: "/api/settings/download-client",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DownloadClientSetting,
          }
      responses: {201: unknown,
},
      
    }
export type delete_SettingsController_removeDownloadClientSetting = {
      method: "DELETE",
      path: "/api/settings/download-client",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_testDownloadClient = {
      method: "POST",
      path: "/api/settings/test/download-client",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DownloadClientSetting,
          }
      responses: {201: unknown,
},
      
    }
export type get_SettingsController_getEmbySetting = {
      method: "GET",
      path: "/api/settings/emby",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_saveEmbySettings = {
      method: "POST",
      path: "/api/settings/emby",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.EmbySetting,
          }
      responses: {201: unknown,
},
      
    }
export type delete_SettingsController_removeEmbySettings = {
      method: "DELETE",
      path: "/api/settings/emby",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_testEmby = {
      method: "POST",
      path: "/api/settings/emby/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.EmbySetting,
          }
      responses: {201: unknown,
},
      
    }
export type post_SettingsController_loginEmby = {
      method: "POST",
      path: "/api/settings/emby/login",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.EmbyLoginRequest,
          }
      responses: {201: unknown,
},
      
    }
export type get_SettingsController_getStreamystatsSetting = {
      method: "GET",
      path: "/api/settings/streamystats",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_updateStreamystatsSetting = {
      method: "POST",
      path: "/api/settings/streamystats",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.StreamystatsSetting,
          }
      responses: {201: unknown,
},
      
    }
export type delete_SettingsController_removeStreamystatsSetting = {
      method: "DELETE",
      path: "/api/settings/streamystats",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_SettingsController_testStreamystats = {
      method: "POST",
      path: "/api/settings/test/streamystats",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.StreamystatsSetting,
          }
      responses: {201: unknown,
},
      
    }
export type post_SettingsController_validateSingleCron = {
      method: "POST",
      path: "/api/settings/cron/validate",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CronScheduleDto,
          }
      responses: {201: unknown,
},
      
    }
export type get_StreamystatsApiController_getInfo = {
      method: "GET",
      path: "/api/streamystats/info",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.StreamystatsInfoResponse,
},
      
    }
export type get_StreamystatsApiController_getItemDetails = {
      method: "GET",
      path: "/api/streamystats/items/{itemId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { itemId: string },
        
        
        
          }
      responses: {200: Schemas.StreamystatsItemDetails,
},
      
    }
export type get_MediaServerController_getStatus = {
      method: "GET",
      path: "/api/media-server",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getLibraries = {
      method: "GET",
      path: "/api/media-server/libraries",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getLibraryContent = {
      method: "GET",
      path: "/api/media-server/library/{id}/content",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ page: number, limit: number }>,
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getMetadata = {
      method: "GET",
      path: "/api/media-server/meta/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getWatchHistory = {
      method: "GET",
      path: "/api/media-server/meta/{id}/seen",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getUsers = {
      method: "GET",
      path: "/api/media-server/users",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getChildrenMetadata = {
      method: "GET",
      path: "/api/media-server/meta/{id}/children",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getRecentlyAdded = {
      method: "GET",
      path: "/api/media-server/library/{id}/recent",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getCollections = {
      method: "GET",
      path: "/api/media-server/library/{id}/collections",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getCollection = {
      method: "GET",
      path: "/api/media-server/collection/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type delete_MediaServerController_deleteCollection = {
      method: "DELETE",
      path: "/api/media-server/collection/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_getCollectionChildren = {
      method: "GET",
      path: "/api/media-server/collection/{id}/children",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MediaServerController_searchContent = {
      method: "GET",
      path: "/api/media-server/search/{query}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { query: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type put_MediaServerController_addToCollection = {
      method: "PUT",
      path: "/api/media-server/collection/{collectionId}/item/{itemId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { collectionId: string, itemId: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type delete_MediaServerController_removeFromCollection = {
      method: "DELETE",
      path: "/api/media-server/collection/{collectionId}/item/{itemId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { collectionId: string, itemId: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type put_MediaServerController_updateCollection = {
      method: "PUT",
      path: "/api/media-server/collection",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_MediaServerController_createCollection = {
      method: "POST",
      path: "/api/media-server/collection",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CreateCollectionParams,
          }
      responses: {201: unknown,
},
      
    }
export type put_MediaServerController_updateCollectionVisibility = {
      method: "PUT",
      path: "/api/media-server/collection/visibility",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CollectionVisibilitySettings,
          }
      responses: {200: unknown,
},
      
    }
export type get_OverseerrApiController_getMovie = {
      method: "GET",
      path: "/api/overseerr/movie/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_OverseerrApiController_getShow = {
      method: "GET",
      path: "/api/overseerr/show/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type delete_OverseerrApiController_deleteRequest = {
      method: "DELETE",
      path: "/api/overseerr/request/{requestId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { requestId: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type delete_OverseerrApiController_deleteMedia = {
      method: "DELETE",
      path: "/api/overseerr/media/{mediaId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { mediaId: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type delete_OverseerrApiController_removeMediaByTmdbId = {
      method: "DELETE",
      path: "/api/overseerr/media/tmdb/{mediaId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { mediaId: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_TmdbApiController_getPerson = {
      method: "GET",
      path: "/api/moviedb/person/{personId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { personId: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_TmdbApiController_getMovie = {
      method: "GET",
      path: "/api/moviedb/movie/imdb/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_TmdbApiController_getImage = {
      method: "GET",
      path: "/api/moviedb/image/{type}/{tmdbId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { tmdbId: number, type: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_RulesController_getRuleConstants = {
      method: "GET",
      path: "/api/rules/constants",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type put_RulesController_updateSchedule = {
      method: "PUT",
      path: "/api/rules/schedule/update",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_RulesController_getCommunityRules = {
      method: "GET",
      path: "/api/rules/community",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_RulesController_updateCommunityRules = {
      method: "POST",
      path: "/api/rules/community",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CommunityRule,
          }
      responses: {201: unknown,
},
      
    }
export type get_RulesController_getCommunityRuleKarmaHistory = {
      method: "GET",
      path: "/api/rules/community/karma/history",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_RulesController_getExclusion = {
      method: "GET",
      path: "/api/rules/exclusion",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_RulesController_setExclusion = {
      method: "POST",
      path: "/api/rules/exclusion",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type get_RulesController_getRules = {
      method: "GET",
      path: "/api/rules/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type delete_RulesController_deleteRuleGroup = {
      method: "DELETE",
      path: "/api/rules/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_RulesController_getRuleGroupByCollectionId = {
      method: "GET",
      path: "/api/rules/collection/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_RulesController_getRuleGroups = {
      method: "GET",
      path: "/api/rules",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_RulesController_updateJob = {
      method: "POST",
      path: "/api/rules",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type put_RulesController_updateRule = {
      method: "PUT",
      path: "/api/rules",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.RulesDto,
          }
      responses: {200: unknown,
},
      
    }
export type post_RulesController_executeRules = {
      method: "POST",
      path: "/api/rules/execute",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type delete_RulesController_removeExclusion = {
      method: "DELETE",
      path: "/api/rules/exclusion/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type delete_RulesController_removeAllExclusion = {
      method: "DELETE",
      path: "/api/rules/exclusions/{plexId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { plexId: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type post_RulesController_updateCommunityRuleKarma = {
      method: "POST",
      path: "/api/rules/community/karma",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type post_RulesController_yamlEncode = {
      method: "POST",
      path: "/api/rules/yaml/encode",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type post_RulesController_yamlDecode = {
      method: "POST",
      path: "/api/rules/yaml/decode",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type post_RulesController_testRuleGroup = {
      method: "POST",
      path: "/api/rules/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type post_CollectionsController_createCollection = {
      method: "POST",
      path: "/api/collections",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type put_CollectionsController_updateCollection = {
      method: "PUT",
      path: "/api/collections",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_CollectionsController_getCollections = {
      method: "GET",
      path: "/api/collections",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { libraryId: number, typeId: number },
        
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type post_CollectionsController_addToCollection = {
      method: "POST",
      path: "/api/collections/add",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type post_CollectionsController_removeFromCollection = {
      method: "POST",
      path: "/api/collections/remove",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type post_CollectionsController_removeCollection = {
      method: "POST",
      path: "/api/collections/removeCollection",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type post_CollectionsController_handleCollection = {
      method: "POST",
      path: "/api/collections/handle",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type put_CollectionsController_updateSchedule = {
      method: "PUT",
      path: "/api/collections/schedule/update",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_CollectionsController_deactivate = {
      method: "GET",
      path: "/api/collections/deactivate/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_CollectionsController_activate = {
      method: "GET",
      path: "/api/collections/activate/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_CollectionsController_getCollection = {
      method: "GET",
      path: "/api/collections/collection/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type post_CollectionsController_ManualActionOnCollection = {
      method: "POST",
      path: "/api/collections/media/add",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {201: unknown,
},
      
    }
export type delete_CollectionsController_deleteMediaFromCollection = {
      method: "DELETE",
      path: "/api/collections/media",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { mediaId: number, collectionId: number },
        
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_CollectionsController_getMediaInCollection = {
      method: "GET",
      path: "/api/collections/media",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { collectionId: number },
        
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type post_CollectionsController_handleCollectionMedia = {
      method: "POST",
      path: "/api/collections/media/handle",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type get_CollectionsController_getLibraryContent = {
      method: "GET",
      path: "/api/collections/media/{id}/content/{page}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { size: number },
        path:  { id: number, page: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_CollectionsController_getExclusions = {
      method: "GET",
      path: "/api/collections/exclusions/{id}/content/{page}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { size: number },
        path:  { id: number, page: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_CollectionsController_getCollectionLogs = {
      method: "GET",
      path: "/api/collections/logs/{id}/content/{page}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { size: number, search: string, sort: string, filter: number },
        path:  { id: number, page: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_CollectionsController_getCollectionsForOverlayData = {
      method: "GET",
      path: "/api/collections/overlay-data",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ libraryId: string, typeId: string }>,
        
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MetadataController_getBackdropImage = {
      method: "GET",
      path: "/api/metadata/backdrop/{type}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ itemId: string, tmdbId: number, tvdbId: number, imdbId: string }>,
        path:  { type: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_MetadataController_getImage = {
      method: "GET",
      path: "/api/metadata/image/{type}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ itemId: string, tmdbId: number, tvdbId: number, imdbId: string }>,
        path:  { type: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_OverlaysController_getSettings = {
      method: "GET",
      path: "/api/overlays/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type put_OverlaysController_updateSettings = {
      method: "PUT",
      path: "/api/overlays/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {200: unknown,
},
      
    }
export type get_OverlaysController_getSections = {
      method: "GET",
      path: "/api/overlays/sections",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_OverlaysController_getRandomItem = {
      method: "GET",
      path: "/api/overlays/random-item",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { sectionId: string },
        
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_OverlaysController_getRandomEpisode = {
      method: "GET",
      path: "/api/overlays/random-episode",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { sectionId: string },
        
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_OverlaysController_getPoster = {
      method: "GET",
      path: "/api/overlays/poster",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { plexId: string },
        
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_OverlaysController_getStatus = {
      method: "GET",
      path: "/api/overlays/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_OverlaysController_processAll = {
      method: "POST",
      path: "/api/overlays/process",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body?:  Partial<{
  /**
   * Force a reapply pass even when overlay state already matches the current day count.
   */
  force: boolean;
}>,
          }
      responses: {201: unknown,
409: unknown,
},
      
    }
export type post_OverlaysController_processCollection = {
      method: "POST",
      path: "/api/overlays/process/{collectionId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { collectionId: number },
        
        
        
          }
      responses: {201: unknown,
},
      
    }
export type post_OverlaysController_revertCollection = {
      method: "POST",
      path: "/api/overlays/revert/{collectionId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { collectionId: number },
        
        
        
          }
      responses: {201: unknown,
},
      
    }
export type delete_OverlaysController_resetAll = {
      method: "DELETE",
      path: "/api/overlays/reset",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
409: unknown,
},
      
    }
export type get_OverlaysController_listFonts = {
      method: "GET",
      path: "/api/overlays/fonts",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_OverlaysController_uploadFont = {
      method: "POST",
      path: "/api/overlays/fonts",
      requestFormat: "form-data",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type get_OverlaysController_getFont = {
      method: "GET",
      path: "/api/overlays/fonts/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { name: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_OverlaysController_listImages = {
      method: "GET",
      path: "/api/overlays/images",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_OverlaysController_uploadImage = {
      method: "POST",
      path: "/api/overlays/images",
      requestFormat: "form-data",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type get_OverlaysController_getImage = {
      method: "GET",
      path: "/api/overlays/images/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { name: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type delete_OverlaysController_deleteImage = {
      method: "DELETE",
      path: "/api/overlays/images/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { name: string },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get_OverlaysController_listTemplates = {
      method: "GET",
      path: "/api/overlays/templates",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post_OverlaysController_createTemplate = {
      method: "POST",
      path: "/api/overlays/templates",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type post_OverlaysController_importTemplate = {
      method: "POST",
      path: "/api/overlays/templates/import",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Record<string, unknown>,
          }
      responses: {201: unknown,
},
      
    }
export type get_OverlaysController_getTemplate = {
      method: "GET",
      path: "/api/overlays/templates/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type put_OverlaysController_updateTemplate = {
      method: "PUT",
      path: "/api/overlays/templates/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        body:  Record<string, unknown>,
          }
      responses: {200: unknown,
},
      
    }
export type delete_OverlaysController_deleteTemplate = {
      method: "DELETE",
      path: "/api/overlays/templates/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type post_OverlaysController_duplicateTemplate = {
      method: "POST",
      path: "/api/overlays/templates/{id}/duplicate",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {201: unknown,
},
      
    }
export type post_OverlaysController_setDefaultTemplate = {
      method: "POST",
      path: "/api/overlays/templates/{id}/default",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {201: unknown,
},
      
    }
export type post_OverlaysController_exportTemplate = {
      method: "POST",
      path: "/api/overlays/templates/{id}/export",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {201: unknown,
},
      
    }
export type post_OverlaysController_previewTemplate = {
      method: "POST",
      path: "/api/overlays/templates/{id}/preview",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { plexId: string },
        path:  { id: number },
        
        
        
          }
      responses: {201: unknown,
},
      
    }
export type get_StorageMetricsController_getMetrics = {
      method: "GET",
      path: "/api/storage-metrics",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type get_StorageMetricsController_getLibrarySizes = {
      method: "GET",
      path: "/api/storage-metrics/library-sizes",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }

  // </Endpoints>
  }
  
  
     // <EndpointByMethod>
     export type EndpointByMethod = {
     get: {
           "/api/health": Endpoints.get_HealthController_health,
"/api/health/live": Endpoints.get_HealthController_live,
"/api/health/ready": Endpoints.get_HealthController_ready,
"/api/app/status": Endpoints.get_AppController_getAppStatus,
"/api/settings": Endpoints.get_SettingsController_getSettings,
"/api/settings/version": Endpoints.get_SettingsController_getVersion,
"/api/settings/api/generate": Endpoints.get_SettingsController_generateApiKey,
"/api/settings/test/setup": Endpoints.get_SettingsController_testSetup,
"/api/settings/test/overseerr": Endpoints.get_SettingsController_testOverseerr,
"/api/settings/test/radarr": Endpoints.get_SettingsController_testRadarr,
"/api/settings/test/sonarr": Endpoints.get_SettingsController_testSonarr,
"/api/settings/test/plex": Endpoints.get_SettingsController_testPlex,
"/api/settings/test/tautulli": Endpoints.get_SettingsController_testTautulli,
"/api/settings/tmdb": Endpoints.get_SettingsController_getTmdbSetting,
"/api/settings/tvdb": Endpoints.get_SettingsController_getTvdbSetting,
"/api/settings/metadata-provider": Endpoints.get_SettingsController_getMetadataProviderPreference,
"/api/settings/plex/devices/servers": Endpoints.get_SettingsController_getPlexServers,
"/api/settings/download-client": Endpoints.get_SettingsController_getDownloadClientSetting,
"/api/settings/emby": Endpoints.get_SettingsController_getEmbySetting,
"/api/settings/streamystats": Endpoints.get_SettingsController_getStreamystatsSetting,
"/api/streamystats/info": Endpoints.get_StreamystatsApiController_getInfo,
"/api/streamystats/items/{itemId}": Endpoints.get_StreamystatsApiController_getItemDetails,
"/api/media-server": Endpoints.get_MediaServerController_getStatus,
"/api/media-server/libraries": Endpoints.get_MediaServerController_getLibraries,
"/api/media-server/library/{id}/content": Endpoints.get_MediaServerController_getLibraryContent,
"/api/media-server/meta/{id}": Endpoints.get_MediaServerController_getMetadata,
"/api/media-server/meta/{id}/seen": Endpoints.get_MediaServerController_getWatchHistory,
"/api/media-server/users": Endpoints.get_MediaServerController_getUsers,
"/api/media-server/meta/{id}/children": Endpoints.get_MediaServerController_getChildrenMetadata,
"/api/media-server/library/{id}/recent": Endpoints.get_MediaServerController_getRecentlyAdded,
"/api/media-server/library/{id}/collections": Endpoints.get_MediaServerController_getCollections,
"/api/media-server/collection/{id}": Endpoints.get_MediaServerController_getCollection,
"/api/media-server/collection/{id}/children": Endpoints.get_MediaServerController_getCollectionChildren,
"/api/media-server/search/{query}": Endpoints.get_MediaServerController_searchContent,
"/api/overseerr/movie/{id}": Endpoints.get_OverseerrApiController_getMovie,
"/api/overseerr/show/{id}": Endpoints.get_OverseerrApiController_getShow,
"/api/moviedb/person/{personId}": Endpoints.get_TmdbApiController_getPerson,
"/api/moviedb/movie/imdb/{id}": Endpoints.get_TmdbApiController_getMovie,
"/api/moviedb/image/{type}/{tmdbId}": Endpoints.get_TmdbApiController_getImage,
"/api/rules/constants": Endpoints.get_RulesController_getRuleConstants,
"/api/rules/community": Endpoints.get_RulesController_getCommunityRules,
"/api/rules/community/karma/history": Endpoints.get_RulesController_getCommunityRuleKarmaHistory,
"/api/rules/exclusion": Endpoints.get_RulesController_getExclusion,
"/api/rules/{id}": Endpoints.get_RulesController_getRules,
"/api/rules/collection/{id}": Endpoints.get_RulesController_getRuleGroupByCollectionId,
"/api/rules": Endpoints.get_RulesController_getRuleGroups,
"/api/collections": Endpoints.get_CollectionsController_getCollections,
"/api/collections/deactivate/{id}": Endpoints.get_CollectionsController_deactivate,
"/api/collections/activate/{id}": Endpoints.get_CollectionsController_activate,
"/api/collections/collection/{id}": Endpoints.get_CollectionsController_getCollection,
"/api/collections/media": Endpoints.get_CollectionsController_getMediaInCollection,
"/api/collections/media/{id}/content/{page}": Endpoints.get_CollectionsController_getLibraryContent,
"/api/collections/exclusions/{id}/content/{page}": Endpoints.get_CollectionsController_getExclusions,
"/api/collections/logs/{id}/content/{page}": Endpoints.get_CollectionsController_getCollectionLogs,
"/api/collections/overlay-data": Endpoints.get_CollectionsController_getCollectionsForOverlayData,
"/api/metadata/backdrop/{type}": Endpoints.get_MetadataController_getBackdropImage,
"/api/metadata/image/{type}": Endpoints.get_MetadataController_getImage,
"/api/overlays/settings": Endpoints.get_OverlaysController_getSettings,
"/api/overlays/sections": Endpoints.get_OverlaysController_getSections,
"/api/overlays/random-item": Endpoints.get_OverlaysController_getRandomItem,
"/api/overlays/random-episode": Endpoints.get_OverlaysController_getRandomEpisode,
"/api/overlays/poster": Endpoints.get_OverlaysController_getPoster,
"/api/overlays/status": Endpoints.get_OverlaysController_getStatus,
"/api/overlays/fonts": Endpoints.get_OverlaysController_listFonts,
"/api/overlays/fonts/{name}": Endpoints.get_OverlaysController_getFont,
"/api/overlays/images": Endpoints.get_OverlaysController_listImages,
"/api/overlays/images/{name}": Endpoints.get_OverlaysController_getImage,
"/api/overlays/templates": Endpoints.get_OverlaysController_listTemplates,
"/api/overlays/templates/{id}": Endpoints.get_OverlaysController_getTemplate,
"/api/storage-metrics": Endpoints.get_StorageMetricsController_getMetrics,
"/api/storage-metrics/library-sizes": Endpoints.get_StorageMetricsController_getLibrarySizes
         },
post: {
           "/api/settings": Endpoints.post_SettingsController_updateSettings,
"/api/settings/plex/token": Endpoints.post_SettingsController_updateAuthToken,
"/api/settings/tmdb": Endpoints.post_SettingsController_updateTmdbSetting,
"/api/settings/test/tmdb": Endpoints.post_SettingsController_testTmdb,
"/api/settings/tvdb": Endpoints.post_SettingsController_updateTvdbSetting,
"/api/settings/test/tvdb": Endpoints.post_SettingsController_testTvdb,
"/api/settings/metadata-provider": Endpoints.post_SettingsController_updateMetadataProviderPreference,
"/api/settings/metadata/refresh/{provider}": Endpoints.post_SettingsController_refreshMetadataCache,
"/api/settings/download-client": Endpoints.post_SettingsController_updateDownloadClientSetting,
"/api/settings/test/download-client": Endpoints.post_SettingsController_testDownloadClient,
"/api/settings/emby": Endpoints.post_SettingsController_saveEmbySettings,
"/api/settings/emby/test": Endpoints.post_SettingsController_testEmby,
"/api/settings/emby/login": Endpoints.post_SettingsController_loginEmby,
"/api/settings/streamystats": Endpoints.post_SettingsController_updateStreamystatsSetting,
"/api/settings/test/streamystats": Endpoints.post_SettingsController_testStreamystats,
"/api/settings/cron/validate": Endpoints.post_SettingsController_validateSingleCron,
"/api/media-server/collection": Endpoints.post_MediaServerController_createCollection,
"/api/rules/community": Endpoints.post_RulesController_updateCommunityRules,
"/api/rules/exclusion": Endpoints.post_RulesController_setExclusion,
"/api/rules": Endpoints.post_RulesController_updateJob,
"/api/rules/execute": Endpoints.post_RulesController_executeRules,
"/api/rules/community/karma": Endpoints.post_RulesController_updateCommunityRuleKarma,
"/api/rules/yaml/encode": Endpoints.post_RulesController_yamlEncode,
"/api/rules/yaml/decode": Endpoints.post_RulesController_yamlDecode,
"/api/rules/test": Endpoints.post_RulesController_testRuleGroup,
"/api/collections": Endpoints.post_CollectionsController_createCollection,
"/api/collections/add": Endpoints.post_CollectionsController_addToCollection,
"/api/collections/remove": Endpoints.post_CollectionsController_removeFromCollection,
"/api/collections/removeCollection": Endpoints.post_CollectionsController_removeCollection,
"/api/collections/handle": Endpoints.post_CollectionsController_handleCollection,
"/api/collections/media/add": Endpoints.post_CollectionsController_ManualActionOnCollection,
"/api/collections/media/handle": Endpoints.post_CollectionsController_handleCollectionMedia,
"/api/overlays/process": Endpoints.post_OverlaysController_processAll,
"/api/overlays/process/{collectionId}": Endpoints.post_OverlaysController_processCollection,
"/api/overlays/revert/{collectionId}": Endpoints.post_OverlaysController_revertCollection,
"/api/overlays/fonts": Endpoints.post_OverlaysController_uploadFont,
"/api/overlays/images": Endpoints.post_OverlaysController_uploadImage,
"/api/overlays/templates": Endpoints.post_OverlaysController_createTemplate,
"/api/overlays/templates/import": Endpoints.post_OverlaysController_importTemplate,
"/api/overlays/templates/{id}/duplicate": Endpoints.post_OverlaysController_duplicateTemplate,
"/api/overlays/templates/{id}/default": Endpoints.post_OverlaysController_setDefaultTemplate,
"/api/overlays/templates/{id}/export": Endpoints.post_OverlaysController_exportTemplate,
"/api/overlays/templates/{id}/preview": Endpoints.post_OverlaysController_previewTemplate
         },
delete: {
           "/api/settings/plex/auth": Endpoints.delete_SettingsController_deletePlexApiAuth,
"/api/settings/tmdb": Endpoints.delete_SettingsController_removeTmdbSetting,
"/api/settings/tvdb": Endpoints.delete_SettingsController_removeTvdbSetting,
"/api/settings/download-client": Endpoints.delete_SettingsController_removeDownloadClientSetting,
"/api/settings/emby": Endpoints.delete_SettingsController_removeEmbySettings,
"/api/settings/streamystats": Endpoints.delete_SettingsController_removeStreamystatsSetting,
"/api/media-server/collection/{id}": Endpoints.delete_MediaServerController_deleteCollection,
"/api/media-server/collection/{collectionId}/item/{itemId}": Endpoints.delete_MediaServerController_removeFromCollection,
"/api/overseerr/request/{requestId}": Endpoints.delete_OverseerrApiController_deleteRequest,
"/api/overseerr/media/{mediaId}": Endpoints.delete_OverseerrApiController_deleteMedia,
"/api/overseerr/media/tmdb/{mediaId}": Endpoints.delete_OverseerrApiController_removeMediaByTmdbId,
"/api/rules/{id}": Endpoints.delete_RulesController_deleteRuleGroup,
"/api/rules/exclusion/{id}": Endpoints.delete_RulesController_removeExclusion,
"/api/rules/exclusions/{plexId}": Endpoints.delete_RulesController_removeAllExclusion,
"/api/collections/media": Endpoints.delete_CollectionsController_deleteMediaFromCollection,
"/api/overlays/reset": Endpoints.delete_OverlaysController_resetAll,
"/api/overlays/images/{name}": Endpoints.delete_OverlaysController_deleteImage,
"/api/overlays/templates/{id}": Endpoints.delete_OverlaysController_deleteTemplate
         },
put: {
           "/api/media-server/collection/{collectionId}/item/{itemId}": Endpoints.put_MediaServerController_addToCollection,
"/api/media-server/collection": Endpoints.put_MediaServerController_updateCollection,
"/api/media-server/collection/visibility": Endpoints.put_MediaServerController_updateCollectionVisibility,
"/api/rules/schedule/update": Endpoints.put_RulesController_updateSchedule,
"/api/rules": Endpoints.put_RulesController_updateRule,
"/api/collections": Endpoints.put_CollectionsController_updateCollection,
"/api/collections/schedule/update": Endpoints.put_CollectionsController_updateSchedule,
"/api/overlays/settings": Endpoints.put_OverlaysController_updateSettings,
"/api/overlays/templates/{id}": Endpoints.put_OverlaysController_updateTemplate
         }
     }
     
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type GetEndpoints = EndpointByMethod["get"]
export type PostEndpoints = EndpointByMethod["post"]
export type DeleteEndpoints = EndpointByMethod["delete"]
export type PutEndpoints = EndpointByMethod["put"]
    // </EndpointByMethod.Shorthands>
    