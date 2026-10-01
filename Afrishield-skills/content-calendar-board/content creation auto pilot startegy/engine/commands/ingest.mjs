// INGEST — normalize the existing calendar(s) into the living database.
// Idempotent: re-running never duplicates, never deletes, never overwrites enrichment.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { loadDb, saveDb, resolvePath, allocateId, addHistory, addFlag, hash, logRun } from "../lib/core.mjs";
import { csvToObjects } from "../lib/csv.mjs";
import { mapCalendarRow, mapFreestylePost, ENRICHABLE } from "../lib/mapping.mjs";

const PROTECTED = new Set([
  ...ENRICHABLE, "content_id", "source", "created_at", "updated_at", "status", "history", "flags", "approvals", "qa", "publication_data",
  "performance", "links", "scheduled_at", "published_at", "idea_score", "score_breakdown", "score_band", "review_flag", "lane",
]);

const globToRegex = (g) => new RegExp(`^${g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);

export function run(cfg, { flags }) {
  const db = loadDb(cfg);
  const byKey = new Map(db.items.map((i) => [i.source.row_key, i]));
  const seen = new Set();
  const stats = { added: 0, unchanged: 0, updated: 0, source_status_changes: 0, missing_from_source: 0, files: [] };

  const upsert = (mapped, original) => {
    const key = mapped.source.row_key;
    seen.add(key);
    const h = hash(original);
    const existing = byKey.get(key);
    if (!existing) {
      mapped.content_id = allocateId(db, cfg.id.prefix, cfg.id.pad, "content_id");
      mapped.source.hash = h;
      mapped.source.original = original;
      addHistory(mapped, "ingested", { source: key });
      db.items.push(mapped);
      byKey.set(key, mapped);
      stats.added++;
      return;
    }
    if (existing.source.hash === h) {
      stats.unchanged++;
      return;
    }
    const changed = [];
    for (const [k, v] of Object.entries(mapped)) {
      if (PROTECTED.has(k)) continue;
      if (JSON.stringify(existing[k]) !== JSON.stringify(v)) {
        changed.push(k);
        existing[k] = v;
      }
    }
    const oldStatus = existing.source.original?.Status;
    if (original.Status !== undefined && oldStatus !== original.Status) {
      stats.source_status_changes++;
      addFlag(existing, "SOURCE_STATUS_CHANGED", `Calendar status changed "${oldStatus}" → "${original.Status}". Confirm and move the lifecycle with engine/cli.mjs status.`);
    }
    existing.source.hash = h;
    existing.source.original = original;
    addHistory(existing, "source_changed", { fields: changed });
    stats.updated++;
  };

  const dir = resolvePath(cfg.paths.calendar_csv_dir);
  const rx = globToRegex(cfg.paths.calendar_csv_glob);
  const files = fs.readdirSync(dir).filter((f) => rx.test(f)).sort((a, b) => (parseInt(a.match(/\d+/)) || 0) - (parseInt(b.match(/\d+/)) || 0));
  if (!files.length) throw new Error(`No calendar files matching ${cfg.paths.calendar_csv_glob} in ${dir}`);
  for (const file of files) {
    const rows = csvToObjects(fs.readFileSync(path.join(dir, file), "utf8"));
    stats.files.push({ file, rows: rows.length });
    for (const row of rows) upsert(mapCalendarRow(row, file, cfg), row);
  }

  const freestyle = resolvePath(cfg.paths.freestyle_js);
  if (fs.existsSync(freestyle)) {
    const sandbox = { window: {} };
    vm.runInNewContext(fs.readFileSync(freestyle, "utf8"), sandbox, { timeout: 2000 });
    const posts = sandbox.window.AFRISHIELD_FREESTYLE?.posts ?? [];
    stats.files.push({ file: path.basename(freestyle), rows: posts.length });
    for (const post of posts) upsert(mapFreestylePost(post, path.basename(freestyle)), post);
  }

  // Rows that vanished from a source are flagged for review — never deleted.
  for (const item of db.items) {
    if (!["calendar-csv", "freestyle"].includes(item.source.type) || seen.has(item.source.row_key)) continue;
    if (!item.review_flag) {
      item.review_flag = "Source row no longer present in the calendar files.";
      addHistory(item, "review_flag", { reason: item.review_flag });
      stats.missing_from_source++;
    }
  }

  if (flags["dry-run"]) {
    console.log("[dry-run] no changes written");
  } else {
    saveDb(cfg, db);
    logRun(cfg, "ingest", stats);
  }
  console.log(JSON.stringify({ ...stats, total_items: db.items.length }, null, 2));
  return stats;
}
