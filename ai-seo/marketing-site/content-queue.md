# Content queue — afrishieldai.com blog

The **blog auto-poster** (scheduled cloud routine) consumes this file. Each run it
takes the **top `queued` keyword**, writes the post, then marks it `claimed`.

Why this file exists: the cloud routine has **no DataForSEO MCP**, so it cannot do
keyword research itself. Research is done in an interactive session that *does* have
DataForSEO, and the vetted keywords are dropped here as a queue. The **weekly
queue-keeper routine** appends *candidate* rows and audits depth, but only a
DataForSEO pass (a human/agent in an interactive session) promotes a candidate to
`vetted`. **Do not let the poster invent keywords.**

Rules for the poster:
- Take the **first row whose status is `queued`**. One keyword per post, ever.
- Cross-check `used-keywords.md` first; if already claimed there, mark this row
  `claimed` without writing and move to the next `queued` row.
- After publishing, set the row to `claimed` here **and** append to `used-keywords.md`.
- If **no** `queued` rows remain, do nothing and report "queue empty" — never invent
  a keyword or republish an existing one.

Vetting note: all volumes below are **DataForSEO, South Africa, en** — a single
African market, so absolute volumes are low (10–40) by nature. Selection weighs
low competition, commercial value, brand fit, and being an early mover on AI-answer
terms, not raw volume. `vetted` = confirmed via DataForSEO. `candidate` = plausible
but volume **not yet confirmed** — leave out of the active list until checked.

| # | Primary keyword | Cluster | Vetting (SA/en) | Status |
|---|---|---|---|---|
| 1 | small business seo | G — SMB / differentiation | vetted · SV~40 · commercial · LOW comp | queued |
| 2 | how to get my business on google | E — local visibility | vetted · SV~30 · informational · rising | queued |
| 3 | what is schema markup | B — technical education | vetted · SV~20 · informational · LOW comp | queued |
| 4 | google business profile optimization | E — local / GBP | vetted · SV~10–20 · commercial · rising · high CPC | queued |
| 5 | how to rank on chatgpt | B — AI answers (AEO/GEO) | vetted · SV~10 · informational · zero comp | queued |
| 6 | is seo worth it | D — cost / ROI anxiety | vetted · SV~10 · informational · LOW comp | queued |
| 7 | how long does seo take | D — expectations | vetted · SV~10 · informational · LOW comp | queued |
| 8 | local seo for small business | E — local / commercial | vetted · SV~10 · commercial | queued |
| 9 | what is local seo | E — local / education | vetted · SV~10 · informational | queued |
| 10 | seo vs google ads | B — comparison | vetted · SV~10 · commercial · LOW comp | queued |
| 11 | how to do keyword research | H — general how-to | vetted · SV~10 · informational · LOW comp | queued |
| 12 | how to improve google ranking | H — general how-to | vetted · SV~10 · informational | queued |
| 13 | how to appear on google maps | E — local visibility | vetted · SV~10 · informational | queued |
| 14 | how to get more website traffic | H — general how-to | vetted · SV~10 · informational | queued |
| 15 | content marketing for small business | F — content strategy | vetted · SV~10 · commercial · declining | queued |

## Watchlist — no DataForSEO volume yet (do NOT queue until confirmed)

Emerging AEO/GEO terms with too little data to register a volume. Re-check
periodically; promote to the table above once they show real volume.

- generative engine optimization
- how to get cited by ai / how to get cited by chatgpt
- why is my website not showing on google

## Claimed (moved here after publishing)

| Primary keyword | Page | Claimed |
|---|---|---|
| answer engine optimization | `/blog/answer-engine-optimization` | 2026-07-29 |
