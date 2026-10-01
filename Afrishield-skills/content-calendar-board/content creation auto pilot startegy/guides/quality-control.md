# Quality Control & Factuality Gate

Nothing is scheduled without QA passing (`node engine/cli.mjs qa <id>`), and nothing is published without a recorded human approval while `approval.mode = USER_APPROVAL_REQUIRED`. The engine enforces both; agents cannot bypass them.

## 1. Content quality standard (editorial — before scripting)

Every item must answer **yes** to most of these; repeated "no" → revise or reject:

1. Would this teach something?
2. Would this make someone stop scrolling?
3. Would this be memorable?
4. Is there a real reason for this post to exist?
5. Is the story true (or clearly labeled)?
6. Is the humor honest (framing, not fake evidence)?
7. Is the insight useful to the named audience?
8. Is it different from what we already published (engine dedupe verdict)?
9. Does it sound human (read it aloud)?
10. Does it sound like AfriShield (`voice.md`)?

## 2. Anti-AI-garbage rule

Reject content that exists only to fill the calendar: "5 AI tools you need in 2026" without a real editorial reason · "AI is changing the world" · empty motivation · generic AI news summaries with no angle for our audience. Every post needs **a point, a reason, a story or proof when available, and a useful insight.**

## 3. Factuality gate

Before publication every claim (VO, on-screen text, caption, carousel slide, thread post) is classified:

| Category | Rule |
|---|---|
| `FACT` | `evidence` required (source URL, dataset path, screenshot/recording timestamp) |
| `OPINION` | Must read as opinion ("I think", "our view") |
| `ANALYSIS` | Reasoning from cited facts; the facts are listed separately |
| `HYPOTHETICAL` | Must be labeled in the content (`labeled_on_screen: true`) |
| `HUMOR` | Comedic framing only; can never be used as testimonial/result/proof |
| `PERSONAL_EXPERIENCE` | Needs a story-bank `story_id` with usable permission, or on-camera evidence |

If a claim's category cannot be determined → `UNDETERMINED` → **FLAG FOR REVIEW** (QA fails).

Never convert HYPOTHETICAL → FACT. Never convert HUMOR → TESTIMONIAL. Never convert ASSUMPTION → DATA. Estimates are hedged in the copy ("roughly", "an estimated").

## 4. QA checklist (production/<content_id>/qa.json)

Each check is `PASS`, `FAIL` or `NA` with a note. FACTS, SPELLING, CTA, BRANDING, STORY_AUTHENTICITY and DISCLOSURES can never be `NA`.

| Check | What to verify |
|---|---|
| FACTS | Every FACT claim has evidence; numbers match the source exactly |
| SPELLING | On-screen text, captions, slides, copy — zero typos (the Aug 26 TikTok typo killed trust) |
| CAPTIONS | Burst captions match what was actually said (transcript), 2–5 words, no leftovers |
| VISUAL_TIMING | Every visual appears on its word, leaves when the narration moves on; nothing previews a punchline |
| AUDIO | VO clear, no clipping, music/SFX never over the voice |
| VIDEO_QUALITY | 1080×1920 (or spec), no watermark, no dropped frames |
| BRANDING | Signal Style tokens, fonts, one accent; "AfriShield AI" spelled in full |
| CTA | One CTA, matches the funnel stage, not a repeat of yesterday's |
| PLATFORM_FORMAT | Runtime/aspect/slide count/char limits per `platform-guide.md` |
| SAFE_ZONES | Key text inside the composite safe area |
| LINKS | Every link resolves; no link in the first Threads post (test rule) |
| THUMBNAIL | Cover/thumbnail readable at small size; promise matches content |
| TITLE | Searchable (YouTube), no clickbait the content doesn't pay off |
| DESCRIPTION | Caption/description accurate, hashtags at the end only |
| HASHTAGS | ≤5 (TikTok/IG), ≤3 (YouTube), ≤1 topic tag (Threads), 3–5 (LinkedIn) |
| DISCLOSURES | Illustrations labeled ILLUSTRATION; hypotheticals labeled; AI-generated media disclosed where platforms require |
| STORY_AUTHENTICITY | real_story.kind is correct; no open STORY_EVIDENCE_NEEDED / FABRICATION_RISK flags |

### qa.json shape

```json
{
  "content_id": "AFR-CONTENT-000031",
  "checked_by": "quality-control agent",
  "checks": { "FACTS": { "result": "PASS", "note": "…" } },
  "claims": [
    { "text": "44 of 45 businesses we researched had no website", "category": "FACT", "evidence": "../../TikTok-Lead-Gen-WestAfrica/TIKTOK_LEADS_TRACKER.csv", "used_as": "proof" },
    { "text": "AI needed an introduction", "category": "HUMOR", "used_as": "framing" }
  ],
  "platform_copy": { "tiktok": { "runtime_s": 57, "hashtags": "#GEO #AIvisibility" } }
}
```

## 5. Approval modes

| Mode | Behaviour |
|---|---|
| `USER_APPROVAL_REQUIRED` (default) | User approves each calendar insertion and each publish in chat; agent then records it with `approve` / `approve-publish --by "<name>"` |
| `WEEKLY_BATCH_APPROVAL` | User approves a week's batch in one message; agent records each id |
| `AUTONOMOUS_LOW_RISK` | Only after `autonomy-check` passes (≥30 clean published items, zero open factuality flags in 30 days); never for case studies, proof, news, or anything naming a real third party |

Agents never record an approval the user did not give in chat.

## 6. Failure handling

QA failure → item stays in its status with a `QA_FAILED` flag and the failure list → the owning agent fixes → re-run `qa`. Three consecutive failures on the same check → escalate to the user with the evidence.
