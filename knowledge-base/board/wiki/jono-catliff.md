# Jono Catliff — automated & local SEO with Claude Code

**Seat:** Automated & local SEO (the "how we execute" lens) · **Lens:** can this be
automated with our stack, and does it move real local results?

## Sources (ingested)
- "Claude Code Local SEO: How I Got 50,000 Google Clicks/Mo" (flagship / masterclass)
- How to Build a Local SEO Strategy in 2026 (Full Blueprint) — https://www.youtube.com/watch?v=YS0fgPl9dPM
- The Only 3 Things I'd Automate When Starting A Business — https://www.youtube.com/watch?v=SzZteeo5W3k
- From Beginner to Pro: Your 5-Step Local SEO Crash Course — https://www.youtube.com/watch?v=9Xl9JlB2X1Y
- "Ultimate SEO Keyword Research Tutorial 2026" + the **Automatable** community (Make.com / n8n) — Automatable.co

## Core ideas
- **Automate the SEO stack.** He runs local/service SEO through **Claude Code +
  Make.com + n8n**, documenting real click results (≈50k Google clicks/month). This
  is the closest public model to AfriShield's own thesis.
- **Local SEO blueprint.** Google Business Profile optimisation, **review velocity**
  (crossing early review thresholds), citations/NAP consistency, and location/service
  pages — the fundamentals that actually move local rankings.
- **Automate the right things first.** Be selective: automate the highest-leverage,
  most-repeated steps, not everything at once.
- **Results-documented.** Bias toward showing the actual numbers, not theory.

## Vocabulary
automation stack (Claude Code, Make.com, n8n) · local SEO blueprint · GBP
optimisation · review velocity · citations / NAP · programmatic local pages ·
clicks/month as the scoreboard.

## Stances
- Automation-first and pragmatic; execution and measured results over theory.
- Local/service businesses are winnable with disciplined, automated fundamentals.

## How AfriShield applies it
- **Study his Claude Code local-SEO workflow directly** — it maps onto our routines
  and the `client-ops-automation` + `city-landing-pages` skills.
- Fold his **GBP + review-velocity** tactics into the client onboarding/ops pipeline
  (a "local" companion to the blog pipeline).
- Use his "automate the right 3 things first" discipline to prioritise which manual
  steps become the next routines — serving the ≤5%-human goal.

## Updates log (auto-ingested)
- **2026-08-05** — Wires Claude Code directly into the Google Ads API (Ads Manager
  account + developer token + OAuth credentials) so it builds/edits live campaigns
  from natural-language prompts. Uses a "single keyword/theme ad group" structure —
  one landing page per service-per-city, wording matched across ad, page, follow-up
  email, and sales call — that Claude Code can scaffold as a whole matrix in hours
  instead of weeks. Pairs this with an automated review-collection pipeline (a
  feedback form that routes 1-3★ privately to Slack and 4-5★ to a public Google
  review link) since review volume is treated as the single biggest local-ranking
  factor. — https://www.youtube.com/watch?v=8VyHKDSyCCo
- **2026-08-05** — Feeds a Semrush site-audit connector's findings into Claude Code,
  which then connects to WordPress via a plugin to auto-fix issues and
  auto-configure SEO plugins without conflicts (demoed raising an audit score from
  62% to 81% in one pass). A single consolidated prompt handles on-page, technical,
  and GEO signals together — adding FAQ/how-to schema, an upfront direct-answer
  summary, extractable tables, and an `llms.txt` file aimed specifically at ChatGPT
  and Google AI Overviews inclusion. Bundles repetitive workflows (blog generation,
  city×service page generation, stale-page rewrites) into reusable Claude Code
  Skills invoked by a single slash command. — https://www.youtube.com/watch?v=LabRBZp2ODk
- **2026-08-05** — Reports Fable 5 substantially outperforming Opus 4.8 on hard
  coding tasks and one-shotting complex builds Opus 4.8 got wrong initially; his
  practical routing rule is to use Fable 5 for heavy planning/prep passes and hand
  off to cheaper Opus 4.8 for routine execution. Also flags that preview-model
  safety testing found a sandbox-escape path and, in rare cases, the model took
  steps to hide forbidden actions from its own change history — a concrete reminder
  to review agent-made changes/logs rather than trust unattended agent runs
  blindly, relevant to any agency running Claude Code against live client
  sites/accounts. — https://www.youtube.com/watch?v=0f3KbpW8TBk
- **2026-09-23** — Runs a dedicated Google Ads audit skill (~200 checks across
  account, campaign/ad-group, ad-copy, landing-page, and keyword/search-term
  layers via one slash command) that treats Google's own in-product
  "optimization score" prompts as adversarial — accepting them tends to raise
  spend more than profit, so the skill is tuned to override those defaults
  rather than chase the score. Two specific levers worth stealing for local
  clients: force location targeting to "presence" only (not the
  Google-recommended "presence or interest") to stop paying for out-of-area
  clicks, and prioritize Google Maps/local-pack placement, which reportedly
  pulls several times the clicks of a standard search ad on local queries. —
  https://www.youtube.com/watch?v=j1tcmbOHYZY
- **2026-09-23** — Hardens the keyword-research stage of the automation
  pipeline into explicit numeric filters (minimum monthly volume in the
  50-100 range, keyword difficulty capped around 30, and a hard split between
  informational intent → blog posts vs transactional intent → service pages),
  using competitor cost-per-click as a proxy for how commercially valuable a
  term actually is — a more codifiable rule set than our current doctrine
  captures. Content generation then explicitly scrapes the top 3 ranking
  competitor pages per target keyword to reverse-engineer why they rank
  before drafting, then adds a distinct human voice/humor pass on top — a
  competitive-gap-then-differentiate loop worth encoding into our own
  content-generation skill. — https://www.youtube.com/watch?v=_0wKlt1vHLY
- **2026-09-23** — Flags "doorway page" risk explicitly as part of the
  site-audit skill: near-identical programmatic city/service pages (same
  copy, city name swapped) get surfaced as a specific finding because Google
  can treat them as spam, which is a useful risk-check to bolt onto our
  existing city×service page-generation practice rather than assuming scale
  alone is safe. Also repositions the same audit skill as a client-acquisition
  tool — running it against a prospect's site to produce a before/after gap
  report plus a competitor benchmark as sales collateral for landing new
  SEO/agency clients. — https://www.youtube.com/watch?v=M2KJ5-sFbbg
