#!/usr/bin/env python3
"""
Analyse les bans récurrents dans la base CrowdSec (crowdsec.db).

Trouve les IPs qui se sont fait bannir plusieurs fois sur des jours
distincts (récidivistes) et affiche :
  - un récapitulatif par IP (nb bans, nb jours distincts, période, scénarios)
  - optionnellement le détail chronologique de chaque décision
  - optionnellement les commandes cscli pour les bannir 1 an

La base est ouverte en lecture seule : le script peut tourner pendant
que le conteneur CrowdSec est en marche.

Usage:
  crowdsec_repeat_offenders.py [options]

Options:
  --db PATH        Chemin vers crowdsec.db
                   (défaut: ../config/crowdsec/db/crowdsec.db relatif au script)
  --min-days N     Nombre minimum de jours distincts (défaut: 2)
  --min-bans N     Nombre minimum de bans au total (défaut: 1)
  --origin X       Filtrer par origine: crowdsec, CAPI, cscli ou all (défaut: all)
  --detail         Affiche le détail chronologique des décisions par IP
  --commands       Génère les commandes cscli de ban 1 an pour les IPs listées
  --limit N        Limite le nombre d'IPs affichées dans le récap (défaut: 50)
  --no-color       Désactive les couleurs dans la sortie

Exemples:
  # Récidives locales uniquement (scénarios CrowdSec locaux)
  python3 crowdsec_repeat_offenders.py --origin crowdsec

  # Récidives + commandes de ban 1 an
  python3 crowdsec_repeat_offenders.py --origin crowdsec --commands

  # Avec un seuil plus bas (≥ 3 bans au total, ≥ 2 jours)
  python3 crowdsec_repeat_offenders.py --min-bans 3 --min-days 2
"""

import argparse
import os
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path

BAN_DURATION = "365d"  # durée proposée pour les commandes cscli


def parse_args() -> argparse.Namespace:
    default_db = str(Path(__file__).resolve().parent.parent / "config" / "crowdsec" / "db" / "crowdsec.db")
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--db", default=default_db, help="chemin vers crowdsec.db")
    parser.add_argument("--min-days", type=int, default=2, help="jours distincts minimum (défaut: 2)")
    parser.add_argument("--min-bans", type=int, default=1, help="bans totaux minimum (défaut: 1)")
    parser.add_argument("--origin", default="all",
                        choices=["all", "crowdsec", "CAPI", "cscli"],
                        help="filtrer par origine des décisions (défaut: all)")
    parser.add_argument("--detail", action="store_true", help="afficher le détail chronologique par IP")
    parser.add_argument("--commands", action="store_true",
                        help="générer les commandes cscli de ban 1 an pour les IPs listées")
    parser.add_argument("--limit", type=int, default=50, help="nb max d'IPs dans le récap (défaut: 50)")
    parser.add_argument("--no-color", action="store_true", help="désactiver les couleurs")
    args = parser.parse_args()

    if args.min_days < 1:
        parser.error("--min-days doit être >= 1")
    if args.min_bans < 1:
        parser.error("--min-bans doit être >= 1")
    if not os.path.isfile(args.db):
        parser.error(f"base introuvable: {args.db}")
    return args


class Colors:
    """Petite aide à la coloration de la sortie terminal."""

    def __init__(self, enabled: bool):
        self.on = enabled

    def _wrap(self, code: str, text: str) -> str:
        return f"\033[{code}m{text}\033[0m" if self.on else text

    def bold(self, t): return self._wrap("1", t)
    def red(self, t): return self._wrap("31", t)
    def green(self, t): return self._wrap("32", t)
    def yellow(self, t): return self._wrap("33", t)
    def cyan(self, t): return self._wrap("36", t)
    def dim(self, t): return self._wrap("2", t)


def open_db(path: str) -> sqlite3.Connection:
    """Ouvre la base en lecture seule (sans verrou, compatible conteneur actif)."""
    try:
        con = sqlite3.connect(f"file:{path}?mode=ro", uri=True)
        con.execute("PRAGMA query_only = ON")
        return con
    except sqlite3.Error as e:
        print(f"erreur: impossible d'ouvrir la base en lecture seule ({e})", file=sys.stderr)
        sys.exit(1)


def day_only(ts: str) -> str:
    """'2026-08-07 23:41:41+00:00' -> '2026-08-07'."""
    return ts[:10]


def fetch_summary(con: sqlite3.Connection, origin: str, min_days: int, min_bans: int):
    where = ["type = 'ban'"]
    if origin != "all":
        where.append(f"origin = '{origin}'")
    where_sql = " AND ".join(where)
    return con.execute(
        f"""
        SELECT value,
               COUNT(*)                              AS nb_bans,
               COUNT(DISTINCT substr(created_at,1,10)) AS nb_jours,
               MIN(substr(created_at,1,10))          AS premier,
               MAX(substr(created_at,1,10))          AS dernier,
               GROUP_CONCAT(DISTINCT scenario)       AS scenarii
        FROM decisions
        WHERE {where_sql}
        GROUP BY value
        HAVING nb_bans >= ? AND nb_jours >= ?
        ORDER BY nb_jours DESC, nb_bans DESC, value
        """,
        (min_bans, min_days),
    ).fetchall()


def fetch_decisions(con: sqlite3.Connection, ip: str):
    return con.execute(
        """
        SELECT created_at, until, scenario, origin, simulated
        FROM decisions
        WHERE value = ?
        ORDER BY created_at
        """,
        (ip,),
    ).fetchall()


def print_summary(rows, args, c: Colors):
    if not rows:
        print(c.yellow("Aucune IP ne remplit les critères."))
        return

    nb_cols = max(len(r[5].split(",")) if r[5] else 1 for r in rows)
    print(c.bold(f"{len(rows)} IP(s) bannie(s) au moins {args.min_days} jour(s) distinct(s)"
                 f" et {args.min_bans} ban(s) au total"
                 + (f" (origine: {args.origin})" if args.origin != "all" else "")))
    print()
    header = f"{'IP':<18} {'bans':>5} {'jours':>6}  {'premier ban':<11} {'dernier ban':<11} scénarios"
    print(c.cyan(header))
    print(c.cyan("-" * len(header)))

    for ip, nb_bans, nb_jours, premier, dernier, scenarii in rows[: args.limit]:
        scen = (scenarii if len(scenarii) <= 80 else scenarii[:77] + "...")
        print(f"{ip:<18} {nb_bans:>5} {nb_jours:>6}  {premier:<11} {dernier:<11} {scen}")

    if len(rows) > args.limit:
        print(c.dim(f"... et {len(rows) - args.limit} IP(s) de plus (utilisez --limit pour en voir plus)"))


def print_detail(rows, con, c: Colors):
    now = datetime.now(timezone.utc)

    def parse(ts: str) -> datetime:
        return datetime.fromisoformat(ts)

    print()
    for ip, *_ in rows:
        decisions = fetch_decisions(con, ip)
        print(c.bold(f"=== {ip} ({len(decisions)} décisions) ==="))
        for created, until, scenario, origin, simulated in decisions:
            try:
                actif = parse(until) > now
            except ValueError:
                actif = until[:19] > now.strftime("%Y-%m-%d %H:%M:%S")
            flag = c.green("ACTIF ") if actif else c.dim("expiré")
            sim = " [simulé]" if simulated else ""
            print(f"  {created[:16]} -> {until[:16]}  {flag} {scenario} [{origin}]{sim}")
        print()


def print_commands(rows, c: Colors):
    if not rows:
        return
    print()
    print(c.bold(f"Commandes pour bannir 1 an ({BAN_DURATION}) ces {len(rows)} IP(s):"))
    for ip, nb_bans, nb_jours, *_ in rows:
        print(
            f"  docker exec crowdsec cscli decisions add --ip {ip} "
            f"--duration {BAN_DURATION} --reason \"repeat offender: {nb_bans} bans on {nb_jours} days\""
        )
    print(c.dim("(vérifiez le nom du conteneur avec: docker ps --filter name=crowdsec)"))


def main():
    args = parse_args()
    c = Colors(not args.no_color and sys.stdout.isatty())
    con = open_db(args.db)

    rows = fetch_summary(con, args.origin, args.min_days, args.min_bans)
    print_summary(rows, args, c)
    if args.detail:
        print_detail(rows, con, c)
    if args.commands:
        print_commands(rows, c)
    con.close()


if __name__ == "__main__":
    main()
