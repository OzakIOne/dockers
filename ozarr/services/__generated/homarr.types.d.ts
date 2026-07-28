
  export namespace Schemas {
    // <Schemas>
  /**
 * The error information
 */
export type error_BAD_REQUEST = {
  /**
   * The error message
   */
  message: string;
  /**
   * The error code
   */
  code: string;
  /**
   * An array of issues that were responsible for the error
   */
  issues?: Array<{ message: string }>;
}
/**
 * The error information
 */
export type error_UNAUTHORIZED = {
  /**
   * The error message
   */
  message: string;
  /**
   * The error code
   */
  code: string;
  /**
   * An array of issues that were responsible for the error
   */
  issues?: Array<{ message: string }>;
}
/**
 * The error information
 */
export type error_FORBIDDEN = {
  /**
   * The error message
   */
  message: string;
  /**
   * The error code
   */
  code: string;
  /**
   * An array of issues that were responsible for the error
   */
  issues?: Array<{ message: string }>;
}
/**
 * The error information
 */
export type error_INTERNAL_SERVER_ERROR = {
  /**
   * The error message
   */
  message: string;
  /**
   * The error code
   */
  code: string;
  /**
   * An array of issues that were responsible for the error
   */
  issues?: Array<{ message: string }>;
}

    // </Schemas>
    }
  
  export namespace Endpoints {
  // <Endpoints>
  
  export type get_AppRouter__all = {
      method: "GET",
      path: "/api/apps",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<{ id: string, name: string, description: (string | null), iconUrl: string, href: (string | null), pingUrl: (string | null) }>,
401: Schemas.error_UNAUTHORIZED,
403: Schemas.error_FORBIDDEN,
500: Schemas.error_INTERNAL_SERVER_ERROR,
},
      
    }
export type post_AppRouter__create = {
      method: "POST",
      path: "/api/apps",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  { name: string, description: (string | null), iconUrl: string, href: ((string | "") | null), pingUrl: ((string | "") | null) },
          }
      responses: {200: ({ appId: string } & { id: string, name: string, description: (string | null), iconUrl: string, href: (string | null), pingUrl: (string | null) }),
400: Schemas.error_BAD_REQUEST,
401: Schemas.error_UNAUTHORIZED,
403: Schemas.error_FORBIDDEN,
500: Schemas.error_INTERNAL_SERVER_ERROR,
},
      
    }

  // </Endpoints>
  }
  
  
     // <EndpointByMethod>
     export type EndpointByMethod = {
     get: {
           "/api/apps": Endpoints.get_AppRouter__all
         },
post: {
           "/api/apps": Endpoints.post_AppRouter__create
         }
     }
     
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type GetEndpoints = EndpointByMethod["get"]
export type PostEndpoints = EndpointByMethod["post"]
    // </EndpointByMethod.Shorthands>
    