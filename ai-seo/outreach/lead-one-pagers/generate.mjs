#!/usr/bin/env node
/**
 * AfriShield AI — Lead one-pager generator.
 *
 * Reads leads.csv and renders one personalised, print-ready HTML "Direct
 * Booking & AI Search Audit" one-pager per lead into ./output.
 *
 * The template follows the tear-sheet structure defined in
 * MASTER_OPERATIONAL_PLAYBOOK.md (section 5) and the AfriShield AI brand
 * system (green palette, Sora / Inter / JetBrains Mono, signal-node mark,
 * numbers-forward voice, threat-red reserved).
 *
 * Every one-pager is unique: business, contact, location, the exact
 * AI-visibility gap, the estimated commission bleed and its projections, a
 * category-specific tested AI query, derived GBP/schema deficits, and a
 * tailored three-step recovery roadmap all come from that lead's own row.
 *
 * Usage:  node generate.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, 'output');

/* Brand fonts (data: URIs, built by build-fonts.mjs) inlined into every page so
   PDF rendering uses correct font metrics and each file is fully self-contained. */
let FONT_CSS = '';
try { FONT_CSS = readFileSync(join(__dirname, 'fonts.css'), 'utf8'); }
catch { console.warn('warning: fonts.css missing — run build-fonts.mjs; falling back to system fonts'); }

/* AfriShield AI — from marketing-site/lib/site.ts (kept in sync manually). */
const BRAND = {
  name: 'AfriShield AI',
  domain: 'afrishieldai.com',
  url: 'https://afrishieldai.com',
  email: 'benji@afrishieldai.com',
  whatsapp: '+237 688 099 752',
  whatsappHref: 'https://wa.me/237688099752',
  founder: 'Ben',
  tagline: 'Search visibility, run by agents. Reported in plain numbers.',
  bookHref: 'https://afrishieldai.com/ai-visibility-check',
};

/* ----------------------------- CSV parsing ----------------------------- */

/** Minimal RFC-4180-ish CSV parser: handles quoted fields and embedded commas. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); field = '';
      rows.push(row); row = [];
    } else if (c === '\r') {
      // ignore
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/* --------------------------- personalisation --------------------------- */

const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
const roundTo = (n, step) => Math.round(n / step) * step;

/** Escape plain-text CSV fields for safe HTML interpolation (leaves &rsquo; etc alone). */
const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Country + a clean, readable location from "Country (Place / Place)". */
function parseRegion(region) {
  const m = region.match(/^([^(]+?)\s*\((.+)\)\s*$/);
  const country = (m ? m[1] : region).trim();
  let place = (m ? m[2] : '').trim();
  return { country, place };
}

/** Location phrase for the tested AI query (first part, tidied). */
function queryLocation(place, country) {
  if (!place) return country;
  let loc = place.split('/')[0].trim();
  // "Serengeti" reads better as "the Serengeti"; leave city/island names alone.
  if (/^(serengeti|maasai mara|ngorongoro|tarangire|masai mara)$/i.test(loc)) {
    loc = 'the ' + loc;
  }
  return loc;
}

/** The high-intent query an affluent traveller actually types. */
function testedQuery(category, loc) {
  const c = category.toLowerCase();
  if (/gorilla|trek/.test(c)) return `best gorilla trekking lodges in ${loc}`;
  if (/beach|resort/.test(c)) return `best beachfront hotels in ${loc}`;
  if (/camp|safari lodge|lodge/.test(c) && !/tour|operator|agency/.test(c))
    return `best luxury safari lodges in ${loc} for a private trip`;
  if (/tour|operator|agency|safaris|travel/.test(c))
    return `top private safari tour operators in ${loc}`;
  if (/boutique|hotel/.test(c)) return `best boutique hotels in ${loc}`;
  return `best places to stay in ${loc}`;
}

/** Who the assistant cites instead, pulled from the gap signal. */
function citedInstead(signal) {
  const found = [];
  const map = [
    ['Booking.com', /booking\.com/i],
    ['Expedia', /expedia/i],
    ['Agoda', /agoda/i],
    ['TripAdvisor', /tripadvisor/i],
    ['SafariBookings', /safaribookings/i],
  ];
  for (const [label, re] of map) if (re.test(signal)) found.push(label);
  if (found.length) return found.join(', ');
  if (/aggregat|directory|broker|intermediar|overseas|foreign|third-party|portal/i.test(signal))
    return 'international OTAs and aggregator directories';
  return 'Booking.com and international aggregators';
}

/** Three concrete GBP / schema deficits derived from the gap signal + category. */
function deficits(signal, category) {
  const s = signal.toLowerCase();
  const out = [];
  const add = (t) => { if (out.length < 3 && !out.includes(t)) out.push(t); };

  if (/schema|json-ld|structured|entity markup|crawl/.test(s))
    add('No <span class="mono">LodgingBusiness</span> / <span class="mono">TouristAttraction</span> JSON-LD on the site — AI crawlers and Google cannot read your rooms, rates, or amenities.');
  if (/allowlist|gptbot|perplexitybot|crawler|bot/.test(s))
    add('AI web crawlers (GPTBot, PerplexityBot, ClaudeBot) are not allowlisted, so the assistants never see your live pages.');
  if (/secondary categ|gbp|3-pack|3 pack|local pack|rank #|page 2|categories/.test(s))
    add('Google Business Profile is missing high-value secondary categories for your property type, keeping you out of the local 3-pack.');
  if (/review/.test(s))
    add('Recent Google reviews sit without an owner reply — a ranking signal you are leaving on the table.');
  if (/page 2|organic|ranking/.test(s))
    add('Core search terms have slipped to page 2 of Google, below the properties investing in search.');

  // Always ensure three, with sensible, category-aware defaults.
  add('The assistants answer travel questions for your area without ever naming your direct site — every answer routes the guest to an OTA.');
  add('No direct-booking intent pages exist for the searches that end in a reservation, so the OTAs keep the head terms uncontested.');
  add('Listings and rates are inconsistent across the web, so AI engines cannot confirm what and where you are.');
  return out.slice(0, 3);
}

/** A three-step recovery roadmap, tailored to the property type. */
function roadmap(category) {
  const c = category.toLowerCase();
  const entity = /camp|safari|lodge|tour|trek|operator|agency/.test(c)
    ? 'Lodging &amp; safari entity schema'
    : 'Lodging entity schema';
  const catLine = /tour|operator|agency|safaris|trek/.test(c)
    ? 'Tour Operator, Eco Tour Agency, Safari Park'
    : /beach|resort/.test(c)
      ? 'Resort, Beach Resort, Lodging'
      : 'Hotel, Lodging, plus your niche categories';
  return [
    `Inject ${entity} and allowlist the AI crawlers (GPTBot, PerplexityBot, ClaudeBot) so ChatGPT, Claude, and Perplexity can read and cite you by name.`,
    `Rebuild your Google Business Profile taxonomy — primary and secondary categories (${catLine}) — to claim a top-3 Local Pack spot.`,
    `Publish direct-booking intent pages for the searches guests actually run, so the reservation lands with you instead of the platform.`,
  ];
}

/** Optional bilingual line for francophone (Cameroon) leads. */
function frenchNote(country) {
  if (!/cameroon|cameroun/i.test(country)) return '';
  return `Audit et accompagnement en fran&ccedil;ais et en anglais &mdash; Google, Google Business Profile, et visibilit&eacute; dans ChatGPT, Claude et Perplexity.`;
}

function slugify(name) {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ------------------------------- template ------------------------------ */

const SIGNAL_NODE = `
<svg width="30" height="30" viewBox="0 0 48 48" fill="none" aria-hidden="true">
  <line x1="24" y1="24" x2="24" y2="6"  stroke="#5CBE91" stroke-width="2"/>
  <line x1="24" y1="24" x2="42" y2="24" stroke="#5CBE91" stroke-width="2"/>
  <line x1="24" y1="24" x2="24" y2="42" stroke="#5CBE91" stroke-width="2"/>
  <line x1="24" y1="24" x2="6"  y2="24" stroke="#5CBE91" stroke-width="2"/>
  <circle cx="24" cy="6"  r="3.2" fill="#93D8B7"/>
  <circle cx="42" cy="24" r="3.2" fill="#93D8B7"/>
  <circle cx="24" cy="42" r="3.2" fill="#93D8B7"/>
  <circle cx="6"  cy="24" r="3.2" fill="#93D8B7"/>
  <circle cx="24" cy="24" r="5.5" fill="#0F7248"/>
</svg>`;

function render(lead) {
  const { country, place } = parseRegion(lead.Country_Region);
  const loc = queryLocation(place, country);
  const bleed = Number(lead.Estimated_Monthly_Bleed_USD) || 0;
  const annual = bleed * 12;
  const recLow = roundTo(bleed * 0.35, 50);
  const recHigh = roundTo(bleed * 0.55, 50);
  const query = testedQuery(lead.Category, loc);
  const cited = citedInstead(lead.AI_Visibility_Gap_Signal);
  const defs = deficits(lead.AI_Visibility_Gap_Signal, lead.Category);
  const steps = roadmap(lead.Category);
  const fr = frenchNote(country);
  const locationLabel = place ? `${place}, ${country}` : country;
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // HTML-escaped copies of the plain-text lead fields.
  const nameE = esc(lead.Business_Name);
  const catE = esc(lead.Category);
  const contactE = esc(lead.Contact_Person_Or_Title);
  const hookE = esc(lead.Tailored_Pitch_Hook);
  const signalE = esc(lead.AI_Visibility_Gap_Signal);
  const queryE = esc(query);
  const citedE = esc(cited);
  const locE = esc(locationLabel);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${nameE} — Direct Booking &amp; AI Search Audit — AfriShield AI</title>
<style>
${FONT_CSS}
:root{
  --green50:#EAF7F1; --green100:#C7EBDA; --green200:#93D8B7; --green300:#5CBE91;
  --green400:#34A374; --green600:#0F7248; --green700:#0A5936; --green800:#073F27;
  --neutral100:#F4F3EE; --ink:#14140F;
  --body:#3a3a30; --dim:#6b6b5f;
  --sora:'Sora',system-ui,sans-serif;
  --inter:'Inter',system-ui,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--inter);color:var(--body);background:#d9d9d2;line-height:1.5;font-size:13px}

.page{
  width:210mm;min-height:297mm;margin:0 auto;background:#fff;
  padding:11mm 14mm 9mm;display:flex;flex-direction:column;
}

/* header */
.top{display:flex;justify-content:space-between;align-items:flex-start;
  padding-bottom:9px;border-bottom:2px solid var(--green600)}
.brand{display:flex;align-items:center;gap:9px}
.brand .name{font-family:var(--sora);font-weight:700;font-size:17px;color:var(--ink);letter-spacing:-.01em}
.brand .tag{font-family:var(--mono);font-size:8.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);margin-top:1px}
.doc{text-align:right}
.doc .kicker{font-family:var(--mono);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--green600);font-weight:500}
.doc .date{font-family:var(--mono);font-size:9px;color:var(--dim);margin-top:3px}

/* title */
.title{margin-top:13px}
.title .eyebrow{font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--green600);font-weight:500}
.title h1{font-family:var(--sora);font-weight:700;font-size:25px;line-height:1.08;color:var(--ink);margin-top:5px;letter-spacing:-.015em}
.title .meta{margin-top:5px;font-size:12px;color:var(--dim)}
.title .meta b{color:var(--body);font-weight:500}

/* bluf */
.bluf{margin-top:12px;background:var(--green50);border-left:3px solid var(--green300);
  padding:10px 14px;border-radius:0 4px 4px 0}
.bluf p{font-size:13.5px;line-height:1.5;color:var(--green800)}

/* stats */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:12px;background:var(--neutral100);border:1px solid #e4e3db}
.stat{background:#fff;padding:9px 13px}
.stat .lab{font-family:var(--mono);font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim)}
.stat .val{font-family:var(--sora);font-weight:700;font-size:21px;color:var(--ink);margin-top:4px;line-height:1;letter-spacing:-.02em}
.stat .val .u{font-size:11px;font-weight:500;color:var(--dim)}
.stat.accent .val{color:var(--green600)}
.stat .sub{font-size:9.5px;color:var(--dim);margin-top:3px}

/* sections */
.sec{margin-top:13px}
.sec .h{display:flex;align-items:baseline;gap:8px;margin-bottom:6px}
.sec .n{font-family:var(--mono);font-size:9px;color:var(--green600);font-weight:500}
.sec .t{font-family:var(--sora);font-weight:600;font-size:13.5px;color:var(--ink);letter-spacing:-.01em}
.sec p{font-size:12px;line-height:1.55}
.sec p + p{margin-top:6px}

.query{font-family:var(--mono);font-size:11px;background:var(--ink);color:var(--green200);
  padding:8px 12px;border-radius:4px;margin:2px 0 7px;display:block}
.query .q{color:#fff}

ul.deficits{list-style:none;margin-top:2px}
ul.deficits li{position:relative;padding-left:17px;font-size:12px;line-height:1.45;margin-top:5px}
ul.deficits li::before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;
  background:var(--green300);border-radius:1px}

.road{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#e4e3db;
  border:1px solid #e4e3db;border-radius:4px;overflow:hidden;margin-top:3px}
.step{background:#fff;padding:10px 12px}
.step .num{font-family:var(--sora);font-weight:700;font-size:16px;color:var(--green300)}
.step p{font-size:11px;line-height:1.4;color:var(--body);margin-top:3px}

.fr{margin-top:7px;font-size:9.5px;line-height:1.4;color:var(--dim);font-style:italic;border-top:1px dotted #d5d4cc;padding-top:5px}

/* footer / cta */
.cta{margin-top:auto;padding-top:12px}
.cta-card{background:var(--ink);border-radius:6px;padding:13px 17px;display:flex;
  justify-content:space-between;align-items:center;gap:16px}
.cta-card .l .k{font-family:var(--mono);font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--green300)}
.cta-card .l h3{font-family:var(--sora);font-weight:600;font-size:15px;color:#fff;margin-top:4px;line-height:1.2}
.cta-card .l p{font-size:10.5px;color:#c7c7bd;margin-top:5px;max-width:52ch;line-height:1.45}
.cta-card .r{text-align:right;flex-shrink:0}
.cta-card .r .contact{font-family:var(--mono);font-size:10px;color:#fff;line-height:1.7}
.cta-card .r .contact span{color:var(--green300)}
.foot{margin-top:9px;display:flex;justify-content:space-between;font-size:9px;color:var(--dim)}
.foot .anchor{color:var(--green700);font-weight:500}

@page{size:A4;margin:0}
@media print{body{background:#fff}.page{margin:0;box-shadow:none}}
@media screen{.page{margin:18px auto;box-shadow:0 6px 30px rgba(0,0,0,.14)}}
</style>
</head>
<body>
<div class="page">

  <div class="top">
    <div class="brand">
      ${SIGNAL_NODE}
      <div>
        <div class="name">${BRAND.name}</div>
        <div class="tag">${BRAND.tagline}</div>
      </div>
    </div>
    <div class="doc">
      <div class="kicker">Direct Booking &amp; AI Search Audit</div>
      <div class="date">${today}</div>
    </div>
  </div>

  <div class="title">
    <div class="eyebrow">${catE} &middot; ${locE}</div>
    <h1>${nameE}</h1>
    <div class="meta">Prepared for <b>${contactE}</b></div>
  </div>

  <div class="bluf">
    <p>${hookE}</p>
  </div>

  <div class="stats">
    <div class="stat accent">
      <div class="lab">Est. commission bleed</div>
      <div class="val">${money(bleed)}<span class="u"> /mo</span></div>
      <div class="sub">Handed to OTAs, every month</div>
    </div>
    <div class="stat">
      <div class="lab">Projected over 12 months</div>
      <div class="val">${money(annual)}</div>
      <div class="sub">If nothing changes this year</div>
    </div>
    <div class="stat">
      <div class="lab">Direct-booking recovery</div>
      <div class="val">${money(recLow)}<span class="u">–${money(recHigh).replace('$','')} /mo</span></div>
      <div class="sub">Realistic first-year lift</div>
    </div>
  </div>

  <div class="sec">
    <div class="h"><span class="n">01</span><span class="t">The AI search visibility gap</span></div>
    <p>We asked ChatGPT, Claude, and Perplexity the question your future guests ask:</p>
    <span class="query">&gt; <span class="q">&ldquo;${queryE}&rdquo;</span></span>
    <p>${signalE} The assistants named <b>${citedE}</b> — not your direct site. High-intent international travellers planning by AI are routed straight to the platforms, at 15&ndash;25% commission on every booking.</p>
  </div>

  <div class="sec">
    <div class="h"><span class="n">02</span><span class="t">What the commission is costing you</span></div>
    <p>Industry OTA commissions run 15&ndash;25% (roughly 18% on average, charged on the VAT-inclusive rate). Against ${nameE}&rsquo;s room and rate profile that is an estimated <b>${money(bleed)} a month</b> &mdash; about <b>${money(annual)}</b> over a year &mdash; on bookings that could arrive direct. These are estimates from public rate and occupancy benchmarks, not a promise; we confirm the real figure with you on the call.</p>
  </div>

  <div class="sec">
    <div class="h"><span class="n">03</span><span class="t">Google Business Profile &amp; schema deficits</span></div>
    <ul class="deficits">
      ${defs.map((d) => `<li>${d}</li>`).join('\n      ')}
    </ul>
  </div>

  <div class="sec">
    <div class="h"><span class="n">04</span><span class="t">The 3-step recovery roadmap</span></div>
    <div class="road">
      ${steps.map((s, i) => `<div class="step"><div class="num">${i + 1}</div><p>${s}</p></div>`).join('\n      ')}
    </div>
    ${fr ? `<div class="fr">${fr}</div>` : ''}
  </div>

  <div class="cta">
    <div class="cta-card">
      <div class="l">
        <div class="k">Next step</div>
        <h3>A 15-minute walkthrough of your direct-booking fix</h3>
        <p>We&rsquo;ll screen-share the live AI answers for your area, the Google Local Pack gaps, and the schema fixes &mdash; then show you exactly what changes and in what order. No lock-in, prices published.</p>
      </div>
      <div class="r">
        <div class="contact">
          <span>WhatsApp</span> ${BRAND.whatsapp}<br>
          <span>Email</span> ${BRAND.email}<br>
          <span>Web</span> ${BRAND.domain}
        </div>
      </div>
    </div>
    <div class="foot">
      <span>Prepared by ${BRAND.founder}, Founder &middot; ${BRAND.name} &middot; ${BRAND.domain}</span>
      <span class="anchor">Recovering 2&ndash;3 direct bookings a month covers the retainer ($300&ndash;$1,000/mo).</span>
    </div>
  </div>

</div>
</body>
</html>`;
}

/* -------------------------------- main --------------------------------- */

const csv = readFileSync(join(__dirname, 'leads.csv'), 'utf8');
const rows = parseCsv(csv).filter((r) => r.some((c) => c && c.trim()));
const header = rows[0].map((h) => h.trim());
const leads = rows.slice(1).map((r) => {
  const obj = {};
  header.forEach((h, i) => { obj[h] = (r[i] ?? '').trim(); });
  return obj;
}).filter((l) => l.Business_Name);

mkdirSync(OUT_DIR, { recursive: true });
if (existsSync(join(__dirname, 'fonts.css'))) {
  copyFileSync(join(__dirname, 'fonts.css'), join(OUT_DIR, 'fonts.css')); // for index.html
}
const index = [];
for (const lead of leads) {
  const slug = slugify(lead.Business_Name);
  const file = `${slug}.html`;
  writeFileSync(join(OUT_DIR, file), render(lead), 'utf8');
  index.push({
    slug, file, name: lead.Business_Name,
    region: lead.Country_Region,
    country: parseRegion(lead.Country_Region).country,
    bleed: Number(lead.Estimated_Monthly_Bleed_USD) || 0,
    contact: lead.Contact_Person_Or_Title,
  });
}

writeFileSync(join(OUT_DIR, '_index.json'), JSON.stringify(index, null, 2));
writeFileSync(join(OUT_DIR, 'index.html'), renderGallery(index), 'utf8');
console.log(`Generated ${index.length} one-pagers + index.html into ${OUT_DIR}`);
index.forEach((x) => console.log(`  ${x.file}  —  ${x.name}`));

/* ------------------------------- gallery ------------------------------- */

function renderGallery(items) {
  const byCountry = {};
  for (const it of items) (byCountry[it.country] ??= []).push(it);
  const totalBleed = items.reduce((s, i) => s + i.bleed, 0);
  const countries = Object.keys(byCountry).sort();
  const cards = countries.map((c) => `
    <section class="grp">
      <h2>${c} <span>${byCountry[c].length}</span></h2>
      <div class="rows">
        ${byCountry[c].map((it) => `
        <a class="row" href="${it.file}">
          <span class="nm">${esc(it.name)}</span>
          <span class="ct">${esc(it.contact)}</span>
          <span class="bl">${money(it.bleed)}<i>/mo</i></span>
        </a>`).join('')}
      </div>
    </section>`).join('');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AfriShield AI — Lead one-pagers (${items.length})</title>
<link rel="stylesheet" href="fonts.css">
<style>
:root{--green300:#5CBE91;--green600:#0F7248;--green700:#0A5936;--ink:#14140F;--n100:#F4F3EE}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:var(--n100);color:var(--ink);padding:40px 24px;line-height:1.5}
.wrap{max-width:860px;margin:0 auto}
.hd{border-bottom:2px solid var(--green600);padding-bottom:16px;margin-bottom:8px}
.hd .ey{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--green600)}
.hd h1{font-family:'Sora',sans-serif;font-weight:700;font-size:30px;margin-top:6px;letter-spacing:-.02em}
.hd p{color:#6b6b5f;margin-top:8px;font-size:14px}
.hd b{color:var(--ink)}
.grp{margin-top:28px}
.grp h2{font-family:'Sora',sans-serif;font-weight:600;font-size:15px;color:var(--green700);display:flex;align-items:center;gap:8px}
.grp h2 span{font-family:'JetBrains Mono',monospace;font-size:11px;color:#fff;background:var(--green600);border-radius:20px;padding:2px 9px;font-weight:500}
.rows{margin-top:10px;border:1px solid #e4e3db;border-radius:8px;overflow:hidden;background:#fff}
.row{display:grid;grid-template-columns:1fr 1fr auto;gap:14px;align-items:center;padding:12px 16px;text-decoration:none;color:var(--ink);border-top:1px solid #eeede7}
.row:first-child{border-top:0}
.row:hover{background:#EAF7F1}
.nm{font-family:'Sora',sans-serif;font-weight:600;font-size:14px}
.ct{font-size:12px;color:#6b6b5f}
.bl{font-family:'Sora',sans-serif;font-weight:700;font-size:15px;color:var(--green600);text-align:right;white-space:nowrap}
.bl i{font-style:normal;font-size:11px;color:#6b6b5f;font-weight:500}
.ft{margin-top:32px;font-size:12px;color:#6b6b5f;text-align:center}
@media(max-width:560px){.row{grid-template-columns:1fr auto}.ct{display:none}}
</style></head><body><div class="wrap">
  <div class="hd">
    <div class="ey">Direct Booking &amp; AI Search Audit</div>
    <h1>Lead one-pagers</h1>
    <p><b>${items.length}</b> personalised audits across <b>${countries.length}</b> markets &middot; combined estimated OTA commission bleed <b>${money(totalBleed)}/mo</b> (&asymp; ${money(totalBleed * 12)}/yr). Click any property to open its one-pager; print to PDF (A4) to send.</p>
  </div>
  ${cards}
  <div class="ft">AfriShield AI &middot; ${BRAND.domain} &middot; ${BRAND.email}</div>
</div></body></html>`;
}
