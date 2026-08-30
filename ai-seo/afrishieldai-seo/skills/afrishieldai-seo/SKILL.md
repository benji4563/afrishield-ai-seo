---
name: afrishieldai-seo
description: End-to-end standard operating procedure for building and optimising AI SEO marketing sites for African businesses — combines the AfriShield website-build workflow (brand → keyword clustering → Next.js scaffold → content pipeline → deploy) with a Generative Engine Optimization (GEO) and Local SEO layer (AI-crawler allowlist, BLUF answer blocks, LocalBusiness + FAQPage JSON-LD, geo/intent keyword matrix, Google Business Profile, citation building). Use for AfriShield AI's own site and for client deployments (SMB, e-commerce, professional services, corporate B2B). Triggers on "build an AI SEO site", "optimise for GEO", "add local SEO", "get us cited by ChatGPT/Perplexity", "rank in [African city]".
argument-hint: "<business name + one-line brief>"
user-invocable: true
---

# AfriShield AI SEO — Build & Optimise Standard Operating Procedure

You are executing an AI SEO engagement for a business in an **African market**.
This skill has two halves that run together:

- **Part A — Build workflow** (condensed from `ai-seo-website-builder`): brand →
  keyword clustering → Next.js scaffold → SEO foundation → content pipeline →
  deploy. The full phase detail lives in
  `01 Skills/ai-seo-website-builder/skills/ai-seo-website-builder/SKILL.md`; do
  not duplicate it, reference it.
- **Part B — GEO + Local SEO SOP** (below): the layer that makes the site
  citable by AI answer engines and findable in local search, plus the Ask-AI
  answer buttons and the Aramis audit. This is the part that differentiates
  AfriShield and it is **not optional**.

This skill is **deliberately autonomous**: after the Phase 0 discovery interview
it runs end-to-end without further questions — every Africa-specific decision
below has a documented default. It is self-contained; it references the general
`ai-seo-website-builder` skill only for deep phase mechanics, never for a
decision. The general skill builds *any* SEO site; this one encodes the African
context and realities on top.

## Positioning this skill serves

AfriShield AI sells **search visibility for African businesses, run by agents
and reported in plain numbers.** The niche is broad African SMBs, anchored by a
trust-led story: AI made *reliable* for the African business landscape, not AI
as a gimmick. Every decision below serves that — candour over hype, evidence
over adjectives, local specificity over imported templates.

Non-negotiable house rules (carried from the brand guidelines and prior build):

- No invented client outcomes, no fabricated metrics, no guaranteed rankings.
- No content hidden behind animation — nothing renders `opacity:0` into server HTML.
- Green is never a full-bleed background; threat red never appears in marketing.
- Prices are shown, not "contact us". Currency is USD with a local-currency note.
- Never fabricate a phone number, street address, or GBP listing. Leave those
  env-driven and documented until the client supplies real values.

---

## Part A — Build workflow (condensed)

Run the phases from the `ai-seo-website-builder` skill in order. The compressed map:

1. **Discovery** → `project_specs.md`. One round of questions. Niche, prices,
   target cities, reference site, content ambition, deployment target.
2. **Brand system** → `brand-guidelines.md`. Palette + type + voice + one
   signature element. For AfriShield use the company green scale and the signal
   node mark.
3. **Scaffold** → Next.js (App Router) + TypeScript + Tailwind + Framer Motion.
   SSR/SSG only — see B.1 for why this is a GEO requirement, not a preference.
4. **Keyword clustering** → keep clusters A–H, skip I–M. One primary per page,
   logged once in `used-keywords.md`. See B.4 for the geo/intent matrix that
   extends this for local.
5. **SEO foundation** → per-page metadata, canonical, sitemap, robots. Extended
   by B.1 (AI crawlers) and B.3 (schema).
6. **Content pipeline** → research live SERP → original prose → BLUF block (B.2)
   → FAQ → schema → verify → log keyword. Humor per the standing reference
   `../humor-writing/SKILL.md` — for client sites apply its client calibration
   (one notch drier; near-zero in regulated verticals).
7. **Local pages** → one real page per target city (B.4), never a template swap.
8. **Deploy** → Vercel, apex canonical, HTTPS, Search Console + sitemap submit.

---

## Part B — GEO + Local SEO SOP

Purpose: make the site **indexable and citable by AI answer engines** (ChatGPT,
Claude, Perplexity, Google AI surfaces) and **findable in local search** for
African cities. Apply to internal AfriShield sites and every client build.

### B.1 — AI crawler configuration

Let AI search and retrieval bots index the content. `public/robots.txt`:

```txt
User-agent: *
Allow: /
Disallow: /thank-you

# AI search & retrieval crawlers — explicitly allowed
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: https://<domain>/sitemap.xml
Host: <domain>
```

**Rendering requirement (why SSR/SSG is mandatory):** most AI scrapers do not
execute JavaScript. Primary text **and** JSON-LD must be present in the raw
server HTML. Verify with `curl -s <url> | grep` for both body copy and
`"@type"`. Nothing load-bearing may be client-rendered. Keep First Contentful
Paint low — this matters doubly in African markets on mid-range Android over
patchy connections.

### B.2 — BLUF (Bottom Line Up Front) answer blocks

At the top of every key page, place a **40–70 word** factual summary answering
who / what / where / core value. This is what an answer engine lifts as a
citation. Plain prose, entity-dense, no marketing adjectives.

Pattern (already implemented as the `ShortAnswer` component for posts; add an
equivalent near the top of home, solutions, pricing, and each location page):

> AfriShield AI provides AI SEO and local search optimisation for businesses
> across West, Central, East, and Southern Africa. We handle keyword research,
> content, technical SEO, and AI-answer-engine visibility (ChatGPT, Claude,
> Perplexity, Google) for small businesses, e-commerce brands, and professional
> firms — reported monthly in plain numbers.

### B.3 — Schema.org JSON-LD engine

Inject validated JSON-LD in the server HTML of every key page. Helpers live in
`lib/structured-data.ts`. Minimum coverage:

| Page | Schema |
|---|---|
| Root layout (all pages) | `Organization` |
| Home | `ProfessionalService` + `hasOfferCatalog` + `FAQPage` |
| Solutions | `Service` (with per-pillar sub-services via `hasOfferCatalog`/`makesOffer`, entities sourced from the same data used to render the page — not one flat prose `description`) + `FAQPage` |
| Pricing | `FAQPage` (+ Offers with price/currency) |
| Location pages | `LocalBusiness` (areaServed City→Country) + `FAQPage` + `BreadcrumbList` |
| Blog post | `BlogPosting` + `FAQPage` + `BreadcrumbList` |
| About | `AboutPage` + `Person` (founder) |

**Entity-linked schema, not prose blobs (board: Mike King).** Any page presenting
named sub-offerings (pillars, tiers, services) must model each as a discrete JSON-LD
entity, not fold them into one `description` sentence — a machine parsing a single
prose string cannot pull out "keyword research" as its own citable fact the way it
can pull out a named sub-`Service`.

**Cross-link the core money pages in body copy (board: Koray).** Solutions, Pricing,
and How it Works must link each other contextually from within the page content
(e.g. a pricing mention on Solutions links to `/pricing`, a "weekly publishing" claim
links to `/how-it-works`) — not only via the closing CTA block. Reviewed 2026-08-04:
`/solutions` had zero in-body links to any sibling page.

**CTA reachable before the fold-six problem (board: Wes McDowell).** Every interior
page built on `PageHero` must have a clickable CTA (button or prompt link) reachable
within the first two sections after the hero — not deferred to the closing CTA block
alone — plus at least one additional mid-scroll CTA checkpoint if the page runs 3+
content sections before that closing block. Reference implementation: the homepage
`Hero` component's "Book a call" + secondary CTA pattern. `PageHero` is a candidate
for an optional `ctaHref`/`ctaLabel` prop so this becomes structural rather than
something each page author has to remember.

`LocalBusiness` / service-provider template (fill from real data; never invent
telephone or address — leave them out or env-driven until supplied):

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "{{BUSINESS_NAME}}",
  "url": "{{WEBSITE_URL}}",
  "image": "{{LOGO_URL}}",
  "priceRange": "$$",
  "areaServed": [
    { "@type": "City", "name": "{{PRIMARY_CITY}}" },
    { "@type": "Country", "name": "{{TARGET_COUNTRY}}" }
  ],
  "sameAs": ["{{GBP_URL}}", "{{LINKEDIN_URL}}", "{{FACEBOOK_URL}}"]
}
```

`FAQPage` — one per page that has a real FAQ, questions phrased as the exact
conversational queries people type into AI engines (see B.4).

### B.4 — Local SEO & keyword engineering matrix

**Keyword formula:** `Core service` + `Geographic qualifier` + `Intent modifier`.
Example: `bookkeeping service` + `Victoria Island, Lagos` + `affordable`.

Extend the cluster taxonomy from Part A with a geo axis. For every KEEP cluster,
generate the local variants for each target city/neighbourhood.

Per-page checklist:

- [ ] **Title:** `[Primary keyword] in [City/Neighbourhood] | [Brand]` (≤60 chars)
- [ ] **Meta description:** location + core service + CTA + contact route (WhatsApp is a first-class CTA in African markets)
- [ ] **Exactly one H1**, containing the localised primary intent
- [ ] **Conversational FAQ** using real AI-query phrasing, e.g. "How much does local SEO cost in Lagos?", "Best bookkeeper in Accra for a small shop"
- [ ] **Hyper-local landing pages** — a dedicated, genuinely local page per city (named neighbourhoods, local regulatory notes, real context). Never a find-and-replace on the city name; thin location pages get detected and drag the whole site.

### B.5 — Off-page signals & entity building

1. **Google Business Profile (GBP):** NAP (Name, Address, Phone) must match the
   site's JSON-LD exactly. One primary category, up to nine secondary. Weekly
   posts featuring the primary keyword + local hashtags. (Client action —
   AfriShield advises and drafts; the client owns the listing.)
2. **Regional citations:** local chambers of commerce, national business
   directories, industry portals. Consistent NAP everywhere.
3. **Unlinked brand mentions:** press, guest posts, and genuine forum answers
   (LinkedIn, Reddit, Quora) build the authority that AI training/retrieval
   picks up. Earned, never spammed.

### B.5a — Ask-AI answer buttons

The visitor-facing payoff of everything above, and a standard deliverable on
every AfriShield build. Four buttons deep-link the visitor into **ChatGPT,
Claude, Perplexity, and Gemini** with a pre-filled prompt asking the engine to
summarise the business and surface contact info. Because B.1–B.3 made the site
AI-crawlable with BLUF blocks, the engines answer well — and in markets where a
buyer often checks an assistant before a form, the click both informs the
visitor and seeds the brand into that AI session.

**Component:** `components/ui/AskAi.tsx`, a client component. Each engine is a
real `<a target="_blank" rel="noreferrer">` (works with JS off) whose `onClick`
also copies the prompt to the clipboard as a universal fallback.

**Prompt template:**

> Summarise {{BUSINESS}} ({{DOMAIN}}): their {{core service}} for {{market}},
> the {{pricing}}, and how to contact them.

**Deep links** (prompt URL-encoded into the query string):

| Engine | URL | Prefill |
|---|---|---|
| ChatGPT | `https://chatgpt.com/?q=<encoded>` | yes |
| Claude | `https://claude.ai/new?q=<encoded>` | yes |
| Perplexity | `https://www.perplexity.ai/search?q=<encoded>` | yes |
| Gemini | `https://gemini.google.com/app` | no — clipboard + open app |

Gemini exposes no reliable public prefill param, so the clipboard copy plus a
"paste it if the box is empty" toast covers it. Surround the buttons with a
short server-rendered heading + one sentence so the block carries crawlable
content, not just JS. **Placement:** a home section and the contact page,
minimum. WhatsApp remains the primary human contact CTA (B.4); Ask-AI sits
beside it, not instead of it.

### B.6 — Imagery (African-market discipline)

Photography is part of local trust. Use real African small-business, corporate,
and mid-market imagery — market vendors, shop owners, professional offices, teams
on laptops and phones. Sourcing: Pexels API (free license, commercial use ok).

- Descriptive filenames, never UUIDs. Meaningful alt text: subject + context.
- `.webp`/optimised, correct width/height, `loading="lazy"` off-screen.
- No stock handshakes, no skyscrapers, no generic "diverse office" hero — they
  read as imported and cost the exact trust this brand is built on.
- The founder/team photos are the client's own, never stock.

### B.7 — Verification & quality audit

Run before calling any build done:

- [ ] `robots.txt` reachable and lists GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot, Google-Extended
- [ ] `curl -s <url>` (no JS) returns full body copy **and** every `"@type"` block — for home, solutions, pricing, about, each post, each location page
- [ ] JSON-LD validates (Google Rich Results Test)
- [ ] Every route returns 200 in production; 404 is a real page
- [ ] Sitemap lists every real page and no fake ones; `thank-you` excluded (noindex)
- [ ] Canonicals resolve to the apex; `www` 308-redirects
- [ ] No horizontal overflow at 390 / 768 / 1440; keyboard-operable nav, tabs, accordions
- [ ] BLUF block present near the top of every key page
- [ ] Ask-AI buttons (ChatGPT / Claude / Perplexity / Gemini) on home + contact, deep-linking a prefilled prompt with a clipboard fallback
- [ ] `npm audit` clean; Lighthouse near-100 (and the Aramis `seo-audit` reads 100/100/100/100 · GEO 100)
- [ ] Baseline GEO benchmark: query ChatGPT / Claude / Perplexity with
      "top [service] in [city]" and record whether the site is cited. Re-check monthly.

### B.8 — GEO Citation, PR Wire Syndication & Co-Occurrence SOP

Generative search engines (Perplexity, ChatGPT Search, Gemini, Claude) require **third-party entity corroboration** and **structured comparative roundups** to cite brands in synthesized answers and summary tables.

1. **On-Site Comparative Pillar Guide (`/blog/top-[niche]-agencies-[region]-2026`):**
   - Publish an objective, analyst-grade comparison guide profiling the brand alongside 3–4 legitimate regional competitors.
   - Include a clean Markdown/HTML comparison table and `ItemList` + `FAQPage` JSON-LD schema.
   - Ensure liftable H2 openers (Mike King doctrine) and a 40–70 word BLUF ShortAnswer block.
2. **Entity-Dense PR Wire Syndication:**
   - Syndicate a structured press release via budget-effective wires (**PR Underground** @ $75, **IssueWire** @ $45, or **EIN Presswire** @ $149) indexing into Google News, Bing News, Apple News, and broadcast affiliates.
   - Construct clear Entity-Attribute-Value (EAV) triples (`[Brand] provides [GEO/Services] in [Region]`).
   - Hyperlink the brand name to the homepage and the category term to the on-site comparative pillar guide.
3. **48–72h Indexation & Generative Benchmark:**
   - Verify indexation across 50+ news portals via Google News search operators.
   - Query Perplexity, ChatGPT Search, and Gemini with target comparative prompts (e.g., *"Top [service] providers in [city]"*) and verify brand extraction into generative tables.

---

## Success criteria (definition of done)

All of Part A's criteria, plus: AI crawlers allowed and confirmed in raw HTML;
BLUF blocks live; LocalBusiness/Service + FAQPage schema valid on key pages;
Ask-AI buttons on home + contact; per-city pages are real local content; imagery
is African-market authentic; on-site comparative pillar guide and PR syndication
pipeline deployed; the Aramis `seo-audit` reads 100/100/100/100 · GEO 100; and a
baseline AI-citation benchmark has been recorded for the target city queries.

## Case reference

`afrishieldai.com` (this repo, `02 Services ai seo/ai seo/Marketing Site`) is the
reference implementation: 13+ routes, schema on every page, AI-crawler allowlist,
BLUF blocks, Ask-AI buttons (`components/ui/AskAi.tsx`), Africa-localized pricing,
founder story, and African-market imagery — verified by the Aramis `seo-audit`
at 100/100/100/100 · GEO 100. `njaccountstax.com` is the prior build-workflow
exemplar (Part A) and the origin of the Ask-AI pattern.
