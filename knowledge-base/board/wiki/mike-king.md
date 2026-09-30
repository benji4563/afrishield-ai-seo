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
- **2026-09-30** — [SEO Value Happens After the Click - Brie Anderson - Inside SEO Week](https://www.youtube.com/watch?v=578yMDdaGEA):
  As privacy blockers and "direct"-traffic buckets erode last-click attribution,
  the sturdier way to prove AI-SEO work's value is downstream engagement (e.g.,
  showing that an internal-linking fix measurably deepens site visits) rather than
  crediting one channel. Also flags that LLM/AI-training scraper traffic is
  polluting GA4 as source/medium "not set" with near-zero time-on-site, and
  default bot filters miss it — ongoing manual filtering is needed to keep
  AI-search analytics trustworthy.
- **2026-09-30** — [Content Strategy Is Now a Differentiation Problem - Angela Clark - Inside SEO Week](https://www.youtube.com/watch?v=6qF8mRrtTms):
  As AI answers commodify generic "definition" content, real differentiation comes
  from mining a client's own proprietary assets — e.g., recurring questions logged
  in their on-site chatbot — into content competitors can't replicate. Recommends
  diversifying content format per query (comparison tables, checklists,
  interactive tools, short visuals) rather than defaulting to a long-form article,
  since users increasingly want a fast synthesized answer.
- **2026-09-30** — [Training Data Is Quietly Deciding Winners in AI Search - Inside SEO Week - Metehan Yeşilyurt](https://www.youtube.com/watch?v=VBH9Od_OL1Q):
  Training-data presence is emerging as its own AI-visibility lever distinct from
  live RAG retrieval — many LLM answers to generic questions draw on memorized
  training data, so a brand's footprint in corpora like Common Crawl can affect
  AI-answer inclusion independent of current site rankings. Notes some publishers
  now block Common Crawl's bot, likely excluding them from that training data —
  worth treating "allow CCBot" as a deliberate technical decision rather than a
  robots.txt afterthought.
