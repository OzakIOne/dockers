# Ozarr

Self-hosted media stack — Sonarr, Radarr, Prowlarr, Jellyfin, qBittorrent, and more — in a single Docker Compose file, following Servarr Wiki and TRaSH Guides best practices.

## Services

| Service | Port | Description |
| --------- | ------ | ------------- |
| **Jellyfin** | 8096 | Media server — streams TV, movies, music, books |
| **qBittorrent** | 6767 | Torrent client — downloads media, seeds back |
| **qui** | 7476 | Modern qBittorrent WebUI + cross-seed manager (hardlink mode) |
| **Sonarr** | 8989 | TV series automation — finds, downloads, organizes shows |
| **Radarr** | 7878 | Movie automation — finds, downloads, organizes movies |
| **Prowlarr** | 9696 | Indexer manager — connects to trackers, syncs to Sonarr/Radarr |
| **Seerr** | 5055 | Media requests — users request movies/shows, forwards to Sonarr/Radarr |
| **FlareSolverr** | 8191 | Cloudflare bypass — proxy for trackers behind Cloudflare |
| **Homarr** | 7575 | Dashboard — overview of all services with widgets |
| **Wizarr** | 5690 | User invitations & onboarding for Jellyfin |
| **Profilarr** | 6868 | Quality profile & custom format manager for Sonarr/Radarr |
| **Maintainerr** | 6246 | Rule-based media collections & library cleanup |
| **Cleanuparr** | 11011 | Cleans stalled/unlinked downloads, manages seeding & orphans |

## Folder structure

```txt
ozarr/
├── .env
├── docker-compose.yml
├── package.json
├── setup.ts
├── makefile
├── config/                       # Per-service runtime configs (gitignored)
└── data/                         # Media and downloads (gitignored)
    ├── downloads/
    │   ├── torrents/             # qBittorrent downloads (seeding)
    │   │   ├── tv/
    │   │   ├── movies/
    │   │   ├── music/
    │   │   └── books/
    │   └── cross-seed/           # qui hardlink base dir (cross-seeds)
    └── media/
        ├── tv/
        ├── movies/
        ├── music/
        └── books/
```

## Volume mounts (hardlink-safe)

Following the Servarr Wiki and TRaSH Guides:

| Container | Mount | Purpose |
| --- | --- | --- |
| **Sonarr / Radarr** | `./data:/data` | Full tree — `downloads/` and `media/` are same filesystem → hardlinks + atomic moves work |
| **qBittorrent** | `./data:/data` | Unified mount — sees `downloads/torrents` + `downloads/cross-seed` on one filesystem (hardlinks) |
| **qui** | `./data:/data` | Cross-seed hardlink mode needs the same paths qBittorrent uses |
| **Cleanuparr** | `./data:/data` | Reads files on disk to detect unlinked downloads & orphans |
| **Jellyfin** | `./data/media:/data/media` | Only needs media library |
| Others | (none) | API-based, no data access needed |

See [`CROSS_SEED.md`](./CROSS_SEED.md) for the cross-seed (qui) + Cleanuparr unlinked-handling setup.

## Quick start

```bash
bun install
docker compose pull
bun setup.ts --folder
docker compose up -d
bun setup.ts --api
# Copy the API keys into setup.env, then:
bun setup.ts
```

## Setup workflow

| Step | Command | What it does |
| ------ | ---------- | ------------- |
| 1. Pull images | `docker compose pull` | Downloads container images |
| 2. Create dirs | `bun setup.ts --folder` | `data/downloads/`, `data/media/`, `config/` per service + permissions |
| 3. Start containers | `docker compose up -d` | Starts all services (containers must run before API config) |
| 4. Extract API keys | `bun setup.ts --api` | Finds keys in `config/{prowlarr,radarr,sonarr}/config.xml` and `config/seerr/settings.json` |
| 5. Fill setup.env | Edit `setup.env` | Copy extracted API keys + set `QBITTORRENT_PASSWORD`, `QUI_USERNAME`, `QUI_PASSWORD`, `WIZARR_API_KEY`, etc. |
| 6. Run setup | `bun setup.ts` | Configures qBittorrent, Sonarr, Radarr, Prowlarr, Homarr, Seerr, Jellyfin, Maintainerr, qui via API |

## Setup automation (`setup.ts`)

| Step | What it does |
| ------ | ------------- |
| Create dirs | `data/downloads/{torrents/{tv,movies,music,books},cross-seed}`, `data/media/{tv,movies,music,books}` and `config/` per service |
| Permissions | `chmod -R a=,a+rX,u+w,g+w` (Servarr Wiki recommended) |
| qBittorrent config | Pre-seeds `qBittorrent.conf` (save path `/data/downloads/torrents`, vuetorrent, `chmod` on completion) and `categories.json` (sonarr → `downloads/torrents/tv`, radarr → `downloads/torrents/movies`) |
| Start containers | `docker compose up -d` |
| Sonarr API | Root folder `/data/media/tv`, hardlinks enabled, qBittorrent download client |
| Radarr API | Root folder `/data/media/movies`, hardlinks enabled, qBittorrent download client |
| Prowlarr API | FlareSolverr proxy, Sonarr + Radarr app connections with full sync |
| Homarr API | Creates apps for all services with icons and status pings (requires API key) |

## Manual steps

These require your personal credentials or choices:

1. **qBittorrent password** — Get temp password from `docker logs qbittorrent`, change in WebUI, then add `QBITTORRENT_PASSWORD=<password>` to `setup.env`
2. **qui password** — Set `QUI_USERNAME` and `QUI_PASSWORD` in `setup.env`
3. **Wizarr API key** — Generate via Wizarr WebUI, add `WIZARR_API_KEY=<key>` to `setup.env`
4. **Homarr API key** — Open `http://localhost:7575`, complete onboarding, then Management → Tools → API → Authentication. Add `HOMARR_API_KEY=<id>.<token>` to `setup.env`
5. **Set passwords** — Sonarr, Radarr, Prowlarr: Settings → General → Authentication
6. **Add indexers** — Prowlarr: Settings → Indexers → Add (requires tracker API keys/tokens)
7. **Jellyfin libraries** — Add libraries pointing to `/data/media/tv` and `/data/media/movies`
8. **Seerr** — Connect to Sonarr, Radarr, and Jellyfin via Settings → Services (automated if keys are in `setup.env`)
9. **Maintainerr** — Rules group setup
10. **Cleanuparr** — Manual setup (no API support, easy setups via SQLite writes)
11. **Jellyfin** — Setup reverse proxy IP for tracearr

## What the API *could* automate but doesn't

These endpoints exist and could be added, but are opinionated or require secrets:

| Service | Endpoint | Why not automated |
| --------- | ---------- | ------------------- |
| All | `POST /api/v3/notification` | User-specific webhooks/tokens |

## Networking

All services share the `traefik` external network. Containers resolve each other by name (e.g., `http://sonarr:8989`). For VPN setups, use `<container>.internal` per the Servarr Wiki recommendation.

## TODO

- [ ] notifiarr
- [ ] jellyfin plugin (faisable automatiquement via api <http://localhost:8096/api-docs/swagger/index.html>?)
  - [ ] intro skipper
  - [ ] <https://github.com/streamyfin/jellyfin-plugin-streamyfin>
- [ ] qui api setup <http://localhost:7476/api/openapi.json>
  - [ ] orphan scan?
    - [ ] cross seed setup
- [x] profilar parser healthcheck not working
