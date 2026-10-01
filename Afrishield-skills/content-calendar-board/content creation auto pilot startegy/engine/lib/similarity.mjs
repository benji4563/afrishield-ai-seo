// Semantic-ish similarity without an embedding API: phrase normalization → concept
// tokens → TF-IDF cosine blended with concept-set Jaccard. Tuned so that
// "Why ChatGPT doesn't recommend your hotel" ≈ "Why your hotel is invisible in ChatGPT"
// (duplicate) while "I tested 20 Tanzanian hotels in ChatGPT" is only related and
// carries a NEW_PROOF angle. Scores are a decision aid; the idea-generation agent
// makes the final call on anything in the RELATED band.

const PHRASES = [
  [/\b(does\s*n[o']?t|doesnt|do not|dont|don't|never|won't|wont|isn't|isnt|is not|not|can't|cant|cannot|fails? to)\s+(even\s+)?(recommend|recommends|mention|mentions|cite|cites|show up|shows up|appear|appears|name|names|know|knows|find|finds|list|lists|see|sees)\b/g, " invisible "],
  [/\b(never heard of|nowhere to be found|doesn't exist|does not exist|not found|zero results|left out|missing from|ignored by|ignores?)\b/g, " invisible "],
  [/\b(ai search|ai answers?|ai engines?|ai assistants? search|answer engines?|generative search|ai overviews?|search generative experience|sge)\b/g, " ai_engine "],
  [/\b(google business profile|gbp|google my business|gmb)\b/g, " gbp "],
  [/\b(voice agents?|ai receptionists?|virtual receptionists?|phone agents?)\b/g, " voice_agent "],
  [/\b(virtual (executive )?assistants?|ai assistants?|ai employees?|executive assistants?)\b/g, " ai_assistant "],
  [/\b(online travel agenc(y|ies)|otas?|booking\.com|expedia|airbnb)\b/g, " ota "],
  [/\b(missed calls?|unanswered (calls?|phones?)|voicemails?)\b/g, " missed_call "],
  [/\b(schema( markup)?|structured data|json-ld)\b/g, " schema "],
  [/\b(robots\.txt|crawlers?|gptbot|perplexitybot|claudebot)\b/g, " crawler "],
  [/\b(generative engine optimi[sz]ation|geo)\b/g, " geo "],
  [/\b(search engine optimi[sz]ation|seo)\b/g, " seo "],
];

const SYNONYMS = {
  ai_engine: ["chatgpt", "gpt", "perplexity", "gemini", "claude", "copilot", "llm", "llms", "ai", "openai", "grok", "deepseek"],
  lodging: ["hotel", "hotels", "lodge", "lodges", "resort", "resorts", "guesthouse", "guesthouses", "hostel", "accommodation", "bnb", "villa"],
  safari: ["safari", "safaris", "tour", "tours", "operator", "operators", "itinerary"],
  invisible: ["invisible", "unseen", "undiscoverable", "hidden", "absent", "missing"],
  recommend: ["recommend", "recommends", "recommended", "recommendation", "cite", "cited", "cites", "citation", "citations", "mention", "mentioned", "mentions", "named", "suggest", "suggests", "shortlist"],
  website: ["website", "websites", "site", "sites", "homepage", "webpage", "domain"],
  booking: ["booking", "bookings", "book", "booked", "reservation", "reservations"],
  review: ["review", "reviews", "rating", "ratings", "stars", "tripadvisor"],
  whatsapp: ["whatsapp", "dm", "dms", "inbox", "message", "messages"],
  law: ["law", "lawyer", "lawyers", "legal", "attorney", "advocate", "advocates"],
  accounting: ["accountant", "accountants", "accounting", "tax", "bookkeeping", "audit firm"],
  realestate: ["property", "properties", "real", "estate", "realtor", "apartment", "apartments", "listing", "listings", "developer", "developers"],
  clinic: ["clinic", "clinics", "dental", "dentist", "medical", "doctor", "skincare", "beauty", "salon", "salons"],
  traffic: ["traffic", "visitors", "clicks", "impressions"],
  restaurant: ["restaurant", "restaurants", "cafe", "food", "eat"],
};

const STOP = new Set(
  ("a an the and or but if then so to of in on at by for from with without into onto over under about as is are was were be been being am do does did doing " +
    "have has had having it its it's this that these those there here here's what which who whom whose why how when where your you you're yours my me i i'm we our us " +
    "they them their he she his her not no yes just only very really can could should would will shall may might must also than too more most much many some any all " +
    "one two three get got gets make makes made let let's lets like thing things way ways still even ever now today new vs versus s t").split(/\s+/),
);

const WORD_TO_CONCEPT = Object.fromEntries(Object.entries(SYNONYMS).flatMap(([c, ws]) => ws.map((w) => [w, c])));

function stem(w) {
  if (w.length <= 4 || w.includes("_")) return w;
  return w.replace(/(ies)$/, "y").replace(/(ing|ed|es|s)$/, "");
}

export function tokens(text) {
  let t = ` ${String(text ?? "").toLowerCase()} `.replace(/[’‘]/g, "'");
  for (const [re, rep] of PHRASES) t = t.replace(re, rep);
  return t
    .replace(/[^a-z0-9_'\s]/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^'+|'+$/g, ""))
    .filter((w) => w && !STOP.has(w) && !/^\d+$/.test(w))
    .map((w) => WORD_TO_CONCEPT[w] ?? stem(w));
}

export function buildIdf(docs) {
  const df = new Map();
  for (const d of docs) for (const tok of new Set(tokens(d))) df.set(tok, (df.get(tok) ?? 0) + 1);
  const n = docs.length;
  return (tok) => Math.log((n + 1) / ((df.get(tok) ?? 0) + 1)) + 1;
}

function vector(toks, idf) {
  const tf = new Map();
  for (const t of toks) tf.set(t, (tf.get(t) ?? 0) + 1);
  const v = new Map();
  for (const [t, c] of tf) v.set(t, c * idf(t));
  return v;
}

function cosine(a, b) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (const [, x] of a) na += x * x;
  for (const [, y] of b) nb += y * y;
  for (const [t, x] of a) if (b.has(t)) dot += x * b.get(t);
  return na && nb ? dot / Math.sqrt(na * nb) : 0;
}

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

export function similarity(textA, textB, idf = () => 1) {
  const ta = tokens(textA);
  const tb = tokens(textB);
  return 0.65 * cosine(vector(ta, idf), vector(tb, idf)) + 0.35 * jaccard(ta, tb);
}

// Evidence that an idea adds something a near-duplicate lacks.
export function angleMarkers(text) {
  const t = String(text ?? "").toLowerCase();
  const markers = new Set();
  if (/\b(i|we)\s+(tested|audited|measured|ran|analy[sz]ed|surveyed|checked|scraped|benchmarked|tracked|compared)\b/.test(t) || /\b(study|dataset|data shows|experiment|results?|benchmark|here'?s what i found|we found)\b/.test(t)) markers.add("NEW_PROOF");
  if (/\b(launched|announced|rolled out|just released|new update|this week|update:)\b/.test(t)) markers.add("NEW_INFORMATION");
  if (/\b(last (week|month|year)|yesterday|when i|the day i|true story|a client|my client|i built|i quit|i started)\b/.test(t)) markers.add("NEW_STORY");
  if (/\b(step[- ]by[- ]step|how to|tutorial|template|checklist|build it)\b/.test(t)) markers.add("NEW_APPLICATION");
  return markers;
}

// Published-history items only have a caption, so it stands in for topic and hook.
const fieldsOf = (x) => {
  const known = (v) => v && v !== "UNKNOWN";
  const topic = [x.title, x.topic, x.core_idea].filter(known).join(" ");
  const hook = known(x.hook) ? x.hook : "";
  const caption = known(x.caption) && !topic && !hook ? String(x.caption).replace(/#\w+/g, "").slice(0, 220) : "";
  return { topic: topic || caption, hook: hook || caption };
};

// Compare one candidate against a corpus of content objects. The score is the max of
// topic-vs-topic, hook-vs-hook and full-text similarity, because a reworded hook on
// the same topic is still the same post.
export function compareToCorpus(candidate, corpus, { duplicate, related }, idf) {
  const c = fieldsOf(candidate);
  const cFull = `${c.topic} ${c.hook}`;
  const cMarkers = angleMarkers(cFull);
  const matches = [];
  for (const item of corpus) {
    const f = fieldsOf(item);
    const scores = [similarity(cFull, `${f.topic} ${f.hook}`, idf)];
    if (c.topic && f.topic) scores.push(similarity(c.topic, f.topic, idf));
    if (c.hook && f.hook) scores.push(similarity(c.hook, f.hook, idf));
    const score = Math.max(...scores);
    if (score < related) continue;
    const itemMarkers = angleMarkers(`${f.topic} ${f.hook}`);
    const newAngles = [...cMarkers].filter((m) => !itemMarkers.has(m));
    let verdict = score >= duplicate ? "DUPLICATE" : "RELATED";
    if (verdict === "DUPLICATE" && newAngles.length) verdict = "RELATED_NEW_ANGLE";
    matches.push({ id: item.content_id ?? item.idea_id, score: Number(score.toFixed(3)), verdict, new_angles: newAngles, hook: f.hook || f.topic });
  }
  matches.sort((a, b) => b.score - a.score);
  const top = matches[0];
  const verdict = !top ? "DISTINCT" : top.verdict === "DUPLICATE" ? "DUPLICATE" : "RELATED";
  return { verdict, matches: matches.slice(0, 5) };
}
