up:
	docker compose up -d
down:
	docker compose down
pull:
	docker compose pull
log:
	docker compose logs -f
setup:
	bun setup.ts
backup:
	bun backup.ts

rcsync:
	cp ./recyclarrConfig/sonarr.yml ./config/recyclarr/configs/sonarr.yml
	cp ./recyclarrConfig/radarr.yml ./config/recyclarr/configs/radarr.yml
	sh ./scripts/rcinit.sh
	docker compose run --rm recyclarr sync

sqliteweb:
	uv venv --allow-existing
	uv pip install sqlite-web
	uv run sqlite_web ./config/sonarr/sonarr.db ./config/radarr/radarr.db ./config/wizarr/database/database.db ./config/jellyfin/data/data/jellyfin.db ./config/homarr/db/db.sqlite ./config/cleanuparr/cleanuparr.db ./config/maintainerr/maintainerr.sqlite
