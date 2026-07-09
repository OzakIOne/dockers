# Ozarr

Self-hosted media stack — Sonarr, Radarr, Prowlarr, Jellyfin, qBittorrent, and more — in a single Docker Compose file, following Servarr Wiki and TRaSH Guides best practices.

## Services

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| **Jellyfin** | `lscr.io/linuxserver/jellyfin` | 8096 | Media server — streams TV, movies, music, books |
| **qBittorrent** | `lscr.io/linuxserver/qbittorrent` | 8888 | Torrent client — downloads media, seeds back |
| **qui** | `ghcr.io/autobrr/qui` | 7476 | Modern qBittorrent WebUI + cross-seed manager (hardlink mode) |
| **Sonarr** | `lscr.io/linuxserver/sonarr` | 8989 | TV series automation — finds, downloads, organizes shows |
| **Radarr** | `lscr.io/linuxserver/radarr` | 7878 | Movie automation — finds, downloads, organizes movies |
| **Prowlarr** | `lscr.io/linuxserver/prowlarr` | 9696 | Indexer manager — connects to trackers, syncs to Sonarr/Radarr |
| **Seerr** | `ghcr.io/seerr-team/seerr` | 5055 | Media requests — users request movies/shows, forwards to Sonarr/Radarr |
| **FlareSolverr** | `ghcr.io/flaresolverr/flaresolverr` | 8191 | Cloudflare bypass — proxy for trackers behind Cloudflare |
| **Homarr** | `ghcr.io/homarr-labs/homarr` | 7575 | Dashboard — overview of all services with widgets |
| **Wizarr** | `ghcr.io/wizarrrr/wizarr` | 5690 | User invitations & onboarding for Jellyfin |
| **Profilarr** | `ghcr.io/dictionarry-hub/profilarr` | 6868 | Quality profile & custom format manager for Sonarr/Radarr |
| **Maintainerr** | `ghcr.io/maintainerr/maintainerr` | 6246 | Rule-based media collections & library cleanup |
| **Cleanuparr** | `ghcr.io/cleanuparr/cleanuparr` | 11011 | Cleans stalled/unlinked downloads, manages seeding & orphans |

## Folder structure

```
ozarr/
├── .env                          # PUID, PGID, TZ, UMASK, HOMARR_SECRET
├── docker-compose.yml            # All services in one compose
├── package.json                  # Bun + Effect dependencies
├── setup.ts                      # Automated setup script
├── makefile                      # up / down / setup / pull / log
├── config/                       # Per-service runtime configs (gitignored)
│   ├── jellyfin/                 #   Jellyfin database, cache, metadata
│   ├── qbittorrent/              #   qBittorrent.conf, categories.json
│   ├── qui/                      #   qui config, cross-seed settings
│   ├── sonarr/                   #   Sonarr database, config.xml
│   ├── radarr/                   #   Radarr database, config.xml
│   ├── prowlarr/                 #   Prowlarr database, config.xml
│   ├── seerr/                    #   Seerr database
│   ├── flaresolverr/             #   FlareSolverr config
│   ├── homarr/                   #   Homarr appdata
│   ├── wizarr/                   #   Wizarr database
│   ├── profilarr/                #   Profilarr config
│   ├── maintainerr/              #   Maintainerr data
│   └── cleanuparr/               #   Cleanuparr config
└── data/                         # Media and downloads (gitignored)
    ├── downloads/
    │   ├── torrents/             #   qBittorrent downloads (seeding)
    │   │   ├── tv/
    │   │   ├── movies/
    │   │   ├── music/
    │   │   └── books/
    │   └── cross-seed/           #   qui hardlink base dir (cross-seeds)
    └── media/
        ├── tv/                   #   Organized TV library
        ├── movies/               #   Organized movie library
        ├── music/                #   Organized music library
        └── books/                #   Organized book library
```

## Volume mounts (hardlink-safe)

Following the Servarr Wiki and TRaSH Guides:

| Container | Mount | Purpose |
|-----------|-------|---------|
| **Sonarr / Radarr** | `./data:/data` | Full tree — `downloads/` and `media/` are same filesystem → hardlinks + atomic moves work |
| **qBittorrent** | `./data:/data` | Unified mount — sees `downloads/torrents` + `downloads/cross-seed` on one filesystem (hardlinks) |
| **qui** | `./data:/data` | Cross-seed hardlink mode needs the same paths qBittorrent uses |
| **Cleanuparr** | `./data:/data` | Reads files on disk to detect unlinked downloads & orphans |
| **Jellyfin** | `./data/media:/data/media` | Only needs media library |
| Others | (none) | API-based, no data access needed |

See [`CROSS_SEED.md`](./CROSS_SEED.md) for the cross-seed (qui) + Cleanuparr unlinked-handling setup.

## Quick start

```bash
# Install dependencies
bun install

# Run setup (creates dirs, seeds config, starts containers, configures via API)
bun setup.ts
```

### Makefile

```bash
make setup    # Full setup (bun setup.ts)
make up       # Start all containers
make down     # Stop all containers
make pull     # Update images
make log      # Tail logs
```

## Setup automation (`setup.ts`)

Uses Effect for concurrency, retry, and error handling:

| Step | What it does |
|------|-------------|
| Create dirs | `data/downloads/{torrents/{tv,movies,music,books},cross-seed}`, `data/media/{tv,movies,music,books}` and `config/` per service |
| Permissions | `chmod -R a=,a+rX,u+w,g+w` (Servarr Wiki recommended) |
| qBittorrent config | Pre-seeds `qBittorrent.conf` (save path `/data/downloads/torrents`, vuetorrent, `chmod` on completion) and `categories.json` (sonarr → `downloads/torrents/tv`, radarr → `downloads/torrents/movies`) |
| Start containers | `docker compose up -d` |
| Wait | Retries with 2s backoff for up to 3 min, all 4 services concurrently |
| Sonarr API | Root folder `/data/media/tv`, hardlinks enabled, qBittorrent download client |
| Radarr API | Root folder `/data/media/movies`, hardlinks enabled, qBittorrent download client |
| Prowlarr API | FlareSolverr proxy, Sonarr + Radarr app connections with full sync |
| Homarr API | Creates apps for all services with icons and status pings (requires API key) |

## Manual steps (after `setup.ts`)

These require your personal credentials or choices:

1. **Homarr API key** — Open `http://localhost:7575`, complete onboarding, then Management → Tools → API → Authentication. Copy the key to `.env` as `HOMARR_API_KEY=<id>.<token>` and re-run `bun setup.ts` to auto-populate apps.
2. **Set passwords** — Sonarr, Radarr, Prowlarr, Bazarr: Settings → General → Authentication
3. **Add indexers** — Prowlarr: Settings → Indexers → Add (requires tracker API keys/tokens)
4. **Jellyfin libraries** — Add libraries pointing to `/data/media/tv` and `/data/media/movies`
5. **Seerr** — Connect to Sonarr, Radarr, and Jellyfin via Settings → Services
6. **qBittorrent** — Get temp password from `docker logs qbittorrent`, change in WebUI

### Recommended but optional

6. **Quality profiles** — Use [Recyclarr](https://github.com/recyclarr/recyclarr) to sync TRaSH-recommended quality profiles and custom formats to Sonarr/Radarr automatically
7. **Notifications** — Configure Discord/Email/etc. in each *arr service → Settings → Connect
8. **Deluge** — If you prefer Deluge over qBittorrent, a separate `deluge/` compose already exists in this repo

## What the API *could* automate but doesn't

These endpoints exist and could be added, but are opinionated or require secrets:

| Service | Endpoint | Why not automated |
|---------|----------|-------------------|
| Prowlarr | `POST /api/v1/indexer` | Requires per-tracker API keys |
| Sonarr/Radarr | `POST /api/v3/qualityprofile` | Use Recyclarr for TRaSH profiles |
| Sonarr/Radarr | `POST /api/v3/customformat` | Use Recyclarr instead |
| Sonarr/Radarr | `PUT /api/v3/config/host` | Auth setup should be manual |
| All | `POST /api/v3/notification` | User-specific webhooks/tokens |
| Homarr | `POST /api/apps` | **Automated** — requires HOMARR_API_KEY from onboarding |
| Sonarr | `POST /api/v3/series` | Content choice is personal |
| Radarr | `POST /api/v3/movie` | Content choice is personal |

## Networking

All services share the `traefik` external network. Containers resolve each other by name (e.g., `http://sonarr:8989`). For VPN setups, use `<container>.internal` per the Servarr Wiki recommendation.

## Permissions

- `PUID=1000`, `PGID=1000` — matches host user
- `UMASK=002` — files `664` (`rw-rw-r--`), dirs `775` (`rwxrwxr-x`)
- Single shared user approach (TRaSH: "simpler, less strict")
- Seerr (image: `ghcr.io/seerr-team/seerr`) is rootless by default, runs as `node:node` (1000:1000)

## TODO

- [x] migrate torrent client to https://github.com/autobrr/qui
- [x] maintainerr
- [x] cleanuparr
- [ ]  jellyfin plugin (faisable automatiquement via api http://localhost:8096/api-docs/swagger/index.html)
  - [ ] intro skipper
  - [ ] https://github.com/streamyfin/jellyfin-plugin-streamyfin
- [ ] notifiarr
- [ ] profilarr backup setup with playwright
- [ ] https://github.com/fredrikburmester/
- [ ] bun run setup.ts --backup (genere une backup de chaque service)
