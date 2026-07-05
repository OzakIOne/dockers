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

rcsync:
  cp ./recyclarrConfig/sonarr.yml ./config/sonarr/sonarr.yml
  cp ./recyclarrConfig/radarr.yml ./config/radarr/radarr.yml
	docker compose run --rm recyclarr sync

sqliteweb:
	uv venv --allow-existing
	uv pip install sqlite-web
	uv run sqlite_web ./config/sonarr/sonarr.db ./config/radarr/radarr.db
