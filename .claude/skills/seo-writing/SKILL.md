---
name: seo-writing
description: AfriShield Content Autopilot — search-optimized copy for social video and repurposing: YouTube Shorts/long-form titles, descriptions and chapters, searchable TikTok/Instagram keyword phrasing, alt text, and turning strong items into blog/GEO pages. Use when an AfriShield output must be found by search (YouTube, TikTok search, Google, AI engines).
---

# SEO Writing

ROOT: `C:\Users\hp\Documents\AFRISHIELD\02 Services ai seo\Afrishieldai SEO SALES AND MARKETING\content-calendar-board\content creation auto pilot startegy`

Read: `guides/voice.md`, `guides/platform-guide.md`. For blog posts also use the `seo-blog-humor-style` skill and consider the `board-geo-reviewer` agent.

## INPUTS
Item topic/lesson · the calendar row's `seo_keywords` · research notes · final video.

## PROCESS
1. Identify the phrase a buyer would actually search ("why chatgpt doesn't recommend my hotel", "is a website necessary for small business"). Validate with available data (the AfriShield keyword engine via the `keyword-finder` skill for volume and competition, not DataForSEO; TikTok search suggestions the user shares) — label unvalidated keywords as assumptions.
2. **YouTube Short:** title = the searchable phrase (≤70 chars), description 2 lines + keywords naturally, ≤3 hashtags.
3. **YouTube long-form:** title, 150-word description with the promise and proof, chapters with timestamps from the transcript, 1 pinned-comment question.
4. **TikTok/IG:** put the searchable phrase naturally in the first caption line and on the cover.
5. **Repurpose to web** (strong case studies/data): outline a page with the question as H1, the direct answer in the first paragraph, the evidence, FAQ, and schema suggestions; hand to the website work stream.

## RULES
- No keyword stuffing; titles must be true to the content.
- Entity consistency: "AfriShield AI", "Benjamin Njock", afrishieldai.com.
- Don't claim rankings or citations we haven't measured.

## OUTPUTS
Search copy in `production/<id>/copy.md`; optional page outline `production/<id>/web-outline.md`.

## FAILURE CONDITIONS
No evidence anyone searches the phrase → say so; use the clearest descriptive title instead.
