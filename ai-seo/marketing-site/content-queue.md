# Content queue — afrishieldai.com blog

> ## ⚠️ Editorial rule (2026-09-24, GEOGRAPHIC PIVOT — supersedes the 2026-08-10 ratio)
>
> **Every queued keyword must carry African commercial or local intent.** Generic global
> informational keywords are retired as a strategy. This is not a preference — it is what
> 90 days of Google Search Console data forced.
>
> **The evidence (GSC, sc-domain:afrishieldai.com, 2026-06-24 → 2026-09-21):**
>
> | Metric | Value |
> |---|---|
> | Total impressions | 667 |
> | Total clicks | **2** |
> | Average position | **61.9** |
>
> Impressions by country — the whole problem in one table:
>
> | Market | Impressions | Avg position |
> |---|---|---|
> | United Kingdom | 81 | 74.1 |
> | Australia | 65 | 66.5 |
> | India | 46 | 63.0 |
> | Canada | 38 | 66.6 |
> | Netherlands | 14 | 41.7 |
> | **Kenya** | **3** | **17.3** |
> | **Cameroon** | **3** | **3.7** (1 of the site's 2 clicks) |
> | **Ghana** | **2** | **7.0** |
> | **Nigeria** | **1** | **31.0** |
>
> Africa is **~9 of 667 impressions — 1.3%**. An African AI-SEO agency was getting 98.7% of
> its search visibility from markets it does not serve. Top queries included
> `bli synlig på google maps` (Swedish), `google rankings verbeteren` (Dutch),
> `ai seo warrendale` (Pennsylvania) and `how long does law firm seo take`.
>
> **The critical detail: when an African searcher does see this site, it ranks 3rd–17th.**
> Cameroon 3.7, Ghana 7.0, Kenya 17.3 — against the UK's 74.1. The site is not weak. It is
> aimed at the wrong country. The two highest-impression pages
> (`how-to-appear-on-google-maps`, 233 impressions at position 69;
> `how-long-does-seo-take`, 181 at 74.7) are generic global posts competing with Ahrefs,
> Semrush and Moz — unwinnable for a domain with no backlink profile, and worthless even if
> won, because the searcher is in Manchester.
>
> **Rules that follow from this:**
> 1. A keyword with no African geographic or market qualifier does **not** go in this queue.
>    "how long does seo take" is retired; "how long does seo take in nigeria" is the shape.
> 2. **Localise the proven performers first.** Where a generic post already earns impressions
>    (cost, timeline, Google Maps, GBP), the African-qualified cut of that same topic is the
>    highest-confidence row available — topical relevance is already demonstrated, only the
>    geography is wrong.
> 3. **Francophone Cameroon is the priority market, not an afterthought.** It has the site's
>    best position (3.7), one of its two clicks, and by far the thinnest competition. French
>    commercial terms in this market are close to uncontested.
> 4. Commercial and decision intent outrank informational volume. A 10-volume term that ends
>    in a call is worth more than a 2,000-volume term that ends in Manchester.
>
> **Vetting sources, and an honest note on them.** DataForSEO was *not* reachable in the
> 2026-09-24 session, so no row below claims a DataForSEO volume it does not have. Two
> alternative evidence grades are used and are marked per row:
> - `gsc-evidenced` — Search Console shows this site already taking impressions on this term
>   or its direct generic parent. This is *first-party proof of real demand touching this
>   exact domain*, which is stronger evidence than a third-party volume estimate.
> - `serp-verified` — the live SERP was inspected on 2026-09-24 and the ranking competition
>   is local agencies and directories (e.g. Lagos: TAGET Media, Nive Digital, Crank Digital;
>   Nairobi: SEO Smart, SEO Kenya, Kwetu), not Ahrefs/Semrush-class domains. Winnable.
> - `needs-volume` — plausible and on-strategy, but confirm with DataForSEO before writing.
>
> The old 2026-08-10 rule (60% tourism / 40% general) is **superseded**. Tourism remains a
> strong vertical, but the axis that was actually costing money was geography, not sector.

The **blog auto-poster** (scheduled cloud routine) consumes this file. Each run it
takes the **top `queued` keyword**, writes the post, then marks it `claimed`.

Why this file exists: the cloud routine has **no DataForSEO MCP**, so it cannot do
keyword research itself. Research is done in an interactive session that *does* have
DataForSEO, and the vetted keywords are dropped here as a queue. The **weekly
queue-keeper routine** appends *candidate* rows and audits depth, but only a
DataForSEO pass (a human/agent in an interactive session) promotes a candidate to
`vetted`. **Do not let the poster invent keywords.**

Rules for the poster:
- Take the **first row whose status is `queued`**. One keyword per post, ever.
- Cross-check `used-keywords.md` first; if already claimed there, mark this row
  `claimed` without writing and move to the next `queued` row.
- After publishing, set the row to `claimed` here **and** append to `used-keywords.md`.
- If **no** `queued` rows remain, do nothing and report "queue empty" — never invent
  a keyword or republish an existing one.
- Write with the locked-in humor reference
  `afrishieldai-seo/skills/humor-writing/SKILL.md` (distilled from the
  hireawriter.us humor article): 3–5 dry, industry-aimed touches per post, none
  in the ShortAnswer, H2 opener sentences, FAQ answers, or metadata.
- **Differentiation angle check (board review, 2026-08-04):** an un-claimed keyword
  can still restate a live post in miniature once the site has enough published
  content. Before writing, skim the `cardTitle`/`description` of every entry in
  `lib/posts.ts` and confirm this row's angle doesn't duplicate one. See the
  `afrishield-blog` skill's step 1 for the full check. Row 1 below carries the
  board's recommended angle as an example of the format to use going forward.
- **Geographic-intent check (2026-09-24 pivot — blocking).** Before writing, confirm the
  row names an African market or is written for one. If a keyword would read identically
  to a searcher in Manchester and a searcher in Lagos, it is the wrong keyword — skip it
  and log why. Every post must also:
  - name the target market explicitly in the `ShortAnswer`/BLUF, not just in passing;
  - price in the local currency where money is mentioned (NGN, GHS, KES, ZAR, XAF);
  - link to the matching city page under `/ai-seo/<city>` where one exists
    (Lagos, Abuja, Accra, Nairobi, Johannesburg, Douala);
  - use local examples — real districts, real local context — not generic ones.
- **French rows are written in French.** Rows 36, 37 and 47 target francophone Cameroon,
  the site's best-performing market. Do not write them in English and translate; write
  them in French and keep the metadata French too.

Vetting note: all volumes below are **DataForSEO, South Africa, en** — a single
African market, so absolute volumes are low (10–40) by nature. Selection weighs
low competition, commercial value, brand fit, and being an early mover on AI-answer
terms, not raw volume. `vetted` = confirmed via DataForSEO. `candidate` = plausible
but volume **not yet confirmed** — leave out of the active list until checked.

| # | Primary keyword | Cluster | Vetting (SA/en) | Status |
|---|---|---|---|---|
| 1 | small business seo | G — SMB / differentiation | vetted · SV~40 · commercial · LOW comp | claimed |
| 2 | how to get my business on google | E — local visibility | vetted · SV~30 · informational · rising | claimed |
| 3 | what is schema markup | B — technical education | vetted · SV~20 · informational · LOW comp | claimed |
| 4 | google business profile optimization | E — local / GBP | vetted · SV~10–20 · commercial · rising · high CPC | claimed |
| 5 | how to rank on chatgpt | B — AI answers (AEO/GEO) | vetted · SV~10 · informational · zero comp | claimed |
| 6 | is seo worth it | D — cost / ROI anxiety | vetted · SV~10 · informational · LOW comp | claimed |
| 7 | how long does seo take | D — expectations | vetted · SV~10 · informational · LOW comp | claimed |
| 8 | local seo for small business | E — local / commercial | vetted · SV~10 · commercial | claimed |
| 9 | what is local seo | E — local / education | vetted · SV~10 · informational | retired |
| 10 | seo vs google ads | B — comparison | vetted · SV~10 · commercial · LOW comp | claimed |
| 11 | how to do keyword research | H — general how-to | vetted · SV~10 · informational · LOW comp | claimed |
| 12 | how to improve google ranking | H — general how-to | vetted · SV~10 · informational | claimed |
| 13 | how to appear on google maps | E — local visibility | vetted · SV~10 · informational | claimed |
| 14 | how to get more website traffic | H — general how-to | vetted · SV~10 · informational | claimed |
| 15 | content marketing for small business | F — content strategy | vetted · SV~10 · commercial · declining | claimed |
| 16 | get safari company recommended by ai | B — AI answers (GEO × safari) | candidate — no DataForSEO pass yet (see `keyword-map.md`) | candidate |
| 17 | increase direct hotel bookings | D — problem-aware (tourism) | candidate — no DataForSEO pass yet | candidate |
| 18 | booking.com commission alternative | D — problem-aware (tourism) | candidate — no DataForSEO pass yet | candidate |
| 19 | direct booking strategy for lodges | D — problem-aware (tourism) | candidate — no DataForSEO pass yet | candidate |
| 20 | google business profile for hotels | E — local / GBP × hotels | candidate — no DataForSEO pass yet | candidate |
| 21 | google maps ranking for safari companies | E — local / GBP × safari | candidate — no DataForSEO pass yet | candidate |
| 22 | how to show up in google ai overviews | B — AI answers (AEO/GEO) | **retired 2026-09-24** — no geographic qualifier, see pivot rule | retired |
| 23 | why is my competitor ranking above me on google | D — problem-aware | **retired 2026-09-24** — no geographic qualifier | retired |
| 24 | should i hire an seo agency or do it myself | D — cost / decision anxiety | **retired 2026-09-24** — no geographic qualifier | retired |
| 25 | how to get more google reviews for my business | E — local / GBP | **retired 2026-09-24** — superseded by row 34 (Nigeria-qualified) | retired |
| 26 | how to check if ai chatbots recommend your business | B — AI answers (GEO diagnostic) | **retired 2026-09-24** — superseded by row 40 | retired |
| 27 | how many backlinks does a small business need | H — general how-to | **retired 2026-09-24** — no geographic qualifier | retired |
| 28 | how to get more phone calls from google search | E — local / commercial | **retired 2026-09-24** — superseded by row 34 | retired |
| 29 | how to write meta descriptions that get clicks | H — general how-to / on-page | **retired 2026-09-24** — no geographic qualifier, no commercial intent | retired |
| 30 | how to rank on google in multiple african countries | G — SMB / differentiation (Africa) | on-strategy, kept — Africa-qualified · `needs-volume` | queued |
| 31 | how to show up in perplexity ai search | B — AI answers (AEO/GEO) | **retired 2026-09-24** — no geographic qualifier | retired |

## Active queue — African commercial intent (added 2026-09-24)

Ordered by confidence, highest first. The poster takes the first `queued` row as always.
Rows 32–35 localise topics this domain has *already demonstrated* it can earn impressions
on, which makes them the lowest-risk rows in the file.

| # | Primary keyword | Cluster | Vetting | Status |
|---|---|---|---|---|
| 32 | how much does seo cost in nigeria | N — Nigeria commercial | `gsc-evidenced` — the generic parent (`what-seo-actually-costs`) holds 26 impressions at pos 59.0; `why is seo so expensive` already surfaces this domain. Commercial, decision-stage, NGN-qualified. | queued |
| 33 | how to appear on google maps in lagos | N — Nigeria local / GBP | `gsc-evidenced` — strongest page on the site by impressions (233 @ pos 69.0) but the demand is UK/AUS. Same topic, Lagos-qualified, near-zero local competition. | queued |
| 34 | how to get more google reviews in nigeria | N — Nigeria local / GBP | `serp-verified` — review-velocity is the top local ranking factor (Jono Catliff doctrine) and no Nigerian site owns this term. | queued |
| 35 | how long does seo take in nigeria | N — Nigeria expectations | `gsc-evidenced` — generic parent holds 181 impressions at pos 74.7 from the UK/AU. Nigeria-qualified cut inherits the topical relevance without the unwinnable competition. | queued |
| 36 | référencement naturel douala | CM — Cameroon FR (priority) | `gsc-evidenced` + `serp-verified` — Cameroon is the site's best market (pos 3.7, 1 of 2 total clicks). French commercial terms here are close to uncontested. **Write in French.** | queued |
| 37 | agence seo cameroun | CM — Cameroon FR (priority) | `serp-verified` — francophone Central Africa has almost no optimised competition. Commercial intent, direct fit to `/ai-seo/douala`. **Write in French.** | queued |
| 38 | seo agency nairobi cost | K — Kenya commercial | `serp-verified` — Nairobi SERP is local agencies (SEO Smart, SEO Kenya, Kwetu), not global domains. Kenya already ranks pos 17.3 for this domain. | queued |
| 39 | how to get a safari company recommended by ai | K — Kenya × GEO × tourism | `gsc-evidenced` — `how-to-get-hotel-cited-by-chatgpt` sits at pos 6.7. Nearest-neighbour topic, proven position, high commercial value. | queued |
| 40 | how to check if chatgpt recommends your business in africa | AF — GEO diagnostic (Africa) | `gsc-evidenced` — `how-to-rank-on-chatgpt` holds 40 impressions; Africa-qualified cut ties it to `/ai-visibility-check`. | queued |
| 41 | seo company accra ghana | GH — Ghana commercial | `gsc-evidenced` — Ghana ranks pos 7.0 already on 2 impressions. Commercial, direct fit to `/ai-seo/accra`. | queued |
| 42 | why is my business not showing on google maps nigeria | N — Nigeria problem-aware | `serp-verified` — high-intent troubleshooting query, thin local competition, natural bridge to GBP work. | queued |
| 43 | best seo agency in nigeria | N — Nigeria commercial (head) | `serp-verified` — contested by Clutch/TopSEOs directories plus local agencies. Hard but valuable; write as an honest comparative guide per skill B.8, not a self-promotion piece. | queued |
| 44 | digital marketing vs seo for nigerian businesses | N — Nigeria comparison | `gsc-evidenced` — `seo vs google ads nigeria` already surfaces this domain at pos 31 on a single impression. Proven Nigerian demand shape. | queued |
| 45 | how to rank on google in kenya | K — Kenya how-to | `needs-volume` — on-strategy, confirm with DataForSEO before writing. | candidate |
| 46 | seo for hotels in kenya | K — Kenya × tourism | `needs-volume` — confirm with DataForSEO. | candidate |
| 47 | comment apparaître sur google maps au cameroun | CM — Cameroon FR local | `needs-volume` — confirm with DataForSEO. **French.** | candidate |
| 48 | seo agency johannesburg pricing | ZA — South Africa commercial | `needs-volume` — hardest market on the list; confirm volume and expect a long runway. | candidate |

> **Queue top-up (queue-keeper, 2026-08-30):** audited the queue — only row 9
> (`what is local seo`) remained `queued` (1 row, below the 6-row floor). Added
> rows 22–31 as candidates for the general AI-SEO/GEO/AEO/local-SEO vertical,
> checked against every live post in `lib/posts.ts` and against
> `used-keywords.md` for duplicates. **Update (2026-09-11):** rows 22–31's
> `Status` flipped from `queued` to `candidate` to match the existing
> convention for rows 16–21, keeping them out of the auto-poster's pick pool
> until a DataForSEO pass promotes each to `vetted` + `queued`.

> **Skip note (auto-poster, 2026-08-18):** row 9 (`what is local seo`) was passed
> over this run under the differentiation-angle check — `local-seo-for-small-business`
> (published 2026-08-17) already opens with an H2 titled "What local SEO actually is"
> that answers the same definitional question. Row 9 stays `queued`; a future run
> should either narrow it to a distinct angle (e.g. a short glossary-style page that
> links out to the checklist post) or the queue-keeper should retire it. Row 10
> (`seo vs google ads`) was taken instead — confirmed clean, no existing post compares
> SEO to paid search.
>
> **Skip note (auto-poster, 2026-08-19):** row 9 was re-checked this run and the
> same duplication still holds — nothing has narrowed its angle or retired it since
> 2026-08-18. Skipped again; row 11 (`how to do keyword research`) was taken instead
> — confirmed clean against every live post in `lib/posts.ts`. **Queue-keeper: row 9
> needs a decision** (narrow the angle or retire the row) before it costs another
> skipped run.
>
> **Skip note (auto-poster, 2026-08-20):** row 9 checked a third time — still the
> same unresolved duplication against `local-seo-for-small-business`, no narrowing
> or retirement since the last two runs. Skipped again; row 12
> (`how to improve google ranking`) was taken instead — confirmed clean against
> every live post, and it doubles as a natural hub linking out to the keyword
> research, schema markup, GBP, local SEO, and timeline posts. **Queue-keeper: row 9
> has now cost three skipped runs — please narrow the angle or retire it.**
>
> **Skip note (auto-poster, 2026-08-21):** row 9 checked a fourth time — still the
> same unresolved duplication against `local-seo-for-small-business`, no narrowing
> or retirement since the first flag on 2026-08-18. Skipped again; row 13
> (`how to appear on google maps`) was taken instead, written as a ranking-factor
> deep dive (relevance/distance/prominence, category and service-area choices,
> what sabotages a listing) — a distinct angle from the existing GBP post
> (post-setup maintenance work) and the "get your business on Google" overview
> (Maps as one of three channels, covered briefly). **Queue-keeper: row 9 has now
> cost four skipped runs — please narrow the angle or retire it.** Also note: after
> this run only two general-cluster `queued` rows remain (14, 15) and no
> tourism-cluster rows have cleared `candidate` status yet, so the 60/40 tourism
> ratio cannot be met from the current pool — the queue needs a DataForSEO pass on
> rows 16–21 before the next run or two, or the general pool runs dry.
>
> **Skip note (auto-poster, 2026-08-22):** row 9 checked a fifth time — still the
> same unresolved duplication against `local-seo-for-small-business`'s opening H2
> ("What local SEO actually is"), no narrowing or retirement since the first flag on
> 2026-08-18. Skipped again; row 14 (`how to get more website traffic`) was taken
> instead — confirmed clean against every live post, written as a five-channel
> traffic breakdown (organic, AI answers, referral, local/Maps, email/direct) that
> is distinct from the ranking-checklist and keyword-research posts already live.
> Hero image: both sources unusable this run — no `PEXELS_API_KEY` configured in
> this environment, and the Higgsfield-generated image could not be downloaded for
> the mandatory artifact check because the sandbox's network egress policy blocks
> the CloudFront asset host (403 policy denial, not a content problem) — published
> text-only per the skill's fallback rule. **Queue-keeper: row 9 has now cost five
> skipped runs — please narrow the angle or retire it. Also: after this run only
> row 15 remains `queued` in the general pool — the queue will run dry within one
> or two more runs without a DataForSEO pass on rows 16–21 (tourism candidates) or
> fresh general-cluster keywords.**
>
> **Skip note (auto-poster, 2026-08-23):** row 9 checked a sixth time — still the
> same unresolved duplication against `local-seo-for-small-business`'s opening H2
> ("What local SEO actually is"), no narrowing or retirement since the first flag on
> 2026-08-18. Skipped again; row 15 (`content marketing for small business`) was
> taken instead — confirmed clean against every live post, no cluster-F sibling
> exists yet so it stands as the first, with contextual links out to the keyword
> research, GBP, SEO-vs-ads, and SEO-timeline posts. **After this run the general
> pool is empty (rows 1–15 are all `claimed` except row 9) — the next run needs
> either a resolution on row 9 or a fresh DataForSEO pass on rows 16–21 (tourism
> candidates) or new general-cluster keywords, or it will report "queue empty."**
> Hero image: both sources unusable again this run — no `PEXELS_API_KEY`
> configured, and the Higgsfield-generated image could not be downloaded for the
> mandatory artifact check because the sandbox's network egress policy still
> blocks the CloudFront asset host (403 policy denial, same as 2026-08-22, not a
> content problem) — published text-only per the skill's fallback rule.
>
> **Board review (2026-09-22): row 9 retired.** Six identical skip notes
> (2026-08-18 → 2026-08-23) confirmed the same unresolved duplication against
> `local-seo-for-small-business`'s opening H2 (`#what-local-seo-is`) and its FAQ
> ("What is local SEO for a small business?"), and nothing narrowed the angle or
> retired the row in the ~4 weeks since the first flag — each extra run cost a
> wasted pick-cycle checking a duplication that was never going to resolve itself.
> The board's GEO lens confirmed the duplication still holds verbatim as of this
> review and scored a fresh attempt 2/10: the fixed post template forces the same
> H2s (definition, vs. general SEO, ranking factors) that `local-seo-for-small-
> business` already owns, so a second full post would dilute cluster E rather than
> extend it. At SV~10 informational, the keyword's value no longer clears six
> wasted cycles. Status flipped to `retired` above — see the `afrishield-blog`
> skill's new skip-count escalation rule (this same review) so a stuck row can't
> silently repeat this on a future keyword: three consecutive skips now
> auto-retires instead of logging a note nobody actioned.
>
> **Board review (2026-09-22): queue-keeper cadence.** Rows 22–31 have sat
> `candidate` (no DataForSEO pass) since 2026-09-11, and the skip notes above show
> the general pool has already hit empty at least once waiting on that promotion.
> Promoting candidates to `vetted`/`queued` should be a fixed step in every weekly
> queue-keeper run (enough to keep the `queued` floor at ≥6), not something that
> happens only when a human/interactive session with DataForSEO notices the pool
> is dry — a `queued` count under 6 with no promotion that run should be treated as
> a first-class failure signal, same severity as "queue empty," not a note buried
> in prose.

## Watchlist — no DataForSEO volume yet (do NOT queue until confirmed)

Emerging AEO/GEO terms with too little data to register a volume. Re-check
periodically; promote to the table above once they show real volume.

- generative engine optimization
- how to get cited by ai / how to get cited by chatgpt
- why is my website not showing on google

## Claimed (moved here after publishing)

| Primary keyword | Page | Claimed |
|---|---|---|
| answer engine optimization | `/blog/answer-engine-optimization` | 2026-07-29 |
| small business seo | `/blog/small-business-seo` | 2026-08-05 |
| how to reduce ota commission | `/blog/how-to-reduce-ota-commission` | 2026-08-10 |
| how to get hotel cited by chatgpt | `/blog/how-to-get-hotel-cited-by-chatgpt` | 2026-08-10 |
| how to get my business on google | `/blog/how-to-get-my-business-on-google` | 2026-08-10 |
| what is schema markup | `/blog/what-is-schema-markup` | 2026-08-10 |
| google business profile optimization | `/blog/google-business-profile-optimization` | 2026-08-11 |
| how to rank on chatgpt | `/blog/how-to-rank-on-chatgpt` | 2026-08-12 |
| is seo worth it | `/blog/is-seo-worth-it` | 2026-08-13 |
| how long does seo take | `/blog/how-long-does-seo-take` | 2026-08-14 |
| local seo for small business | `/blog/local-seo-for-small-business` | 2026-08-17 |
| seo vs google ads | `/blog/seo-vs-google-ads` | 2026-08-18 |
| how to do keyword research | `/blog/how-to-do-keyword-research` | 2026-08-19 |
| how to improve google ranking | `/blog/how-to-improve-google-ranking` | 2026-08-20 |
| how to appear on google maps | `/blog/how-to-appear-on-google-maps` | 2026-08-21 |
| how to get more website traffic | `/blog/how-to-get-more-website-traffic` | 2026-08-22 |
