#!/usr/bin/env node
// AfriShield Content Autopilot — engine CLI.
// The engine does the deterministic work (ingest, math, gates, reports). The Claude
// skills do the judgment work (ideas, stories, humor, scripts) and hand results back
// to the engine as structured JSON.
import fs from "node:fs";
import path from "node:path";
import { loadConfig, parseArgs, resolvePath, logRun } from "./lib/core.mjs";
import * as ingest from "./commands/ingest.mjs";
import * as gaps from "./commands/gaps.mjs";
import * as ideas from "./commands/ideas.mjs";
import * as life from "./commands/lifecycle.mjs";
import * as exporter from "./commands/export.mjs";
import * as analytics from "./commands/analytics.mjs";
import * as schedule from "./commands/schedule.mjs";
import * as stories from "./commands/stories.mjs";

// Deterministic half of RUN CONTENT AUTOPILOT / UPDATE CONTENT CALENDAR.
function prepare(cfg, args) {
  ingest.run(cfg, args);
  const rawDir = path.join(resolvePath(cfg.paths.performance_dir), "raw");
  if (fs.existsSync(rawDir)) {
    const latest = fs.readdirSync(rawDir).filter((f) => /^metricool-.*\.json$/.test(f)).sort().at(-1);
    if (latest) analytics.importMetricool(cfg, { positional: [path.join(rawDir, latest)], flags: {} });
  }
  analytics.learn(cfg);
  gaps.run(cfg, { ...args, flags: { ...args.flags, "apply-flags": true } });
  stories.scan(cfg, { flags: { "no-advance": true } });
  exporter.run(cfg, args);
  logRun(cfg, "prepare", {});
  console.log("\nDeterministic stages done. Judgment stages (ideas → score → dedupe → enrich → propose) run in the content-autopilot skill.");
}

const COMMANDS = {
  prepare: [prepare, "ingest → import latest Metricool pull → learn → gaps (apply flags) → story scan → export"],
  ingest: [ingest.run, "normalize the existing calendar into data/content-db.json [--dry-run]"],
  gaps: [gaps.run, "content gap analysis report [--apply-flags]"],
  "ideas:check": [ideas.check, "<ideas.json> validate, score, dedupe, factuality pre-screen [--dry-run]"],
  "ideas:propose": [ideas.propose, "turn STRONG/PRIORITY ideas into proposed calendar items (status SCORED)"],
  approve: [life.approve, '<content_id...> --by "<name>" [--date] record the user\'s calendar approval'],
  reject: [life.reject, "<content_id> --reason archive a proposal (kept, never deleted)"],
  review: [life.review, "<content_id> --reason flag weak/obsolete content for REVIEW"],
  "resolve-flag": [life.resolveFlag, "<content_id> <FLAG_TYPE> --note resolve an open flag with an explanation"],
  status: [life.status, "<content_id> <STATUS> [--reason] move through the lifecycle (gated)"],
  qa: [life.qa, "<content_id> [--file] run the QA + factuality gate on production/<id>/qa.json"],
  "approve-publish": [life.approvePublish, '<content_id> --by "<name>" record publish approval (QA must pass)'],
  "autonomy-check": [life.autonomyCheck, "is autonomous low-risk publishing allowed yet?"],
  show: [life.show, "<content_id> print one content object"],
  list: [life.list, "[--status X] [--next 14] [--from --to] [--flag TYPE] [--lane primary|secondary]"],
  export: [exporter.run, "exports/living-calendar.csv + board overlay"],
  "analytics:import-metricool": [analytics.importMetricool, "<raw.json> [--network tiktok]"],
  "analytics:import-csv": [analytics.importCsv, "<metrics.csv> --platform <name>"],
  learn: [analytics.learn, "rebuild data/learning/content-intelligence.json"],
  "schedule:suggest": [schedule.suggest, "<content_id> --platform <name> [--date] [--save]"],
  "story:add": [stories.add, "<stories.json> add evidenced stories"],
  "story:list": [stories.list, "[--usable]"],
  "story:use": [stories.use, '<story_id> <content_id> --angle "..."'],
  "story:scan": [stories.scan, "[--since YYYY-MM-DD] list recently changed work files for FIND STORY OPPORTUNITIES"],
};

const [, , command, ...rest] = process.argv;
if (!command || command === "help" || !COMMANDS[command]) {
  console.log("AfriShield Content Autopilot engine\n\nUsage: node engine/cli.mjs <command> [args]\n");
  for (const [name, [, desc]] of Object.entries(COMMANDS)) console.log(`  ${name.padEnd(28)} ${desc}`);
  process.exit(command && command !== "help" ? 1 : 0);
}
try {
  const cfg = loadConfig();
  await COMMANDS[command][0](cfg, parseArgs(rest));
} catch (e) {
  console.error(`✖ ${e.message}`);
  process.exit(1);
}
