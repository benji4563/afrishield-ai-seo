# Mike King (iPullRank) — GEO / AI-search science

**Seat:** GEO / AI-Search Strategist · **Lens:** is this content engineered to be
retrieved and cited by generative engines?

## Sources (ingested)
- The AI Search Manual — https://ipullrank.com/ai-search-manual/introduction
- How AI Mode Works & How SEO Can Prepare — https://ipullrank.com/how-ai-mode-works
- How to Win Visibility in AI Search (webinar) — https://www.youtube.com/watch?v=ukpU-EfRtV4
- Technical Content Optimization (webinar) — https://www.youtube.com/watch?v=xW3LAygW8m4
- The Rise of the Marketing Engineer — https://www.youtube.com/watch?v=MRYC0V8BIEw · Best of Mike King — https://ipullrank.com/resources/best-of-mike-king

## Core ideas
- **The blue links are falling; GEO is rising.** Search is becoming synthesis-first
  discovery. The goal shifts from ranking on a SERP to being *part of the answer*,
  whether or not a link is shown.
- **Relevance Engineering (r19g).** Treat relevance as a *measurable score*, not a
  guess. Content and queries become vectors/embeddings; the closer a document's
  vector sits to the query's, the more retrievable it is.
- **RAG powers generative answers.** Two questions decide if you're used: can the
  system *find* your content (retrieval), and can the model *use* it to build a
  trustworthy answer (synthesis)?
- **Query fan-out.** A single user query is decomposed into many sub-queries; you
  win by covering the fan-out, not one head term. He built/open-sourced an early
  query-fan-out tool.
- **Chunk / passage-level retrieval.** Engines retrieve *passages*, not whole pages.
  Optimise each section to stand alone as a quotable snippet.
- **Structured data + entities still matter** — they feed machine-readable context
  that improves retrieval eligibility.
- **The marketing engineer.** Modern marketing is a systems/engineering discipline;
  measurement and infrastructure beat copy tweaks.

## Vocabulary
GEO · Relevance Engineering (r19g) · query fan-out · passage/chunk retrieval ·
embedding/vector relevance · RAG · retrieval eligibility · AI Overviews / AI Mode ·
synthesis-first discovery.

## Stances
- SEO isn't dead, but ranking is now the *entry fee*, not the prize.
- Measure relevance; don't guess. Engineer for retrieval, don't "write for AI."
- Technical rigor and information-retrieval literacy over tactical hacks.

## Recurring lines / framing
- "You don't want to beat the algorithm — you want to crush the competition."
- Music-industry → SEO origin; positions himself as a systems engineer of search.

## How AfriShield applies it
- Engineer every blog/page **section as a self-contained retrievable chunk**
  (our BLUF answer blocks already lean this way — extend to every H2).
- Build **topical maps + entities + structured data** so pages are retrieval-eligible.
- Cover the **query fan-out** of a topic, not just the primary keyword.
- Add a GEO check to the site health / board-review loop: are we actually cited in
  Claude/Gemini/Perplexity/ChatGPT answers for target questions?

## Updates log (auto-ingested)
- **2026-07-29** — [SEO Week 2026 | Zach Chahalis — Why You Need A Relevance Engineer Driving The Car](https://www.youtube.com/watch?v=Rqe_4g2cWA8):
  operationalizes Relevance Engineering into a measurement practice — define
  AI-Search-specific metrics that vary by query type/intent, run controlled
  experiments against them, then feed findings back into content templates
  and editorial strategy, rather than treating relevance as a one-time audit.
- **2026-07-29** — [SEO Week 2026 | Garrett Sussman — Run Persona Run](https://www.youtube.com/watch?v=fmN6Sw0un7w):
  a year of experiments showing AI Search results vary by the searcher's
  persona and personal/connected-data context, not just by the content
  itself — brand visibility in AI answers needs to be measured across
  personas and prompts, not treated as one stable ranking.
- **2026-08-05** — A controlled iPullRank experiment (three account types, ~1,900
  AI Mode responses, ~22,000 brand mentions) found that Gmail-seeded brand mentions
  showed up roughly 5x more often in AI Mode answers than photo-seeded ones and were
  markedly more likely to land in the top 3, while an unseeded control account
  stayed flat — meaning AI-search visibility now extends into a prospect's inbox
  and other Google-ecosystem touchpoints, not just their own site. The lift was
  strongest for subjective/personal-taste categories and tightly constrained
  prompts, weaker for higher-stakes categories (banks, agencies) where answers
  leaned more on public-web consensus — and personalized mentions were still cited
  back to external sources most of the time, so conventional SEO/reputation signals
  remain necessary alongside any inbox-seeding tactic. —
  https://www.youtube.com/watch?v=JjPfPT37li0
- **2026-08-05** — Argues Google's own GEO guidance (downplaying chunking,
  llms.txt) is self-serving — it tends to recommend whatever standardizes the web
  in ways that cut Google's own crawling/parsing cost, similar to past pushes like
  HTTPS and Core Web Vitals. Recommends dropping the 60-character title-tag
  convention in favor of appending top Search Console query terms to titles, since
  Google usually rewrites titles from what's available rather than summarizing the
  page (reports a 10-20% CTR lift from this). Also reframes "AI content" ranking
  drops as an engagement-signal problem, not an authorship-detection one: Google
  provisionally scores new content against similar existing content, then adjusts
  based on real user behavior (bounce/dwell time) — so generic AI-written pages
  with poor UX get demoted regardless of how they were produced. —
  https://www.youtube.com/watch?v=dTHuLMWDFWo
- **2026-10-12** — From an iPullRank content strategist (not Mike King himself):
  when anyone can generate a competent explainer, the question for a topic stops
  being "is it good" and becomes "could a competitor publish the same thing". Her
  sources for content only one firm can write are its own data, a named expert, and
  the questions real prospects ask just before they buy (sales calls, inbox, site
  chatbot). She also treats the article as one format among several — a comparison
  table or a checklist may answer the question better. This matches Wes McDowell's
  "Scar Scale" in his wiki. For AfriShield, whose first-hand material is thin, the
  honest sources are the AI-visibility study dataset, measured audits and real
  prospect questions; a candidate rule, held until there are posts to test it on. —
  https://www.youtube.com/watch?v=6qF8mRrtTms
- **2026-11-28** — A GEO programme in four parts (owner, direction, execution,
  measurement) and a three-layer measurement cascade: input metrics (what was shipped,
  bot visits, rankings for the sub-queries engines run in the background), channel
  metrics (share of voice, citation rate, citation accuracy), then performance (AI
  referral traffic and what it converts). He treats AI answers as mainly a brand
  channel, says a prompt checked once a day tells you little because answers are
  probabilistic, and finds gaps by comparing what an engine selected for its
  background queries with what you have, on and off your site. Video is his easiest
  gap to fill: when an engine looks for a video and none exists it falls back to other
  formats. Blocking AI bots is a business decision, not a technical default. For
  AfriShield: the monthly AI Overview check and the AI-visibility study should report
  a rate across repeated runs, and citation accuracy (is what the assistant says about
  AfriShield true?) is a cheap extra column. — https://www.youtube.com/watch?v=NVcLF2reldk
- **2026-11-28** — Rank trackers are being served reordered results, and Google can
  assemble result pages from generated components (calculators, comparison matrices,
  planners). His conclusion is the same as for AI answers: run each check several
  times, read the distribution rather than one position, and calibrate against Search
  Console. On content, give the reader a reason to click that a generated widget
  cannot: first-hand data, the lower-funnel detail. — https://www.youtube.com/watch?v=95pZgi3Ax3U
- **2026-11-28** — "Agentic marketing for CMOs" (a conversation with iPullRank's
  Director of Marketing, not a solo talk). Draws a line this wiki should keep: he
  files "marketing *to* agents" under his own relevance engineering, and reserves
  "agentic marketing" for using agents to *do* the marketing work — automating around
  people, not replacing them. Names the two things to have ready before any agent
  build: a **context layer** (brand voice/tone, personas, user journeys, business
  documents — the slowest thing to gather because it touches many teams and
  approvals) and **integrations** (API keys, MCPs, the right license tier — a free,
  single-seat tool account won't work). His own build sequence: discovery → an
  agentic plan naming which agents and why → integrations → context layer → build →
  QA → handoff and team training → ongoing agent-ops review, because a model update
  changes an agent's output even on an unchanged prompt, so agents need periodic
  re-checking, not a one-time build. Measures success on three levels: efficiency
  (same or fewer people doing more), utilization, and downstream marketing
  performance (traffic, visibility, social actions actually increasing, not just
  busywork reduced). His one piece of advice for any team, any budget: pick one
  genuinely impactful thing to automate first and use that win to earn the next
  round of buy-in, rather than trying to stand up a whole program at once. For
  AfriShield: this is close to a checklist for the local board-update automation's
  own 7-week dormancy pattern — it had no "agent-ops" review step, so it broke
  silently and nobody noticed until this week's resumption; a periodic health check
  on *that* automation specifically (not just the site-health report) would catch
  the next gap sooner. — https://www.youtube.com/watch?v=aNhNZmz5Twg
  - *Disagreement with the automation's own ledger, not resolved:* today's
    `board/master` commit logged this same video `skipped-off-niche` (shallow,
    judged from the title alone — "staffing an enterprise marketing department
    with agents"). Logged `ingested`/`deep` here instead, having read the full
    transcript and found it squarely relevant to AfriShield's own automation-of-
    automation thesis. Flagged for a human call on which verdict stands once the
    two tracks reconcile.
