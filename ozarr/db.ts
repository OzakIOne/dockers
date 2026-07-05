import { Database } from "bun:sqlite";

const DB_PATHS: Record<string, string> = {
  jellyfin: "config/jellyfin/data/data/jellyfin.db",
  sonarr: "config/sonarr/sonarr.db",
  radarr: "config/radarr/radarr.db",
  seerr: "config/seerr/db/db.sqlite3",
};

const service = Bun.argv[2]?.toLowerCase();
const query = Bun.argv.slice(3).join(" ") || "";

if (!service || !DB_PATHS[service]) {
  console.error("Usage: bun db.ts <jellyfin|sonarr|radarr|seerr> [SQL query]");
  console.error("  (no query → list tables)");
  process.exit(1);
}

const db = new Database(DB_PATHS[service], { readonly: true });

if (!query) {
  const rows = db
    .query("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    .all() as { name: string }[];
  console.log(`Tables in ${service}.db:`);
  for (const r of rows) console.log(`  ${r.name}`);
} else {
  const stmt = db.query(query);
  const rows = stmt.all() as Record<string, unknown>[];
  console.table(rows);
}
