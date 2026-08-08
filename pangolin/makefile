# --- CrowdSec: IPs bannies plusieurs fois sur des jours différents ---
# Paramètres réglables (avec défauts):
#   make crowdsec-offenders ORIGIN=all MIN_DAYS=3 MIN_BANS=5 LIMIT=20
ORIGIN ?= crowdsec
MIN_DAYS ?= 2
MIN_BANS ?= 1
LIMIT ?= 50

install:
	curl -fsSL https://static.pangolin.net/get-installer.sh | bash
up:
	docker-compose up -d
down:
	docker-compose down

# Récapitulatif des récidivistes (nb bans, jours distincts, période, scénarios)
crowdsec-offenders:
	python3 scripts/crowdsec_repeat_offenders.py --origin $(ORIGIN) --min-days $(MIN_DAYS) --min-bans $(MIN_BANS) --limit $(LIMIT)

# Récapitulatif + détail chronologique des décisions par IP
crowdsec-offenders-detail:
	python3 scripts/crowdsec_repeat_offenders.py --origin $(ORIGIN) --min-days $(MIN_DAYS) --min-bans $(MIN_BANS) --limit $(LIMIT) --detail

# Récapitulatif + commandes cscli de ban 1 an pour chaque IP
crowdsec-offenders-commands:
	python3 scripts/crowdsec_repeat_offenders.py --origin $(ORIGIN) --min-days $(MIN_DAYS) --min-bans $(MIN_BANS) --limit $(LIMIT) --commands
