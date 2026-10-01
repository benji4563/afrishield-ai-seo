// ANALYTICS + PERFORMANCE LEARNING
// import-metricool: raw Metricool pulls → published-history items (never auto-marks a calendar row).
// import-csv: manual/other-platform metrics onto existing items.
// learn: builds data/learning/content-intelligence.json from real data only, with an
//        explicit confidence level on every finding. Never optimizes views alone.
import fs from "node:fs";
import path from "node:path";
import {
  loadDb, saveDb, allocateId, addHistory, addFlag, resolvePath, readJson, writeJson, writeText, logRun, nowIso, todayLocal, UNKNOWN, isUnknown,
} from "../lib/core.mjs";
import { csvToObjects } from "../lib/csv.mjs";
import { buildIdf, similarity } from "../lib/similarity.mjs";
import { normalizeCta, ctaStage, hookPattern } from "../lib/classify.mjs";

const PLATFORM_METRICS = ["views", "reach", "likes", "comments", "shares", "saves", "clicks", "leads", "conversions", "watch_time_s", "avg_watch_s", "full_watch_rate", "keyword_comments", "dms", "follows"];

function parseMetricoolTime(s) {
  const m = String(s).match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  return m ? `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}` : String(s);
}
const num = (v) => (v === null || v === undefined || v === "" ? null : Number(v));

// Features we can observe from the post itself (not guessed).
function postFeatures(description, durationS, publishedLocal) {
  const text = String(description ?? "");
  const firstSentence = text.split(/(?<=[.!?👇])\s+/)[0] ?? "";
  const tags = text.match(/#\w+/g) ?? [];
  const lastTagIndex = text.lastIndexOf("#");
  const firstTagIndex = text.indexOf("#");
  const bodyEnd = text.replace(/(\s*#\w+)+\s*$/, "").length;
  const d = new Date(`${publishedLocal}Z`);
  return {
    duration_s: durationS,
    duration_bucket: durationS === null ? UNKNOWN : durationS < 8 ? "<8s" : durationS < 30 ? "8–29s" : durationS <= 60 ? "30–60s" : durationS <= 90 ? "61–90s" : ">90s",
    weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getUTCDay()],
    hour_bucket: `${String(d.getUTCHours()).padStart(2, "0")}:00`,
    hashtag_count: tags.length,
    inline_hashtags: firstTagIndex >= 0 && firstTagIndex < bodyEnd && lastTagIndex >= 0 ? "yes" : "no",
    product_first: /\b(elodie|eva|afrishield|meet |our (ai|service)|we (don't|do not) just|we build|discover)\b/i.test(firstSentence) ? "yes" : "no",
    comment_cta: /comment\s+["“]?[A-Z]{2,}/.test(text) ? "yes" : "no",
    story_signal: /\b(since|started in|restaurant|i built|two years ago|story)\b/i.test(text) ? "yes" : "no",
  };
}

export function importMetricool(cfg, { positional, flags }) {
  const file = positional[0];
  if (!file) throw new Error("Usage: analytics:import-metricool <raw.json>");
  const raw = JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
  const network = flags.network ?? "tiktok";
  const db = loadDb(cfg);
  const calendar = db.items.filter((i) => i.source.type !== "published-history" && i.status !== "ARCHIVED");
  const idf = buildIdf(calendar.map((i) => `${i.topic} ${i.hook} ${i.caption}`));
  let created = 0;
  let updated = 0;
  for (const row of raw.rows) {
    const r = Object.fromEntries(raw.fields.map((f, i) => [f, row[i]]));
    const videoId = String(r.url).match(/video\/(\d+)/)?.[1] ?? r.url;
    const key = `metricool:${network}:${videoId}`;
    const publishedLocal = parseMetricoolTime(r.published_at);
    const snapshot = {
      pulled_at: raw._pulled_at ?? nowIso(), views: num(r.views), reach: num(r.reach), likes: num(r.likes), comments: num(r.comments),
      shares: num(r.shares), full_watch_rate: num(r.full_watch_rate), avg_watch_s: num(r.avg_watch_s), for_you_share: num(r.for_you_share), search_share: num(r.search_share),
    };
    let item = db.items.find((i) => i.source.row_key === key);
    if (!item) {
      item = {
        content_id: allocateId(db, cfg.id.prefix, cfg.id.pad, "content_id"),
        source: { type: "published-history", file: path.basename(file), row_key: key, original: r },
        created_at: nowIso(), updated_at: nowIso(), scheduled_at: null, published_at: `${publishedLocal}+01:00`,
        status: "PUBLISHED", production_status: "Published outside autopilot", publication_status: "Published", review_flag: null, lane: "published",
        date: publishedLocal.slice(0, 10), title: UNKNOWN, topic: UNKNOWN, core_idea: UNKNOWN, pillar: UNKNOWN, series: UNKNOWN, format: UNKNOWN,
        industry: UNKNOWN, audience: UNKNOWN, objective: UNKNOWN, hook: UNKNOWN, context: UNKNOWN, problem: UNKNOWN, insight: UNKNOWN, proof: UNKNOWN,
        lesson: UNKNOWN, cta: UNKNOWN, visual_concept: UNKNOWN, caption: r.description, hashtags: (String(r.description).match(/#\w+/g) ?? []).join(" "),
        real_story: { evaluated: false, story_id: null, kind: UNKNOWN, note: "" }, humor: { evaluated: false, level: UNKNOWN },
        platform_versions: {}, claims: [], flags: [], approvals: { calendar: null, publish: null }, qa: null,
        publication_data: { [network]: { url: r.url, published_at: publishedLocal } }, performance: {}, links: {}, history: [],
      };
      addHistory(item, "imported_published_history", { note: "Published before/outside the autopilot; lifecycle gates not applicable." });
      db.items.push(item);
      created++;
      const best = calendar
        .map((c) => ({ c, s: similarity(r.description, `${c.topic} ${c.hook} ${c.caption}`, idf) }))
        .sort((a, b) => b.s - a.s)[0];
      if (best && best.s >= cfg.dedupe.related_threshold) {
        item.links.suggested_calendar_match = { content_id: best.c.content_id, score: Number(best.s.toFixed(3)) };
        addFlag(item, "LINK_REVIEW", `Possibly the published version of ${best.c.content_id} (${best.s.toFixed(2)}). Confirm before marking that row published.`);
      }
    } else updated++;
    item.performance.platforms ??= {};
    const p = (item.performance.platforms[network] ??= { snapshots: [] });
    p.snapshots = p.snapshots.filter((s) => s.pulled_at !== snapshot.pulled_at);
    p.snapshots.push(snapshot);
    p.latest = snapshot;
    item.features = postFeatures(r.description, num(r.duration_s), publishedLocal);
    item.status = item.status === "PUBLISHED" ? "ANALYZED" : item.status;
    addHistory(item, "metrics_snapshot", { network, pulled_at: snapshot.pulled_at, views: snapshot.views });
  }
  saveDb(cfg, db);
  logRun(cfg, "analytics:import-metricool", { file, created, updated });
  console.log(`Imported ${raw.rows.length} ${network} posts (${created} new, ${updated} updated).`);
}

export function importCsv(cfg, { positional, flags }) {
  const file = positional[0];
  if (!file || !flags.platform) throw new Error("Usage: analytics:import-csv <metrics.csv> --platform <tiktok|instagram|facebook|linkedin|youtube>");
  const rows = csvToObjects(fs.readFileSync(path.resolve(file), "utf8"));
  const db = loadDb(cfg);
  let n = 0;
  for (const row of rows) {
    const item = db.items.find((i) => i.content_id === row.content_id);
    if (!item) {
      console.warn(`skip: unknown content_id ${row.content_id}`);
      continue;
    }
    const snapshot = { pulled_at: row.pulled_at || nowIso() };
    for (const m of PLATFORM_METRICS) if (row[m] !== undefined && row[m] !== "") snapshot[m] = Number(row[m]);
    item.performance.platforms ??= {};
    const p = (item.performance.platforms[flags.platform] ??= { snapshots: [] });
    p.snapshots.push(snapshot);
    p.latest = snapshot;
    if (row.published_at) item.publication_data[flags.platform] = { ...(item.publication_data[flags.platform] ?? {}), published_at: row.published_at };
    addHistory(item, "metrics_snapshot", { network: flags.platform });
    n++;
  }
  saveDb(cfg, db);
  logRun(cfg, "analytics:import-csv", { file, platform: flags.platform, rows: n });
  console.log(`Attached ${n} metric rows.`);
}

// ---------------------------------------------------------------- learning

const METRIC_ALIASES = { reach: ["reach", "views"], retention: ["full_watch_rate", "avg_watch_s"], shares: ["shares"], follows: ["follows"], saves: ["saves"], comments: ["comments"], keyword_comments: ["keyword_comments"], dms: ["dms"], clicks: ["clicks"], leads: ["leads"], conversions: ["conversions"] };
const confidence = (n) => (n >= 10 ? "reliable" : n >= 3 ? "emerging" : "anecdotal");

function percentileRanks(values) {
  const sorted = [...values].filter((v) => v !== null).sort((a, b) => a - b);
  return (v) => {
    if (v === null || sorted.length < 2) return null;
    const below = sorted.filter((x) => x < v).length;
    const equal = sorted.filter((x) => x === v).length;
    return (below + 0.5 * equal) / sorted.length;
  };
}

export function learn(cfg) {
  const db = loadDb(cfg);
  const obs = [];
  for (const item of db.items) {
    for (const [platform, p] of Object.entries(item.performance?.platforms ?? {})) {
      if (p.latest) obs.push({ item, platform, m: p.latest });
    }
  }
  const byPlatform = {};
  for (const o of obs) (byPlatform[o.platform] ??= []).push(o);

  const intelligence = {
    generated_at: nowIso(), observations: obs.length, platforms: {}, data_quality: { metrics_available: [], metrics_missing: [] },
    findings: [], hypotheses: [], balance_adjustments: {}, qualitative_observations: [], rules_in_tension: [],
  };

  const allMetricsSeen = new Set();
  for (const [platform, list] of Object.entries(byPlatform)) {
    const available = Object.entries(METRIC_ALIASES).filter(([, aliases]) => list.some((o) => aliases.some((a) => o.m[a] !== null && o.m[a] !== undefined))).map(([k]) => k);
    available.forEach((a) => allMetricsSeen.add(a));
    const rankers = Object.fromEntries(available.map((k) => {
      const alias = METRIC_ALIASES[k].find((a) => list.some((o) => o.m[a] !== null && o.m[a] !== undefined));
      const values = list.map((o) => (o.m[alias] ?? null) === null ? null : o.m[alias] / (k === "reach" ? 1 : Math.max(o.m.views ?? 1, 1)));
      const rank = percentileRanks(values);
      return [k, { alias, rank, value: (o) => (o.m[alias] ?? null) === null ? null : o.m[alias] / (k === "reach" ? 1 : Math.max(o.m.views ?? 1, 1)) }];
    }));
    const scoreFor = (o) => {
      const objective = isUnknown(o.item.objective) ? "awareness" : o.item.objective.toLowerCase().replace(/\s+/g, "_");
      const weights = cfg.analytics.objective_weights[objective] ?? cfg.analytics.objective_weights.awareness;
      let sum = 0;
      let w = 0;
      for (const [metric, weight] of Object.entries(weights)) {
        if (metric === "_doc" || !rankers[metric]) continue;
        const r = rankers[metric].rank(rankers[metric].value(o));
        if (r === null) continue;
        sum += r * weight;
        w += weight;
      }
      return { score: w ? sum / w : null, objective, weight_covered: Number(w.toFixed(2)) };
    };
    const scored = list.map((o) => ({ ...o, ...scoreFor(o) })).filter((o) => o.score !== null);
    const overall = scored.reduce((s, o) => s + o.score, 0) / (scored.length || 1);

    const dimensions = {
      duration_bucket: (o) => o.item.features?.duration_bucket,
      weekday: (o) => o.item.features?.weekday,
      hour_bucket: (o) => o.item.features?.hour_bucket,
      product_first_opener: (o) => o.item.features?.product_first,
      inline_hashtags: (o) => o.item.features?.inline_hashtags,
      comment_cta_in_caption: (o) => o.item.features?.comment_cta,
      story_signal: (o) => o.item.features?.story_signal,
      pillar: (o) => o.item.pillar,
      format: (o) => o.item.format,
      series: (o) => o.item.series,
      humor_level: (o) => o.item.humor?.level,
      real_story_kind: (o) => o.item.real_story?.kind,
      cta_stage: (o) => (isUnknown(o.item.cta) ? UNKNOWN : ctaStage(normalizeCta(o.item.cta))),
      hook_pattern: (o) => (isUnknown(o.item.hook) ? UNKNOWN : hookPattern(o.item.hook, o.item.series)),
    };
    const dims = {};
    for (const [dim, fn] of Object.entries(dimensions)) {
      const groups = {};
      for (const o of scored) {
        const k = fn(o);
        if (isUnknown(k)) continue;
        (groups[k] ??= []).push(o);
      }
      if (Object.keys(groups).length < 2) continue;
      dims[dim] = Object.fromEntries(Object.entries(groups).map(([k, g]) => {
        const mean = g.reduce((s, o) => s + o.score, 0) / g.length;
        const avgComments = g.reduce((s, o) => s + (o.m.comments ?? 0), 0) / g.length;
        const avgViews = g.reduce((s, o) => s + (o.m.views ?? 0), 0) / g.length;
        return [k, { n: g.length, mean_score: Number(mean.toFixed(3)), lift_vs_overall: Number((mean - overall).toFixed(3)), avg_views: Math.round(avgViews), avg_comments: Number(avgComments.toFixed(1)), confidence: confidence(g.length) }];
      }));
      for (const [k, v] of Object.entries(dims[dim])) {
        if (Math.abs(v.lift_vs_overall) < 0.1) continue;
        const entry = { platform, dimension: dim, value: k, lift: v.lift_vs_overall, n: v.n, confidence: v.confidence, statement: `${platform}: ${dim} = ${k} scores ${v.lift_vs_overall > 0 ? "above" : "below"} average (lift ${v.lift_vs_overall}, n=${v.n}).` };
        (v.confidence === "anecdotal" ? intelligence.hypotheses : intelligence.findings).push(entry);
      }
    }
    intelligence.platforms[platform] = {
      posts: list.length, scored: scored.length, overall_mean: Number(overall.toFixed(3)), metrics_used: available,
      top: scored.sort((a, b) => b.score - a.score).slice(0, 3).map((o) => ({ content_id: o.item.content_id, score: Number(o.score.toFixed(3)), views: o.m.views, comments: o.m.comments, caption: String(o.item.caption).slice(0, 90) })),
      dimensions: dims,
    };
  }
  const wanted = Object.keys(METRIC_ALIASES);
  intelligence.data_quality.metrics_available = [...allMetricsSeen];
  intelligence.data_quality.metrics_missing = wanted.filter((m) => !allMetricsSeen.has(m));

  // Real observations from the 2026-09-06 retention audit (qualitative, source-cited).
  const analysis = resolvePath(cfg.paths.tiktok_retention_analysis);
  if (fs.existsSync(analysis)) {
    intelligence.qualitative_observations.push(
      { source: cfg.paths.tiktok_retention_analysis, observation: "Every product-first opener (Elodie, AfriShield, 'AI solutions') stayed in the ~100–150-view first FYP bucket.", confidence: "qualitative" },
      { source: cfg.paths.tiktok_retention_analysis, observation: "The story-led White House Douala post drew the most comments of the batch.", confidence: "qualitative" },
      { source: cfg.paths.tiktok_retention_analysis, observation: "Typos in on-screen text and inline hashtags inside caption sentences correlated with the weakest posts.", confidence: "qualitative" },
    );
  }
  // Where the standing rules and the data disagree, surface it — never silently pick.
  const tt = intelligence.platforms.tiktok?.dimensions?.duration_bucket;
  if (tt) {
    const long = Object.entries(tt).filter(([k]) => ["61–90s", ">90s"].includes(k));
    const inRule = tt["30–60s"];
    if (long.length && (!inRule || long.some(([, v]) => v.mean_score > (inRule?.mean_score ?? 0)))) {
      intelligence.rules_in_tension.push({
        rule: "afrishield-tiktok-video-script: runtime 52–60s, never over 60s",
        data: `Posts over 60s: ${long.map(([k, v]) => `${k} n=${v.n} mean ${v.mean_score}, avg comments ${v.avg_comments}`).join("; ")}. 30–60s: ${inRule ? `n=${inRule.n} mean ${inRule.mean_score}` : "no posts"}.`,
        verdict: "Anecdotal — keep the rule, but A/B test one 75–90s story cut before treating 60s as a hard cap.",
      });
    }
  }

  const today = todayLocal(cfg.brand.timezone);
  writeJson(resolvePath(cfg.paths.intelligence), intelligence, { backup: true });
  const md = [
    `# Performance learning — ${today}`,
    "",
    `Observations: **${intelligence.observations}**. Metrics available: ${intelligence.data_quality.metrics_available.join(", ") || "none"}. **Missing:** ${intelligence.data_quality.metrics_missing.join(", ")}.`,
    "",
    "> Scores are per-platform percentile blends weighted by each item's objective (config.analytics.objective_weights), renormalized over the metrics that exist. With missing retention/saves/leads data, the model is an engagement proxy — do not treat it as a conversion model.",
    "",
    ...Object.entries(intelligence.platforms).flatMap(([p, v]) => [
      `## ${p} — ${v.posts} posts`,
      "",
      ...Object.entries(v.dimensions).flatMap(([d, groups]) => [`**${d}**`, "", "| Value | n | Mean score | Lift | Avg views | Avg comments | Confidence |", "|---|---|---|---|---|---|---|", ...Object.entries(groups).map(([k, g]) => `| ${k} | ${g.n} | ${g.mean_score} | ${g.lift_vs_overall} | ${g.avg_views} | ${g.avg_comments} | ${g.confidence} |`), ""]),
    ]),
    "## Findings (emerging/reliable)",
    "",
    intelligence.findings.length ? intelligence.findings.map((f) => `- ${f.statement} — ${f.confidence}`).join("\n") : "_None yet — no group has ≥3 observations with a meaningful lift._",
    "",
    "## Hypotheses to test (anecdotal)",
    "",
    intelligence.hypotheses.length ? intelligence.hypotheses.map((f) => `- ${f.statement}`).join("\n") : "_None._",
    "",
    "## Rules in tension with data",
    "",
    intelligence.rules_in_tension.length ? intelligence.rules_in_tension.map((r) => `- **${r.rule}** — ${r.data} → ${r.verdict}`).join("\n") : "_None._",
    "",
    "## Qualitative observations (cited)",
    "",
    intelligence.qualitative_observations.map((q) => `- ${q.observation} _(${q.source})_`).join("\n"),
  ].join("\n");
  const out = path.join(resolvePath(cfg.paths.reports_dir), `performance-learning-${today}.md`);
  writeText(out, md);
  logRun(cfg, "learn", { observations: obs.length, findings: intelligence.findings.length, hypotheses: intelligence.hypotheses.length });
  console.log(`Learning: ${obs.length} observations, ${intelligence.findings.length} findings, ${intelligence.hypotheses.length} hypotheses → ${out}`);
  return intelligence;
}

export const _test = { postFeatures, parseMetricoolTime, readJson };
