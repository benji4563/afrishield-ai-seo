# Tier-pricing audit — Dan Martell (Chairman / business lens)

**Origin:** 2026-08-28 board review of `ai-seo/marketing-site/app/pricing/page.tsx`.
Run this checklist any time a pricing/tier page ships or changes — the AfriShield
product's own pricing page, a client fork under `03-Clients/*`, or a new tier added
to either. See `knowledge-base/board/wiki/dan-martell.md` for the doctrine this
distills.

## Why this exists

The 2026-08-28 review found AfriShield's own three-tier pricing ($150 / $400 / $900)
reads as a flat, cost-plus ladder rather than a deliberate decoy structure, and —
more importantly — the top tier's deliverables ("direct line to the person doing the
work", open-ended strategy access) scale human hours 1:1 with client count. That
runs directly against the ≤5%-human, buy-back-your-time thesis the whole business is
built on: success at selling the top tier would degrade founder leverage, not
increase it. This checklist exists so the next pricing page doesn't repeat that.

## The checklist

1. **List every deliverable per tier**, from the page copy, not from memory.
2. **Tag each deliverable** Agent / Delegate / Founder-required.
3. **Any Founder-tagged item must carry an explicit time cap** that does not scale
   with client count (e.g. "one scheduled 30-min call/month", not "direct line to
   the person doing the work"). An unbounded human-access promise on the
   highest-price tier is the single most dangerous pattern here — it means growth
   in revenue is coupled to growth in founder/human hours instead of decoupled
   from it.
4. **Decoy-math check.** Verify the top tier's price is roughly 8–10x the core
   (volume) tier, not 2–3x — a ladder that's too linear doesn't make the middle
   tier look cheap by comparison, and doesn't function as a true anchor.
5. **Confirm a prepay/annual option exists at every tier** (e.g. 10–15% off for
   annual prepay). Month-to-month-only is good for conversion trust but is a
   standing cash-flow and re-sell tax against the founder's time — prepaid
   predictability is worth more than grind-cycle retention.
6. **Confirm no client-specific promises leaked into a generic template.** Per
   `CLAUDE.md`, `ai-seo/` is the reusable product template, not any one client's
   deployment. A deliverable that reads like it was written for one specific
   client's expectations (rather than a deliberately agent-scalable product tier)
   should be flagged and confirmed with the user before it propagates to future
   client builds.

Run this whenever `app/pricing/page.tsx` (or an equivalent tier/pricing page in a
client fork) is created or edited.
