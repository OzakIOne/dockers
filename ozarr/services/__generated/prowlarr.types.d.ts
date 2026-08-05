
  export namespace Schemas {
    // <Schemas>
  export type ApplyTags = ("add" | "remove" | "replace")
export type ApplicationSyncLevel = ("disabled" | "addOnly" | "fullSync")
export type ApplicationBulkResource = Partial<{ ids: (Array<number> | null), tags: (Array<number> | null), applyTags: ApplyTags, syncLevel: ApplicationSyncLevel }>
export type SelectOption = Partial<{ value: number, name: (string | null), order: number, hint: (string | null), parentValue: (number | null) }>
export type PrivacyLevel = ("normal" | "password" | "apiKey" | "userName")
export type Field = Partial<{ order: number, name: (string | null), label: (string | null), unit: (string | null), helpText: (string | null), helpTextWarning: (string | null), helpLink: (string | null), value: null, type: (string | null), advanced: boolean, selectOptions: (Array<SelectOption> | null), selectOptionsProviderAction: (string | null), section: (string | null), hidden: (string | null), privacy: PrivacyLevel, placeholder: (string | null), isFloat: boolean }>
export type ProviderMessageType = ("info" | "warning" | "error")
export type ProviderMessage = Partial<{ message: (string | null), type: ProviderMessageType }>
export type ApplicationResource = Partial<{ id: number, name: (string | null), fields: (Array<Field> | null), implementationName: (string | null), implementation: (string | null), configContract: (string | null), infoLink: (string | null), message: ProviderMessage, tags: (Array<number> | null), presets: (ApplicationResourceArray | null), syncLevel: ApplicationSyncLevel, testCommand: (string | null) }>
export interface ApplicationResourceArray extends Array<ApplicationResource> {}
export type BookSearchParam = ("q" | "title" | "author" | "publisher" | "genre" | "year")
export type DownloadClientBulkResource = Partial<{ ids: (Array<number> | null), tags: (Array<number> | null), applyTags: ApplyTags, enable: (boolean | null), priority: (number | null) }>
export type DownloadClientCategory = Partial<{ clientCategory: (string | null), categories: (Array<number> | null) }>
export type DownloadProtocol = ("unknown" | "usenet" | "torrent")
export type DownloadClientResource = Partial<{ id: number, name: (string | null), fields: (Array<Field> | null), implementationName: (string | null), implementation: (string | null), configContract: (string | null), infoLink: (string | null), message: ProviderMessage, tags: (Array<number> | null), presets: (DownloadClientResourceArray | null), enable: boolean, protocol: DownloadProtocol, priority: number, categories: (Array<DownloadClientCategory> | null), supportsCategories: boolean }>
export interface DownloadClientResourceArray extends Array<DownloadClientResource> {}
export type IndexerBulkResource = Partial<{ ids: (Array<number> | null), tags: (Array<number> | null), applyTags: ApplyTags, enable: (boolean | null), appProfileId: (number | null), priority: (number | null), minimumSeeders: (number | null), seedRatio: (number | null), seedTime: (number | null), packSeedTime: (number | null), preferMagnetUrl: (boolean | null) }>
export type IndexerCategory = Partial<{ id: number, name: (string | null), description: (string | null), subCategories: (IndexerCategoryArray | null) }>
export interface IndexerCategoryArray extends Array<IndexerCategory> {}
export type SearchParam = "q"
export type TvSearchParam = ("q" | "season" | "ep" | "imdbId" | "tvdbId" | "rId" | "tvMazeId" | "traktId" | "tmdbId" | "doubanId" | "genre" | "year")
export type MovieSearchParam = ("q" | "imdbId" | "tmdbId" | "imdbTitle" | "imdbYear" | "traktId" | "genre" | "doubanId" | "year")
export type MusicSearchParam = ("q" | "album" | "artist" | "label" | "year" | "genre" | "track")
export type IndexerCapabilityResource = Partial<{ id: number, limitsMax: (number | null), limitsDefault: (number | null), categories: (Array<IndexerCategory> | null), supportsRawSearch: boolean, searchParams: (Array<SearchParam> | null), tvSearchParams: (Array<TvSearchParam> | null), movieSearchParams: (Array<MovieSearchParam> | null), musicSearchParams: (Array<MusicSearchParam> | null), bookSearchParams: (Array<BookSearchParam> | null) }>
export type IndexerPrivacy = ("public" | "semiPrivate" | "private")
export type IndexerStatusResource = Partial<{ id: number, indexerId: number, disabledTill: (string | null), mostRecentFailure: (string | null), initialFailure: (string | null) }>
export type IndexerResource = Partial<{ id: number, name: (string | null), fields: (Array<Field> | null), implementationName: (string | null), implementation: (string | null), configContract: (string | null), infoLink: (string | null), message: ProviderMessage, tags: (Array<number> | null), presets: (IndexerResourceArray | null), indexerUrls: (Array<string> | null), legacyUrls: (Array<string> | null), definitionName: (string | null), description: (string | null), language: (string | null), encoding: (string | null), enable: boolean, redirect: boolean, supportsRss: boolean, supportsSearch: boolean, supportsRedirect: boolean, supportsPagination: boolean, appProfileId: number, protocol: DownloadProtocol, privacy: IndexerPrivacy, capabilities: IndexerCapabilityResource, priority: number, downloadClientId: number, added: string, status: IndexerStatusResource, sortName: (string | null) }>
export interface IndexerResourceArray extends Array<IndexerResource> {}

    // </Schemas>
    }
  
  export namespace Endpoints {
  // <Endpoints>
  
  export type get__api_v1_applications_Id = {
      method: "GET",
      path: "/api/v1/applications/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.ApplicationResource,
},
      
    }
export type put__api_v1_applications_Id = {
      method: "PUT",
      path: "/api/v1/applications/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceSave: boolean }>,
        path:  { id: string },
        
        
        body:  Schemas.ApplicationResource,
          }
      responses: {200: Schemas.ApplicationResource,
},
      
    }
export type delete__api_v1_applications_Id = {
      method: "DELETE",
      path: "/api/v1/applications/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_applications = {
      method: "GET",
      path: "/api/v1/applications",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.ApplicationResource>,
},
      
    }
export type post__api_v1_applications = {
      method: "POST",
      path: "/api/v1/applications",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceSave: boolean }>,
        
        
        
        body:  Schemas.ApplicationResource,
          }
      responses: {200: Schemas.ApplicationResource,
},
      
    }
export type put__api_v1_applications_bulk = {
      method: "PUT",
      path: "/api/v1/applications/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.ApplicationBulkResource,
          }
      responses: {200: Schemas.ApplicationResource,
},
      
    }
export type delete__api_v1_applications_bulk = {
      method: "DELETE",
      path: "/api/v1/applications/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.ApplicationBulkResource,
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_applications_schema = {
      method: "GET",
      path: "/api/v1/applications/schema",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.ApplicationResource>,
},
      
    }
export type post__api_v1_applications_test = {
      method: "POST",
      path: "/api/v1/applications/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceTest: boolean }>,
        
        
        
        body:  Schemas.ApplicationResource,
          }
      responses: {200: unknown,
},
      
    }
export type post__api_v1_applications_testall = {
      method: "POST",
      path: "/api/v1/applications/testall",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post__api_v1_applications_action_Name = {
      method: "POST",
      path: "/api/v1/applications/action/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { name: string },
        
        
        body:  Schemas.ApplicationResource,
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_downloadclient_Id = {
      method: "GET",
      path: "/api/v1/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.DownloadClientResource,
},
      
    }
export type put__api_v1_downloadclient_Id = {
      method: "PUT",
      path: "/api/v1/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceSave: boolean }>,
        path:  { id: string },
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {200: Schemas.DownloadClientResource,
},
      
    }
export type delete__api_v1_downloadclient_Id = {
      method: "DELETE",
      path: "/api/v1/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_downloadclient = {
      method: "GET",
      path: "/api/v1/downloadclient",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.DownloadClientResource>,
},
      
    }
export type post__api_v1_downloadclient = {
      method: "POST",
      path: "/api/v1/downloadclient",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceSave: boolean }>,
        
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {200: Schemas.DownloadClientResource,
},
      
    }
export type put__api_v1_downloadclient_bulk = {
      method: "PUT",
      path: "/api/v1/downloadclient/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DownloadClientBulkResource,
          }
      responses: {200: Schemas.DownloadClientResource,
},
      
    }
export type delete__api_v1_downloadclient_bulk = {
      method: "DELETE",
      path: "/api/v1/downloadclient/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DownloadClientBulkResource,
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_downloadclient_schema = {
      method: "GET",
      path: "/api/v1/downloadclient/schema",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.DownloadClientResource>,
},
      
    }
export type post__api_v1_downloadclient_test = {
      method: "POST",
      path: "/api/v1/downloadclient/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceTest: boolean }>,
        
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {200: unknown,
},
      
    }
export type post__api_v1_downloadclient_testall = {
      method: "POST",
      path: "/api/v1/downloadclient/testall",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post__api_v1_downloadclient_action_Name = {
      method: "POST",
      path: "/api/v1/downloadclient/action/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { name: string },
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_indexer_Id = {
      method: "GET",
      path: "/api/v1/indexer/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.IndexerResource,
},
      
    }
export type put__api_v1_indexer_Id = {
      method: "PUT",
      path: "/api/v1/indexer/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceSave: boolean }>,
        path:  { id: string },
        
        
        body:  Schemas.IndexerResource,
          }
      responses: {200: Schemas.IndexerResource,
},
      
    }
export type delete__api_v1_indexer_Id = {
      method: "DELETE",
      path: "/api/v1/indexer/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_indexer = {
      method: "GET",
      path: "/api/v1/indexer",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.IndexerResource>,
},
      
    }
export type post__api_v1_indexer = {
      method: "POST",
      path: "/api/v1/indexer",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceSave: boolean }>,
        
        
        
        body:  Schemas.IndexerResource,
          }
      responses: {200: Schemas.IndexerResource,
},
      
    }
export type put__api_v1_indexer_bulk = {
      method: "PUT",
      path: "/api/v1/indexer/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.IndexerBulkResource,
          }
      responses: {200: Schemas.IndexerResource,
},
      
    }
export type delete__api_v1_indexer_bulk = {
      method: "DELETE",
      path: "/api/v1/indexer/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.IndexerBulkResource,
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_indexer_schema = {
      method: "GET",
      path: "/api/v1/indexer/schema",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.IndexerResource>,
},
      
    }
export type post__api_v1_indexer_test = {
      method: "POST",
      path: "/api/v1/indexer/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceTest: boolean }>,
        
        
        
        body:  Schemas.IndexerResource,
          }
      responses: {200: unknown,
},
      
    }
export type post__api_v1_indexer_testall = {
      method: "POST",
      path: "/api/v1/indexer/testall",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post__api_v1_indexer_action_Name = {
      method: "POST",
      path: "/api/v1/indexer/action/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { name: string },
        
        
        body:  Schemas.IndexerResource,
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_indexer_categories = {
      method: "GET",
      path: "/api/v1/indexer/categories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.IndexerCategory>,
},
      
    }
export type get__api_v1_indexer_Id_newznab = {
      method: "GET",
      path: "/api/v1/indexer/{id}/newznab",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ t: string, q: string, cat: string, imdbid: string, tmdbid: number, extended: string, limit: number, offset: number, minage: number, maxage: number, minsize: number, maxsize: number, rid: number, tvmazeid: number, traktid: number, tvdbid: number, doubanid: number, season: number, ep: string, album: string, artist: string, label: string, track: string, year: number, genre: string, author: string, title: string, publisher: string, configured: string, source: string, host: string, server: string }>,
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v1_indexer_Id_download = {
      method: "GET",
      path: "/api/v1/indexer/{id}/download",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ link: string, file: string }>,
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }

  // </Endpoints>
  }
  
  
     // <EndpointByMethod>
     export type EndpointByMethod = {
     get: {
           "/api/v1/applications/{id}": Endpoints.get__api_v1_applications_Id,
"/api/v1/applications": Endpoints.get__api_v1_applications,
"/api/v1/applications/schema": Endpoints.get__api_v1_applications_schema,
"/api/v1/downloadclient/{id}": Endpoints.get__api_v1_downloadclient_Id,
"/api/v1/downloadclient": Endpoints.get__api_v1_downloadclient,
"/api/v1/downloadclient/schema": Endpoints.get__api_v1_downloadclient_schema,
"/api/v1/indexer/{id}": Endpoints.get__api_v1_indexer_Id,
"/api/v1/indexer": Endpoints.get__api_v1_indexer,
"/api/v1/indexer/schema": Endpoints.get__api_v1_indexer_schema,
"/api/v1/indexer/categories": Endpoints.get__api_v1_indexer_categories,
"/api/v1/indexer/{id}/newznab": Endpoints.get__api_v1_indexer_Id_newznab,
"/api/v1/indexer/{id}/download": Endpoints.get__api_v1_indexer_Id_download
         },
put: {
           "/api/v1/applications/{id}": Endpoints.put__api_v1_applications_Id,
"/api/v1/applications/bulk": Endpoints.put__api_v1_applications_bulk,
"/api/v1/downloadclient/{id}": Endpoints.put__api_v1_downloadclient_Id,
"/api/v1/downloadclient/bulk": Endpoints.put__api_v1_downloadclient_bulk,
"/api/v1/indexer/{id}": Endpoints.put__api_v1_indexer_Id,
"/api/v1/indexer/bulk": Endpoints.put__api_v1_indexer_bulk
         },
delete: {
           "/api/v1/applications/{id}": Endpoints.delete__api_v1_applications_Id,
"/api/v1/applications/bulk": Endpoints.delete__api_v1_applications_bulk,
"/api/v1/downloadclient/{id}": Endpoints.delete__api_v1_downloadclient_Id,
"/api/v1/downloadclient/bulk": Endpoints.delete__api_v1_downloadclient_bulk,
"/api/v1/indexer/{id}": Endpoints.delete__api_v1_indexer_Id,
"/api/v1/indexer/bulk": Endpoints.delete__api_v1_indexer_bulk
         },
post: {
           "/api/v1/applications": Endpoints.post__api_v1_applications,
"/api/v1/applications/test": Endpoints.post__api_v1_applications_test,
"/api/v1/applications/testall": Endpoints.post__api_v1_applications_testall,
"/api/v1/applications/action/{name}": Endpoints.post__api_v1_applications_action_Name,
"/api/v1/downloadclient": Endpoints.post__api_v1_downloadclient,
"/api/v1/downloadclient/test": Endpoints.post__api_v1_downloadclient_test,
"/api/v1/downloadclient/testall": Endpoints.post__api_v1_downloadclient_testall,
"/api/v1/downloadclient/action/{name}": Endpoints.post__api_v1_downloadclient_action_Name,
"/api/v1/indexer": Endpoints.post__api_v1_indexer,
"/api/v1/indexer/test": Endpoints.post__api_v1_indexer_test,
"/api/v1/indexer/testall": Endpoints.post__api_v1_indexer_testall,
"/api/v1/indexer/action/{name}": Endpoints.post__api_v1_indexer_action_Name
         }
     }
     
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type GetEndpoints = EndpointByMethod["get"]
export type PutEndpoints = EndpointByMethod["put"]
export type DeleteEndpoints = EndpointByMethod["delete"]
export type PostEndpoints = EndpointByMethod["post"]
    // </EndpointByMethod.Shorthands>
    