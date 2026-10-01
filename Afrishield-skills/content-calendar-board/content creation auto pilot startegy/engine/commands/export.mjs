// EXPORT — the living database back out as the familiar 33-column calendar CSV
// (+ living-DB columns). The original month CSVs are never modified.
import path from "node:path";
import { loadDb, resolvePath, writeText, writeJson, logRun, todayLocal } from "../lib/core.mjs";
import { objectsToCsv } from "../lib/csv.mjs";
import { CALENDAR_COLUMNS, toCalendarRow } from "../lib/mapping.mjs";

const EXTRA = ["content_id", "db_status", "lane", "idea_score", "score_band", "review_flag", "open_flags", "story_id", "humor_level", "source"];

export function run(cfg, { flags }) {
  const db = loadDb(cfg);
  const includeArchived = Boolean(flags["include-archived"]);
  const items = db.items
    .filter((i) => i.source.type !== "published-history" && (includeArchived || i.status !== "ARCHIVED"))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.lane).localeCompare(String(b.lane)));
  const dir = resolvePath(cfg.paths.exports_dir);
  const csvPath = path.join(dir, "living-calendar.csv");
  writeText(csvPath, objectsToCsv(items.map(toCalendarRow), [...CALENDAR_COLUMNS, ...EXTRA]));

  const overlay = {
    generated_at: new Date().toISOString(),
    today: todayLocal(cfg.brand.timezone),
    items: db.items.map((i) => ({
      content_id: i.content_id, row_key: i.source.row_key, date: i.date, lane: i.lane, status: i.status, idea_score: i.idea_score,
      score_band: i.score_band, proposed_slot: i.proposed_slot ?? null, review_flag: i.review_flag,
      open_flags: [...new Set((i.flags ?? []).filter((f) => !f.resolved).map((f) => f.type))], title: i.title, hook: i.hook,
    })),
  };
  writeJson(path.join(dir, "board-overlay.json"), overlay);
  writeText(path.join(dir, "board-overlay.js"), `// Content Autopilot overlay for the content-calendar board. Generated — do not edit.\nwindow.AFRISHIELD_AUTOPILOT = ${JSON.stringify(overlay)};\n`);
  logRun(cfg, "export", { rows: items.length });
  console.log(`Exported ${items.length} rows → ${csvPath}`);
}
