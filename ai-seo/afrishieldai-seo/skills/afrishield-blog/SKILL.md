---
name: afrishield-blog
description: >
  Write and publish one complete, build-verified blog post for an AfriShield AI-SEO
  marketing site (Next.js App Router), end to end: pick the next keyword (from the
  repo's content-queue.md, or from the AfriShield keyword engine in an interactive session), write it in
  the established AfriShield voice on the fixed post template, register it, verify with
  next build, and publish (push to master, or open a PR for review). This is the
  generic, reusable adaptation of the NJ nj-seo pipeline for the AI-SEO product line.
  Trigger on "write a blog post", "publish an article", "run the blog pipeline",
  "target a keyword", or "add to the blog". Argument is an optional keyword.
argument-hint: "<optional primary keyword>"
user-invocable: true
---

# afrishield-blog — the AI-SEO blog post pipeline

One post, start to finish, the same shape every time. The template, JSON-LD, layout
components, and registration were solved once and are **not re-decided per post** —
you fill a proven template with new research and new writing.

> **Template skill (per AfriShield CLAUDE.md).** Generic and reusable across AI-SEO
> client sites. It is the product-line sibling of NJ's client-specific `nj-seo`
> skill: same philosophy (one cluster per post, keyword logged once, human-grade
> editing, build-gated publish), retargeted at any AfriShield AI-SEO marketing site.
> Nothing client-specific belongs here.

All paths below are relative to the **marketing site root** (e.g.
`ai-seo/marketing-site/`). Read the current reference post before writing:
`app/blog/answer-engine-optimization/page.tsx`.

## 1. Pick the primary keyword

Two sources, depending on where you are running:

- **Interactive session** — do real research with AfriShield's keyword engine
  (the `keyword-finder` skill: `keyword_orchestrator.py` for ideas, volume, CPC and
  ad competition, then `serp_competition.py` for who ranks on page one), with a
  real target market, e.g. `--country za --lang en`. Do not use DataForSEO for
  keyword ideas or metrics; it is retired for keyword research. Avoid seeding on
  the bare word "ai" — it explodes into AI-tool noise (humanizer, image
  generator). Weigh low competition, commercial value, brand fit, and early-mover
  AI-answer terms over raw volume; single African markets show low absolute
  volume (10–40) by nature. Drop terms the engine returns no volume data for —
  too new to target yet (park them on the queue watchlist).
- **Automated / scheduled run (no keyword engine)** — take the **first `queued` row** from
  `content-queue.md`. That file is the decoupled research handoff. Never invent a
  keyword when the queue is empty — stop and report.

Either way: **one primary keyword per post, logged once, never reused.** Cross-check
`used-keywords.md` and the `claimed` section of `content-queue.md` before committing
to a keyword.

## 2. Research the SERP before writing

Read the top 2–3 ranking pages for the keyword. You are looking for what they all
cover (you must cover it too), what they all miss (your angle), and roughly how long
they run. Pull the "People also ask" questions — they become FAQ entries.

## 3. Write the post

Copy the structure of `app/blog/answer-engine-optimization/page.tsx` exactly into
`app/blog/<slug>/page.tsx` (`<slug>` = hyphenated keyword). The fixed shape:

`metadata` → `TOC` array → `FAQ` array → three `StructuredData` blocks
(`blogPostingJsonLd`, `faqPageJsonLd`, `breadcrumbJsonLd`) → `PostShell` wrapping
`ShortAnswer` → `Scene` → 7–9 `<h2>` sections with matching TOC ids → one comparison
table (`<figure><table>`) → the FAQ (rendered by `PostShell`).

Components live in `components/blog/PostLayout.tsx` (`PostShell`, `ShortAnswer`,
`Scene`); JSON-LD helpers in `lib/structured-data.ts`; `PostMeta` in `lib/posts.ts`.
Every post also carries one hero image, wired in the page itself rather than
through a `PostMeta` field — see "Hero image" below.

Non-negotiables:

- The **primary keyword is answered outright in the `ShortAnswer`**, within the
  first 100 words, phrased naturally. It is the featured-snippet / AI-answer target.
- **Humor / voice skill (mandatory — every post, including automated auto-poster
  runs).** Invoke the **`seo-blog-humor-style`** skill and apply its locked-in
  humor/voice reference to the whole draft. Load it *before* writing and keep it
  applied through editing. This is what keeps posts human and on-brand instead of
  reading like generic AI-written SEO filler; it is not optional and not only for
  interactive runs.
- **Voice:** dry, plain, honest, faintly self-deprecating, anti-hype. No guaranteed
  rankings. African-market aware — mid-range Android phones on patchy connections,
  African cities and names as **clearly labelled** illustrative composites (the
  `Scene` component already stamps "Illustrative composite"). Minimise contractions;
  the measured register is deliberate.
- **Humor:** apply the standing reference `../humor-writing/SKILL.md` on **every**
  post — it is the locked-in source material (distilled from the hireawriter.us
  humor article) for the wry register. 3–5 dry touches per post, aimed at the
  industry, never in the ShortAnswer, H2 opener sentences, FAQ answers, or
  metadata.
- **6 FAQ entries**, drawn from real "People also ask", 2–4 sentences each.
- **Liftable H2 openers (board: Mike King / retrieval).** The first sentence under
  every `<h2>` must answer that heading's implicit question outright, before any
  framing or warm-up — the same BLUF discipline the `ShortAnswer` uses, applied per
  chunk. An answer engine retrieves the *section*, not the page, so a soft opener
  ("It helps to picture…", "There is a genuine opening here…") gets lifted and says
  nothing. **Before publish, re-read every H2's opening sentence in isolation, as if
  it were the only text an AI had retrieved, for *all* sections — not just the ones
  that felt weak while drafting.** A partial pass (some sections fixed, others left
  soft) is not compliance; the 2026-08-04 board review caught 3 of 6 sections still
  soft-opening in a post whose earlier board fix had only checked the other two.
- **HowTo schema for numbered sequences (board: Mike King).** If a section is a
  numbered how-to (an `<ol>` walking the reader through steps), add a matching
  `howToJsonLd` `StructuredData` block (already exported from `lib/structured-data.ts`)
  alongside the standard three — free retrieval surface, otherwise left on the table.
- **Contextual internal links (board: Koray / topical authority).** Include 2–4
  in-body anchor-text links to sibling posts in the same `content-queue.md` cluster,
  with descriptive anchors naming the target topic — do not rely on the auto
  `RelatedPosts` block, which is undifferentiated. If no cluster sibling exists yet,
  leave an HTML comment noting the intended link target to back-fill on publish.
- **Differentiation angle vs. existing posts (board: Koray / topical map).** Before
  drafting, read the `cardTitle`/`description` of every existing entry in `POSTS`
  (`lib/posts.ts`) and confirm in one sentence what this post uniquely covers that no
  live post already does — this extends the existing "cross-check `used-keywords.md`"
  step from exact-keyword match to topical overlap. A keyword can be un-claimed and
  still risk restating a sibling post in miniature; when that happens, narrow the
  angle (e.g. make it the synthesis/decision layer that links out to the posts owning
  the granular detail) rather than re-deriving material that already exists elsewhere
  on the site.
- **Skip-count escalation (board: Dan Martell, 2026-09-22).** If a `queued` row fails
  the differentiation-angle check, log the skip note as usual and move to the next
  `queued` row — but on the **third consecutive skip of the same row**, do not log a
  fourth note. Flip its `content-queue.md` status straight to `retired` (one-line
  reason: which sibling post it duplicates, and the skip dates) and move on. Six
  identical "queue-keeper: needs a decision" notes piled up on row 9 (`what is local
  seo`, 2026-08-18 → 2026-08-23) before anyone acted — a note nobody is staffed to
  read is not a resolution mechanism, and every extra skip burns a pick-cycle for
  nothing. Three tries is enough evidence a row needs narrowing that isn't happening;
  auto-retiring is reversible (a human can always re-queue it with a narrower angle
  later) and keeps the pipeline moving without a human in the loop.
- At least one passage that is honest against interest (when *not* to buy).
- ~1,700–2,200 words.

### The string-literal gotcha (this breaks the build)

Curly quotes and straight apostrophes are only safe in specific places:

- **Inside JS string literals** (`metadata`, `FAQ` q/a, `TOC` labels, `lib/posts.ts`
  fields): do **not** put a straight apostrophe or straight double-quote inside a
  single-quoted string — it terminates the string and SWC fails with a parse error
  pointing at a file that looks fine. Avoid contractions there, or use an HTML entity
  (`&rsquo;`, `&ldquo;`) / a curly character (which is a normal character, not a
  delimiter).
- **Inside JSX text** (between tags): apostrophes, `&rsquo;`, `&ldquo;`/`&rdquo;` are
  all fine.

### Liftable-opener self-audit (before step 4)

Before registering the post, list every `<h2>` in the draft with its first
sentence. For each one, confirm that sentence states the section's answer
outright — not scene-setting, not a metaphor, not a lead-in to a list. If it
doesn't, rewrite it before moving on. The 2026-07-31 board review found the
post that motivated this rule (`answer-engine-optimization`) still had two
sections violating it — the rule existed but nothing swept every heading
against it. This audit is that sweep, made mandatory.

### Hero image (one per post, fully automatic)

Every post gets one topic-matched hero under the `ShortAnswer`, from one of two
**interchangeable** sources — use whichever is working; if one has issues, use the
other. No human queue.

**Source A — Pexels (real photography, the safe default).** Real photos, so there
are no AI artifacts to worry about. The site already uses Pexels
(`scripts/pull-pexels.mjs`, `public/images/credits.json`). Search for a landscape,
on-topic African-business photo:

```bash
curl -s -H "Authorization: $PEXELS_API_KEY" \
  "https://api.pexels.com/v1/search?query=<concept>&orientation=landscape&per_page=15"
```

Pick the best on-topic result, download its `src.large` / `src.landscape`, and record
the photographer name + Pexels URL in `public/images/credits.json`. No AI-error check
is needed for Pexels — only judge topical fit and quality.

**Source B — Higgsfield `nano-banana-pro` (on-brand AI images).** Generate a 16:9
image matched to the post's *angle* (people or scene, whatever lands the point;
prompt for correct anatomy and natural hands; African-market, warm light, editorial —
not a generic desk). **Then verify — mandatory: download it and view it (Read the
image file; the model is multimodal).** Reject and regenerate once, or fall back to
Source A, on ANY AI artifact — extra or melted fingers, warped faces, garbled critical
text, impossible anatomy. Ship a Higgsfield image only once it is verified clean.

**Selection & fallback (automatic).** Try one source; if it errors, is unavailable,
returns nothing on-topic, or (Higgsfield) fails verification, switch to the other.
Only if BOTH fail, publish text-only and say so — never ship a broken or off-topic
image.

**Save + wire (either source).** Optimise to `public/images/blog-<slug>.webp`, under
~200 KB. Add `import { EditorialImage } from '@/components/ui/EditorialImage';`, place
`<EditorialImage src="/images/blog-<slug>.webp" alt="<describe the picture>" priority
className="my-10" />` immediately after `</ShortAnswer>`, and add
`images: [\`${SITE_URL}/images/blog-<slug>.webp\`]` to the `openGraph` block. Alt text
describes the picture plainly — no keyword stuffing.

Runs unattended given `PEXELS_API_KEY` in the environment (Source A) and/or Higgsfield
access (Source B). The scheduled auto-poster follows this step directly — it is multimodal,
so it performs the Source-B verification itself; with neither source reachable it
degrades to text-only.

## 4. Register it

The **sitemap (`app/sitemap.xml/route.ts`) and blog index (`app/blog/page.tsx`)
auto-map from `POSTS`** — do not touch them. You only:

1. `lib/posts.ts` — prepend a `PostMeta` to the `POSTS` array (newest first).
   `metaTitle` ≤ 44 chars (brand suffix keeps the SERP title < 60); `published` =
   today; set `cardTitle`, `description`, `category`, `readingMinutes`,
   `primaryKeyword`. `description` is the meta description — **50–160 characters**.
   Also set `lede`: **40–70 words** of plain fact shown under the H1 (no marketing
   adjectives, no humor). The two were one field until 2026-10-12, which forced every
   post to miss one target or the other.
2. `used-keywords.md` — append a row so the keyword is never targeted twice.
3. `content-queue.md` — if the keyword came from the queue, move its row to
   `claimed`.

## 5. Verify — do not skip

From the marketing site root:

```bash
npx next build
```

`next build` is the authoritative check for parse errors (it catches the curly-quote
break, type errors, and missing ids). **Never run `next build` while the dev server
is running** — they share `.next/` and you will serve a broken page; stop the dev
server first. Fix every failure. Never commit a failing build.

## 6. Publish

- **Direct (default):** stage **only this post's files** (`lib/posts.ts`,
  `used-keywords.md`, `content-queue.md`, `app/blog/<slug>/`, any new image and
  `public/images/credits.json`) — never `git add -A`, the repo may carry unrelated
  dirty files. Commit `Add blog post: <keyword>`, then get it onto `master`, which is
  what the GitHub→Vercel hook deploys. If the working branch is not `master`, a plain
  `git push` deploys nothing: confirm `origin/master` is an ancestor of HEAD
  (`git merge-base --is-ancestor origin/master HEAD`), then `git push origin
  HEAD:master` and `git push origin HEAD`. Never force-push.
- **Review gate:** create a branch, push it, and open a PR with `gh pr create`
  instead. Use this when a human should read the post before it goes live (e.g. the
  first automated post, or any run you are unsure about).

Then confirm the route is live: `curl -s -o /dev/null -w '%{http_code}' <site>/blog/<slug>`.

## Scope

This skill writes **blog posts** for an AI-SEO marketing site. It is driven on a
schedule by a **local scheduled task** in the Claude desktop app (for AfriShield's own
site: `afrishield-blog-post`), which runs steps 1–6 against `content-queue.md`. It is
deliberately not a cloud routine — the cloud agent environment could not reach the
production host, so it could neither confirm a post was live nor push to `master`.
A second local task (for AfriShield: `afrishield-queue-topup`, weekly) refills
`content-queue.md` when fewer than 8 rows are queued, by running the keyword engine
under a fixed Apify spending cap and adding only rows with engine-verified volume. The
weekly site-health task reports queue depth and whether the top-up ran. Every run — scheduled or interactive, own
site or client — writes with the locked-in humor reference
`../humor-writing/SKILL.md`; the auto-poster applies it as-is. City/service landing
pages are a different shape — see the sibling build SOP `../afrishieldai-seo/SKILL.md`
and the `client-ops-automation` skill for the deploy/DNS/ops layer.

**Precedence against the `local-seo` suite.** The company-wide `local-seo` skill has
its own `/blog-post` module. **This skill wins for any site it already governs** —
`local-seo /blog-post` is for a local business with no dedicated blog skill. Do not
switch procedures mid-site. The rest of `local-seo` is complementary and is the
standard for work this skill does not do at all: Google Business Profile, the review
engine, GBP posts, NAP and citation audits, Service × City matrix pages, and social
syndication. Its shared rules still bind here — never invent data, dry-run anything
that leaves the machine, and no doorway pages. Root `CLAUDE.md` holds the full table.
