import { Effect, Console, Cause, pipe } from "effect";
import { apiGetJson, apiPostJson, apiPost, apiPut } from "./utils";

// ── Quality profile types ──

export type QualityItemDef =
  | { type: "quality"; name: string }
  | { type: "group"; name: string; qualities: string[] };

export type FormatItemDef = {
  trashId: string;
  score: number;
};

export type ProfileDef = {
  name: string;
  upgradeAllowed: boolean;
  cutoffQuality: string;
  items: QualityItemDef[];
  formatItems: FormatItemDef[];
};

// ── Sonarr Quality Profiles ──

export const SONARR_PROFILES: ProfileDef[] = [
  {
    name: "WEB-1080p",
    upgradeAllowed: true,
    cutoffQuality: "Bluray-1080p",
    items: [
      { type: "quality", name: "Bluray-1080p" },
      {
        type: "group",
        name: "WEB 1080p",
        qualities: ["WEBDL-1080p", "WEBRip-1080p"],
      },
      { type: "quality", name: "Bluray-720p" },
      {
        type: "group",
        name: "WEB 720p",
        qualities: ["WEBDL-720p", "WEBRip-720p"],
      },
      { type: "quality", name: "DVD" },
      { type: "quality", name: "SDTV" },
    ],
    formatItems: [
      { trashId: "47435ece6b99a0b477caf360e79ba0bb", score: -10000 },
      { trashId: "218e93e5702f44a68ad9e3c6ba87d2f0", score: 0 },
      { trashId: "43b3cf48cb385cd3eac608ee6bca7f09", score: 0 },
      { trashId: "15a05bc7c1a36e2b57fd628f8977e2fc", score: -10000 },
      { trashId: "32b367365729d530ca1c124a0b180c64", score: -10000 },
      { trashId: "85c61753df5da1fb2aab6f2a47426b09", score: -10000 },
      { trashId: "fbcb31d8dabd2a319072b84fc0b7249c", score: -10000 },
      { trashId: "9c11cd3f07101cdba90a2d81cf0e56b4", score: -10000 },
      { trashId: "e2315f990da2e2cbfc9fa5b7a6fcfe48", score: -10000 },
      { trashId: "23297a736ca77c0fc8e70f8edd7ee56c", score: -10000 },
    ],
  },
  {
    name: "[Anime] Remux-1080p",
    upgradeAllowed: true,
    cutoffQuality: "Bluray-1080p",
    items: [
      {
        type: "group",
        name: "Bluray-1080p",
        qualities: ["Bluray-1080p Remux", "Bluray-1080p"],
      },
      {
        type: "group",
        name: "WEB 1080p",
        qualities: ["WEBDL-1080p", "WEBRip-1080p"],
      },
    ],
    formatItems: [
      { trashId: "949c16fe0a8147f50ba82cc2df9411c9", score: 1400 },
      { trashId: "ed7f1e315e000aef424a58517fa48727", score: 1300 },
      { trashId: "096e406c92baa713da4a72d88030b815", score: 1200 },
      { trashId: "30feba9da3030c5ed1e0f7d610bcad4", score: 1100 },
      { trashId: "545a76b14ddc349b8b185a6344e28b04", score: 1000 },
      { trashId: "25d2afecab632b1582eaf03b63055f72", score: 900 },
      { trashId: "0329044e3d9137b08502a9f84a7e58db", score: 800 },
      { trashId: "c81bbfb47fed3d5a3ad027d077f889de", score: 700 },
      { trashId: "e0014372773c8f0e1bef8824f00c7dc4", score: 600 },
      { trashId: "19180499de5ef2b84b6ec59aae444696", score: 500 },
      { trashId: "c27f2ae6a4e82373b0f1da094e2489ad", score: 400 },
      { trashId: "4fd5528a3a8024e6b49f9c67053ea5f3", score: 300 },
      { trashId: "29c2a13d091144f63307e4a8ce963a39", score: 200 },
      { trashId: "dc262f88d74c651b12e9d90b39f6c753", score: 100 },
      { trashId: "9965a052eb87b0d10313b1cea89eb451", score: 975 },
      { trashId: "8a1d0c3d7497e741736761a1da866a2e", score: 950 },
      { trashId: "15a05bc7c1a36e2b57fd628f8977e2fc", score: -10000 },
      { trashId: "e3515e519f3b1360cbfc17651944354c", score: -10000 },
      { trashId: "b4a1b3d705159cdca36d71e57ca86871", score: -10000 },
      { trashId: "9c14d194486c4014d422adc64092d794", score: -10000 },
      { trashId: "d2d7b8a9d39413da5f44054080e028a3", score: -51 },
      { trashId: "273bd326df95955e1b6c26527d1df89b", score: 1 },
      { trashId: "228b8ee9aa0a609463efca874524a6b8", score: 2 },
      { trashId: "0e5833d3af2cc5fa96a0c29cd4477feb", score: 3 },
      { trashId: "4fc15eeb8f2f9a749f918217d4234ad8", score: 4 },
      { trashId: "b2550eb333d27b75833e25b8c2557b38", score: 0 },
      { trashId: "418f50b10f1907201b6cfdf881f467b7", score: 0 },
      { trashId: "026d5aadd1a6b4e550b134cb6c72b3ca", score: 0 },
      { trashId: "3e0b26604165f463f3e8e192261e7284", score: 6 },
      { trashId: "89358767a60cc28783cdc3d0be9388a4", score: 5 },
      { trashId: "d34870697c9db575f17700212167be23", score: 4 },
      { trashId: "d660701077794679fd59e8bdf4ce3a29", score: 3 },
      { trashId: "44a8ee6403071dd7b8a3a8dd3fe8cb20", score: 3 },
      { trashId: "1284d18e693de8efe0fe7d6b3e0b9170", score: 2 },
      { trashId: "570b03b3145a25011bf073274a407259", score: 0 },
    ],
  },
];

// ── Radarr Quality Profiles ──

export const RADARR_PROFILES: ProfileDef[] = [
  {
    name: "HD Bluray + WEB",
    upgradeAllowed: true,
    cutoffQuality: "Bluray-1080p",
    items: [
      { type: "quality", name: "Bluray-1080p" },
      {
        type: "group",
        name: "WEB 1080p",
        qualities: ["WEBDL-1080p", "WEBRip-1080p"],
      },
      { type: "quality", name: "Bluray-720p" },
      {
        type: "group",
        name: "WEB 720p",
        qualities: ["WEBDL-720p", "WEBRip-720p"],
      },
      { type: "quality", name: "DVD" },
    ],
    formatItems: [
      { trashId: "dc98083864ea246d05a42df0d05f81cc", score: -10000 },
    ],
  },
  {
    name: "UHD Bluray + WEB",
    upgradeAllowed: true,
    cutoffQuality: "Bluray-2160p",
    items: [
      { type: "quality", name: "Bluray-2160p" },
      {
        type: "group",
        name: "WEB 2160p",
        qualities: ["WEBDL-2160p", "WEBRip-2160p"],
      },
      { type: "quality", name: "Bluray-1080p" },
      {
        type: "group",
        name: "WEB 1080p",
        qualities: ["WEBDL-1080p", "WEBRip-1080p"],
      },
    ],
    formatItems: [
      { trashId: "839bea857ed2c0a8e084f3cbdbd65ecb", score: -10000 },
    ],
  },
  {
    name: "[Anime] Remux-1080p",
    upgradeAllowed: true,
    cutoffQuality: "Bluray-1080p",
    items: [
      {
        type: "group",
        name: "Bluray-1080p",
        qualities: ["Remux-1080p", "Bluray-1080p"],
      },
      {
        type: "group",
        name: "WEB 1080p",
        qualities: ["WEBDL-1080p", "WEBRip-1080p"],
      },
    ],
    formatItems: [
      { trashId: "fb3ccc5d5cc8f77c9055d4cb4561dded", score: 1400 },
      { trashId: "66926c8fa9312bc74ab71bf69aae4f4a", score: 1300 },
      { trashId: "fa857662bad28d5ff21a6e611869a0ff", score: 1200 },
      { trashId: "f262f1299d99b1a2263375e8fa2ddbb3", score: 1100 },
      { trashId: "ca864ed93c7b431150cc6748dc34875d", score: 1000 },
      { trashId: "9dce189b960fddf47891b7484ee886ca", score: 900 },
      { trashId: "1ef101b3a82646b40e0cab7fc92cd896", score: 800 },
      { trashId: "6115ccd6640b978234cc47f2c1f2cadc", score: 700 },
      { trashId: "8167cffba4febfb9a6988ef24f274e7e", score: 600 },
      { trashId: "8526c54e36b4962d340fce52ef030e76", score: 500 },
      { trashId: "de41e72708d2c856fa261094c85e965d", score: 400 },
      { trashId: "9edaeee9ea3bcd585da9b7c0ac3fc54f", score: 300 },
      { trashId: "22d953bbe897857b517928f3652b8dd3", score: 200 },
      { trashId: "a786fbc0eae05afe3bb51aee3c83a9d4", score: 100 },
      { trashId: "3a3ff47579026e76d6504ebea39390de", score: 975 },
      { trashId: "9f98181fe5a3fbeb0cc29340da2a468a", score: 950 },
      { trashId: "cae4ca30163749b891686f95532519bd", score: -10000 },
      { trashId: "b0fdc5897f68c9a68c70c25169f77447", score: -10000 },
      { trashId: "06b6542a47037d1e33b15aa3677c2365", score: -10000 },
      { trashId: "b23eae459cc960816f2d6ba84af45055", score: -10000 },
      { trashId: "c259005cbaeb5ab44c06eddb4751e70c", score: -51 },
      { trashId: "5f400539421b8fcf71d51e6384434573", score: 1 },
      { trashId: "3df5e6dfef4b09bb6002f732bed5b774", score: 2 },
      { trashId: "db92c27ba606996b146b57fbe6d09186", score: 3 },
      { trashId: "d4e5e842fad129a3c097bdb2d20d31a0", score: 4 },
      { trashId: "a5d148168c4506b55cf53984107c396e", score: 0 },
      { trashId: "4a3b087eea2ce012fcc1ce319259a3be", score: 0 },
      { trashId: "064af5f084a0a24458cc8ecd3220f93f", score: 0 },
      { trashId: "60f6d50cbd3cfc3e9a8c00e3a30c3114", score: 10 },
      { trashId: "ed38b889b31be83fda192888e2286d83", score: -10000 },
      { trashId: "90a6f9a284dff5103f6346090e6280c8", score: -10000 },
      { trashId: "e204b80c87be9497a8a6eaff48f72905", score: -10000 },
      { trashId: "dc98083864ea246d05a42df0d05f81cc", score: -10000 },
      { trashId: "0a3f082873eb454bde444150b70253cc", score: -10000 },
    ],
  },
];

// ── Quality Profile Setup ──

export const setupQualityProfiles = (
  arrType: "sonarr" | "radarr",
  baseUrl: string,
  apiKey: string,
  profiles: ProfileDef[],
  debug = false,
): Effect.Effect<void> =>
  Effect.gen(function* () {
    if (profiles.length === 0) return;

    yield* Console.log(
      `  Setting up ${profiles.length} quality profile(s) for ${arrType}...`,
    );

    // Local wrappers with debug baked in
    const get = <T>(url: string) => apiGetJson<T>(url, apiKey, debug);
    const post = <T>(url: string, body: unknown) =>
      apiPostJson<T>(url, apiKey, body, debug);
    const postRaw = (url: string, body: unknown) =>
      apiPost(url, apiKey, body, debug);
    const putRaw = (url: string, body: unknown) =>
      apiPut(url, apiKey, body, debug);

    const allTrashIds = [
      ...new Set(profiles.flatMap((p) => p.formatItems.map((fi) => fi.trashId))),
    ];

    // Get existing custom formats (name → id map)
    const cfNameToId = new Map<string, number>();
    yield* pipe(
      get<Array<{ id?: number; name?: string }>>(
        `${baseUrl}/api/v3/customformat`,
      ),
      Effect.map((data) => {
        if (Array.isArray(data)) {
          for (const cf of data) {
            if (cf.name && cf.id != null)
              cfNameToId.set(cf.name.toLowerCase(), cf.id);
          }
        }
      }),
      Effect.catchCause(() => Effect.void),
    );

    // Fetch & create missing custom formats
    const trashIdToCFId = new Map<string, number>();
    for (const trashId of allTrashIds) {
      let cfJson: { name?: string; id?: number } | null = null;
      yield* Effect.tryPromise(() =>
        fetch(
          `https://raw.githubusercontent.com/TRaSH-Guides/Guides/master/docs/json/${arrType}/cf/${trashId}.json`,
        ).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        }),
      )
        .pipe(
          Effect.map((json) => {
            cfJson = json as { name?: string; id?: number };
          }),
          Effect.catchCause(() => Effect.void),
        );

      if (!cfJson?.name) continue;

      const existingId = cfNameToId.get(cfJson.name.toLowerCase());
      if (existingId != null) {
        trashIdToCFId.set(trashId, existingId);
        continue;
      }

      const created: { id?: number; name?: string } | null =
        yield* post(
          `${baseUrl}/api/v3/customformat`,
          cfJson,
        ).pipe(Effect.catchCause(() => Effect.succeed(null)));

      if (created?.id != null) trashIdToCFId.set(trashId, created.id);
    }

    // Get quality definitions (name → id) and the full list
    const allQualities: Array<{ quality?: { id?: number; name?: string } }> = [];
    const qualityNameToId = new Map<string, number>();
    yield* pipe(
      get<
        Array<{ quality?: { id?: number; name?: string } }>
      >(`${baseUrl}/api/v3/qualitydefinition`),
      Effect.map((data) => {
        if (Array.isArray(data)) {
          for (const d of data) {
            allQualities.push(d);
            if (d.quality?.name && d.quality.id != null)
              qualityNameToId.set(d.quality.name, d.quality.id);
          }
        }
      }),
      Effect.catchCause(() => Effect.void),
    );

    // Get existing quality profiles
    const existingProfileIds = new Map<string, number>();
    yield* pipe(
      get<
        Array<{ id?: number; name?: string }>
      >(`${baseUrl}/api/v3/qualityprofile`),
      Effect.map((data) => {
        if (Array.isArray(data)) {
          for (const p of data) {
            if (p.name && p.id != null) existingProfileIds.set(p.name, p.id);
          }
        }
      }),
      Effect.catchCause(() => Effect.void),
    );

    // Build maps of all quality IDs and custom format IDs
    const allQualityIds = new Set(allQualities.map((q) => q.quality?.id).filter((id) => id != null) as number[]);
    const allFormatIds = new Set<number>();
    for (const [trashId, cfId] of trashIdToCFId) {
      allFormatIds.add(cfId);
    }
    // Also fetch existing custom formats to get ALL format IDs (Radarr requires all)
    yield* pipe(
      get<Array<{ id?: number; name?: string }>>(
        `${baseUrl}/api/v3/customformat`,
      ),
      Effect.map((data) => {
        if (Array.isArray(data)) {
          for (const cf of data) {
            if (cf.id != null) allFormatIds.add(cf.id);
          }
        }
      }),
      Effect.catchCause(() => Effect.void),
    );

    // Create/update each profile
    for (const profile of profiles) {
      const cutoffId = qualityNameToId.get(profile.cutoffQuality);
      if (cutoffId == null) {
        yield* Console.log(
          `    Skipping "${profile.name}": cutoff quality "${profile.cutoffQuality}" not found`,
        );
        continue;
      }

      // Track which quality IDs are used in groups (to exclude from flat list)
      const groupedQualityIds = new Set<number>();
      const groupItems: any[] = [];
      let groupIdCounter = 1000;

      for (const item of profile.items) {
        if (item.type === "group") {
          const children: any[] = [];
          for (const qname of item.qualities) {
            const qid = qualityNameToId.get(qname);
            if (qid == null) {
              yield* Console.log(`    Warning: quality "${qname}" not found`);
              continue;
            }
            groupedQualityIds.add(qid);
            children.push({
              id: 0,
              quality: { id: qid, name: qname },
              items: [],
              allowed: true,
            });
          }
          if (children.length > 0) {
            groupItems.push({
              id: groupIdCounter++,
              name: item.name,
              items: children,
              allowed: true,
            });
          }
        }
      }

      // Build full items array: grouped items + flat items for all qualities not in groups
      const items: any[] = [...groupItems];
      const flatAllowedIds = new Map<number, string>(); // id → name for qualities enabled as flat items
      for (const item of profile.items) {
        if (item.type === "quality") {
          const qid = qualityNameToId.get(item.name);
          if (qid != null && !groupedQualityIds.has(qid)) {
            flatAllowedIds.set(qid, item.name);
          }
        }
      }

      // Add all remaining quality definitions (not in groups, with allowed flag)
      for (const qd of allQualities) {
        const qid = qd.quality?.id;
        if (qid == null || groupedQualityIds.has(qid)) continue;
        items.push({
          id: 0,
          quality: { id: qid, name: qd.quality?.name || "" },
          items: [],
          allowed: flatAllowedIds.has(qid),
        });
      }

      // Determine cutoff: if the cutoff quality is inside a group, use the group's id
      let actualCutoff = cutoffId;
      if (groupedQualityIds.has(cutoffId)) {
        for (const gi of groupItems) {
          for (const child of gi.items) {
            if (child.quality?.id === cutoffId) {
              actualCutoff = gi.id;
              break;
            }
          }
        }
      }

      // Build format items: all formats with score 0, override those in profile
      const profileFormatScores = new Map<number, number>();
      for (const fi of profile.formatItems) {
        const cfId = trashIdToCFId.get(fi.trashId);
        if (cfId != null) profileFormatScores.set(cfId, fi.score);
      }

      const formatItems: Array<{ format: number; score: number }> = [];
      for (const fid of allFormatIds) {
        formatItems.push({
          format: fid,
          score: profileFormatScores.get(fid) ?? 0,
        });
      }

      const body = {
        name: profile.name,
        upgradeAllowed: profile.upgradeAllowed,
        cutoff: actualCutoff,
        minUpgradeFormatScore: 1,
        cutoffFormatScore: 0,
        language: arrType === "sonarr"
          ? { id: 1, name: "English" }
          : { id: -2, name: "Original" },
        items,
        formatItems,
      };

    const existingId = existingProfileIds.get(profile.name);
    if (existingId != null) {
      // For updates, include the profile id
      (body as any).id = existingId;
      yield* putRaw(
        `${baseUrl}/api/v3/qualityprofile/${existingId}`,
        body,
      );
      yield* Console.log(`    Updated profile: ${profile.name}`);
    } else {
      yield* postRaw(`${baseUrl}/api/v3/qualityprofile`, body);
      yield* Console.log(`    Created profile: ${profile.name}`);
    }
    }

    yield* Console.log(`  ${arrType} quality profiles done.`);
  }).pipe(
    Effect.catchCause((cause) => {
      const msg = Cause.pretty(cause);
      console.error(
        `  Quality profile setup failed (${arrType}): ${msg.slice(0, 300)}`,
      );
      return Effect.void;
    }),
  );
