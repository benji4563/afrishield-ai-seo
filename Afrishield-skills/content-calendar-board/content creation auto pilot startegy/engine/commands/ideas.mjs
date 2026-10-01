// IDEAS — the deterministic gate every generated idea passes before it can touch the
// calendar: schema check → score math + band → duplicate check → factuality pre-screen.
// Then `ideas:propose` turns STRONG/PRIORITY ideas into proposed calendar items
// (status SCORED) that only the user can approve.
import fs from "node:fs";
import path from "node:path";
import {
  loadDb, saveDb, loadIdeaBank, saveIdeaBank, loadStoryBank, allocateId, addHistory, addFlag, resolvePath, todayLocal, isUnknown,
  logRun, nowIso, UNKNOWN, writeText,
} from "../lib/core.mjs";
import { buildIdf, compareToCorpus } from "../lib/similarity.mjs";
import { screenClaims, isLabeledHypothetical } from "../lib/classify.mjs";

const REQUIRED = ["title", "core_idea", "hook", "pillar", "format", "audience", "objective", "insight", "lesson", "cta", "score_breakdown", "gap_refs"];

// Master-prompt formats → the calendar's weekday content types (00-MASTER-BRIEF §4).
export const FORMAT_TO_CALENDAR_TYPE = {
  story: "Story", "case study": "Case Study", proof: "Case Study", tutorial: "DIY Tutorial", "screen demonstration": "DIY Tutorial",
  experiment: "Demo & Experiment", comparison: "Demo & Experiment", opinion: "Myth & Hot Take", myth: "Myth & Hot Take",
  "news reaction": "Myth & Hot Take", humor: "Myth & Hot Take", "behind-the-scenes": "Founder Story", failure: "Founder Story",
  lesson: "Founder Story", "Q&A": "FAQ & Reflection",
};
const TYPE_WEEKDAY = { Story: 1, "DIY Tutorial": 2, "Myth & Hot Take": 3, "Case Study": 4, "Demo & Experiment": 5, "Founder Story": 6, "FAQ & Reflection": 0 };
const PILLAR_MONTHS = {
  "AI Search / AI SEO": [1, 2], GEO: [2, 1, 3], "AI Agents / Voice Agents": [4, 5], "Virtual Executive Assistant": [5, 4],
  "DIY Tutorials": [2, 1, 3], "Industry Stories / Case Studies": [3, 6], "AfriShield AI / Founder / Brand": [6, 1],
};

export function band(cfg, total) {
  return cfg.scoring.bands.find((b) => total >= b.min).label;
}

function validateScore(cfg, breakdown) {
  const errors = [];
  if (!breakdown || typeof breakdown !== "object") return { errors: ["score_breakdown missing"], total: null };
  let total = 0;
  for (const d of cfg.scoring.dimensions) {
    const v = breakdown[d];
    if (!Number.isInteger(v) || v < 0 || v > 10) errors.push(`${d} must be an integer 0–10 (got ${JSON.stringify(v)})`);
    else total += v;
  }
  const extra = Object.keys(breakdown).filter((k) => !cfg.scoring.dimensions.includes(k) && k !== "rationale");
  if (extra.length) errors.push(`unknown score dimensions: ${extra.join(", ")}`);
  return { errors, total };
}

function factualityPrescreen(idea, stories) {
  const flags = [];
  const storyOk = idea.real_story?.story_id && stories.some((s) => s.story_id === idea.real_story.story_id);
  if (idea.real_story?.story_id && !storyOk) flags.push({ type: "UNKNOWN_STORY_ID", blocking: true, message: `story_id ${idea.real_story.story_id} is not in the story bank.` });
  const text = [idea.hook, idea.context, idea.proof].filter((x) => !isUnknown(x)).join(" ");
  const hypothetical = idea.real_story?.kind === "HYPOTHETICAL_LABELED" && isLabeledHypothetical(text);
  const claims = screenClaims(text);
  const events = claims.filter((c) => c.type !== "STATISTIC");
  const onCamera = idea.real_story?.kind === "EXPERIMENT" && /on camera|screen[- ]record|live/i.test(idea.visual_concept ?? "");
  if (events.length && !storyOk && !hypothetical && !onCamera) {
    flags.push({ type: "FABRICATION_RISK", blocking: true, message: `Asserts a real event with no evidence: "${events[0].sentence.slice(0, 140)}"` });
  }
  if (idea.real_story?.kind === "HYPOTHETICAL_LABELED" && !isLabeledHypothetical(text)) {
    flags.push({ type: "UNLABELED_HYPOTHETICAL", blocking: true, message: "Marked hypothetical but the copy does not say so (use 'Imagine…', 'Say a lodge…')." });
  }
  if (claims.some((c) => c.type === "STATISTIC") && isUnknown(idea.proof)) {
    flags.push({ type: "UNSOURCED_STATISTIC", blocking: false, message: "Contains a number with no proof/source field." });
  }
  if ((idea.score_breakdown?.proof_availability ?? 0) >= 7 && isUnknown(idea.proof) && !storyOk) {
    flags.push({ type: "SCORE_INCONSISTENT", blocking: false, message: "proof_availability scored ≥7 but no proof or story is attached." });
  }
  return flags;
}

export function check(cfg, { positional, flags }) {
  const file = positional[0];
  if (!file) throw new Error("Usage: ideas:check <ideas.json> [--dry-run]");
  const candidates = JSON.parse(fs.readFileSync(path.resolve(file), "utf8").replace(/^﻿/, ""));
  if (!Array.isArray(candidates)) throw new Error("ideas file must be a JSON array");
  const db = loadDb(cfg);
  const bank = loadIdeaBank(cfg);
  const { stories } = loadStoryBank(cfg);
  // An idea whose title is already in the bank (and not yet on the calendar) is a
  // RE-CHECK / RE-SCORE: it keeps its idea_id and is not compared against itself.
  const existingByTitle = new Map(bank.ideas.filter((i) => !i.content_id).map((i) => [i.title.trim().toLowerCase(), i]));
  const rechecks = new Set(candidates.map((c) => existingByTitle.get(String(c.title).trim().toLowerCase())).filter(Boolean));
  const corpus = [...db.items.filter((i) => i.status !== "ARCHIVED"), ...bank.ideas.filter((i) => i.status !== "REJECTED" && !rechecks.has(i))];
  const idf = buildIdf(corpus.map((i) => `${i.topic ?? i.core_idea} ${i.hook} ${i.caption ?? ""}`));
  const results = [];

  for (const [n, idea] of candidates.entries()) {
    const problems = REQUIRED.filter((k) => isUnknown(idea[k]) || (Array.isArray(idea[k]) && !idea[k].length)).map((k) => `missing ${k}`);
    if (!FORMAT_TO_CALENDAR_TYPE[idea.format]) problems.push(`format "${idea.format}" not in: ${Object.keys(FORMAT_TO_CALENDAR_TYPE).join(", ")}`);
    if (!cfg.balance.pillar_targets[idea.pillar]) problems.push(`pillar "${idea.pillar}" is not a calendar pillar`);
    if (!idea.real_story?.kind) problems.push("real_story.kind missing — every idea must be evaluated for a real story");
    if (!idea.humor?.level) problems.push("humor.level missing — every idea must be evaluated for humor");
    const { errors, total } = validateScore(cfg, idea.score_breakdown);
    problems.push(...errors);

    const dedupe = compareToCorpus(idea, corpus, { duplicate: cfg.dedupe.duplicate_threshold, related: cfg.dedupe.related_threshold }, idf);
    const declared = idea.new_angle?.type;
    if (declared && !cfg.dedupe.new_angle_types.includes(declared)) problems.push(`new_angle.type must be one of ${cfg.dedupe.new_angle_types.join(", ")}`);
    const fact = factualityPrescreen(idea, stories);

    let decision;
    const b = total !== null && !errors.length ? band(cfg, total) : null;
    if (problems.length) decision = "INVALID";
    else if (dedupe.verdict === "DUPLICATE" && !(declared && idea.new_angle?.explanation)) decision = "REJECTED_DUPLICATE";
    else if (fact.some((f) => f.blocking)) decision = "REWORK_FACTUALITY";
    else decision = b;

    const previous = existingByTitle.get(String(idea.title).trim().toLowerCase());
    const record = {
      ...idea,
      idea_id: previous?.idea_id ?? `(batch #${n + 1})`,
      rescore_history: previous ? [...(previous.rescore_history ?? []), { at: previous.checked_at, score: previous.idea_score, decision: previous.decision, trigger: idea.rescore_trigger ?? "re-check" }] : idea.rescore_history,
      status: ["INVALID", "REJECTED_DUPLICATE", "REJECT_OR_REWORK"].includes(decision) ? "REJECTED" : "SCORED",
      idea_score: total,
      score_band: b,
      decision,
      problems,
      dedupe,
      factuality_flags: fact,
      checked_at: nowIso(),
    };
    results.push(record);
    // Later candidates in the same batch are checked against earlier accepted ones.
    if (record.status === "SCORED") corpus.push(record);
  }

  if (!flags["dry-run"]) {
    for (const r of results) {
      const prevIndex = bank.ideas.findIndex((i) => i.idea_id === r.idea_id);
      if (prevIndex >= 0) {
        bank.ideas[prevIndex] = r;
        continue;
      }
      r.idea_id = allocateId(bank, cfg.id.idea_prefix, cfg.id.pad, "idea_id");
      bank.ideas.push(r);
    }
    saveIdeaBank(cfg, bank);
    logRun(cfg, "ideas:check", { file, checked: results.length, decisions: results.map((r) => r.decision) });
  }

  const today = todayLocal(cfg.brand.timezone);
  const lines = [
    `# Idea check — ${today}`,
    "",
    `Source: \`${file}\`${flags["dry-run"] ? " (dry run — nothing saved)" : ""}`,
    "",
    "| Idea | Score | Band | Decision | Closest existing | Flags |",
    "|---|---|---|---|---|---|",
    ...results.map((r) => {
      const m = r.dedupe.matches[0];
      const closest = m ? `${m.id} (${m.score}, ${m.verdict})` : "—";
      const f = [...r.problems, ...r.factuality_flags.map((x) => `${x.blocking ? "⛔" : "⚠"} ${x.type}`)].join("; ") || "—";
      return `| ${r.idea_id ?? "(dry)"} ${r.title.replace(/\|/g, "/")} | ${r.idea_score ?? "—"} | ${r.score_band ?? "—"} | ${r.decision} | ${closest} | ${f.replace(/\|/g, "/")} |`;
    }),
    "",
    "## Score breakdowns",
    "",
    ...results.map((r) => `- **${r.idea_id ?? "(dry)"} ${r.title}** — ${cfg.scoring.dimensions.map((d) => `${d.replace(/_/g, " ")} ${r.score_breakdown?.[d] ?? "?"}`).join(" · ")} = **${r.idea_score ?? "?"}**`),
  ].join("\n");
  const out = path.join(resolvePath(cfg.paths.reports_dir), `idea-check-${today}${flags["dry-run"] ? "-dry" : ""}.md`);
  writeText(out, lines);
  console.log(lines);
  console.log(`\n→ ${out}`);
  return results;
}

function proposeSlot(cfg, db, idea, today) {
  const type = FORMAT_TO_CALENDAR_TYPE[idea.format];
  const weekday = TYPE_WEEKDAY[type];
  const months = PILLAR_MONTHS[idea.pillar] ?? [];
  const minDate = new Date(`${today}T12:00:00Z`);
  minDate.setUTCDate(minDate.getUTCDate() + 7); // a week of lead time to script, record and edit
  const minIso = minDate.toISOString().slice(0, 10);
  const taken = new Set(db.items.filter((i) => i.lane === "secondary" && !isUnknown(i.date) && i.status !== "ARCHIVED").map((i) => i.date));
  taken.forEach(() => {});
  for (const i of db.items.filter((x) => x.status === "SCORED" && x.proposed_slot)) taken.add(i.proposed_slot.date);
  const primary = db.items.filter((i) => i.lane === "primary" && !isUnknown(i.date) && i.date >= minIso && !taken.has(i.date));
  const monthOf = (i) => parseInt(String(i.month_theme).match(/Month\s+(\d)/)?.[1] ?? "0", 10);
  const candidates = primary.filter((i) => new Date(`${i.date}T12:00:00Z`).getUTCDay() === weekday && i.pillar !== idea.pillar);
  for (const m of months) {
    const hit = candidates.filter((i) => monthOf(i) === m).sort((a, b) => a.date.localeCompare(b.date))[0];
    if (hit) return { date: hit.date, reason: `${type} weekday in Month ${m} (theme fits ${idea.pillar}); primary item that day is ${hit.content_id} (${hit.pillar}), so no same-pillar collision.` };
  }
  const any = candidates.sort((a, b) => a.date.localeCompare(b.date))[0];
  return any ? { date: any.date, reason: `Next free ${type} weekday; primary that day is ${any.content_id} (${any.pillar}).` } : { date: UNKNOWN, reason: "No free secondary slot in the calendar window — hold in idea bank or extend the calendar." };
}

export function propose(cfg, { flags }) {
  const db = loadDb(cfg);
  const bank = loadIdeaBank(cfg);
  const today = todayLocal(cfg.brand.timezone);
  const eligible = bank.ideas.filter((i) => ["PRIORITY", "STRONG"].includes(i.decision) && !i.content_id);
  const created = [];
  for (const idea of eligible) {
    const slot = proposeSlot(cfg, db, idea, today);
    const item = {
      content_id: allocateId(db, cfg.id.prefix, cfg.id.pad, "content_id"),
      source: { type: "autopilot", row_key: `idea:${idea.idea_id}`, file: cfg.paths.idea_bank },
      created_at: nowIso(), updated_at: nowIso(), scheduled_at: null, published_at: null,
      status: "SCORED", production_status: "Proposed", publication_status: "Unpublished", review_flag: null,
      lane: "secondary", date: UNKNOWN, day_label: UNKNOWN, week: UNKNOWN, month_theme: UNKNOWN, proposed_slot: slot,
      title: idea.title, topic: idea.core_idea, core_idea: idea.core_idea, pillar: idea.pillar, series: idea.series ?? "General",
      format: FORMAT_TO_CALENDAR_TYPE[idea.format], format_detail: idea.format, industry: idea.industry ?? "Cross-Industry",
      audience: idea.audience, objective: idea.objective, hook: idea.hook, context: idea.context ?? UNKNOWN, problem: idea.problem ?? UNKNOWN,
      insight: idea.insight, proof: idea.proof ?? UNKNOWN, lesson: idea.lesson, cta: idea.cta, visual_concept: idea.visual_concept ?? UNKNOWN,
      structure: idea.structure ?? UNKNOWN, visual_strategy: idea.visual_strategy ?? UNKNOWN, remotion_template: idea.remotion_template ?? UNKNOWN,
      real_story: { evaluated: true, story_id: idea.real_story?.story_id ?? null, kind: idea.real_story?.kind ?? UNKNOWN, note: idea.real_story?.note ?? "" },
      humor: { evaluated: true, level: idea.humor?.level ?? UNKNOWN, type: idea.humor?.type ?? UNKNOWN, angle: idea.humor?.angle ?? UNKNOWN, line: idea.humor?.line ?? UNKNOWN },
      idea_score: idea.idea_score, score_breakdown: idea.score_breakdown, score_band: idea.score_band,
      platform_versions: idea.platform_versions ?? {}, caption: UNKNOWN, seo_keywords: idea.seo_keywords ?? UNKNOWN, hashtags: UNKNOWN,
      claims: [], flags: [], approvals: { calendar: null, publish: null }, qa: null, publication_data: {}, performance: {},
      links: { idea_id: idea.idea_id, gap_refs: idea.gap_refs, dedupe: idea.dedupe?.matches?.slice(0, 3) ?? [] },
      history: [],
    };
    for (const f of idea.factuality_flags ?? []) addFlag(item, f.type, f.message);
    addHistory(item, "proposed", { idea_id: idea.idea_id, slot: slot.date });
    db.items.push(item);
    idea.content_id = item.content_id;
    created.push(item);
  }
  if (!flags["dry-run"] && created.length) {
    saveDb(cfg, db);
    saveIdeaBank(cfg, bank);
    logRun(cfg, "ideas:propose", { proposed: created.map((c) => c.content_id) });
  }
  const md = [
    `# Calendar proposals — ${today}`,
    "",
    `Mode: **${cfg.approval.calendar_insertion}**. Nothing below is on the calendar until approved with \`node engine/cli.mjs approve <content_id> --by "<name>"\`.`,
    "",
    "| Content ID | Score | Title | Pillar | Format | Proposed date | Why this slot |",
    "|---|---|---|---|---|---|---|",
    ...created.map((c) => `| ${c.content_id} | ${c.idea_score} ${c.score_band} | ${c.title} | ${c.pillar} | ${c.format_detail} → ${c.format} | ${c.proposed_slot.date} | ${c.proposed_slot.reason} |`),
  ].join("\n");
  const out = path.join(resolvePath(cfg.paths.reports_dir), `calendar-proposals-${today}.md`);
  if (created.length) writeText(out, md);
  console.log(created.length ? `${md}\n\n→ ${out}` : "No new STRONG/PRIORITY ideas to propose.");
  return created;
}
