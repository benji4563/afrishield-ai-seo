// STORY BANK — real, evidenced experiences only. The storytelling agent writes
// candidate entries; this command refuses anything without a checkable source.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { loadStoryBank, saveStoryBank, loadDb, allocateId, resolvePath, writeText, readJson, writeJson, logRun, nowIso, todayLocal } from "../lib/core.mjs";

const REQUIRED = ["date", "source", "evidence", "what_happened", "people_involved", "problem", "discovery", "result", "lesson", "proof_available", "permission_status", "sensitivity", "possible_topics", "possible_content_formats"];
const PERMISSIONS = ["OWN_WORK", "GRANTED", "PUBLIC_RECORD", "PENDING", "NOT_GRANTED", "ANONYMIZE_ONLY"];
const SENSITIVITY = ["LOW", "MEDIUM", "HIGH"];

function evidenceStatus(evidence) {
  const list = [].concat(evidence);
  const checks = list.map((e) => {
    if (/^https?:\/\//.test(e)) return { evidence: e, exists: "url" };
    const p = e.startsWith("~") ? path.join(os.homedir(), e.slice(1)) : path.resolve(resolvePath("."), e);
    return { evidence: e, exists: fs.existsSync(p) };
  });
  const verified = checks.every((c) => c.exists === true || c.exists === "url");
  return { checks, verification_status: verified ? "VERIFIED_FROM_SOURCE" : "NEEDS_VERIFICATION" };
}

export function add(cfg, { positional }) {
  const file = positional[0];
  if (!file) throw new Error("Usage: story:add <stories.json>  (object or array)");
  const input = [].concat(JSON.parse(fs.readFileSync(path.resolve(file), "utf8")));
  const bank = loadStoryBank(cfg);
  for (const s of input) {
    const missing = REQUIRED.filter((k) => s[k] === undefined || s[k] === "" || (Array.isArray(s[k]) && !s[k].length));
    if (missing.length) throw new Error(`Story "${String(s.what_happened).slice(0, 60)}" missing: ${missing.join(", ")}`);
    if (!PERMISSIONS.includes(s.permission_status)) throw new Error(`permission_status must be one of ${PERMISSIONS.join(", ")}`);
    if (!SENSITIVITY.includes(s.sensitivity)) throw new Error(`sensitivity must be one of ${SENSITIVITY.join(", ")}`);
    if (bank.stories.some((x) => x.what_happened === s.what_happened)) {
      console.log(`skip duplicate: ${s.what_happened.slice(0, 60)}`);
      continue;
    }
    const ev = evidenceStatus(s.evidence);
    const story = { story_id: allocateId(bank, cfg.id.story_prefix, cfg.id.pad, "story_id"), ...s, ...ev, uses: [], added_at: nowIso() };
    bank.stories.push(story);
    console.log(`${story.story_id} ${story.verification_status}: ${story.what_happened.slice(0, 80)}`);
  }
  saveStoryBank(cfg, bank);
  logRun(cfg, "story:add", { file, count: input.length });
}

export function list(cfg, { flags }) {
  const { stories } = loadStoryBank(cfg);
  // ANONYMIZE_ONLY stories are usable as long as no business or person is identifiable.
  const usable = (s) => s.verification_status === "VERIFIED_FROM_SOURCE" && s.proof_available !== false && ["OWN_WORK", "GRANTED", "PUBLIC_RECORD", "ANONYMIZE_ONLY"].includes(s.permission_status);
  for (const s of stories.filter((x) => !flags.usable || usable(x))) {
    const note = s.permission_status === "ANONYMIZE_ONLY" ? " (anonymize)" : "";
    console.log(`${s.story_id}  ${s.date}  ${usable(s) ? "USABLE " : "BLOCKED"}  ${s.permission_status.padEnd(14)} uses=${s.uses.length}  ${s.what_happened.slice(0, 90)}${note}`);
  }
}

// Records which angle a story was used from, so it is never retold identically.
export function use(cfg, { positional, flags }) {
  const [storyId, contentId] = positional;
  if (!storyId || !contentId || !flags.angle) throw new Error('Usage: story:use <story_id> <content_id> --angle "..."');
  const bank = loadStoryBank(cfg);
  const s = bank.stories.find((x) => x.story_id === storyId);
  if (!s) throw new Error(`No story ${storyId}`);
  const db = loadDb(cfg);
  if (!db.items.some((i) => i.content_id === contentId)) throw new Error(`No content ${contentId}`);
  const same = s.uses.find((u) => u.angle.trim().toLowerCase() === String(flags.angle).trim().toLowerCase());
  if (same) throw new Error(`${storyId} was already told from this angle in ${same.content_id}. Choose a different angle.`);
  s.uses.push({ content_id: contentId, angle: flags.angle, at: nowIso() });
  saveStoryBank(cfg, bank);
  console.log(`${storyId} → ${contentId} (angle: ${flags.angle}); ${s.uses.length} use(s).`);
}

// FIND STORY OPPORTUNITIES (deterministic half): list recently changed work files
// that may hold a real build-in-public moment. The storytelling agent reads them.
const DEFAULT_SOURCES = [
  "..",
  "../../TikTok-Lead-Gen-WestAfrica",
  "../../GBP-Lead-Gen-Conversion-Strategy",
  "../../../ai-seo/marketing-site/app/blog",
  "../../../GEO Citation plan",
  "production",
];
const TEXT_EXT = /\.(md|txt|csv|json|docx|html)$/i;

export function scan(cfg, { flags }) {
  const statePath = path.join(resolvePath("data/learning"), "story-scan-state.json");
  const state = readJson(statePath, { last_scan: null });
  const since = flags.since ? new Date(flags.since) : state.last_scan ? new Date(state.last_scan) : new Date(Date.now() - 21 * 864e5);
  const sources = cfg.story_sources ?? DEFAULT_SOURCES;
  const found = [];
  const walk = (dir, depth) => {
    if (depth > 4 || !fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (/^(node_modules|\.git|out|public|whisper\.cpp|backups|\.next|content creation auto pilot startegy)$/.test(e.name)) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, depth + 1);
      else if (TEXT_EXT.test(e.name)) {
        const st = fs.statSync(p);
        if (st.mtime >= since) found.push({ path: path.relative(resolvePath("."), p), modified: st.mtime.toISOString().slice(0, 16), kb: Math.round(st.size / 1024) });
      }
    }
  };
  for (const s of sources) walk(resolvePath(s), 0);
  found.sort((a, b) => b.modified.localeCompare(a.modified));
  const today = todayLocal(cfg.brand.timezone);
  const md = [
    `# Story scan — ${today}`,
    "",
    `Work files changed since ${since.toISOString().slice(0, 10)} across ${sources.length} source folders. Each is a *possible* build-in-public moment. The storytelling agent must open the file, confirm what actually happened, and only then write a story-bank entry with the file as evidence.`,
    "",
    "| Modified | KB | File |",
    "|---|---|---|",
    ...found.slice(0, 150).map((f) => `| ${f.modified} | ${f.kb} | ${f.path} |`),
  ].join("\n");
  const out = path.join(resolvePath(cfg.paths.reports_dir), `story-scan-${today}.md`);
  writeText(out, md);
  if (!flags["no-advance"]) writeJson(statePath, { last_scan: nowIso() });
  console.log(`${found.length} candidate files → ${out}`);
}
