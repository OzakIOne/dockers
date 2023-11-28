traefikup:
	docker compose -f ./traefik/docker-compose.yml up -d

traefikdown:
	docker compose -f ./traefik/docker-compose.yml down

traefiklog:
	docker logs -f traefik

homerup:
	docker compose -f ./homer/docker-compose.yml up -d

homerdown:
	docker compose -f ./homer/docker-compose.yml down

jellyfinup:
	docker compose -f ./jellyfin/docker-compose.yml up -d

jellyfindown:
	docker compose -f ./jellyfin/docker-compose.yml down

qbittorrentup:
	docker compose -f ./qbittorrent/docker-compose.yml up -d

qbittorrentdown:
	docker compose -f ./qbittorrent/docker-compose.yml down

filebrowserup:
	docker compose -f ./filebrowser/docker-compose.yml up -d

filebrowserdown:
	docker compose -f ./filebrowser/docker-compose.yml down

embyup:
	docker compose -f ./emby/docker-compose.yml up -d

embydown:
	docker compose -f ./emby/docker-compose.yml down

ddclientup:
	docker compose -f ./ddclient/docker-compose.yml up -d

ddclientdown:
	docker compose -f ./ddclient/docker-compose.yml down

whoamiup:
	docker compose -f ./whoami/docker-compose.yml up -d

whoamidown:
	docker compose -f ./whoami/docker-compose.yml down

nginxup:
	docker compose -f ./nginxproxymanager/docker-compose.yml up -d

nginxdown:
	docker compose -f ./nginxproxymanager/docker-compose.yml down

caddyup:
	docker compose -f ./caddy/docker-compose.yml up -d

caddydown:
	docker compose -f ./caddy/docker-compose.yml down

allup: traefikup homerup jellyfinup qbittorrentup filebrowserup embyup ddclientup whoamiup nginxup caddyup

alldown: traefikdown homerdown jellyfindown qbittorrentdown filebrowserdown embydown ddclientdown whoamidown nginxdown caddydown

debug:
	docker run -it --network traefik alpine sh
