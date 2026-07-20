up:
	docker compose up -d
down:
	docker compose down
pull:
	docker compose pull
log:
	docker compose logs -f
setup:
	bun run setup.ts
backup:
	bun run backup.ts

sqliteweb:
	uv venv --allow-existing
	uv pip install sqlite-web
	uv run sqlite_web ./config/sonarr/sonarr.db ./config/radarr/radarr.db ./config/wizarr/database/database.db ./config/jellyfin/data/data/jellyfin.db ./config/homarr/db/db.sqlite ./config/cleanuparr/cleanuparr.db ./config/maintainerr/maintainerr.sqlite
