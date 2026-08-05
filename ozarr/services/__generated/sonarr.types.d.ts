
  export namespace Schemas {
    // <Schemas>
  export type ApplyTags = ("add" | "remove" | "replace")
export type SelectOption = Partial<{ value: number, name: (string | null), order: number, hint: (string | null) }>
export type PrivacyLevel = ("normal" | "password" | "apiKey" | "userName")
export type Field = Partial<{ order: number, name: (string | null), label: (string | null), unit: (string | null), helpText: (string | null), helpTextWarning: (string | null), helpLink: (string | null), value: null, type: (string | null), advanced: boolean, selectOptions: (Array<SelectOption> | null), selectOptionsProviderAction: (string | null), section: (string | null), hidden: (string | null), privacy: PrivacyLevel, placeholder: (string | null), isFloat: boolean }>
export type DownloadProtocol = ("unknown" | "usenet" | "torrent")
export type ProviderMessageType = ("info" | "warning" | "error")
export type ProviderMessage = Partial<{ message: (string | null), type: ProviderMessageType }>
export type DownloadClientBulkResource = Partial<{ ids: (Array<number> | null), tags: (Array<number> | null), applyTags: ApplyTags, enable: (boolean | null), priority: (number | null), removeCompletedDownloads: (boolean | null), removeFailedDownloads: (boolean | null) }>
export type DownloadClientResource = Partial<{ id: number, name: (string | null), fields: (Array<Field> | null), implementationName: (string | null), implementation: (string | null), configContract: (string | null), infoLink: (string | null), message: ProviderMessage, tags: (Array<number> | null), presets: (DownloadClientResourceArray | null), enable: boolean, protocol: DownloadProtocol, priority: number, removeCompletedDownloads: boolean, removeFailedDownloads: boolean }>
export interface DownloadClientResourceArray extends Array<DownloadClientResource> {}
export type EpisodeTitleRequiredType = ("always" | "bulkSeasonReleases" | "never")
export type FileDateType = ("none" | "localAirDate" | "utcAirDate")
export type ProperDownloadTypes = ("preferAndUpgrade" | "doNotUpgrade" | "doNotPrefer")
export type RescanAfterRefreshType = ("always" | "afterManual" | "never")
export type SeasonPackUpgradeType = ("all" | "threshold" | "any")
export type MediaManagementSettingsResource = Partial<{ id: number, autoUnmonitorPreviouslyDownloadedEpisodes: boolean, recycleBin: (string | null), recycleBinCleanupDays: number, downloadPropersAndRepacks: ProperDownloadTypes, createEmptySeriesFolders: boolean, deleteEmptyFolders: boolean, fileDate: FileDateType, rescanAfterRefresh: RescanAfterRefreshType, setPermissionsLinux: boolean, chmodFolder: (string | null), chownGroup: (string | null), episodeTitleRequired: EpisodeTitleRequiredType, skipFreeSpaceCheckWhenGrabbing: boolean, skipFreeSpaceCheckWhenImporting: boolean, minimumFreeSpaceWhenImporting: number, copyUsingHardlinks: boolean, useScriptImport: boolean, scriptImportPath: (string | null), importExtraFiles: boolean, extraFileExtensions: (string | null), enableMediaInfo: boolean, userRejectedExtensions: (string | null), seasonPackUpgrade: SeasonPackUpgradeType, seasonPackUpgradeThreshold: number }>
export type Severity = ("error" | "warning" | "info")
export type ValidationFailure = Partial<{ propertyName: (string | null), errorMessage: (string | null), attemptedValue: null, customState: null, severity: Severity, errorCode: (string | null), formattedMessageArguments: (Array<unknown> | null), formattedMessagePlaceholderValues: (Record<string, null> | null) }>
export type ProviderTestAllResult = Partial<{ id: number, isValid: boolean, validationFailures: (Array<ValidationFailure> | null) }>
export type UnmappedFolder = Partial<{ name: (string | null), path: (string | null), relativePath: (string | null) }>
export type RootFolderResource = Partial<{ id: number, path: (string | null), accessible: boolean, isEmpty: boolean, freeSpace: (number | null), totalSpace: (number | null), unmappedFolders: (Array<UnmappedFolder> | null) }>
export type SkipValidation = ("none" | "warnings" | "all")

    // </Schemas>
    }
  
  export namespace Endpoints {
  // <Endpoints>
  
  export type get__api_v5_downloadclient = {
      method: "GET",
      path: "/api/v5/downloadclient",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.DownloadClientResource>,
},
      
    }
export type post__api_v5_downloadclient = {
      method: "POST",
      path: "/api/v5/downloadclient",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ skipTesting: boolean, skipValidation: Schemas.SkipValidation }>,
        
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {201: Schemas.DownloadClientResource,
404: unknown,
},
      
    }
export type put__api_v5_downloadclient_Id = {
      method: "PUT",
      path: "/api/v5/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ skipTesting: boolean, skipValidation: Schemas.SkipValidation }>,
        path:  { id: number },
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {202: Schemas.DownloadClientResource,
404: unknown,
},
      
    }
export type delete__api_v5_downloadclient_Id = {
      method: "DELETE",
      path: "/api/v5/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {204: unknown,
},
      
    }
export type get__api_v5_downloadclient_Id = {
      method: "GET",
      path: "/api/v5/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.DownloadClientResource,
404: unknown,
},
      
    }
export type put__api_v5_downloadclient_bulk = {
      method: "PUT",
      path: "/api/v5/downloadclient/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DownloadClientBulkResource,
          }
      responses: {200: Array<Schemas.DownloadClientResource>,
400: unknown,
},
      
    }
export type delete__api_v5_downloadclient_bulk = {
      method: "DELETE",
      path: "/api/v5/downloadclient/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DownloadClientBulkResource,
          }
      responses: {204: unknown,
},
      
    }
export type get__api_v5_downloadclient_schema = {
      method: "GET",
      path: "/api/v5/downloadclient/schema",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.DownloadClientResource>,
},
      
    }
export type post__api_v5_downloadclient_test = {
      method: "POST",
      path: "/api/v5/downloadclient/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ skipValidation: Schemas.SkipValidation }>,
        
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {204: unknown,
},
      
    }
export type post__api_v5_downloadclient_testall = {
      method: "POST",
      path: "/api/v5/downloadclient/testall",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.ProviderTestAllResult>,
400: Array<Schemas.ProviderTestAllResult>,
},
      
    }
export type post__api_v5_downloadclient_action_Name = {
      method: "POST",
      path: "/api/v5/downloadclient/action/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { name: string },
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {400: unknown,
},
      
    }
export type get__api_v5_settings_mediamanagement = {
      method: "GET",
      path: "/api/v5/settings/mediamanagement",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.MediaManagementSettingsResource,
},
      
    }
export type put__api_v5_settings_mediamanagement_Id = {
      method: "PUT",
      path: "/api/v5/settings/mediamanagement/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        body:  Schemas.MediaManagementSettingsResource,
          }
      responses: {202: Schemas.MediaManagementSettingsResource,
404: unknown,
},
      
    }
export type get__api_v5_settings_mediamanagement_Id = {
      method: "GET",
      path: "/api/v5/settings/mediamanagement/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.MediaManagementSettingsResource,
404: unknown,
},
      
    }
export type post__api_v5_rootfolder = {
      method: "POST",
      path: "/api/v5/rootfolder",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.RootFolderResource,
          }
      responses: {201: Schemas.RootFolderResource,
404: unknown,
},
      
    }
export type get__api_v5_rootfolder = {
      method: "GET",
      path: "/api/v5/rootfolder",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.RootFolderResource>,
},
      
    }
export type delete__api_v5_rootfolder_Id = {
      method: "DELETE",
      path: "/api/v5/rootfolder/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {204: unknown,
},
      
    }
export type get__api_v5_rootfolder_Id = {
      method: "GET",
      path: "/api/v5/rootfolder/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.RootFolderResource,
404: unknown,
},
      
    }

  // </Endpoints>
  }
  
  
     // <EndpointByMethod>
     export type EndpointByMethod = {
     get: {
           "/api/v5/downloadclient": Endpoints.get__api_v5_downloadclient,
"/api/v5/downloadclient/{id}": Endpoints.get__api_v5_downloadclient_Id,
"/api/v5/downloadclient/schema": Endpoints.get__api_v5_downloadclient_schema,
"/api/v5/settings/mediamanagement": Endpoints.get__api_v5_settings_mediamanagement,
"/api/v5/settings/mediamanagement/{id}": Endpoints.get__api_v5_settings_mediamanagement_Id,
"/api/v5/rootfolder": Endpoints.get__api_v5_rootfolder,
"/api/v5/rootfolder/{id}": Endpoints.get__api_v5_rootfolder_Id
         },
post: {
           "/api/v5/downloadclient": Endpoints.post__api_v5_downloadclient,
"/api/v5/downloadclient/test": Endpoints.post__api_v5_downloadclient_test,
"/api/v5/downloadclient/testall": Endpoints.post__api_v5_downloadclient_testall,
"/api/v5/downloadclient/action/{name}": Endpoints.post__api_v5_downloadclient_action_Name,
"/api/v5/rootfolder": Endpoints.post__api_v5_rootfolder
         },
put: {
           "/api/v5/downloadclient/{id}": Endpoints.put__api_v5_downloadclient_Id,
"/api/v5/downloadclient/bulk": Endpoints.put__api_v5_downloadclient_bulk,
"/api/v5/settings/mediamanagement/{id}": Endpoints.put__api_v5_settings_mediamanagement_Id
         },
delete: {
           "/api/v5/downloadclient/{id}": Endpoints.delete__api_v5_downloadclient_Id,
"/api/v5/downloadclient/bulk": Endpoints.delete__api_v5_downloadclient_bulk,
"/api/v5/rootfolder/{id}": Endpoints.delete__api_v5_rootfolder_Id
         }
     }
     
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type GetEndpoints = EndpointByMethod["get"]
export type PostEndpoints = EndpointByMethod["post"]
export type PutEndpoints = EndpointByMethod["put"]
export type DeleteEndpoints = EndpointByMethod["delete"]
    // </EndpointByMethod.Shorthands>
    