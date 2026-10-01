// Shared plumbing for every engine command: config, paths, safe JSON I/O,
// never-reused IDs, lifecycle transitions with approval gates, run logs.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const UNKNOWN = "UNKNOWN";

export const nowIso = () => new Date().toISOString();

export function todayLocal(tz = "Africa/Douala") {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export function isUnknown(v) {
  if (v === undefined || v === null) return true;
  const s = String(v).trim();
  return s === "" || s === UNKNOWN || s === "—" || s === "-";
}

export const orUnknown = (v) => (isUnknown(v) ? UNKNOWN : String(v).trim());

export function resolvePath(p) {
  if (p.startsWith("~")) return path.join(os.homedir(), p.slice(1));
  return path.resolve(ROOT, p);
}

export function readJson(file, fallback) {
  if (!fs.existsSync(file)) {
    if (fallback !== undefined) return structuredClone(fallback);
    throw new Error(`Missing file: ${file}`);
  }
  return JSON.parse(fs.readFileSync(file, "utf8").replace(/^﻿/, ""));
}

const BACKUPS_KEPT = 30;

function backupFile(file) {
  const dir = path.join(ROOT, "data", "backups");
  fs.mkdirSync(dir, { recursive: true });
  const base = path.basename(file, ".json");
  const stamp = nowIso().replace(/[:.]/g, "-");
  fs.copyFileSync(file, path.join(dir, `${base}.${stamp}.json`));
  const mine = fs.readdirSync(dir).filter((f) => f.startsWith(`${base}.`)).sort();
  while (mine.length > BACKUPS_KEPT) fs.unlinkSync(path.join(dir, mine.shift()));
}

// Atomic write (tmp + rename) so a crash never leaves a half-written database.
export function writeJson(file, data, { backup = false } = {}) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (backup && fs.existsSync(file)) backupFile(file);
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  fs.renameSync(tmp, file);
}

export function writeText(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

export function hash(obj) {
  return crypto.createHash("sha1").update(JSON.stringify(obj)).digest("hex").slice(0, 16);
}

export function loadConfig() {
  return readJson(path.join(ROOT, "config", "autopilot.config.json"));
}

// ---------------------------------------------------------------- databases

const emptyDb = () => ({ meta: { schema_version: 1, created_at: nowIso(), updated_at: nowIso(), id_counters: {} }, items: [] });
const emptyBank = (key) => ({ meta: { schema_version: 1, created_at: nowIso(), updated_at: nowIso(), id_counters: {} }, [key]: [] });

export const loadDb = (cfg) => readJson(resolvePath(cfg.paths.content_db), emptyDb());
export const loadIdeaBank = (cfg) => readJson(resolvePath(cfg.paths.idea_bank), emptyBank("ideas"));
export const loadStoryBank = (cfg) => readJson(resolvePath(cfg.paths.story_bank), emptyBank("stories"));

function assertUnique(list, key) {
  const seen = new Set();
  for (const x of list) {
    if (seen.has(x[key])) throw new Error(`Duplicate ${key}: ${x[key]} — refusing to save.`);
    seen.add(x[key]);
  }
}

export function saveDb(cfg, db) {
  assertUnique(db.items, "content_id");
  db.meta.updated_at = nowIso();
  writeJson(resolvePath(cfg.paths.content_db), db, { backup: true });
}

export function saveIdeaBank(cfg, bank) {
  assertUnique(bank.ideas, "idea_id");
  bank.meta.updated_at = nowIso();
  writeJson(resolvePath(cfg.paths.idea_bank), bank, { backup: true });
}

export function saveStoryBank(cfg, bank) {
  assertUnique(bank.stories, "story_id");
  bank.meta.updated_at = nowIso();
  writeJson(resolvePath(cfg.paths.story_bank), bank, { backup: true });
}

// IDs come from a persisted high-water mark, so an archived or removed item's ID
// is never handed out again.
export function allocateId(container, prefix, pad, idKey) {
  const list = container.items ?? container.ideas ?? container.stories ?? [];
  let max = container.meta.id_counters[prefix] ?? 0;
  for (const x of list) {
    const id = x[idKey];
    if (id?.startsWith(prefix)) max = Math.max(max, parseInt(id.slice(prefix.length), 10));
  }
  container.meta.id_counters[prefix] = max + 1;
  return prefix + String(max + 1).padStart(pad, "0");
}

export function addHistory(item, action, detail = {}) {
  item.history ??= [];
  item.history.push({ at: nowIso(), action, ...detail });
  item.updated_at = nowIso();
}

export function addFlag(item, type, message) {
  item.flags ??= [];
  if (item.flags.some((f) => f.type === type && f.message === message && !f.resolved)) return;
  item.flags.push({ type, message, at: nowIso(), resolved: false });
}

// ---------------------------------------------------------------- lifecycle

export function transition(cfg, item, to, { reason = "", actor = "engine", force = false } = {}) {
  const from = item.status;
  if (!cfg.statuses.includes(to)) throw new Error(`Unknown status ${to}`);
  const allowed = cfg.status_transitions[from] ?? [];
  if (!force && !allowed.includes(to)) {
    throw new Error(`${item.content_id}: ${from} → ${to} is not an allowed transition (allowed: ${allowed.join(", ") || "none"}).`);
  }
  const gate = approvalGate(cfg, item, to);
  if (gate) throw new Error(`${item.content_id}: blocked — ${gate}`);
  item.status = to;
  if (to === "SCHEDULED" && !item.scheduled_at) item.scheduled_at = nowIso();
  if (to === "PUBLISHED") {
    item.published_at ??= nowIso();
    item.publication_status = "Published";
  }
  addHistory(item, "status", { from, to, reason, actor, forced: force || undefined });
}

// Returns a blocking reason, or null when the move is allowed. Force never bypasses these.
function approvalGate(cfg, item, to) {
  const mode = cfg.approval.mode;
  if (to === "APPROVED" && item.source?.type === "autopilot" && !item.approvals?.calendar) {
    return "autopilot ideas need a recorded calendar approval (engine/cli.mjs approve <id>).";
  }
  if (to === "SCHEDULED" && item.qa?.passed !== true) {
    return "QA has not passed (engine/cli.mjs qa <id>).";
  }
  if (to === "PUBLISHED") {
    if (item.qa?.passed !== true) return "QA has not passed.";
    if (!item.approvals?.publish) {
      if (mode !== "AUTONOMOUS_LOW_RISK") return `approval mode is ${mode}; record publish approval first (engine/cli.mjs approve-publish <id>).`;
      return "autonomous publishing requires the autonomy gate — run engine/cli.mjs autonomy-check.";
    }
  }
  return null;
}

// ---------------------------------------------------------------- run log

export function logRun(cfg, command, summary) {
  const file = path.join(resolvePath(cfg.paths.runs_dir), `${todayLocal(cfg.brand.timezone)}.jsonl`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, `${JSON.stringify({ at: nowIso(), command, ...summary })}\n`, "utf8");
}

export function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      if (v !== undefined) flags[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith("--")) flags[k] = argv[++i];
      else flags[k] = true;
    } else positional.push(a);
  }
  return { positional, flags };
}
