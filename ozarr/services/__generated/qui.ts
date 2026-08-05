// @ts-nocheck
import type * as __TypedOpenapi from "./qui.types.js";

  import { Effect, Schema, SchemaTransformation, Struct } from "effect";

// <DefaultSchemas>
const Boolean_default_false_prop = Schema.Boolean.pipe(Schema.withDecodingDefaultType(Effect.succeed(false)));
const Schema_default_0_prop = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(600)).pipe(Schema.withDecodingDefaultType(Effect.succeed(0)));
const Boolean_default_true_prop = Schema.Boolean.pipe(Schema.withDecodingDefaultType(Effect.succeed(true)));
const Int_default_0_prop = Schema.Int.pipe(Schema.withDecodingDefaultType(Effect.succeed(0)));
const Int_default_15_prop = Schema.Int.pipe(Schema.withDecodingDefaultType(Effect.succeed(15)));
const Array_default_value_prop = Schema.suspend(() => Schema.Array(Schema.suspend(() => PathMapping))).pipe(Schema.withDecodingDefaultType(Effect.succeed([])));
const Union_default_false_prop = Schema.Union([Schema.Boolean, Schema.String, Schema.Number]).pipe(Schema.decodeTo(Schema.Boolean, SchemaTransformation.transform({ decode: (x) => x === true || x === "true" || x === 1 || x === "1", encode: (a) => a }))).pipe(Schema.withDecodingDefaultType(Effect.succeed(false)));
const Schema_default_0_prop_7 = Schema.NumberFromString.check(Schema.isInt()).pipe(Schema.withDecodingDefaultType(Effect.succeed(0)));
const Schema_default_500_prop = Schema.NumberFromString.check(Schema.isInt(), Schema.isLessThanOrEqualTo(2000)).pipe(Schema.withDecodingDefaultType(Effect.succeed(500)));
const Schema_default_desc_prop = Schema.Literals(["asc", "desc"]).pipe(Schema.withDecodingDefaultType(Effect.succeed("desc")));
const Schema_default_25_prop = Schema.NumberFromString.check(Schema.isInt(), Schema.isLessThanOrEqualTo(200)).pipe(Schema.withDecodingDefaultType(Effect.succeed(25)));
const Schema_default_20_prop = Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(200)).pipe(Schema.withDecodingDefaultType(Effect.succeed(20)));
const Schema_default_1000_prop = Schema.NumberFromString.check(Schema.isInt()).pipe(Schema.withDecodingDefaultType(Effect.succeed(1000)));
const Schema_default_zip_prop = Schema.Literals(["zip", "tar.gz", "tar.zst", "tar.br", "tar.xz", "tar"]).pipe(Schema.withDecodingDefaultType(Effect.succeed("zip")));
const Schema_default_10_prop = Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(100)).pipe(Schema.withDecodingDefaultType(Effect.succeed(10)));
const Schema_default_100_prop = Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(1000)).pipe(Schema.withDecodingDefaultType(Effect.succeed(100)));
const Schema_default_0_prop_16 = Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)).pipe(Schema.withDecodingDefaultType(Effect.succeed(0)));
const Union_default_true_prop = Schema.Union([Schema.Boolean, Schema.String, Schema.Number]).pipe(Schema.decodeTo(Schema.Boolean, SchemaTransformation.transform({ decode: (x) => x === true || x === "true" || x === 1 || x === "1", encode: (a) => a }))).pipe(Schema.withDecodingDefaultType(Effect.succeed(true)));

// </DefaultSchemas>

// <Schemas>
export type User = __TypedOpenapi.Schemas.User;
export const User = Schema.Struct({ id: Schema.optional(Schema.Int), username: Schema.optional(Schema.String) });

export type ApiKey = __TypedOpenapi.Schemas.ApiKey;
export const ApiKey = Schema.Struct({ id: Schema.optional(Schema.Int), name: Schema.optional(Schema.String), createdAt: Schema.optional(Schema.String), lastUsedAt: Schema.optional(Schema.NullOr(Schema.String)) });

export type ClientApiKey = __TypedOpenapi.Schemas.ClientApiKey;
export const ClientApiKey = Schema.Struct({ id: Schema.optional(Schema.Int), clientName: Schema.optional(Schema.String), instanceId: Schema.optional(Schema.Int), instanceName: Schema.optional(Schema.String), createdAt: Schema.optional(Schema.String), lastUsedAt: Schema.optional(Schema.NullOr(Schema.String)) });

export type CrossSeedWebhookMatch = __TypedOpenapi.Schemas.CrossSeedWebhookMatch;
export const CrossSeedWebhookMatch = Schema.Struct({ instanceId: Schema.optional(Schema.Int), instanceName: Schema.optional(Schema.String), torrentHash: Schema.optional(Schema.String), torrentName: Schema.optional(Schema.String), matchType: Schema.optional(Schema.Literals(["metadata", "exact", "size"])), sizeDiff: Schema.optional(Schema.Number), progress: Schema.optional(Schema.Number) });

export type CrossSeedWebhookCheckResponse = __TypedOpenapi.Schemas.CrossSeedWebhookCheckResponse;
export const CrossSeedWebhookCheckResponse = Schema.Struct({ canCrossSeed: Schema.optional(Schema.Boolean), matches: Schema.optional(Schema.Array(CrossSeedWebhookMatch)), recommendation: Schema.optional(Schema.Literals(["download", "skip"])) });

export type PathMapping = __TypedOpenapi.Schemas.PathMapping;
export const PathMapping = Schema.Struct({ from: Schema.optional(Schema.String), to: Schema.optional(Schema.String) });

export type ExternalProgram = __TypedOpenapi.Schemas.ExternalProgram;
export const ExternalProgram = Schema.Struct({ id: Schema.optional(Schema.Int), name: Schema.optional(Schema.String), path: Schema.optional(Schema.String), args_template: Schema.optional(Schema.String), enabled: Schema.optional(Schema.Boolean), use_terminal: Schema.optional(Schema.Boolean), path_mappings: Schema.optional(Schema.Array(PathMapping)), created_at: Schema.optional(Schema.String), updated_at: Schema.optional(Schema.String) });

export type NotificationEventDefinition = __TypedOpenapi.Schemas.NotificationEventDefinition;
export const NotificationEventDefinition = Schema.Struct({ type: Schema.optional(Schema.String), label: Schema.optional(Schema.String), description: Schema.optional(Schema.String) });

export type NotificationTarget = __TypedOpenapi.Schemas.NotificationTarget;
export const NotificationTarget = Schema.Struct({ id: Schema.optional(Schema.Int), name: Schema.optional(Schema.String), url: Schema.optional(Schema.String), enabled: Schema.optional(Schema.Boolean), eventTypes: Schema.optional(Schema.Array(Schema.String)), createdAt: Schema.optional(Schema.String), updatedAt: Schema.optional(Schema.String) });

export type NotificationTargetRequest = __TypedOpenapi.Schemas.NotificationTargetRequest;
export const NotificationTargetRequest = Schema.Struct({ name: Schema.String, url: Schema.String, enabled: Schema.optional(Schema.Boolean), eventTypes: Schema.optional(Schema.Array(Schema.String)) });

export type NotificationTestRequest = __TypedOpenapi.Schemas.NotificationTestRequest;
export const NotificationTestRequest = Schema.Struct({ title: Schema.optional(Schema.String), message: Schema.optional(Schema.String) });

export type InstanceError = __TypedOpenapi.Schemas.InstanceError;
export const InstanceError = Schema.Struct({ id: Schema.optional(Schema.Int), instanceId: Schema.optional(Schema.Int), errorType: Schema.optional(Schema.String), errorMessage: Schema.optional(Schema.String), occurredAt: Schema.optional(Schema.String) });

export type Instance = __TypedOpenapi.Schemas.Instance;
export const Instance = Schema.Struct({ id: Schema.optional(Schema.Int), name: Schema.optional(Schema.String), host: Schema.optional(Schema.String), username: Schema.optional(Schema.String), password: Schema.optional(Schema.String), hasApiKey: Schema.optional(Schema.Boolean), basic_username: Schema.optional(Schema.NullOr(Schema.String)), basic_password: Schema.optional(Schema.NullOr(Schema.String)), isActive: Schema.optional(Schema.Boolean), last_connected_at: Schema.optional(Schema.NullOr(Schema.String)), created_at: Schema.optional(Schema.String), updated_at: Schema.optional(Schema.String), connected: Schema.optional(Schema.Boolean), connectionError: Schema.optional(Schema.String), hasDecryptionError: Schema.optional(Schema.Boolean), recentErrors: Schema.optional(Schema.Array(InstanceError)), connectionStatus: Schema.optional(Schema.String), tlsSkipVerify: Schema.optional(Schema.Boolean), hasLocalFilesystemAccess: Schema.optional(Schema.Boolean), useHardlinks: Schema.optional(Schema.Boolean), hardlinkBaseDir: Schema.optional(Schema.String), hardlinkDirPreset: Schema.optional(Schema.Literals(["flat", "by-tracker", "by-instance"])), useReflinks: Schema.optional(Schema.Boolean), fallbackToRegularMode: Schema.optional(Schema.Boolean), sortOrder: Schema.optional(Schema.Int) });

export type InstanceCapabilities = __TypedOpenapi.Schemas.InstanceCapabilities;
export const InstanceCapabilities = Schema.Struct({ supportsTorrentCreation: Schema.optional(Schema.Boolean), supportsTorrentExport: Schema.optional(Schema.Boolean), supportsSetTags: Schema.optional(Schema.Boolean), supportsSetComment: Schema.optional(Schema.Boolean), supportsTrackerHealth: Schema.optional(Schema.Boolean), supportsTrackerEditing: Schema.optional(Schema.Boolean), supportsRenameTorrent: Schema.optional(Schema.Boolean), supportsRenameFile: Schema.optional(Schema.Boolean), supportsRenameFolder: Schema.optional(Schema.Boolean), supportsFilePriority: Schema.optional(Schema.Boolean), supportsSubcategories: Schema.optional(Schema.Boolean), subcategoriesAlwaysEnabled: Schema.optional(Schema.Boolean), supportsShareLimitsAction: Schema.optional(Schema.Boolean), supportsShareLimitsMode: Schema.optional(Schema.Boolean), webAPIVersion: Schema.optional(Schema.NullOr(Schema.String)) });

export type TransferInfo = __TypedOpenapi.Schemas.TransferInfo;
export const TransferInfo = Schema.Struct({ connection_status: Schema.optional(Schema.String), dht_nodes: Schema.optional(Schema.Int), dl_info_data: Schema.optional(Schema.Int), dl_info_speed: Schema.optional(Schema.Int), dl_rate_limit: Schema.optional(Schema.Int), up_info_data: Schema.optional(Schema.Int), up_info_speed: Schema.optional(Schema.Int), up_rate_limit: Schema.optional(Schema.Int) });

export type Torrent = __TypedOpenapi.Schemas.Torrent;
export const Torrent = Schema.Struct({ hash: Schema.optional(Schema.String), name: Schema.optional(Schema.String), size: Schema.optional(Schema.Int), progress: Schema.optional(Schema.Number), dlSpeed: Schema.optional(Schema.Int), upSpeed: Schema.optional(Schema.Int), priority: Schema.optional(Schema.Int), numSeeds: Schema.optional(Schema.Int), numLeechs: Schema.optional(Schema.Int), ratio: Schema.optional(Schema.Number), eta: Schema.optional(Schema.Int), state: Schema.optional(Schema.String), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.Array(Schema.String)), addedOn: Schema.optional(Schema.Int), completedOn: Schema.optional(Schema.Int), savePath: Schema.optional(Schema.String) });

export type TorrentProperties = __TypedOpenapi.Schemas.TorrentProperties;
export const TorrentProperties = Schema.Struct({ totalDownloaded: Schema.optional(Schema.Int), totalUploaded: Schema.optional(Schema.Int), downloadSpeed: Schema.optional(Schema.Int), uploadSpeed: Schema.optional(Schema.Int), eta: Schema.optional(Schema.Int), seedsActual: Schema.optional(Schema.Int), peersActual: Schema.optional(Schema.Int), shareRatio: Schema.optional(Schema.Number), uploadLimit: Schema.optional(Schema.Int), downloadLimit: Schema.optional(Schema.Int), totalSize: Schema.optional(Schema.Int), completedSize: Schema.optional(Schema.Int), additionDate: Schema.optional(Schema.Int), completionDate: Schema.optional(Schema.Int), createdBy: Schema.optional(Schema.String), comment: Schema.optional(Schema.String) });

export type Tracker = __TypedOpenapi.Schemas.Tracker;
export const Tracker = Schema.Struct({ url: Schema.optional(Schema.String), status: Schema.optional(Schema.Int), tier: Schema.optional(Schema.Int), numPeers: Schema.optional(Schema.Int), numSeeds: Schema.optional(Schema.Int), numLeeches: Schema.optional(Schema.Int), msg: Schema.optional(Schema.String) });

export type WebSeed = __TypedOpenapi.Schemas.WebSeed;
export const WebSeed = Schema.Struct({ url: Schema.String });

export type TorrentFile = __TypedOpenapi.Schemas.TorrentFile;
export const TorrentFile = Schema.Struct({ name: Schema.optional(Schema.String), size: Schema.optional(Schema.Int), progress: Schema.optional(Schema.Number), priority: Schema.optional(Schema.Int), isSeed: Schema.optional(Schema.Boolean), availability: Schema.optional(Schema.Number) });

export type TorrentFileMediaInfoField = __TypedOpenapi.Schemas.TorrentFileMediaInfoField;
export const TorrentFileMediaInfoField = Schema.Struct({ name: Schema.String, value: Schema.String });

export type TorrentFileMediaInfoStream = __TypedOpenapi.Schemas.TorrentFileMediaInfoStream;
export const TorrentFileMediaInfoStream = Schema.Struct({ kind: Schema.String, fields: Schema.Array(TorrentFileMediaInfoField) });

export type TorrentFileMediaInfoResponse = __TypedOpenapi.Schemas.TorrentFileMediaInfoResponse;
export const TorrentFileMediaInfoResponse = Schema.Struct({ fileIndex: Schema.Int, relativePath: Schema.String, streams: Schema.Array(TorrentFileMediaInfoStream), rawJSON: Schema.String });

export type ContentPathMediaInfoResponse = __TypedOpenapi.Schemas.ContentPathMediaInfoResponse;
export const ContentPathMediaInfoResponse = Schema.Struct({ contentPath: Schema.String, summaryTxt: Schema.String, mediaInfoJson: Schema.Record(Schema.String, Schema.Unknown) });

export type DuplicateTorrentMatch = __TypedOpenapi.Schemas.DuplicateTorrentMatch;
export const DuplicateTorrentMatch = Schema.Struct({ hash: Schema.optional(Schema.String), infohash_v1: Schema.optional(Schema.NullOr(Schema.String)), infohash_v2: Schema.optional(Schema.NullOr(Schema.String)), name: Schema.optional(Schema.String), matched_hashes: Schema.optional(Schema.Array(Schema.String)) });

export type Category = __TypedOpenapi.Schemas.Category;
export const Category = Schema.Struct({ name: Schema.optional(Schema.String), savePath: Schema.optional(Schema.String) });

export type LogSettings = __TypedOpenapi.Schemas.LogSettings;
export const LogSettings = Schema.Struct({ level: Schema.Literals(["trace", "debug", "info", "warn", "error"]), path: Schema.String, maxSize: Schema.Int, maxBackups: Schema.Int, configPath: Schema.optional(Schema.String), locked: Schema.optional(Schema.Record(Schema.String, Schema.String)) });

export type LogSettingsUpdate = __TypedOpenapi.Schemas.LogSettingsUpdate;
export const LogSettingsUpdate = Schema.Struct({ level: Schema.optional(Schema.Literals(["trace", "debug", "info", "warn", "error"])), path: Schema.optional(Schema.String), maxSize: Schema.optional(Schema.Int), maxBackups: Schema.optional(Schema.Int) });

export type LogFile = __TypedOpenapi.Schemas.LogFile;
export const LogFile = Schema.Struct({ name: Schema.String, sizeBytes: Schema.Int, modTime: Schema.String });

export type LogExclusions = __TypedOpenapi.Schemas.LogExclusions;
export const LogExclusions = Schema.Struct({ id: Schema.Int, patterns: Schema.Array(Schema.String), createdAt: Schema.String, updatedAt: Schema.String });

export type LogExclusionsInput = __TypedOpenapi.Schemas.LogExclusionsInput;
export const LogExclusionsInput = Schema.Struct({ patterns: Schema.Array(Schema.String) });

export type LatestVersionResponse = __TypedOpenapi.Schemas.LatestVersionResponse;
export const LatestVersionResponse = Schema.Struct({ tag_name: Schema.String, name: Schema.optional(Schema.NullOr(Schema.String)), html_url: Schema.String, published_at: Schema.String });

export type VersionResponse = __TypedOpenapi.Schemas.VersionResponse;
export const VersionResponse = Schema.Struct({ version: Schema.String, latestVersion: Schema.optional(Schema.String), updateAvailable: Schema.Boolean });

export type QBittorrentBuildInfo = __TypedOpenapi.Schemas.QBittorrentBuildInfo;
export const QBittorrentBuildInfo = Schema.Struct({ qt: Schema.optional(Schema.String), libtorrent: Schema.optional(Schema.String), boost: Schema.optional(Schema.String), openssl: Schema.optional(Schema.String), zlib: Schema.optional(Schema.String), bitness: Schema.optional(Schema.Int), platform: Schema.optional(Schema.String) });

export type QBittorrentProcessInfo = __TypedOpenapi.Schemas.QBittorrentProcessInfo;
export const QBittorrentProcessInfo = Schema.Struct({ launchTime: Schema.optional(Schema.Int) });

export type QBittorrentAppInfo = __TypedOpenapi.Schemas.QBittorrentAppInfo;
export const QBittorrentAppInfo = Schema.Struct({ version: Schema.String, webAPIVersion: Schema.optional(Schema.String), buildInfo: Schema.optional(QBittorrentBuildInfo), processInfo: Schema.optional(QBittorrentProcessInfo) });

export type CrossSeedInstanceResult = __TypedOpenapi.Schemas.CrossSeedInstanceResult;
export const CrossSeedInstanceResult = Schema.Struct({ instance_id: Schema.optional(Schema.Int), instance_name: Schema.optional(Schema.String), success: Schema.optional(Schema.Boolean), status: Schema.optional(Schema.String), message: Schema.optional(Schema.NullOr(Schema.String)) });

export type CrossSeedRunResult = __TypedOpenapi.Schemas.CrossSeedRunResult;
export const CrossSeedRunResult = Schema.Struct({ instanceId: Schema.optional(Schema.Int), instanceName: Schema.optional(Schema.String), indexerName: Schema.optional(Schema.NullOr(Schema.String)), success: Schema.optional(Schema.Boolean), status: Schema.optional(Schema.String), message: Schema.optional(Schema.NullOr(Schema.String)), matchedTorrentHash: Schema.optional(Schema.NullOr(Schema.String)), matchedTorrentName: Schema.optional(Schema.NullOr(Schema.String)) });

export type CrossSeedRun = __TypedOpenapi.Schemas.CrossSeedRun;
export const CrossSeedRun = Schema.Struct({ id: Schema.optional(Schema.Int), triggeredBy: Schema.optional(Schema.String), mode: Schema.optional(Schema.Literals(["auto", "manual"])), status: Schema.optional(Schema.Literals(["pending", "running", "success", "partial", "failed"])), startedAt: Schema.optional(Schema.String), completedAt: Schema.optional(Schema.NullOr(Schema.String)), totalFeedItems: Schema.optional(Schema.Int), candidatesFound: Schema.optional(Schema.Int), torrentsAdded: Schema.optional(Schema.Int), torrentsFailed: Schema.optional(Schema.Int), torrentsSkipped: Schema.optional(Schema.Int), message: Schema.optional(Schema.NullOr(Schema.String)), errorMessage: Schema.optional(Schema.NullOr(Schema.String)), results: Schema.optional(Schema.Array(CrossSeedRunResult)) });

export type CrossSeedBlocklistEntry = __TypedOpenapi.Schemas.CrossSeedBlocklistEntry;
export const CrossSeedBlocklistEntry = Schema.Struct({ instanceId: Schema.optional(Schema.Int), infoHash: Schema.optional(Schema.String), note: Schema.optional(Schema.String), createdAt: Schema.optional(Schema.String) });

export type CrossSeedBlocklistRequest = __TypedOpenapi.Schemas.CrossSeedBlocklistRequest;
export const CrossSeedBlocklistRequest = Schema.Struct({ instanceId: Schema.Int, infoHash: Schema.String, note: Schema.optional(Schema.String) });

export type InstanceCrossSeedCompletionSettings = __TypedOpenapi.Schemas.InstanceCrossSeedCompletionSettings;
export const InstanceCrossSeedCompletionSettings = Schema.Struct({ instanceId: Schema.optional(Schema.Int), enabled: Schema.optional(Schema.Boolean), categories: Schema.optional(Schema.Array(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), excludeCategories: Schema.optional(Schema.Array(Schema.String)), excludeTags: Schema.optional(Schema.Array(Schema.String)), indexerIds: Schema.optional(Schema.Array(Schema.Int)), bypassTorznabCache: Boolean_default_false_prop, delaySeconds: Schema_default_0_prop });

export type InstanceCrossSeedCompletionSettingsRequest = __TypedOpenapi.Schemas.InstanceCrossSeedCompletionSettingsRequest;
export const InstanceCrossSeedCompletionSettingsRequest = Schema.Struct({ enabled: Schema.optional(Schema.Boolean), categories: Schema.optional(Schema.Array(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), excludeCategories: Schema.optional(Schema.Array(Schema.String)), excludeTags: Schema.optional(Schema.Array(Schema.String)), indexerIds: Schema.optional(Schema.Array(Schema.Int)), bypassTorznabCache: Boolean_default_false_prop, delaySeconds: Schema_default_0_prop });

export type SeasonPackCategoryRule = __TypedOpenapi.Schemas.SeasonPackCategoryRule;
export const SeasonPackCategoryRule = Schema.Struct({ resolution: Schema.String, source: Schema.optional(Schema.Literals(["", "WEB", "BLURAY", "REMUX", "HDTV"])), category: Schema.String });

export type CrossSeedAutomationSettingsPatch = __TypedOpenapi.Schemas.CrossSeedAutomationSettingsPatch;
export const CrossSeedAutomationSettingsPatch = Schema.Struct({ enabled: Schema.optional(Schema.Boolean), gazelleEnabled: Schema.optional(Schema.Boolean), redactedApiKey: Schema.optional(Schema.String), orpheusApiKey: Schema.optional(Schema.String), runIntervalMinutes: Schema.optional(Schema.Int), startPaused: Schema.optional(Schema.Boolean), category: Schema.optional(Schema.NullOr(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), targetInstanceIds: Schema.optional(Schema.Array(Schema.Int)), targetIndexerIds: Schema.optional(Schema.Array(Schema.Int)), maxResultsPerRun: Schema.optional(Schema.Int), findIndividualEpisodes: Schema.optional(Schema.Boolean), sizeMismatchTolerancePercent: Schema.optional(Schema.Number), useCategoryFromIndexer: Schema.optional(Schema.Boolean), useCrossCategoryAffix: Schema.optional(Schema.Boolean), categoryAffixMode: Schema.optional(Schema.Literals(["prefix", "suffix"])), categoryAffix: Schema.optional(Schema.String), useCustomCategory: Schema.optional(Schema.Boolean), customCategory: Schema.optional(Schema.String), runExternalProgramId: Schema.optional(Schema.NullOr(Schema.Int)), webhookSourceCategories: Schema.optional(Schema.Array(Schema.String)), webhookSourceTags: Schema.optional(Schema.Array(Schema.String)), webhookSourceExcludeCategories: Schema.optional(Schema.Array(Schema.String)), webhookSourceExcludeTags: Schema.optional(Schema.Array(Schema.String)), skipRecheck: Schema.optional(Schema.Boolean), useHardlinks: Schema.optional(Schema.Boolean), hardlinkBaseDir: Schema.optional(Schema.String), hardlinkDirPreset: Schema.optional(Schema.Literals(["flat", "by-tracker", "by-instance"])), seasonPackEnabled: Schema.optional(Schema.Boolean), seasonPackSkipRepackCompare: Schema.optional(Schema.Boolean), seasonPackSimplifyHdrCompare: Schema.optional(Schema.Boolean), seasonPackSimplifyWebCompare: Schema.optional(Schema.Boolean), seasonPackSkipYearCompare: Schema.optional(Schema.Boolean), seasonPackCoverageThreshold: Schema.optional(Schema.Number.check(Schema.isLessThanOrEqualTo(1), Schema.isGreaterThan(0))), seasonPackTags: Schema.optional(Schema.Array(Schema.String)), seasonPackCategory: Schema.optional(Schema.String), seasonPackCategoryRules: Schema.optional(Schema.Array(SeasonPackCategoryRule)), seasonPackTvdbApiKey: Schema.optional(Schema.String), seasonPackTvdbPin: Schema.optional(Schema.String) });

export type CrossSeedAutomationSettings = __TypedOpenapi.Schemas.CrossSeedAutomationSettings;
export const CrossSeedAutomationSettings = Schema.Struct({ enabled: Schema.optional(Schema.Boolean), gazelleEnabled: Schema.optional(Schema.Boolean), redactedApiKey: Schema.optional(Schema.String), orpheusApiKey: Schema.optional(Schema.String), runIntervalMinutes: Schema.optional(Schema.Int), startPaused: Schema.optional(Schema.Boolean), category: Schema.optional(Schema.NullOr(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), targetInstanceIds: Schema.optional(Schema.Array(Schema.Int)), targetIndexerIds: Schema.optional(Schema.Array(Schema.Int)), maxResultsPerRun: Schema.optional(Schema.Int), findIndividualEpisodes: Schema.optional(Schema.Boolean), sizeMismatchTolerancePercent: Schema.optional(Schema.Number), useCategoryFromIndexer: Schema.optional(Schema.Boolean), useCrossCategoryAffix: Schema.optional(Schema.Boolean), categoryAffixMode: Schema.optional(Schema.Literals(["prefix", "suffix"])), categoryAffix: Schema.optional(Schema.String), useCustomCategory: Schema.optional(Schema.Boolean), customCategory: Schema.optional(Schema.String), runExternalProgramId: Schema.optional(Schema.NullOr(Schema.Int)), webhookSourceCategories: Schema.optional(Schema.Array(Schema.String)), webhookSourceTags: Schema.optional(Schema.Array(Schema.String)), webhookSourceExcludeCategories: Schema.optional(Schema.Array(Schema.String)), webhookSourceExcludeTags: Schema.optional(Schema.Array(Schema.String)), skipRecheck: Schema.optional(Schema.Boolean), useHardlinks: Schema.optional(Schema.Boolean), hardlinkBaseDir: Schema.optional(Schema.String), hardlinkDirPreset: Schema.optional(Schema.Literals(["flat", "by-tracker", "by-instance"])), seasonPackEnabled: Schema.optional(Schema.Boolean), seasonPackSkipRepackCompare: Schema.optional(Schema.Boolean), seasonPackSimplifyHdrCompare: Schema.optional(Schema.Boolean), seasonPackSimplifyWebCompare: Schema.optional(Schema.Boolean), seasonPackSkipYearCompare: Schema.optional(Schema.Boolean), seasonPackCoverageThreshold: Schema.optional(Schema.Number.check(Schema.isLessThanOrEqualTo(1), Schema.isGreaterThan(0))), seasonPackTags: Schema.optional(Schema.Array(Schema.String)), seasonPackCategory: Schema.optional(Schema.String), seasonPackCategoryRules: Schema.optional(Schema.Array(SeasonPackCategoryRule)), seasonPackTvdbApiKey: Schema.optional(Schema.String), seasonPackTvdbPin: Schema.optional(Schema.String), createdAt: Schema.optional(Schema.String), updatedAt: Schema.optional(Schema.String) });

export type CrossSeedAutomationStatus = __TypedOpenapi.Schemas.CrossSeedAutomationStatus;
export const CrossSeedAutomationStatus = Schema.Struct({ settings: Schema.optional(CrossSeedAutomationSettings), lastRun: Schema.optional(CrossSeedRun), nextRunAt: Schema.optional(Schema.NullOr(Schema.String)), running: Schema.optional(Schema.Boolean) });

export type SeasonPackCheckRequest = __TypedOpenapi.Schemas.SeasonPackCheckRequest;
export const SeasonPackCheckRequest = Schema.Struct({ torrentName: Schema.String, torrentData: Schema.optional(Schema.String), instanceIds: Schema.optional(Schema.Array(Schema.Int)), indexer: Schema.optional(Schema.String) });

export type SeasonPackCheckMatch = __TypedOpenapi.Schemas.SeasonPackCheckMatch;
export const SeasonPackCheckMatch = Schema.Struct({ instanceId: Schema.optional(Schema.Int), matchedEpisodes: Schema.optional(Schema.Int), totalEpisodes: Schema.optional(Schema.Int), coverage: Schema.optional(Schema.Number) });

export type SeasonPackCheckResponse = __TypedOpenapi.Schemas.SeasonPackCheckResponse;
export const SeasonPackCheckResponse = Schema.Struct({ ready: Schema.optional(Schema.Boolean), reason: Schema.optional(Schema.String), message: Schema.optional(Schema.String), thresholdSkipped: Schema.optional(Schema.Boolean), matches: Schema.optional(Schema.Array(SeasonPackCheckMatch)) });

export type SeasonPackApplyRequest = __TypedOpenapi.Schemas.SeasonPackApplyRequest;
export const SeasonPackApplyRequest = Schema.Struct({ torrentName: Schema.String, torrentData: Schema.String, instanceIds: Schema.optional(Schema.Array(Schema.Int)), indexer: Schema.optional(Schema.String) });

export type SeasonPackApplyResponse = __TypedOpenapi.Schemas.SeasonPackApplyResponse;
export const SeasonPackApplyResponse = Schema.Struct({ applied: Schema.optional(Schema.Boolean), reason: Schema.optional(Schema.String), message: Schema.optional(Schema.String), instanceId: Schema.optional(Schema.Int), matchedEpisodes: Schema.optional(Schema.Int), totalEpisodes: Schema.optional(Schema.Int), coverage: Schema.optional(Schema.Number), linkMode: Schema.optional(Schema.String) });

export type SeasonPackRun = __TypedOpenapi.Schemas.SeasonPackRun;
export const SeasonPackRun = Schema.Struct({ id: Schema.optional(Schema.Int), torrentName: Schema.optional(Schema.String), phase: Schema.optional(Schema.String), status: Schema.optional(Schema.String), reason: Schema.optional(Schema.String), message: Schema.optional(Schema.String), instanceId: Schema.optional(Schema.NullOr(Schema.Int)), matchedEpisodes: Schema.optional(Schema.Int), totalEpisodes: Schema.optional(Schema.Int), coverage: Schema.optional(Schema.Number), linkMode: Schema.optional(Schema.String), createdAt: Schema.optional(Schema.String) });

export type CrossSeedSearchSettingsPatch = __TypedOpenapi.Schemas.CrossSeedSearchSettingsPatch;
export const CrossSeedSearchSettingsPatch = Schema.Struct({ instanceId: Schema.optional(Schema.NullOr(Schema.Int)), categories: Schema.optional(Schema.Array(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), indexerIds: Schema.optional(Schema.Array(Schema.Int)), intervalSeconds: Schema.optional(Schema.Int), cooldownMinutes: Schema.optional(Schema.Int) });

export type CrossSeedSearchSettings = __TypedOpenapi.Schemas.CrossSeedSearchSettings;
export const CrossSeedSearchSettings = Schema.Struct({ instanceId: Schema.optional(Schema.NullOr(Schema.Int)), categories: Schema.optional(Schema.Array(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), indexerIds: Schema.optional(Schema.Array(Schema.Int)), intervalSeconds: Schema.optional(Schema.Int), cooldownMinutes: Schema.optional(Schema.Int), createdAt: Schema.optional(Schema.String), updatedAt: Schema.optional(Schema.String) });

export type CrossSeedSearchResultStatus = __TypedOpenapi.Schemas.CrossSeedSearchResultStatus;
export const CrossSeedSearchResultStatus = Schema.Literals(["added", "skipped", "failed"]);

export type CrossSeedSearchRunStatus = __TypedOpenapi.Schemas.CrossSeedSearchRunStatus;
export const CrossSeedSearchRunStatus = Schema.Literals(["running", "success", "failed", "canceled"]);

export type CrossSeedSearchFilters = __TypedOpenapi.Schemas.CrossSeedSearchFilters;
export const CrossSeedSearchFilters = Schema.Struct({ categories: Schema.optional(Schema.Array(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)) });

export type CrossSeedSearchResult = __TypedOpenapi.Schemas.CrossSeedSearchResult;
export const CrossSeedSearchResult = Schema.Struct({ torrentHash: Schema.optional(Schema.String), torrentName: Schema.optional(Schema.String), indexerName: Schema.optional(Schema.String), releaseTitle: Schema.optional(Schema.String), status: Schema.optional(CrossSeedSearchResultStatus), message: Schema.optional(Schema.String), processedAt: Schema.optional(Schema.String) });

export type CrossSeedSearchRun = __TypedOpenapi.Schemas.CrossSeedSearchRun;
export const CrossSeedSearchRun = Schema.Struct({ id: Schema.optional(Schema.Int), instanceId: Schema.optional(Schema.Int), status: Schema.optional(CrossSeedSearchRunStatus), startedAt: Schema.optional(Schema.String), completedAt: Schema.optional(Schema.NullOr(Schema.String)), totalTorrents: Schema.optional(Schema.Int), processed: Schema.optional(Schema.Int), torrentsAdded: Schema.optional(Schema.Int), torrentsFailed: Schema.optional(Schema.Int), torrentsSkipped: Schema.optional(Schema.Int), message: Schema.optional(Schema.NullOr(Schema.String)), errorMessage: Schema.optional(Schema.NullOr(Schema.String)), filters: Schema.optional(CrossSeedSearchFilters), indexerIds: Schema.optional(Schema.Array(Schema.Int)), intervalSeconds: Schema.optional(Schema.Int), cooldownMinutes: Schema.optional(Schema.Int), results: Schema.optional(Schema.Array(CrossSeedSearchResult)), createdAt: Schema.optional(Schema.String) });

export type CrossSeedSearchCandidate = __TypedOpenapi.Schemas.CrossSeedSearchCandidate;
export const CrossSeedSearchCandidate = Schema.Struct({ torrentHash: Schema.optional(Schema.String), torrentName: Schema.optional(Schema.String), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.Array(Schema.String)) });

export type CrossSeedSearchStatus = __TypedOpenapi.Schemas.CrossSeedSearchStatus;
export const CrossSeedSearchStatus = Schema.Struct({ running: Schema.optional(Schema.Boolean), run: Schema.optional(CrossSeedSearchRun), currentTorrent: Schema.optional(CrossSeedSearchCandidate), recentResults: Schema.optional(Schema.Array(CrossSeedSearchResult)), nextRunAt: Schema.optional(Schema.NullOr(Schema.String)), effectiveIntervalSeconds: Schema.optional(Schema.Int) });

export type CrossSeedRunRequest = __TypedOpenapi.Schemas.CrossSeedRunRequest;
export const CrossSeedRunRequest = Schema.Struct({ dryRun: Schema.optional(Schema.Boolean) });

export type CrossSeedTorrentInfo = __TypedOpenapi.Schemas.CrossSeedTorrentInfo;
export const CrossSeedTorrentInfo = Schema.Struct({ instance_id: Schema.optional(Schema.NullOr(Schema.Int)), instance_name: Schema.optional(Schema.NullOr(Schema.String)), hash: Schema.optional(Schema.NullOr(Schema.String)), name: Schema.optional(Schema.String), category: Schema.optional(Schema.NullOr(Schema.String)), size: Schema.optional(Schema.NullOr(Schema.Int)), progress: Schema.optional(Schema.NullOr(Schema.Number)), total_files: Schema.optional(Schema.NullOr(Schema.Int)), matching_files: Schema.optional(Schema.NullOr(Schema.Int)), file_count: Schema.optional(Schema.NullOr(Schema.Int)), content_type: Schema.optional(Schema.NullOr(Schema.String)), search_type: Schema.optional(Schema.NullOr(Schema.String)), search_categories: Schema.optional(Schema.Array(Schema.Int)), required_caps: Schema.optional(Schema.Array(Schema.String)), available_indexers: Schema.optional(Schema.Array(Schema.Int)), filtered_indexers: Schema.optional(Schema.Array(Schema.Int)), excluded_indexers: Schema.optional(Schema.Record(Schema.String, Schema.String)), content_matches: Schema.optional(Schema.Array(Schema.String)), content_filtering_completed: Schema.optional(Schema.NullOr(Schema.Boolean)), disc_layout: Schema.optional(Schema.Boolean), disc_marker: Schema.optional(Schema.String) });

export type AsyncIndexerFilteringState = __TypedOpenapi.Schemas.AsyncIndexerFilteringState;
export const AsyncIndexerFilteringState = Schema.Struct({ capabilities_completed: Schema.optional(Schema.Boolean), content_completed: Schema.optional(Schema.Boolean), capability_indexers: Schema.optional(Schema.Array(Schema.Int)), filtered_indexers: Schema.optional(Schema.Array(Schema.Int)), excluded_indexers: Schema.optional(Schema.Record(Schema.String, Schema.String)), content_matches: Schema.optional(Schema.Array(Schema.String)), error: Schema.optional(Schema.String) });

export type CrossSeedTorrentSearchRequest = __TypedOpenapi.Schemas.CrossSeedTorrentSearchRequest;
export const CrossSeedTorrentSearchRequest = Schema.Struct({ query: Schema.optional(Schema.String), limit: Schema.optional(Schema.Int.check(Schema.isGreaterThanOrEqualTo(1))), indexer_ids: Schema.optional(Schema.Array(Schema.Int)) });

export type CrossSeedTorrentSearchResult = __TypedOpenapi.Schemas.CrossSeedTorrentSearchResult;
export const CrossSeedTorrentSearchResult = Schema.Struct({ indexer: Schema.optional(Schema.String), indexer_id: Schema.optional(Schema.Int), title: Schema.optional(Schema.String), download_url: Schema.optional(Schema.String), info_url: Schema.optional(Schema.NullOr(Schema.String)), size: Schema.optional(Schema.Int), seeders: Schema.optional(Schema.Int), leechers: Schema.optional(Schema.Int), category_id: Schema.optional(Schema.Int), category_name: Schema.optional(Schema.String), publish_date: Schema.optional(Schema.String), download_volume_factor: Schema.optional(Schema.Number), upload_volume_factor: Schema.optional(Schema.Number), guid: Schema.optional(Schema.String), infohash_v1: Schema.optional(Schema.NullOr(Schema.String)), infohash_v2: Schema.optional(Schema.NullOr(Schema.String)), imdb_id: Schema.optional(Schema.NullOr(Schema.String)), tvdb_id: Schema.optional(Schema.NullOr(Schema.String)), match_reason: Schema.optional(Schema.NullOr(Schema.String)), match_score: Schema.optional(Schema.Number) });

export type CrossSeedResponse = __TypedOpenapi.Schemas.CrossSeedResponse;
export const CrossSeedResponse = Schema.Struct({ success: Schema.optional(Schema.Boolean), results: Schema.optional(Schema.Array(CrossSeedInstanceResult)), torrentInfo: Schema.optional(CrossSeedTorrentInfo) });

export type CrossSeedTorrentSearchResponse = __TypedOpenapi.Schemas.CrossSeedTorrentSearchResponse;
export const CrossSeedTorrentSearchResponse = Schema.Struct({ source_torrent: Schema.optional(CrossSeedTorrentInfo), results: Schema.optional(Schema.Array(CrossSeedTorrentSearchResult)) });

export type CrossSeedApplySelection = __TypedOpenapi.Schemas.CrossSeedApplySelection;
export const CrossSeedApplySelection = Schema.Struct({ indexer_id: Schema.Int, indexer: Schema.String, download_url: Schema.String, title: Schema.String, guid: Schema.optional(Schema.NullOr(Schema.String)) });

export type CrossSeedApplyRequest = __TypedOpenapi.Schemas.CrossSeedApplyRequest;
export const CrossSeedApplyRequest = Schema.Struct({ selections: Schema.Array(CrossSeedApplySelection), use_tag: Schema.Boolean, tag_name: Schema.optional(Schema.NullOr(Schema.String)), start_paused: Schema.optional(Schema.NullOr(Schema.Boolean)) });

export type CrossSeedApplyResult = __TypedOpenapi.Schemas.CrossSeedApplyResult;
export const CrossSeedApplyResult = Schema.Struct({ title: Schema.optional(Schema.String), indexer: Schema.optional(Schema.String), torrent_name: Schema.optional(Schema.NullOr(Schema.String)), info_hash: Schema.optional(Schema.NullOr(Schema.String)), success: Schema.optional(Schema.Boolean), instance_results: Schema.optional(Schema.Array(CrossSeedInstanceResult)), error: Schema.optional(Schema.NullOr(Schema.String)) });

export type CrossSeedApplyResponse = __TypedOpenapi.Schemas.CrossSeedApplyResponse;
export const CrossSeedApplyResponse = Schema.Struct({ results: Schema.optional(Schema.Array(CrossSeedApplyResult)) });

export type LocalCrossSeedMatch = __TypedOpenapi.Schemas.LocalCrossSeedMatch;
export const LocalCrossSeedMatch = Schema.Struct({ instance_id: Schema.optional(Schema.Int), instance_name: Schema.optional(Schema.String), hash: Schema.optional(Schema.String), name: Schema.optional(Schema.String), size: Schema.optional(Schema.Int), progress: Schema.optional(Schema.Number), save_path: Schema.optional(Schema.String), content_path: Schema.optional(Schema.String), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.String), state: Schema.optional(Schema.String), tracker: Schema.optional(Schema.String), tracker_health: Schema.optional(Schema.Literals(["unregistered", "tracker_down", "tracker_error"])), match_type: Schema.optional(Schema.Literals(["content_path", "hardlink", "reflink", "name", "release"])) });

export type CategorySnapshot = __TypedOpenapi.Schemas.CategorySnapshot;
export const CategorySnapshot = Schema.Struct({ savePath: Schema.optional(Schema.String) });

export type BackupRun = __TypedOpenapi.Schemas.BackupRun;
export const BackupRun = Schema.Struct({ id: Schema.optional(Schema.Int), instanceId: Schema.optional(Schema.Int), kind: Schema.optional(Schema.Literals(["manual", "hourly", "daily", "weekly", "monthly"])), status: Schema.optional(Schema.Literals(["pending", "running", "success", "failed", "canceled"])), requestedBy: Schema.optional(Schema.String), requestedAt: Schema.optional(Schema.String), startedAt: Schema.optional(Schema.NullOr(Schema.String)), completedAt: Schema.optional(Schema.NullOr(Schema.String)), archivePath: Schema.optional(Schema.NullOr(Schema.String)), manifestPath: Schema.optional(Schema.NullOr(Schema.String)), totalBytes: Schema.optional(Schema.Int), torrentCount: Schema.optional(Schema.Int), categoryCounts: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.Int))), errorMessage: Schema.optional(Schema.NullOr(Schema.String)), categories: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, CategorySnapshot))), tags: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))) });

export type OrphanScanSettings = __TypedOpenapi.Schemas.OrphanScanSettings;
export const OrphanScanSettings = Schema.Struct({ id: Schema.optional(Schema.Int), instanceId: Schema.optional(Schema.Int), enabled: Schema.optional(Schema.Boolean), gracePeriodMinutes: Schema.optional(Schema.Int), ignorePaths: Schema.optional(Schema.Array(Schema.String)), scanIntervalHours: Schema.optional(Schema.Int), previewSort: Schema.optional(Schema.Literals(["size_desc", "directory_size_desc"])), maxFilesPerRun: Schema.optional(Schema.Int), createdAt: Schema.optional(Schema.String), updatedAt: Schema.optional(Schema.String) });

export type OrphanScanSettingsUpdate = __TypedOpenapi.Schemas.OrphanScanSettingsUpdate;
export const OrphanScanSettingsUpdate = Schema.Struct({ enabled: Schema.optional(Schema.Boolean), gracePeriodMinutes: Schema.optional(Schema.Int.check(Schema.isGreaterThanOrEqualTo(0))), ignorePaths: Schema.optional(Schema.Array(Schema.String)), scanIntervalHours: Schema.optional(Schema.Int.check(Schema.isGreaterThanOrEqualTo(1))), previewSort: Schema.optional(Schema.Literals(["size_desc", "directory_size_desc"])), maxFilesPerRun: Schema.optional(Schema.Int.check(Schema.isGreaterThanOrEqualTo(1))) });

export type OrphanScanRun = __TypedOpenapi.Schemas.OrphanScanRun;
export const OrphanScanRun = Schema.Struct({ id: Schema.optional(Schema.Int), instanceId: Schema.optional(Schema.Int), status: Schema.optional(Schema.Literals(["pending", "scanning", "preview_ready", "deleting", "completed", "failed", "canceled"])), triggeredBy: Schema.optional(Schema.Literals(["manual", "scheduled"])), scanPaths: Schema.optional(Schema.Array(Schema.String)), filesFound: Schema.optional(Schema.Int), filesDeleted: Schema.optional(Schema.Int), foldersDeleted: Schema.optional(Schema.Int), bytesReclaimed: Schema.optional(Schema.Int), truncated: Schema.optional(Schema.Boolean), errorMessage: Schema.optional(Schema.NullOr(Schema.String)), startedAt: Schema.optional(Schema.String), completedAt: Schema.optional(Schema.NullOr(Schema.String)) });

export type OrphanScanFile = __TypedOpenapi.Schemas.OrphanScanFile;
export const OrphanScanFile = Schema.Struct({ id: Schema.optional(Schema.Int), runId: Schema.optional(Schema.Int), filePath: Schema.optional(Schema.String), fileSize: Schema.optional(Schema.Int), modifiedAt: Schema.optional(Schema.NullOr(Schema.String)), status: Schema.optional(Schema.Literals(["pending", "deleted", "skipped", "failed"])), errorMessage: Schema.optional(Schema.NullOr(Schema.String)) });

export type OrphanScanRunWithFiles = __TypedOpenapi.Schemas.OrphanScanRunWithFiles;
export const OrphanScanRunWithFiles = OrphanScanRun.mapFields(Struct.assign((Schema.Struct({ files: Schema.optional(Schema.Array(OrphanScanFile)) })).fields));

export type ArrInstance = __TypedOpenapi.Schemas.ArrInstance;
export const ArrInstance = Schema.Struct({ id: Schema.optional(Schema.Int), type: Schema.optional(Schema.Literals(["sonarr", "radarr"])), name: Schema.optional(Schema.String), base_url: Schema.optional(Schema.String), basic_username: Schema.optional(Schema.NullOr(Schema.String)), enabled: Schema.optional(Schema.Boolean), priority: Schema.optional(Schema.Int), timeout_seconds: Schema.optional(Schema.Int), last_test_at: Schema.optional(Schema.NullOr(Schema.String)), last_test_status: Schema.optional(Schema.Literals(["unknown", "ok", "error"])), last_test_error: Schema.optional(Schema.NullOr(Schema.String)), created_at: Schema.optional(Schema.String), updated_at: Schema.optional(Schema.String) });

export type ArrInstanceCreate = __TypedOpenapi.Schemas.ArrInstanceCreate;
export const ArrInstanceCreate = Schema.Struct({ type: Schema.Literals(["sonarr", "radarr"]), name: Schema.String, base_url: Schema.String, api_key: Schema.String, basic_username: Schema.optional(Schema.String), basic_password: Schema.optional(Schema.String), enabled: Boolean_default_true_prop, priority: Int_default_0_prop, timeout_seconds: Int_default_15_prop });

export type ArrInstanceUpdate = __TypedOpenapi.Schemas.ArrInstanceUpdate;
export const ArrInstanceUpdate = Schema.Struct({ name: Schema.optional(Schema.String), base_url: Schema.optional(Schema.String), api_key: Schema.optional(Schema.String), basic_username: Schema.optional(Schema.String), basic_password: Schema.optional(Schema.String), enabled: Schema.optional(Schema.Boolean), priority: Schema.optional(Schema.Int), timeout_seconds: Schema.optional(Schema.Int) });

export type ArrTestConnectionRequest = __TypedOpenapi.Schemas.ArrTestConnectionRequest;
export const ArrTestConnectionRequest = Schema.Struct({ type: Schema.Literals(["sonarr", "radarr"]), base_url: Schema.String, api_key: Schema.String, basic_username: Schema.optional(Schema.String), basic_password: Schema.optional(Schema.String) });

export type ArrTestResponse = __TypedOpenapi.Schemas.ArrTestResponse;
export const ArrTestResponse = Schema.Struct({ success: Schema.optional(Schema.Boolean), error: Schema.optional(Schema.NullOr(Schema.String)) });

export type ArrResolveRequest = __TypedOpenapi.Schemas.ArrResolveRequest;
export const ArrResolveRequest = Schema.Struct({ title: Schema.String, content_type: Schema.Literals(["movie", "tv"]) });

export type ArrExternalIDs = __TypedOpenapi.Schemas.ArrExternalIDs;
export const ArrExternalIDs = Schema.Struct({ imdb_id: Schema.optional(Schema.String), tmdb_id: Schema.optional(Schema.Int), tvdb_id: Schema.optional(Schema.Int), tvmaze_id: Schema.optional(Schema.Int) });

export type ArrIDCacheEntry = __TypedOpenapi.Schemas.ArrIDCacheEntry;
export const ArrIDCacheEntry = Schema.Struct({ id: Schema.optional(Schema.Int), title_hash: Schema.optional(Schema.String), content_type: Schema.optional(Schema.String), arr_instance_id: Schema.optional(Schema.NullOr(Schema.Int)), external_ids: Schema.optional(ArrExternalIDs), titles: Schema.optional(Schema.Array(Schema.String)), has_titles: Schema.optional(Schema.Boolean), is_negative: Schema.optional(Schema.Boolean), cached_at: Schema.optional(Schema.String), expires_at: Schema.optional(Schema.String) });

export type ArrInstanceResult = __TypedOpenapi.Schemas.ArrInstanceResult;
export const ArrInstanceResult = Schema.Struct({ instance_id: Schema.optional(Schema.Int), instance_name: Schema.optional(Schema.String), instance_type: Schema.optional(Schema.String), ids: Schema.optional(ArrExternalIDs), error: Schema.optional(Schema.NullOr(Schema.String)) });

export type ArrResolveResponse = __TypedOpenapi.Schemas.ArrResolveResponse;
export const ArrResolveResponse = Schema.Struct({ title: Schema.optional(Schema.String), title_hash: Schema.optional(Schema.String), content_type: Schema.optional(Schema.Literals(["movie", "tv"])), cache_hit: Schema.optional(Schema.Boolean), cache_entry: Schema.optional(ArrIDCacheEntry), instances_available: Schema.optional(Schema.Int), instance_results: Schema.optional(Schema.Array(ArrInstanceResult)), error: Schema.optional(Schema.NullOr(Schema.String)) });

export type DirScanMatchMode = __TypedOpenapi.Schemas.DirScanMatchMode;
export const DirScanMatchMode = Schema.Literals(["strict", "flexible"]);

export type DirScanFileStatus = __TypedOpenapi.Schemas.DirScanFileStatus;
export const DirScanFileStatus = Schema.Literals(["pending", "matched", "no_match", "error", "already_seeding", "in_qbittorrent"]);

export type DirScanRunStatus = __TypedOpenapi.Schemas.DirScanRunStatus;
export const DirScanRunStatus = Schema.Literals(["queued", "scanning", "searching", "injecting", "success", "failed", "canceled"]);

export type DirScanSettings = __TypedOpenapi.Schemas.DirScanSettings;
export const DirScanSettings = Schema.Struct({ id: Schema.Int, enabled: Schema.Boolean, matchMode: DirScanMatchMode, sizeTolerancePercent: Schema.Number, minPieceRatio: Schema.Number, maxSearcheesPerRun: Schema.Int, maxSearcheeAgeDays: Schema.Int, allowPartial: Schema.Boolean, skipPieceBoundarySafetyCheck: Schema.Boolean, startPaused: Schema.Boolean, downloadMissingFiles: Schema.Boolean, category: Schema.String, tags: Schema.Array(Schema.String), createdAt: Schema.String, updatedAt: Schema.String });

export type DirScanSettingsPatch = __TypedOpenapi.Schemas.DirScanSettingsPatch;
export const DirScanSettingsPatch = Schema.Struct({ enabled: Schema.optional(Schema.Boolean), matchMode: Schema.optional(DirScanMatchMode), sizeTolerancePercent: Schema.optional(Schema.Number), minPieceRatio: Schema.optional(Schema.Number), maxSearcheesPerRun: Schema.optional(Schema.Int), maxSearcheeAgeDays: Schema.optional(Schema.Int), allowPartial: Schema.optional(Schema.Boolean), skipPieceBoundarySafetyCheck: Schema.optional(Schema.Boolean), startPaused: Schema.optional(Schema.Boolean), downloadMissingFiles: Schema.optional(Schema.Boolean), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.Array(Schema.String)) });

export type DirScanDirectory = __TypedOpenapi.Schemas.DirScanDirectory;
export const DirScanDirectory = Schema.Struct({ id: Schema.Int, path: Schema.String, qbitPathPrefix: Schema.optional(Schema.NullOr(Schema.String)), category: Schema.optional(Schema.NullOr(Schema.String)), tags: Schema.Array(Schema.String), allowedDownloadClients: Schema.Array(Schema.String), enabled: Schema.Boolean, arrInstanceId: Schema.optional(Schema.NullOr(Schema.Int)), targetInstanceId: Schema.Int, scanIntervalMinutes: Schema.Int, lastScanAt: Schema.optional(Schema.NullOr(Schema.String)), createdAt: Schema.String, updatedAt: Schema.String });

export type DirScanDirectoryCreate = __TypedOpenapi.Schemas.DirScanDirectoryCreate;
export const DirScanDirectoryCreate = Schema.Struct({ path: Schema.String, qbitPathPrefix: Schema.optional(Schema.String), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.Array(Schema.String)), allowedDownloadClients: Schema.optional(Schema.Array(Schema.String)), enabled: Schema.optional(Schema.Boolean), arrInstanceId: Schema.optional(Schema.NullOr(Schema.Int)), targetInstanceId: Schema.Int, scanIntervalMinutes: Schema.optional(Schema.Int) });

export type DirScanDirectoryPatch = __TypedOpenapi.Schemas.DirScanDirectoryPatch;
export const DirScanDirectoryPatch = Schema.Struct({ path: Schema.optional(Schema.String), qbitPathPrefix: Schema.optional(Schema.String), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.Array(Schema.String)), allowedDownloadClients: Schema.optional(Schema.Array(Schema.String)), enabled: Schema.optional(Schema.Boolean), arrInstanceId: Schema.optional(Schema.Int), targetInstanceId: Schema.optional(Schema.Int), scanIntervalMinutes: Schema.optional(Schema.Int) });

export type DirScanRun = __TypedOpenapi.Schemas.DirScanRun;
export const DirScanRun = Schema.Struct({ id: Schema.Int, directoryId: Schema.Int, status: DirScanRunStatus, triggeredBy: Schema.String, scanRoot: Schema.optional(Schema.String), filesFound: Schema.Int, filesSkipped: Schema.Int, matchesFound: Schema.Int, torrentsAdded: Schema.Int, errorMessage: Schema.optional(Schema.NullOr(Schema.String)), startedAt: Schema.String, completedAt: Schema.optional(Schema.NullOr(Schema.String)) });

export type DirScanRunInjectionStatus = __TypedOpenapi.Schemas.DirScanRunInjectionStatus;
export const DirScanRunInjectionStatus = Schema.Literals(["added", "failed"]);

export type DirScanRunInjection = __TypedOpenapi.Schemas.DirScanRunInjection;
export const DirScanRunInjection = Schema.Struct({ id: Schema.Int, runId: Schema.Int, directoryId: Schema.Int, status: DirScanRunInjectionStatus, searcheeName: Schema.String, torrentName: Schema.String, infoHash: Schema.String, contentType: Schema.String, indexerName: Schema.optional(Schema.NullOr(Schema.String)), trackerDomain: Schema.optional(Schema.NullOr(Schema.String)), trackerDisplayName: Schema.optional(Schema.NullOr(Schema.String)), linkMode: Schema.optional(Schema.NullOr(Schema.String)), savePath: Schema.optional(Schema.NullOr(Schema.String)), category: Schema.optional(Schema.NullOr(Schema.String)), tags: Schema.Array(Schema.String), errorMessage: Schema.optional(Schema.NullOr(Schema.String)), createdAt: Schema.String });

export type DirScanFile = __TypedOpenapi.Schemas.DirScanFile;
export const DirScanFile = Schema.Struct({ id: Schema.Int, directoryId: Schema.Int, filePath: Schema.String, fileSize: Schema.Int, fileModTime: Schema.String, status: DirScanFileStatus, matchedTorrentHash: Schema.optional(Schema.NullOr(Schema.String)), matchedIndexerId: Schema.optional(Schema.NullOr(Schema.Int)), lastProcessedAt: Schema.optional(Schema.NullOr(Schema.String)) });

export type DirScanTriggerResponse = __TypedOpenapi.Schemas.DirScanTriggerResponse;
export const DirScanTriggerResponse = Schema.Struct({ runId: Schema.Int, directoryId: Schema.Int, directoryPath: Schema.String, scanRoot: Schema.String });

export type DirScanIdleStatus = __TypedOpenapi.Schemas.DirScanIdleStatus;
export const DirScanIdleStatus = Schema.Struct({ status: Schema.Literal("idle") });

export type WarningResponse = __TypedOpenapi.Schemas.WarningResponse;
export const WarningResponse = Schema.Struct({ warning: Schema.optional(Schema.String) });

export type RSSArticle = __TypedOpenapi.Schemas.RSSArticle;
export const RSSArticle = Schema.Struct({ id: Schema.optional(Schema.String), title: Schema.optional(Schema.String), torrentURL: Schema.optional(Schema.String), link: Schema.optional(Schema.String), description: Schema.optional(Schema.String), date: Schema.optional(Schema.String), author: Schema.optional(Schema.String), isRead: Schema.optional(Schema.Boolean) });

export type RSSFeed = __TypedOpenapi.Schemas.RSSFeed;
export const RSSFeed = Schema.Struct({ url: Schema.optional(Schema.String), title: Schema.optional(Schema.String), lastBuildDate: Schema.optional(Schema.String), isLoading: Schema.optional(Schema.Boolean), hasError: Schema.optional(Schema.Boolean), articles: Schema.optional(Schema.Array(RSSArticle)) });

export type RSSItems = __TypedOpenapi.Schemas.RSSItems;
export const RSSItems = Schema.suspend(() => Schema.Record(Schema.String, Schema.Union([RSSFeed, RSSItems])));

export type RSSRuleTorrentParams = __TypedOpenapi.Schemas.RSSRuleTorrentParams;
export const RSSRuleTorrentParams = Schema.Struct({ category: Schema.optional(Schema.String), tags: Schema.optional(Schema.Array(Schema.String)), save_path: Schema.optional(Schema.String), download_path: Schema.optional(Schema.String), content_layout: Schema.optional(Schema.String), operating_mode: Schema.optional(Schema.String), skip_checking: Schema.optional(Schema.Boolean), upload_limit: Schema.optional(Schema.Int), download_limit: Schema.optional(Schema.Int), seeding_time_limit: Schema.optional(Schema.Int), inactive_seeding_time_limit: Schema.optional(Schema.Int), share_limit_action: Schema.optional(Schema.String), ratio_limit: Schema.optional(Schema.Number), stopped: Schema.optional(Schema.Boolean), stop_condition: Schema.optional(Schema.String), use_auto_tmm: Schema.optional(Schema.Boolean), use_download_path: Schema.optional(Schema.Boolean), add_to_top_of_queue: Schema.optional(Schema.Boolean) });

export type RSSAutoDownloadRule = __TypedOpenapi.Schemas.RSSAutoDownloadRule;
export const RSSAutoDownloadRule = Schema.Struct({ enabled: Schema.optional(Schema.Boolean), priority: Schema.optional(Schema.Int), mustContain: Schema.optional(Schema.String), mustNotContain: Schema.optional(Schema.String), episodeFilter: Schema.optional(Schema.String), useRegex: Schema.optional(Schema.Boolean), affectedFeeds: Schema.optional(Schema.Array(Schema.String)), ignoreDays: Schema.optional(Schema.Int), lastMatch: Schema.optional(Schema.String), smartFilter: Schema.optional(Schema.Boolean), previouslyMatchedEpisodes: Schema.optional(Schema.Array(Schema.String)), torrentParams: Schema.optional(RSSRuleTorrentParams), savePath: Schema.optional(Schema.String), assignedCategory: Schema.optional(Schema.String), addPaused: Schema.optional(Schema.NullOr(Schema.Boolean)) });

// </Schemas>

// <Endpoints>
export type post__api_auth_setup = __TypedOpenapi.Endpoints.post__api_auth_setup;
export const post__api_auth_setup = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/auth/setup"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ username: Schema.String.check(Schema.isMinLength(1)), password: Schema.String.check(Schema.isMinLength(8)) }) },
  responses: { 201: Schema.Struct({ message: Schema.optional(Schema.String), user: Schema.optional(User) }), 400: Schema.Unknown },
};

export type post__api_auth_login = __TypedOpenapi.Endpoints.post__api_auth_login;
export const post__api_auth_login = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/auth/login"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ username: Schema.String, password: Schema.String }) },
  responses: { 200: Schema.Struct({ message: Schema.optional(Schema.String), user: Schema.optional(User) }), 401: Schema.Unknown },
};

export type get__api_auth_checkSetup = __TypedOpenapi.Endpoints.get__api_auth_checkSetup;
export const get__api_auth_checkSetup = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/auth/check-setup"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Struct({ setupRequired: Schema.optional(Schema.Boolean) }) },
};

export type post__api_auth_logout = __TypedOpenapi.Endpoints.post__api_auth_logout;
export const post__api_auth_logout = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/auth/logout"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

export type get__api_auth_me = __TypedOpenapi.Endpoints.get__api_auth_me;
export const get__api_auth_me = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/auth/me"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: User },
};

export type put__api_auth_changePassword = __TypedOpenapi.Endpoints.put__api_auth_changePassword;
export const put__api_auth_changePassword = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/auth/change-password"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ currentPassword: Schema.String, newPassword: Schema.String.check(Schema.isMinLength(8)) }) },
  responses: { 200: Schema.Unknown, 401: Schema.Unknown },
};

export type get__api_apiKeys = __TypedOpenapi.Endpoints.get__api_apiKeys;
export const get__api_apiKeys = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/api-keys"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(ApiKey) },
};

export type post__api_apiKeys = __TypedOpenapi.Endpoints.post__api_apiKeys;
export const post__api_apiKeys = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/api-keys"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ name: Schema.String }) },
  responses: { 201: Schema.Struct({ id: Schema.optional(Schema.Int), name: Schema.optional(Schema.String), key: Schema.optional(Schema.String), createdAt: Schema.optional(Schema.String), message: Schema.optional(Schema.String) }) },
};

export type delete__api_apiKeys_Id = __TypedOpenapi.Endpoints.delete__api_apiKeys_Id;
export const delete__api_apiKeys_Id = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/api-keys/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Unknown, 404: Schema.Unknown },
};

export type get__api_clientApiKeys = __TypedOpenapi.Endpoints.get__api_clientApiKeys;
export const get__api_clientApiKeys = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/client-api-keys"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(ClientApiKey) },
};

export type post__api_clientApiKeys = __TypedOpenapi.Endpoints.post__api_clientApiKeys;
export const post__api_clientApiKeys = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/client-api-keys"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ clientName: Schema.String, instanceId: Schema.Int }) },
  responses: { 201: Schema.Struct({ id: Schema.optional(Schema.Int), clientName: Schema.optional(Schema.String), instanceId: Schema.optional(Schema.Int), key: Schema.optional(Schema.String), createdAt: Schema.optional(Schema.String), message: Schema.optional(Schema.String) }) },
};

export type delete__api_clientApiKeys_Id = __TypedOpenapi.Endpoints.delete__api_clientApiKeys_Id;
export const delete__api_clientApiKeys_Id = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/client-api-keys/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Unknown, 404: Schema.Unknown },
};

export type get__api_externalPrograms = __TypedOpenapi.Endpoints.get__api_externalPrograms;
export const get__api_externalPrograms = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/external-programs"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(ExternalProgram) },
};

export type post__api_externalPrograms = __TypedOpenapi.Endpoints.post__api_externalPrograms;
export const post__api_externalPrograms = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/external-programs"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ name: Schema.String, path: Schema.String, args_template: Schema.optional(Schema.String), enabled: Boolean_default_true_prop, use_terminal: Boolean_default_true_prop, path_mappings: Array_default_value_prop }) },
  responses: { 201: ExternalProgram, 409: Schema.Unknown },
};

export type put__api_externalPrograms_Id = __TypedOpenapi.Endpoints.put__api_externalPrograms_Id;
export const put__api_externalPrograms_Id = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/external-programs/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }), body: Schema.Struct({ name: Schema.String, path: Schema.String, args_template: Schema.optional(Schema.String), enabled: Schema.optional(Schema.Boolean), use_terminal: Schema.optional(Schema.Boolean), path_mappings: Schema.optional(Schema.Array(PathMapping)) }) },
  responses: { 200: ExternalProgram, 404: Schema.Unknown, 409: Schema.Unknown },
};

export type delete__api_externalPrograms_Id = __TypedOpenapi.Endpoints.delete__api_externalPrograms_Id;
export const delete__api_externalPrograms_Id = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/external-programs/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 204: Schema.Unknown, 404: Schema.Unknown },
};

export type post__api_externalPrograms_execute = __TypedOpenapi.Endpoints.post__api_externalPrograms_execute;
export const post__api_externalPrograms_execute = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/external-programs/execute"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ program_id: Schema.Int, instance_id: Schema.Int, hashes: Schema.Array(Schema.String) }) },
  responses: { 200: Schema.Struct({ results: Schema.optional(Schema.Array(Schema.Struct({ hash: Schema.optional(Schema.String), success: Schema.optional(Schema.Boolean), message: Schema.optional(Schema.String), error: Schema.optional(Schema.String) }))) }), 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_notifications_events = __TypedOpenapi.Endpoints.get__api_notifications_events;
export const get__api_notifications_events = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/notifications/events"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(NotificationEventDefinition) },
};

export type get__api_notifications_targets = __TypedOpenapi.Endpoints.get__api_notifications_targets;
export const get__api_notifications_targets = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/notifications/targets"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(NotificationTarget) },
};

export type post__api_notifications_targets = __TypedOpenapi.Endpoints.post__api_notifications_targets;
export const post__api_notifications_targets = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/notifications/targets"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: NotificationTargetRequest },
  responses: { 201: NotificationTarget, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type put__api_notifications_targets_Id = __TypedOpenapi.Endpoints.put__api_notifications_targets_Id;
export const put__api_notifications_targets_Id = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/notifications/targets/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }), body: NotificationTargetRequest },
  responses: { 200: NotificationTarget, 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type delete__api_notifications_targets_Id = __TypedOpenapi.Endpoints.delete__api_notifications_targets_Id;
export const delete__api_notifications_targets_Id = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/notifications/targets/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 204: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_notifications_targets_Id_test = __TypedOpenapi.Endpoints.post__api_notifications_targets_Id_test;
export const post__api_notifications_targets_Id_test = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/notifications/targets/{id}/test"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }), body: NotificationTestRequest },
  responses: { 200: Schema.Struct({ status: Schema.optional(Schema.String) }), 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown, 502: Schema.Unknown },
};

export type get__api_arr_instances = __TypedOpenapi.Endpoints.get__api_arr_instances;
export const get__api_arr_instances = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/arr/instances"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(ArrInstance) },
};

export type post__api_arr_instances = __TypedOpenapi.Endpoints.post__api_arr_instances;
export const post__api_arr_instances = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/arr/instances"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: ArrInstanceCreate },
  responses: { 201: ArrInstance, 400: Schema.Unknown, 409: Schema.Unknown },
};

export type get__api_arr_instances_Id = __TypedOpenapi.Endpoints.get__api_arr_instances_Id;
export const get__api_arr_instances_Id = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/arr/instances/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: ArrInstance, 404: Schema.Unknown },
};

export type put__api_arr_instances_Id = __TypedOpenapi.Endpoints.put__api_arr_instances_Id;
export const put__api_arr_instances_Id = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/arr/instances/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }), body: ArrInstanceUpdate },
  responses: { 200: ArrInstance, 404: Schema.Unknown, 409: Schema.Unknown },
};

export type delete__api_arr_instances_Id = __TypedOpenapi.Endpoints.delete__api_arr_instances_Id;
export const delete__api_arr_instances_Id = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/arr/instances/{id}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 204: Schema.Unknown, 404: Schema.Unknown },
};

export type post__api_arr_instances_Id_test = __TypedOpenapi.Endpoints.post__api_arr_instances_Id_test;
export const post__api_arr_instances_Id_test = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/arr/instances/{id}/test"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ id: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: ArrTestResponse, 404: Schema.Unknown },
};

export type post__api_arr_test = __TypedOpenapi.Endpoints.post__api_arr_test;
export const post__api_arr_test = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/arr/test"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: ArrTestConnectionRequest },
  responses: { 200: ArrTestResponse, 400: Schema.Unknown },
};

export type post__api_arr_resolve = __TypedOpenapi.Endpoints.post__api_arr_resolve;
export const post__api_arr_resolve = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/arr/resolve"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: ArrResolveRequest },
  responses: { 200: ArrResolveResponse, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances = __TypedOpenapi.Endpoints.get__api_instances;
export const get__api_instances = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(Instance) },
};

export type post__api_instances = __TypedOpenapi.Endpoints.post__api_instances;
export const post__api_instances = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ name: Schema.String, host: Schema.String, username: Schema.optional(Schema.String), password: Schema.optional(Schema.String), apiKey: Schema.optional(Schema.String), basicUsername: Schema.optional(Schema.NullOr(Schema.String)), basicPassword: Schema.optional(Schema.NullOr(Schema.String)), tlsSkipVerify: Schema.optional(Schema.Boolean), hasLocalFilesystemAccess: Schema.optional(Schema.Boolean), useHardlinks: Schema.optional(Schema.Boolean), hardlinkBaseDir: Schema.optional(Schema.String), hardlinkDirPreset: Schema.optional(Schema.Literals(["flat", "by-tracker", "by-instance"])), useReflinks: Schema.optional(Schema.Boolean), fallbackToRegularMode: Schema.optional(Schema.Boolean) }) },
  responses: { 201: Instance },
};

export type put__api_instances_order = __TypedOpenapi.Endpoints.put__api_instances_order;
export const put__api_instances_order = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/order"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ instanceIds: Schema.Array(Schema.Int) }) },
  responses: { 200: Schema.Array(Instance), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type put__api_instances_InstanceID = __TypedOpenapi.Endpoints.put__api_instances_InstanceID;
export const put__api_instances_InstanceID = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.optional(Schema.Struct({ name: Schema.optional(Schema.String), host: Schema.optional(Schema.String), username: Schema.optional(Schema.String), password: Schema.optional(Schema.String), apiKey: Schema.optional(Schema.String), basicUsername: Schema.optional(Schema.NullOr(Schema.String)), basicPassword: Schema.optional(Schema.NullOr(Schema.String)), tlsSkipVerify: Schema.optional(Schema.Boolean), hasLocalFilesystemAccess: Schema.optional(Schema.Boolean), useHardlinks: Schema.optional(Schema.Boolean), hardlinkBaseDir: Schema.optional(Schema.String), hardlinkDirPreset: Schema.optional(Schema.Literals(["flat", "by-tracker", "by-instance"])), useReflinks: Schema.optional(Schema.Boolean), fallbackToRegularMode: Schema.optional(Schema.Boolean) })) },
  responses: { 200: Schema.Unknown },
};

export type delete__api_instances_InstanceID = __TypedOpenapi.Endpoints.delete__api_instances_InstanceID;
export const delete__api_instances_InstanceID = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/instances/{instanceID}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 204: Schema.Unknown, 404: Schema.Unknown },
};

export type put__api_instances_InstanceID_status = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_status;
export const put__api_instances_InstanceID_status = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ isActive: Schema.Boolean }) },
  responses: { 200: Instance, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_test = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_test;
export const post__api_instances_InstanceID_test = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/test"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Unknown, 503: Schema.Unknown },
};

export type get__api_instances_InstanceID_appInfo = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_appInfo;
export const get__api_instances_InstanceID_appInfo = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/app-info"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: QBittorrentAppInfo, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_capabilities = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_capabilities;
export const get__api_instances_InstanceID_capabilities = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/capabilities"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: InstanceCapabilities, 400: Schema.Unknown, 503: Schema.Unknown },
};

export type get__api_instances_InstanceID_transferInfo = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_transferInfo;
export const get__api_instances_InstanceID_transferInfo = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/transfer-info"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: TransferInfo, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown, 503: Schema.Unknown },
};

export type get__api_instances_InstanceID_getDirectoryContent = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_getDirectoryContent;
export const get__api_instances_InstanceID_getDirectoryContent = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/getDirectoryContent"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ dirPath: Schema.String, withMetadata: Union_default_false_prop }), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Array(Schema.String), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_reannounce_activity = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_reannounce_activity;
export const get__api_instances_InstanceID_reannounce_activity = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/reannounce/activity"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ limit: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1))) })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Array(Schema.Struct({ instanceId: Schema.Int, hash: Schema.String, torrentName: Schema.optional(Schema.String), trackers: Schema.optional(Schema.String), outcome: Schema.Literals(["skipped", "failed", "succeeded", "started"]), reason: Schema.optional(Schema.String), timestamp: Schema.String })), 400: Schema.Unknown },
};

export type get__api_instances_InstanceID_reannounce_candidates = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_reannounce_candidates;
export const get__api_instances_InstanceID_reannounce_candidates = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/reannounce/candidates"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Array(Schema.Struct({ instanceId: Schema.Int, hash: Schema.String, torrentName: Schema.optional(Schema.String), trackers: Schema.optional(Schema.String), timeActiveSeconds: Schema.optional(Schema.Int), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.String), state: Schema.Literals(["watching", "reannouncing", "cooldown"]), hasTrackerProblem: Schema.Boolean, waitingForInitial: Schema.Boolean })), 400: Schema.Unknown },
};

export type get__api_instances_InstanceID_crossSeed_status = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_crossSeed_status;
export const get__api_instances_InstanceID_crossSeed_status = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/cross-seed/status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Struct({ instance_id: Schema.optional(Schema.Int), cross_seeded: Schema.optional(Schema.Int), pending: Schema.optional(Schema.Int), last_cross_seed: Schema.optional(Schema.NullOr(Schema.String)) }), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrents = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents;
export const get__api_instances_InstanceID_torrents = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ page: Schema_default_0_prop_7, limit: Schema_default_500_prop, sort: Schema.optional(Schema.Literals(["name", "size", "progress", "priority", "added_on"])), order: Schema_default_desc_prop, search: Schema.optional(Schema.String), filters: Schema.optional(Schema.String) })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Struct({ torrents: Schema.optional(Schema.Array(Torrent)), total: Schema.optional(Schema.Int), page: Schema.optional(Schema.Int), limit: Schema.optional(Schema.Int), preferences: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.Unknown))) }) },
};

export type post__api_instances_InstanceID_torrents = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_torrents;
export const post__api_instances_InstanceID_torrents = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents"),
  requestFormat: Schema.Literal("form-data"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.optional(Schema.Struct({ torrent: Schema.optional(Schema.declare((v): v is Blob => typeof Blob !== "undefined" && v instanceof Blob)), urls: Schema.optional(Schema.Array(Schema.String)), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.Array(Schema.String)), paused: Schema.optional(Schema.Boolean), savepath: Schema.optional(Schema.String), indexer_id: Schema.optional(Schema.Int), skip_checking: Schema.optional(Schema.Boolean), sequentialDownload: Schema.optional(Schema.Boolean), firstLastPiecePrio: Schema.optional(Schema.Boolean), upLimit: Schema.optional(Schema.Int), dlLimit: Schema.optional(Schema.Int), ratioLimit: Schema.optional(Schema.String), seedingTimeLimit: Schema.optional(Schema.String), contentLayout: Schema.optional(Schema.String), rename: Schema.optional(Schema.String), useDownloadPath: Schema.optional(Schema.Boolean), downloadPath: Schema.optional(Schema.String), autoTMM: Schema.optional(Schema.Boolean) })) },
  responses: { 201: Schema.Unknown },
};

export type post__api_instances_InstanceID_torrents_checkDuplicates = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_torrents_checkDuplicates;
export const post__api_instances_InstanceID_torrents_checkDuplicates = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/check-duplicates"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ hashes: Schema.Array(Schema.String) }) },
  responses: { 200: Schema.Struct({ duplicates: Schema.optional(Schema.Array(DuplicateTorrentMatch)) }), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_torrents_bulkAction = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_torrents_bulkAction;
export const post__api_instances_InstanceID_torrents_bulkAction = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/bulk-action"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ hashes: Schema.optional(Schema.Array(Schema.String)), selectAll: Schema.optional(Schema.Boolean), filters: Schema.optional(Schema.Struct({ status: Schema.optional(Schema.Array(Schema.String)), categories: Schema.optional(Schema.Array(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), trackers: Schema.optional(Schema.Array(Schema.String)) })), search: Schema.optional(Schema.String), excludeHashes: Schema.optional(Schema.Array(Schema.String)), action: Schema.Literals(["pause", "resume", "delete", "deleteWithFiles", "recheck", "reannounce", "increasePriority", "decreasePriority", "topPriority", "bottomPriority", "addTags", "removeTags", "setTags", "setComment", "setCategory", "toggleAutoTMM", "setShareLimit", "setUploadLimit", "setDownloadLimit", "setLocation", "editTrackers", "addTrackers", "removeTrackers", "toggleSequentialDownload"]), deleteFiles: Schema.optional(Schema.Boolean), tags: Schema.optional(Schema.String), comment: Schema.optional(Schema.String), category: Schema.optional(Schema.String), enable: Schema.optional(Schema.Boolean), ratioLimit: Schema.optional(Schema.Number), seedingTimeLimit: Schema.optional(Schema.Int), inactiveSeedingTimeLimit: Schema.optional(Schema.Int), shareLimitAction: Schema.optional(Schema.String), shareLimitsMode: Schema.optional(Schema.String), uploadLimit: Schema.optional(Schema.Int), downloadLimit: Schema.optional(Schema.Int), location: Schema.optional(Schema.String), trackerOldURL: Schema.optional(Schema.String), trackerNewURL: Schema.optional(Schema.String), trackerURLs: Schema.optional(Schema.String) }) },
  responses: { 200: Schema.Unknown },
};

export type post__api_instances_InstanceID_torrents_field = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_torrents_field;
export const post__api_instances_InstanceID_torrents_field = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/field"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ field: Schema.Literals(["name", "hash", "full_path", "tags"]), sort: Schema.optional(Schema.String), order: Schema.optional(Schema.Literals(["asc", "desc"])), hashes: Schema.optional(Schema.Array(Schema.String)), targets: Schema.optional(Schema.Array(Schema.Struct({ instanceId: Schema.Int, hash: Schema.String }))), selectAll: Schema.optional(Schema.Boolean), search: Schema.optional(Schema.String), filters: Schema.optional(Schema.Struct({ status: Schema.optional(Schema.Array(Schema.String)), categories: Schema.optional(Schema.Array(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), trackers: Schema.optional(Schema.Array(Schema.String)) })), excludeHashes: Schema.optional(Schema.Array(Schema.String)) }) },
  responses: { 200: Schema.Struct({ values: Schema.optional(Schema.Array(Schema.String)) }) },
};

export type get__api_instances_InstanceID_torrents_Hash_export = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_export;
export const get__api_instances_InstanceID_torrents_Hash_export = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/export"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrents_Hash_properties = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_properties;
export const get__api_instances_InstanceID_torrents_Hash_properties = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/properties"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: TorrentProperties },
};

export type get__api_instances_InstanceID_torrents_Hash_trackers = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_trackers;
export const get__api_instances_InstanceID_torrents_Hash_trackers = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/trackers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: Schema.Array(Tracker) },
};

export type put__api_instances_InstanceID_torrents_Hash_trackers = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_torrents_Hash_trackers;
export const put__api_instances_InstanceID_torrents_Hash_trackers = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/trackers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: Schema.Struct({ oldURL: Schema.String, newURL: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_torrents_Hash_trackers = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_torrents_Hash_trackers;
export const post__api_instances_InstanceID_torrents_Hash_trackers = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/trackers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: Schema.Struct({ urls: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type delete__api_instances_InstanceID_torrents_Hash_trackers = __TypedOpenapi.Endpoints.delete__api_instances_InstanceID_torrents_Hash_trackers;
export const delete__api_instances_InstanceID_torrents_Hash_trackers = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/trackers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: Schema.Struct({ urls: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrents_Hash_webseeds = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_webseeds;
export const get__api_instances_InstanceID_torrents_Hash_webseeds = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/webseeds"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: Schema.Array(WebSeed), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrents_Hash_pieces = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_pieces;
export const get__api_instances_InstanceID_torrents_Hash_pieces = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/pieces"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: Schema.Array(Schema.Int.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(2))), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrents_Hash_files = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_files;
export const get__api_instances_InstanceID_torrents_Hash_files = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/files"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ refresh: Schema.optional(Schema.Union([Schema.Boolean, Schema.String, Schema.Number]).pipe(Schema.decodeTo(Schema.Boolean, SchemaTransformation.transform({ decode: (x) => x === true || x === "true" || x === 1 || x === "1", encode: (a) => a })))) })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: Schema.Array(TorrentFile) },
};

export type put__api_instances_InstanceID_torrents_Hash_files = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_torrents_Hash_files;
export const put__api_instances_InstanceID_torrents_Hash_files = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/files"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: Schema.Struct({ indices: Schema.Array(Schema.Int.check(Schema.isGreaterThanOrEqualTo(0))).check(Schema.isMinLength(1)), priority: Schema.Int.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(7)) }) },
  responses: { 204: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrents_Hash_files_FileIndex_download = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_files_FileIndex_download;
export const get__api_instances_InstanceID_torrents_Hash_files_FileIndex_download = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/files/{fileIndex}/download"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String, fileIndex: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)) }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrents_Hash_files_FileIndex_mediainfo = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_files_FileIndex_mediainfo;
export const get__api_instances_InstanceID_torrents_Hash_files_FileIndex_mediainfo = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/files/{fileIndex}/mediainfo"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String, fileIndex: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)) }) },
  responses: { 200: TorrentFileMediaInfoResponse, 400: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_mediainfo = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_mediainfo;
export const get__api_instances_InstanceID_mediainfo = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/mediainfo"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ contentPath: Schema.String, content_path: Schema.optional(Schema.String) }), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: ContentPathMediaInfoResponse, 400: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__proxy_ApiKey_api_v2_torrents_mediainfo = __TypedOpenapi.Endpoints.get__proxy_ApiKey_api_v2_torrents_mediainfo;
export const get__proxy_ApiKey_api_v2_torrents_mediainfo = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/proxy/{api-key}/api/v2/torrents/mediainfo"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ contentPath: Schema.optional(Schema.String), content_path: Schema.optional(Schema.String) })), path: Schema.Struct({ "api-key": Schema.String }), body: Schema.optional(Schema.Struct({ contentPath: Schema.optional(Schema.String), content_path: Schema.optional(Schema.String) })) },
  responses: { 200: ContentPathMediaInfoResponse, 400: Schema.Unknown, 401: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type put__api_instances_InstanceID_torrents_Hash_rename = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_torrents_Hash_rename;
export const put__api_instances_InstanceID_torrents_Hash_rename = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/rename"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: Schema.Struct({ name: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type put__api_instances_InstanceID_torrents_Hash_renameFile = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_torrents_Hash_renameFile;
export const put__api_instances_InstanceID_torrents_Hash_renameFile = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/rename-file"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: Schema.Struct({ oldPath: Schema.String, newPath: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type put__api_instances_InstanceID_torrents_Hash_renameFolder = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_torrents_Hash_renameFolder;
export const put__api_instances_InstanceID_torrents_Hash_renameFolder = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/rename-folder"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: Schema.Struct({ oldPath: Schema.String, newPath: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrents_Hash_peers = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrents_Hash_peers;
export const get__api_instances_InstanceID_torrents_Hash_peers = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/{hash}/peers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: Schema.Array(Schema.Struct({ ip: Schema.optional(Schema.String), port: Schema.optional(Schema.Int), client: Schema.optional(Schema.String), progress: Schema.optional(Schema.Number), dlSpeed: Schema.optional(Schema.Int), upSpeed: Schema.optional(Schema.Int), downloaded: Schema.optional(Schema.Int), uploaded: Schema.optional(Schema.Int), connection: Schema.optional(Schema.String), flags: Schema.optional(Schema.String), flagsDesc: Schema.optional(Schema.String), relevance: Schema.optional(Schema.Number) })) },
};

export type post__api_instances_InstanceID_torrents_addPeers = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_torrents_addPeers;
export const post__api_instances_InstanceID_torrents_addPeers = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/add-peers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ hashes: Schema.Array(Schema.String), peers: Schema.Array(Schema.String) }) },
  responses: { 200: Schema.Unknown },
};

export type post__api_instances_InstanceID_torrents_banPeers = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_torrents_banPeers;
export const post__api_instances_InstanceID_torrents_banPeers = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/torrents/ban-peers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ peers: Schema.Array(Schema.String) }) },
  responses: { 200: Schema.Unknown },
};

export type post__api_instances_InstanceID_torrentCreator = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_torrentCreator;
export const post__api_instances_InstanceID_torrentCreator = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/torrent-creator"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ sourcePath: Schema.String, torrentFilePath: Schema.optional(Schema.String), private: Schema.optional(Schema.Boolean), format: Schema.optional(Schema.Literals(["v1", "v2", "hybrid"])), optimizeAlignment: Schema.optional(Schema.Boolean), paddedFileSizeLimit: Schema.optional(Schema.Int), pieceSize: Schema.optional(Schema.Int), comment: Schema.optional(Schema.String), source: Schema.optional(Schema.String), trackers: Schema.optional(Schema.Array(Schema.String)), urlSeeds: Schema.optional(Schema.Array(Schema.String)), startSeeding: Schema.optional(Schema.Boolean) }) },
  responses: { 201: Schema.Struct({ taskID: Schema.optional(Schema.String), sourcePath: Schema.optional(Schema.String), status: Schema.optional(Schema.String), timeAdded: Schema.optional(Schema.String) }), 400: Schema.Unknown, 409: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrentCreator_status = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrentCreator_status;
export const get__api_instances_InstanceID_torrentCreator_status = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrent-creator/status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ taskID: Schema.optional(Schema.String) })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Array(Schema.Struct({ taskID: Schema.optional(Schema.String), sourcePath: Schema.optional(Schema.String), torrentFilePath: Schema.optional(Schema.String), pieceSize: Schema.optional(Schema.Int), private: Schema.optional(Schema.Boolean), format: Schema.optional(Schema.String), status: Schema.optional(Schema.String), timeAdded: Schema.optional(Schema.String), timeStarted: Schema.optional(Schema.String), timeFinished: Schema.optional(Schema.String), progress: Schema.optional(Schema.Number), errorMessage: Schema.optional(Schema.String) })), 400: Schema.Unknown, 404: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrentCreator_count = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrentCreator_count;
export const get__api_instances_InstanceID_torrentCreator_count = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrent-creator/count"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Struct({ count: Schema.optional(Schema.Int) }), 400: Schema.Unknown },
};

export type delete__api_instances_InstanceID_torrentCreator_TaskID = __TypedOpenapi.Endpoints.delete__api_instances_InstanceID_torrentCreator_TaskID;
export const delete__api_instances_InstanceID_torrentCreator_TaskID = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/instances/{instanceID}/torrent-creator/{taskID}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), taskID: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 404: Schema.Unknown },
};

export type get__api_instances_InstanceID_torrentCreator_TaskID_file = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_torrentCreator_TaskID_file;
export const get__api_instances_InstanceID_torrentCreator_TaskID_file = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/torrent-creator/{taskID}/file"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), taskID: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 404: Schema.Unknown, 409: Schema.Unknown },
};

export type get__api_instances_InstanceID_categories = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_categories;
export const get__api_instances_InstanceID_categories = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/categories"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Array(Category) },
};

export type post__api_instances_InstanceID_categories = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_categories;
export const post__api_instances_InstanceID_categories = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/categories"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ name: Schema.String, savePath: Schema.optional(Schema.String) }) },
  responses: { 201: Schema.Unknown },
};

export type put__api_instances_InstanceID_categories = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_categories;
export const put__api_instances_InstanceID_categories = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/categories"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ name: Schema.String, savePath: Schema.optional(Schema.String) }) },
  responses: { 200: Schema.Unknown },
};

export type delete__api_instances_InstanceID_categories = __TypedOpenapi.Endpoints.delete__api_instances_InstanceID_categories;
export const delete__api_instances_InstanceID_categories = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/instances/{instanceID}/categories"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ categories: Schema.Array(Schema.String) }) },
  responses: { 200: Schema.Unknown },
};

export type get__api_instances_InstanceID_tags = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_tags;
export const get__api_instances_InstanceID_tags = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/tags"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Array(Schema.String) },
};

export type post__api_instances_InstanceID_tags = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_tags;
export const post__api_instances_InstanceID_tags = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/tags"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ tags: Schema.Array(Schema.String) }) },
  responses: { 201: Schema.Unknown },
};

export type delete__api_instances_InstanceID_tags = __TypedOpenapi.Endpoints.delete__api_instances_InstanceID_tags;
export const delete__api_instances_InstanceID_tags = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/instances/{instanceID}/tags"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ tags: Schema.Array(Schema.String) }) },
  responses: { 200: Schema.Unknown },
};

export type get__api_instances_InstanceID_trackers = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_trackers;
export const get__api_instances_InstanceID_trackers = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/trackers"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Record(Schema.String, Schema.String), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_preferences = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_preferences;
export const get__api_instances_InstanceID_preferences = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/preferences"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Record(Schema.String, Schema.Unknown) },
};

export type patch__api_instances_InstanceID_preferences = __TypedOpenapi.Endpoints.patch__api_instances_InstanceID_preferences;
export const patch__api_instances_InstanceID_preferences = {
  method: Schema.Literal("PATCH"),
  path: Schema.Literal("/api/instances/{instanceID}/preferences"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Record(Schema.String, Schema.Unknown) },
  responses: { 200: Schema.Unknown },
};

export type get__api_instances_InstanceID_alternativeSpeedLimits = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_alternativeSpeedLimits;
export const get__api_instances_InstanceID_alternativeSpeedLimits = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/alternative-speed-limits"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Struct({ enabled: Schema.optional(Schema.Boolean) }) },
};

export type post__api_instances_InstanceID_alternativeSpeedLimits_toggle = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_alternativeSpeedLimits_toggle;
export const post__api_instances_InstanceID_alternativeSpeedLimits_toggle = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/alternative-speed-limits/toggle"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Struct({ enabled: Schema.optional(Schema.Boolean) }) },
};

export type post__api_license_activate = __TypedOpenapi.Endpoints.post__api_license_activate;
export const post__api_license_activate = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/license/activate"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ licenseKey: Schema.String }) },
  responses: { 200: Schema.Struct({ valid: Schema.optional(Schema.Boolean), productName: Schema.optional(Schema.String), expiresAt: Schema.optional(Schema.String), message: Schema.optional(Schema.String), error: Schema.optional(Schema.NullOr(Schema.String)) }), 400: Schema.Unknown, 403: Schema.Unknown },
};

export type post__api_license_validate = __TypedOpenapi.Endpoints.post__api_license_validate;
export const post__api_license_validate = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/license/validate"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ licenseKey: Schema.String }) },
  responses: { 200: Schema.Struct({ valid: Schema.optional(Schema.Boolean), productName: Schema.optional(Schema.String), expiresAt: Schema.optional(Schema.String), message: Schema.optional(Schema.String), error: Schema.optional(Schema.NullOr(Schema.String)) }), 400: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Unknown },
};

export type get__api_license_licensed = __TypedOpenapi.Endpoints.get__api_license_licensed;
export const get__api_license_licensed = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/license/licensed"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Struct({ hasPremiumAccess: Schema.optional(Schema.Boolean) }) },
};

export type get__api_license_licenses = __TypedOpenapi.Endpoints.get__api_license_licenses;
export const get__api_license_licenses = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/license/licenses"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(Schema.Struct({ licenseKey: Schema.optional(Schema.String), productName: Schema.optional(Schema.String), status: Schema.optional(Schema.String), provider: Schema.optional(Schema.Literals(["polar", "dodo"])), createdAt: Schema.optional(Schema.String) })) },
};

export type delete__api_license_LicenseKey = __TypedOpenapi.Endpoints.delete__api_license_LicenseKey;
export const delete__api_license_LicenseKey = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/license/{licenseKey}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ licenseKey: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown },
};

export type post__api_license_refresh = __TypedOpenapi.Endpoints.post__api_license_refresh;
export const post__api_license_refresh = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/license/refresh"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Struct({ message: Schema.optional(Schema.String) }), 500: Schema.Unknown },
};

export type get__api_themes_custom = __TypedOpenapi.Endpoints.get__api_themes_custom;
export const get__api_themes_custom = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/themes/custom"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Struct({ directory: Schema.optional(Schema.String), themes: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), filename: Schema.optional(Schema.String), css: Schema.optional(Schema.String) }))) }), 403: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_torrents_crossInstance = __TypedOpenapi.Endpoints.get__api_torrents_crossInstance;
export const get__api_torrents_crossInstance = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/torrents/cross-instance"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ page: Schema_default_0_prop_7, limit: Schema_default_500_prop, sort: Schema.optional(Schema.Literals(["name", "size", "progress", "priority", "added_on", "instance"])), order: Schema_default_desc_prop, search: Schema.optional(Schema.String), filters: Schema.String }) },
  responses: { 200: Schema.Struct({ cross_instance_torrents: Schema.optional(Schema.Array(Torrent.mapFields(Struct.assign((Schema.Struct({ instance_id: Schema.optional(Schema.Int), instance_name: Schema.optional(Schema.String) })).fields)))), total: Schema.optional(Schema.Int), hasMore: Schema.optional(Schema.Boolean), isCrossInstance: Boolean_default_true_prop, partialResults: Schema.optional(Schema.Boolean) }), 400: Schema.Struct({ error: Schema.optional(Schema.String) }), 500: Schema.Unknown },
};

export type get__api_trackerIcons = __TypedOpenapi.Endpoints.get__api_trackerIcons;
export const get__api_trackerIcons = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/tracker-icons"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Record(Schema.String, Schema.String), 500: Schema.Unknown },
};

export type get__api_crossSeed_settings = __TypedOpenapi.Endpoints.get__api_crossSeed_settings;
export const get__api_crossSeed_settings = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: CrossSeedAutomationSettings, 500: Schema.Unknown },
};

export type put__api_crossSeed_settings = __TypedOpenapi.Endpoints.put__api_crossSeed_settings;
export const put__api_crossSeed_settings = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/cross-seed/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CrossSeedAutomationSettings },
  responses: { 200: CrossSeedAutomationSettings, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type patch__api_crossSeed_settings = __TypedOpenapi.Endpoints.patch__api_crossSeed_settings;
export const patch__api_crossSeed_settings = {
  method: Schema.Literal("PATCH"),
  path: Schema.Literal("/api/cross-seed/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CrossSeedAutomationSettingsPatch },
  responses: { 200: CrossSeedAutomationSettings, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_dirScan_settings = __TypedOpenapi.Endpoints.get__api_dirScan_settings;
export const get__api_dirScan_settings = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/dir-scan/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: DirScanSettings, 500: Schema.Unknown },
};

export type patch__api_dirScan_settings = __TypedOpenapi.Endpoints.patch__api_dirScan_settings;
export const patch__api_dirScan_settings = {
  method: Schema.Literal("PATCH"),
  path: Schema.Literal("/api/dir-scan/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: DirScanSettingsPatch },
  responses: { 200: DirScanSettings, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_dirScan_directories = __TypedOpenapi.Endpoints.get__api_dirScan_directories;
export const get__api_dirScan_directories = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/dir-scan/directories"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(DirScanDirectory), 500: Schema.Unknown },
};

export type post__api_dirScan_directories = __TypedOpenapi.Endpoints.post__api_dirScan_directories;
export const post__api_dirScan_directories = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/dir-scan/directories"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: DirScanDirectoryCreate },
  responses: { 201: DirScanDirectory, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_dirScan_directories_DirectoryID = __TypedOpenapi.Endpoints.get__api_dirScan_directories_DirectoryID;
export const get__api_dirScan_directories_DirectoryID = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: DirScanDirectory, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type patch__api_dirScan_directories_DirectoryID = __TypedOpenapi.Endpoints.patch__api_dirScan_directories_DirectoryID;
export const patch__api_dirScan_directories_DirectoryID = {
  method: Schema.Literal("PATCH"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }), body: DirScanDirectoryPatch },
  responses: { 200: DirScanDirectory, 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type delete__api_dirScan_directories_DirectoryID = __TypedOpenapi.Endpoints.delete__api_dirScan_directories_DirectoryID;
export const delete__api_dirScan_directories_DirectoryID = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 204: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_dirScan_directories_DirectoryID_resetFiles = __TypedOpenapi.Endpoints.post__api_dirScan_directories_DirectoryID_resetFiles;
export const post__api_dirScan_directories_DirectoryID_resetFiles = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}/reset-files"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 204: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_dirScan_directories_DirectoryID_scan = __TypedOpenapi.Endpoints.post__api_dirScan_directories_DirectoryID_scan;
export const post__api_dirScan_directories_DirectoryID_scan = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}/scan"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 202: DirScanTriggerResponse, 404: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type delete__api_dirScan_directories_DirectoryID_scan = __TypedOpenapi.Endpoints.delete__api_dirScan_directories_DirectoryID_scan;
export const delete__api_dirScan_directories_DirectoryID_scan = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}/scan"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 204: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_dirScan_webhook_scan = __TypedOpenapi.Endpoints.post__api_dirScan_webhook_scan;
export const post__api_dirScan_webhook_scan = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/dir-scan/webhook/scan"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Union([Schema.Struct({ path: Schema.String, downloadClient: Schema.optional(Schema.String) }), Schema.Struct({ eventType: Schema.optional(Schema.String), downloadClient: Schema.optional(Schema.String), series: Schema.Struct({ path: Schema.String }) }), Schema.Struct({ eventType: Schema.optional(Schema.String), downloadClient: Schema.optional(Schema.String), movie: Schema.Struct({ folderPath: Schema.String }) }), Schema.Struct({ eventType: Schema.optional(Schema.String), downloadClient: Schema.optional(Schema.String), artist: Schema.Struct({ path: Schema.String }) }), Schema.Struct({ eventType: Schema.optional(Schema.String), downloadClient: Schema.optional(Schema.String), author: Schema.Struct({ path: Schema.String }) }), Schema.Struct({ eventType: Schema.Literal("test") })]) },
  responses: { 200: Schema.Struct({ skipped: Schema.Boolean, reason: Schema.String }), 202: DirScanTriggerResponse, 204: Schema.Unknown, 400: Schema.Unknown, 404: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_dirScan_directories_DirectoryID_status = __TypedOpenapi.Endpoints.get__api_dirScan_directories_DirectoryID_status;
export const get__api_dirScan_directories_DirectoryID_status = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}/status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Union([DirScanRun, DirScanIdleStatus]), 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_dirScan_directories_DirectoryID_runs = __TypedOpenapi.Endpoints.get__api_dirScan_directories_DirectoryID_runs;
export const get__api_dirScan_directories_DirectoryID_runs = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}/runs"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ limit: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(100))) })), path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Array(DirScanRun), 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_dirScan_directories_DirectoryID_runs_RunID_injections = __TypedOpenapi.Endpoints.get__api_dirScan_directories_DirectoryID_runs_RunID_injections;
export const get__api_dirScan_directories_DirectoryID_runs_RunID_injections = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}/runs/{runID}/injections"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ limit: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(200))), offset: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0))) })), path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()), runID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Array(DirScanRunInjection), 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_dirScan_directories_DirectoryID_files = __TypedOpenapi.Endpoints.get__api_dirScan_directories_DirectoryID_files;
export const get__api_dirScan_directories_DirectoryID_files = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/dir-scan/directories/{directoryID}/files"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ status: Schema.optional(DirScanFileStatus), limit: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(1000))), offset: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0))) })), path: Schema.Struct({ directoryID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Array(DirScanFile), 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_crossSeed_status = __TypedOpenapi.Endpoints.get__api_crossSeed_status;
export const get__api_crossSeed_status = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: CrossSeedAutomationStatus, 500: Schema.Unknown },
};

export type get__api_crossSeed_runs = __TypedOpenapi.Endpoints.get__api_crossSeed_runs;
export const get__api_crossSeed_runs = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/runs"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ limit: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(100))), offset: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0))) })) },
  responses: { 200: Schema.Array(CrossSeedRun), 500: Schema.Unknown },
};

export type post__api_crossSeed_run = __TypedOpenapi.Endpoints.post__api_crossSeed_run;
export const post__api_crossSeed_run = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/run"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CrossSeedRunRequest },
  responses: { 202: CrossSeedRun, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_crossSeed_run_cancel = __TypedOpenapi.Endpoints.post__api_crossSeed_run_cancel;
export const post__api_crossSeed_run_cancel = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/run/cancel"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 204: Schema.Unknown, 409: Schema.Unknown },
};

export type get__api_crossSeed_blocklist = __TypedOpenapi.Endpoints.get__api_crossSeed_blocklist;
export const get__api_crossSeed_blocklist = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/blocklist"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ instanceId: Schema.optional(Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1))) })) },
  responses: { 200: Schema.Array(CrossSeedBlocklistEntry), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_crossSeed_blocklist = __TypedOpenapi.Endpoints.post__api_crossSeed_blocklist;
export const post__api_crossSeed_blocklist = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/blocklist"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CrossSeedBlocklistRequest },
  responses: { 201: CrossSeedBlocklistEntry, 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type delete__api_crossSeed_blocklist_InstanceID_Infohash = __TypedOpenapi.Endpoints.delete__api_crossSeed_blocklist_InstanceID_Infohash;
export const delete__api_crossSeed_blocklist_InstanceID_Infohash = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/cross-seed/blocklist/{instanceID}/{infohash}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), infohash: Schema.String }) },
  responses: { 204: Schema.Unknown, 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_crossSeed_search_settings = __TypedOpenapi.Endpoints.get__api_crossSeed_search_settings;
export const get__api_crossSeed_search_settings = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/search/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: CrossSeedSearchSettings, 500: Schema.Unknown },
};

export type patch__api_crossSeed_search_settings = __TypedOpenapi.Endpoints.patch__api_crossSeed_search_settings;
export const patch__api_crossSeed_search_settings = {
  method: Schema.Literal("PATCH"),
  path: Schema.Literal("/api/cross-seed/search/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: CrossSeedSearchSettingsPatch },
  responses: { 200: CrossSeedSearchSettings, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_crossSeed_search_run = __TypedOpenapi.Endpoints.post__api_crossSeed_search_run;
export const post__api_crossSeed_search_run = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/search/run"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: Schema.Struct({ instanceId: Schema.Int, categories: Schema.optional(Schema.Array(Schema.String)), tags: Schema.optional(Schema.Array(Schema.String)), intervalSeconds: Schema.optional(Schema.Int), indexerIds: Schema.optional(Schema.Array(Schema.Int)), disableTorznab: Schema.optional(Schema.Boolean), cooldownMinutes: Schema.optional(Schema.Int) }) },
  responses: { 202: CrossSeedSearchRun, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_crossSeed_search_run_cancel = __TypedOpenapi.Endpoints.post__api_crossSeed_search_run_cancel;
export const post__api_crossSeed_search_run_cancel = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/search/run/cancel"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 204: Schema.Unknown },
};

export type get__api_crossSeed_search_status = __TypedOpenapi.Endpoints.get__api_crossSeed_search_status;
export const get__api_crossSeed_search_status = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/search/status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: CrossSeedSearchStatus, 500: Schema.Unknown },
};

export type get__api_crossSeed_search_runs = __TypedOpenapi.Endpoints.get__api_crossSeed_search_runs;
export const get__api_crossSeed_search_runs = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/search/runs"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.Struct({ instanceId: Schema.NumberFromString.check(Schema.isInt()), limit: Schema_default_25_prop, offset: Schema_default_0_prop_7 }) },
  responses: { 200: Schema.Array(CrossSeedSearchRun), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_crossSeed_completion_InstanceId = __TypedOpenapi.Endpoints.get__api_crossSeed_completion_InstanceId;
export const get__api_crossSeed_completion_InstanceId = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/completion/{instanceId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceId: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: InstanceCrossSeedCompletionSettings, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type put__api_crossSeed_completion_InstanceId = __TypedOpenapi.Endpoints.put__api_crossSeed_completion_InstanceId;
export const put__api_crossSeed_completion_InstanceId = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/cross-seed/completion/{instanceId}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceId: Schema.NumberFromString.check(Schema.isInt()) }), body: InstanceCrossSeedCompletionSettingsRequest },
  responses: { 200: InstanceCrossSeedCompletionSettings, 400: Schema.Unknown, 500: Schema.Unknown, 503: Schema.Unknown },
};

export type post__api_crossSeed_seasonPack_check = __TypedOpenapi.Endpoints.post__api_crossSeed_seasonPack_check;
export const post__api_crossSeed_seasonPack_check = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/season-pack/check"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ apikey: Schema.optional(Schema.String) })), body: SeasonPackCheckRequest },
  responses: { 200: SeasonPackCheckResponse, 400: Schema.Unknown, 404: SeasonPackCheckResponse, 500: Schema.Unknown },
};

export type post__api_crossSeed_seasonPack_apply = __TypedOpenapi.Endpoints.post__api_crossSeed_seasonPack_apply;
export const post__api_crossSeed_seasonPack_apply = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/season-pack/apply"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ apikey: Schema.optional(Schema.String) })), body: SeasonPackApplyRequest },
  responses: { 200: SeasonPackApplyResponse, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_crossSeed_seasonPack_runs = __TypedOpenapi.Endpoints.get__api_crossSeed_seasonPack_runs;
export const get__api_crossSeed_seasonPack_runs = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/season-pack/runs"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ limit: Schema_default_20_prop })) },
  responses: { 200: Schema.Array(SeasonPackRun), 500: Schema.Unknown },
};

export type post__api_crossSeed_webhook_check = __TypedOpenapi.Endpoints.post__api_crossSeed_webhook_check;
export const post__api_crossSeed_webhook_check = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/webhook/check"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ apikey: Schema.optional(Schema.String) })), body: Schema.Struct({ torrentName: Schema.String, instanceIds: Schema.optional(Schema.Array(Schema.Int)), size: Schema.optional(Schema.Int), indexer: Schema.optional(Schema.String.check(Schema.isMinLength(1))), findIndividualEpisodes: Schema.optional(Schema.Boolean) }) },
  responses: { 200: CrossSeedWebhookCheckResponse, 202: CrossSeedWebhookCheckResponse, 400: Schema.Unknown, 404: CrossSeedWebhookCheckResponse, 500: Schema.Unknown },
};

export type post__api_crossSeed_apply = __TypedOpenapi.Endpoints.post__api_crossSeed_apply;
export const post__api_crossSeed_apply = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/apply"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ apikey: Schema.optional(Schema.String) })), body: Schema.Struct({ torrentData: Schema.String, instanceIds: Schema.optional(Schema.Array(Schema.Int)), category: Schema.optional(Schema.String), tags: Schema.optional(Schema.Array(Schema.String)), startPaused: Schema.optional(Schema.Boolean), skipIfExists: Schema.optional(Schema.Boolean), findIndividualEpisodes: Schema.optional(Schema.Boolean), indexer: Schema.optional(Schema.String.check(Schema.isMinLength(1))) }) },
  responses: { 200: CrossSeedResponse, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_crossSeed_torrents_InstanceID_Hash_analyze = __TypedOpenapi.Endpoints.get__api_crossSeed_torrents_InstanceID_Hash_analyze;
export const get__api_crossSeed_torrents_InstanceID_Hash_analyze = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/torrents/{instanceID}/{hash}/analyze"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: Schema.Struct({ name: Schema.optional(Schema.String), size_bytes: Schema.optional(Schema.Int), content_path: Schema.optional(Schema.String), num_files: Schema.optional(Schema.Int) }), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_crossSeed_torrents_InstanceID_Hash_asyncStatus = __TypedOpenapi.Endpoints.get__api_crossSeed_torrents_InstanceID_Hash_asyncStatus;
export const get__api_crossSeed_torrents_InstanceID_Hash_asyncStatus = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/torrents/{instanceID}/{hash}/async-status"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: AsyncIndexerFilteringState, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_crossSeed_torrents_InstanceID_Hash_search = __TypedOpenapi.Endpoints.post__api_crossSeed_torrents_InstanceID_Hash_search;
export const post__api_crossSeed_torrents_InstanceID_Hash_search = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/torrents/{instanceID}/{hash}/search"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: CrossSeedTorrentSearchRequest },
  responses: { 200: CrossSeedTorrentSearchResponse, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_crossSeed_torrents_InstanceID_Hash_apply = __TypedOpenapi.Endpoints.post__api_crossSeed_torrents_InstanceID_Hash_apply;
export const post__api_crossSeed_torrents_InstanceID_Hash_apply = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/cross-seed/torrents/{instanceID}/{hash}/apply"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }), body: CrossSeedApplyRequest },
  responses: { 200: CrossSeedApplyResponse, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_crossSeed_torrents_InstanceID_Hash_localMatches = __TypedOpenapi.Endpoints.get__api_crossSeed_torrents_InstanceID_Hash_localMatches;
export const get__api_crossSeed_torrents_InstanceID_Hash_localMatches = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/cross-seed/torrents/{instanceID}/{hash}/local-matches"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ strict: Union_default_false_prop })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), hash: Schema.String }) },
  responses: { 200: Schema.Struct({ matches: Schema.Array(LocalCrossSeedMatch) }), 400: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_logSettings = __TypedOpenapi.Endpoints.get__api_logSettings;
export const get__api_logSettings = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/log-settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: LogSettings },
};

export type put__api_logSettings = __TypedOpenapi.Endpoints.put__api_logSettings;
export const put__api_logSettings = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/log-settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: LogSettingsUpdate },
  responses: { 200: LogSettings, 400: Schema.Unknown },
};

export type get__api_logExclusions = __TypedOpenapi.Endpoints.get__api_logExclusions;
export const get__api_logExclusions = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/log-exclusions"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: LogExclusions },
};

export type put__api_logExclusions = __TypedOpenapi.Endpoints.put__api_logExclusions;
export const put__api_logExclusions = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/log-exclusions"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { body: LogExclusionsInput },
  responses: { 200: LogExclusions },
};

export type get__api_logs_stream = __TypedOpenapi.Endpoints.get__api_logs_stream;
export const get__api_logs_stream = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/logs/stream"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("sse"),
  parameters: { query: Schema.optional(Schema.Struct({ limit: Schema_default_1000_prop })) },
  responses: { 200: Schema.declare((v): v is ReadableStream<Uint8Array> => typeof ReadableStream !== "undefined" && v instanceof ReadableStream) },
};

export type get__api_logs_files = __TypedOpenapi.Endpoints.get__api_logs_files;
export const get__api_logs_files = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/logs/files"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Array(LogFile) },
};

export type get__api_logs_files_Filename = __TypedOpenapi.Endpoints.get__api_logs_files_Filename;
export const get__api_logs_files_Filename = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/logs/files/{filename}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ filename: Schema.String }) },
  responses: { 200: Schema.Unknown, 404: Schema.Unknown },
};

export type get__api_version_latest = __TypedOpenapi.Endpoints.get__api_version_latest;
export const get__api_version_latest = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/version/latest"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: LatestVersionResponse, 204: Schema.Unknown },
};

export type get__api_version = __TypedOpenapi.Endpoints.get__api_version;
export const get__api_version = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/version"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: VersionResponse },
};

export type post__api_instances_InstanceID_backups_import = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_backups_import;
export const post__api_instances_InstanceID_backups_import = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/backups/import"),
  requestFormat: Schema.Literal("form-data"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.optional(Schema.Struct({ archive: Schema.optional(Schema.declare((v): v is Blob => typeof Blob !== "undefined" && v instanceof Blob)), manifest: Schema.optional(Schema.declare((v): v is Blob => typeof Blob !== "undefined" && v instanceof Blob)) })) },
  responses: { 201: BackupRun, 400: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_backups_runs_RunId_restore_preview = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_backups_runs_RunId_restore_preview;
export const post__api_instances_InstanceID_backups_runs_RunId_restore_preview = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/backups/runs/{runId}/restore/preview"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), runId: Schema.NumberFromString.check(Schema.isInt()) }), body: Schema.optional(Schema.Struct({ mode: Schema.optional(Schema.Literals(["incremental", "overwrite", "complete"])), excludeHashes: Schema.optional(Schema.Array(Schema.String)), startPaused: Schema.optional(Schema.Boolean), skipHashCheck: Schema.optional(Schema.Boolean), autoResumeVerified: Schema.optional(Schema.Boolean) })) },
  responses: { 200: Schema.Record(Schema.String, Schema.Unknown), 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_backups_runs_RunId_restore = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_backups_runs_RunId_restore;
export const post__api_instances_InstanceID_backups_runs_RunId_restore = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/backups/runs/{runId}/restore"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), runId: Schema.NumberFromString.check(Schema.isInt()) }), body: Schema.Struct({ mode: Schema.Literals(["incremental", "overwrite", "complete"]), dryRun: Schema.optional(Schema.Boolean), excludeHashes: Schema.optional(Schema.Array(Schema.String)), startPaused: Schema.optional(Schema.Boolean), skipHashCheck: Schema.optional(Schema.Boolean), autoResumeVerified: Schema.optional(Schema.Boolean) }) },
  responses: { 200: Schema.Record(Schema.String, Schema.Unknown), 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_backups_runs_RunId_download = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_backups_runs_RunId_download;
export const get__api_instances_InstanceID_backups_runs_RunId_download = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/backups/runs/{runId}/download"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ format: Schema_default_zip_prop })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), runId: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_backups_runs_RunId_items_TorrentHash_download = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_backups_runs_RunId_items_TorrentHash_download;
export const get__api_instances_InstanceID_backups_runs_RunId_items_TorrentHash_download = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/backups/runs/{runId}/items/{torrentHash}/download"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), runId: Schema.NumberFromString.check(Schema.isInt()), torrentHash: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 404: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_orphanScan_settings = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_orphanScan_settings;
export const get__api_instances_InstanceID_orphanScan_settings = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/orphan-scan/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: OrphanScanSettings, 403: Schema.Unknown, 404: Schema.Unknown },
};

export type put__api_instances_InstanceID_orphanScan_settings = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_orphanScan_settings;
export const put__api_instances_InstanceID_orphanScan_settings = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/orphan-scan/settings"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: OrphanScanSettingsUpdate },
  responses: { 200: OrphanScanSettings, 400: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Unknown },
};

export type post__api_instances_InstanceID_orphanScan_scan = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_orphanScan_scan;
export const post__api_instances_InstanceID_orphanScan_scan = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/orphan-scan/scan"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 202: Schema.Struct({ runId: Schema.optional(Schema.Int) }), 403: Schema.Unknown, 404: Schema.Unknown, 409: Schema.Unknown },
};

export type get__api_instances_InstanceID_orphanScan_runs = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_orphanScan_runs;
export const get__api_instances_InstanceID_orphanScan_runs = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/orphan-scan/runs"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ limit: Schema_default_10_prop })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Array(OrphanScanRun), 403: Schema.Unknown, 404: Schema.Unknown },
};

export type get__api_instances_InstanceID_orphanScan_runs_RunID = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_orphanScan_runs_RunID;
export const get__api_instances_InstanceID_orphanScan_runs_RunID = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/orphan-scan/runs/{runID}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ limit: Schema_default_100_prop, offset: Schema_default_0_prop_16 })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), runID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: OrphanScanRunWithFiles, 403: Schema.Unknown, 404: Schema.Unknown },
};

export type delete__api_instances_InstanceID_orphanScan_runs_RunID = __TypedOpenapi.Endpoints.delete__api_instances_InstanceID_orphanScan_runs_RunID;
export const delete__api_instances_InstanceID_orphanScan_runs_RunID = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/instances/{instanceID}/orphan-scan/runs/{runID}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), runID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 200: Schema.Struct({ status: Schema.optional(Schema.String) }), 400: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Unknown, 409: Schema.Unknown },
};

export type post__api_instances_InstanceID_orphanScan_runs_RunID_confirm = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_orphanScan_runs_RunID_confirm;
export const post__api_instances_InstanceID_orphanScan_runs_RunID_confirm = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/orphan-scan/runs/{runID}/confirm"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), runID: Schema.NumberFromString.check(Schema.isInt()) }) },
  responses: { 202: Schema.Struct({ status: Schema.optional(Schema.String) }), 400: Schema.Unknown, 403: Schema.Unknown, 404: Schema.Unknown, 409: Schema.Unknown },
};

export type get__api_instances_InstanceID_rss_events = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_rss_events;
export const get__api_instances_InstanceID_rss_events = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/events"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("sse"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.declare((v): v is ReadableStream<Uint8Array> => typeof ReadableStream !== "undefined" && v instanceof ReadableStream), 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_rss_items = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_rss_items;
export const get__api_instances_InstanceID_rss_items = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/items"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { query: Schema.optional(Schema.Struct({ withData: Union_default_true_prop })), path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: RSSItems, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type delete__api_instances_InstanceID_rss_items = __TypedOpenapi.Endpoints.delete__api_instances_InstanceID_rss_items;
export const delete__api_instances_InstanceID_rss_items = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/items"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ path: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_rss_items_move = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_rss_items_move;
export const post__api_instances_InstanceID_rss_items_move = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/items/move"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ itemPath: Schema.String, destPath: Schema.optional(Schema.String) }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_rss_items_refresh = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_rss_items_refresh;
export const post__api_instances_InstanceID_rss_items_refresh = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/items/refresh"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ itemPath: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_rss_folders = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_rss_folders;
export const post__api_instances_InstanceID_rss_folders = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/folders"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ path: Schema.String }) },
  responses: { 201: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_rss_feeds = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_rss_feeds;
export const post__api_instances_InstanceID_rss_feeds = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/feeds"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ url: Schema.String, path: Schema.optional(Schema.String) }) },
  responses: { 201: WarningResponse, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type put__api_instances_InstanceID_rss_feeds_url = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_rss_feeds_url;
export const put__api_instances_InstanceID_rss_feeds_url = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/feeds/url"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ path: Schema.String, url: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_rss_articles_read = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_rss_articles_read;
export const post__api_instances_InstanceID_rss_articles_read = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/articles/read"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ itemPath: Schema.String, articleId: Schema.optional(Schema.String) }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_rss_rules = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_rss_rules;
export const get__api_instances_InstanceID_rss_rules = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/rules"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Record(Schema.String, RSSAutoDownloadRule), 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_rss_rules = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_rss_rules;
export const post__api_instances_InstanceID_rss_rules = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/rules"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }), body: Schema.Struct({ name: Schema.String, rule: RSSAutoDownloadRule }) },
  responses: { 201: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type post__api_instances_InstanceID_rss_rules_reprocess = __TypedOpenapi.Endpoints.post__api_instances_InstanceID_rss_rules_reprocess;
export const post__api_instances_InstanceID_rss_rules_reprocess = {
  method: Schema.Literal("POST"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/rules/reprocess"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)) }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type delete__api_instances_InstanceID_rss_rules_RuleName = __TypedOpenapi.Endpoints.delete__api_instances_InstanceID_rss_rules_RuleName;
export const delete__api_instances_InstanceID_rss_rules_RuleName = {
  method: Schema.Literal("DELETE"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/rules/{ruleName}"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), ruleName: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type put__api_instances_InstanceID_rss_rules_RuleName_rename = __TypedOpenapi.Endpoints.put__api_instances_InstanceID_rss_rules_RuleName_rename;
export const put__api_instances_InstanceID_rss_rules_RuleName_rename = {
  method: Schema.Literal("PUT"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/rules/{ruleName}/rename"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), ruleName: Schema.String }), body: Schema.Struct({ newName: Schema.String }) },
  responses: { 200: Schema.Unknown, 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type get__api_instances_InstanceID_rss_rules_RuleName_preview = __TypedOpenapi.Endpoints.get__api_instances_InstanceID_rss_rules_RuleName_preview;
export const get__api_instances_InstanceID_rss_rules_RuleName_preview = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/api/instances/{instanceID}/rss/rules/{ruleName}/preview"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: { path: Schema.Struct({ instanceID: Schema.NumberFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(1)), ruleName: Schema.String }) },
  responses: { 200: Schema.Record(Schema.String, Schema.Array(Schema.String)), 400: Schema.Unknown, 409: Schema.Unknown, 500: Schema.Unknown },
};

export type get__health = __TypedOpenapi.Endpoints.get__health;
export const get__health = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/health"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Struct({ status: Schema.optional(Schema.String) }) },
};

export type get__healthz_readiness = __TypedOpenapi.Endpoints.get__healthz_readiness;
export const get__healthz_readiness = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/healthz/readiness"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown, 503: Schema.Unknown },
};

export type get__healthz_liveness = __TypedOpenapi.Endpoints.get__healthz_liveness;
export const get__healthz_liveness = {
  method: Schema.Literal("GET"),
  path: Schema.Literal("/healthz/liveness"),
  requestFormat: Schema.Literal("json"),
  responseFormat: Schema.Literal("json"),
  parameters: Schema.Never,
  responses: { 200: Schema.Unknown },
};

// </Endpoints>

  
     // <EndpointByMethod>
     export const EndpointByMethod: __TypedOpenapi.EndpointByMethod = {
     post: {
           "/api/auth/setup": post__api_auth_setup as any,
"/api/auth/login": post__api_auth_login as any,
"/api/auth/logout": post__api_auth_logout as any,
"/api/api-keys": post__api_apiKeys as any,
"/api/client-api-keys": post__api_clientApiKeys as any,
"/api/external-programs": post__api_externalPrograms as any,
"/api/external-programs/execute": post__api_externalPrograms_execute as any,
"/api/notifications/targets": post__api_notifications_targets as any,
"/api/notifications/targets/{id}/test": post__api_notifications_targets_Id_test as any,
"/api/arr/instances": post__api_arr_instances as any,
"/api/arr/instances/{id}/test": post__api_arr_instances_Id_test as any,
"/api/arr/test": post__api_arr_test as any,
"/api/arr/resolve": post__api_arr_resolve as any,
"/api/instances": post__api_instances as any,
"/api/instances/{instanceID}/test": post__api_instances_InstanceID_test as any,
"/api/instances/{instanceID}/torrents": post__api_instances_InstanceID_torrents as any,
"/api/instances/{instanceID}/torrents/check-duplicates": post__api_instances_InstanceID_torrents_checkDuplicates as any,
"/api/instances/{instanceID}/torrents/bulk-action": post__api_instances_InstanceID_torrents_bulkAction as any,
"/api/instances/{instanceID}/torrents/field": post__api_instances_InstanceID_torrents_field as any,
"/api/instances/{instanceID}/torrents/{hash}/trackers": post__api_instances_InstanceID_torrents_Hash_trackers as any,
"/api/instances/{instanceID}/torrents/add-peers": post__api_instances_InstanceID_torrents_addPeers as any,
"/api/instances/{instanceID}/torrents/ban-peers": post__api_instances_InstanceID_torrents_banPeers as any,
"/api/instances/{instanceID}/torrent-creator": post__api_instances_InstanceID_torrentCreator as any,
"/api/instances/{instanceID}/categories": post__api_instances_InstanceID_categories as any,
"/api/instances/{instanceID}/tags": post__api_instances_InstanceID_tags as any,
"/api/instances/{instanceID}/alternative-speed-limits/toggle": post__api_instances_InstanceID_alternativeSpeedLimits_toggle as any,
"/api/license/activate": post__api_license_activate as any,
"/api/license/validate": post__api_license_validate as any,
"/api/license/refresh": post__api_license_refresh as any,
"/api/dir-scan/directories": post__api_dirScan_directories as any,
"/api/dir-scan/directories/{directoryID}/reset-files": post__api_dirScan_directories_DirectoryID_resetFiles as any,
"/api/dir-scan/directories/{directoryID}/scan": post__api_dirScan_directories_DirectoryID_scan as any,
"/api/dir-scan/webhook/scan": post__api_dirScan_webhook_scan as any,
"/api/cross-seed/run": post__api_crossSeed_run as any,
"/api/cross-seed/run/cancel": post__api_crossSeed_run_cancel as any,
"/api/cross-seed/blocklist": post__api_crossSeed_blocklist as any,
"/api/cross-seed/search/run": post__api_crossSeed_search_run as any,
"/api/cross-seed/search/run/cancel": post__api_crossSeed_search_run_cancel as any,
"/api/cross-seed/season-pack/check": post__api_crossSeed_seasonPack_check as any,
"/api/cross-seed/season-pack/apply": post__api_crossSeed_seasonPack_apply as any,
"/api/cross-seed/webhook/check": post__api_crossSeed_webhook_check as any,
"/api/cross-seed/apply": post__api_crossSeed_apply as any,
"/api/cross-seed/torrents/{instanceID}/{hash}/search": post__api_crossSeed_torrents_InstanceID_Hash_search as any,
"/api/cross-seed/torrents/{instanceID}/{hash}/apply": post__api_crossSeed_torrents_InstanceID_Hash_apply as any,
"/api/instances/{instanceID}/backups/import": post__api_instances_InstanceID_backups_import as any,
"/api/instances/{instanceID}/backups/runs/{runId}/restore/preview": post__api_instances_InstanceID_backups_runs_RunId_restore_preview as any,
"/api/instances/{instanceID}/backups/runs/{runId}/restore": post__api_instances_InstanceID_backups_runs_RunId_restore as any,
"/api/instances/{instanceID}/orphan-scan/scan": post__api_instances_InstanceID_orphanScan_scan as any,
"/api/instances/{instanceID}/orphan-scan/runs/{runID}/confirm": post__api_instances_InstanceID_orphanScan_runs_RunID_confirm as any,
"/api/instances/{instanceID}/rss/items/move": post__api_instances_InstanceID_rss_items_move as any,
"/api/instances/{instanceID}/rss/items/refresh": post__api_instances_InstanceID_rss_items_refresh as any,
"/api/instances/{instanceID}/rss/folders": post__api_instances_InstanceID_rss_folders as any,
"/api/instances/{instanceID}/rss/feeds": post__api_instances_InstanceID_rss_feeds as any,
"/api/instances/{instanceID}/rss/articles/read": post__api_instances_InstanceID_rss_articles_read as any,
"/api/instances/{instanceID}/rss/rules": post__api_instances_InstanceID_rss_rules as any,
"/api/instances/{instanceID}/rss/rules/reprocess": post__api_instances_InstanceID_rss_rules_reprocess as any
         },
get: {
           "/api/auth/check-setup": get__api_auth_checkSetup as any,
"/api/auth/me": get__api_auth_me as any,
"/api/api-keys": get__api_apiKeys as any,
"/api/client-api-keys": get__api_clientApiKeys as any,
"/api/external-programs": get__api_externalPrograms as any,
"/api/notifications/events": get__api_notifications_events as any,
"/api/notifications/targets": get__api_notifications_targets as any,
"/api/arr/instances": get__api_arr_instances as any,
"/api/arr/instances/{id}": get__api_arr_instances_Id as any,
"/api/instances": get__api_instances as any,
"/api/instances/{instanceID}/app-info": get__api_instances_InstanceID_appInfo as any,
"/api/instances/{instanceID}/capabilities": get__api_instances_InstanceID_capabilities as any,
"/api/instances/{instanceID}/transfer-info": get__api_instances_InstanceID_transferInfo as any,
"/api/instances/{instanceID}/getDirectoryContent": get__api_instances_InstanceID_getDirectoryContent as any,
"/api/instances/{instanceID}/reannounce/activity": get__api_instances_InstanceID_reannounce_activity as any,
"/api/instances/{instanceID}/reannounce/candidates": get__api_instances_InstanceID_reannounce_candidates as any,
"/api/instances/{instanceID}/cross-seed/status": get__api_instances_InstanceID_crossSeed_status as any,
"/api/instances/{instanceID}/torrents": get__api_instances_InstanceID_torrents as any,
"/api/instances/{instanceID}/torrents/{hash}/export": get__api_instances_InstanceID_torrents_Hash_export as any,
"/api/instances/{instanceID}/torrents/{hash}/properties": get__api_instances_InstanceID_torrents_Hash_properties as any,
"/api/instances/{instanceID}/torrents/{hash}/trackers": get__api_instances_InstanceID_torrents_Hash_trackers as any,
"/api/instances/{instanceID}/torrents/{hash}/webseeds": get__api_instances_InstanceID_torrents_Hash_webseeds as any,
"/api/instances/{instanceID}/torrents/{hash}/pieces": get__api_instances_InstanceID_torrents_Hash_pieces as any,
"/api/instances/{instanceID}/torrents/{hash}/files": get__api_instances_InstanceID_torrents_Hash_files as any,
"/api/instances/{instanceID}/torrents/{hash}/files/{fileIndex}/download": get__api_instances_InstanceID_torrents_Hash_files_FileIndex_download as any,
"/api/instances/{instanceID}/torrents/{hash}/files/{fileIndex}/mediainfo": get__api_instances_InstanceID_torrents_Hash_files_FileIndex_mediainfo as any,
"/api/instances/{instanceID}/mediainfo": get__api_instances_InstanceID_mediainfo as any,
"/proxy/{api-key}/api/v2/torrents/mediainfo": get__proxy_ApiKey_api_v2_torrents_mediainfo as any,
"/api/instances/{instanceID}/torrents/{hash}/peers": get__api_instances_InstanceID_torrents_Hash_peers as any,
"/api/instances/{instanceID}/torrent-creator/status": get__api_instances_InstanceID_torrentCreator_status as any,
"/api/instances/{instanceID}/torrent-creator/count": get__api_instances_InstanceID_torrentCreator_count as any,
"/api/instances/{instanceID}/torrent-creator/{taskID}/file": get__api_instances_InstanceID_torrentCreator_TaskID_file as any,
"/api/instances/{instanceID}/categories": get__api_instances_InstanceID_categories as any,
"/api/instances/{instanceID}/tags": get__api_instances_InstanceID_tags as any,
"/api/instances/{instanceID}/trackers": get__api_instances_InstanceID_trackers as any,
"/api/instances/{instanceID}/preferences": get__api_instances_InstanceID_preferences as any,
"/api/instances/{instanceID}/alternative-speed-limits": get__api_instances_InstanceID_alternativeSpeedLimits as any,
"/api/license/licensed": get__api_license_licensed as any,
"/api/license/licenses": get__api_license_licenses as any,
"/api/themes/custom": get__api_themes_custom as any,
"/api/torrents/cross-instance": get__api_torrents_crossInstance as any,
"/api/tracker-icons": get__api_trackerIcons as any,
"/api/cross-seed/settings": get__api_crossSeed_settings as any,
"/api/dir-scan/settings": get__api_dirScan_settings as any,
"/api/dir-scan/directories": get__api_dirScan_directories as any,
"/api/dir-scan/directories/{directoryID}": get__api_dirScan_directories_DirectoryID as any,
"/api/dir-scan/directories/{directoryID}/status": get__api_dirScan_directories_DirectoryID_status as any,
"/api/dir-scan/directories/{directoryID}/runs": get__api_dirScan_directories_DirectoryID_runs as any,
"/api/dir-scan/directories/{directoryID}/runs/{runID}/injections": get__api_dirScan_directories_DirectoryID_runs_RunID_injections as any,
"/api/dir-scan/directories/{directoryID}/files": get__api_dirScan_directories_DirectoryID_files as any,
"/api/cross-seed/status": get__api_crossSeed_status as any,
"/api/cross-seed/runs": get__api_crossSeed_runs as any,
"/api/cross-seed/blocklist": get__api_crossSeed_blocklist as any,
"/api/cross-seed/search/settings": get__api_crossSeed_search_settings as any,
"/api/cross-seed/search/status": get__api_crossSeed_search_status as any,
"/api/cross-seed/search/runs": get__api_crossSeed_search_runs as any,
"/api/cross-seed/completion/{instanceId}": get__api_crossSeed_completion_InstanceId as any,
"/api/cross-seed/season-pack/runs": get__api_crossSeed_seasonPack_runs as any,
"/api/cross-seed/torrents/{instanceID}/{hash}/analyze": get__api_crossSeed_torrents_InstanceID_Hash_analyze as any,
"/api/cross-seed/torrents/{instanceID}/{hash}/async-status": get__api_crossSeed_torrents_InstanceID_Hash_asyncStatus as any,
"/api/cross-seed/torrents/{instanceID}/{hash}/local-matches": get__api_crossSeed_torrents_InstanceID_Hash_localMatches as any,
"/api/log-settings": get__api_logSettings as any,
"/api/log-exclusions": get__api_logExclusions as any,
"/api/logs/stream": get__api_logs_stream as any,
"/api/logs/files": get__api_logs_files as any,
"/api/logs/files/{filename}": get__api_logs_files_Filename as any,
"/api/version/latest": get__api_version_latest as any,
"/api/version": get__api_version as any,
"/api/instances/{instanceID}/backups/runs/{runId}/download": get__api_instances_InstanceID_backups_runs_RunId_download as any,
"/api/instances/{instanceID}/backups/runs/{runId}/items/{torrentHash}/download": get__api_instances_InstanceID_backups_runs_RunId_items_TorrentHash_download as any,
"/api/instances/{instanceID}/orphan-scan/settings": get__api_instances_InstanceID_orphanScan_settings as any,
"/api/instances/{instanceID}/orphan-scan/runs": get__api_instances_InstanceID_orphanScan_runs as any,
"/api/instances/{instanceID}/orphan-scan/runs/{runID}": get__api_instances_InstanceID_orphanScan_runs_RunID as any,
"/api/instances/{instanceID}/rss/events": get__api_instances_InstanceID_rss_events as any,
"/api/instances/{instanceID}/rss/items": get__api_instances_InstanceID_rss_items as any,
"/api/instances/{instanceID}/rss/rules": get__api_instances_InstanceID_rss_rules as any,
"/api/instances/{instanceID}/rss/rules/{ruleName}/preview": get__api_instances_InstanceID_rss_rules_RuleName_preview as any,
"/health": get__health as any,
"/healthz/readiness": get__healthz_readiness as any,
"/healthz/liveness": get__healthz_liveness as any
         },
put: {
           "/api/auth/change-password": put__api_auth_changePassword as any,
"/api/external-programs/{id}": put__api_externalPrograms_Id as any,
"/api/notifications/targets/{id}": put__api_notifications_targets_Id as any,
"/api/arr/instances/{id}": put__api_arr_instances_Id as any,
"/api/instances/order": put__api_instances_order as any,
"/api/instances/{instanceID}": put__api_instances_InstanceID as any,
"/api/instances/{instanceID}/status": put__api_instances_InstanceID_status as any,
"/api/instances/{instanceID}/torrents/{hash}/trackers": put__api_instances_InstanceID_torrents_Hash_trackers as any,
"/api/instances/{instanceID}/torrents/{hash}/files": put__api_instances_InstanceID_torrents_Hash_files as any,
"/api/instances/{instanceID}/torrents/{hash}/rename": put__api_instances_InstanceID_torrents_Hash_rename as any,
"/api/instances/{instanceID}/torrents/{hash}/rename-file": put__api_instances_InstanceID_torrents_Hash_renameFile as any,
"/api/instances/{instanceID}/torrents/{hash}/rename-folder": put__api_instances_InstanceID_torrents_Hash_renameFolder as any,
"/api/instances/{instanceID}/categories": put__api_instances_InstanceID_categories as any,
"/api/cross-seed/settings": put__api_crossSeed_settings as any,
"/api/cross-seed/completion/{instanceId}": put__api_crossSeed_completion_InstanceId as any,
"/api/log-settings": put__api_logSettings as any,
"/api/log-exclusions": put__api_logExclusions as any,
"/api/instances/{instanceID}/orphan-scan/settings": put__api_instances_InstanceID_orphanScan_settings as any,
"/api/instances/{instanceID}/rss/feeds/url": put__api_instances_InstanceID_rss_feeds_url as any,
"/api/instances/{instanceID}/rss/rules/{ruleName}/rename": put__api_instances_InstanceID_rss_rules_RuleName_rename as any
         },
delete: {
           "/api/api-keys/{id}": delete__api_apiKeys_Id as any,
"/api/client-api-keys/{id}": delete__api_clientApiKeys_Id as any,
"/api/external-programs/{id}": delete__api_externalPrograms_Id as any,
"/api/notifications/targets/{id}": delete__api_notifications_targets_Id as any,
"/api/arr/instances/{id}": delete__api_arr_instances_Id as any,
"/api/instances/{instanceID}": delete__api_instances_InstanceID as any,
"/api/instances/{instanceID}/torrents/{hash}/trackers": delete__api_instances_InstanceID_torrents_Hash_trackers as any,
"/api/instances/{instanceID}/torrent-creator/{taskID}": delete__api_instances_InstanceID_torrentCreator_TaskID as any,
"/api/instances/{instanceID}/categories": delete__api_instances_InstanceID_categories as any,
"/api/instances/{instanceID}/tags": delete__api_instances_InstanceID_tags as any,
"/api/license/{licenseKey}": delete__api_license_LicenseKey as any,
"/api/dir-scan/directories/{directoryID}": delete__api_dirScan_directories_DirectoryID as any,
"/api/dir-scan/directories/{directoryID}/scan": delete__api_dirScan_directories_DirectoryID_scan as any,
"/api/cross-seed/blocklist/{instanceID}/{infohash}": delete__api_crossSeed_blocklist_InstanceID_Infohash as any,
"/api/instances/{instanceID}/orphan-scan/runs/{runID}": delete__api_instances_InstanceID_orphanScan_runs_RunID as any,
"/api/instances/{instanceID}/rss/items": delete__api_instances_InstanceID_rss_items as any,
"/api/instances/{instanceID}/rss/rules/{ruleName}": delete__api_instances_InstanceID_rss_rules_RuleName as any
         },
patch: {
           "/api/instances/{instanceID}/preferences": patch__api_instances_InstanceID_preferences as any,
"/api/cross-seed/settings": patch__api_crossSeed_settings as any,
"/api/dir-scan/settings": patch__api_dirScan_settings as any,
"/api/dir-scan/directories/{directoryID}": patch__api_dirScan_directories_DirectoryID as any,
"/api/cross-seed/search/settings": patch__api_crossSeed_search_settings as any
         }
     }
     export type EndpointByMethod = __TypedOpenapi.EndpointByMethod;
     // </EndpointByMethod>
     

    // <EndpointByMethod.Shorthands>
    export type PostEndpoints = EndpointByMethod["post"]
export type GetEndpoints = EndpointByMethod["get"]
export type PutEndpoints = EndpointByMethod["put"]
export type DeleteEndpoints = EndpointByMethod["delete"]
export type PatchEndpoints = EndpointByMethod["patch"]
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
          "/api/instances/{instanceID}/torrents": "form-data",
"/api/instances/{instanceID}/backups/import": "form-data"
        }
    } as Partial<{ [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: RequestFormat }> }>;
    // </EndpointRequestFormats>
    

    // <EndpointResponseFormats>
    /** Non-json response body modes; missing entries default to `"json"`. SSE skips JSON parse + output validation. */
    export const endpointResponseFormats = {
    get: {
          "/api/logs/stream": "sse",
"/api/instances/{instanceID}/rss/events": "sse"
        }
    } as Partial<{ [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: ResponseFormat }> }>;
    // </EndpointResponseFormats>
    

    // <EndpointSecurityRequirements>
    /** OpenAPI security requirements applied when an endpoint has no explicit entry. */
    export const defaultSecurityRequirements = [["ApiKeyAuth"],["SessionAuth"]] as SecurityRequirements;
    /** Endpoint-specific security requirements that differ from the default. */
    export const endpointSecurityRequirements = {
    post: { "/api/auth/setup": [],
"/api/auth/login": [],
"/api/dir-scan/webhook/scan": [["ApiKeyAuth"],["SessionAuth"],["ApiKeyQuery"]],
"/api/cross-seed/season-pack/check": [["ApiKeyAuth"],["SessionAuth"],["ApiKeyQuery"]],
"/api/cross-seed/season-pack/apply": [["ApiKeyAuth"],["SessionAuth"],["ApiKeyQuery"]] },
get: { "/api/auth/check-setup": [],
"/proxy/{api-key}/api/v2/torrents/mediainfo": [],
"/health": [],
"/healthz/readiness": [],
"/healthz/liveness": [] }
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
patch<Path extends keyof PatchEndpoints, TEndpoint extends PatchEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<ApiCallParams<TEndpoint>>
  ): Effect.Effect<
    InferSuccessData<TEndpoint>,
    TypedStatusError | HttpClientError,
    never
  > {
    return this.request<"patch", Path, PatchEndpoints[Path]>("patch", path, ...params);
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

  