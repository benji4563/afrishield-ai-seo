// Deterministic classifiers used by gap analysis, QA and the factuality gate.
// They detect and flag; they never rewrite content.

export function normalizeCta(raw) {
  if (!raw) return "UNKNOWN";
  const s = String(raw).replace(/[“”"']/g, "").replace(/\s+/g, " ").trim();
  const kw = s.match(/^(comment|dm)\s+([A-Za-z]+)\b/i);
  if (kw) return `${kw[1][0].toUpperCase()}${kw[1].slice(1).toLowerCase()} ${kw[2].toUpperCase()}`;
  return s.replace(/\s*\(link in bio\)/i, "").replace(/\s*[—-]\s*link in bio/i, "");
}

export function ctaStage(cta) {
  const c = cta.toLowerCase();
  if (/book|consultation|transform|agent|free ai-visibility check|roast my rankings/.test(c)) return "conversion";
  if (/visible|audit|send me your website|ask me anything|checklist|test —|watch the full/.test(c)) return "consideration";
  if (/join|reply with|vote|refer|tried the tutorial|fail screenshot/.test(c)) return "retention";
  return "awareness";
}

// Formats from the master prompt §5, detected from the existing row's type, series and copy.
const FORMAT_RULES = [
  ["story", (x) => /^(story|founder story)$/i.test(x.format) || /transformation|diaspora bridge/i.test(x.series)],
  ["case study", (x) => /case study/i.test(x.format) || /audit|report day|roast my rankings/i.test(x.series)],
  ["tutorial", (x) => /diy|tutorial/i.test(x.format) || /get found africa|build it with me|60-second geo|glossary|fix my website/i.test(x.series)],
  ["experiment", (x) => /demo|experiment/i.test(x.format) || /concierge test|midnight test|ask ai|would ai recommend/i.test(x.series)],
  ["opinion", (x) => /hot take|opinion/i.test(x.format)],
  ["news reaction", (x) => /\b(news|update|announced|launched|rolled out|this week (google|openai|meta)|new feature)\b/i.test(x.text) || /news/i.test(x.series)],
  ["myth", (x) => /myth/i.test(x.format) || /keyword graveyard|\bmyth\b/i.test(`${x.series} ${x.text}`)],
  ["comparison", (x) => /ai vs google|commission math/i.test(x.series) || /\b(vs\.?|versus|compared|head-to-head|same question)\b/i.test(x.text)],
  ["humor", (x) => x.humorLevel && !/UNKNOWN|NO_HUMOR/.test(x.humorLevel)],
  ["behind-the-scenes", (x) => /founder/i.test(x.format) || /behind the desk|behind the scenes|bts\b|build-in-public|building in public/i.test(x.text)],
  ["screen demonstration", (x) => /screen[- ]record|screen recording|on screen|screen-share|live on camera/i.test(x.text)],
  ["proof", (x) => /report day/i.test(x.series) || /\b(receipts?|screenshot|real numbers|dashboard|results?)\b/i.test(x.text)],
  ["failure", (x) => /we were wrong|ai fails/i.test(x.series) || /\b(flopped|failed|mistake|wrong|didn't work)\b/i.test(x.text)],
  ["lesson", (x) => x.lesson && x.lesson !== "UNKNOWN"],
  ["Q&A", (x) => /faq|reflection/i.test(x.format) || /the ai question|ask elodie|duet the dms/i.test(x.series)],
];

export function detectFormats(item) {
  const ctx = {
    format: item.format ?? "",
    series: item.series ?? "",
    lesson: item.lesson,
    humorLevel: item.humor?.level,
    text: [item.hook, item.context, item.visual_concept, item.topic].join(" "),
  };
  return FORMAT_RULES.filter(([, rule]) => rule(ctx)).map(([name]) => name);
}

// Topic pillars from the master prompt §5 (broader than the calendar's 7 pillars).
const TOPIC_RULES = {
  "AI Search": /\b(ai search|ai answers?|chatgpt|perplexity|gemini|ai overview)/i,
  "AI SEO": /\b(ai seo|seo)\b/i,
  GEO: /\b(geo|generative engine|citation|entity|schema|structured data)\b/i,
  "AI visibility": /\b(visib|invisible|cited|recommend)/i,
  "AI agents": /\b(agent|receptionist|voice)\b/i,
  automation: /\b(automat|workflow|zap|n8n|pipeline)\b/i,
  "AI assistants": /\b(ai assistant|ai employee|assistant)\b/i,
  "virtual assistants": /\b(virtual (executive )?assistant|executive assistant)\b/i,
  "AI business transformation": /\b(transformation|roi|operating system|scale|scaled)\b/i,
  "African business": /\b(africa|african|lagos|nairobi|accra|douala|arusha|kigali|kampala|zanzibar|cameroon|kenya|nigeria|tanzania|ghana|rwanda)\b/i,
  "tourism/hospitality": /\b(hotel|lodge|safari|resort|tour|travel|guest|booking)\b/i,
  "real estate": /\b(real estate|property|apartment|listing|developer|agent's listing)\b/i,
  fintech: /\b(fintech|mobile money|payments?|momo|wallet|bank)\b/i,
  "beauty/skincare": /\b(beauty|skincare|salon|clinic|spa)\b/i,
  "professional services": /\b(law|lawyer|accountant|accounting|tax|consultant|firm)\b/i,
  "AI news": /\b(news|announced|launched|update|release)\b/i,
  "build-in-public": /\b(build[- ]in[- ]public|behind the desk|12-in-12|our goal|we were wrong|report day|i built|currently behind)\b/i,
};

export function detectTopics(item) {
  const text = [item.hook, item.context, item.topic, item.lesson, item.visual_concept, item.series, item.pillar].join(" ");
  return Object.entries(TOPIC_RULES).filter(([, re]) => re.test(text)).map(([k]) => k);
}

// Factuality pre-screen: sentences that assert something happened, or cite a
// number, need evidence (story bank entry or source) before they can ship as fact.
const CLAIM_RULES = [
  ["PERSONAL_EXPERIENCE", /\b(I|we)\s+(asked|tested|audited|called|messaged|checked|ran|found|watched|built|gave|added up|deleted|measured|re-ran|searched|analy[sz]ed|quit|started|whatsapp'?d|submitted|gained|lost|got|re-ran|showed|helped)\b/i],
  ["THIRD_PARTY_EVENT", /\b(a|one|this|that|my|our)\s+(client|hotel owner|lodge owner|business owner|owner|customer|partner|prospect|guest|visitor|traveler|tourist|honeymooner|buyer|clinic|lodge|hotel|firm)\s+(showed|asked|told|called|said|lost|submitted|booked|watched|got|went|missed|ranks?|made|paid|dominates)\b/i],
  ["TIME_ANCHORED_EVENT", /\b(I|we|he|she|they|a client|an owner|a lodge|a hotel)\b.*\b(last (week|month|night|year)|yesterday|this morning|on (monday|tuesday|wednesday|thursday|friday|saturday|sunday)|this week)\b|\btrue story\b/i],
  ["STATISTIC", /(\b\d+(\.\d+)?\s?%|\$\s?\d[\d,]*|\b\d{2,}[\d,]*\s+(reviews|calls|emails|searches|views|bookings|messages|clients|leads|keywords))/i],
];

export function screenClaims(text) {
  const found = [];
  const sentences = String(text ?? "").split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    // Conditionals and questions put to the viewer are not claims that something happened.
    if (/^\W*(if|what if|imagine|suppose|would|could|when you|say you)\b/i.test(s) || /\?\s*["”']?\s*$/.test(s) && !/\b(asked|said|told)\b/i.test(s)) continue;
    for (const [type, re] of CLAIM_RULES) {
      const m = s.match(re);
      if (m) found.push({ type, sentence: s.trim(), match: m[0] });
    }
  }
  return found;
}

const HYPOTHETICAL_MARKERS = /\b(imagine|picture this|hypothetical|what if|suppose|let's say|example:|for example|illustrat)/i;
export const isLabeledHypothetical = (text) => HYPOTHETICAL_MARKERS.test(text ?? "");

export function hookOpener(hook, n = 3) {
  return String(hook ?? "")
    .toLowerCase()
    .replace(/^[^a-z0-9]+/, "")
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, n)
    .join(" ");
}

export function hookPattern(hook, series) {
  const h = String(hook ?? "");
  const opener = hook ?? "";
  if (series && series !== "General" && series !== "UNKNOWN" && h.toLowerCase().startsWith(series.toLowerCase().slice(0, 8))) return "series-label opener";
  if (/^\s*"?i asked (ai|chatgpt|perplexity|gemini|claude)/i.test(h)) return "I asked AI…";
  if (/^\s*"?(i|we)\s+\w+ed\b/i.test(h)) return "first-person past event";
  if (/^\s*"?(a|one|this)\s+(hotel|lodge|client|owner|clinic|firm|business|buyer|guest)/i.test(h)) return "third-person case opener";
  if (/\?\s*"?\s*$/.test(h.split(/[.!]/)[0] + "") || /^\s*"?(why|how|what|does|do|is|are|can|will)\b/i.test(h)) return "question";
  if (/^\s*"?(here lies|rip)\b/i.test(h)) return "tombstone";
  if (/^\s*"?[\d$]/.test(opener)) return "number-led";
  if (/\b(stop|never|nobody|everyone|isn't|is not|not a|dead|wrong)\b/i.test(h.split(/[.!?]/)[0])) return "contrarian";
  return "statement";
}
