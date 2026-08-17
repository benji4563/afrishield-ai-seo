# Lead one-pagers — Direct Booking & AI Search Audit

Personalised, one-page "Revenue Leak & AI Visibility" tear-sheets for the 30
hospitality leads in `leads.csv`. One page per property, built to the
tear-sheet structure in `MASTER_OPERATIONAL_PLAYBOOK.md` (section 5) and the
AfriShield AI brand system (`../../marketing-site/docs/brand-guidelines.md`).

Each one-pager makes the same argument, in the lead's own numbers:

> You pay 15–25% commission to Booking.com and the other OTAs on bookings that
> could arrive direct — and when a traveller asks ChatGPT, Claude, or Perplexity
> where to stay, the assistant names the OTAs, not you. Here is the estimated
> monthly bleed, the exact gap, and the 3-step fix.

## What's here

| File | What it is |
|---|---|
| `leads.csv` | Source data — the 30 enriched leads (the tracker). |
| `generate.mjs` | Reads `leads.csv`, writes one personalised HTML per lead + a review gallery into `output/`. |
| `build-fonts.mjs` | Builds `fonts.css` (brand fonts embedded as data: URIs) so the pages need no network. |
| `render-pdfs.mjs` | Renders every `output/*.html` to a matching A4 PDF via headless Chromium. |
| `fonts.css` | Brand fonts (Sora, Inter, JetBrains Mono — latin + latin-ext) as data: URIs; inlined into each one-pager and linked by `output/index.html`. |
| `output/*.html` | 30 one-pagers — self-contained (fonts inlined), open or email as-is. |
| `output/*.pdf` | 30 A4 PDFs — **the artifact you attach and send.** |
| `output/index.html` | Review gallery: all 30 grouped by country, with the estimated bleed. |

## Every one-pager is unique

Nothing is boilerplate-swapped. Each page is driven by that lead's own row:

- **Headline / BLUF** — the lead's `Tailored_Pitch_Hook`.
- **Stat tiles** — `Estimated_Monthly_Bleed_USD`, its 12-month projection, and a
  realistic direct-booking recovery range derived from it.
- **The AI search gap** — the lead's `AI_Visibility_Gap_Signal`, plus the exact
  high-intent query built from their category + location (e.g. *"best luxury
  safari lodges in the Serengeti for a private trip"*), and who the assistants
  cite instead (Booking.com, Expedia, SafariBookings, …).
- **GBP & schema deficits** — three concrete deficits inferred from the gap signal.
- **3-step recovery roadmap** — tailored to the property type (lodge / hotel /
  tour operator), naming the right schema and GBP categories.
- **Francophone leads (Cameroon)** get a bilingual FR/EN line.

## Regenerate

```bash
# 1. (only if fonts.css is missing) rebuild embedded brand fonts
#    needs the fetched Google Fonts CSS at /tmp/gf.css — see build-fonts.mjs
node build-fonts.mjs

# 2. generate the 30 HTML one-pagers + the gallery
node generate.mjs

# 3. render the 30 A4 PDFs (needs a local Chromium; set CHROMIUM_BIN if needed)
node render-pdfs.mjs
```

Edit a lead's hook, bleed, or gap in `leads.csv` and re-run `generate.mjs`
(then `render-pdfs.mjs`) to refresh just that page.

## Brand & voice notes

- Green palette only; **threat red is never used** (reserved for a real
  in-product catch), so the bleed figure is set in ink/green, not red.
- Type: Sora (headings), Inter (body), JetBrains Mono (eyebrows/data).
- Numbers-forward, no banned phrases; all money figures are framed as
  **estimates** from public rate/occupancy benchmarks — no invented client
  outcomes, no guarantees. The real figure is confirmed on the call.
- The signal-node mark (centre node + four radiating links) is the header mark.

## A note on the data

`leads.csv` contains prospect business contact details. The one-pagers
themselves carry **only** the recipient property's public info plus AfriShield's
own contact details — never another lead's data — so each file is safe to send
to that lead.
