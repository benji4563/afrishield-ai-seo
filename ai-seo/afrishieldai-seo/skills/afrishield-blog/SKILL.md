---
name: afrishield-blog
description: >
  Write and publish one complete, build-verified blog post for an AfriShield AI-SEO
  marketing site (Next.js App Router), end to end: pick the next keyword (from the
  repo's content-queue.md, or from DataForSEO in an interactive session), write it in
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

- **Interactive session with DataForSEO** — do real research. Use
  `dataforseo_labs_google_keyword_overview` / `_keyword_ideas` (location a real
  target market, e.g. South Africa, `en`). Avoid seeding on the bare word "ai" — it
  explodes into AI-tool noise (humanizer, image generator). Weigh low competition,
  commercial value, brand fit, and early-mover AI-answer terms over raw volume;
  single African markets show low absolute volume (10–40) by nature. Drop terms
  DataForSEO returns no data for — too new to target yet (park them on the queue
  watchlist).
- **Automated / cloud run (no DataForSEO)** — take the **first `queued` row** from
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
Posts are **text-only** — there is no per-post hero image field, so no image
generation is required.

Non-negotiables:

- The **primary keyword is answered outright in the `ShortAnswer`**, within the
  first 100 words, phrased naturally. It is the featured-snippet / AI-answer target.
- **Voice:** dry, plain, honest, faintly self-deprecating, anti-hype. No guaranteed
  rankings. African-market aware — mid-range Android phones on patchy connections,
  African cities and names as **clearly labelled** illustrative composites (the
  `Scene` component already stamps "Illustrative composite"). Minimise contractions;
  the measured register is deliberate.
- **6 FAQ entries**, drawn from real "People also ask", 2–4 sentences each.
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

## 4. Register it

The **sitemap (`app/sitemap.xml/route.ts`) and blog index (`app/blog/page.tsx`)
auto-map from `POSTS`** — do not touch them. You only:

1. `lib/posts.ts` — prepend a `PostMeta` to the `POSTS` array (newest first).
   `metaTitle` ≤ 44 chars (brand suffix keeps the SERP title < 60); `published` =
   today; set `cardTitle`, `description`, `category`, `readingMinutes`,
   `primaryKeyword`.
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

- **Direct (default):** commit all changes and push to `master` — the GitHub→Vercel
  hook auto-deploys. Commit message: `Add blog post: <keyword>`.
- **Review gate:** create a branch, push it, and open a PR with `gh pr create`
  instead. Use this when a human should read the post before it goes live (e.g. the
  first automated post, or any run you are unsure about).

Then confirm the route is live: `curl -s -o /dev/null -w '%{http_code}' <site>/blog/<slug>`.

## Scope

This skill writes **blog posts** for an AI-SEO marketing site. It is driven on a
schedule by the **AfriShield blog auto-poster** cloud routine, which runs a condensed
form of steps 1, 3–6 against `content-queue.md`. The **weekly queue-keeper routine**
tops up and audits `content-queue.md`. City/service landing pages are a different
shape — see the sibling build SOP `../afrishieldai-seo/SKILL.md` and the
`client-ops-automation` skill for the deploy/DNS/ops layer.
