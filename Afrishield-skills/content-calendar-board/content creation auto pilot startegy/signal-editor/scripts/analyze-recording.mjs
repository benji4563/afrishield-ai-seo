// SPEECH ANALYSIS + SCRIPT COMPARISON
// node scripts/analyze-recording.mjs <recording-id> [--script path] [--corrections path] [--out dir]
// Reads public/recordings/<id>/whisper-captions.json. Writes analysis.json + analysis.md.
// Detects; never decides. The video-analysis agent reviews the report.
import fs from "node:fs";
import path from "node:path";
import { whisperToWords, applyCorrections, norm } from "./lib/words.mjs";

const args = process.argv.slice(2);
const flag = (k) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const id = args[0];
if (!id || id.startsWith("--")) {
  console.error("Usage: node scripts/analyze-recording.mjs <recording-id> [--script script.md] [--corrections corrections.json] [--out dir]");
  process.exit(1);
}
const dir = path.resolve("public", "recordings", id);
const captions = JSON.parse(fs.readFileSync(path.join(dir, "whisper-captions.json"), "utf8"));
const corrections = flag("corrections") ? JSON.parse(fs.readFileSync(flag("corrections"), "utf8")) : {};
const raw = whisperToWords(captions);
const words = applyCorrections(raw, corrections);
const outDir = path.resolve(flag("out") ?? dir);
fs.mkdirSync(outDir, { recursive: true });

const fmt = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}.${String(Math.floor((ms % 1000) / 100))}`;
const first = words[0]?.startMs ?? 0;
const last = words.at(-1)?.endMs ?? 0;

// Pauses
const pauses = [];
for (let i = 1; i < words.length; i++) {
  const gap = words[i].startMs - words[i - 1].endMs;
  if (gap >= 700) pauses.push({ atMs: words[i - 1].endMs, gapMs: gap, before: words[i - 1].text, after: words[i].text });
}
const speakingMs = last - first - pauses.reduce((s, p) => s + p.gapMs, 0);
const wpm = Math.round(words.length / Math.max(0.001, speakingMs / 60000));

// Fillers
const FILLERS = ["um", "uh", "erm", "hmm", "you know", "i mean", "basically", "kind of", "sort of"];
const fillers = [];
for (let i = 0; i < words.length; i++) {
  for (const f of FILLERS) {
    const parts = f.split(" ");
    if (parts.every((p, k) => words[i + k] && norm(words[i + k].text) === p)) fillers.push({ atMs: words[i].startMs, filler: f });
  }
}

// Repeats / stumbles: an n-gram immediately repeated ("is, is")
const repeats = [];
for (let n = 1; n <= 4; n++) {
  for (let i = 0; i + 2 * n <= words.length; i++) {
    const a = words.slice(i, i + n).map((w) => norm(w.text)).join(" ");
    const b = words.slice(i + n, i + 2 * n).map((w) => norm(w.text)).join(" ");
    if (a && a === b && !(n === 1 && a.length <= 1)) repeats.push({ atMs: words[i].startMs, phrase: words.slice(i, i + n).map((w) => w.text).join(" "), n });
  }
}

// Low-confidence words → caption/spelling review and correction candidates
const lowConfidence = raw.filter((w) => (w.confidence ?? 1) < 0.5).map((w) => ({ atMs: w.startMs, text: w.text, confidence: Number((w.confidence ?? 0).toFixed(2)) }));

// Structure signals
const text = words.map((w) => w.text).join(" ");
const hookEndIdx = words.findIndex((w) => /[.!?]$/.test(w.text));
const hookMs = hookEndIdx >= 0 ? words[hookEndIdx].endMs - first : null;
const ctas = [];
for (let i = 0; i < words.length - 1; i++) if (/^comment$/i.test(norm(words[i].text))) ctas.push({ atMs: words[i].startMs, keyword: words[i + 1].text.replace(/[^\w]/g, "") });
const PROOF = ["look at this", "here's what i found", "heres what i found", "i checked", "the data shows", "i tested", "i asked", "watch this", "here's the"];
const proofMoments = [];
for (let i = 0; i < words.length; i++) {
  for (const p of PROOF) {
    const parts = p.split(" ").map(norm);
    if (parts.every((t, k) => words[i + k] && norm(words[i + k].text) === t)) proofMoments.push({ atMs: words[i].startMs, phrase: p });
  }
}

// Pace windows (5s) — rushed / dragging sections
const windows = [];
for (let t = first; t < last; t += 5000) {
  const n = words.filter((w) => w.startMs >= t && w.startMs < t + 5000).length;
  windows.push({ atMs: t, wpm: n * 12 });
}

// Script comparison (LCS alignment on normalized tokens)
let comparison = null;
if (flag("script")) {
  const scriptText = fs.readFileSync(flag("script"), "utf8").replace(/^\s*\|?\s*-{3,}.*$/gm, " ").replace(/[|#*_>`]/g, " ");
  const S = scriptText.split(/\s+/).map((t) => ({ raw: t, n: norm(t) })).filter((t) => t.n);
  const T = words.map((w) => ({ raw: w.text, n: norm(w.text), w }));
  const m = S.length;
  const n = T.length;
  const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = S[i].n === T[j].n ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const sMatched = new Array(m).fill(false);
  const tMatched = new Array(n).fill(false);
  for (let i = 0, j = 0; i < m && j < n; ) {
    if (S[i].n === T[j].n) {
      sMatched[i] = tMatched[j] = true;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  const runs = (arr, matched, min) => {
    const out = [];
    for (let i = 0; i < arr.length; ) {
      if (matched[i]) {
        i++;
        continue;
      }
      let j = i;
      while (j < arr.length && !matched[j]) j++;
      if (j - i >= min) out.push({ from: i, to: j });
      i = j;
    }
    return out;
  };
  comparison = {
    script_tokens: m,
    coverage_pct: Math.round((sMatched.filter(Boolean).length / Math.max(1, m)) * 100),
    skipped_script_passages: runs(S, sMatched, 5).map((r) => S.slice(r.from, r.to).map((x) => x.raw).join(" ")),
    ad_libs: runs(T, tMatched, 4).map((r) => ({ atMs: T[r.from].w.startMs, text: T.slice(r.from, r.to).map((x) => x.raw).join(" ") })),
  };
}

const analysis = {
  recording: id,
  duration_ms: last,
  words: words.length,
  wpm,
  hook_ms: hookMs,
  comment_ctas: ctas,
  proof_moments: proofMoments,
  pauses,
  fillers,
  repeats,
  low_confidence: lowConfidence,
  pace_windows: windows,
  corrections_applied: words.filter((w) => w.corrected_from).map((w) => ({ atMs: w.startMs, from: w.corrected_from, to: w.text })),
  comparison,
  flags: [
    ...(hookMs !== null && hookMs > 3500 ? [`Hook sentence ends at ${fmt(hookMs)} — TikTok standing rule wants the scroll-stop inside ~3s.`] : []),
    ...(!ctas.some((c) => c.atMs - first <= 6000) ? ["No comment CTA in the first ~6s (standing rule: ~3s)."] : []),
    ...(last - first > 60000 ? [`Runtime ${fmt(last - first)} exceeds the 60s TikTok format — plan a tighter TikTok cut or log it as the 75–90s A/B test.`] : []),
    ...(lowConfidence.length ? [`${lowConfidence.length} low-confidence words — check captions for mis-hearings (names, places, brands).`] : []),
    ...(repeats.length ? [`${repeats.length} immediate repeats — likely stumbles; consider jump cuts unless the moment feels authentic.`] : []),
  ],
  transcript: text,
};
fs.writeFileSync(path.join(outDir, "analysis.json"), JSON.stringify(analysis, null, 2));

const md = [
  `# Recording analysis — ${id}`,
  "",
  `Duration **${fmt(last)}** · ${words.length} words · **${wpm} wpm** speaking pace (target 130–145) · hook sentence ends at ${hookMs === null ? "—" : fmt(hookMs)}`,
  "",
  "## Flags",
  "",
  analysis.flags.length ? analysis.flags.map((f) => `- ${f}`).join("\n") : "_None._",
  "",
  "## Comment CTAs spoken",
  "",
  ctas.length ? ctas.map((c) => `- ${fmt(c.atMs)} — "${c.keyword}"`).join("\n") : "_None._",
  "",
  "## Proof moments (narration promises evidence → edit must show real proof here)",
  "",
  proofMoments.length ? proofMoments.map((p) => `- ${fmt(p.atMs)} — "${p.phrase}"`).join("\n") : "_None detected._",
  "",
  "## Pauses ≥ 0.7s",
  "",
  pauses.length ? pauses.map((p) => `- ${fmt(p.atMs)} — ${(p.gapMs / 1000).toFixed(1)}s between "${p.before}" and "${p.after}"`).join("\n") : "_None._",
  "",
  "## Repeats / stumbles",
  "",
  repeats.length ? repeats.map((r) => `- ${fmt(r.atMs)} — "${r.phrase}" ×2`).join("\n") : "_None._",
  "",
  "## Fillers",
  "",
  fillers.length ? fillers.map((f) => `- ${fmt(f.atMs)} — ${f.filler}`).join("\n") : "_None._",
  "",
  "## Low-confidence words (review captions)",
  "",
  lowConfidence.length ? lowConfidence.map((w) => `- ${fmt(w.atMs)} — "${w.text}" (${w.confidence})`).join("\n") : "_None._",
  "",
  analysis.corrections_applied.length ? `## Corrections applied\n\n${analysis.corrections_applied.map((c) => `- ${fmt(c.atMs)} — "${c.from}" → "${c.to}"`).join("\n")}\n` : "",
  comparison
    ? [
        "## Script comparison",
        "",
        `Script coverage: **${comparison.coverage_pct}%** of scripted words were said.`,
        "",
        "**Ad-libs (said but not scripted) — review for authentic moments worth keeping:**",
        "",
        comparison.ad_libs.map((a) => `- ${fmt(a.atMs)} — "${a.text}"`).join("\n") || "_None._",
        "",
        "**Script passages skipped:**",
        "",
        comparison.skipped_script_passages.map((s) => `- "${s.slice(0, 200)}"`).join("\n") || "_None._",
      ].join("\n")
    : "_No script supplied — pass --script to compare what was said against the plan._",
  "",
  "## Transcript (corrected)",
  "",
  `> ${text}`,
].join("\n");
fs.writeFileSync(path.join(outDir, "analysis.md"), md);
console.log(`Analysis → ${path.join(outDir, "analysis.md")}\n${analysis.flags.map((f) => `- ${f}`).join("\n")}`);
