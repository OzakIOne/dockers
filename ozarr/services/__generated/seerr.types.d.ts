
  export namespace Schemas {
    // <Schemas>
  export type RadarrSettings = { id?: number, name: string, hostname: string, port: number, apiKey: string, useSsl: boolean, baseUrl?: string, activeProfileId: number, activeProfileName: string, activeDirectory: string, is4k: boolean, minimumAvailability: string, isDefault: boolean, externalUrl?: string, syncEnabled?: boolean, preventSearch?: boolean }
export type SonarrSettings = { id?: number, name: string, hostname: string, port: number, apiKey: string, useSsl: boolean, baseUrl?: string, activeProfileId: number, activeProfileName: string, activeDirectory: string, activeLanguageProfileId?: number, activeAnimeProfileId?: (number | null), activeAnimeLanguageProfileId?: (number | null), activeAnimeProfileName?: (string | null), activeAnimeDirectory?: (string | null), is4k: boolean, enableSeasonFolders: boolean, isDefault: boolean, externalUrl?: string, syncEnabled?: boolean, preventSearch?: boolean }
export type ServiceProfile = Partial<{ id: number, name: string }>

    // </Schemas>
    }
  
  export namespace Endpoints {
  // <Endpoints>
  
  /**
 * Returns the current Seerr status in a JSON object. updateAvailable and commitsBehind are omitted when checkUpdateAvailable is false.
 */
export type get__status = {
      method: "GET",
      path: "/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ checkUpdateAvailable: boolean }>,
        
        
        
        
          }
      responses: {200: Partial<{ version: string, commitTag: string, updateAvailable: boolean, commitsBehind: number, restartRequired: boolean }>,
},
      
    }
/**
 * Returns all Radarr settings in a JSON array.
 */
export type get__settings_radarr = {
      method: "GET",
      path: "/settings/radarr",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.RadarrSettings>,
},
      
    }
/**
 * Creates a new Radarr instance from the request body.
 */
export type post__settings_radarr = {
      method: "POST",
      path: "/settings/radarr",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.RadarrSettings,
          }
      responses: {201: Schemas.RadarrSettings,
},
      
    }
/**
 * Tests if the Radarr configuration is valid. Returns profiles and root folders on success.
 */
export type post__settings_radarr_test = {
      method: "POST",
      path: "/settings/radarr/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  { hostname: string, port: number, apiKey: string, useSsl: boolean, baseUrl?: string },
          }
      responses: {200: Partial<{ profiles: Array<Schemas.ServiceProfile> }>,
},
      
    }
/**
 * Updates an existing Radarr instance with the provided values.
 */
export type put__settings_radarr_RadarrId = {
      method: "PUT",
      path: "/settings/radarr/{radarrId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { radarrId: number },
        
        
        body:  Schemas.RadarrSettings,
          }
      responses: {200: Schemas.RadarrSettings,
},
      
    }
/**
 * Deletes an existing Radarr instance based on the radarrId parameter.
 */
export type delete__settings_radarr_RadarrId = {
      method: "DELETE",
      path: "/settings/radarr/{radarrId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { radarrId: number },
        
        
        
          }
      responses: {200: Schemas.RadarrSettings,
},
      
    }
/**
 * Returns a list of profiles available on the Radarr server instance in a JSON array.
 */
export type get__settings_radarr_RadarrId_profiles = {
      method: "GET",
      path: "/settings/radarr/{radarrId}/profiles",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { radarrId: number },
        
        
        
          }
      responses: {200: Array<Schemas.ServiceProfile>,
},
      
    }
/**
 * Returns all Sonarr settings in a JSON array.
 */
export type get__settings_sonarr = {
      method: "GET",
      path: "/settings/sonarr",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.SonarrSettings>,
},
      
    }
/**
 * Creates a new Sonarr instance from the request body.
 */
export type post__settings_sonarr = {
      method: "POST",
      path: "/settings/sonarr",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.SonarrSettings,
          }
      responses: {201: Schemas.SonarrSettings,
},
      
    }
/**
 * Tests if the Sonarr configuration is valid. Returns profiles and root folders on success.
 */
export type post__settings_sonarr_test = {
      method: "POST",
      path: "/settings/sonarr/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  { hostname: string, port: number, apiKey: string, useSsl: boolean, baseUrl?: string },
          }
      responses: {200: Partial<{ profiles: Array<Schemas.ServiceProfile> }>,
},
      
    }
/**
 * Updates an existing Sonarr instance with the provided values.
 */
export type put__settings_sonarr_SonarrId = {
      method: "PUT",
      path: "/settings/sonarr/{sonarrId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { sonarrId: number },
        
        
        body:  Schemas.SonarrSettings,
          }
      responses: {200: Schemas.SonarrSettings,
},
      
    }
/**
 * Deletes an existing Sonarr instance based on the sonarrId parameter.
 */
export type delete__settings_sonarr_SonarrId = {
      method: "DELETE",
      path: "/settings/sonarr/{sonarrId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { sonarrId: number },
        
        
        
          }
      responses: {200: Schemas.SonarrSettings,
},
      
    }

  // </Endpoints>
  }
  
  
     // <EndpointByMethod>
     export type EndpointByMethod = {
     get: {
           "/status": Endpoints.get__status,
"/settings/radarr": Endpoints.get__settings_radarr,
"/settings/radarr/{radarrId}/profiles": Endpoints.get__settings_radarr_RadarrId_profiles,
"/settings/sonarr": Endpoints.get__settings_sonarr
         },
post: {
           "/settings/radarr": Endpoints.post__settings_radarr,
"/settings/radarr/test": Endpoints.post__settings_radarr_test,
"/settings/sonarr": Endpoints.post__settings_sonarr,
"/settings/sonarr/test": Endpoints.post__settings_sonarr_test
         },
put: {
           "/settings/radarr/{radarrId}": Endpoints.put__settings_radarr_RadarrId,
"/settings/sonarr/{sonarrId}": Endpoints.put__settings_sonarr_SonarrId
         },
delete: {
           "/settings/radarr/{radarrId}": Endpoints.delete__settings_radarr_RadarrId,
"/settings/sonarr/{sonarrId}": Endpoints.delete__settings_sonarr_SonarrId
         }
     }
     
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type GetEndpoints = EndpointByMethod["get"]
export type PostEndpoints = EndpointByMethod["post"]
export type PutEndpoints = EndpointByMethod["put"]
export type DeleteEndpoints = EndpointByMethod["delete"]
    // </EndpointByMethod.Shorthands>
    