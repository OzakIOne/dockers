#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

RADARR_KEY=$(grep '^RADARR_API_KEY=' .env | cut -d'=' -f2)
SONARR_KEY=$(grep '^SONARR_API_KEY=' .env | cut -d'=' -f2)

sed -i \
  "s|api_key: .*|api_key: $RADARR_KEY|" config/recyclarr/configs/radarr.yml

sed -i \
  "s|api_key: .*|api_key: $SONARR_KEY|" config/recyclarr/configs/sonarr.yml
