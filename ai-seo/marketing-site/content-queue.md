# Content queue — afrishieldai.com blog

The **blog auto-poster** (scheduled cloud routine) consumes this file. Each run it
takes the **top `queued` keyword**, writes the post, then marks it `claimed`.

Why this file exists: the cloud routine has **no DataForSEO MCP**, so it cannot do
keyword research itself. Research is done separately (by a human/agent that *does*
have DataForSEO), and the vetted keywords are dropped here as a queue. **When the
queue runs low, replenish it** — do not let the poster invent keywords.

Rules for the poster:
- Take the **first row whose status is `queued`**. One keyword per post, ever.
- Cross-check `used-keywords.md` first; if it is already claimed there, skip it and
  mark this row `claimed` without writing.
- After publishing, set the row to `claimed` here **and** append to `used-keywords.md`.
- If **no** `queued` rows remain, do nothing and report "queue empty" — never invent
  a keyword or republish an existing one.

`vetted` = confirmed against DataForSEO (South Africa, en). `candidate` = sensible
for the vertical but **volume/difficulty not yet confirmed** — fine to write, but
prefer `vetted` rows first.

| # | Primary keyword | Cluster | Vetting | Status |
|---|---|---|---|---|
| 1 | seo for small business | G — differentiation / SMB | vetted (SV~40, LOW comp, commercial) | queued |
| 2 | how to get my business on google | E — local / visibility | vetted (SV~30, rising) | queued |
| 3 | how to rank on chatgpt | B — AI answers (AEO/GEO) | vetted (SV~10, LOW comp, on-brand) | queued |
| 4 | generative engine optimization | B — AI answers (AEO/GEO) | vetted (emerging, on-brand) | queued |
| 5 | is seo worth it | D — cost / ROI anxiety | vetted (SV~10, informational) | queued |
| 6 | how long does seo take | D — expectations | vetted (SV~10, informational) | queued |
| 7 | local seo for small business | E — local / visibility | vetted (SV~10, commercial) | queued |
| 8 | what is local seo | E — local / education | vetted (SV~10, informational) | queued |
| 9 | how to rank higher on google | H — general how-to | vetted (SV~10, informational) | queued |
| 10 | why is my website not showing on google | E — local / troubleshooting | candidate — verify volume | queued |
| 11 | do i need seo for my business | D — ROI anxiety | candidate — verify volume | queued |
| 12 | how to get cited by ai assistants | B — AI answers (AEO/GEO) | candidate — verify volume | queued |
| 13 | google business profile optimization | E — local / GBP | candidate — verify volume | queued |
| 14 | seo vs google ads | B — comparison | candidate — verify volume | queued |
| 15 | what is schema markup | B — technical education | candidate — verify volume | queued |
| 16 | how to do keyword research | H — general how-to | candidate — verify volume | queued |
| 17 | how to write a blog post that ranks | H — content how-to | candidate — verify volume | queued |

## Claimed (moved here after publishing)

| Primary keyword | Page | Claimed |
|---|---|---|
| answer engine optimization | `/blog/answer-engine-optimization` | 2026-07-29 |
