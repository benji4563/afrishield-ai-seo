# Board update — 2026-11-28

Seven videos read in full, 0 rules added, 0 rules retired, 3 proposals. This is the first run since 2026-10-12: six Saturday runs did not happen.

## Needs Ben

1. **Two board rules are sitting uncommitted in the blog skill.** `skills/afrishield-blog/SKILL.md` has local, uncommitted edits dated 2026-11-21: BR-2026-11-21-1 (no common-sense declarations) and BR-2026-11-21-2 (city pages are not twins), plus a "brief before drafting" step dated 2026-11-25. Neither rule is logged in `knowledge-base/board/CHANGELOG.md`. This run did not make those edits, so it left the file alone, as the routine requires. This week's posts show the drift BR-2026-11-21-1 targets: all four ShortAnswers open with a definition sentence and no named entity or value (see below). A local edit cannot reach a blog routine that works from `master`. **Decide whether to commit them.** If you do, log both in the CHANGELOG with review-by 2027-01-20. Consider adding one line to BR-1: "the first sentence of the ShortAnswer names an entity, an attribute and a value". Small job.
2. **Consolidate `skills/afrishieldai-seo/SKILL.md`.** It is 425 lines, past the 320-line cap, so no rule can be added to it. This is a half-day edit: merge duplicates and move reference material out.
3. **Measure AI visibility as a rate, not a single answer.** This changes the `agentic-seo-loop` monthly rank/AI-Overview check and the AI-visibility study method. Run each prompt at least 3 times, rephrase it once, and report how often AfriShield appears. Add a column for citation accuracy: is what the assistant says about AfriShield true? Sources:
   - Mike King says answers and even classic results are probabilistic, so read the distribution and calibrate against Search Console ([GEO Operating System](https://www.youtube.com/watch?v=NVcLF2reldk), [generative SERP](https://www.youtube.com/watch?v=95pZgi3Ax3U)).
   - Jono Catliff independently asks every prompt several times and rephrases it before trusting the source list ([video](https://www.youtube.com/watch?v=PvGnb8tKtgw)).

   Expected result: fewer false "cited / not cited" swings month to month. Cost: about 3× the prompt runs. Small change to the routine prompt.

**Conflict with the settled strategy:** Wes McDowell ranks classic SEO "C" and would put the effort into weekly YouTube video and AEO instead of blog posts ([video](https://www.youtube.com/watch?v=xnqmiEz9-fA)). Mike King separately says video is the easiest AI-answer gap to fill. The 3-posts-a-week blog cadence is settled, so this is only flagged. One video for the strongest post each month would not touch that cadence.

## Rules added or retired

None added. The two rule files were both unavailable:
- `afrishield-blog/SKILL.md` carries uncommitted changes this run did not make.
- `afrishieldai-seo/SKILL.md` is over the line cap.

The strongest candidate this week was fully corroborated. Koray's deep-pass fluff test (below) matched the site's own data: the generic ShortAnswer opener appears in 4 of 4 posts. It is already covered in substance by the uncommitted BR-2026-11-21-1, so it waits on proposal 1.

None retired. `CHANGELOG.md` has no active rules, so Part D had nothing to review.

## Posts reviewed (published 2026-11-21 → 27)

| Post | Published | GEO review | geo_audit (pass/warn/fail) |
|---|---|---|---|
| [ai-visibility-for-opticians-in-lagos](https://afrishieldai.com/blog/ai-visibility-for-opticians-in-lagos) | 23 Nov | 7/10: strong regulators (HEFAMAA, ODORBN), no AfriShield-measured number | 16 / 0 / 0 |
| [seo-for-safari-companies-in-tanzania](https://afrishieldai.com/blog/seo-for-safari-companies-in-tanzania) | 24 Nov | 8/10: leads with own audit numbers (n=3); the opening scene is not marked illustrative | 16 / 0 / 0 |
| [hotel-marketing-in-arusha](https://afrishieldai.com/blog/hotel-marketing-in-arusha) | 26 Nov | 8/10: dated measurement in the ShortAnswer; SERP competitors left unnamed | 16 / 0 / 0 |
| [marketing-digital-clinique-cameroun](https://afrishieldai.com/blog/marketing-digital-clinique-cameroun) (FR) | 27 Nov | 7.5/10: decree n° 83-166 is a real gap angle but is not linked; no figure from the Baromètre | 16 / 0 / 0 |

Four posts in seven days, so the blog routine is running. The technical engine finds nothing: every live URL passes all 16 checks. The remaining weaknesses are editorial.

**Recurring drift:**
- **A. Generic first sentence (4/4).** Every ShortAnswer opens with a definition ("X means being found by…") before any entity or value.
- **B. Third-party claims without a link (3–4/4).** Claims about Google policy, Booking.com commission, HEFAMAA/ODORBN and the Cameroon decree are paraphrased with no source URL. This is a candidate rule, held: one week's evidence, no advisor source this run.
- **C. Anonymous competitors and unsourced claims about how assistants behave (4/4).** Lagos and Cameroun carry no AfriShield-measured figure. This overlaps BR-2026-11-21-1 and the iPullRank "could a competitor publish this?" note in the Mike King wiki.

## Videos

| Advisor | Title | Verdict | Depth |
|---|---|---|---|
| Koray Gübür | How Google Judges Your Page Before It Even Crawls It | ingested | deep |
| Koray Gübür | How Many Pages Per Day Before Google Kills Your Site? | ingested | deep |
| Mike King | The GEO Operating System | ingested | deep |
| Mike King | How Do We Move Forward if the SERP Is Generative? | ingested | deep |
| Wes McDowell | The New Rules of Digital Marketing (Ranked for 2027) | ingested | deep |
| Dan Martell | If you only watch one sales video, make it this one | ingested | deep |
| Jono Catliff | Claude Code SEO: Steal Your Competitor's Traffic (5 Prompts) | skipped-nothing-new | deep |
| Mike King | Inside SEO Week — Angela Skane (Apr) | skipped-backlog | shallow |
| 26 others | AI-tool launches (all 10 Julian Goldie), YouTube-growth (6 Wes), Google Ads / cold email / tools (4 Jono), life & motivation (5 Dan), enterprise agent org (1 Mike) | skipped-off-niche | shallow |

What each one taught:
- **Koray, crawl video.** The fluff test: a claim anyone could make without expertise must become a named entity, an attribute and a value. Engines form a first quality guess from the opening sentences. "Source context": Google first picks which type of site deserves a query.
- **Koray, pace video.** Ramp a new section up gradually and taper it down. A location with no demand of its own belongs as a subheading on its parent city page. This backs the `local-seo` doorway check.
- **Mike King, GEO OS.** A measurement cascade (input → channel → performance). Find gaps by comparing what engines select for their background queries with what you have, on and off site. Video is the easiest gap.
- **Mike King, generative SERP.** Rank trackers get reordered results, so measure distributions, calibrate against Search Console, and give a reason to click that a widget cannot.
- **Wes McDowell.** The channel tier list above, and the conflict flagged above.
- **Dan Martell.** A connect / diagnose / prescribe / commit call script. Raise budget, decision-maker and time before the price. Review lost-call transcripts with AI. Useful for the free-check and audit calls.

**Not adopted: manipulative.** All from Koray. Each deceives an engine or fakes a signal:
- canonical-confusion exact-match domains
- expired GBP domains
- fake shop pages redirecting to casinos
- bought canonicals and links planned on an "external topical map"
- automated Reddit link posting
- fake "authorship signatures" to evade AI detection
- hiding a new site from Googlebot while it is linked

Not adopted as a pressure tactic: Dan Martell's taking payment from a prospect who is driving.

## What could not be done

- Channel listing worked for all six advisors.
- All seven transcripts came free from yt-dlp `en-orig` captions. Firecrawl credits used: 0. Frame passes used: 0, because nothing essential was on screen only.
- Read 7 of the 8-video cap. Five on-niche uploads from the last 60 days were not reached and stay unlogged for next week:
  - Koray ×3: `zmBPOI9k7r8`, `dEUHYzBRI0w`, `D7P6-b1XtxE`
  - Dan: `YD8uRumP8cM`
  - Jono, carried over from last run: `M2KJ5-sFbbg`
- yt-dlp warns it is more than 90 days old. It still works, but `pip install -U yt-dlp` is worth doing.
- Search Console was not queried this run.

39 old `board/*` branches still sit unmerged on origin.
