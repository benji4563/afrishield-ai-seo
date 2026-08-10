# Image slots

**Update:** the site is now populated with African-business photography pulled
from Pexels (`scripts/pull-pexels.mjs`, credits in `public/images/credits.json`).
Blog cards, the home "Who we serve" band, the Solutions pillars, and the About
page all carry real photos. The only outstanding slot is the **founder portrait**
— see below.

## Pending — two blog posts need photos

`blog-what-is-schema-markup` and `blog-how-to-get-my-business-on-google` were
added to the `SLOTS` array in `scripts/pull-pexels.mjs` and wired into
`lib/posts.ts` / their `page.tsx` (card, OG, and in-body `EditorialImage`),
but the actual files are not yet in `public/images/` — this session's
environment cannot reach `api.pexels.com` (blocked by the egress proxy).
Run the fetch from a machine with normal internet access, then commit the two
new `.jpg` files and the updated `credits.json`:

```bash
PEXELS_API_KEY=your_key node scripts/pull-pexels.mjs
```

Note this re-fetches and overwrites **all** slots, including the 13 already
filled — fine since Pexels results are stable for a given query, but review
the diff before committing if you want to be sure nothing else changed.

## Founder portrait — action needed

The About page (`/about`) expects Benjamin's photo at
**`public/team/benjamin-njock.jpg`**. Until it is added, the page shows a branded
"BN" placeholder (never a stock stand-in). Drop the attached desk photo at that
exact path and it appears automatically — no code change. See
`public/team/README.md`.

## Refreshing or swapping photos

```bash
PEXELS_API_KEY=your_key node scripts/pull-pexels.mjs
```

Edit the `SLOTS` array in that script to change queries per slot. Pexels license
is free for commercial use; `credits.json` records each photographer.

## Slots

| Slot | Where | Current fill | Suggested |
|---|---|---|---|
| Blog card art (×3) | `components/blog/PostCard.tsx` | Diagonal hairline pattern in green.50 | 16:9 editorial, `public/blog/<slug>/card.webp` |
| Blog hero (×3) | `components/blog/PostLayout.tsx` header | None — type-only hero | 16:9 above-the-fold, `priority` |
| Mid-post editorial (×3) | Between H2 sections | None | 16:9, one per post |
| OG image | `app/layout.tsx` metadata | None (text card falls back) | 1200×630, `public/og/default.png` |
| Favicon | — | Next default | Signal-node mark, green.600 on transparent |

## The hero is intentionally illustration-free

`components/signature/SignalNode.tsx` is the hero graphic — the company mark
drawn live, with the links animating outward on a stagger. That is the site's
signature element and it should not be replaced with a photograph or a dashboard
screenshot. See `docs/brand-guidelines.md`.

## If you generate images

Follow the house prompt discipline:

> Warm documentary-style photograph of `<subject, 2–3 concrete detail anchors>`.
> `<framing>`. `<lighting>`. `<emotional read>`. **No text or logos visible
> anywhere. No readable text on any surface.** Editorial magazine feel, muted
> natural colour palette, no over-saturation.

Rules that survive whatever you generate:

- Descriptive filenames, never UUIDs
- Alt text describing subject, context and emotion — not "image of person"
- `.webp`, served through `next/image` with `sizes` set
- `priority` only on above-the-fold heroes
- **No stock handshakes, skyscrapers, or diverse-office-hero shots.** They read
  as generic SaaS and cost trust on a site whose whole argument is candour
