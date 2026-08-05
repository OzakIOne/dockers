
  export namespace Schemas {
    // <Schemas>
  export type ApplyTags = ("add" | "remove" | "replace")
export type SelectOption = Partial<{ value: number, name: (string | null), order: number, hint: (string | null), dividerAfter: boolean }>
export type PrivacyLevel = ("normal" | "password" | "apiKey" | "userName")
export type Field = Partial<{ order: number, name: (string | null), label: (string | null), unit: (string | null), helpText: (string | null), helpTextWarning: (string | null), helpLink: (string | null), value: null, type: (string | null), advanced: boolean, selectOptions: (Array<SelectOption> | null), selectOptionsProviderAction: (string | null), section: (string | null), hidden: (string | null), privacy: PrivacyLevel, placeholder: (string | null), isFloat: boolean }>
export type DownloadProtocol = ("unknown" | "usenet" | "torrent")
export type DownloadClientBulkResource = Partial<{ ids: (Array<number> | null), tags: (Array<number> | null), applyTags: ApplyTags, enable: (boolean | null), priority: (number | null), removeCompletedDownloads: (boolean | null), removeFailedDownloads: (boolean | null) }>
export type ProviderMessageType = ("info" | "warning" | "error")
export type ProviderMessage = Partial<{ message: (string | null), type: ProviderMessageType }>
export type DownloadClientResource = Partial<{ id: number, name: (string | null), fields: (Array<Field> | null), implementationName: (string | null), implementation: (string | null), configContract: (string | null), infoLink: (string | null), message: ProviderMessage, tags: (Array<number> | null), presets: (DownloadClientResourceArray | null), enable: boolean, protocol: DownloadProtocol, priority: number, removeCompletedDownloads: boolean, removeFailedDownloads: boolean }>
export interface DownloadClientResourceArray extends Array<DownloadClientResource> {}
export type FileDateType = ("none" | "cinemas" | "release")
export type ProperDownloadTypes = ("preferAndUpgrade" | "doNotUpgrade" | "doNotPrefer")
export type RescanAfterRefreshType = ("always" | "afterManual" | "never")
export type MediaManagementConfigResource = Partial<{ id: number, autoUnmonitorPreviouslyDownloadedMovies: boolean, recycleBin: (string | null), recycleBinCleanupDays: number, downloadPropersAndRepacks: ProperDownloadTypes, createEmptyMovieFolders: boolean, deleteEmptyFolders: boolean, fileDate: FileDateType, rescanAfterRefresh: RescanAfterRefreshType, autoRenameFolders: boolean, pathsDefaultStatic: boolean, setPermissionsLinux: boolean, chmodFolder: (string | null), chownGroup: (string | null), skipFreeSpaceCheckWhenImporting: boolean, minimumFreeSpaceWhenImporting: number, copyUsingHardlinks: boolean, useScriptImport: boolean, scriptImportPath: (string | null), importExtraFiles: boolean, extraFileExtensions: (string | null), enableMediaInfo: boolean }>
export type UnmappedFolder = Partial<{ name: (string | null), path: (string | null), relativePath: (string | null) }>
export type RootFolderResource = Partial<{ id: number, path: (string | null), accessible: boolean, freeSpace: (number | null), unmappedFolders: (Array<UnmappedFolder> | null) }>

    // </Schemas>
    }
  
  export namespace Endpoints {
  // <Endpoints>
  
  export type get__api_v3_downloadclient = {
      method: "GET",
      path: "/api/v3/downloadclient",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.DownloadClientResource>,
},
      
    }
export type post__api_v3_downloadclient = {
      method: "POST",
      path: "/api/v3/downloadclient",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceSave: boolean }>,
        
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {200: Schemas.DownloadClientResource,
},
      
    }
export type put__api_v3_downloadclient_Id = {
      method: "PUT",
      path: "/api/v3/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceSave: boolean }>,
        path:  { id: number },
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {200: Schemas.DownloadClientResource,
},
      
    }
export type delete__api_v3_downloadclient_Id = {
      method: "DELETE",
      path: "/api/v3/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v3_downloadclient_Id = {
      method: "GET",
      path: "/api/v3/downloadclient/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.DownloadClientResource,
},
      
    }
export type put__api_v3_downloadclient_bulk = {
      method: "PUT",
      path: "/api/v3/downloadclient/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DownloadClientBulkResource,
          }
      responses: {200: Schemas.DownloadClientResource,
},
      
    }
export type delete__api_v3_downloadclient_bulk = {
      method: "DELETE",
      path: "/api/v3/downloadclient/bulk",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DownloadClientBulkResource,
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v3_downloadclient_schema = {
      method: "GET",
      path: "/api/v3/downloadclient/schema",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.DownloadClientResource>,
},
      
    }
export type post__api_v3_downloadclient_test = {
      method: "POST",
      path: "/api/v3/downloadclient/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ forceTest: boolean }>,
        
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {200: unknown,
},
      
    }
export type post__api_v3_downloadclient_testall = {
      method: "POST",
      path: "/api/v3/downloadclient/testall",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
export type post__api_v3_downloadclient_action_Name = {
      method: "POST",
      path: "/api/v3/downloadclient/action/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { name: string },
        
        
        body:  Schemas.DownloadClientResource,
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v3_config_mediamanagement = {
      method: "GET",
      path: "/api/v3/config/mediamanagement",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.MediaManagementConfigResource,
},
      
    }
export type put__api_v3_config_mediamanagement_Id = {
      method: "PUT",
      path: "/api/v3/config/mediamanagement/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: string },
        
        
        body:  Schemas.MediaManagementConfigResource,
          }
      responses: {200: Schemas.MediaManagementConfigResource,
},
      
    }
export type get__api_v3_config_mediamanagement_Id = {
      method: "GET",
      path: "/api/v3/config/mediamanagement/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.MediaManagementConfigResource,
},
      
    }
export type post__api_v3_rootfolder = {
      method: "POST",
      path: "/api/v3/rootfolder",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.RootFolderResource,
          }
      responses: {200: Schemas.RootFolderResource,
},
      
    }
export type get__api_v3_rootfolder = {
      method: "GET",
      path: "/api/v3/rootfolder",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.RootFolderResource>,
},
      
    }
export type delete__api_v3_rootfolder_Id = {
      method: "DELETE",
      path: "/api/v3/rootfolder/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
},
      
    }
export type get__api_v3_rootfolder_Id = {
      method: "GET",
      path: "/api/v3/rootfolder/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.RootFolderResource,
},
      
    }

  // </Endpoints>
  }
  
  
     // <EndpointByMethod>
     export type EndpointByMethod = {
     get: {
           "/api/v3/downloadclient": Endpoints.get__api_v3_downloadclient,
"/api/v3/downloadclient/{id}": Endpoints.get__api_v3_downloadclient_Id,
"/api/v3/downloadclient/schema": Endpoints.get__api_v3_downloadclient_schema,
"/api/v3/config/mediamanagement": Endpoints.get__api_v3_config_mediamanagement,
"/api/v3/config/mediamanagement/{id}": Endpoints.get__api_v3_config_mediamanagement_Id,
"/api/v3/rootfolder": Endpoints.get__api_v3_rootfolder,
"/api/v3/rootfolder/{id}": Endpoints.get__api_v3_rootfolder_Id
         },
post: {
           "/api/v3/downloadclient": Endpoints.post__api_v3_downloadclient,
"/api/v3/downloadclient/test": Endpoints.post__api_v3_downloadclient_test,
"/api/v3/downloadclient/testall": Endpoints.post__api_v3_downloadclient_testall,
"/api/v3/downloadclient/action/{name}": Endpoints.post__api_v3_downloadclient_action_Name,
"/api/v3/rootfolder": Endpoints.post__api_v3_rootfolder
         },
put: {
           "/api/v3/downloadclient/{id}": Endpoints.put__api_v3_downloadclient_Id,
"/api/v3/downloadclient/bulk": Endpoints.put__api_v3_downloadclient_bulk,
"/api/v3/config/mediamanagement/{id}": Endpoints.put__api_v3_config_mediamanagement_Id
         },
delete: {
           "/api/v3/downloadclient/{id}": Endpoints.delete__api_v3_downloadclient_Id,
"/api/v3/downloadclient/bulk": Endpoints.delete__api_v3_downloadclient_bulk,
"/api/v3/rootfolder/{id}": Endpoints.delete__api_v3_rootfolder_Id
         }
     }
     
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type GetEndpoints = EndpointByMethod["get"]
export type PostEndpoints = EndpointByMethod["post"]
export type PutEndpoints = EndpointByMethod["put"]
export type DeleteEndpoints = EndpointByMethod["delete"]
    // </EndpointByMethod.Shorthands>
    