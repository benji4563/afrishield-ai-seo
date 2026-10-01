# Platform Guide — one core idea, platform-native outputs

The idea stays the same; the presentation changes. Never paste the same copy everywhere. Specs are in `config/autopilot.config.json → production.output_types` (key = `platform_versions` key on the content object).

> Platform behaviour claims below are working hypotheses from common practice, marked **(test)** where AfriShield has no data yet. `learn` replaces them with our own numbers.

## Which core formats feed which outputs

| Core format | TikTok / Reel / Short | IG carousel | Threads | LinkedIn text | LinkedIn carousel | YouTube long |
|---|---|---|---|---|---|---|
| story | ✅ lead | optional (story in 6 slides) | ✅ short thread | ✅ | — | — |
| case study / proof | ✅ | ✅ lead (before/after) | ✅ single post | ✅ lead | ✅ | ✅ |
| tutorial / screen demo | ✅ | ✅ lead (steps) | optional tip | optional | ✅ (framework) | ✅ |
| experiment / comparison | ✅ lead | ✅ (results) | ✅ | ✅ | ✅ (data) | ✅ |
| myth / opinion / hot take | ✅ | ✅ (myth vs fact) | ✅ lead | ✅ | — | — |
| news reaction | ✅ (fast) | — | ✅ lead | ✅ | — | — |
| behind-the-scenes / failure / lesson | ✅ | optional | ✅ | ✅ lead | — | — |
| Q&A | ✅ | ✅ (FAQ slides) | ✅ (reply-style) | optional | — | — |

---

## TikTok — hook, retention, curiosity, native pacing
**Governed by the `afrishield-tiktok-video-script` skill (standing rule).** Its non-negotiables apply: real founder in frame 1, hard scroll-stop hook in 0–3s (never product-first), comment CTA at ~3s and ~55s, pattern breaks at ~8s and ~25s, overlay text = curiosity not narration, visual-to-word sync, ≥30s (52–60s target), max 5 hashtags at the end, max 3 quality posts/week.
Open question logged by `learn`: both TikToks over 60s outperformed the 30–60s ones on comments (n=2, anecdotal). Keep the rule; A/B one 75–90s story cut.

## Instagram Reel — visual quality, shareability, saves, Reels discovery
- Same master edit, clean export (no TikTok watermark).
- Cover frame designed (thumbnail template A/B/C) — the grid shows it.
- Caption line 1 = the spoken hook verbatim; then 2–4 short lines; question or save prompt; 3–5 hashtags at the end.
- Tighter first 2 seconds than TikTok if the TikTok cut opens slowly **(test)**.

## Instagram carousel — saves, shares, "I'll need this later" (NEW)
**Spec:** 1080×1350 (4:5), 6–10 slides, Signal Style ink ground, rendered by `signal-editor` `Carousel` still compositions.

**Slide grammar**
1. **Cover** — hook as a headline ≤8 words, one signal-green key word, subline ≤12 words, swipe cue. Must work alone in the feed.
2. **Stakes / receipt** — why this matters, ideally the real screenshot (`proof` variant).
3–8. **One idea per slide**, ≤25 words, one visual element each (number, diagram, screenshot crop, before/after).
9. **Takeaway** — the lesson in one sentence.
10. **CTA** — save / share with a named person / comment keyword. Never "link in bio" as the only CTA.

**Carousel types that fit AfriShield:** `step-by-step fix` (Get Found Africa) · `myth vs fact` (Keyword Graveyard) · `before / after audit` (real, permissioned) · `mini data study` (our AI-visibility pilot) · `the signal map` (how AI picks a business, as a SignalPath across slides) · `receipt breakdown` (one real screenshot annotated over 6 slides) · `FAQ` (Ask Elodie).

**Caption:** first line restates the cover promise; body gives context the slides don't; alt text on every slide (accessibility + search); 3–5 hashtags.
**Rules:** text ≥44px; no slide is only decoration; numbers carry their source on the slide; slide count `03/08` visible; the story still has an arc (tension on 2, payoff on 9).

## Threads — conversation, opinion, first-thought honesty (NEW)
**Spec:** text-first, ≤500 characters per post, 1–6 posts in a thread. Image optional (a real screenshot beats a graphic). Posts from the Instagram-linked profile.

**What goes on Threads:** the sharpest single observation from the core idea · hot takes and myths · build-in-public progress ("Day 12 of trying to get AfriShield cited by ChatGPT: still zero. Here's what changed") · questions to owners · real numbers from our research.

**Post grammar**
- **Post 1 stands alone:** one claim or observation + a reason to reply. No "🧵" or "a thread:" throat-clearing.
- **Posts 2–5 (optional):** one supporting point each — the proof, the mechanism, the fix.
- **Last post:** a genuine question ("What does ChatGPT say when you ask for your own business?"), not a keyword CTA.

**Voice:** conversational, lower-case energy allowed, still intelligent; one wry line maximum; no hashtags wall — at most one topic tag **(test)**; no links in post 1 **(test)**.
**Never:** engagement bait ("Agree?"), recycled TikTok caption, invented polls results.

**Example (from a real observation)**
> 1/ We researched 45 West African businesses selling on TikTok — villas, agencies, shops. 44 had no website. Their whole storefront is a caption and a WhatsApp number.
> 2/ That works until a buyer asks ChatGPT "who sells land in Douala?" AI can't recommend a caption.
> 3/ Not a "you need a fancy site" take. A one-page site with your real services, prices and location is enough for AI to read.
> 4/ If you sell on TikTok: what would you put on that one page?

## Facebook Reel & Story — story, discussion, relatability, community, shares
- Same video; **longer, readerly caption** that tells the story for the diaspora and older audience; end with one genuine question.
- Stories: the interactive beat (poll/quiz/question) from the calendar row, or BTS.

## LinkedIn text post — business insight, authority, executive relevance (NEW specifics)
**Spec:** ≤3,000 chars; the hook must land in the first ~210 characters (before "…see more").

**Post grammar**
1. **Line 1–2:** blunt, specific hook — a finding, a number we can back, or a professional tension. No emoji opener.
2. **Story/analysis:** short paragraphs (1–2 lines), one idea per line, `→` bullets for the mechanism or steps.
3. **The business meaning:** what it changes for a hotel GM, a managing partner, a CFO — cost, risk, pipeline.
4. **One arrow CTA:** a question to the reader, or "→ the full study is in the comments" **(test)**.
5. **3–5 hashtags** at the end.

**Voice:** professional storytelling, wry-not-silly, understatement. Data beats adjectives. Name the role, not "businesses".
**Good LinkedIn angles:** original data (our AI-visibility pilot), a lesson from a failure, how a decision was made, what we'd do differently, market observations (Central Africa has no GEO incumbent — framed as analysis, not boasting).

## LinkedIn document carousel (PDF) — frameworks and data (NEW)
**Spec:** 1080×1350 PDF, 7–12 slides, **bone (light) ground**, signalDeep accent, rendered by `signal-editor` and exported to PDF.
- Cover: the finding or framework name; subtitle with the audience ("for hotel GMs").
- Denser than Instagram (≤40 words/slide), but still one idea per slide.
- **At least one data or framework slide** (table, SignalPath, 2×2) with a source line.
- Final slide: takeaway + one question; founder name and afrishieldai.com small.
- Post text above the document: 3–6 lines that give the "why now", not a summary of every slide.

## YouTube Shorts — searchability, clarity, retention
- Tightest 30–45s cut; **title = the phrase a buyer would search** ("Why ChatGPT doesn't recommend your hotel"), not a teaser.
- Description: 2 lines of context + keywords naturally; no hashtag wall (≤3).

## YouTube long-form — authority, search, retention
- 1×/week, 6–12 min: the full audit, experiment write-up or tutorial behind the week's strongest idea.
- Chapters, a searchable title, thumbnail template B or C, first 30s restates the promise and shows the proof exists.

---

## Copy object written by platform-adaptation

```json
"platform_versions": {
  "instagram_carousel": {
    "status": "DRAFT",
    "summary": "7-slide myth vs fact on robots.txt",
    "slides": [{ "variant": "cover", "headline": "Your website may be blocking AI", "emphasis": "blocking", "sub": "One file. Two minutes to check." }],
    "caption": "…", "alt_text": ["…"], "hashtags": "#GEO #AIvisibility #SmallBusinessAfrica"
  },
  "threads": { "status": "DRAFT", "summary": "…", "posts": ["…", "…"] },
  "linkedin": { "status": "DRAFT", "summary": "…", "text": "…", "hashtags": "…" },
  "linkedin_carousel": { "status": "DRAFT", "summary": "…", "slides": [], "post_text": "…" }
}
```
