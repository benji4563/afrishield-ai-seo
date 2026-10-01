# AfriShield AI — Content Autopilot

A content operating system that keeps improving the **existing** AfriShield content calendar and turns approved ideas into platform-native content: TikTok, Instagram (Reels, carousels, Stories), Threads, Facebook, LinkedIn (text + document carousels) and YouTube.

The founder records. The system researches, finds gaps, generates and scores ideas, adds real stories and honest humor, scripts, briefs, edits in Remotion (AFRISHIELD SIGNAL STYLE), adapts per platform, runs QA and factuality checks, schedules after approval, and learns from performance.

> **Never replaces the calendar.** The 180-day calendar (`../../Afrishield content startegy plan/180-day-calendar/`) stays the editorial source of truth. It is ingested into a living database, audited, and extended. Nothing is silently deleted.

## How it's built

```
             ┌──────────────────────── Claude Code skills (judgment) ────────────────────────┐
             │ content-autopilot (orchestrator) · calendar-manager · content-gap-analysis     │
             │ idea-generation · idea-scoring · storytelling · story-bank · humor-writing     │
             │ research · trend-analysis · script-writing (+ afrishield-tiktok-video-script)  │
             │ recording-director · video-analysis · remotion-editing · platform-adaptation   │
             │ thumbnail-generation · social-copywriting · seo-writing · scheduling           │
             │ analytics · performance-learning · quality-control · fact-checking · memory    │
             └───────────────▲──────────────────────────────┬───────────────────────────────┘
                 structured  │ JSON / reports                │ engine commands
             ┌───────────────┴──────────────────────────────▼───────────────────────────────┐
             │ engine/ (Node, no dependencies) — deterministic work and hard gates           │
             │ ingest · gaps · ideas:check/propose · approve · qa · status · schedule ·      │
             │ analytics import · learn · story bank · export                                │
             └───────────────▲──────────────────────────────┬───────────────────────────────┘
                             │                              │
      calendar CSVs + freestyle lab       data/ (content-db, idea-bank, story-bank, learning, runs)
                                                            │
             ┌──────────────────────────────────────────────▼───────────────────────────────┐
             │ signal-editor/ (Remotion 4.0.520) — transcribe → analyze → edit spec → render │
             │ 24 Signal Style components · burst captions · carousels (PNG) · LinkedIn PDF  │
             └──────────────────────────────────────────────────────────────────────────────┘
```

Skills live in `02 Services ai seo/.claude/skills/<name>/SKILL.md` and load in any Claude Code session started inside `02 Services ai seo`.

## Master commands (say them to Claude)

| Command | What happens |
|---|---|
| **RUN CONTENT AUTOPILOT** | The 24-step loop (content-autopilot skill). Stops for your approval before calendar insertion and before publishing. |
| **UPDATE CONTENT CALENDAR** | Audit → find gaps → generate → score → filter → enrich → propose → (you approve) → add → rebalance. Never deletes. |
| **FIND STORY OPPORTUNITIES** | Scans recent work for real build-in-public moments; adds evidenced stories to the story bank. |
| **ADD HUMOR LAYER** | Rates items NO / LIGHT / MODERATE / STRONG and writes honest comedic framing. |

## Engine CLI (run from this folder)

```bash
node engine/cli.mjs prepare                      # ingest → import Metricool → learn → gaps → story scan → export
node engine/cli.mjs list --next 14               # the next two weeks
node engine/cli.mjs ideas:check data/inbox/ideas-YYYY-MM-DD.json
node engine/cli.mjs ideas:propose                # proposals only — nothing is on the calendar yet
node engine/cli.mjs approve AFR-CONTENT-000207 --by "Ben"
node engine/cli.mjs qa AFR-CONTENT-000031        # QA + factuality gate
node engine/cli.mjs approve-publish AFR-CONTENT-000031 --by "Ben"
node engine/cli.mjs schedule:suggest AFR-CONTENT-000031 --platform tiktok --save
node engine/cli.mjs learn
node --test engine/tests/engine.test.mjs
```

`node engine/cli.mjs help` lists everything.

## Editor (run from `signal-editor/`)

```bash
node scripts/transcribe.mjs "<video.mp4>" --id <content_id>
node scripts/analyze-recording.mjs <content_id> --script ../production/<content_id>/script.md --out ../production/<content_id>
node scripts/build-edit-spec.mjs <content_id> --cues ../production/<content_id>/cues.json --out-id <content_id>-edit --production-dir ../production/<content_id>
node scripts/render-spec.mjs public/specs/<content_id>-edit.json --out ../production/<content_id>/renders/<content_id>.mp4
node scripts/render-carousel.mjs ../production/<content_id>/instagram-slides.json --theme instagram --out ../production/<content_id>/renders/ig
node scripts/render-gallery.mjs                  # contact sheet of all components
npx remotion studio                              # visual preview
```

## Folder map

| Path | Contents |
|---|---|
| `config/autopilot.config.json` | Every tunable: statuses, scoring bands, dedupe thresholds, balance targets, output cadences (incl. IG carousel, Threads, LinkedIn carousel), approval mode, scheduling windows, Metricool field IDs |
| `config/schemas/content-object.schema.json` | The structured content object |
| `guides/` | brand-guide · voice · visual-system · storytelling-guide · humor-guide · platform-guide · quality-control — read by every agent |
| `engine/` | CLI, libraries, tests |
| `data/content-db.json` | The living calendar database (`AFR-CONTENT-######`) |
| `data/idea-bank.json` · `data/story-bank.json` | Ideas with scores/decisions · real evidenced stories |
| `data/performance/raw/` | Verbatim analytics pulls |
| `data/learning/` | content-intelligence, gap brief |
| `data/runs/` · `data/backups/` | Run logs · automatic backups before every write |
| `reports/` | Gap analyses, idea checks, proposals, learning reports, story scans |
| `exports/` | `living-calendar.csv` (33 original columns + living-DB columns), board overlay |
| `production/<content_id>/` | script, recording brief, analysis, cues, edit spec, renders, copy, qa.json |
| `signal-editor/` | Remotion project |

## Lifecycle and gates

`IDEA → SCORED → APPROVED → SCRIPTED → RECORDED → EDITING → QA → SCHEDULED → PUBLISHED → ANALYZED → ARCHIVED`

- Existing calendar rows enter as **APPROVED** (you planned them). Autopilot ideas enter as **SCORED** proposals.
- **APPROVED** (autopilot ideas) needs your recorded calendar approval.
- **SCHEDULED** needs QA passed. **PUBLISHED** needs QA passed + your recorded publish approval.
- Approval mode: `USER_APPROVAL_REQUIRED` (default). `AUTONOMOUS_LOW_RISK` stays locked until `autonomy-check` passes.
- Open story-authenticity flags block QA.

## First run — 2026-09-14

See `reports/autopilot-first-run-2026-09-14.md` for the findings and the decisions waiting for you.
