# Cross-Seed (qui) + Cleanuparr Unlinked Handling

This stack uses **qui** for cross-seeding (built into qui, no extra container) in
**hardlink mode**, and **Cleanuparr** to clean downloads that no longer have
hardlinks to the media library.

## Directory layout

Everything lives under a single `./data` volume so hardlinks work across
downloads, cross-seed, and media (they must be on the same filesystem).

Every relevant service mounts `./data:/data`, so all containers see identical
paths — a hard requirement for both hardlinking (qui) and hardlink detection
(Cleanuparr).

## Compose configuration

The following services now share the unified `./data:/data` mount:

| Service      | Mount            | Notes                                          |
| ------------ | ---------------- | ---------------------------------------------- |
| qbittorrent  | `./data:/data`   | Save path: `/data/downloads/torrents`          |
| qui          | `./data:/data`   | Needs disk access for hardlink mode            |
| cleanuparr   | `./data:/data`   | Reads files to count hardlinks                 |
| sonarr       | `./data:/data`   | Imports via hardlink into `/data/media`        |
| radarr       | `./data:/data`   | Imports via hardlink into `/data/media`        |

`qui` also runs with `PUID=1000`, `PGID=1000`, `UMASK=002` so the hardlinks it
creates match the ownership/permissions of the rest of the stack.

## qBittorrent settings

- Default save path → `/data/downloads/torrents`
- Category save paths (`tv-sonarr`, `radarr`, ...) → under `/data/downloads/torrents`
- Existing torrents: **Set location** to the new path, then recheck (files are
  already there, so they stay complete)
- Verify **Sonarr/Radarr → Settings → Download Clients** point at the new root

## qui settings (<http://localhost:7476>)

1. **Instance Settings** → enable **Local Filesystem Access** on the qBittorrent
   instance (required for hardlink mode).
2. **Settings → Indexers** → "1-click sync" to import indexers from Prowlarr
   (`http://prowlarr:9696`).
3. *(Optional)* **Settings → Integrations** → add Sonarr (`http://sonarr:8989`)
   and Radarr (`http://radarr:7878`) for better ID-based matching.
4. **Cross-Seed → Hardlink Mode** → expand the qBittorrent instance and:
   - Enable **Hardlink mode**
   - **Base directory** = `/data/downloads/cross-seed`
   - **Directory preset** = `by-tracker` (recommended)
5. **Cross-Seed → Auto** → enable "Auto-search on completion" and/or RSS.

> Hardlink-added torrents use an explicit save path, which forces **AutoTMM off**
> for those torrents. This is expected — do not re-enable AutoTMM on them or the
> files may be moved out of the link tree.

## Cleanuparr settings

**Download Cleaner → Unlinked Download Settings**:

- **Enable Unlinked Download Handling** → on
- **Unlinked Categories** → your qBit categories (e.g. `tv-sonarr`, `radarr`)
- **Ignored Root Directory** → `/data/downloads`
- **Target Category** → a category with a matching seeding rule (so unlinked
  downloads eventually get removed)

Setting the ignored root to `/data/downloads` means Cleanuparr ignores hardlinks
inside both `torrents` and `cross-seed`, counting only links in `/data/media`.
This way a download is correctly flagged as unlinked once Sonarr/Radarr drop it,
even while cross-seed hardlinks still exist.

## Why hardlink mode + this layout

- Hardlinks share disk blocks: cross-seeding the same content across trackers
  costs no extra disk space.
- All paths under one `/data` volume keep downloads, cross-seed, and media on the
  same filesystem, which hardlinks require.
- Grouping `torrents` + `cross-seed` under `/data/downloads` lets Cleanuparr use a
  single ignored root and avoids false "still linked" results caused by
  cross-seed hardlinks.
