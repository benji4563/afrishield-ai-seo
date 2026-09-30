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
- **2026-08-12** — Lays out an Upwork-first path to a first AI-automation
  client: build the profile around social proof and a short intro video, price
  low initially to bank reviews rather than maximize early revenue, target
  lower-competition job posts before competing for the big ones, and only
  graduate to LinkedIn outreach/owned lead-gen once the Upwork base is stable —
  a concrete client-acquisition on-ramp distinct from his usual technical-
  execution content. — https://www.youtube.com/watch?v=jzq3FUrQ-u0
- **2026-08-12** — Uses a 7-file "voice" system (built from a person's emails,
  social posts, and past writing) to make Claude Code's output match a specific
  person's tone/vocabulary/stories instead of generic AI phrasing, then wraps the
  whole setup into a single reusable slash command — directly reusable for
  keeping client-facing AI content believably human. —
  https://www.youtube.com/watch?v=aHI8OG6gODA
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
- **2026-09-16** — Persona reference-file system: separate small files (humor, voice,
  stories, opinions) built from the owner's real LinkedIn posts/past writing, fed into
  the Claude Code project so every blog draft gets rewritten in the business owner's
  actual tone instead of generic AI phrasing. Pairs with a SERP-structure-cloning
  prompt pattern: before drafting, have Claude pull the top 3 non-forum ranking pages
  for the target keyword, average their length/heading count/topic coverage, and use
  that as the target structure instead of guessing a format. —
  https://www.youtube.com/watch?v=4IyJm1i__ag
- **2026-09-16** — Uses a free plugin ("Novamira") that gives Claude Code direct write
  access to a WordPress site (pages, posts, themes, plugins) via an application-
  password connection — pixel-perfect custom-PHP builds look best but are only
  editable through Claude Code, while Gutenberg/Elementor builds look rougher but stay
  editable by non-technical staff/clients, a real tradeoff to flag per client. Also
  demos a brand-kit-first design flow: extract a reusable design system
  (colors/type/spacing) from screenshots of the client's existing site via an AI
  design tool, then generate the new page by combining that kit with a separately-
  sourced layout reference before handing off to Claude Code to build. —
  https://www.youtube.com/watch?v=Gt8tT-xf6g4
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
- **2026-09-30** — Structures a reusable Claude Code "second brain" as a
  project scaffold — a CLAUDE.md rulebook plus `context/`, `skills/`,
  `references/`, `design/`, and `output/` folders — so answers about a
  business start pulling from its real numbers and history instead of
  generic AI output; a clean template for scaffolding client-ops workspaces.
  For large one-off research jobs (e.g. competitor/buyer-persona research),
  fans work out across many parallel sub-agents (a "manager" delegating
  slices to "employee" agents) to compress a multi-day pull into minutes.
  Hardens scheduled Claude Routines by attaching a GitHub-hosted reference
  file for context the cloud routine can't reach locally, and by enforcing
  hard guardrails — draft-only actions plus an idempotency/dedupe tag — to
  stop a runaway or looping automation. —
  https://www.youtube.com/watch?v=R3mx8XHX8ns
- **2026-09-30** — Packages a full Google Ads account review into a single
  `/audit` skill that runs 200+ checks across account, campaign/ad-group,
  ad, landing-page, and keyword levels, then shows a plan Claude only
  executes after approval. Flags two outsized quick wins for inherited
  local-service accounts: missing Google Maps ad placement (roughly 8.4x
  the clicks of standard search ads) and untracked phone-call conversions,
  since without conversion tracking the account can't be optimized at all.
  Also argues Google's own "Optimization Score" recommendations correlate
  with more spend rather than more profit, and flags a default
  location-targeting setting ("presence or interest" vs "presence") that
  lets clicks from outside the service area drain budget. —
  https://www.youtube.com/watch?v=j1tcmbOHYZY
- **2026-09-30** — Gives a concrete Semrush filter recipe for a
  `/keyword-research` skill: keep only keywords with meaningful volume
  (~50-100+ searches/mo) and difficulty ≤30, split by intent (transactional
  → service/money pages, informational → blog posts), use CPC as a signal
  of commercial value, then group results into ~5-keyword clusters per page
  to multiply a page's ranking chances. Frames blog content as the "tide
  that lifts" money pages — informational posts build domain authority
  that raises transactional service pages through the rankings — and builds
  each post by researching 30+ sources, extracting the pattern behind the
  current top-3 Google results, then rewriting in an injected distinct
  voice (he uses humor) specifically to raise on-page dwell time as a
  ranking signal. Runs page optimization and audits as repeatable
  one-command skills that score on-page, technical, AI Overview, and
  LLM-discoverability (ChatGPT/Claude/Perplexity) together and explicitly
  check for duplicate/doorway pages sitewide, since a single pass rarely
  reaches a top score. — https://www.youtube.com/watch?v=_0wKlt1vHLY
