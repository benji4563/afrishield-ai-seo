# Why afrishieldai.com has no ranking traction — diagnosis and fix, 2026-09-24

**Source:** Google Search Console, `sc-domain:afrishieldai.com`, 2026-06-24 → 2026-09-21
(90 days, `data_state: final`). First time GSC has been pulled into the repo — every prior
site-health run was blocked from live data by the sandbox egress policy, and the monthly
GEO/citation benchmark the build skill requires had never once been recorded.

---

## The headline

| Metric | Value |
|---|---|
| Impressions | 667 |
| Clicks | **2** |
| Average position | **61.9** |
| Indexation | Healthy — `Submitted and indexed`, verdict PASS |
| AI-crawler access | Correct — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended all allowed |

Two clicks in ninety days. The instinct is to look for a technical fault. There isn't one.

---

## What is NOT wrong (checked, ruled out)

Worth stating plainly, because these are the things money usually gets spent on first:

- **Indexation is fine.** URL inspection on `/solutions` and
  `/blog/top-geo-ai-seo-agencies-africa-2026` both return `coverageState: "Submitted and
  indexed"`, `robotsTxtState: ALLOWED`, `pageFetchState: SUCCESSFUL`, verdict `PASS`.
  (The sitemap API reports `indexed: 0`, but that field is deprecated and always returns
  zero — it is not evidence of an indexing failure. Verified per-URL instead.)
- **AI crawlers are already allowed.** `public/robots.txt` explicitly permits GPTBot,
  OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot,
  Claude-SearchBot, Google-Extended and Applebot-Extended. `llms.txt` exists and is
  generated from live data.
- **The site is server-rendered.** Content and JSON-LD are in the raw HTML, so headless
  AI crawlers that do not execute JavaScript can read everything.
- **Schema is broadly present** — Organization, ProfessionalService, FAQPage,
  BlogPosting, BreadcrumbList across the site.

The technical GEO foundation is sound. That is not where the problem is, and it is not
where the next dollar should go.

---

## What IS wrong: the site is aimed at the wrong continent

### Impressions by country

| Market | Impressions | Avg position |
|---|---|---|
| United Kingdom | 81 | 74.1 |
| Australia | 65 | 66.5 |
| India | 46 | 63.0 |
| Canada | 38 | 66.6 |
| Bangladesh | 18 | 72.6 |
| Indonesia | 15 | 70.5 |
| Netherlands | 14 | 41.7 |
| **Kenya** | **3** | **17.3** |
| **Cameroon** | **3** | **3.7** — and 1 of the site's 2 total clicks |
| **Ghana** | **2** | **7.0** |
| **Nigeria** | **1** | **31.0** |

**Africa is roughly 9 of 667 impressions — 1.3%.** An African AI-SEO agency is getting
98.7% of its search visibility from markets it does not serve and cannot invoice.

### The queries confirm it

Top impression-earning queries include `bli synlig på google maps` (Swedish),
`google rankings verbeteren` (Dutch), `google ranking förbättra` (Swedish),
`ranken in chatgpt` (Dutch), `ai seo warrendale` (Warrendale, Pennsylvania), and
`how long does law firm seo take`. African commercial queries across the entire 90 days:
`seo vs google ads nigeria` (1 impression, position 31) and `geo agency south africa`
(1 impression, position 92).

### The page data confirms it again

| Page | Impressions | Avg position |
|---|---|---|
| `/blog/how-to-appear-on-google-maps` | 233 | 69.0 |
| `/blog/how-long-does-seo-take` | 181 | 74.7 |
| `/blog/how-to-improve-google-ranking` | 50 | 45.4 |
| `/solutions` | 16 | **7.0** |
| `/` | 16 | **3.1** (2 clicks) |
| `/pricing` | 11 | **11.6** |
| `/how-it-works` | 9 | **15.1** |

The two biggest pages are generic global informational posts competing against Ahrefs,
Semrush, Moz and HubSpot — DR 90+ domains — for head informational terms. A domain with
no backlink profile cannot win those, and winning them would not help, because the
searcher is in Manchester or Melbourne.

Meanwhile the money pages rank **3rd to 15th** — and pull nine to sixteen impressions in
ninety days, because they target no demand beyond the brand name.

---

## The finding that decides the strategy

**When an African searcher sees this site, it ranks near the top.** Cameroon position 3.7.
Ghana 7.0. Kenya 17.3. Against the UK's 74.1 and Australia's 66.5.

The site is not weak, under-optimised, or penalised. It is pointed at the wrong country.
The content engine has been publishing, on schedule, for two months — into a market that
was never the business.

---

## Root causes, ranked

1. **Keyword strategy had no geographic qualifier.** Every published post targets a term
   that reads identically to a searcher in Lagos and a searcher in Manchester —
   "how long does seo take", "what is schema markup", "seo vs google ads". Global head
   informational terms, maximum competition, zero local intent.
2. **No commercial layer existed.** `SERVED_CITIES` (Lagos, Abuja, Accra, Nairobi,
   Johannesburg, Douala) has been asserted in `areaServed` schema since launch, but across
   37 routes **not one page existed for any of those cities**. The schema claimed a service
   area the site could not land a visitor on. Meanwhile the live Lagos and Nairobi SERPs are
   held by small local agencies (TAGET Media, Nive Digital, Crank Digital, Wab Digital;
   SEO Smart, SEO Kenya, Kwetu) and directories — genuinely beatable competition that the
   site was not competing for at all.
3. **The money pages target nothing.** `/solutions`, `/pricing` and `/how-it-works` rank
   well precisely because they only surface for brand queries. No commercial keyword is
   assigned to any of them.
4. **Francophone Cameroon — the best-performing market — was unserved.** Position 3.7 and
   one of the site's two clicks, with the thinnest competition of any market on the list,
   and no French-language content anywhere on the site.
5. **No third-party corroboration.** Confirmed separately: a news search for the brand
   returns nothing. The B.8 PR-wire syndication step has left no artifact and appears
   never to have run.

---

## What was changed in this PR

**The commercial layer (the main fix).** `/ai-seo` plus six city pages —
`/ai-seo/lagos`, `/abuja`, `/accra`, `/nairobi`, `/johannesburg`, `/douala`. Each carries
genuinely distinct local content (real districts, the actual business mix, how buyers in
that market search, and an honest read on competitive difficulty), not a swapped city name
— Koray's multi-location duplicate-dilution rule. Schema per page: `Service` with
`areaServed: City`, `serviceArea` per district, `hasOfferCatalog` with all three priced
`Offer` entities, `FAQPage`, `BreadcrumbList`. Verified present in the raw HTML.

No street address or telephone is asserted per city — NAP is never fabricated.

**Keyword strategy reset.** `content-queue.md` pivoted to African commercial intent. Nine
generic global rows retired with reasons; fourteen African commercial rows queued, ordered
by confidence. Rows are graded `gsc-evidenced` (Search Console proves this domain already
takes impressions on the term or its direct generic parent), `serp-verified` (live SERP
inspected, competition is local and beatable), or `needs-volume`. **DataForSEO was not
reachable in this session, so no row claims a volume it does not have.** A blocking
geographic-intent check was added to the poster rules.

**`/pricing` fixes** (outstanding from the 2026-09-22 board review): `ProfessionalService`
+ three `Offer` entities now render on the page itself rather than only on the homepage,
and the in-body cross-link gap — flagged on `/solutions` in August and repeated on
`/pricing` — is closed.

**Discovery wiring.** City pages registered in `sitemap.xml`, given their own
"Cities served" section in `llms.txt` so an assistant answering "who does AI SEO in
Nairobi" lands on the city page, and added to footer navigation.

---

## What to expect, honestly

City pages are new URLs with no history. Expect four to eight weeks before Google has them
crawled, indexed and provisionally scored, and three months before the ranking picture is
readable. The right success metric for the next check is **not** clicks — it is
**African impressions as a share of total**, which should move off 1.3% well before any
click total does.

The one thing this PR cannot fix is corroboration. The site has no press presence, no
citations, and no backlink profile, and that ceiling will bind once the geographic problem
is solved. That is the next spend, and it is the one the founder flagged as paid.

---

## Recommended next actions

1. **Merge and deploy**, then request indexing for the seven new URLs in Search Console.
2. **Re-run this exact GSC pull in 30 days** and compare African impression share. Log it
   to `reports/` — this is the monthly benchmark the build skill has always required and
   has never once produced.
3. **Let the poster run the new queue in order.** Rows 32–35 localise topics this domain
   has already demonstrated it can earn impressions on; they are the lowest-risk content
   available.
4. **Write rows 36–37 in French.** Cameroon is the best market this site has and it has
   never been served in its own language.
5. **Confirm whether the B.8 wire syndication was ever paid for.** If it was, the money
   produced no indexable artifact and something failed silently.
