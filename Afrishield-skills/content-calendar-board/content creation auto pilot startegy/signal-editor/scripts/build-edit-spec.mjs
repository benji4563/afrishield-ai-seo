// VISUAL TIMELINE → EDIT SPEC
// node scripts/build-edit-spec.mjs <recording-id> --cues cues.json [--corrections c.json] [--from-ms 0] [--to-ms 45000] [--out-id name]
//
// cues.json: { "emphasis": ["words"], "cues": [ { "phrase": "rented land", "endPhrase": "on a Tuesday", "component": "SignalPath",
//              "props": {...}, "holdMs": 2500, "leadMs": 150, "tailMs": 300 } ] }
// Each cue is anchored to where the phrase was ACTUALLY spoken. Cues whose phrase was not said are
// dropped and reported — the edit follows the recording, not the script.
import fs from "node:fs";
import path from "node:path";
import { whisperToWords, applyCorrections, buildBursts, findPhrase, norm } from "./lib/words.mjs";

const args = process.argv.slice(2);
const flag = (k) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const id = args[0];
if (!id || id.startsWith("--") || !flag("cues")) {
  console.error("Usage: node scripts/build-edit-spec.mjs <recording-id> --cues cues.json [--corrections c.json] [--from-ms N] [--to-ms N] [--out-id name] [--production-dir dir]");
  process.exit(1);
}
const FULLSCREEN = new Set(["Screenshot", "BrowserFrame", "AIChat", "SearchResult", "Dashboard", "SignalPath", "BeforeAfter", "Comparison"]);
const PROOF_PHRASES = ["look at this", "here's what i found", "i checked", "the data shows", "i tested", "watch this"];

const recDir = path.resolve("public", "recordings", id);
const cueFile = JSON.parse(fs.readFileSync(flag("cues"), "utf8"));
const corrections = { ...(cueFile.corrections ?? {}), ...(flag("corrections") ? JSON.parse(fs.readFileSync(flag("corrections"), "utf8")) : {}) };
const all = applyCorrections(whisperToWords(JSON.parse(fs.readFileSync(path.join(recDir, "whisper-captions.json"), "utf8"))), corrections);
const fromMs = Number(flag("from-ms") ?? 0);
const toMs = Number(flag("to-ms") ?? (all.at(-1)?.endMs ?? 0) + 800);
const words = all.filter((w) => w.startMs >= fromMs && w.endMs <= toMs);
const outId = flag("out-id") ?? `${id}-edit`;

// Captions
const bursts = buildBursts(words, { emphasis: cueFile.emphasis ?? [] });
const captionRel = `recordings/${id}/${outId}.bursts.json`;
fs.writeFileSync(path.resolve("public", captionRel), JSON.stringify({ version: 1, bursts }, null, 2));

// Cues → events
const events = [];
const warnings = [];
let cursor = 0;
for (const [n, cue] of (cueFile.cues ?? []).entries()) {
  const m = findPhrase(words, cue.phrase, cursor);
  if (!m) {
    warnings.push({ type: "CUE_NOT_SPOKEN", cue: n, phrase: cue.phrase, component: cue.component, message: "Phrase not found in the recording — cue dropped." });
    continue;
  }
  if (m.outOfOrder) warnings.push({ type: "CUE_OUT_OF_ORDER", cue: n, phrase: cue.phrase, message: "Spoken earlier than the previous cue — check the cue order." });
  if (m.score < 1) warnings.push({ type: "FUZZY_MATCH", cue: n, phrase: cue.phrase, matched: words.slice(m.index, m.end + 1).map((w) => w.text).join(" "), message: `Matched ${Math.round(m.score * 100)}% of words.` });
  // Cursor stays at the match start so several cues can share one spoken phrase.
  cursor = m.index;
  const startMs = Math.max(0, words[m.index].startMs - (cue.leadMs ?? 120) - fromMs);
  let endMs = startMs + (cue.holdMs ?? 2500);
  if (cue.endPhrase) {
    const e = findPhrase(words, cue.endPhrase, m.index);
    if (e) endMs = words[e.end].endMs + (cue.tailMs ?? 300) - fromMs;
    else warnings.push({ type: "END_PHRASE_NOT_SPOKEN", cue: n, phrase: cue.endPhrase, message: `Using holdMs ${cue.holdMs ?? 2500}.` });
  }
  // Nodes/steps with `atPhrase` appear exactly when that word is spoken.
  const props = structuredClone(cue.props ?? {});
  for (const key of ["nodes", "steps"]) {
    if (!Array.isArray(props[key])) continue;
    let nodeCursor = m.index;
    for (const node of props[key]) {
      if (!node?.atPhrase) continue;
      const hit = findPhrase(words, node.atPhrase, nodeCursor);
      if (hit && !hit.outOfOrder) {
        node.atMs = Math.max(0, words[hit.index].startMs - fromMs - startMs);
        nodeCursor = hit.index;
      } else warnings.push({ type: "NODE_PHRASE_NOT_SPOKEN", cue: n, phrase: node.atPhrase, message: `${cue.component} node "${node.label}" falls back to even spacing.` });
      delete node.atPhrase;
    }
  }
  events.push({ id: cue.id ?? `c${n}`, component: cue.component, startMs, endMs, props, trigger: { phrase: cue.phrase, matched: words.slice(m.index, m.end + 1).map((w) => w.text).join(" ") } });
}

// A full-screen visual never overlaps the next full-screen visual.
const fs1 = events.filter((e) => FULLSCREEN.has(e.component)).sort((a, b) => a.startMs - b.startMs);
for (let i = 0; i < fs1.length - 1; i++) {
  if (fs1[i].endMs > fs1[i + 1].startMs - 60) {
    fs1[i].endMs = fs1[i + 1].startMs - 60;
    warnings.push({ type: "TRIMMED_OVERLAP", event: fs1[i].id, message: `Ended early so ${fs1[i + 1].component} can take the frame.` });
  }
}

// Proof-first check: narration promises evidence but no proof visual is on screen.
for (let i = 0; i < words.length; i++) {
  for (const p of PROOF_PHRASES) {
    const parts = p.split(" ").map(norm);
    if (!parts.every((t, k) => words[i + k] && norm(words[i + k].text) === t)) continue;
    const t = words[i].startMs - fromMs;
    const covered = events.some((e) => (FULLSCREEN.has(e.component) || e.component === "ProofFlash") && e.startMs <= t + 1500 && e.endMs >= t - 500);
    if (!covered) warnings.push({ type: "PROOF_MOMENT_WITHOUT_PROOF", atMs: t, phrase: p, message: "Narration promises evidence here — add the real screenshot/recording." });
  }
}

const spec = {
  id: outId,
  content_id: cueFile.content_id,
  fps: 30,
  width: 1080,
  height: 1920,
  durationMs: toMs - fromMs,
  // Prefer the H.264 edit proxy (browsers can't decode HEVC phone footage).
  source: { video: `recordings/${id}/${fs.existsSync(path.join(recDir, "edit-proxy.mp4")) ? "edit-proxy.mp4" : "source.mp4"}`, trimStartMs: fromMs, volume: 1 },
  captions: { src: captionRel },
  events: events.sort((a, b) => a.startMs - b.startMs),
};
const specRel = `specs/${outId}.json`;
fs.mkdirSync(path.resolve("public", "specs"), { recursive: true });
fs.writeFileSync(path.resolve("public", specRel), JSON.stringify(spec, null, 2));

const fmt = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}.${Math.floor((ms % 1000) / 100)}`;
const report = [
  `# Edit spec — ${outId}`,
  "",
  `Recording \`${id}\` · window ${fmt(fromMs)}–${fmt(toMs)} · ${bursts.length} caption bursts · ${events.length} visual events`,
  "",
  "## Timeline",
  "",
  "| Start | End | Component | Anchored to (actually said) |",
  "|---|---|---|---|",
  ...spec.events.map((e) => `| ${fmt(e.startMs)} | ${fmt(e.endMs)} | ${e.component} | "${e.trigger.matched}" |`),
  "",
  "## Warnings",
  "",
  warnings.length ? warnings.map((w) => `- **${w.type}** — ${w.phrase ? `"${w.phrase}" ` : ""}${w.matched ? `(heard "${w.matched}") ` : ""}${w.message}`).join("\n") : "_None._",
].join("\n");
fs.writeFileSync(path.resolve("public", "specs", `${outId}.report.md`), report);
const prod = flag("production-dir");
if (prod) {
  fs.mkdirSync(prod, { recursive: true });
  fs.writeFileSync(path.join(prod, "edit-spec.json"), JSON.stringify(spec, null, 2));
  fs.writeFileSync(path.join(prod, "edit-report.md"), report);
}
console.log(report);
