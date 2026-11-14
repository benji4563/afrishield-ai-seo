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
- **2026-10-12** — Two newer videos (https://www.youtube.com/watch?v=vwzV-YsVswA,
  https://www.youtube.com/watch?v=_0wKlt1vHLY) repackage his local-SEO and SEO
  workflows as slash commands — the same set already installed here as the
  `local-seo` suite — so they add nothing new. One point worth restating: a generic
  how-to post draws readers who can never hire a local business, so city-qualified
  informational topics come first; this agrees with the Africa-qualified queue.
  - *not adopted: manipulative* — his review form still asks for a score first and
    sends only 4–5★ customers to Google, routing the rest to a private channel. That
    is review gating, which Google's review policy forbids. The same pipeline appears
    in the 2026-08-05 entry above and is not adopted there either: the company rule
    is that the Google review link is offered to every customer whatever they score.
- **2026-10-31** — Wires Claude Code to a Semrush connector to pull a competitor's
  top pages, keyword gap (searches that find them and never find you), and
  backlink gap, then has Claude clone his own site's blueprint and rebuild a
  *better* version of the competitor's best-performing service page and blog post
  — not a copy, same topic. For local citations, he has Claude (via Firecrawl)
  search the competitor's phone number in quotation marks to surface every
  directory that lists them, then pull their Google Business Profile categories —
  a concrete way to find the citation sources a competitor already has that a new
  entrant is missing, beyond generic "submit to directories" advice. The AI-search
  piece: Claude in Chrome asks ChatGPT, Claude, Perplexity and Gemini "who's the
  best [service] in [city]" repeatedly, and logs which sites each answer cites —
  get listed on those cited sites and you become eligible to be named the same
  way. This is the first concrete *workflow* for the citation-tracking idea Koray
  and Mike King's wikis argue for in the abstract (corroboration, "cost of
  retrieval," citation accuracy) — worth trialing against AfriShield's own
  Nairobi/Douala/Accra competitor set. Explicitly flags directory sign-up itself
  as still manual (Claude fills the form, a human clicks create). — https://www.youtube.com/watch?v=PvGnb8tKtgw
