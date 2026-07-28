
  export namespace Schemas {
    // <Schemas>
  /**
 * An enum that represents a day of the week, weekdays, weekends, or all days.
 */
export type DynamicDayOfWeek = ("Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Everyday" | "Weekday" | "Weekend")
/**
 * An entity representing a user's access schedule.
 */
export type AccessSchedule = Partial<{
  /**
   * Gets the id of this instance.
   */
  Id: number;
  /**
   * Gets the id of the associated user.
   */
  UserId: string;
  /**
   * Gets or sets the day of week.
   */
  DayOfWeek: (DynamicDayOfWeek & ("Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Everyday" | "Weekday" | "Weekend"));
  /**
   * Gets or sets the start hour.
   */
  StartHour: number;
  /**
   * Gets or sets the end hour.
   */
  EndHour: number;
}>
/**
 * An enum representing a subtitle playback mode.
 */
export type SubtitlePlaybackMode = ("Default" | "Always" | "OnlyForced" | "None" | "Smart")
/**
 * Class UserConfiguration.
 */
export type UserConfiguration = Partial<{
  /**
   * Gets or sets the audio language preference.
   */
  AudioLanguagePreference: (string | null);
  /**
   * Gets or sets a value indicating whether [play default audio track].
   */
  PlayDefaultAudioTrack: boolean;
  /**
   * Gets or sets the subtitle language preference.
   */
  SubtitleLanguagePreference: (string | null);
  DisplayMissingEpisodes: boolean;
  GroupedFolders: Array<string>;
  /**
   * An enum representing a subtitle playback mode.
   */
  SubtitleMode: (SubtitlePlaybackMode & ("Default" | "Always" | "OnlyForced" | "None" | "Smart"));
  DisplayCollectionsView: boolean;
  EnableLocalPassword: boolean;
  OrderedViews: Array<string>;
  LatestItemsExcludes: Array<string>;
  MyMediaExcludes: Array<string>;
  HidePlayedInLatest: boolean;
  RememberAudioSelections: boolean;
  RememberSubtitleSelections: boolean;
  EnableNextEpisodeAutoPlay: boolean;
  /**
   * Gets or sets the id of the selected cast receiver.
   */
  CastReceiverId: (string | null);
}>
/**
 * An enum representing an unrated item.
 */
export type UnratedItem = ("Movie" | "Trailer" | "Series" | "Music" | "Book" | "LiveTvChannel" | "LiveTvProgram" | "ChannelContent" | "Other")
/**
 * Enum SyncPlayUserAccessType.
 */
export type SyncPlayUserAccessType = ("CreateAndJoinGroups" | "JoinGroups" | "None")
export type UserPolicy = {
  /**
   * Gets or sets a value indicating whether this instance is administrator.
   */
  IsAdministrator?: boolean;
  /**
   * Gets or sets a value indicating whether this instance is hidden.
   */
  IsHidden?: boolean;
  /**
   * Gets or sets a value indicating whether this instance can manage collections.
   */
  EnableCollectionManagement?: boolean;
  /**
   * Gets or sets a value indicating whether this instance can manage subtitles.
   */
  EnableSubtitleManagement?: boolean;
  /**
   * Gets or sets a value indicating whether this user can manage lyrics.
   */
  EnableLyricManagement?: boolean;
  /**
   * Gets or sets a value indicating whether this instance is disabled.
   */
  IsDisabled?: boolean;
  /**
   * Gets or sets the max parental rating.
   */
  MaxParentalRating?: (number | null);
  MaxParentalSubRating?: (number | null);
  BlockedTags?: (Array<string> | null);
  AllowedTags?: (Array<string> | null);
  EnableUserPreferenceAccess?: boolean;
  AccessSchedules?: (Array<AccessSchedule> | null);
  BlockUnratedItems?: (Array<UnratedItem> | null);
  EnableRemoteControlOfOtherUsers?: boolean;
  EnableSharedDeviceControl?: boolean;
  EnableRemoteAccess?: boolean;
  EnableLiveTvManagement?: boolean;
  EnableLiveTvAccess?: boolean;
  EnableMediaPlayback?: boolean;
  EnableAudioPlaybackTranscoding?: boolean;
  EnableVideoPlaybackTranscoding?: boolean;
  EnablePlaybackRemuxing?: boolean;
  ForceRemoteSourceTranscoding?: boolean;
  EnableContentDeletion?: boolean;
  EnableContentDeletionFromFolders?: (Array<string> | null);
  EnableContentDownloading?: boolean;
  /**
   * Gets or sets a value indicating whether [enable synchronize].
   */
  EnableSyncTranscoding?: boolean;
  EnableMediaConversion?: boolean;
  EnabledDevices?: (Array<string> | null);
  EnableAllDevices?: boolean;
  EnabledChannels?: (Array<string> | null);
  EnableAllChannels?: boolean;
  EnabledFolders?: (Array<string> | null);
  EnableAllFolders?: boolean;
  InvalidLoginAttemptCount?: number;
  LoginAttemptsBeforeLockout?: number;
  MaxActiveSessions?: number;
  EnablePublicSharing?: boolean;
  BlockedMediaFolders?: (Array<string> | null);
  BlockedChannels?: (Array<string> | null);
  RemoteClientBitrateLimit?: number;
  AuthenticationProviderId: string;
  PasswordResetProviderId: string;
  /**
   * Gets or sets a value indicating what SyncPlay features the user can access.
   */
  SyncPlayAccess?: (SyncPlayUserAccessType & ("CreateAndJoinGroups" | "JoinGroups" | "None"));
}
/**
 * Class UserDto.
 */
export type UserDto = Partial<{
  /**
   * Gets or sets the name.
   */
  Name: (string | null);
  /**
   * Gets or sets the server identifier.
   */
  ServerId: (string | null);
  /**
   * Gets or sets the name of the server.
   * This is not used by the server and is for client-side usage only.
   */
  ServerName: (string | null);
  /**
   * Gets or sets the id.
   */
  Id: string;
  /**
   * Gets or sets the primary image tag.
   */
  PrimaryImageTag: (string | null);
  /**
   * Gets or sets a value indicating whether this instance has password.
   */
  HasPassword: (boolean | null);
  /**
   * Gets or sets a value indicating whether this instance has configured password.
   */
  HasConfiguredPassword: (boolean | null);
  /**
   * Gets or sets a value indicating whether this instance has configured easy password.
   */
  HasConfiguredEasyPassword: (boolean | null);
  /**
   * Gets or sets whether async login is enabled or not.
   */
  EnableAutoLogin: (boolean | null);
  /**
   * Gets or sets the last login date.
   */
  LastLoginDate: (string | null);
  /**
   * Gets or sets the last activity date.
   */
  LastActivityDate: (string | null);
  /**
   * Gets or sets the configuration.
   */
  Configuration: ((UserConfiguration) | null);
  /**
   * Gets or sets the policy.
   */
  Policy: ((UserPolicy) | null);
  /**
   * Gets or sets the primary image aspect ratio.
   */
  PrimaryImageAspectRatio: (number | null);
}>
/**
 * The cast receiver application model.
 */
export type CastReceiverApplication = {
  /**
   * Gets or sets the cast receiver application id.
   */
  Id: string;
  /**
   * Gets or sets the cast receiver application name.
   */
  Name: string;
}
/**
 * Defines the MediaBrowser.Model.Updates.VersionInfo class.
 */
export type VersionInfo = Partial<{
  /**
   * Gets or sets the version.
   */
  version: string;
  /**
   * Gets the version as a System.Version.
   */
  VersionNumber: string;
  /**
   * Gets or sets the changelog for this version.
   */
  changelog: (string | null);
  /**
   * Gets or sets the ABI that this version was built against.
   */
  targetAbi: (string | null);
  /**
   * Gets or sets the source URL.
   */
  sourceUrl: (string | null);
  /**
   * Gets or sets a checksum for the binary.
   */
  checksum: (string | null);
  /**
   * Gets or sets a timestamp of when the binary was built.
   */
  timestamp: (string | null);
  /**
   * Gets or sets the repository name.
   */
  repositoryName: string;
  /**
   * Gets or sets the repository url.
   */
  repositoryUrl: string;
}>
/**
 * Class PackageInfo.
 */
export type PackageInfo = Partial<{
  /**
   * Gets or sets the name.
   */
  name: string;
  /**
   * Gets or sets a long description of the plugin containing features or helpful explanations.
   */
  description: string;
  /**
   * Gets or sets a short overview of what the plugin does.
   */
  overview: string;
  /**
   * Gets or sets the owner.
   */
  owner: string;
  /**
   * Gets or sets the category.
   */
  category: string;
  /**
   * Gets or sets the guid of the assembly associated with this plugin.
   * This is used to identify the proper item for automatic updates.
   */
  guid: string;
  /**
   * Gets or sets the versions.
   */
  versions: Array<VersionInfo>;
  /**
   * Gets or sets the image url for the package.
   */
  imageUrl: (string | null);
}>
/**
 * Class InstallationInfo.
 */
export type InstallationInfo = Partial<{
  /**
   * Gets or sets the Id.
   */
  Guid: string;
  /**
   * Gets or sets the name.
   */
  Name: (string | null);
  /**
   * Gets or sets the version.
   */
  Version: (string | null);
  /**
   * Gets or sets the changelog for this version.
   */
  Changelog: (string | null);
  /**
   * Gets or sets the source URL.
   */
  SourceUrl: (string | null);
  /**
   * Gets or sets a checksum for the binary.
   */
  Checksum: (string | null);
  /**
   * Gets or sets package information for the installation.
   */
  PackageInfo: ((PackageInfo) | null);
}>
export type ProblemDetails = Partial<{ type: (string | null), title: (string | null), status: (number | null), detail: (string | null), instance: (string | null) }>
/**
 * Class RepositoryInfo.
 */
export type RepositoryInfo = Partial<{
  /**
   * Gets or sets the name.
   */
  Name: (string | null);
  /**
   * Gets or sets the URL.
   */
  Url: (string | null);
  /**
   * Gets or sets a value indicating whether the repository is enabled.
   */
  Enabled: boolean;
}>
/**
 * Class SystemInfo.
 */
export type SystemInfo = Partial<{
  /**
   * Gets or sets the local address.
   */
  LocalAddress: (string | null);
  /**
   * Gets or sets the name of the server.
   */
  ServerName: (string | null);
  /**
   * Gets or sets the server version.
   */
  Version: (string | null);
  /**
   * Gets or sets the product name. This is the AssemblyProduct name.
   */
  ProductName: (string | null);
  /**
   * Gets or sets the operating system.
   */
  OperatingSystem: (string | null);
  /**
   * Gets or sets the id.
   */
  Id: (string | null);
  /**
   * Gets or sets a value indicating whether the startup wizard is completed.
   */
  StartupWizardCompleted: (boolean | null);
  /**
   * Gets or sets the display name of the operating system.
   */
  OperatingSystemDisplayName: (string | null);
  /**
   * Gets or sets the package name.
   */
  PackageName: (string | null);
  /**
   * Gets or sets a value indicating whether this instance has pending restart.
   */
  HasPendingRestart: boolean;
  IsShuttingDown: boolean;
  /**
   * Gets or sets a value indicating whether [supports library monitor].
   */
  SupportsLibraryMonitor: boolean;
  /**
   * Gets or sets the web socket port number.
   */
  WebSocketPortNumber: number;
  /**
   * Gets or sets the completed installations.
   */
  CompletedInstallations: (Array<InstallationInfo> | null);
  /**
   * Gets or sets a value indicating whether this instance can self restart.
   */
  CanSelfRestart: boolean;
  CanLaunchWebBrowser: boolean;
  /**
   * Gets or sets the program data path.
   */
  ProgramDataPath: (string | null);
  /**
   * Gets or sets the web UI resources path.
   */
  WebPath: (string | null);
  /**
   * Gets or sets the items by name path.
   */
  ItemsByNamePath: (string | null);
  /**
   * Gets or sets the cache path.
   */
  CachePath: (string | null);
  /**
   * Gets or sets the log path.
   */
  LogPath: (string | null);
  /**
   * Gets or sets the internal metadata path.
   */
  InternalMetadataPath: (string | null);
  /**
   * Gets or sets the transcode path.
   */
  TranscodingTempPath: (string | null);
  /**
   * Gets or sets the list of cast receiver applications.
   */
  CastReceiverApplications: (Array<CastReceiverApplication> | null);
  /**
   * Gets or sets a value indicating whether this instance has update available.
   */
  HasUpdateAvailable: boolean;
  EncoderLocation: (string | null);
  SystemArchitecture: (string | null);
}>

    // </Schemas>
    }
  
  export namespace Endpoints {
  // <Endpoints>
  
  export type post_InstallPackage = {
      method: "POST",
      path: "/Packages/Installed/{name}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ assemblyGuid: string, version: string, repositoryUrl: string }>,
        path:  { name: string },
        
        
        
          }
      responses: {204: unknown,
401: unknown,
403: unknown,
404: (Schemas.ProblemDetails | Schemas.ProblemDetails | Schemas.ProblemDetails),
503: unknown,
},
      responseHeaders: {503: { "Retry-After": number, Message: string },
},
    }
export type get_GetRepositories = {
      method: "GET",
      path: "/Repositories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: (Array<Schemas.RepositoryInfo> | Array<Schemas.RepositoryInfo> | Array<Schemas.RepositoryInfo>),
401: unknown,
403: unknown,
503: unknown,
},
      responseHeaders: {503: { "Retry-After": number, Message: string },
},
    }
export type post_SetRepositories = {
      method: "POST",
      path: "/Repositories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Array<Schemas.RepositoryInfo>,
          }
      responses: {204: unknown,
401: unknown,
403: unknown,
503: unknown,
},
      responseHeaders: {503: { "Retry-After": number, Message: string },
},
    }
export type get_GetSystemInfo = {
      method: "GET",
      path: "/System/Info",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: (Schemas.SystemInfo | Schemas.SystemInfo | Schemas.SystemInfo),
401: unknown,
403: (Schemas.ProblemDetails | Schemas.ProblemDetails | Schemas.ProblemDetails),
503: unknown,
},
      responseHeaders: {503: { "Retry-After": number, Message: string },
},
    }
export type get_GetUsers = {
      method: "GET",
      path: "/Users",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ isHidden: boolean, isDisabled: boolean }>,
        
        
        
        
          }
      responses: {200: (Array<Schemas.UserDto> | Array<Schemas.UserDto> | Array<Schemas.UserDto>),
401: unknown,
403: unknown,
503: unknown,
},
      responseHeaders: {503: { "Retry-After": number, Message: string },
},
    }

  // </Endpoints>
  }
  
  
     // <EndpointByMethod>
     export type EndpointByMethod = {
     post: {
           "/Packages/Installed/{name}": Endpoints.post_InstallPackage,
"/Repositories": Endpoints.post_SetRepositories
         },
get: {
           "/Repositories": Endpoints.get_GetRepositories,
"/System/Info": Endpoints.get_GetSystemInfo,
"/Users": Endpoints.get_GetUsers
         }
     }
     
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type PostEndpoints = EndpointByMethod["post"]
export type GetEndpoints = EndpointByMethod["get"]
    // </EndpointByMethod.Shorthands>
    