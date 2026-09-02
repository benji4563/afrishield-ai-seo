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
- **2026-09-02** — Packages the Semrush + Search Console + Google Business
  Profile audit-and-fix workflow into a free, open-source "clone the repo,
  run one prompt" template that explicitly targets custom-coded sites,
  WordPress, Shopify, Webflow, and Duda, not just WordPress — worth
  reframing our own audit tooling as platform-agnostic rather than
  WordPress-specific. Also calls out "doorway pages" (near-duplicate
  city/service pages) as a distinct audit category that reads as spam to
  Google, which is a concrete technical-SEO check worth adding to our
  programmatic city×service page QA. Frames the whole audit as a sales
  tool — run it on a prospect's site, show the before/after score, then
  sell the fix — a script we could adapt for our own SEO-audit-led
  outreach. — https://www.youtube.com/watch?v=M2KJ5-sFbbg
- **2026-09-02** — Lays out a "4-stage ladder" for landing a first AI-
  automation client through Upwork (proof-driven profile, AI-drafted bio
  and proposals, price for social proof before profit, then graduate
  off-platform) — a repeatable acquisition funnel worth adapting for our
  own client pipeline. Treats marketing/sales, not technical skill, as the
  real bottleneck for a solo automation operator, and has Claude auto-draft
  Upwork proposals matched to each job post — reinforces prioritising
  sales-enablement automation alongside our delivery tooling as we scale.
  — https://www.youtube.com/watch?v=jzq3FUrQ-u0
