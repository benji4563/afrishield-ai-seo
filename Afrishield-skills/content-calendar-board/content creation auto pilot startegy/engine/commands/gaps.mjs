// GAP ANALYSIS — audit the living calendar before any new idea is generated.
// Writes reports/gap-analysis-<date>.md (+ .json) and data/learning/gap-latest.json,
// which idea-generation reads as its brief.
import path from "node:path";
import { loadDb, saveDb, resolvePath, todayLocal, writeJson, writeText, isUnknown, addFlag, logRun, readJson } from "../lib/core.mjs";
import { detectFormats, detectTopics, normalizeCta, ctaStage, screenClaims, isLabeledHypothetical, hookOpener, hookPattern } from "../lib/classify.mjs";
import { buildIdf, similarity } from "../lib/similarity.mjs";

const PROMPT_FORMATS = ["story", "case study", "tutorial", "experiment", "opinion", "news reaction", "myth", "comparison", "humor", "behind-the-scenes", "screen demonstration", "proof", "failure", "lesson", "Q&A"];
const PROMPT_TOPICS = ["AI Search", "AI SEO", "GEO", "AI visibility", "AI agents", "automation", "AI assistants", "virtual assistants", "AI business transformation", "African business", "tourism/hospitality", "real estate", "fintech", "beauty/skincare", "professional services", "AI news", "build-in-public"];
const SERIES_REGISTRY = [
  "The AI Concierge Test", "Get Found Africa", "Commission Math", "The Keyword Graveyard", "Report Day", "Roast My Rankings", "Duet the DMs", "Ask Elodie",
  "We Were Wrong", "AI Search News for African Tourism", "ASK AI", "WOULD AI RECOMMEND YOU?", "FIX MY WEBSITE", "AI VS GOOGLE", "60-SECOND GEO", "AI EMPLOYEE",
  "AI FAILS", "BUILD IT WITH ME", "AFRICAN BUSINESS AI AUDIT", "THE AI QUESTION", "Diaspora Bridge", "Missed Call Math", "The Midnight Test",
  "30-Day Transformation", "The Free Audit Diaries", "GEO Glossary", "One Bar Test",
];
const MARKETS = {
  Cameroon: /cameroon|douala|yaound|buea|limbe|bamenda/i,
  Tanzania: /tanzania|arusha|zanzibar|serengeti|dar es salaam|kilimanjaro|moshi|ngorongoro|singida/i,
  Kenya: /kenya|nairobi|mombasa|maasai mara|diani/i,
  Nigeria: /nigeria|lagos|abuja|port harcourt/i,
  Ghana: /ghana|accra|kumasi/i,
  Rwanda: /rwanda|kigali/i,
  "South Africa": /south africa|cape town|johannesburg|durban/i,
  Uganda: /uganda|kampala/i,
  "Côte d'Ivoire": /ivoire|ivory coast|abidjan/i,
  Senegal: /senegal|dakar/i,
};
const ON_CAMERA_VERBS = /\b(I|we)\s+(asked|tested|checked|called|messaged|searched|ran|audited|whatsapp'?d|re-ran|googled|typed)\b/i;
const ON_CAMERA_VISUAL = /screen[- ]record|screen recording|on camera|live|test|side-by-side|split screen/i;

const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : 0);
const countBy = (list, fn) => {
  const m = new Map();
  for (const x of list) for (const k of [].concat(fn(x))) m.set(k, (m.get(k) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};
const table = (headers, rows) => [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.map((c) => String(c).replace(/\|/g, "/")).join(" | ")} |`)].join("\n");
const baseSeries = (s) => String(s ?? "").replace(/\s*Ep\.?\s*\d+.*$/i, "").trim();
const itemText = (i) => [i.hook, i.context, i.topic, i.lesson, i.visual_concept, i.caption].filter((x) => !isUnknown(x)).join(" ");

export function run(cfg, { flags }) {
  const db = loadDb(cfg);
  const today = todayLocal(cfg.brand.timezone);
  const live = db.items.filter((i) => i.status !== "ARCHIVED" && i.source.type !== "published-history");
  const dated = live.filter((i) => !isUnknown(i.date)).sort((a, b) => a.date.localeCompare(b.date));
  const published = db.items.filter((i) => i.source.type === "published-history");
  const gaps = [];
  const itemFlags = new Map();
  const flagItem = (item, type, msg) => {
    if (!itemFlags.has(item.content_id)) itemFlags.set(item.content_id, []);
    itemFlags.get(item.content_id).push([type, msg]);
  };

  // 1 — balance vs targets
  const balance = (key, targets) =>
    Object.entries(targets).map(([name, target]) => {
      const n = live.filter((i) => i[key] === name).length;
      const share = pct(n, live.length);
      return { name, n, share, target, delta: Math.round((share - target) * 10) / 10 };
    });
  const pillarBalance = balance("pillar", cfg.balance.pillar_targets);
  const industryBalance = balance("industry", cfg.balance.industry_targets);
  for (const b of [...pillarBalance, ...industryBalance]) {
    if (Math.abs(b.delta) > cfg.balance.tolerance_pp) {
      gaps.push({ severity: "MEDIUM", area: "balance", finding: `${b.name}: ${b.share}% vs target ${b.target}% (${b.delta > 0 ? "+" : ""}${b.delta}pp)`, recommendation: b.delta < 0 ? `Generate ${b.name} ideas.` : `Hold new ${b.name} ideas unless they score PRIORITY.` });
    }
  }
  const unknownPillar = live.filter((i) => isUnknown(i.pillar)).length;

  // 2 — formats and topics (master prompt §5)
  const formatCounts = Object.fromEntries(PROMPT_FORMATS.map((f) => [f, 0]));
  const topicCounts = Object.fromEntries(PROMPT_TOPICS.map((t) => [t, 0]));
  for (const i of live) {
    for (const f of detectFormats(i)) formatCounts[f]++;
    for (const t of detectTopics(i)) topicCounts[t]++;
  }
  for (const [f, n] of Object.entries(formatCounts)) {
    if (f === "humor" && live.every((i) => !i.humor?.evaluated)) continue;
    if (n === 0) gaps.push({ severity: "MEDIUM", area: "format", finding: `No "${f}" content in the calendar.`, recommendation: `Generate ${f} ideas that are backed by a real event or data.` });
    else if (pct(n, live.length) < 3) gaps.push({ severity: "LOW", area: "format", finding: `"${f}" under-used: ${n} items (${pct(n, live.length)}%).`, recommendation: `Add ${f} ideas where they fit a real story or proof.` });
  }
  for (const [t, n] of Object.entries(topicCounts)) {
    if (pct(n, live.length) < 3) gaps.push({ severity: n === 0 ? "MEDIUM" : "LOW", area: "topic", finding: `Topic "${t}" appears in ${n} items (${pct(n, live.length)}%).`, recommendation: `Consider ideas for ${t} if strategically relevant.` });
  }

  // 3 — markets
  const marketCounts = Object.entries(MARKETS).map(([m, re]) => [m, live.filter((i) => re.test(itemText(i))).length]).sort((a, b) => b[1] - a[1]);
  const cm = marketCounts.find(([m]) => m === "Cameroon")[1];
  const tz = marketCounts.find(([m]) => m === "Tanzania")[1];
  if (cm < tz / 3) {
    gaps.push({ severity: "HIGH", area: "market", finding: `Cameroon/Douala appears in ${cm} items vs Tanzania in ${tz}.`, recommendation: "The founder is Douala-based and the 2026-08-30 entity baseline found no AI-SEO incumbent in Central Africa. Real Cameroon receipts (e.g. the White House Douala post, the West Africa TikTok lead research) are under-used as story sources." });
  }

  // 4 — CTA hygiene and rotation
  const ctaCounts = countBy(live, (i) => normalizeCta(i.cta));
  const rawVariants = new Set(live.map((i) => i.cta)).size;
  if (rawVariants > ctaCounts.length) {
    gaps.push({ severity: "LOW", area: "cta", finding: `${rawVariants} raw CTA spellings collapse to ${ctaCounts.length} real CTAs (quote-style variants).`, recommendation: "Normalize CTA text so comment-keyword tracking can count them." });
  }
  const stageCounts = countBy(live, (i) => ctaStage(normalizeCta(i.cta)));
  const consecutive = [];
  for (let k = 1; k < dated.length; k++) {
    const a = normalizeCta(dated[k - 1].cta);
    if (dated[k].lane === "primary" && dated[k - 1].lane === "primary" && a === normalizeCta(dated[k].cta)) consecutive.push([dated[k - 1], dated[k], a]);
  }
  if (consecutive.length) {
    gaps.push({ severity: "LOW", area: "cta", finding: `${consecutive.length} back-to-back repeats of the same CTA (brief says never the same CTA twice in a row).`, recommendation: "Rotate the CTA on the second day of each pair." });
    for (const [, b, c] of consecutive) flagItem(b, "CTA_REPEAT", `Same CTA as the previous day: ${c}`);
  }

  // 5 — hooks, openers, structures, near-duplicates
  const openerCounts = countBy(live, (i) => hookOpener(i.hook)).filter(([o]) => o);
  const repeatedOpeners = openerCounts.filter(([, n]) => n > cfg.balance.hook_opener_repeat_limit);
  for (const [o, n] of repeatedOpeners) gaps.push({ severity: "MEDIUM", area: "hooks", finding: `Hook opener "${o}…" used ${n} times.`, recommendation: "Vary the opening shape (stake, contradiction, number, confession) — repetition trains the audience to scroll." });
  const patternCounts = countBy(live, (i) => hookPattern(i.hook, i.series));
  for (const [p, n] of patternCounts) {
    // "statement" is the classifier's catch-all, not a real repeated structure.
    if (p !== "statement" && pct(n, live.length) > 25) gaps.push({ severity: "MEDIUM", area: "structure", finding: `Hook pattern "${p}" is ${pct(n, live.length)}% of the calendar.`, recommendation: "Rebalance story structures (guides/storytelling-guide.md §Structures)." });
  }
  const idf = buildIdf(live.map((i) => `${i.topic} ${i.hook}`));
  const pairs = [];
  for (let a = 0; a < live.length; a++) {
    for (let b = a + 1; b < live.length; b++) {
      const A = live[a];
      const B = live[b];
      const s = Math.max(similarity(`${A.topic} ${A.hook}`, `${B.topic} ${B.hook}`, idf), similarity(A.topic, B.topic, idf));
      if (s >= cfg.dedupe.duplicate_threshold) pairs.push({ a: A, b: B, score: Math.round(s * 1000) / 1000 });
    }
  }
  pairs.sort((x, y) => y.score - x.score);
  if (pairs.length) {
    gaps.push({ severity: "MEDIUM", area: "duplicates", finding: `${pairs.length} near-duplicate pairs already inside the calendar (similarity ≥ ${cfg.dedupe.duplicate_threshold}).`, recommendation: "Differentiate the later item (new proof, new story, new application) or flag it for REVIEW." });
    for (const p of pairs) flagItem(p.b, "NEAR_DUPLICATE", `Similar (${p.score}) to ${p.a.content_id} "${p.a.hook.slice(0, 80)}"`);
  }

  // 6 — story authenticity + unsourced statistics
  const storyRisk = [];
  const onCamera = [];
  const unsourcedStats = [];
  for (const i of live) {
    if (i.real_story?.story_id) continue;
    const text = [i.hook, i.context, i.caption].filter((x) => !isUnknown(x)).join(" ");
    if (isLabeledHypothetical(text)) continue;
    const claims = screenClaims(text);
    const events = claims.filter((c) => c.type !== "STATISTIC");
    const needsStory = events.filter((c) => !(c.type === "PERSONAL_EXPERIENCE" && ON_CAMERA_VERBS.test(c.sentence) && ON_CAMERA_VISUAL.test(i.visual_concept ?? "")));
    if (needsStory.length) {
      storyRisk.push({ item: i, claim: needsStory[0].sentence });
      flagItem(i, "STORY_EVIDENCE_NEEDED", `Asserts a real event without a story-bank entry: "${needsStory[0].sentence.slice(0, 140)}". Link a real story, re-frame as a labeled hypothetical, or perform it on camera.`);
    } else if (events.length) {
      onCamera.push(i);
      flagItem(i, "PERFORM_ON_CAMERA", "Hook describes a test the founder must actually run on camera; QA must confirm the recording shows the real result.");
    }
    if (claims.some((c) => c.type === "STATISTIC") && isUnknown(i.proof)) unsourcedStats.push(i);
  }
  if (storyRisk.length) gaps.push({ severity: "HIGH", area: "authenticity", finding: `${storyRisk.length} items assert a past real-world event (a client, an owner, a result) with no story-bank evidence.`, recommendation: "Before scripting each one: link a real story, or rewrite as a clearly labeled hypothetical. Never film these as true until evidenced." });
  if (unsourcedStats.length) gaps.push({ severity: "MEDIUM", area: "authenticity", finding: `${unsourcedStats.length} items contain numbers/statistics with no recorded proof source.`, recommendation: "fact-checking must attach a source or hedge the number before QA." });

  // 7 — enrichment completeness
  const enrichFields = ["title", "objective", "problem", "insight", "proof", "structure", "visual_strategy"];
  const enrichment = enrichFields.map((f) => [f, live.filter((i) => isUnknown(i[f])).length]);
  enrichment.push(["real_story.evaluated", live.filter((i) => !i.real_story?.evaluated).length], ["humor.evaluated", live.filter((i) => !i.humor?.evaluated).length]);
  const objectiveUnknown = live.filter((i) => isUnknown(i.objective)).length;
  if (objectiveUnknown) gaps.push({ severity: "MEDIUM", area: "enrichment", finding: `${objectiveUnknown}/${live.length} items have no objective, and none have been evaluated for a real story or humor yet.`, recommendation: "Run enrichment (storytelling + humor-writing) on the next 14 days first, not all 195 at once." });

  // 8 — production reality
  const due = dated.filter((i) => i.date <= today && !["PUBLISHED", "ANALYZED"].includes(i.status));
  if (due.length) {
    gaps.push({ severity: "HIGH", area: "production", finding: `${due.length} calendar days dated on/before ${today} are unpublished in the calendar; ${published.length} posts were actually published outside it.`, recommendation: "Decide per past-due row: mark done if it was published under another title, reschedule, or flag REVIEW. The calendar must reflect reality before new ideas are added." });
    for (const i of due) flagItem(i, "PAST_DUE", `Dated ${i.date}, status ${i.status}.`);
  }
  const unscheduled = live.filter((i) => isUnknown(i.date));
  if (unscheduled.length) gaps.push({ severity: "LOW", area: "production", finding: `${unscheduled.length} approved items have no date (freestyle lab).`, recommendation: "Slot them into the secondary lane or the idea bank." });

  // 9 — series registry
  const seriesUsed = countBy(live, (i) => baseSeries(i.series));
  const usedSet = new Set(seriesUsed.map(([s]) => s.toLowerCase()));
  const unusedSeries = SERIES_REGISTRY.filter((s) => !usedSet.has(s.toLowerCase()));
  if (unusedSeries.length) gaps.push({ severity: "LOW", area: "series", finding: `Series defined in the operating system but never scheduled: ${unusedSeries.join(", ")}.`, recommendation: "Either schedule them with real sources or retire them from the handbook." });

  // 10 — output arithmetic (a decision, not a quota)
  const start = dated[0]?.date;
  const end = dated.at(-1)?.date;
  const weeks = start ? Math.ceil((new Date(end) - new Date(start)) / (7 * 864e5)) : 0;
  const primary = live.filter((i) => i.lane === "primary");
  const types = cfg.production.output_types;
  const perType = Object.fromEntries(
    Object.entries(types).filter(([k]) => k !== "_doc").map(([k, t]) => [k, Math.min(live.length, Math.round(t.per_week * weeks))]),
  );
  const counted = cfg.production.counts_toward_target.reduce((s, k) => s + (perType[k] ?? 0), 0);
  const withStories = counted + (perType.instagram_story ?? 0) + (perType.facebook_story ?? 0);
  const outputs = { core_concepts: live.length, primary_days: primary.length, weeks, ...Object.fromEntries(Object.entries(perType).map(([k, v]) => [`planned_${k}`, v])), counted_outputs: counted, counted_plus_stories: withStories, target: cfg.production.target_outputs_6_months };
  if (counted < outputs.target) {
    gaps.push({ severity: "DECISION", area: "volume", finding: `At the configured cadences (TikTok ${types.tiktok.per_week}/wk, IG carousel ${types.instagram_carousel.per_week}/wk, Threads ${types.threads.per_week}/wk, LinkedIn ${types.linkedin.per_week}/wk + ${types.linkedin_carousel.per_week} carousel) the plan yields ~${counted} counted outputs (${withStories} with Stories) vs the ~${outputs.target} target.`, recommendation: "Decide: raise cadence on the cheap-to-adapt text/carousel outputs, add a secondary lane of core ideas, count Stories, or accept the lower number. Quality has priority over arithmetic." });
  }
  const noCarouselOrThreads = live.filter((i) => isUnknown(i.platform_versions?.instagram_carousel) && isUnknown(i.platform_versions?.threads) && isUnknown(i.platform_versions?.linkedin_carousel)).length;
  if (noCarouselOrThreads) {
    gaps.push({ severity: "MEDIUM", area: "platform", finding: `${noCarouselOrThreads}/${live.length} items have no Instagram carousel, Threads or LinkedIn document-carousel version — the original calendar never planned these formats.`, recommendation: "platform-adaptation adds them during enrichment: carousels for tutorials/case studies/comparisons, Threads for opinions/myths/Q&A, LinkedIn carousels for data and frameworks." });
  }

  // 11 — performance data quality
  const intelPath = resolvePath(cfg.paths.intelligence);
  const intel = readJson(intelPath, null);
  if (!published.length) gaps.push({ severity: "MEDIUM", area: "learning", finding: "No published performance imported yet.", recommendation: "Run engine/cli.mjs analytics:import-metricool." });
  else if (intel?.data_quality?.metrics_missing?.includes("retention")) gaps.push({ severity: "MEDIUM", area: "learning", finding: "TikTok retention metrics are null (Metricool lacks TikTok Business analytics scope).", recommendation: "Connect TikTok for Business analytics in Metricool so learning is not limited to views and comments." });

  // ---- apply flags
  if (flags["apply-flags"]) {
    for (const i of db.items) {
      const list = itemFlags.get(i.content_id);
      if (list) for (const [type, msg] of list) addFlag(i, type, msg);
    }
    saveDb(cfg, db);
  }

  // ---- write outputs
  const order = { HIGH: 0, DECISION: 1, MEDIUM: 2, LOW: 3 };
  gaps.sort((a, b) => order[a.severity] - order[b.severity]);
  const summary = {
    generated_at: new Date().toISOString(), today, items_analyzed: live.length, published_history: published.length,
    pillar_balance: pillarBalance, industry_balance: industryBalance, unknown_pillar: unknownPillar,
    formats: formatCounts, topics: topicCounts, markets: Object.fromEntries(marketCounts), cta: Object.fromEntries(ctaCounts), cta_stages: Object.fromEntries(stageCounts),
    hook_patterns: Object.fromEntries(patternCounts), repeated_openers: repeatedOpeners, near_duplicates: pairs.map((p) => ({ a: p.a.content_id, b: p.b.content_id, score: p.score })),
    story_evidence_needed: storyRisk.map((r) => r.item.content_id), perform_on_camera: onCamera.map((i) => i.content_id), unsourced_statistics: unsourcedStats.map((i) => i.content_id),
    enrichment_unknown: Object.fromEntries(enrichment), past_due: due.map((i) => i.content_id), unused_series: unusedSeries, outputs, gaps,
  };
  const reports = resolvePath(cfg.paths.reports_dir);
  writeJson(path.join(reports, `gap-analysis-${today}.json`), summary);
  writeJson(path.join(path.dirname(resolvePath(cfg.paths.intelligence)), "gap-latest.json"), summary);

  const md = [
    `# Content Gap Analysis — ${today}`,
    "",
    `Items analyzed: **${live.length}** (180-day calendar + freestyle lab). Published posts imported: **${published.length}**. Generated by \`engine/cli.mjs gaps\`.`,
    "",
    "## Priority gaps",
    "",
    table(["Severity", "Area", "Finding", "Recommendation"], gaps.map((g) => [g.severity, g.area, g.finding, g.recommendation])),
    "",
    "## Pillar balance (vs 00-MASTER-BRIEF targets)",
    "",
    table(["Pillar", "Items", "Share %", "Target %", "Δ pp"], pillarBalance.map((b) => [b.name, b.n, b.share, b.target, b.delta])),
    unknownPillar ? `\n_${unknownPillar} items have no pillar (freestyle lab) and are excluded from the shares' numerators._` : "",
    "",
    "## Industry balance",
    "",
    table(["Industry", "Items", "Share %", "Target %", "Δ pp"], industryBalance.map((b) => [b.name, b.n, b.share, b.target, b.delta])),
    "",
    "## Format coverage (master prompt §5 formats, detected)",
    "",
    table(["Format", "Items", "Share %"], Object.entries(formatCounts).map(([f, n]) => [f, n, pct(n, live.length)])),
    "",
    "_Humor cannot be measured until items are evaluated by humor-writing — every item is currently UNKNOWN._",
    "",
    "## Topic coverage",
    "",
    table(["Topic", "Items", "Share %"], Object.entries(topicCounts).map(([t, n]) => [t, n, pct(n, live.length)])),
    "",
    "## Market mentions",
    "",
    table(["Market", "Items mentioning it"], marketCounts),
    "",
    "## CTA",
    "",
    table(["CTA (normalized)", "Items"], ctaCounts),
    "",
    table(["Funnel stage", "Items"], stageCounts),
    "",
    "## Hooks & structures",
    "",
    table(["Hook pattern", "Items", "Share %"], patternCounts.map(([p, n]) => [p, n, pct(n, live.length)])),
    "",
    repeatedOpeners.length ? table(["Repeated opener", "Uses"], repeatedOpeners) : "_No opener exceeds the repeat limit._",
    "",
    `### Near-duplicate pairs inside the calendar (${pairs.length})`,
    "",
    pairs.length ? table(["Score", "Earlier", "Later"], pairs.slice(0, 30).map((p) => [p.score, `${p.a.content_id} ${p.a.date}: ${p.a.hook.slice(0, 70)}`, `${p.b.content_id} ${p.b.date}: ${p.b.hook.slice(0, 70)}`])) : "_None._",
    "",
    `## Story authenticity — ${storyRisk.length} items need evidence`,
    "",
    "These rows assert that something really happened (an owner showed us, a client asked, we added up a lodge's fees). The storytelling rule forbids presenting these as real without evidence.",
    "",
    table(["Item", "Date", "Claim"], storyRisk.slice(0, 60).map((r) => [r.item.content_id, r.item.date, r.claim.slice(0, 150)])),
    storyRisk.length > 60 ? `\n_…and ${storyRisk.length - 60} more (see JSON)._` : "",
    "",
    `**${onCamera.length}** further items describe a test the founder runs on camera ("I asked ChatGPT…") — legitimate, as long as the recording shows the real, unedited result.`,
    "",
    "## Enrichment completeness",
    "",
    table(["Field", "Items still UNKNOWN"], enrichment),
    "",
    "## Production reality",
    "",
    `- Today: ${today}. Calendar days on/before today still unpublished: **${due.length}**.`,
    `- Published posts found in analytics (outside the calendar): **${published.length}**.`,
    `- Undated approved items: **${unscheduled.length}**.`,
    "",
    "## Output arithmetic (decision support, not a quota)",
    "",
    table(["Measure", "Value"], Object.entries(outputs)),
    "",
    unusedSeries.length ? `## Series never scheduled\n\n${unusedSeries.join(" · ")}\n` : "",
  ].join("\n");
  const mdPath = path.join(reports, `gap-analysis-${today}.md`);
  writeText(mdPath, md);
  logRun(cfg, "gaps", { items: live.length, gaps: gaps.length, applied_flags: Boolean(flags["apply-flags"]) });
  console.log(`Gap analysis: ${gaps.length} gaps (${gaps.filter((g) => g.severity === "HIGH").length} HIGH) → ${mdPath}`);
  return summary;
}
