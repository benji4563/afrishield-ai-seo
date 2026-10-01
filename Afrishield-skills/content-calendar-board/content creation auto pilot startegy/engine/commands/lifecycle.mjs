// LIFECYCLE — status moves, approvals, review flags, QA/factuality gate, autonomy gate.
import fs from "node:fs";
import path from "node:path";
import { loadDb, saveDb, loadStoryBank, transition, addHistory, addFlag, resolvePath, isUnknown, logRun, nowIso, todayLocal } from "../lib/core.mjs";

const QA_CHECKS = [
  "FACTS", "SPELLING", "CAPTIONS", "VISUAL_TIMING", "AUDIO", "VIDEO_QUALITY", "BRANDING", "CTA", "PLATFORM_FORMAT", "SAFE_ZONES",
  "LINKS", "THUMBNAIL", "TITLE", "DESCRIPTION", "HASHTAGS", "DISCLOSURES", "STORY_AUTHENTICITY",
];
const CLAIM_CATEGORIES = ["FACT", "OPINION", "ANALYSIS", "HYPOTHETICAL", "HUMOR", "PERSONAL_EXPERIENCE"];

const find = (db, id) => {
  const item = db.items.find((i) => i.content_id === id);
  if (!item) throw new Error(`No content item ${id}`);
  return item;
};

export function status(cfg, { positional, flags }) {
  const [id, to] = positional;
  if (!id || !to) throw new Error("Usage: status <content_id> <STATUS> [--reason ...]");
  const db = loadDb(cfg);
  const item = find(db, id);
  transition(cfg, item, to.toUpperCase(), { reason: flags.reason ?? "", actor: flags.by ?? "agent" });
  saveDb(cfg, db);
  logRun(cfg, "status", { id, to });
  console.log(`${id} → ${item.status}`);
}

// Records the user's calendar approval. Agents run this ONLY after the user said yes in chat.
export function approve(cfg, { positional, flags }) {
  if (!positional.length) throw new Error('Usage: approve <content_id...> --by "<name>" [--date YYYY-MM-DD]');
  if (!flags.by) throw new Error("--by is required: approvals must name the human who approved.");
  const db = loadDb(cfg);
  for (const id of positional) {
    const item = find(db, id);
    const date = flags.date ?? item.proposed_slot?.date;
    if (isUnknown(date)) throw new Error(`${id}: no date — pass --date YYYY-MM-DD`);
    item.approvals = { ...item.approvals, calendar: { by: flags.by, at: nowIso(), mode: cfg.approval.calendar_insertion } };
    item.date = date;
    const primary = db.items.find((i) => i.lane === "primary" && i.date === date);
    if (primary) Object.assign(item, { day_label: primary.day_label, week: primary.week, month_theme: primary.month_theme });
    item.production_status = "Not Started";
    transition(cfg, item, "APPROVED", { reason: "calendar approval", actor: flags.by });
    console.log(`${id} approved for ${date}`);
  }
  saveDb(cfg, db);
  logRun(cfg, "approve", { ids: positional, by: flags.by });
}

export function reject(cfg, { positional, flags }) {
  const [id] = positional;
  if (!id || !flags.reason) throw new Error("Usage: reject <content_id> --reason ...");
  const db = loadDb(cfg);
  const item = find(db, id);
  transition(cfg, item, "ARCHIVED", { reason: `rejected: ${flags.reason}`, actor: flags.by ?? "user" });
  saveDb(cfg, db);
  console.log(`${id} archived (kept for the record, never deleted).`);
}

export function review(cfg, { positional, flags }) {
  const [id] = positional;
  if (!id || !flags.reason) throw new Error("Usage: review <content_id> --reason ...");
  const db = loadDb(cfg);
  const item = find(db, id);
  item.review_flag = flags.reason;
  addHistory(item, "review_flag", { reason: flags.reason });
  saveDb(cfg, db);
  console.log(`${id} flagged for REVIEW.`);
}

export function resolveFlag(cfg, { positional, flags }) {
  const [id, type] = positional;
  if (!id || !type || !flags.note) throw new Error("Usage: resolve-flag <content_id> <FLAG_TYPE> --note ...");
  const db = loadDb(cfg);
  const item = find(db, id);
  const open = (item.flags ?? []).filter((f) => f.type === type && !f.resolved);
  if (!open.length) throw new Error(`${id} has no open ${type} flag`);
  for (const f of open) Object.assign(f, { resolved: true, resolved_at: nowIso(), note: flags.note });
  addHistory(item, "flag_resolved", { type, note: flags.note });
  saveDb(cfg, db);
  console.log(`${id}: resolved ${open.length} ${type} flag(s).`);
}

// QA + factuality gate. Reads production/<id>/qa.json written by the quality-control agent.
export function qa(cfg, { positional, flags }) {
  const [id] = positional;
  if (!id) throw new Error("Usage: qa <content_id> [--file path]");
  const db = loadDb(cfg);
  const item = find(db, id);
  const file = flags.file ? path.resolve(flags.file) : path.join(resolvePath(cfg.paths.production_dir), id, "qa.json");
  if (!fs.existsSync(file)) throw new Error(`QA file not found: ${file}`);
  const report = JSON.parse(fs.readFileSync(file, "utf8"));
  const { stories } = loadStoryBank(cfg);
  const failures = [];

  for (const c of QA_CHECKS) {
    const r = report.checks?.[c];
    if (!r) failures.push(`${c}: not checked`);
    else if (!["PASS", "FAIL", "NA"].includes(r.result)) failures.push(`${c}: result must be PASS | FAIL | NA`);
    else if (r.result === "FAIL") failures.push(`${c}: ${r.note ?? "failed"}`);
    else if (r.result === "NA" && ["FACTS", "SPELLING", "CTA", "BRANDING", "STORY_AUTHENTICITY", "DISCLOSURES"].includes(c)) failures.push(`${c}: cannot be NA`);
  }

  const claims = report.claims ?? [];
  if (!claims.length) failures.push("claims[]: empty — every on-screen, VO and copy claim must be classified (write an OPINION claim for pure opinion pieces).");
  for (const cl of claims) {
    const label = `claim "${String(cl.text).slice(0, 80)}"`;
    if (!CLAIM_CATEGORIES.includes(cl.category)) {
      failures.push(`${label}: category ${cl.category ?? "missing"} → FLAG FOR REVIEW`);
      continue;
    }
    if (cl.category === "FACT" && isUnknown(cl.evidence)) failures.push(`${label}: FACT without evidence`);
    if (cl.category === "PERSONAL_EXPERIENCE") {
      const s = stories.find((x) => x.story_id === cl.story_id);
      const recorded = cl.evidence && /recording|screen|footage|timestamp/i.test(cl.evidence);
      if (!s && !recorded) failures.push(`${label}: PERSONAL_EXPERIENCE needs a story_id in the story bank or on-camera evidence`);
      if (s && s.permission_status && !/^(OWN_WORK|GRANTED|PUBLIC_RECORD|ANONYMIZE_ONLY)$/.test(s.permission_status)) failures.push(`${label}: story ${s.story_id} permission is ${s.permission_status}`);
      if (s?.permission_status === "ANONYMIZE_ONLY" && cl.anonymized !== true) failures.push(`${label}: story ${s.story_id} is ANONYMIZE_ONLY — set "anonymized": true after removing identifying details`);
    }
    if (cl.category === "HYPOTHETICAL" && cl.labeled_on_screen !== true) failures.push(`${label}: HYPOTHETICAL must be labeled as hypothetical in the content`);
    if (cl.category === "HUMOR" && /testimonial|result|proof/i.test(cl.used_as ?? "")) failures.push(`${label}: HUMOR used as ${cl.used_as}`);
    if (cl.category === "HYPOTHETICAL" && /fact|proof|result/i.test(cl.used_as ?? "")) failures.push(`${label}: HYPOTHETICAL used as ${cl.used_as}`);
  }

  for (const [platform, copy] of Object.entries(report.platform_copy ?? {})) {
    const tags = (String(copy.hashtags ?? copy.caption ?? "").match(/#\w+/g) ?? []).length;
    if (tags > cfg.quality.max_hashtags) failures.push(`${platform}: ${tags} hashtags (max ${cfg.quality.max_hashtags})`);
    if (platform === "tiktok" && Number(copy.runtime_s) && Number(copy.runtime_s) < cfg.quality.tiktok_min_runtime_s) failures.push(`tiktok: runtime ${copy.runtime_s}s under ${cfg.quality.tiktok_min_runtime_s}s`);
  }

  const openBlocking = (item.flags ?? []).filter((f) => !f.resolved && ["STORY_EVIDENCE_NEEDED", "FABRICATION_RISK", "UNLABELED_HYPOTHETICAL", "UNKNOWN_STORY_ID"].includes(f.type));
  for (const f of openBlocking) failures.push(`open flag ${f.type}: ${f.message}`);

  const passed = failures.length === 0;
  item.claims = claims;
  item.qa = { passed, at: nowIso(), file: path.relative(resolvePath("."), file), failures };
  addHistory(item, "qa", { passed, failures: failures.length });
  if (!passed) addFlag(item, "QA_FAILED", `${failures.length} QA failure(s) — see item.qa.failures`);
  saveDb(cfg, db);
  logRun(cfg, "qa", { id, passed, failures: failures.length });
  console.log(passed ? `${id}: QA PASSED` : `${id}: QA FAILED\n- ${failures.join("\n- ")}`);
  return item.qa;
}

export function approvePublish(cfg, { positional, flags }) {
  const [id] = positional;
  if (!id || !flags.by) throw new Error('Usage: approve-publish <content_id> --by "<name>"');
  const db = loadDb(cfg);
  const item = find(db, id);
  if (item.qa?.passed !== true) throw new Error(`${id}: QA has not passed — cannot approve for publishing.`);
  item.approvals = { ...item.approvals, publish: { by: flags.by, at: nowIso(), mode: cfg.approval.mode } };
  addHistory(item, "publish_approved", { by: flags.by });
  saveDb(cfg, db);
  console.log(`${id}: publish approval recorded (${flags.by}).`);
}

export function autonomyCheck(cfg) {
  const db = loadDb(cfg);
  const gate = cfg.approval.autonomy_gate;
  const cleanPublished = db.items.filter((i) => ["PUBLISHED", "ANALYZED"].includes(i.status) && i.qa?.passed).length;
  const cutoff = new Date(Date.now() - 30 * 864e5).toISOString();
  const recentFactFlags = db.items.flatMap((i) => i.flags ?? []).filter((f) => f.at >= cutoff && /FABRICATION|STORY_EVIDENCE|UNLABELED|UNSOURCED/.test(f.type) && !f.resolved).length;
  const ok = cleanPublished >= gate.min_published_with_clean_qa && recentFactFlags <= gate.max_factuality_flags_last_30;
  console.log(JSON.stringify({ eligible_for_autonomous_low_risk: ok, clean_published: cleanPublished, required: gate.min_published_with_clean_qa, open_factuality_flags_last_30d: recentFactFlags, allowed: gate.max_factuality_flags_last_30, current_mode: cfg.approval.mode }, null, 2));
  return ok;
}

export function show(cfg, { positional }) {
  const db = loadDb(cfg);
  console.log(JSON.stringify(find(db, positional[0]), null, 2));
}

export function list(cfg, { flags }) {
  const db = loadDb(cfg);
  const today = todayLocal(cfg.brand.timezone);
  let items = db.items;
  if (flags.status) items = items.filter((i) => i.status === String(flags.status).toUpperCase());
  if (flags.from) items = items.filter((i) => i.date >= flags.from);
  if (flags.to) items = items.filter((i) => i.date <= flags.to);
  if (flags.next) {
    const end = new Date(`${today}T12:00:00Z`);
    end.setUTCDate(end.getUTCDate() + Number(flags.next));
    items = items.filter((i) => i.date >= today && i.date <= end.toISOString().slice(0, 10));
  }
  if (flags.flag) items = items.filter((i) => (i.flags ?? []).some((f) => f.type === flags.flag && !f.resolved));
  if (flags.lane) items = items.filter((i) => i.lane === flags.lane);
  items = [...items].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  for (const i of items) {
    const open = (i.flags ?? []).filter((f) => !f.resolved).map((f) => f.type);
    console.log(`${i.content_id}  ${String(i.date).padEnd(10)}  ${i.status.padEnd(9)}  ${(i.lane ?? "").padEnd(9)}  ${String(i.pillar).slice(0, 22).padEnd(22)}  ${String(i.hook).slice(0, 70)}${open.length ? `  [${[...new Set(open)].join(",")}]` : ""}`);
  }
  console.log(`\n${items.length} item(s)`);
}
