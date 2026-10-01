// Transcript utilities shared by analyze-recording and build-edit-spec.

export const norm = (s) => String(s ?? "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9%$]/g, "");

// whisper.cpp token captions → words. Tokens without a leading space continue the
// previous word ("Trigy" + "Pity"). Drops [BLANK_AUDIO] and stray quote tokens.
export function whisperToWords(captions) {
  const words = [];
  let boundary = true;
  for (const c of captions) {
    const raw = String(c.text ?? "");
    if (!raw.trim() || /^\s*\[.*\]\s*$/.test(raw)) continue;
    const clean = raw.replace(/["“”]/g, "").trim();
    // A dropped quote token still separates words: `conversation."` + `This` → two words.
    if (!clean) {
      boundary = true;
      continue;
    }
    const startsNew = /^\s/.test(raw) || words.length === 0 || boundary || /^["“”]/.test(raw);
    boundary = /["“”]\s*$/.test(raw);
    if (startsNew) words.push({ text: clean, startMs: c.startMs, endMs: c.endMs, confidence: c.confidence ?? 1 });
    else {
      const w = words[words.length - 1];
      w.text += clean;
      w.endMs = c.endMs;
      w.confidence = Math.min(w.confidence, c.confidence ?? 1);
    }
  }
  // Markers like [BLANK_AUDIO] can arrive split across several tokens; drop them after merging.
  return words.filter((w) => !/^\[.*\]$/.test(w.text) && !/^[\[\]_]+$/.test(w.text));
}

// Corrections map mis-heard words/phrases to what was actually said, e.g.
// { "TrigyPity": "ChatGPT", "bonamos adi": "Bonamoussadi" }. Multi-word keys merge words.
export function applyCorrections(words, corrections = {}) {
  const rules = Object.entries(corrections).map(([k, v]) => ({ from: k.split(/\s+/).map(norm), to: v })).sort((a, b) => b.from.length - a.from.length);
  const out = [];
  for (let i = 0; i < words.length; i++) {
    const rule = rules.find((r) => r.from.every((t, k) => words[i + k] && norm(words[i + k].text) === t));
    if (!rule) {
      out.push({ ...words[i] });
      continue;
    }
    const last = words[i + rule.from.length - 1];
    const trailing = last.text.match(/[.,!?;:]+$/)?.[0] ?? "";
    out.push({ text: rule.to + trailing, startMs: words[i].startMs, endMs: last.endMs, confidence: 1, corrected_from: words.slice(i, i + rule.from.length).map((w) => w.text).join(" ") });
    i += rule.from.length - 1;
  }
  return out;
}

const STOP = new Set("a an the and or but if to of in on at by for from with is are was were be it its this that you your i we they he she not do does did so as just about there here what who how when where can will would".split(" "));

// Bursts of 2–5 words: break on max words, on a pause, or after sentence punctuation.
export function buildBursts(words, { maxWords = 4, maxGapMs = 380, emphasis = [] } = {}) {
  const emph = new Set(emphasis.map(norm));
  const bursts = [];
  let cur = [];
  const flush = () => {
    if (!cur.length) return;
    const ws = cur.map((w) => ({ text: w.text, startMs: w.startMs, endMs: w.endMs, emphasis: emph.has(norm(w.text)) }));
    if (!ws.some((w) => w.emphasis)) {
      const candidates = ws.filter((w) => !STOP.has(norm(w.text)) && norm(w.text).length >= 6);
      const pick = candidates.sort((a, b) => norm(b.text).length - norm(a.text).length)[0];
      if (pick && ws.length >= 2) pick.emphasis = true;
    }
    bursts.push({ startMs: ws[0].startMs, endMs: ws[ws.length - 1].endMs, words: ws });
    cur = [];
  };
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const prev = cur[cur.length - 1];
    if (prev && (cur.length >= maxWords || w.startMs - prev.endMs > maxGapMs)) flush();
    cur.push(w);
    // A sentence end always closes the burst — never "TUESDAY. WHITE HOUSE".
    if (/[.!?]$/.test(w.text)) flush();
  }
  flush();
  return bursts;
}

// Find a spoken phrase in the word list from a cursor, tolerant of whisper errors.
export function findPhrase(words, phrase, from = 0) {
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  if (!target.length) return null;
  const n = target.length;
  const scan = (start, end) => {
    let best = null;
    for (let i = start; i <= end - n; i++) {
      let hits = 0;
      for (let k = 0; k < n; k++) if (norm(words[i + k].text) === target[k]) hits++;
      const score = hits / n;
      if (score === 1) return { index: i, end: i + n - 1, score };
      if (!best || score > best.score) best = { index: i, end: i + n - 1, score };
    }
    return best;
  };
  let m = scan(from, words.length);
  if (m && m.score >= 0.7) return { ...m, outOfOrder: false };
  m = scan(0, words.length);
  if (m && m.score >= 0.7) return { ...m, outOfOrder: m.index < from };
  return null;
}
