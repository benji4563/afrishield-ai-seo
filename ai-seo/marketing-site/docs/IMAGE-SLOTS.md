# Image slots

**Update:** the site is now populated with African-business photography pulled
from Pexels (`scripts/pull-pexels.mjs`, credits in `public/images/credits.json`).
Blog cards, the home "Who we serve" band, the Solutions pillars, and the About
page all carry real photos. The only outstanding slot is the **founder portrait**
— see below.

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
