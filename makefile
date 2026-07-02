init:
	docker network create traefik

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

filebrowserup:
	docker compose -f ./filebrowser/docker-compose.yml up -d

filebrowserdown:
	docker compose -f ./filebrowser/docker-compose.yml down

ddclientup:
	docker compose -f ./ddclient/docker-compose.yml up -d

ddclientdown:
	docker compose -f ./ddclient/docker-compose.yml down

dockhandup:
	docker compose -f ./dockhand/docker-compose.yml up -d

dockhanddown:
	docker compose -f ./dockhand/docker-compose.yml down

dockhandlog:
	docker logs -f dockhand

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

linkwardenup:
	docker compose -f ./linkwarden/docker-compose.yml up -d

linkwardendown:
	docker compose -f ./linkwarden/docker-compose.yml down

linkwardenpull:
	cd ./linkwarden && git pull && cd ..

ozarrup:
	docker compose -f ./ozarr/docker-compose.yml up -d

ozarrdown:
	docker compose -f ./ozarr/docker-compose.yml down

allup: traefikup homerup jellyfinup qbittorrentup filebrowserup embyup ddclientup whoamiup nginxup caddyup

alldown: traefikdown homerdown jellyfindown qbittorrentdown filebrowserdown embydown ddclientdown whoamidown nginxdown caddydown

debug:
	docker run -it --network traefik alpine sh

autheliaup:
	docker compose -f ./authelia/docker-compose.yml up -d

autheliadown:
	docker compose -f ./authelia/docker-compose.yml down

authelialog:
	docker logs -f authelia
