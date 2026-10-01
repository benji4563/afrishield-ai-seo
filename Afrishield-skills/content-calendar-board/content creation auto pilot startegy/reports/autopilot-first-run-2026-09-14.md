# Content Autopilot — first run report (2026-09-14)

**Mode:** USER_APPROVAL_REQUIRED · nothing was added to the calendar or published without you.

## 1. What exists now

| Part | Where | Status |
|---|---|---|
| Living calendar database | `data/content-db.json` | 195 items from the 180-day calendar + freestyle lab, plus 6 published TikToks and 4 proposals. IDs `AFR-CONTENT-000001…205`. Re-ingest is idempotent (0 added / 195 unchanged on the second run). |
| Engine | `engine/cli.mjs` | Ingest, gap analysis, idea gate, proposals, approvals, QA/factuality gate, scheduling, analytics import, learning, story bank, export. 9/9 tests pass. |
| Skills (24) | `02 Services ai seo/.claude/skills/` | Orchestrator `content-autopilot` + 23 specialists, each with inputs / process / outputs / rules / failure conditions. |
| Guides (7) | `guides/` | brand, voice, visual system, storytelling, humor, platform (incl. IG carousel, Threads, LinkedIn text + document carousel), quality control. |
| Signal Style editor | `signal-editor/` | 24 Remotion components + carousel slides, real-transcript edit specs, burst captions, PNG carousels, LinkedIn PDF. |

## 2. What the audit found in your calendar

| Severity | Finding |
|---|---|
| HIGH | **25 rows narrate events with no evidence** (e.g. Day 1 "A hotel owner showed me his analytics"). They're flagged `STORY_EVIDENCE_NEEDED`; QA blocks them until each is linked to a real story, filmed as a test, or labeled hypothetical. A further 31 rows are on-camera tests ("I asked ChatGPT…") — fine as long as the recording shows the real result. |
| HIGH | **29 calendar days are past due** (Aug 17 → Sep 14), all "Not Started", while 6 posts went out off-plan. The calendar needs to reflect reality before it grows. |
| HIGH | **Cameroon appears in 4 of 195 items; Tanzania in 32.** Your home market — where the Aug 30 baseline found no GEO incumbent — is nearly absent. |
| DECISION | **Volume:** at the configured cadences the plan yields ~806 counted outputs (~1,170 with Stories) against ~1,600. |
| MEDIUM | 12 near-duplicate pairs inside the calendar (e.g. Day 5 vs Day 152 safari prompts; Day 55 vs 62 inbox demos). |
| MEDIUM | 25 rows use statistics with no recorded source. |
| MEDIUM | Balance: Tourism −5.7pp, Professional Services −6pp, Cross-Industry +13.9pp vs brief targets. |
| MEDIUM | No item has an objective, a story evaluation, a humor evaluation, or carousel/Threads/LinkedIn-carousel versions yet. |
| LOW | News reaction ~0.5%; AI news and fintech barely covered; 5 series never scheduled (FIX MY WEBSITE, GEO Glossary, One Bar Test, Free Audit Diaries, AI Search News). |

Full report: `reports/gap-analysis-2026-09-14.md`.

## 3. Story bank

11 stories, each pointing to its evidence file. **9 usable** (own work / public record / anonymized). Blocked: NJ Accounting & Tax (permission and outcomes not documented). Unverified claims are recorded and must not be repeated as fact, e.g. the Eva caption's "booking real salon clients right now" and "$20,000 dev quote".

## 4. Ideas — first batch (10)

| Decision | Ideas |
|---|---|
| **Proposed (STRONG)** — awaiting your approval | AFR-CONTENT-000202 "We sell AI visibility. AI doesn't know we exist." (89) → 2027-02-06 · AFR-CONTENT-000203 "44 of 45 had no website" (87) → 2026-09-24 · AFR-CONTENT-000204 "Who owns page one in African tourism?" (83) → 2026-10-01 · AFR-CONTENT-000205 "Asking ChatGPT for the best hotels in Douala — live" (80) → 2026-09-25 |
| Idea bank (70–79) | first five TikToks (79) · invented team list / AI FAILS (79) · WhatsApp assistant in Pidgin (79 — matched to your published Eva post, related not duplicate) · calendar audit build-in-public (77) · One Bar Test (76) · law-firm page framework (72 — related to the tourism study idea) |
| Rejected | none |

To approve: tell me which, and I'll run `node engine/cli.mjs approve <id> --by "Ben"` (date defaults to the proposed slot).

## 5. Performance learning (6 TikToks from Metricool)

- Metrics available: views, likes, comments, shares. **Missing:** retention, saves, clicks, leads — TikTok Business analytics isn't connected in Metricool, so learning is an engagement proxy only.
- Everything is anecdotal at n=6. The one tension worth testing: **both posts over 60s (the 132s White House story, the 82s Eva build) drew more comments than the three 30–60s posts** — which conflicts with the TikTok skill's hard 60s cap. The system keeps the rule and recommends one 75–90s A/B test.

## 6. Demos built on real material

- **White House Signal Style edit** — `production/demo-whitehouse-ai-visibility/`: speech analysis of the real recording (hook sentence ends at 13.7s; only CTA at 2:07; mis-heard names corrected: Douala, Akwa, Bonamoussadi, Bonapriso, Yaoundé, ChatGPT, Claude), edit spec anchored to the actual words, preview stills, and the rendered video `renders/whitehouse-signal-edit.mp4` (2:11, 1080×1920, H.264/AAC). The source file is an earlier edited cut with graphics already burned in at ~30–41s and ~55–100s, so Signal overlays only sit on clean founder footage — it demonstrates the pipeline; for publishing, feed raw recordings.
- **"44 of 45" carousel** — `production/demo-carousel-44-of-45/`: 8-slide Instagram carousel (PNG, ink theme), 8-page LinkedIn document carousel (PDF, bone theme — verified opening in Chrome's PDF viewer), and platform copy for Instagram, Threads (4 posts) and LinkedIn. All claims are observations from the lead tracker; no business named.
- **Component gallery** — `signal-editor/out/gallery/contact-sheet.jpg`: all 24 Signal Style components rendered for visual QA (mock content carries ILLUSTRATION tags).

### Bugs found and fixed by running on real material
Whisper `[BLANK_AUDIO]` inflating duration · quote tokens gluing words ("conversation.This") · captions crossing sentence ends · cues sharing a phrase flagged out of order · end phrases not matching after corrections · SignalPath nodes and pulse label under the caption band · Headline overflow on long words · Screenshot source line under captions · published posts invisible to the duplicate check · batch matches shown as `null` · re-checking an idea creating duplicate bank entries · HEVC phone footage undecodable in Chrome (now auto H.264 proxy) · Remotion browser download failing on Windows path length.

## 7. Decisions waiting for you

1. **Approve / reject the 4 proposals** (or change their dates).
2. **Past-due days (29):** for each, mark published-under-another-name, reschedule, or flag for review — or let me propose a bulk reschedule.
3. **Volume vs 1,600:** raise cadence of cheap text/carousel outputs (Threads, LinkedIn, carousels), add a secondary lane of core ideas, count Stories, or accept fewer.
4. **The 25 unevidenced rows:** I can draft a rewrite for each (link a real story / on-camera test / labeled hypothetical) for you to approve.
5. **TikTok 60s rule:** OK to run one 75–90s story-cut A/B test?
6. **The TikTok script skill** hard-codes the "rented land" core story and a ChatGPT verification ending; the autopilot treats those as examples so every video isn't the same story. Should I generalize the skill file itself?
7. **Connect TikTok Business analytics in Metricool** (retention data) and confirm which other networks are connected for Threads/LinkedIn/Instagram pulls.
8. **NJ Accounting & Tax:** do you have permission to publish the case study and its numbers?
9. **Fintech niche:** still undecided from the Aug 29 lead research — keep it out of new ideas until you decide?

## 8. Known limits (honest)

- Gap detection and dedupe are heuristic (no embedding API). They surfaced real issues and a few false positives were fixed during this run; the gap-analysis skill is instructed to judge the report, not obey it blindly.
- AI-answer results can't be generated by the system — they must be performed and recorded on camera.
- Whisper `base.en` mis-hears names; `transcribe.mjs` now defaults to `medium.en` for new recordings.
- Remotion's own browser download fails in this deep Windows path; render scripts reuse the Chrome from `whitehouse-visuals` (override with `REMOTION_BROWSER_EXECUTABLE`).
