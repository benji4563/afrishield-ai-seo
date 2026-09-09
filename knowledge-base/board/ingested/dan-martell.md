# Dan Martell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | l8nwqbZNvdo | I don't care about grades or a report card | skipped-off-niche | shallow |
| 2026-07-29 | vd3uw10S8vo | The best success habits for a young entrepreneur | skipped-off-niche | shallow |
| 2026-07-29 | EdMkn1aNK2o | If you're using this AI tool, use it for... | skipped-nothing-new | shallow |
| 2026-08-05 | UvDgL8ShgXs | You're only 6 months away from changing your entire life | skipped-off-niche | deep |
| 2026-08-05 | xj5gZq159lM | If I Wanted to Make My First $100K/Month, I'd Do This | ingested | deep |
| 2026-08-05 | Bm84BAtOfQw | You're Not Behind (Yet): How to Build Your First AI Agent (Full Guide) | ingested | deep |
| 2026-09-09 | n7t68A0NQQM | How to Make Rich Friends | skipped-off-niche | shallow |

Note (2026-09-09, degraded pass): discovery tooling largely failed this run.
Direct youtube.com/RSS/yt-dlp was blocked as usual (confirmed again quickly).
Firecrawl (the documented workaround) returned one usable channel-videos
search and then hit "insufficient credits" (HTTP 402) on every subsequent
call, including retries minutes apart, so it could not be used to browse the
channel's /videos tab or fetch any candidate transcript/description. Fell
back to the generic WebSearch tool, which does reach the open web but has a
laggier, sparser index for this channel and could not reliably confirm a
"newest 3" with real upload dates. Of the candidate titles it surfaced,
several ("If You Want a Business That Runs Without You...", "Your Offer Is
Missing This ONE Strategy", "You Need To Hire Better.", etc.) were clearly
attributed to the sibling **Dan Martell Daily** channel (@DanMartellDaily,
a different channel_id than ours) and excluded on that basis, not on
niche/dedup grounds. Only one video could be confidently confirmed as
belonging to the actual target channel (@DanMartell / UCA-mWX9CvCTVFWRMb9bKc9w)
and not already in this ledger: "How to Make Rich Friends," a
networking/relationship-building piece judged off-niche (generic
relationship advice, not AI/SEO/business-systems-scaling), consistent with
prior off-niche calls on non-business-system content. No second or third new
on-channel video could be verified with confidence, so per the accuracy
rule only this one row was added; any further new uploads should be picked
up next run once Firecrawl access/credits are available again — do not
assume the channel only had one upload in this ~5-week gap.

Note (2026-07-29, shallow pass): the environment's network policy blocked
direct access to youtube.com, so no auto-transcript could be fetched;
judgment was made from the RSS title + description (fetched via Firecrawl).
That run's 3 newest uploads were short-form clips: one on parenting/education
(off-niche), one generic "success habits" motivational short (off-niche per
the routine's own filter), and one AI-tool short whose description was just
the title repeated back with no extractable detail — no wiki update that run.

Note (2026-08-05, deep pass): full transcripts were available this run. The 3
newest uploads had moved on from the prior run's short-form clips to
longer-form business/AI-leverage content — first wiki update logged this run.
