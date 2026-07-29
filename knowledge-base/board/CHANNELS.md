# Board channels — sources for the evolving-knowledge ingestion

The weekly ingestion routine reads each member's latest uploads via the YouTube
**RSS feed** (curl-fetchable, no API key):

```
https://www.youtube.com/feeds/videos.xml?channel_id=<CHANNEL_ID>
```

If a `channel_id` below is `RESOLVE`, the routine resolves it first by fetching the
channel/handle page and extracting the id:

```bash
curl -sL "https://www.youtube.com/@<handle>" | grep -oE '"channelId":"UC[^"]+"' | head -1
```

| Advisor | Wiki slug | Handle | channel_id |
|---|---|---|---|
| Julian Goldie | julian-goldie | @JulianGoldieSEO | `UCGpsgNbzdF7BECCVbB1COHw` |
| Koray Tuğberk Gübür | koray-gubur | @TopicalAuthority | `UCXTg_CjVldLQ1RH8jxTTqiw` |
| Wes McDowell | wes-mcdowell | @WesMcDowellInc | `UCMq1R1LgS04lIKdpLh_OS1w` |
| Mike King (iPullRank) | mike-king | @iPullRank | `RESOLVE` |
| Dan Martell | dan-martell | @DanMartell | `RESOLVE` |
| Jono Catliff | jono-catliff | @jonocatliff | `RESOLVE` |

When a `RESOLVE` is turned into a real id, the routine updates this table on its PR
branch so the lookup is cached next time.

## Ledger

Each processed video is recorded in `knowledge-base/board/ingested/<slug>.md` (video
id + date + verdict: ingested / skipped-off-niche / skipped-nothing-new) so nothing is
ingested twice.

## Copyright rule (non-negotiable)
Store **only original-wording, transformative takeaways** — the new idea and why it
matters to our niche, in a sentence or two, with the source link. **Never** store
transcripts, captions, or long verbatim excerpts. If the only way to capture a point
is to copy text, summarise it instead or skip it.
