
  export namespace Schemas {
    // <Schemas>
  export type User = Partial<{ id: number, username: string }>
export type ApiKey = Partial<{ id: number, name: string, createdAt: string, lastUsedAt: (string | null) }>
export type ClientApiKey = Partial<{
  id: number;
  /**
   * Name of the client application
   */
  clientName: string;
  /**
   * ID of the qBittorrent instance
   */
  instanceId: number;
  /**
   * Name of the qBittorrent instance
   */
  instanceName: string;
  createdAt: string;
  lastUsedAt: (string | null);
}>
export type CrossSeedWebhookMatch = Partial<{
  instanceId: number;
  instanceName: string;
  torrentHash: string;
  torrentName: string;
  /**
   * Type of match - metadata (no size check), exact (size < 0.1% diff), or size (within tolerance)
   */
  matchType: ("metadata" | "exact" | "size");
  /**
   * Size difference percentage (only present if size was provided)
   */
  sizeDiff: number;
  /**
   * Torrent completion ratio (0.0-1.0). Values below 1.0 indicate the match is still downloading.
   */
  progress: number;
}>
export type CrossSeedWebhookCheckResponse = Partial<{
  /**
   * True only when at least one matching torrent is fully downloaded (progress 1.0). Pending-only matches return HTTP 202 with recommendation "download" while canCrossSeed remains false so clients rely on status and progress.
   */
  canCrossSeed: boolean;
  matches: Array<CrossSeedWebhookMatch>;
  /**
   * Recommendation - "download" if matches were found (ready or pending) or "skip" if no matches
   */
  recommendation: ("download" | "skip");
}>
/**
 * Maps remote paths to local paths for external program execution
 */
export type PathMapping = Partial<{
  /**
   * Remote path prefix to match (e.g., "/mnt/remote-storage/downloads")
   */
  from: string;
  /**
   * Local path prefix to replace with (e.g., "/home/user/downloads")
   */
  to: string;
}>
export type ExternalProgram = Partial<{
  id: number;
  /**
   * Display name for the external program
   */
  name: string;
  /**
   * Path to the executable
   */
  path: string;
  /**
   * Arguments template with variable substitution
   */
  args_template: string;
  /**
   * Whether this program is enabled
   */
  enabled: boolean;
  /**
   * Whether to launch in a terminal window
   */
  use_terminal: boolean;
  /**
   * Path mappings to convert remote paths to local paths for remote instances
   */
  path_mappings: Array<PathMapping>;
  created_at: string;
  updated_at: string;
}>
export type NotificationEventDefinition = Partial<{
  /**
   * Notification event identifier
   */
  type: string;
  /**
   * Human-readable event label
   */
  label: string;
  /**
   * Event description
   */
  description: string;
}>
export type NotificationTarget = Partial<{
  id: number;
  name: string;
  url: string;
  enabled: boolean;
  /**
   * List of event types this target subscribes to (empty means all events)
   */
  eventTypes: Array<string>;
  createdAt: string;
  updatedAt: string;
}>
export type NotificationTargetRequest = {
  name: string;
  url: string;
  enabled?: boolean;
  /**
   * List of event types this target subscribes to (empty means all events)
   */
  eventTypes?: Array<string>;
}
export type NotificationTestRequest = Partial<{ title: string, message: string }>
export type InstanceError = Partial<{ id: number, instanceId: number, errorType: string, errorMessage: string, occurredAt: string }>
export type Instance = Partial<{
  id: number;
  name: string;
  host: string;
  username: string;
  /**
   * Always masked with asterisks in responses. Only used for input.
   */
  password: string;
  /**
   * True when an API key is configured for this instance.
   */
  hasApiKey: boolean;
  basic_username: (string | null);
  /**
   * Always masked with asterisks in responses. Only used for input.
   */
  basic_password: (string | null);
  isActive: boolean;
  last_connected_at: (string | null);
  created_at: string;
  updated_at: string;
  /**
   * Current connection status
   */
  connected: boolean;
  /**
   * Error message if connection failed
   */
  connectionError: string;
  /**
   * Whether there's a password decryption error
   */
  hasDecryptionError: boolean;
  /**
   * Recent connection/auth/decryption errors for this instance.
   */
  recentErrors: Array<InstanceError>;
  /**
   * Normalized qBittorrent connection status from cached server state, or `disabled` for inactive instances.
   */
  connectionStatus: string;
  /**
   * When true, TLS certificate errors from the upstream qBittorrent instance are ignored.
   */
  tlsSkipVerify: boolean;
  /**
   * When true, qui can access this instance's download paths locally (required for hardlink detection in automations).
   */
  hasLocalFilesystemAccess: boolean;
  /**
   * When true, cross-seed operations use hardlink mode for this instance.
   */
  useHardlinks: boolean;
  /**
   * Base directory for hardlink trees when hardlink mode is enabled.
   */
  hardlinkBaseDir: string;
  /**
   * Directory organization preset for hardlink mode.
   */
  hardlinkDirPreset: ("flat" | "by-tracker" | "by-instance");
  /**
   * When true, cross-seed operations use reflink (copy-on-write) mode for this instance. Mutually exclusive with hardlink mode.
   */
  useReflinks: boolean;
  /**
   * When true, cross-seed falls back to regular mode if reflink/hardlink fails (e.g., cross-filesystem).
   */
  fallbackToRegularMode: boolean;
  /**
   * Display order preference for the instance.
   */
  sortOrder: number;
}>
export type InstanceCapabilities = Partial<{
  /**
   * Whether the instance supports creating torrents via the Web API.
   */
  supportsTorrentCreation: boolean;
  /**
   * Whether the instance supports exporting torrent files via the Web API (requires WebAPI 2.8.11+, qBittorrent 4.5.0+).
   */
  supportsTorrentExport: boolean;
  /**
   * Whether the instance supports replacing tags on torrents.
   */
  supportsSetTags: boolean;
  /**
   * Whether the instance supports setting torrent comments (Web API 2.12.1+, qBittorrent 5.2+).
   */
  supportsSetComment: boolean;
  /**
   * Whether the instance exposes tracker health metadata (unregistered/tracker down states).
   */
  supportsTrackerHealth: boolean;
  /**
   * Whether the instance can edit tracker URLs via the Web API (requires WebAPI 2.2.0+, qBittorrent 4.1.5+).
   */
  supportsTrackerEditing: boolean;
  /**
   * Whether the instance supports renaming torrents (requires WebAPI 2.0.0+, qBittorrent 4.1.0+).
   */
  supportsRenameTorrent: boolean;
  /**
   * Whether the instance supports renaming files within torrents (requires WebAPI 2.4.0+, qBittorrent 4.2.1+).
   */
  supportsRenameFile: boolean;
  /**
   * Whether the instance supports renaming folders within torrents (requires WebAPI 2.7.0+, qBittorrent 4.3.3+).
   */
  supportsRenameFolder: boolean;
  /**
   * Whether the instance supports updating torrent file priorities (requires WebAPI 2.2.0+, qBittorrent 4.1.5+).
   */
  supportsFilePriority: boolean;
  /**
   * Whether the instance supports nested torrent categories (requires WebAPI 2.9.0+, qBittorrent 4.6.0+).
   */
  supportsSubcategories: boolean;
  /**
   * Whether nested torrent categories are always enabled by qBittorrent (WebAPI 2.15.0+).
   */
  subcategoriesAlwaysEnabled: boolean;
  /**
   * Whether extended per-torrent share limits are available (Web API 2.15.1+; ratio, seeding time, inactive seeding, and share-limit action).
   */
  supportsShareLimitsAction: boolean;
  /**
   * Whether setShareLimits accepts ShareLimitsMode (MatchAny / MatchAll); requires Web API 2.16.0+.
   */
  supportsShareLimitsMode: boolean;
  /**
   * Reported qBittorrent Web API version for the instance.
   */
  webAPIVersion: (string | null);
}>
export type TransferInfo = Partial<{ connection_status: string, dht_nodes: number, dl_info_data: number, dl_info_speed: number, dl_rate_limit: number, up_info_data: number, up_info_speed: number, up_rate_limit: number }>
export type Torrent = Partial<{ hash: string, name: string, size: number, progress: number, dlSpeed: number, upSpeed: number, priority: number, numSeeds: number, numLeechs: number, ratio: number, eta: number, state: string, category: string, tags: Array<string>, addedOn: number, completedOn: number, savePath: string }>
export type TorrentProperties = Partial<{ totalDownloaded: number, totalUploaded: number, downloadSpeed: number, uploadSpeed: number, eta: number, seedsActual: number, peersActual: number, shareRatio: number, uploadLimit: number, downloadLimit: number, totalSize: number, completedSize: number, additionDate: number, completionDate: number, createdBy: string, comment: string }>
export type Tracker = Partial<{ url: string, status: number, tier: number, numPeers: number, numSeeds: number, numLeeches: number, msg: string }>
export type WebSeed = {
  /**
   * HTTP source URL for the torrent
   */
  url: string;
}
export type TorrentFile = Partial<{ name: string, size: number, progress: number, priority: number, isSeed: boolean, availability: number }>
export type TorrentFileMediaInfoField = { name: string, value: string }
export type TorrentFileMediaInfoStream = {
  /**
   * Stream kind (General, Video, Audio, Text, etc.)
   */
  kind: string;
  fields: Array<TorrentFileMediaInfoField>;
}
export type TorrentFileMediaInfoResponse = {
  fileIndex: number;
  /**
   * Torrent-relative path from qBittorrent file list
   */
  relativePath: string;
  streams: Array<TorrentFileMediaInfoStream>;
  /**
   * Raw MediaInfo JSON output
   */
  rawJSON: string;
}
export type ContentPathMediaInfoResponse = {
  /**
   * Normalized instance-relative file path that was analyzed
   */
  contentPath: string;
  /**
   * Human-readable MediaInfo text summary
   */
  summaryTxt: string;
  /**
   * Parsed MediaInfo JSON output
   */
  mediaInfoJson: Record<string, unknown>;
}
export type DuplicateTorrentMatch = Partial<{
  /**
   * Primary torrent hash
   */
  hash: string;
  /**
   * Legacy v1 infohash if available
   */
  infohash_v1: (string | null);
  /**
   * v2 infohash if available
   */
  infohash_v2: (string | null);
  /**
   * Name of the existing torrent that matched
   */
  name: string;
  /**
   * Hashes from the request that matched this torrent
   */
  matched_hashes: Array<string>;
}>
export type Category = Partial<{ name: string, savePath: string }>
/**
 * Log configuration settings
 */
export type LogSettings = {
  /**
   * Log level
   */
  level: ("trace" | "debug" | "info" | "warn" | "error");
  /**
   * Path to log file (empty for stdout only)
   */
  path: string;
  /**
   * Maximum size of log file in megabytes before rotation
   */
  maxSize: number;
  /**
   * Number of old log files to keep (0 for unlimited)
   */
  maxBackups: number;
  /**
   * Path to the active config file being modified
   */
  configPath?: string;
  /**
   * Map of field names to lock source (environment or cli) if locked
   */
  locked?: Record<string, string>;
}
/**
 * Request to update log settings
 */
export type LogSettingsUpdate = Partial<{
  /**
   * Log level to set
   */
  level: ("trace" | "debug" | "info" | "warn" | "error");
  /**
   * Path to log file
   */
  path: string;
  /**
   * Maximum log file size in MB
   */
  maxSize: number;
  /**
   * Number of backup files to keep
   */
  maxBackups: number;
}>
/**
 * A log file available for download
 */
export type LogFile = {
  /**
   * Log file name
   */
  name: string;
  /**
   * File size in bytes
   */
  sizeBytes: number;
  /**
   * Last modification time
   */
  modTime: string;
}
/**
 * Muted log message patterns
 */
export type LogExclusions = {
  /**
   * Record ID
   */
  id: number;
  /**
   * List of log message patterns to hide
   */
  patterns: Array<string>;
  /**
   * When the record was created
   */
  createdAt: string;
  /**
   * When the record was last updated
   */
  updatedAt: string;
}
/**
 * Request to update log exclusions
 */
export type LogExclusionsInput = {
  /**
   * List of log message patterns to hide
   */
  patterns: Array<string>;
}
/**
 * Information about the latest available version when an update is available
 */
export type LatestVersionResponse = {
  /**
   * The version tag (e.g., "v1.2.3")
   */
  tag_name: string;
  /**
   * The release name/title
   */
  name?: (string | null);
  /**
   * URL to the GitHub release page
   */
  html_url: string;
  /**
   * When the release was published
   */
  published_at: string;
}
/**
 * The version qui is currently running and whether a newer release is available
 */
export type VersionResponse = {
  /**
   * The version qui is currently running
   */
  version: string;
  /**
   * The latest available release tag. Present only when a newer release than the running version has been detected.
   */
  latestVersion?: string;
  /**
   * Whether a newer release than the running version is available
   */
  updateAvailable: boolean;
}
/**
 * qBittorrent build information
 */
export type QBittorrentBuildInfo = Partial<{
  /**
   * Qt framework version
   */
  qt: string;
  /**
   * libtorrent library version
   */
  libtorrent: string;
  /**
   * Boost library version
   */
  boost: string;
  /**
   * OpenSSL library version
   */
  openssl: string;
  /**
   * zlib library version
   */
  zlib: string;
  /**
   * Architecture bitness (32 or 64)
   */
  bitness: number;
  /**
   * Operating system platform
   */
  platform: string;
}>
/**
 * qBittorrent process information
 */
export type QBittorrentProcessInfo = Partial<{
  /**
   * Process launch time as UTC epoch seconds
   */
  launchTime: number;
}>
/**
 * qBittorrent application information
 */
export type QBittorrentAppInfo = {
  /**
   * qBittorrent version
   */
  version: string;
  /**
   * qBittorrent Web API version
   */
  webAPIVersion?: string;
  buildInfo?: QBittorrentBuildInfo;
  processInfo?: QBittorrentProcessInfo;
}
export type CrossSeedInstanceResult = Partial<{ instance_id: number, instance_name: string, success: boolean, status: string, message: (string | null) }>
export type CrossSeedRunResult = Partial<{ instanceId: number, instanceName: string, indexerName: (string | null), success: boolean, status: string, message: (string | null), matchedTorrentHash: (string | null), matchedTorrentName: (string | null) }>
export type CrossSeedRun = Partial<{ id: number, triggeredBy: string, mode: ("auto" | "manual"), status: ("pending" | "running" | "success" | "partial" | "failed"), startedAt: string, completedAt: (string | null), totalFeedItems: number, candidatesFound: number, torrentsAdded: number, torrentsFailed: number, torrentsSkipped: number, message: (string | null), errorMessage: (string | null), results: Array<CrossSeedRunResult> }>
export type CrossSeedBlocklistEntry = Partial<{ instanceId: number, infoHash: string, note: string, createdAt: string }>
export type CrossSeedBlocklistRequest = { instanceId: number, infoHash: string, note?: string }
/**
 * Per-instance cross-seed completion settings
 */
export type InstanceCrossSeedCompletionSettings = Partial<{
  /**
   * qBittorrent instance ID
   */
  instanceId: number;
  /**
   * Whether automatic cross-seed search is enabled for this instance
   */
  enabled: boolean;
  /**
   * Only trigger for torrents in these categories (empty means all)
   */
  categories: Array<string>;
  /**
   * Require at least one matching tag (empty means all)
   */
  tags: Array<string>;
  /**
   * Skip torrents in these categories
   */
  excludeCategories: Array<string>;
  /**
   * Skip torrents with any of these tags
   */
  excludeTags: Array<string>;
  /**
   * Limit completion searches to these Torznab indexer IDs (empty means all)
   */
  indexerIds: Array<number>;
  /**
   * When true, completion searches for this instance bypass the Torznab search cache and always perform a fresh search. Default false.
   */
  bypassTorznabCache: boolean;
  /**
   * Seconds to wait after a torrent completes before starting the cross-seed search. 0 disables the delay.
   */
  delaySeconds: number;
}>
/**
 * Request body for updating per-instance completion settings
 */
export type InstanceCrossSeedCompletionSettingsRequest = Partial<{
  /**
   * Whether automatic cross-seed search is enabled for this instance
   */
  enabled: boolean;
  /**
   * Only trigger for torrents in these categories (empty means all)
   */
  categories: Array<string>;
  /**
   * Require at least one matching tag (empty means all)
   */
  tags: Array<string>;
  /**
   * Skip torrents in these categories
   */
  excludeCategories: Array<string>;
  /**
   * Skip torrents with any of these tags
   */
  excludeTags: Array<string>;
  /**
   * Limit completion searches to these Torznab indexer IDs (empty means all)
   */
  indexerIds: Array<number>;
  /**
   * When true, completion searches for this instance bypass the Torznab search cache and always perform a fresh search. Default false.
   */
  bypassTorznabCache: boolean;
  /**
   * Seconds to wait after a torrent completes before starting the cross-seed search. 0 disables the delay.
   */
  delaySeconds: number;
}>
export type SeasonPackCategoryRule = {
  /**
   * Canonical lowercase release resolution to match (e.g. "1080p", "2160p").
   */
  resolution: string;
  /**
   * Canonical uppercase release source to match (WEB, BLURAY, REMUX, HDTV). Empty matches any source.
   */
  source?: ("" | "WEB" | "BLURAY" | "REMUX" | "HDTV");
  /**
   * qBittorrent category to file matching season-pack injections under.
   */
  category: string;
}
export type CrossSeedAutomationSettingsPatch = Partial<{
  enabled: boolean;
  /**
   * Enable Gazelle matching for OPS/RED torrents
   */
  gazelleEnabled: boolean;
  /**
   * Redacted (RED) API key. Responses may return a redacted placeholder instead of the real value.
   */
  redactedApiKey: string;
  /**
   * Orpheus (OPS) API key. Responses may return a redacted placeholder instead of the real value.
   */
  orpheusApiKey: string;
  runIntervalMinutes: number;
  startPaused: boolean;
  category: (string | null);
  tags: Array<string>;
  targetInstanceIds: Array<number>;
  targetIndexerIds: Array<number>;
  /**
   * Deprecated; RSS automation always processes full feeds and ignores this value.
   */
  maxResultsPerRun: number;
  findIndividualEpisodes: boolean;
  sizeMismatchTolerancePercent: number;
  useCategoryFromIndexer: boolean;
  /**
   * Enable category affix (prefix or suffix) for cross-seeded torrents
   */
  useCrossCategoryAffix: boolean;
  /**
   * Whether to add the affix as a prefix or suffix to the category
   */
  categoryAffixMode: ("prefix" | "suffix");
  /**
   * The affix value to add (default ".cross")
   */
  categoryAffix: string;
  /**
   * Use a custom category for all cross-seeds
   */
  useCustomCategory: boolean;
  /**
   * Custom category name when useCustomCategory is true
   */
  customCategory: string;
  runExternalProgramId: (number | null);
  /**
   * Only match against torrents in these categories when processing webhook requests (empty means all)
   */
  webhookSourceCategories: Array<string>;
  /**
   * Only match against torrents with these tags when processing webhook requests (empty means all)
   */
  webhookSourceTags: Array<string>;
  /**
   * Skip torrents in these categories when processing webhook requests
   */
  webhookSourceExcludeCategories: Array<string>;
  /**
   * Skip torrents with any of these tags when processing webhook requests
   */
  webhookSourceExcludeTags: Array<string>;
  /**
   * Skip cross-seed matches that would require a manual recheck (alignment, extra files, or disc layouts like BDMV/VIDEO_TS)
   */
  skipRecheck: boolean;
  /**
   * Enable hardlink mode for cross-seeding (creates hardlinked file trees)
   */
  useHardlinks: boolean;
  /**
   * Base directory for hardlink trees (must be on same filesystem as downloads)
   */
  hardlinkBaseDir: string;
  /**
   * Directory organization preset for hardlink trees
   */
  hardlinkDirPreset: ("flat" | "by-tracker" | "by-instance");
  /**
   * Enable season pack webhook flow
   */
  seasonPackEnabled: boolean;
  seasonPackSkipRepackCompare: boolean;
  seasonPackSimplifyHdrCompare: boolean;
  seasonPackSimplifyWebCompare: boolean;
  seasonPackSkipYearCompare: boolean;
  /**
   * Minimum local coverage ratio (0..1, default 0.75) before injecting a season pack. Uses episode totals from Sonarr, TVDB, or TVMaze when available, otherwise playable files in the pack.
   */
  seasonPackCoverageThreshold: number;
  /**
   * Tags applied to season-pack injections
   */
  seasonPackTags: Array<string>;
  /**
   * Fixed qBittorrent category for season-pack injections. Empty uses the global category mode.
   */
  seasonPackCategory: string;
  /**
   * Per-quality routing rules that pick a category by release resolution and source. seasonPackCategory is the fallback when no rule matches.
   */
  seasonPackCategoryRules: Array<SeasonPackCategoryRule>;
  /**
   * TVDB API key for season pack metadata resolution. Redacted in API responses.
   */
  seasonPackTvdbApiKey: string;
  /**
   * TVDB subscriber PIN for season pack metadata resolution. Redacted in API responses.
   */
  seasonPackTvdbPin: string;
}>
export type CrossSeedAutomationSettings = Partial<{
  enabled: boolean;
  /**
   * Enable Gazelle matching for OPS/RED torrents
   */
  gazelleEnabled: boolean;
  /**
   * Redacted (RED) API key. Responses may return a redacted placeholder instead of the real value.
   */
  redactedApiKey: string;
  /**
   * Orpheus (OPS) API key. Responses may return a redacted placeholder instead of the real value.
   */
  orpheusApiKey: string;
  runIntervalMinutes: number;
  startPaused: boolean;
  category: (string | null);
  tags: Array<string>;
  targetInstanceIds: Array<number>;
  targetIndexerIds: Array<number>;
  /**
   * Deprecated; RSS automation always processes full feeds and ignores this value.
   */
  maxResultsPerRun: number;
  findIndividualEpisodes: boolean;
  sizeMismatchTolerancePercent: number;
  useCategoryFromIndexer: boolean;
  /**
   * Enable category affix (prefix or suffix) for cross-seeded torrents
   */
  useCrossCategoryAffix: boolean;
  /**
   * Whether to add the affix as a prefix or suffix to the category
   */
  categoryAffixMode: ("prefix" | "suffix");
  /**
   * The affix value to add (default ".cross")
   */
  categoryAffix: string;
  /**
   * Use a custom category for all cross-seeds
   */
  useCustomCategory: boolean;
  /**
   * Custom category name when useCustomCategory is true
   */
  customCategory: string;
  runExternalProgramId: (number | null);
  /**
   * Only match against torrents in these categories when processing webhook requests (empty means all)
   */
  webhookSourceCategories: Array<string>;
  /**
   * Only match against torrents with these tags when processing webhook requests (empty means all)
   */
  webhookSourceTags: Array<string>;
  /**
   * Skip torrents in these categories when processing webhook requests
   */
  webhookSourceExcludeCategories: Array<string>;
  /**
   * Skip torrents with any of these tags when processing webhook requests
   */
  webhookSourceExcludeTags: Array<string>;
  /**
   * Skip cross-seed matches that would require a manual recheck (alignment, extra files, or disc layouts like BDMV/VIDEO_TS)
   */
  skipRecheck: boolean;
  /**
   * Enable hardlink mode for cross-seeding (creates hardlinked file trees)
   */
  useHardlinks: boolean;
  /**
   * Base directory for hardlink trees (must be on same filesystem as downloads)
   */
  hardlinkBaseDir: string;
  /**
   * Directory organization preset for hardlink trees
   */
  hardlinkDirPreset: ("flat" | "by-tracker" | "by-instance");
  /**
   * Enable season pack webhook flow
   */
  seasonPackEnabled: boolean;
  seasonPackSkipRepackCompare: boolean;
  seasonPackSimplifyHdrCompare: boolean;
  seasonPackSimplifyWebCompare: boolean;
  seasonPackSkipYearCompare: boolean;
  /**
   * Minimum local coverage ratio (0..1, default 0.75) before injecting a season pack. Uses episode totals from Sonarr, TVDB, or TVMaze when available, otherwise playable files in the pack.
   */
  seasonPackCoverageThreshold: number;
  /**
   * Tags applied to season-pack injections
   */
  seasonPackTags: Array<string>;
  /**
   * Fixed qBittorrent category for season-pack injections. Empty uses the global category mode.
   */
  seasonPackCategory: string;
  /**
   * Per-quality routing rules that pick a category by release resolution and source. seasonPackCategory is the fallback when no rule matches.
   */
  seasonPackCategoryRules: Array<SeasonPackCategoryRule>;
  /**
   * TVDB API key for season pack metadata resolution. Redacted in API responses.
   */
  seasonPackTvdbApiKey: string;
  /**
   * TVDB subscriber PIN for season pack metadata resolution. Redacted in API responses.
   */
  seasonPackTvdbPin: string;
  createdAt: string;
  updatedAt: string;
}>
export type CrossSeedAutomationStatus = Partial<{ settings: CrossSeedAutomationSettings, lastRun: CrossSeedRun, nextRunAt: (string | null), running: boolean }>
export type SeasonPackCheckRequest = {
  /**
   * Season pack release name
   */
  torrentName: string;
  /**
   * Optional base64-encoded torrent file. When omitted, coverage uses metadata providers (TVDB/TVMaze) instead of the torrent file contents.
   */
  torrentData?: string;
  /**
   * Optional list of instance IDs to check (empty means all)
   */
  instanceIds?: Array<number>;
  /**
   * Optional indexer identifier
   */
  indexer?: string;
}
export type SeasonPackCheckMatch = Partial<{
  instanceId: number;
  matchedEpisodes: number;
  /**
   * Coverage denominator: episode total from Sonarr, TVDB, or TVMaze when available, otherwise playable files in the pack
   */
  totalEpisodes: number;
  coverage: number;
}>
export type SeasonPackCheckResponse = Partial<{
  /**
   * Whether enough local data exists to inject the season pack
   */
  ready: boolean;
  /**
   * Machine-readable reason code
   */
  reason: string;
  /**
   * Human-readable explanation
   */
  message: string;
  /**
   * True when coverage threshold was not enforced because no episode total was available. The check only verified that matching episodes exist.
   */
  thresholdSkipped: boolean;
  matches: Array<SeasonPackCheckMatch>;
}>
export type SeasonPackApplyRequest = {
  /**
   * Season pack release name
   */
  torrentName: string;
  /**
   * Base64-encoded torrent file
   */
  torrentData: string;
  /**
   * Optional list of instance IDs to target (empty means all)
   */
  instanceIds?: Array<number>;
  /**
   * Optional indexer identifier
   */
  indexer?: string;
}
export type SeasonPackApplyResponse = Partial<{
  /**
   * Whether the season pack was added to qBittorrent
   */
  applied: boolean;
  /**
   * Machine-readable reason code
   */
  reason: string;
  /**
   * Human-readable explanation
   */
  message: string;
  /**
   * Instance the torrent was added to
   */
  instanceId: number;
  matchedEpisodes: number;
  /**
   * Coverage denominator used for the winning match
   */
  totalEpisodes: number;
  coverage: number;
  /**
   * Link strategy used (hardlink, reflink, etc.)
   */
  linkMode: string;
}>
export type SeasonPackRun = Partial<{
  id: number;
  torrentName: string;
  /**
   * Processing phase (check or apply)
   */
  phase: string;
  /**
   * Outcome status
   */
  status: string;
  reason: string;
  message: string;
  instanceId: (number | null);
  matchedEpisodes: number;
  totalEpisodes: number;
  coverage: number;
  linkMode: string;
  createdAt: string;
}>
export type CrossSeedSearchSettingsPatch = Partial<{ instanceId: (number | null), categories: Array<string>, tags: Array<string>, indexerIds: Array<number>, intervalSeconds: number, cooldownMinutes: number }>
export type CrossSeedSearchSettings = Partial<{ instanceId: (number | null), categories: Array<string>, tags: Array<string>, indexerIds: Array<number>, intervalSeconds: number, cooldownMinutes: number, createdAt: string, updatedAt: string }>
export type CrossSeedSearchResultStatus = ("added" | "skipped" | "failed")
export type CrossSeedSearchRunStatus = ("running" | "success" | "failed" | "canceled")
export type CrossSeedSearchFilters = Partial<{ categories: Array<string>, tags: Array<string> }>
export type CrossSeedSearchResult = Partial<{ torrentHash: string, torrentName: string, indexerName: string, releaseTitle: string, status: CrossSeedSearchResultStatus, message: string, processedAt: string }>
export type CrossSeedSearchRun = Partial<{ id: number, instanceId: number, status: CrossSeedSearchRunStatus, startedAt: string, completedAt: (string | null), totalTorrents: number, processed: number, torrentsAdded: number, torrentsFailed: number, torrentsSkipped: number, message: (string | null), errorMessage: (string | null), filters: CrossSeedSearchFilters, indexerIds: Array<number>, intervalSeconds: number, cooldownMinutes: number, results: Array<CrossSeedSearchResult>, createdAt: string }>
export type CrossSeedSearchCandidate = Partial<{ torrentHash: string, torrentName: string, category: string, tags: Array<string> }>
export type CrossSeedSearchStatus = Partial<{ running: boolean, run: CrossSeedSearchRun, currentTorrent: CrossSeedSearchCandidate, recentResults: Array<CrossSeedSearchResult>, nextRunAt: (string | null), effectiveIntervalSeconds: number }>
export type CrossSeedRunRequest = Partial<{ dryRun: boolean }>
export type CrossSeedTorrentInfo = Partial<{
  instance_id: (number | null);
  instance_name: (string | null);
  hash: (string | null);
  name: string;
  category: (string | null);
  size: (number | null);
  progress: (number | null);
  total_files: (number | null);
  matching_files: (number | null);
  file_count: (number | null);
  content_type: (string | null);
  search_type: (string | null);
  search_categories: Array<number>;
  required_caps: Array<string>;
  available_indexers: Array<number>;
  filtered_indexers: Array<number>;
  excluded_indexers: Record<string, string>;
  content_matches: Array<string>;
  content_filtering_completed: (boolean | null);
  /**
   * True if this torrent contains disc-based media (Blu-ray/DVD)
   */
  disc_layout: boolean;
  /**
   * The marker directory name (e.g., "BDMV" or "VIDEO_TS") if disc_layout is true
   */
  disc_marker: string;
}>
export type AsyncIndexerFilteringState = Partial<{ capabilities_completed: boolean, content_completed: boolean, capability_indexers: Array<number>, filtered_indexers: Array<number>, excluded_indexers: Record<string, string>, content_matches: Array<string>, error: string }>
export type CrossSeedTorrentSearchRequest = Partial<{ query: string, limit: number, indexer_ids: Array<number> }>
export type CrossSeedTorrentSearchResult = Partial<{ indexer: string, indexer_id: number, title: string, download_url: string, info_url: (string | null), size: number, seeders: number, leechers: number, category_id: number, category_name: string, publish_date: string, download_volume_factor: number, upload_volume_factor: number, guid: string, infohash_v1: (string | null), infohash_v2: (string | null), imdb_id: (string | null), tvdb_id: (string | null), match_reason: (string | null), match_score: number }>
export type CrossSeedResponse = Partial<{ success: boolean, results: Array<CrossSeedInstanceResult>, torrentInfo: CrossSeedTorrentInfo }>
export type CrossSeedTorrentSearchResponse = Partial<{ source_torrent: CrossSeedTorrentInfo, results: Array<CrossSeedTorrentSearchResult> }>
export type CrossSeedApplySelection = { indexer_id: number, indexer: string, download_url: string, title: string, guid?: (string | null) }
export type CrossSeedApplyRequest = { selections: Array<CrossSeedApplySelection>, use_tag: boolean, tag_name?: (string | null), start_paused?: (boolean | null) }
export type CrossSeedApplyResult = Partial<{ title: string, indexer: string, torrent_name: (string | null), info_hash: (string | null), success: boolean, instance_results: Array<CrossSeedInstanceResult>, error: (string | null) }>
export type CrossSeedApplyResponse = Partial<{ results: Array<CrossSeedApplyResult> }>
/**
 * A torrent that matches another torrent for cross-seeding purposes
 */
export type LocalCrossSeedMatch = Partial<{
  /**
   * The qBittorrent instance ID containing this torrent
   */
  instanceId: number;
  /**
   * The name of the qBittorrent instance
   */
  instanceName: string;
  /**
   * Torrent info hash
   */
  hash: string;
  /**
   * Torrent name
   */
  name: string;
  /**
   * Total size in bytes
   */
  size: number;
  /**
   * Download progress (0-1)
   */
  progress: number;
  /**
   * Save path on disk
   */
  savePath: string;
  /**
   * Content path on disk
   */
  contentPath: string;
  /**
   * Torrent category
   */
  category: string;
  /**
   * Comma-separated torrent tags
   */
  tags: string;
  /**
   * Torrent state
   */
  state: string;
  /**
   * Primary tracker URL
   */
  tracker: string;
  /**
   * Tracker health status (only present if unhealthy)
   */
  trackerHealth: ("unregistered" | "tracker_down" | "tracker_error");
  /**
   * How this torrent was matched
   */
  matchType: ("content_path" | "name" | "release");
}>
export type CategorySnapshot = Partial<{ savePath: string }>
export type BackupRun = Partial<{ id: number, instanceId: number, kind: ("manual" | "hourly" | "daily" | "weekly" | "monthly"), status: ("pending" | "running" | "success" | "failed" | "canceled"), requestedBy: string, requestedAt: string, startedAt: (string | null), completedAt: (string | null), archivePath: (string | null), manifestPath: (string | null), totalBytes: number, torrentCount: number, categoryCounts: (Record<string, number> | null), errorMessage: (string | null), categories: (Record<string, CategorySnapshot> | null), tags: (Array<string> | null) }>
export type OrphanScanSettings = Partial<{
  id: number;
  instanceId: number;
  /**
   * Whether scheduled orphan scanning is enabled
   */
  enabled: boolean;
  /**
   * Skip files modified within this many minutes
   */
  gracePeriodMinutes: number;
  /**
   * Absolute paths to exclude from scanning
   */
  ignorePaths: Array<string>;
  /**
   * Hours between scheduled scans
   */
  scanIntervalHours: number;
  /**
   * Sorting applied to the orphan preview list
   */
  previewSort: ("size_desc" | "directory_size_desc");
  /**
   * Maximum orphan files to record per run (prevents DB bloat)
   */
  maxFilesPerRun: number;
  createdAt: string;
  updatedAt: string;
}>
export type OrphanScanSettingsUpdate = Partial<{ enabled: boolean, gracePeriodMinutes: number, ignorePaths: Array<string>, scanIntervalHours: number, previewSort: ("size_desc" | "directory_size_desc"), maxFilesPerRun: number }>
export type OrphanScanRun = Partial<{
  id: number;
  instanceId: number;
  status: ("pending" | "scanning" | "preview_ready" | "deleting" | "completed" | "failed" | "canceled");
  triggeredBy: ("manual" | "scheduled");
  /**
   * Directories that were scanned (derived from torrent SavePath values)
   */
  scanPaths: Array<string>;
  /**
   * Number of orphan files found
   */
  filesFound: number;
  /**
   * Number of files deleted (after confirmation)
   */
  filesDeleted: number;
  /**
   * Number of empty folders deleted
   */
  foldersDeleted: number;
  /**
   * Total bytes freed
   */
  bytesReclaimed: number;
  /**
   * True if max_files_per_run was reached and more orphans may exist
   */
  truncated: boolean;
  errorMessage: (string | null);
  startedAt: string;
  completedAt: (string | null);
}>
export type OrphanScanFile = Partial<{
  id: number;
  runId: number;
  /**
   * Absolute path to the orphan file
   */
  filePath: string;
  /**
   * File size in bytes
   */
  fileSize: number;
  modifiedAt: (string | null);
  status: ("pending" | "deleted" | "skipped" | "failed");
  errorMessage: (string | null);
}>
export type OrphanScanRunWithFiles = (OrphanScanRun & Partial<{ files: Array<OrphanScanFile> }>)
export type ArrInstance = Partial<{ id: number, type: ("sonarr" | "radarr"), name: string, base_url: string, basic_username: (string | null), enabled: boolean, priority: number, timeout_seconds: number, last_test_at: (string | null), last_test_status: ("unknown" | "ok" | "error"), last_test_error: (string | null), created_at: string, updated_at: string }>
export type ArrInstanceCreate = {
  type: ("sonarr" | "radarr");
  name: string;
  base_url: string;
  api_key: string;
  /**
   * Optional HTTP basic auth username for reverse proxies
   */
  basic_username?: string;
  /**
   * Optional HTTP basic auth password for reverse proxies
   */
  basic_password?: string;
  enabled?: boolean;
  priority?: number;
  timeout_seconds?: number;
}
export type ArrInstanceUpdate = Partial<{
  name: string;
  base_url: string;
  /**
   * Only update if provided
   */
  api_key: string;
  /**
   * Optional HTTP basic auth username for reverse proxies (empty string clears)
   */
  basic_username: string;
  /**
   * Optional HTTP basic auth password for reverse proxies
   */
  basic_password: string;
  enabled: boolean;
  priority: number;
  timeout_seconds: number;
}>
export type ArrTestConnectionRequest = {
  type: ("sonarr" | "radarr");
  base_url: string;
  api_key: string;
  /**
   * Optional HTTP basic auth username for reverse proxies
   */
  basic_username?: string;
  /**
   * Optional HTTP basic auth password for reverse proxies
   */
  basic_password?: string;
}
export type ArrTestResponse = Partial<{ success: boolean, error: (string | null) }>
export type ArrResolveRequest = { title: string, content_type: ("movie" | "tv") }
export type ArrExternalIDs = Partial<{ imdb_id: string, tmdb_id: number, tvdb_id: number, tvmaze_id: number }>
export type ArrIDCacheEntry = Partial<{ id: number, title_hash: string, content_type: string, arr_instance_id: (number | null), external_ids: ArrExternalIDs, titles: Array<string>, has_titles: boolean, is_negative: boolean, cached_at: string, expires_at: string }>
export type ArrInstanceResult = Partial<{ instance_id: number, instance_name: string, instance_type: string, ids: ArrExternalIDs, error: (string | null) }>
export type ArrResolveResponse = Partial<{ title: string, title_hash: string, content_type: ("movie" | "tv"), cache_hit: boolean, cache_entry: ArrIDCacheEntry, instances_available: number, instance_results: Array<ArrInstanceResult>, error: (string | null) }>
export type DirScanMatchMode = ("strict" | "flexible")
export type DirScanFileStatus = ("pending" | "matched" | "no_match" | "error" | "already_seeding" | "in_qbittorrent")
export type DirScanRunStatus = ("queued" | "scanning" | "searching" | "injecting" | "success" | "failed" | "canceled")
export type DirScanSettings = {
  id: number;
  enabled: boolean;
  matchMode: DirScanMatchMode;
  sizeTolerancePercent: number;
  /**
   * Minimum percent of torrent pieces that must already exist on disk for partial matches
   */
  minPieceRatio: number;
  /**
   * Maximum eligible searchees to process per scan run (0 = unlimited)
   */
  maxSearcheesPerRun: number;
  /**
   * Skip searchees older than this many days using file modification time (0 = disabled)
   */
  maxSearcheeAgeDays: number;
  allowPartial: boolean;
  skipPieceBoundarySafetyCheck: boolean;
  startPaused: boolean;
  downloadMissingFiles: boolean;
  category: string;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
}
export type DirScanSettingsPatch = Partial<{ enabled: boolean, matchMode: DirScanMatchMode, sizeTolerancePercent: number, minPieceRatio: number, maxSearcheesPerRun: number, maxSearcheeAgeDays: number, allowPartial: boolean, skipPieceBoundarySafetyCheck: boolean, startPaused: boolean, downloadMissingFiles: boolean, category: string, tags: Array<string> }>
export type DirScanDirectory = { id: number, path: string, qbitPathPrefix?: (string | null), category?: (string | null), tags: Array<string>, allowedDownloadClients: Array<string>, enabled: boolean, arrInstanceId?: (number | null), targetInstanceId: number, scanIntervalMinutes: number, lastScanAt?: (string | null), createdAt: string, updatedAt: string }
export type DirScanDirectoryCreate = { path: string, qbitPathPrefix?: string, category?: string, tags?: Array<string>, allowedDownloadClients?: Array<string>, enabled?: boolean, arrInstanceId?: (number | null), targetInstanceId: number, scanIntervalMinutes?: number }
export type DirScanDirectoryPatch = Partial<{
  path: string;
  qbitPathPrefix: string;
  category: string;
  tags: Array<string>;
  allowedDownloadClients: Array<string>;
  enabled: boolean;
  /**
   * Set to -1 to clear
   */
  arrInstanceId: number;
  targetInstanceId: number;
  scanIntervalMinutes: number;
}>
export type DirScanRun = {
  id: number;
  directoryId: number;
  status: DirScanRunStatus;
  triggeredBy: string;
  /**
   * Effective scan root for the run. Empty when the run scanned the configured directory path.
   */
  scanRoot?: string;
  filesFound: number;
  filesSkipped: number;
  matchesFound: number;
  torrentsAdded: number;
  errorMessage?: (string | null);
  startedAt: string;
  completedAt?: (string | null);
}
export type DirScanRunInjectionStatus = ("added" | "failed")
export type DirScanRunInjection = { id: number, runId: number, directoryId: number, status: DirScanRunInjectionStatus, searcheeName: string, torrentName: string, infoHash: string, contentType: string, indexerName?: (string | null), trackerDomain?: (string | null), trackerDisplayName?: (string | null), linkMode?: (string | null), savePath?: (string | null), category?: (string | null), tags: Array<string>, errorMessage?: (string | null), createdAt: string }
export type DirScanFile = { id: number, directoryId: number, filePath: string, fileSize: number, fileModTime: string, status: DirScanFileStatus, matchedTorrentHash?: (string | null), matchedIndexerId?: (number | null), lastProcessedAt?: (string | null) }
export type DirScanTriggerResponse = {
  /**
   * Started scan run ID.
   */
  runId: number;
  /**
   * Matched dir-scan directory ID.
   */
  directoryId: number;
  /**
   * Matched dir-scan directory path.
   */
  directoryPath: string;
  /**
   * Effective scan root for this run.
   */
  scanRoot: string;
}
export type DirScanIdleStatus = { status: "idle" }
export type WarningResponse = Partial<{
  /**
   * Warning message about partial success
   */
  warning: string;
}>
export type RSSArticle = Partial<{ id: string, title: string, torrentURL: string, link: string, description: string, date: string, author: string, isRead: boolean }>
export type RSSFeed = Partial<{ url: string, title: string, lastBuildDate: string, isLoading: boolean, hasError: boolean, articles: Array<RSSArticle> }>
/**
 * Map of RSS feeds and folders (recursive structure)
 */
export interface RSSItems { [key: string]: (RSSFeed | RSSItems) }
export type RSSRuleTorrentParams = Partial<{ category: string, tags: Array<string>, save_path: string, download_path: string, content_layout: string, operating_mode: string, skip_checking: boolean, upload_limit: number, download_limit: number, seeding_time_limit: number, inactive_seeding_time_limit: number, share_limit_action: string, ratio_limit: number, stopped: boolean, stop_condition: string, use_auto_tmm: boolean, use_download_path: boolean, add_to_top_of_queue: boolean }>
export type RSSAutoDownloadRule = Partial<{
  enabled: boolean;
  priority: number;
  mustContain: string;
  mustNotContain: string;
  episodeFilter: string;
  useRegex: boolean;
  affectedFeeds: Array<string>;
  ignoreDays: number;
  lastMatch: string;
  smartFilter: boolean;
  previouslyMatchedEpisodes: Array<string>;
  torrentParams: RSSRuleTorrentParams;
  /**
   * Legacy field
   */
  savePath: string;
  /**
   * Legacy field
   */
  assignedCategory: string;
  /**
   * Legacy field
   */
  addPaused: (boolean | null);
}>

    // </Schemas>
    }
  
  export namespace Endpoints {
  // <Endpoints>
  
  /**
 * Create the initial admin user (only available before first user is created)
 */
export type post__api_auth_setup = {
      method: "POST",
      path: "/api/auth/setup",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  username: string;
  /**
   * Password will be hashed and never returned in responses
   */
  password: string;
},
          }
      responses: {201: Partial<{ message: string, user: Schemas.User }>,
400: unknown,
},
      
    }
/**
 * Authenticate with username and password
 */
export type post__api_auth_login = {
      method: "POST",
      path: "/api/auth/login",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  username: string;
  /**
   * Password will be hashed and never returned in responses
   */
  password: string;
},
          }
      responses: {200: Partial<{ message: string, user: Schemas.User }>,
401: unknown,
},
      
    }
/**
 * Check if initial setup is required
 */
export type get__api_auth_checkSetup = {
      method: "GET",
      path: "/api/auth/check-setup",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Partial<{ setupRequired: boolean }>,
},
      
    }
/**
 * End the current session
 */
export type post__api_auth_logout = {
      method: "POST",
      path: "/api/auth/logout",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
},
      
    }
/**
 * Get information about the authenticated user
 */
export type get__api_auth_me = {
      method: "GET",
      path: "/api/auth/me",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.User,
},
      
    }
/**
 * Change the current user's password
 */
export type put__api_auth_changePassword = {
      method: "PUT",
      path: "/api/auth/change-password",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  /**
   * Current password for verification
   */
  currentPassword: string;
  /**
   * New password will be hashed and never returned in responses
   */
  newPassword: string;
},
          }
      responses: {200: unknown,
401: unknown,
},
      
    }
/**
 * Get all API keys for the current user
 */
export type get__api_apiKeys = {
      method: "GET",
      path: "/api/api-keys",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.ApiKey>,
},
      
    }
/**
 * Generate a new API key
 */
export type post__api_apiKeys = {
      method: "POST",
      path: "/api/api-keys",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  /**
   * Descriptive name for the API key
   */
  name: string;
},
          }
      responses: {201: Partial<{
    id: number;
    name: string;
    /**
     * The API key (only shown once)
     */
    key: string;
    createdAt: string;
    message: string;
  }>,
},
      
    }
/**
 * Revoke an API key
 */
export type delete__api_apiKeys_Id = {
      method: "DELETE",
      path: "/api/api-keys/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
404: unknown,
},
      
    }
/**
 * Get all client API keys for external applications
 */
export type get__api_clientApiKeys = {
      method: "GET",
      path: "/api/client-api-keys",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.ClientApiKey>,
},
      
    }
/**
 * Generate a new client API key for external applications
 */
export type post__api_clientApiKeys = {
      method: "POST",
      path: "/api/client-api-keys",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  /**
   * Name of the client application (e.g., "Sonarr")
   */
  clientName: string;
  /**
   * ID of the qBittorrent instance to proxy to
   */
  instanceId: number;
},
          }
      responses: {201: Partial<{
    id: number;
    clientName: string;
    instanceId: number;
    /**
     * The client API key (only shown once)
     */
    key: string;
    createdAt: string;
    message: string;
  }>,
},
      
    }
/**
 * Revoke a client API key
 */
export type delete__api_clientApiKeys_Id = {
      method: "DELETE",
      path: "/api/client-api-keys/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: unknown,
404: unknown,
},
      
    }
/**
 * Get all configured external programs
 */
export type get__api_externalPrograms = {
      method: "GET",
      path: "/api/external-programs",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.ExternalProgram>,
},
      
    }
/**
 * Add a new external program configuration
 */
export type post__api_externalPrograms = {
      method: "POST",
      path: "/api/external-programs",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  /**
   * Display name for the external program
   */
  name: string;
  /**
   * Path to the executable
   */
  path: string;
  /**
   * Arguments template with variable substitution ({hash}, {name}, {save_path}, {content_path}, {category}, {tags}, {state}, {size}, {progress})
   */
  args_template?: string;
  /**
   * Whether this program is enabled
   */
  enabled?: boolean;
  /**
   * Whether to launch in a terminal window
   */
  use_terminal?: boolean;
  /**
   * Path mappings to convert remote paths to local paths (useful for remote instances)
   */
  path_mappings?: Array<Schemas.PathMapping>;
},
          }
      responses: {201: Schemas.ExternalProgram,
409: unknown,
},
      
    }
/**
 * Update an external program configuration
 */
export type put__api_externalPrograms_Id = {
      method: "PUT",
      path: "/api/external-programs/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        body:  {
  /**
   * Display name for the external program
   */
  name: string;
  /**
   * Path to the executable
   */
  path: string;
  /**
   * Arguments template with variable substitution
   */
  args_template?: string;
  /**
   * Whether this program is enabled
   */
  enabled?: boolean;
  /**
   * Whether to launch in a terminal window
   */
  use_terminal?: boolean;
  /**
   * Path mappings to convert remote paths to local paths
   */
  path_mappings?: Array<Schemas.PathMapping>;
},
          }
      responses: {200: Schemas.ExternalProgram,
404: unknown,
409: unknown,
},
      
    }
/**
 * Delete an external program configuration
 */
export type delete__api_externalPrograms_Id = {
      method: "DELETE",
      path: "/api/external-programs/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {204: unknown,
404: unknown,
},
      
    }
/**
 * Execute an external program for one or more torrents.
 * 
 * The program is launched asynchronously, and this endpoint returns immediately after starting the process.
 * The 'success' field in the response indicates whether the program was successfully launched, not whether it completed successfully.
 * 
 * The program path and arguments are passed through variable substitution where placeholders
 * like {hash}, {name}, {save_path}, etc. are replaced with actual torrent metadata.
 * 
 * Security: On Windows, all arguments are escaped for cmd.exe using ^ before being passed
 * to CreateProcess to prevent command injection via malicious torrent names.
 * On Unix/Linux, arguments are wrapped in single quotes with proper escaping.
 */
export type post__api_externalPrograms_execute = {
      method: "POST",
      path: "/api/external-programs/execute",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  /**
   * ID of the external program to execute
   */
  program_id: number;
  /**
   * ID of the qBittorrent instance where the torrents are located
   */
  instance_id: number;
  /**
   * Array of torrent hashes to execute the program for
   */
  hashes: Array<string>;
},
          }
      responses: {200: Partial<{ results: Array<Partial<{ hash: string, success: boolean, message: string, error: string }>> }>,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Get supported notification event types
 */
export type get__api_notifications_events = {
      method: "GET",
      path: "/api/notifications/events",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.NotificationEventDefinition>,
},
      
    }
/**
 * Get configured notification targets
 */
export type get__api_notifications_targets = {
      method: "GET",
      path: "/api/notifications/targets",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.NotificationTarget>,
},
      
    }
/**
 * Add a new notification target
 */
export type post__api_notifications_targets = {
      method: "POST",
      path: "/api/notifications/targets",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.NotificationTargetRequest,
          }
      responses: {201: Schemas.NotificationTarget,
400: unknown,
500: unknown,
},
      
    }
/**
 * Update an existing notification target
 */
export type put__api_notifications_targets_Id = {
      method: "PUT",
      path: "/api/notifications/targets/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        body:  Schemas.NotificationTargetRequest,
          }
      responses: {200: Schemas.NotificationTarget,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Delete a notification target
 */
export type delete__api_notifications_targets_Id = {
      method: "DELETE",
      path: "/api/notifications/targets/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {204: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Send a test notification to a target
 */
export type post__api_notifications_targets_Id_test = {
      method: "POST",
      path: "/api/notifications/targets/{id}/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        body:  Schemas.NotificationTestRequest,
          }
      responses: {200: Partial<{ status: string }>,
400: unknown,
404: unknown,
500: unknown,
502: unknown,
},
      
    }
/**
 * Get all configured Sonarr/Radarr instances
 */
export type get__api_arr_instances = {
      method: "GET",
      path: "/api/arr/instances",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.ArrInstance>,
},
      
    }
/**
 * Add a new Sonarr or Radarr instance configuration
 */
export type post__api_arr_instances = {
      method: "POST",
      path: "/api/arr/instances",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.ArrInstanceCreate,
          }
      responses: {201: Schemas.ArrInstance,
400: unknown,
409: unknown,
},
      
    }
/**
 * Get a single Sonarr/Radarr instance by ID
 */
export type get__api_arr_instances_Id = {
      method: "GET",
      path: "/api/arr/instances/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.ArrInstance,
404: unknown,
},
      
    }
/**
 * Update an existing Sonarr/Radarr instance configuration
 */
export type put__api_arr_instances_Id = {
      method: "PUT",
      path: "/api/arr/instances/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        body:  Schemas.ArrInstanceUpdate,
          }
      responses: {200: Schemas.ArrInstance,
404: unknown,
409: unknown,
},
      
    }
/**
 * Delete an ARR instance configuration
 */
export type delete__api_arr_instances_Id = {
      method: "DELETE",
      path: "/api/arr/instances/{id}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {204: unknown,
404: unknown,
},
      
    }
/**
 * Test connectivity to an existing ARR instance
 */
export type post__api_arr_instances_Id_test = {
      method: "POST",
      path: "/api/arr/instances/{id}/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { id: number },
        
        
        
          }
      responses: {200: Schemas.ArrTestResponse,
404: unknown,
},
      
    }
/**
 * Test connectivity to an ARR instance before saving
 */
export type post__api_arr_test = {
      method: "POST",
      path: "/api/arr/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.ArrTestConnectionRequest,
          }
      responses: {200: Schemas.ArrTestResponse,
400: unknown,
},
      
    }
/**
 * Use configured ARR instances to resolve a title to external IDs (IMDb, TMDb, TVDb, TVMaze)
 */
export type post__api_arr_resolve = {
      method: "POST",
      path: "/api/arr/resolve",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.ArrResolveRequest,
          }
      responses: {200: Schemas.ArrResolveResponse,
400: unknown,
500: unknown,
},
      
    }
/**
 * Get all configured qBittorrent instances
 */
export type get__api_instances = {
      method: "GET",
      path: "/api/instances",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.Instance>,
},
      
    }
/**
 * Add a new qBittorrent instance
 */
export type post__api_instances = {
      method: "POST",
      path: "/api/instances",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  name: string;
  host: string;
  username?: string;
  /**
   * Password for qBittorrent instance. Will be encrypted and never returned in responses.
   */
  password?: string;
  /**
   * Optional qBittorrent API key. When provided, username/password login is bypassed.
   */
  apiKey?: string;
  /**
   * Optional basic auth username
   */
  basicUsername?: (string | null);
  /**
   * Optional basic auth password. Will be encrypted and never returned in responses.
   */
  basicPassword?: (string | null);
  /**
   * Set to true to disable TLS certificate verification (for trusted self-signed certificates).
   */
  tlsSkipVerify?: boolean;
  /**
   * Set to true if qui can access this instance's download paths locally (required for hardlink detection in automations).
   */
  hasLocalFilesystemAccess?: boolean;
  /**
   * Enable hardlink mode for cross-seed operations on this instance.
   */
  useHardlinks?: boolean;
  /**
   * Base directory for hardlink trees when hardlink mode is enabled.
   */
  hardlinkBaseDir?: string;
  /**
   * Directory organization preset for hardlink mode.
   */
  hardlinkDirPreset?: ("flat" | "by-tracker" | "by-instance");
  /**
   * Enable reflink (copy-on-write) mode for cross-seed operations. Mutually exclusive with hardlink mode.
   */
  useReflinks?: boolean;
  /**
   * Fall back to regular mode if reflink/hardlink fails (e.g., cross-filesystem).
   */
  fallbackToRegularMode?: boolean;
},
          }
      responses: {201: Schemas.Instance,
},
      
    }
/**
 * Update the display order for all configured instances. The list must include every instance ID exactly once.
 */
export type put__api_instances_order = {
      method: "PUT",
      path: "/api/instances/order",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  /**
   * Instance IDs in the desired display order.
   */
  instanceIds: Array<number>;
},
          }
      responses: {200: Array<Schemas.Instance>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Update instance configuration
 */
export type put__api_instances_InstanceID = {
      method: "PUT",
      path: "/api/instances/{instanceID}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body?:  Partial<{
  name: string;
  host: string;
  username: string;
  /**
   * Password for qBittorrent instance. Optional for updates - only updates if provided and not masked.
   */
  password: string;
  /**
   * Optional qBittorrent API key. Provide an empty string to clear it.
   */
  apiKey: string;
  /**
   * Optional basic auth username
   */
  basicUsername: (string | null);
  /**
   * Optional basic auth password. For updates - provide new password to update, omit field to keep existing, or empty string to remove basic auth.
   */
  basicPassword: (string | null);
  /**
   * Set to true to disable TLS certificate verification (for trusted self-signed certificates).
   */
  tlsSkipVerify: boolean;
  /**
   * Set to true if qui can access this instance's download paths locally (required for hardlink detection in automations).
   */
  hasLocalFilesystemAccess: boolean;
  /**
   * Enable hardlink mode for cross-seed operations on this instance.
   */
  useHardlinks: boolean;
  /**
   * Base directory for hardlink trees when hardlink mode is enabled.
   */
  hardlinkBaseDir: string;
  /**
   * Directory organization preset for hardlink mode.
   */
  hardlinkDirPreset: ("flat" | "by-tracker" | "by-instance");
  /**
   * Enable reflink (copy-on-write) mode for cross-seed operations. Mutually exclusive with hardlink mode.
   */
  useReflinks: boolean;
  /**
   * Fall back to regular mode if reflink/hardlink fails (e.g., cross-filesystem).
   */
  fallbackToRegularMode: boolean;
}>,
          }
      responses: {200: unknown,
},
      
    }
/**
 * Remove a qBittorrent instance
 */
export type delete__api_instances_InstanceID = {
      method: "DELETE",
      path: "/api/instances/{instanceID}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {204: unknown,
404: unknown,
},
      
    }
/**
 * Enable or disable automatic polling for the specified instance
 */
export type put__api_instances_InstanceID_status = {
      method: "PUT",
      path: "/api/instances/{instanceID}/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Set to false to pause all automatic connections to the upstream qBittorrent instance.
   */
  isActive: boolean;
},
          }
      responses: {200: Schemas.Instance,
404: unknown,
500: unknown,
},
      
    }
/**
 * Test connection to a qBittorrent instance
 */
export type post__api_instances_InstanceID_test = {
      method: "POST",
      path: "/api/instances/{instanceID}/test",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: unknown,
503: unknown,
},
      
    }
/**
 * Get qBittorrent version and build information for an instance
 */
export type get__api_instances_InstanceID_appInfo = {
      method: "GET",
      path: "/api/instances/{instanceID}/app-info",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Schemas.QBittorrentAppInfo,
400: unknown,
500: unknown,
},
      
    }
/**
 * Retrieve lightweight capability metadata for a qBittorrent instance.
 */
export type get__api_instances_InstanceID_capabilities = {
      method: "GET",
      path: "/api/instances/{instanceID}/capabilities",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Schemas.InstanceCapabilities,
400: unknown,
503: unknown,
},
      
    }
/**
 * Retrieve lightweight transfer statistics for a qBittorrent instance.
 */
export type get__api_instances_InstanceID_transferInfo = {
      method: "GET",
      path: "/api/instances/{instanceID}/transfer-info",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Schemas.TransferInfo,
400: unknown,
409: unknown,
500: unknown,
503: unknown,
},
      
    }
/**
 * Retrieve directory contents from the qBittorrent host filesystem for path autocomplete.
 */
export type get__api_instances_InstanceID_getDirectoryContent = {
      method: "GET",
      path: "/api/instances/{instanceID}/getDirectoryContent",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { dirPath: string, withMetadata?: boolean },
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Array<string>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Return the most recent tracker reannounce events for an instance.
 */
export type get__api_instances_InstanceID_reannounce_activity = {
      method: "GET",
      path: "/api/instances/{instanceID}/reannounce/activity",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ limit: number }>,
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Array<{
    instanceId: number;
    /**
     * Torrent hash in lowercase.
     */
    hash: string;
    /**
     * Optional torrent name associated with the reannounce event.
     */
    torrentName?: string;
    /**
     * Optional comma-separated list of problematic tracker domains for this event.
     */
    trackers?: string;
    outcome: ("skipped" | "failed" | "succeeded");
    /**
     * Short explanation for the outcome.
     */
    reason?: string;
    timestamp: string;
  }>,
400: unknown,
},
      
    }
/**
 * Return torrents that currently fall within the reannounce monitoring scope and have problematic or pending trackers.
 */
export type get__api_instances_InstanceID_reannounce_candidates = {
      method: "GET",
      path: "/api/instances/{instanceID}/reannounce/candidates",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Array<{
    instanceId: number;
    /**
     * Torrent hash in lowercase.
     */
    hash: string;
    /**
     * Torrent name associated with the candidate.
     */
    torrentName?: string;
    /**
     * Optional comma-separated list of problematic tracker domains for this torrent.
     */
    trackers?: string;
    /**
     * Active time for the torrent in seconds.
     */
    timeActiveSeconds?: number;
    /**
     * Torrent category.
     */
    category?: string;
    /**
     * Comma-separated tags as reported by qBittorrent.
     */
    tags?: string;
    /**
     * Monitoring state for this torrent.
     */
    state: ("watching" | "reannouncing" | "cooldown");
    /**
     * Whether a tracker problem has been detected for this torrent.
     */
    hasTrackerProblem: boolean;
    /**
     * Whether trackers are still in an initial updating/not contacted state.
     */
    waitingForInitial: boolean;
  }>,
400: unknown,
},
      
    }
/**
 * Get cross-seed statistics and status for a specific qBittorrent instance
 */
export type get__api_instances_InstanceID_crossSeed_status = {
      method: "GET",
      path: "/api/instances/{instanceID}/cross-seed/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Partial<{
    instance_id: number;
    /**
     * Number of torrents that have been cross-seeded
     */
    cross_seeded: number;
    /**
     * Number of torrents pending cross-seed
     */
    pending: number;
    /**
     * Timestamp of last cross-seed operation
     */
    last_cross_seed: (string | null);
  }>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Get paginated list of torrents
 */
export type get__api_instances_InstanceID_torrents = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{
  page: number;
  limit: number;
  sort: ("name" | "size" | "progress" | "priority" | "added_on");
  order: ("asc" | "desc");
  search: string;
  /**
   * JSON object with filter criteria (`status`, `categories`, `tags`, `excludeTags`, `trackers`)
   */
  filters: string;
}>,
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Partial<{
    torrents: Array<Schemas.Torrent>;
    total: number;
    page: number;
    limit: number;
    /**
     * qBittorrent preferences when available; null means a fresh preference fetch failed without a cached value; omitted means no preference update is available for this response.
     */
    preferences: (Record<string, unknown> | null);
  }>,
},
      
    }
/**
 * Add a new torrent via file upload or magnet link
 */
export type post__api_instances_InstanceID_torrents = {
      method: "POST",
      path: "/api/instances/{instanceID}/torrents",
      requestFormat: "form-data",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body?:  Partial<{
  torrent: Blob;
  urls: Array<string>;
  category: string;
  tags: Array<string>;
  paused: boolean;
  savepath: string;
  /**
   * Indexer ID for downloading torrent from an indexer
   */
  indexer_id: number;
  skip_checking: boolean;
  sequentialDownload: boolean;
  firstLastPiecePrio: boolean;
  /**
   * Upload speed limit in KB/s
   */
  upLimit: number;
  /**
   * Download speed limit in KB/s
   */
  dlLimit: number;
  /**
   * Share ratio limit
   */
  ratioLimit: string;
  /**
   * Seeding time limit in minutes
   */
  seedingTimeLimit: string;
  /**
   * Content layout (Original, Subfolder, NoSubfolder)
   */
  contentLayout: string;
  /**
   * Rename torrent
   */
  rename: string;
  /**
   * Use download path
   */
  useDownloadPath: boolean;
  /**
   * Download path
   */
  downloadPath: string;
  /**
   * Automatic torrent management
   */
  autoTMM: boolean;
}>,
          }
      responses: {201: unknown,
},
      
    }
/**
 * Determine whether any of the provided hashes already exist on the qBittorrent instance. Supports infohash v1 or v2 values.
 */
export type post__api_instances_InstanceID_torrents_checkDuplicates = {
      method: "POST",
      path: "/api/instances/{instanceID}/torrents/check-duplicates",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * List of torrent hashes to check. Maximum 512 entries per request.
   */
  hashes: Array<string>;
},
          }
      responses: {200: Partial<{ duplicates: Array<Schemas.DuplicateTorrentMatch> }>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Perform bulk actions on multiple torrents
 */
export type post__api_instances_InstanceID_torrents_bulkAction = {
      method: "POST",
      path: "/api/instances/{instanceID}/torrents/bulk-action",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Specific torrent hashes to target. Required unless selectAll is true.
   */
  hashes?: Array<string>;
  /**
   * Apply the action to all torrents matching the provided filters.
   */
  selectAll?: boolean;
  /**
   * Filter criteria used when selectAll is true.
   */
  filters?: Partial<{ status: Array<string>, categories: Array<string>, tags: Array<string>, trackers: Array<string> }>;
  /**
   * Optional search query applied when selectAll is true.
   */
  search?: string;
  /**
   * Hashes to exclude when selectAll is true.
   */
  excludeHashes?: Array<string>;
  /**
   * Bulk action to perform on the selected torrents.
   */
  action: ("pause" | "resume" | "delete" | "deleteWithFiles" | "recheck" | "reannounce" | "increasePriority" | "decreasePriority" | "topPriority" | "bottomPriority" | "addTags" | "removeTags" | "setTags" | "setComment" | "setCategory" | "toggleAutoTMM" | "setShareLimit" | "setUploadLimit" | "setDownloadLimit" | "setLocation" | "editTrackers" | "addTrackers" | "removeTrackers" | "toggleSequentialDownload");
  /**
   * Only for delete action
   */
  deleteFiles?: boolean;
  /**
   * Comma-separated list of tags for tag-related actions.
   */
  tags?: string;
  /**
   * Comment text for setComment action (empty clears the comment).
   */
  comment?: string;
  /**
   * Category name for setCategory action.
   */
  category?: string;
  /**
   * Enable or disable Automatic Torrent Management for toggleAutoTMM.
   */
  enable?: boolean;
  /**
   * Ratio limit for setShareLimit action.
   */
  ratioLimit?: number;
  /**
   * Seeding time limit (minutes) for setShareLimit action.
   */
  seedingTimeLimit?: number;
  /**
   * Inactive seeding time limit (minutes) for setShareLimit action.
   */
  inactiveSeedingTimeLimit?: number;
  /**
   * Action when share limits are reached (qBittorrent Web API 2.12+). Qt enum names Default, Stop, Remove, EnableSuperSeeding, RemoveWithContent. Omit or empty for global default.
   */
  shareLimitAction?: string;
  /**
   * Whether any or all limits must be reached (Web API 2.12+). Qt enum names Default, MatchAny, MatchAll. Omit or empty for global default.
   */
  shareLimitsMode?: string;
  /**
   * Upload speed limit in KB/s for setUploadLimit action.
   */
  uploadLimit?: number;
  /**
   * Download speed limit in KB/s for setDownloadLimit action.
   */
  downloadLimit?: number;
  /**
   * Destination path for setLocation action.
   */
  location?: string;
  /**
   * Existing tracker URL to replace for editTrackers action.
   */
  trackerOldURL?: string;
  /**
   * Replacement tracker URL for editTrackers action.
   */
  trackerNewURL?: string;
  /**
   * Newline-separated tracker URLs for addTrackers/removeTrackers actions.
   */
  trackerURLs?: string;
},
          }
      responses: {200: unknown,
},
      
    }
/**
 * Returns field values for torrents matching the given filters. Used for select all copy operations and bulk tag baselines.
 */
export type post__api_instances_InstanceID_torrents_field = {
      method: "POST",
      path: "/api/instances/{instanceID}/torrents/field",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * The torrent field to retrieve. When set to `tags`, the 200 response `values` array contains one raw comma-separated tag string per matching torrent, and empty strings represent untagged torrents.
   */
  field: ("name" | "hash" | "full_path" | "tags");
  /**
   * Sort field. Defaults to added_on.
   */
  sort?: string;
  /**
   * Sort order. Defaults to desc.
   */
  order?: ("asc" | "desc");
  /**
   * Explicit torrent hashes to query when not using filter scope.
   */
  hashes?: Array<string>;
  /**
   * Explicit instance/hash targets to query when not using filter scope.
   */
  targets?: Array<{ instanceId: number, hash: string }>;
  /**
   * When true, query all torrents matching filters/search/exclusions.
   */
  selectAll?: boolean;
  /**
   * Optional search query to filter torrents.
   */
  search?: string;
  /**
   * Filter criteria for selecting torrents.
   */
  filters?: Partial<{ status: Array<string>, categories: Array<string>, tags: Array<string>, trackers: Array<string> }>;
  /**
   * Hashes to exclude from the results.
   */
  excludeHashes?: Array<string>;
},
          }
      responses: {200: Partial<{
    /**
     * List of per-torrent field values for the matching torrents. When `field=tags`, each item is the raw
     * comma-separated tag string returned for one matching torrent, and an empty string indicates
     * an untagged torrent.
     */
    values: Array<string>;
  }>,
},
      
    }
/**
 * Download the .torrent file for a specific torrent
 */
export type get__api_instances_InstanceID_torrents_Hash_export = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/export",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
500: unknown,
},
      
    }
/**
 * Get detailed properties of a torrent
 */
export type get__api_instances_InstanceID_torrents_Hash_properties = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/properties",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: Schemas.TorrentProperties,
},
      
    }
/**
 * Get list of trackers for a torrent
 */
export type get__api_instances_InstanceID_torrents_Hash_trackers = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/trackers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: Array<Schemas.Tracker>,
},
      
    }
/**
 * Edit a tracker URL for a torrent
 */
export type put__api_instances_InstanceID_torrents_Hash_trackers = {
      method: "PUT",
      path: "/api/instances/{instanceID}/torrents/{hash}/trackers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  {
  /**
   * The current tracker URL to replace
   */
  oldURL: string;
  /**
   * The new tracker URL
   */
  newURL: string;
},
          }
      responses: {200: unknown,
400: unknown,
500: unknown,
},
      
    }
/**
 * Add new trackers to a torrent
 */
export type post__api_instances_InstanceID_torrents_Hash_trackers = {
      method: "POST",
      path: "/api/instances/{instanceID}/torrents/{hash}/trackers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  {
  /**
   * Newline-separated list of tracker URLs to add
   */
  urls: string;
},
          }
      responses: {200: unknown,
400: unknown,
500: unknown,
},
      
    }
/**
 * Remove trackers from a torrent
 */
export type delete__api_instances_InstanceID_torrents_Hash_trackers = {
      method: "DELETE",
      path: "/api/instances/{instanceID}/torrents/{hash}/trackers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  {
  /**
   * Newline-separated list of tracker URLs to remove
   */
  urls: string;
},
          }
      responses: {200: unknown,
400: unknown,
500: unknown,
},
      
    }
/**
 * Get list of web seeds (HTTP sources) for a torrent
 */
export type get__api_instances_InstanceID_torrents_Hash_webseeds = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/webseeds",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: Array<Schemas.WebSeed>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Get download state of each piece for a torrent.
 * States: 0 = not downloaded, 1 = downloading, 2 = downloaded
 */
export type get__api_instances_InstanceID_torrents_Hash_pieces = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/pieces",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: Array<number>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Get list of files in a torrent
 */
export type get__api_instances_InstanceID_torrents_Hash_files = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/files",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ refresh: boolean }>,
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: Array<Schemas.TorrentFile>,
},
      
    }
/**
 * Adjust the download priority (including do-not-download) for one or more files in a torrent.
 */
export type put__api_instances_InstanceID_torrents_Hash_files = {
      method: "PUT",
      path: "/api/instances/{instanceID}/torrents/{hash}/files",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  {
  /**
   * File indices to update.
   */
  indices: Array<number>;
  /**
   * Desired priority value (0-7, where 0 marks files as do-not-download).
   */
  priority: number;
},
          }
      responses: {204: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Streams a single file from the torrent's content on the local filesystem. Requires the instance to have local filesystem access enabled.
 */
export type get__api_instances_InstanceID_torrents_Hash_files_FileIndex_download = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/files/{fileIndex}/download",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string, fileIndex: number },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
403: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Analyzes a single file from the torrent's content on the local filesystem and returns a human-readable stream/field report plus the raw MediaInfo JSON output. Requires the instance to have local filesystem access enabled.
 */
export type get__api_instances_InstanceID_torrents_Hash_files_FileIndex_mediainfo = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/files/{fileIndex}/mediainfo",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string, fileIndex: number },
        
        
        
          }
      responses: {200: Schemas.TorrentFileMediaInfoResponse,
400: unknown,
403: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Analyzes a file from an instance-relative content path and returns both text summary and parsed MediaInfo JSON output. Requires the instance to have local filesystem access enabled.
 */
export type get__api_instances_InstanceID_mediainfo = {
      method: "GET",
      path: "/api/instances/{instanceID}/mediainfo",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { contentPath: string, content_path?: string },
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Schemas.ContentPathMediaInfoResponse,
400: unknown,
403: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Returns MediaInfo summary text and JSON output for an instance-relative content path using a client API key in the proxy path.
 */
export type get__proxy_ApiKey_api_v2_torrents_mediainfo = {
      method: "GET",
      path: "/proxy/{api-key}/api/v2/torrents/mediainfo",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ contentPath: string, content_path: string }>,
        path:  { "api-key": string },
        
        
        body?:  Partial<{
  /**
   * Canonical instance-relative content path
   */
  contentPath: string;
  /**
   * Legacy alias for contentPath
   */
  content_path: string;
}>,
          }
      responses: {200: Schemas.ContentPathMediaInfoResponse,
400: unknown,
401: unknown,
403: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Update the display name for a torrent
 */
export type put__api_instances_InstanceID_torrents_Hash_rename = {
      method: "PUT",
      path: "/api/instances/{instanceID}/torrents/{hash}/rename",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  {
  /**
   * New name to assign to the torrent
   */
  name: string;
},
          }
      responses: {200: unknown,
400: unknown,
500: unknown,
},
      
    }
/**
 * Rename a specific file within a torrent
 */
export type put__api_instances_InstanceID_torrents_Hash_renameFile = {
      method: "PUT",
      path: "/api/instances/{instanceID}/torrents/{hash}/rename-file",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  {
  /**
   * Existing relative path of the file inside the torrent
   */
  oldPath: string;
  /**
   * New relative path (including file name) to apply
   */
  newPath: string;
},
          }
      responses: {200: unknown,
400: unknown,
500: unknown,
},
      
    }
/**
 * Rename a folder within a torrent
 */
export type put__api_instances_InstanceID_torrents_Hash_renameFolder = {
      method: "PUT",
      path: "/api/instances/{instanceID}/torrents/{hash}/rename-folder",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  {
  /**
   * Existing folder path relative to the torrent root
   */
  oldPath: string;
  /**
   * New folder path (relative) to apply
   */
  newPath: string;
},
          }
      responses: {200: unknown,
400: unknown,
500: unknown,
},
      
    }
/**
 * Get list of peers for a torrent
 */
export type get__api_instances_InstanceID_torrents_Hash_peers = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrents/{hash}/peers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: Array<Partial<{ ip: string, port: number, client: string, progress: number, dlSpeed: number, upSpeed: number, downloaded: number, uploaded: number, connection: string, flags: string, flagsDesc: string, relevance: number }>>,
},
      
    }
/**
 * Add peers to one or more torrents
 */
export type post__api_instances_InstanceID_torrents_addPeers = {
      method: "POST",
      path: "/api/instances/{instanceID}/torrents/add-peers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * List of torrent hashes
   */
  hashes: Array<string>;
  /**
   * List of peers in host:port format
   */
  peers: Array<string>;
},
          }
      responses: {200: unknown,
},
      
    }
/**
 * Ban peers from connecting to the client
 */
export type post__api_instances_InstanceID_torrents_banPeers = {
      method: "POST",
      path: "/api/instances/{instanceID}/torrents/ban-peers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * List of peer IPs to ban
   */
  peers: Array<string>;
},
          }
      responses: {200: unknown,
},
      
    }
/**
 * Create a new torrent file from a source path. Requires qBittorrent v5.0.0 or later.
 */
export type post__api_instances_InstanceID_torrentCreator = {
      method: "POST",
      path: "/api/instances/{instanceID}/torrent-creator",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Path to the source file or directory
   */
  sourcePath: string;
  /**
   * Custom path for saving the torrent file
   */
  torrentFilePath?: string;
  /**
   * Create a private torrent
   */
  private?: boolean;
  /**
   * Torrent format
   */
  format?: ("v1" | "v2" | "hybrid");
  /**
   * Optimize piece alignment
   */
  optimizeAlignment?: boolean;
  /**
   * Padded file size limit
   */
  paddedFileSizeLimit?: number;
  /**
   * Piece size in bytes
   */
  pieceSize?: number;
  /**
   * Comment for the torrent
   */
  comment?: string;
  /**
   * Source string for the torrent
   */
  source?: string;
  /**
   * List of tracker URLs
   */
  trackers?: Array<string>;
  /**
   * List of URL seeds
   */
  urlSeeds?: Array<string>;
  /**
   * Start seeding after creation
   */
  startSeeding?: boolean;
},
          }
      responses: {201: Partial<{ taskID: string, sourcePath: string, status: string, timeAdded: string }>,
400: unknown,
409: unknown,
},
      
    }
/**
 * Get status of torrent creation tasks. Query parameter taskID can be used to filter by specific task.
 */
export type get__api_instances_InstanceID_torrentCreator_status = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrent-creator/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ taskID: string }>,
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Array<Partial<{ taskID: string, sourcePath: string, torrentFilePath: string, pieceSize: number, private: boolean, format: string, status: string, timeAdded: string, timeStarted: string, timeFinished: string, progress: number, errorMessage: string }>>,
400: unknown,
404: unknown,
},
      
    }
/**
 * Get the number of active (running or queued) torrent creation tasks.
 */
export type get__api_instances_InstanceID_torrentCreator_count = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrent-creator/count",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Partial<{
    /**
     * Number of active torrent creation tasks
     */
    count: number;
  }>,
400: unknown,
},
      
    }
/**
 * Delete a torrent creation task
 */
export type delete__api_instances_InstanceID_torrentCreator_TaskID = {
      method: "DELETE",
      path: "/api/instances/{instanceID}/torrent-creator/{taskID}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, taskID: string },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
404: unknown,
},
      
    }
/**
 * Download the torrent file for a completed torrent creation task
 */
export type get__api_instances_InstanceID_torrentCreator_TaskID_file = {
      method: "GET",
      path: "/api/instances/{instanceID}/torrent-creator/{taskID}/file",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, taskID: string },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
404: unknown,
409: unknown,
},
      
    }
/**
 * Get all categories
 */
export type get__api_instances_InstanceID_categories = {
      method: "GET",
      path: "/api/instances/{instanceID}/categories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Array<Schemas.Category>,
},
      
    }
/**
 * Create a new category
 */
export type post__api_instances_InstanceID_categories = {
      method: "POST",
      path: "/api/instances/{instanceID}/categories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  { name: string, savePath?: string },
          }
      responses: {201: unknown,
},
      
    }
/**
 * Edit an existing category
 */
export type put__api_instances_InstanceID_categories = {
      method: "PUT",
      path: "/api/instances/{instanceID}/categories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  { name: string, savePath?: string },
          }
      responses: {200: unknown,
},
      
    }
/**
 * Delete one or more categories
 */
export type delete__api_instances_InstanceID_categories = {
      method: "DELETE",
      path: "/api/instances/{instanceID}/categories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  { categories: Array<string> },
          }
      responses: {200: unknown,
},
      
    }
/**
 * Get all tags
 */
export type get__api_instances_InstanceID_tags = {
      method: "GET",
      path: "/api/instances/{instanceID}/tags",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Array<string>,
},
      
    }
/**
 * Create new tags
 */
export type post__api_instances_InstanceID_tags = {
      method: "POST",
      path: "/api/instances/{instanceID}/tags",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  { tags: Array<string> },
          }
      responses: {201: unknown,
},
      
    }
/**
 * Delete one or more tags
 */
export type delete__api_instances_InstanceID_tags = {
      method: "DELETE",
      path: "/api/instances/{instanceID}/tags",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  { tags: Array<string> },
          }
      responses: {200: unknown,
},
      
    }
/**
 * Get active tracker domains and representative tracker URLs for an instance
 */
export type get__api_instances_InstanceID_trackers = {
      method: "GET",
      path: "/api/instances/{instanceID}/trackers",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Record<string, string>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Get qBittorrent instance preferences/settings
 */
export type get__api_instances_InstanceID_preferences = {
      method: "GET",
      path: "/api/instances/{instanceID}/preferences",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Record<string, unknown>,
},
      
    }
/**
 * Update qBittorrent instance preferences/settings
 */
export type patch__api_instances_InstanceID_preferences = {
      method: "PATCH",
      path: "/api/instances/{instanceID}/preferences",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  Record<string, unknown>,
          }
      responses: {200: unknown,
},
      
    }
/**
 * Get current status of alternative speed limits (turtle mode)
 */
export type get__api_instances_InstanceID_alternativeSpeedLimits = {
      method: "GET",
      path: "/api/instances/{instanceID}/alternative-speed-limits",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Partial<{
    /**
     * Whether alternative speed limits are currently enabled
     */
    enabled: boolean;
  }>,
},
      
    }
/**
 * Toggle alternative speed limits (turtle mode) on/off
 */
export type post__api_instances_InstanceID_alternativeSpeedLimits_toggle = {
      method: "POST",
      path: "/api/instances/{instanceID}/alternative-speed-limits/toggle",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Partial<{
    /**
     * New status of alternative speed limits
     */
    enabled: boolean;
  }>,
},
      
    }
/**
 * Activate a license key and store it for the current user
 */
export type post__api_license_activate = {
      method: "POST",
      path: "/api/license/activate",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  { licenseKey: string },
          }
      responses: {200: Partial<{ valid: boolean, productName: string, expiresAt: string, message: string, error: (string | null) }>,
400: unknown,
403: unknown,
},
      
    }
/**
 * Validate a license key and ensure it remains active
 */
export type post__api_license_validate = {
      method: "POST",
      path: "/api/license/validate",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  { licenseKey: string },
          }
      responses: {200: Partial<{ valid: boolean, productName: string, expiresAt: string, message: string, error: (string | null) }>,
400: unknown,
403: unknown,
404: unknown,
},
      
    }
/**
 * Check if any active licenses grant premium access
 */
export type get__api_license_licensed = {
      method: "GET",
      path: "/api/license/licensed",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Partial<{ hasPremiumAccess: boolean }>,
},
      
    }
/**
 * List all stored licenses
 */
export type get__api_license_licenses = {
      method: "GET",
      path: "/api/license/licenses",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Partial<{ licenseKey: string, productName: string, status: string, provider: ("polar" | "dodo"), createdAt: string }>>,
},
      
    }
/**
 * Remove a stored license
 */
export type delete__api_license_LicenseKey = {
      method: "DELETE",
      path: "/api/license/{licenseKey}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { licenseKey: string },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
},
      
    }
/**
 * Refresh all stored licenses from the licensing service
 */
export type post__api_license_refresh = {
      method: "POST",
      path: "/api/license/refresh",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Partial<{ message: string }>,
500: unknown,
},
      
    }
/**
 * List sideloaded custom theme CSS files and their contents. Requires premium access.
 */
export type get__api_themes_custom = {
      method: "GET",
      path: "/api/themes/custom",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Partial<{ directory: string, themes: Array<Partial<{ id: string, filename: string, css: string }>> }>,
403: unknown,
500: unknown,
},
      
    }
/**
 * Get paginated list of torrents from all instances (primarily used for cross-seed filtering)
 */
export type get__api_torrents_crossInstance = {
      method: "GET",
      path: "/api/torrents/cross-instance",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  {
  page?: number;
  limit?: number;
  sort?: ("name" | "size" | "progress" | "priority" | "added_on" | "instance");
  order?: ("asc" | "desc");
  search?: string;
  /**
   * JSON-encoded filter options. Must include the `expr` field for cross-instance filtering.
   * See CrossInstanceFilterOptions schema for structure details.
   */
  filters: string;
},
        
        
        
        
          }
      responses: {200: Partial<{
    cross_instance_torrents: Array<(Schemas.Torrent & Partial<{
      /**
       * ID of the instance this torrent belongs to
       */
      instance_id: number;
      /**
       * Name of the instance this torrent belongs to
       */
      instance_name: string;
    }>)>;
    total: number;
    hasMore: boolean;
    isCrossInstance: boolean;
    /**
     * Indicates if some instances failed to respond
     */
    partialResults: boolean;
  }>,
400: Partial<{ error: string }>,
500: unknown,
},
      
    }
/**
 * Retrieve cached tracker favicons as data URLs keyed by tracker hostname
 */
export type get__api_trackerIcons = {
      method: "GET",
      path: "/api/tracker-icons",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Record<string, string>,
500: unknown,
},
      
    }
/**
 * Retrieve the current automation configuration for cross-seeding
 */
export type get__api_crossSeed_settings = {
      method: "GET",
      path: "/api/cross-seed/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.CrossSeedAutomationSettings,
500: unknown,
},
      
    }
/**
 * Persist a new automation schedule and cross-seed preferences
 */
export type put__api_crossSeed_settings = {
      method: "PUT",
      path: "/api/cross-seed/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CrossSeedAutomationSettings,
          }
      responses: {200: Schemas.CrossSeedAutomationSettings,
400: unknown,
500: unknown,
},
      
    }
/**
 * Partially update automation, completion, or global cross-seed settings without overwriting unspecified fields
 */
export type patch__api_crossSeed_settings = {
      method: "PATCH",
      path: "/api/cross-seed/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CrossSeedAutomationSettingsPatch,
          }
      responses: {200: Schemas.CrossSeedAutomationSettings,
400: unknown,
500: unknown,
},
      
    }
/**
 * Returns the global directory scanner configuration
 */
export type get__api_dirScan_settings = {
      method: "GET",
      path: "/api/dir-scan/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.DirScanSettings,
500: unknown,
},
      
    }
/**
 * Partially updates global directory scanner settings
 */
export type patch__api_dirScan_settings = {
      method: "PATCH",
      path: "/api/dir-scan/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DirScanSettingsPatch,
          }
      responses: {200: Schemas.DirScanSettings,
400: unknown,
500: unknown,
},
      
    }
/**
 * Returns all configured scan directories
 */
export type get__api_dirScan_directories = {
      method: "GET",
      path: "/api/dir-scan/directories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.DirScanDirectory>,
500: unknown,
},
      
    }
/**
 * Creates a new scan directory configuration
 */
export type post__api_dirScan_directories = {
      method: "POST",
      path: "/api/dir-scan/directories",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.DirScanDirectoryCreate,
          }
      responses: {201: Schemas.DirScanDirectory,
400: unknown,
500: unknown,
},
      
    }
/**
 * Returns a scan directory by ID
 */
export type get__api_dirScan_directories_DirectoryID = {
      method: "GET",
      path: "/api/dir-scan/directories/{directoryID}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { directoryID: number },
        
        
        
          }
      responses: {200: Schemas.DirScanDirectory,
404: unknown,
500: unknown,
},
      
    }
/**
 * Partially updates a scan directory configuration
 */
export type patch__api_dirScan_directories_DirectoryID = {
      method: "PATCH",
      path: "/api/dir-scan/directories/{directoryID}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { directoryID: number },
        
        
        body:  Schemas.DirScanDirectoryPatch,
          }
      responses: {200: Schemas.DirScanDirectory,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Deletes a scan directory configuration and all associated history
 */
export type delete__api_dirScan_directories_DirectoryID = {
      method: "DELETE",
      path: "/api/dir-scan/directories/{directoryID}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { directoryID: number },
        
        
        
          }
      responses: {204: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Deletes tracked dir-scan file state for the directory so the next scan re-processes it
 */
export type post__api_dirScan_directories_DirectoryID_resetFiles = {
      method: "POST",
      path: "/api/dir-scan/directories/{directoryID}/reset-files",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { directoryID: number },
        
        
        
          }
      responses: {204: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Starts a manual scan run for the given directory
 */
export type post__api_dirScan_directories_DirectoryID_scan = {
      method: "POST",
      path: "/api/dir-scan/directories/{directoryID}/scan",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { directoryID: number },
        
        
        
          }
      responses: {202: Schemas.DirScanTriggerResponse,
404: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Cancels the currently running scan for the given directory, if any
 */
export type delete__api_dirScan_directories_DirectoryID_scan = {
      method: "DELETE",
      path: "/api/dir-scan/directories/{directoryID}/scan",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { directoryID: number },
        
        
        
          }
      responses: {204: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Accepts a plain `path` payload or native Sonarr, Radarr, Lidarr, or Readarr webhook payloads.
 * qui accepts `eventType: test` payloads as a no-op health check. For real events,
 * it extracts the path, matches it against enabled scan directories using longest-prefix matching,
 * and starts a scan rooted at the provided path subtree.
 */
export type post__api_dirScan_webhook_scan = {
      method: "POST",
      path: "/api/dir-scan/webhook/scan",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  ({
  /**
   * Plain path to match against configured scan directories.
   */
  path: string;
  /**
   * Optional *arr download client name used for per-directory webhook filtering.
   */
  downloadClient?: string;
} | { eventType?: string, downloadClient?: string, series: { path: string } } | { eventType?: string, downloadClient?: string, movie: { folderPath: string } } | { eventType?: string, downloadClient?: string, artist: { path: string } } | { eventType?: string, downloadClient?: string, author: { path: string } } | { eventType: "test" }),
          }
      responses: {200: { skipped: boolean, reason: string },
202: Schemas.DirScanTriggerResponse,
204: unknown,
400: unknown,
404: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Returns the status of the active scan run or the most recent run (or idle)
 */
export type get__api_dirScan_directories_DirectoryID_status = {
      method: "GET",
      path: "/api/dir-scan/directories/{directoryID}/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { directoryID: number },
        
        
        
          }
      responses: {200: (Schemas.DirScanRun | Schemas.DirScanIdleStatus),
404: unknown,
500: unknown,
},
      
    }
/**
 * Returns recent scan runs for a directory
 */
export type get__api_dirScan_directories_DirectoryID_runs = {
      method: "GET",
      path: "/api/dir-scan/directories/{directoryID}/runs",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ limit: number }>,
        path:  { directoryID: number },
        
        
        
          }
      responses: {200: Array<Schemas.DirScanRun>,
404: unknown,
500: unknown,
},
      
    }
/**
 * Returns injection attempts (added/failed) for a scan run
 */
export type get__api_dirScan_directories_DirectoryID_runs_RunID_injections = {
      method: "GET",
      path: "/api/dir-scan/directories/{directoryID}/runs/{runID}/injections",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ limit: number, offset: number }>,
        path:  { directoryID: number, runID: number },
        
        
        
          }
      responses: {200: Array<Schemas.DirScanRunInjection>,
404: unknown,
500: unknown,
},
      
    }
/**
 * Returns tracked files for a directory with optional status filtering
 */
export type get__api_dirScan_directories_DirectoryID_files = {
      method: "GET",
      path: "/api/dir-scan/directories/{directoryID}/files",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ status: Schemas.DirScanFileStatus, limit: number, offset: number }>,
        path:  { directoryID: number },
        
        
        
          }
      responses: {200: Array<Schemas.DirScanFile>,
404: unknown,
500: unknown,
},
      
    }
/**
 * Returns scheduler state, last run information, and next scheduled run
 */
export type get__api_crossSeed_status = {
      method: "GET",
      path: "/api/cross-seed/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.CrossSeedAutomationStatus,
500: unknown,
},
      
    }
/**
 * Returns the most recent automation runs
 */
export type get__api_crossSeed_runs = {
      method: "GET",
      path: "/api/cross-seed/runs",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ limit: number, offset: number }>,
        
        
        
        
          }
      responses: {200: Array<Schemas.CrossSeedRun>,
500: unknown,
},
      
    }
/**
 * Starts an on-demand automation pass
 */
export type post__api_crossSeed_run = {
      method: "POST",
      path: "/api/cross-seed/run",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CrossSeedRunRequest,
          }
      responses: {202: Schemas.CrossSeedRun,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Stops the currently running RSS automation run, if any.
 */
export type post__api_crossSeed_run_cancel = {
      method: "POST",
      path: "/api/cross-seed/run/cancel",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {204: unknown,
409: unknown,
},
      
    }
/**
 * Returns the per-instance cross-seed blocklist entries.
 */
export type get__api_crossSeed_blocklist = {
      method: "GET",
      path: "/api/cross-seed/blocklist",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ instanceId: number }>,
        
        
        
        
          }
      responses: {200: Array<Schemas.CrossSeedBlocklistEntry>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Adds or updates a blocked infohash for a specific instance.
 */
export type post__api_crossSeed_blocklist = {
      method: "POST",
      path: "/api/cross-seed/blocklist",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CrossSeedBlocklistRequest,
          }
      responses: {201: Schemas.CrossSeedBlocklistEntry,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Removes a blocked infohash for a specific instance.
 */
export type delete__api_crossSeed_blocklist_InstanceID_Infohash = {
      method: "DELETE",
      path: "/api/cross-seed/blocklist/{instanceID}/{infohash}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, infohash: string },
        
        
        
          }
      responses: {204: unknown,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Returns the persisted defaults used by Seeded Torrent Search runs.
 */
export type get__api_crossSeed_search_settings = {
      method: "GET",
      path: "/api/cross-seed/search/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.CrossSeedSearchSettings,
500: unknown,
},
      
    }
/**
 * Persists default filters and timing for Seeded Torrent Search runs.
 */
export type patch__api_crossSeed_search_settings = {
      method: "PATCH",
      path: "/api/cross-seed/search/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.CrossSeedSearchSettingsPatch,
          }
      responses: {200: Schemas.CrossSeedSearchSettings,
400: unknown,
500: unknown,
},
      
    }
/**
 * Starts a new cross-seed search automation run for the specified instance
 */
export type post__api_crossSeed_search_run = {
      method: "POST",
      path: "/api/cross-seed/search/run",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  {
  /**
   * qBittorrent instance ID
   */
  instanceId: number;
  /**
   * Filter torrents by categories
   */
  categories?: Array<string>;
  /**
   * Filter torrents by tags
   */
  tags?: Array<string>;
  /**
   * Interval between processing torrents in seconds
   */
  intervalSeconds?: number;
  /**
   * Specific indexers to search
   */
  indexerIds?: Array<number>;
  /**
   * Disable Torznab searches (Gazelle-only for OPS/RED torrents; other torrents will be skipped)
   */
  disableTorznab?: boolean;
  /**
   * Cooldown period between searches for the same torrent
   */
  cooldownMinutes?: number;
},
          }
      responses: {202: Schemas.CrossSeedSearchRun,
400: unknown,
500: unknown,
},
      
    }
/**
 * Cancels the currently running cross-seed search automation
 */
export type post__api_crossSeed_search_run_cancel = {
      method: "POST",
      path: "/api/cross-seed/search/run/cancel",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {204: unknown,
},
      
    }
/**
 * Returns the current status of the cross-seed search automation
 */
export type get__api_crossSeed_search_status = {
      method: "GET",
      path: "/api/cross-seed/search/status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.CrossSeedSearchStatus,
500: unknown,
},
      
    }
/**
 * Returns the history of cross-seed search automation runs for an instance
 */
export type get__api_crossSeed_search_runs = {
      method: "GET",
      path: "/api/cross-seed/search/runs",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query:  { instanceId: number, limit?: number, offset?: number },
        
        
        
        
          }
      responses: {200: Array<Schemas.CrossSeedSearchRun>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Returns the cross-seed completion settings for a specific qBittorrent instance. These settings control automatic cross-seed searches when torrents complete on this instance.
 */
export type get__api_crossSeed_completion_InstanceId = {
      method: "GET",
      path: "/api/cross-seed/completion/{instanceId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceId: number },
        
        
        
          }
      responses: {200: Schemas.InstanceCrossSeedCompletionSettings,
400: unknown,
500: unknown,
},
      
    }
/**
 * Updates the cross-seed completion settings for a specific qBittorrent instance. These settings control automatic cross-seed searches when torrents complete on this instance.
 */
export type put__api_crossSeed_completion_InstanceId = {
      method: "PUT",
      path: "/api/cross-seed/completion/{instanceId}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceId: number },
        
        
        body:  Schemas.InstanceCrossSeedCompletionSettingsRequest,
          }
      responses: {200: Schemas.InstanceCrossSeedCompletionSettings,
400: unknown,
500: unknown,
503: unknown,
},
      
    }
/**
 * Checks if enough local episode data exists to inject a season pack using hardlinks or reflinks.
 * `torrentData` (base64-encoded torrent file) is optional. When provided, coverage uses the larger of the playable episode count in the pack and the episode total from metadata providers (Sonarr, TVDB, TVMaze).
 * When omitted, episode coverage is computed using metadata providers only. If no metadata source is available, the check only verifies that matching episodes exist and skips the coverage threshold.
 * * `200 OK` - coverage meets threshold; ready to apply
 * * `404 Not Found` - not enough episodes or not eligible
 */
export type post__api_crossSeed_seasonPack_check = {
      method: "POST",
      path: "/api/cross-seed/season-pack/check",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ apikey: string }>,
        
        
        
        body:  Schemas.SeasonPackCheckRequest,
          }
      responses: {200: Schemas.SeasonPackCheckResponse,
400: unknown,
404: Schemas.SeasonPackCheckResponse,
500: unknown,
},
      
    }
/**
 * Links the matched local episodes, adds the season pack torrent to the best matching instance, and queues a recheck when episodes or extras are still missing.
 */
export type post__api_crossSeed_seasonPack_apply = {
      method: "POST",
      path: "/api/cross-seed/season-pack/apply",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ apikey: string }>,
        
        
        
        body:  Schemas.SeasonPackApplyRequest,
          }
      responses: {200: Schemas.SeasonPackApplyResponse,
400: unknown,
500: unknown,
},
      
    }
/**
 * Returns recent season-pack check and apply runs ordered by most recent first.
 */
export type get__api_crossSeed_seasonPack_runs = {
      method: "GET",
      path: "/api/cross-seed/season-pack/runs",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ limit: number }>,
        
        
        
        
          }
      responses: {200: Array<Schemas.SeasonPackRun>,
500: unknown,
},
      
    }
/**
 * Accepts release metadata from autobrr and checks if matching torrents exist on the requested instances (or all instances when no list is provided). The HTTP status describes whether the match is ready:
 * * `200 OK` – at least one matching torrent is fully downloaded and ready for cross-seeding
 * * `202 Accepted` – matching torrents exist but the data is still downloading; retry `/check` until it returns `200` (ready) or `404`
 * * `404 Not Found` – no matches exist (recommendation `skip`)
 * This endpoint is designed for autobrr filter external webhooks. When `instanceIds` is omitted or empty, qui will search every configured instance. Provide a subset of IDs to restrict the scan.
 */
export type post__api_crossSeed_webhook_check = {
      method: "POST",
      path: "/api/cross-seed/webhook/check",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ apikey: string }>,
        
        
        
        body:  {
  /**
   * Release name as announced (parsed using rls library to extract metadata)
   */
  torrentName: string;
  /**
   * Optional list of qBittorrent instance IDs to consider. When omitted or empty, qui searches all configured instances.
   */
  instanceIds?: Array<number>;
  /**
   * Total torrent size in bytes (optional - enables size validation when provided)
   */
  size?: number;
  /**
   * Optional autobrr indexer identifier (for example "hdb"). Required if you want qui's HDBits-specific missing collection fallback on webhook checks.
   */
  indexer?: string;
  /**
   * Optional override for matching season packs vs episodes. Defaults to the Cross-Seed automation setting when omitted.
   */
  findIndividualEpisodes?: boolean;
},
          }
      responses: {200: Schemas.CrossSeedWebhookCheckResponse,
202: Schemas.CrossSeedWebhookCheckResponse,
400: unknown,
404: Schemas.CrossSeedWebhookCheckResponse,
500: unknown,
},
      
    }
/**
 * Accepts a torrent file from autobrr, matches it against the requested instances, and adds it with alignment wherever a complete match exists. When `instanceIds` is omitted or empty, qui attempts to inject the torrent into every configured instance that has a match.
 */
export type post__api_crossSeed_apply = {
      method: "POST",
      path: "/api/cross-seed/apply",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ apikey: string }>,
        
        
        
        body:  {
  /**
   * Base64-encoded torrent file provided by autobrr (for example, using the TorrentDataRawBytes macro piped through toString|b64enc or toJson)
   */
  torrentData: string;
  /**
   * Optional list of target instance IDs. When omitted or empty, qui attempts to cross-seed into any instance that has a complete match.
   */
  instanceIds?: Array<number>;
  /**
   * Category to apply when adding the torrent
   */
  category?: string;
  tags?: Array<string>;
  startPaused?: boolean;
  skipIfExists?: boolean;
  findIndividualEpisodes?: boolean;
  /**
   * autobrr indexer identifier (for example "hdb"). Only used when "Use indexer name as category" mode is enabled; when provided in that mode, qui uses this identifier as the category value. If omitted, qui falls back to the matched torrent category. Webhook applies cannot derive tracker identity from the torrent file.
   */
  indexer?: string;
},
          }
      responses: {200: Schemas.CrossSeedResponse,
400: unknown,
500: unknown,
},
      
    }
/**
 * Analyzes a torrent and returns information needed for cross-seed searching
 */
export type get__api_crossSeed_torrents_InstanceID_Hash_analyze = {
      method: "GET",
      path: "/api/cross-seed/torrents/{instanceID}/{hash}/analyze",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: Partial<{ name: string, size_bytes: number, content_path: string, num_files: number }>,
400: unknown,
500: unknown,
},
      
    }
/**
 * Returns the current async filtering progress for a torrent, including whether content filtering has completed
 */
export type get__api_crossSeed_torrents_InstanceID_Hash_asyncStatus = {
      method: "GET",
      path: "/api/cross-seed/torrents/{instanceID}/{hash}/async-status",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: Schemas.AsyncIndexerFilteringState,
400: unknown,
500: unknown,
},
      
    }
/**
 * Query configured Torznab indexers for releases matching an existing torrent
 */
export type post__api_crossSeed_torrents_InstanceID_Hash_search = {
      method: "POST",
      path: "/api/cross-seed/torrents/{instanceID}/{hash}/search",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  Schemas.CrossSeedTorrentSearchRequest,
          }
      responses: {200: Schemas.CrossSeedTorrentSearchResponse,
400: unknown,
500: unknown,
},
      
    }
/**
 * Downloads selected results and queues them for cross-seeding on the specified instance
 */
export type post__api_crossSeed_torrents_InstanceID_Hash_apply = {
      method: "POST",
      path: "/api/cross-seed/torrents/{instanceID}/{hash}/apply",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, hash: string },
        
        
        body:  Schemas.CrossSeedApplyRequest,
          }
      responses: {200: Schemas.CrossSeedApplyResponse,
400: unknown,
500: unknown,
},
      
    }
/**
 * Find torrents across all qBittorrent instances that match the specified torrent (by content path, name, or release metadata)
 */
export type get__api_crossSeed_torrents_InstanceID_Hash_localMatches = {
      method: "GET",
      path: "/api/cross-seed/torrents/{instanceID}/{hash}/local-matches",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ strict: boolean }>,
        path:  { instanceID: number, hash: string },
        
        
        
          }
      responses: {200: { matches: Array<Schemas.LocalCrossSeedMatch> },
400: unknown,
500: unknown,
},
      
    }
/**
 * Get the current log configuration including level, file path, and rotation settings
 */
export type get__api_logSettings = {
      method: "GET",
      path: "/api/log-settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.LogSettings,
},
      
    }
/**
 * Update log configuration. Changes are applied immediately.
 */
export type put__api_logSettings = {
      method: "PUT",
      path: "/api/log-settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.LogSettingsUpdate,
          }
      responses: {200: Schemas.LogSettings,
400: unknown,
},
      
    }
/**
 * Get the list of muted log message patterns
 */
export type get__api_logExclusions = {
      method: "GET",
      path: "/api/log-exclusions",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.LogExclusions,
},
      
    }
/**
 * Replace the list of muted log message patterns
 */
export type put__api_logExclusions = {
      method: "PUT",
      path: "/api/log-exclusions",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        
        
        
        body:  Schemas.LogExclusionsInput,
          }
      responses: {200: Schemas.LogExclusions,
},
      
    }
/**
 * Server-Sent Events endpoint for streaming live log lines. Sends initial history (configurable via limit parameter) then streams new log lines in real-time.
 */
export type get__api_logs_stream = {
      method: "GET",
      path: "/api/logs/stream",
      requestFormat: "json",
      responseFormat: "sse",
      parameters: {
            query?:  Partial<{ limit: number }>,
        
        
        
        
          }
      responses: {200: ReadableStream<Uint8Array>,
},
      
    }
/**
 * List the log files (active and rotated) in the configured log directory. Returns an empty list when file logging is not configured.
 */
export type get__api_logs_files = {
      method: "GET",
      path: "/api/logs/files",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Array<Schemas.LogFile>,
},
      
    }
/**
 * Download a single log file from the configured log directory. The filename must exactly match an entry returned by the log file listing.
 */
export type get__api_logs_files_Filename = {
      method: "GET",
      path: "/api/logs/files/{filename}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { filename: string },
        
        
        
          }
      responses: {200: unknown,
404: unknown,
},
      
    }
/**
 * Check if a newer version of qui is available
 */
export type get__api_version_latest = {
      method: "GET",
      path: "/api/version/latest",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.LatestVersionResponse,
204: unknown,
},
      
    }
/**
 * Returns the version qui is currently running, along with whether a newer release is available. Useful for monitoring tools (e.g. Argus) that track the deployed version of a service.
 */
export type get__api_version = {
      method: "GET",
      path: "/api/version",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Schemas.VersionResponse,
},
      
    }
/**
 * Import a backup manifest file to create a new backup run record. This allows restoring backup metadata from a previously exported manifest.
 */
export type post__api_instances_InstanceID_backups_import = {
      method: "POST",
      path: "/api/instances/{instanceID}/backups/import",
      requestFormat: "form-data",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body?:  Partial<{
  /**
   * Compressed backup archive (zip, tar.gz, tar.zst, tar.br, tar.xz, tar) containing manifest.json and torrent files
   */
  archive: Blob;
  /**
   * JSON manifest file exported from a backup run
   */
  manifest: Blob;
}>,
          }
      responses: {201: Schemas.BackupRun,
400: unknown,
500: unknown,
},
      
    }
/**
 * Build a restore plan for the specified backup run without applying any changes.
 */
export type post__api_instances_InstanceID_backups_runs_RunId_restore_preview = {
      method: "POST",
      path: "/api/instances/{instanceID}/backups/runs/{runId}/restore/preview",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, runId: number },
        
        
        body?:  Partial<{
  /**
   * Restore mode
   */
  mode: ("incremental" | "overwrite" | "complete");
  /**
   * Torrent hashes to exclude from the generated plan.
   */
  excludeHashes: Array<string>;
  /**
   * Start restored torrents paused. Defaults to true.
   */
  startPaused: boolean;
  /**
   * Skip re-checking the restored torrent data. Defaults to false.
   */
  skipHashCheck: boolean;
  /**
   * Automatically resume torrents once qBittorrent reports them as fully verified. Defaults to true when skip recheck is enabled.
   */
  autoResumeVerified: boolean;
}>,
          }
      responses: {200: Record<string, unknown>,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Execute the restore plan for the specified backup run.
 */
export type post__api_instances_InstanceID_backups_runs_RunId_restore = {
      method: "POST",
      path: "/api/instances/{instanceID}/backups/runs/{runId}/restore",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, runId: number },
        
        
        body:  {
  /**
   * Restore mode
   */
  mode: ("incremental" | "overwrite" | "complete");
  /**
   * When true, no changes are applied and the plan is returned.
   */
  dryRun?: boolean;
  /**
   * Torrent hashes to exclude from the restore plan and execution.
   */
  excludeHashes?: Array<string>;
  /**
   * Start restored torrents paused. Defaults to true.
   */
  startPaused?: boolean;
  /**
   * Skip re-checking the restored torrent data. Defaults to false.
   */
  skipHashCheck?: boolean;
  /**
   * Automatically resume torrents once qBittorrent reports them as fully verified. Defaults to true when skip recheck is enabled.
   */
  autoResumeVerified?: boolean;
},
          }
      responses: {200: Record<string, unknown>,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Download the backup archive for the specified backup run in the requested format.
 */
export type get__api_instances_InstanceID_backups_runs_RunId_download = {
      method: "GET",
      path: "/api/instances/{instanceID}/backups/runs/{runId}/download",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ format: ("zip" | "tar.gz" | "tar.zst" | "tar.br" | "tar.xz" | "tar") }>,
        path:  { instanceID: number, runId: number },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Download a specific torrent file from the backup archive.
 */
export type get__api_instances_InstanceID_backups_runs_RunId_items_TorrentHash_download = {
      method: "GET",
      path: "/api/instances/{instanceID}/backups/runs/{runId}/items/{torrentHash}/download",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, runId: number, torrentHash: string },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
404: unknown,
500: unknown,
},
      
    }
/**
 * Get orphan file scanning settings for an instance. Requires local filesystem access.
 */
export type get__api_instances_InstanceID_orphanScan_settings = {
      method: "GET",
      path: "/api/instances/{instanceID}/orphan-scan/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Schemas.OrphanScanSettings,
403: unknown,
404: unknown,
},
      
    }
/**
 * Update orphan file scanning settings for an instance. Requires local filesystem access.
 */
export type put__api_instances_InstanceID_orphanScan_settings = {
      method: "PUT",
      path: "/api/instances/{instanceID}/orphan-scan/settings",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  Schemas.OrphanScanSettingsUpdate,
          }
      responses: {200: Schemas.OrphanScanSettings,
400: unknown,
403: unknown,
404: unknown,
},
      
    }
/**
 * Start a manual orphan file scan for an instance. Returns immediately with the run ID.
 */
export type post__api_instances_InstanceID_orphanScan_scan = {
      method: "POST",
      path: "/api/instances/{instanceID}/orphan-scan/scan",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {202: Partial<{
    /**
     * ID of the created scan run
     */
    runId: number;
  }>,
403: unknown,
404: unknown,
409: unknown,
},
      
    }
/**
 * Get recent orphan scan runs for an instance. Requires local filesystem access.
 */
export type get__api_instances_InstanceID_orphanScan_runs = {
      method: "GET",
      path: "/api/instances/{instanceID}/orphan-scan/runs",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ limit: number }>,
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Array<Schemas.OrphanScanRun>,
403: unknown,
404: unknown,
},
      
    }
/**
 * Get details of a specific scan run including the list of orphan files found. Requires local filesystem access.
 */
export type get__api_instances_InstanceID_orphanScan_runs_RunID = {
      method: "GET",
      path: "/api/instances/{instanceID}/orphan-scan/runs/{runID}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ limit: number, offset: number }>,
        path:  { instanceID: number, runID: number },
        
        
        
          }
      responses: {200: Schemas.OrphanScanRunWithFiles,
403: unknown,
404: unknown,
},
      
    }
/**
 * Cancel a pending, scanning, or preview_ready run. Cannot cancel runs that are actively deleting. Requires local filesystem access.
 */
export type delete__api_instances_InstanceID_orphanScan_runs_RunID = {
      method: "DELETE",
      path: "/api/instances/{instanceID}/orphan-scan/runs/{runID}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, runID: number },
        
        
        
          }
      responses: {200: Partial<{ status: string }>,
400: unknown,
403: unknown,
404: unknown,
409: unknown,
},
      
    }
/**
 * Confirm deletion of orphan files from a preview_ready run. This initiates the actual file deletion. Requires local filesystem access.
 */
export type post__api_instances_InstanceID_orphanScan_runs_RunID_confirm = {
      method: "POST",
      path: "/api/instances/{instanceID}/orphan-scan/runs/{runID}/confirm",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, runID: number },
        
        
        
          }
      responses: {202: Partial<{ status: string }>,
400: unknown,
403: unknown,
404: unknown,
409: unknown,
},
      
    }
/**
 * Server-Sent Events stream for real-time RSS feed updates
 */
export type get__api_instances_InstanceID_rss_events = {
      method: "GET",
      path: "/api/instances/{instanceID}/rss/events",
      requestFormat: "json",
      responseFormat: "sse",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: ReadableStream<Uint8Array>,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Retrieve all RSS feeds and folders for an instance
 */
export type get__api_instances_InstanceID_rss_items = {
      method: "GET",
      path: "/api/instances/{instanceID}/rss/items",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            query?:  Partial<{ withData: boolean }>,
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Schemas.RSSItems,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Remove an RSS feed or folder
 */
export type delete__api_instances_InstanceID_rss_items = {
      method: "DELETE",
      path: "/api/instances/{instanceID}/rss/items",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Path of the item to remove
   */
  path: string;
},
          }
      responses: {200: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Move an RSS feed or folder to a new location
 */
export type post__api_instances_InstanceID_rss_items_move = {
      method: "POST",
      path: "/api/instances/{instanceID}/rss/items/move",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Current path of the item
   */
  itemPath: string;
  /**
   * Destination path (empty for root)
   */
  destPath?: string;
},
          }
      responses: {200: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Trigger a manual refresh of an RSS feed or folder
 */
export type post__api_instances_InstanceID_rss_items_refresh = {
      method: "POST",
      path: "/api/instances/{instanceID}/rss/items/refresh",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Path of the item to refresh
   */
  itemPath: string;
},
          }
      responses: {200: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Create a new RSS folder
 */
export type post__api_instances_InstanceID_rss_folders = {
      method: "POST",
      path: "/api/instances/{instanceID}/rss/folders",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Path for the new folder
   */
  path: string;
},
          }
      responses: {201: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Add a new RSS feed
 */
export type post__api_instances_InstanceID_rss_feeds = {
      method: "POST",
      path: "/api/instances/{instanceID}/rss/feeds",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * URL of the RSS feed
   */
  url: string;
  /**
   * Optional folder path to add the feed to
   */
  path?: string;
},
          }
      responses: {201: Schemas.WarningResponse,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Change the URL of an existing RSS feed
 */
export type put__api_instances_InstanceID_rss_feeds_url = {
      method: "PUT",
      path: "/api/instances/{instanceID}/rss/feeds/url",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Path of the feed
   */
  path: string;
  /**
   * New URL for the feed
   */
  url: string;
},
          }
      responses: {200: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Mark RSS articles as read
 */
export type post__api_instances_InstanceID_rss_articles_read = {
      method: "POST",
      path: "/api/instances/{instanceID}/rss/articles/read",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Path of the feed
   */
  itemPath: string;
  /**
   * Optional specific article ID (omit to mark all as read)
   */
  articleId?: string;
},
          }
      responses: {200: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Retrieve all RSS auto-download rules
 */
export type get__api_instances_InstanceID_rss_rules = {
      method: "GET",
      path: "/api/instances/{instanceID}/rss/rules",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: Record<string, Schemas.RSSAutoDownloadRule>,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Create a new rule or update an existing one
 */
export type post__api_instances_InstanceID_rss_rules = {
      method: "POST",
      path: "/api/instances/{instanceID}/rss/rules",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        body:  {
  /**
   * Name of the rule
   */
  name: string;
  rule: Schemas.RSSAutoDownloadRule;
},
          }
      responses: {201: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Trigger qBittorrent to reprocess all unread articles against rules
 */
export type post__api_instances_InstanceID_rss_rules_reprocess = {
      method: "POST",
      path: "/api/instances/{instanceID}/rss/rules/reprocess",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Delete an RSS auto-download rule
 */
export type delete__api_instances_InstanceID_rss_rules_RuleName = {
      method: "DELETE",
      path: "/api/instances/{instanceID}/rss/rules/{ruleName}",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, ruleName: string },
        
        
        
          }
      responses: {200: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Rename an existing RSS auto-download rule
 */
export type put__api_instances_InstanceID_rss_rules_RuleName_rename = {
      method: "PUT",
      path: "/api/instances/{instanceID}/rss/rules/{ruleName}/rename",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, ruleName: string },
        
        
        body:  {
  /**
   * New name for the rule
   */
  newName: string;
},
          }
      responses: {200: unknown,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Get articles that would match an RSS rule
 */
export type get__api_instances_InstanceID_rss_rules_RuleName_preview = {
      method: "GET",
      path: "/api/instances/{instanceID}/rss/rules/{ruleName}/preview",
      requestFormat: "json",
      responseFormat: "json",
      parameters: {
            
        path:  { instanceID: number, ruleName: string },
        
        
        
          }
      responses: {200: Record<string, Array<string>>,
400: unknown,
409: unknown,
500: unknown,
},
      
    }
/**
 * Check if the API is healthy and responding
 */
export type get__health = {
      method: "GET",
      path: "/health",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: Partial<{ status: string }>,
},
      
    }
/**
 * Check if the service and its dependencies are ready to receive traffic
 */
export type get__healthz_readiness = {
      method: "GET",
      path: "/healthz/readiness",
      requestFormat: "json",
      responseFormat: "json",
      parameters: never,
      responses: {200: unknown,
503: unknown,
},
      
    }
/**
 * Simple liveness check to confirm the service is running
 */
export type get__healthz_liveness = {
      method: "GET",
      path: "/healthz/liveness",
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
     post: {
           "/api/auth/setup": Endpoints.post__api_auth_setup,
"/api/auth/login": Endpoints.post__api_auth_login,
"/api/auth/logout": Endpoints.post__api_auth_logout,
"/api/api-keys": Endpoints.post__api_apiKeys,
"/api/client-api-keys": Endpoints.post__api_clientApiKeys,
"/api/external-programs": Endpoints.post__api_externalPrograms,
"/api/external-programs/execute": Endpoints.post__api_externalPrograms_execute,
"/api/notifications/targets": Endpoints.post__api_notifications_targets,
"/api/notifications/targets/{id}/test": Endpoints.post__api_notifications_targets_Id_test,
"/api/arr/instances": Endpoints.post__api_arr_instances,
"/api/arr/instances/{id}/test": Endpoints.post__api_arr_instances_Id_test,
"/api/arr/test": Endpoints.post__api_arr_test,
"/api/arr/resolve": Endpoints.post__api_arr_resolve,
"/api/instances": Endpoints.post__api_instances,
"/api/instances/{instanceID}/test": Endpoints.post__api_instances_InstanceID_test,
"/api/instances/{instanceID}/torrents": Endpoints.post__api_instances_InstanceID_torrents,
"/api/instances/{instanceID}/torrents/check-duplicates": Endpoints.post__api_instances_InstanceID_torrents_checkDuplicates,
"/api/instances/{instanceID}/torrents/bulk-action": Endpoints.post__api_instances_InstanceID_torrents_bulkAction,
"/api/instances/{instanceID}/torrents/field": Endpoints.post__api_instances_InstanceID_torrents_field,
"/api/instances/{instanceID}/torrents/{hash}/trackers": Endpoints.post__api_instances_InstanceID_torrents_Hash_trackers,
"/api/instances/{instanceID}/torrents/add-peers": Endpoints.post__api_instances_InstanceID_torrents_addPeers,
"/api/instances/{instanceID}/torrents/ban-peers": Endpoints.post__api_instances_InstanceID_torrents_banPeers,
"/api/instances/{instanceID}/torrent-creator": Endpoints.post__api_instances_InstanceID_torrentCreator,
"/api/instances/{instanceID}/categories": Endpoints.post__api_instances_InstanceID_categories,
"/api/instances/{instanceID}/tags": Endpoints.post__api_instances_InstanceID_tags,
"/api/instances/{instanceID}/alternative-speed-limits/toggle": Endpoints.post__api_instances_InstanceID_alternativeSpeedLimits_toggle,
"/api/license/activate": Endpoints.post__api_license_activate,
"/api/license/validate": Endpoints.post__api_license_validate,
"/api/license/refresh": Endpoints.post__api_license_refresh,
"/api/dir-scan/directories": Endpoints.post__api_dirScan_directories,
"/api/dir-scan/directories/{directoryID}/reset-files": Endpoints.post__api_dirScan_directories_DirectoryID_resetFiles,
"/api/dir-scan/directories/{directoryID}/scan": Endpoints.post__api_dirScan_directories_DirectoryID_scan,
"/api/dir-scan/webhook/scan": Endpoints.post__api_dirScan_webhook_scan,
"/api/cross-seed/run": Endpoints.post__api_crossSeed_run,
"/api/cross-seed/run/cancel": Endpoints.post__api_crossSeed_run_cancel,
"/api/cross-seed/blocklist": Endpoints.post__api_crossSeed_blocklist,
"/api/cross-seed/search/run": Endpoints.post__api_crossSeed_search_run,
"/api/cross-seed/search/run/cancel": Endpoints.post__api_crossSeed_search_run_cancel,
"/api/cross-seed/season-pack/check": Endpoints.post__api_crossSeed_seasonPack_check,
"/api/cross-seed/season-pack/apply": Endpoints.post__api_crossSeed_seasonPack_apply,
"/api/cross-seed/webhook/check": Endpoints.post__api_crossSeed_webhook_check,
"/api/cross-seed/apply": Endpoints.post__api_crossSeed_apply,
"/api/cross-seed/torrents/{instanceID}/{hash}/search": Endpoints.post__api_crossSeed_torrents_InstanceID_Hash_search,
"/api/cross-seed/torrents/{instanceID}/{hash}/apply": Endpoints.post__api_crossSeed_torrents_InstanceID_Hash_apply,
"/api/instances/{instanceID}/backups/import": Endpoints.post__api_instances_InstanceID_backups_import,
"/api/instances/{instanceID}/backups/runs/{runId}/restore/preview": Endpoints.post__api_instances_InstanceID_backups_runs_RunId_restore_preview,
"/api/instances/{instanceID}/backups/runs/{runId}/restore": Endpoints.post__api_instances_InstanceID_backups_runs_RunId_restore,
"/api/instances/{instanceID}/orphan-scan/scan": Endpoints.post__api_instances_InstanceID_orphanScan_scan,
"/api/instances/{instanceID}/orphan-scan/runs/{runID}/confirm": Endpoints.post__api_instances_InstanceID_orphanScan_runs_RunID_confirm,
"/api/instances/{instanceID}/rss/items/move": Endpoints.post__api_instances_InstanceID_rss_items_move,
"/api/instances/{instanceID}/rss/items/refresh": Endpoints.post__api_instances_InstanceID_rss_items_refresh,
"/api/instances/{instanceID}/rss/folders": Endpoints.post__api_instances_InstanceID_rss_folders,
"/api/instances/{instanceID}/rss/feeds": Endpoints.post__api_instances_InstanceID_rss_feeds,
"/api/instances/{instanceID}/rss/articles/read": Endpoints.post__api_instances_InstanceID_rss_articles_read,
"/api/instances/{instanceID}/rss/rules": Endpoints.post__api_instances_InstanceID_rss_rules,
"/api/instances/{instanceID}/rss/rules/reprocess": Endpoints.post__api_instances_InstanceID_rss_rules_reprocess
         },
get: {
           "/api/auth/check-setup": Endpoints.get__api_auth_checkSetup,
"/api/auth/me": Endpoints.get__api_auth_me,
"/api/api-keys": Endpoints.get__api_apiKeys,
"/api/client-api-keys": Endpoints.get__api_clientApiKeys,
"/api/external-programs": Endpoints.get__api_externalPrograms,
"/api/notifications/events": Endpoints.get__api_notifications_events,
"/api/notifications/targets": Endpoints.get__api_notifications_targets,
"/api/arr/instances": Endpoints.get__api_arr_instances,
"/api/arr/instances/{id}": Endpoints.get__api_arr_instances_Id,
"/api/instances": Endpoints.get__api_instances,
"/api/instances/{instanceID}/app-info": Endpoints.get__api_instances_InstanceID_appInfo,
"/api/instances/{instanceID}/capabilities": Endpoints.get__api_instances_InstanceID_capabilities,
"/api/instances/{instanceID}/transfer-info": Endpoints.get__api_instances_InstanceID_transferInfo,
"/api/instances/{instanceID}/getDirectoryContent": Endpoints.get__api_instances_InstanceID_getDirectoryContent,
"/api/instances/{instanceID}/reannounce/activity": Endpoints.get__api_instances_InstanceID_reannounce_activity,
"/api/instances/{instanceID}/reannounce/candidates": Endpoints.get__api_instances_InstanceID_reannounce_candidates,
"/api/instances/{instanceID}/cross-seed/status": Endpoints.get__api_instances_InstanceID_crossSeed_status,
"/api/instances/{instanceID}/torrents": Endpoints.get__api_instances_InstanceID_torrents,
"/api/instances/{instanceID}/torrents/{hash}/export": Endpoints.get__api_instances_InstanceID_torrents_Hash_export,
"/api/instances/{instanceID}/torrents/{hash}/properties": Endpoints.get__api_instances_InstanceID_torrents_Hash_properties,
"/api/instances/{instanceID}/torrents/{hash}/trackers": Endpoints.get__api_instances_InstanceID_torrents_Hash_trackers,
"/api/instances/{instanceID}/torrents/{hash}/webseeds": Endpoints.get__api_instances_InstanceID_torrents_Hash_webseeds,
"/api/instances/{instanceID}/torrents/{hash}/pieces": Endpoints.get__api_instances_InstanceID_torrents_Hash_pieces,
"/api/instances/{instanceID}/torrents/{hash}/files": Endpoints.get__api_instances_InstanceID_torrents_Hash_files,
"/api/instances/{instanceID}/torrents/{hash}/files/{fileIndex}/download": Endpoints.get__api_instances_InstanceID_torrents_Hash_files_FileIndex_download,
"/api/instances/{instanceID}/torrents/{hash}/files/{fileIndex}/mediainfo": Endpoints.get__api_instances_InstanceID_torrents_Hash_files_FileIndex_mediainfo,
"/api/instances/{instanceID}/mediainfo": Endpoints.get__api_instances_InstanceID_mediainfo,
"/proxy/{api-key}/api/v2/torrents/mediainfo": Endpoints.get__proxy_ApiKey_api_v2_torrents_mediainfo,
"/api/instances/{instanceID}/torrents/{hash}/peers": Endpoints.get__api_instances_InstanceID_torrents_Hash_peers,
"/api/instances/{instanceID}/torrent-creator/status": Endpoints.get__api_instances_InstanceID_torrentCreator_status,
"/api/instances/{instanceID}/torrent-creator/count": Endpoints.get__api_instances_InstanceID_torrentCreator_count,
"/api/instances/{instanceID}/torrent-creator/{taskID}/file": Endpoints.get__api_instances_InstanceID_torrentCreator_TaskID_file,
"/api/instances/{instanceID}/categories": Endpoints.get__api_instances_InstanceID_categories,
"/api/instances/{instanceID}/tags": Endpoints.get__api_instances_InstanceID_tags,
"/api/instances/{instanceID}/trackers": Endpoints.get__api_instances_InstanceID_trackers,
"/api/instances/{instanceID}/preferences": Endpoints.get__api_instances_InstanceID_preferences,
"/api/instances/{instanceID}/alternative-speed-limits": Endpoints.get__api_instances_InstanceID_alternativeSpeedLimits,
"/api/license/licensed": Endpoints.get__api_license_licensed,
"/api/license/licenses": Endpoints.get__api_license_licenses,
"/api/themes/custom": Endpoints.get__api_themes_custom,
"/api/torrents/cross-instance": Endpoints.get__api_torrents_crossInstance,
"/api/tracker-icons": Endpoints.get__api_trackerIcons,
"/api/cross-seed/settings": Endpoints.get__api_crossSeed_settings,
"/api/dir-scan/settings": Endpoints.get__api_dirScan_settings,
"/api/dir-scan/directories": Endpoints.get__api_dirScan_directories,
"/api/dir-scan/directories/{directoryID}": Endpoints.get__api_dirScan_directories_DirectoryID,
"/api/dir-scan/directories/{directoryID}/status": Endpoints.get__api_dirScan_directories_DirectoryID_status,
"/api/dir-scan/directories/{directoryID}/runs": Endpoints.get__api_dirScan_directories_DirectoryID_runs,
"/api/dir-scan/directories/{directoryID}/runs/{runID}/injections": Endpoints.get__api_dirScan_directories_DirectoryID_runs_RunID_injections,
"/api/dir-scan/directories/{directoryID}/files": Endpoints.get__api_dirScan_directories_DirectoryID_files,
"/api/cross-seed/status": Endpoints.get__api_crossSeed_status,
"/api/cross-seed/runs": Endpoints.get__api_crossSeed_runs,
"/api/cross-seed/blocklist": Endpoints.get__api_crossSeed_blocklist,
"/api/cross-seed/search/settings": Endpoints.get__api_crossSeed_search_settings,
"/api/cross-seed/search/status": Endpoints.get__api_crossSeed_search_status,
"/api/cross-seed/search/runs": Endpoints.get__api_crossSeed_search_runs,
"/api/cross-seed/completion/{instanceId}": Endpoints.get__api_crossSeed_completion_InstanceId,
"/api/cross-seed/season-pack/runs": Endpoints.get__api_crossSeed_seasonPack_runs,
"/api/cross-seed/torrents/{instanceID}/{hash}/analyze": Endpoints.get__api_crossSeed_torrents_InstanceID_Hash_analyze,
"/api/cross-seed/torrents/{instanceID}/{hash}/async-status": Endpoints.get__api_crossSeed_torrents_InstanceID_Hash_asyncStatus,
"/api/cross-seed/torrents/{instanceID}/{hash}/local-matches": Endpoints.get__api_crossSeed_torrents_InstanceID_Hash_localMatches,
"/api/log-settings": Endpoints.get__api_logSettings,
"/api/log-exclusions": Endpoints.get__api_logExclusions,
"/api/logs/stream": Endpoints.get__api_logs_stream,
"/api/logs/files": Endpoints.get__api_logs_files,
"/api/logs/files/{filename}": Endpoints.get__api_logs_files_Filename,
"/api/version/latest": Endpoints.get__api_version_latest,
"/api/version": Endpoints.get__api_version,
"/api/instances/{instanceID}/backups/runs/{runId}/download": Endpoints.get__api_instances_InstanceID_backups_runs_RunId_download,
"/api/instances/{instanceID}/backups/runs/{runId}/items/{torrentHash}/download": Endpoints.get__api_instances_InstanceID_backups_runs_RunId_items_TorrentHash_download,
"/api/instances/{instanceID}/orphan-scan/settings": Endpoints.get__api_instances_InstanceID_orphanScan_settings,
"/api/instances/{instanceID}/orphan-scan/runs": Endpoints.get__api_instances_InstanceID_orphanScan_runs,
"/api/instances/{instanceID}/orphan-scan/runs/{runID}": Endpoints.get__api_instances_InstanceID_orphanScan_runs_RunID,
"/api/instances/{instanceID}/rss/events": Endpoints.get__api_instances_InstanceID_rss_events,
"/api/instances/{instanceID}/rss/items": Endpoints.get__api_instances_InstanceID_rss_items,
"/api/instances/{instanceID}/rss/rules": Endpoints.get__api_instances_InstanceID_rss_rules,
"/api/instances/{instanceID}/rss/rules/{ruleName}/preview": Endpoints.get__api_instances_InstanceID_rss_rules_RuleName_preview,
"/health": Endpoints.get__health,
"/healthz/readiness": Endpoints.get__healthz_readiness,
"/healthz/liveness": Endpoints.get__healthz_liveness
         },
put: {
           "/api/auth/change-password": Endpoints.put__api_auth_changePassword,
"/api/external-programs/{id}": Endpoints.put__api_externalPrograms_Id,
"/api/notifications/targets/{id}": Endpoints.put__api_notifications_targets_Id,
"/api/arr/instances/{id}": Endpoints.put__api_arr_instances_Id,
"/api/instances/order": Endpoints.put__api_instances_order,
"/api/instances/{instanceID}": Endpoints.put__api_instances_InstanceID,
"/api/instances/{instanceID}/status": Endpoints.put__api_instances_InstanceID_status,
"/api/instances/{instanceID}/torrents/{hash}/trackers": Endpoints.put__api_instances_InstanceID_torrents_Hash_trackers,
"/api/instances/{instanceID}/torrents/{hash}/files": Endpoints.put__api_instances_InstanceID_torrents_Hash_files,
"/api/instances/{instanceID}/torrents/{hash}/rename": Endpoints.put__api_instances_InstanceID_torrents_Hash_rename,
"/api/instances/{instanceID}/torrents/{hash}/rename-file": Endpoints.put__api_instances_InstanceID_torrents_Hash_renameFile,
"/api/instances/{instanceID}/torrents/{hash}/rename-folder": Endpoints.put__api_instances_InstanceID_torrents_Hash_renameFolder,
"/api/instances/{instanceID}/categories": Endpoints.put__api_instances_InstanceID_categories,
"/api/cross-seed/settings": Endpoints.put__api_crossSeed_settings,
"/api/cross-seed/completion/{instanceId}": Endpoints.put__api_crossSeed_completion_InstanceId,
"/api/log-settings": Endpoints.put__api_logSettings,
"/api/log-exclusions": Endpoints.put__api_logExclusions,
"/api/instances/{instanceID}/orphan-scan/settings": Endpoints.put__api_instances_InstanceID_orphanScan_settings,
"/api/instances/{instanceID}/rss/feeds/url": Endpoints.put__api_instances_InstanceID_rss_feeds_url,
"/api/instances/{instanceID}/rss/rules/{ruleName}/rename": Endpoints.put__api_instances_InstanceID_rss_rules_RuleName_rename
         },
delete: {
           "/api/api-keys/{id}": Endpoints.delete__api_apiKeys_Id,
"/api/client-api-keys/{id}": Endpoints.delete__api_clientApiKeys_Id,
"/api/external-programs/{id}": Endpoints.delete__api_externalPrograms_Id,
"/api/notifications/targets/{id}": Endpoints.delete__api_notifications_targets_Id,
"/api/arr/instances/{id}": Endpoints.delete__api_arr_instances_Id,
"/api/instances/{instanceID}": Endpoints.delete__api_instances_InstanceID,
"/api/instances/{instanceID}/torrents/{hash}/trackers": Endpoints.delete__api_instances_InstanceID_torrents_Hash_trackers,
"/api/instances/{instanceID}/torrent-creator/{taskID}": Endpoints.delete__api_instances_InstanceID_torrentCreator_TaskID,
"/api/instances/{instanceID}/categories": Endpoints.delete__api_instances_InstanceID_categories,
"/api/instances/{instanceID}/tags": Endpoints.delete__api_instances_InstanceID_tags,
"/api/license/{licenseKey}": Endpoints.delete__api_license_LicenseKey,
"/api/dir-scan/directories/{directoryID}": Endpoints.delete__api_dirScan_directories_DirectoryID,
"/api/dir-scan/directories/{directoryID}/scan": Endpoints.delete__api_dirScan_directories_DirectoryID_scan,
"/api/cross-seed/blocklist/{instanceID}/{infohash}": Endpoints.delete__api_crossSeed_blocklist_InstanceID_Infohash,
"/api/instances/{instanceID}/orphan-scan/runs/{runID}": Endpoints.delete__api_instances_InstanceID_orphanScan_runs_RunID,
"/api/instances/{instanceID}/rss/items": Endpoints.delete__api_instances_InstanceID_rss_items,
"/api/instances/{instanceID}/rss/rules/{ruleName}": Endpoints.delete__api_instances_InstanceID_rss_rules_RuleName
         },
patch: {
           "/api/instances/{instanceID}/preferences": Endpoints.patch__api_instances_InstanceID_preferences,
"/api/cross-seed/settings": Endpoints.patch__api_crossSeed_settings,
"/api/dir-scan/settings": Endpoints.patch__api_dirScan_settings,
"/api/dir-scan/directories/{directoryID}": Endpoints.patch__api_dirScan_directories_DirectoryID,
"/api/cross-seed/search/settings": Endpoints.patch__api_crossSeed_search_settings
         }
     }
     
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type PostEndpoints = EndpointByMethod["post"]
export type GetEndpoints = EndpointByMethod["get"]
export type PutEndpoints = EndpointByMethod["put"]
export type DeleteEndpoints = EndpointByMethod["delete"]
export type PatchEndpoints = EndpointByMethod["patch"]
    // </EndpointByMethod.Shorthands>
    