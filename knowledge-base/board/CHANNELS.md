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
| Mike King (iPullRank) | mike-king | @iPullRank | `UCttOymj_FLE8d7xA7rEbsTw` |
| Dan Martell | dan-martell | @DanMartell | `UCA-mWX9CvCTVFWRMb9bKc9w` |
| Jono Catliff | jono-catliff | @jonocatliff | `UCnzxPyNnn8jk4bHFk3JUBhA` |

When a `RESOLVE` is turned into a real id, the routine updates this table on its PR
branch so the lookup is cached next time.

## Ledger

Each processed video is recorded in `knowledge-base/board/ingested/<slug>.md` (video
id + date + verdict: ingested / skipped-off-niche / skipped-nothing-new) so nothing is
ingested twice.

## Depth
The routine does **full-video analysis**: it fetches each new video's auto-transcript
(via `yt-dlp`) to a temp dir **outside the repo** (`/tmp/caps`), reads the whole thing
to understand it, extracts the new ideas, then **deletes the transcript**. Only the
distilled takeaways are kept. RSS title+description is the fallback if a transcript
cannot be obtained (marked `depth=shallow` in the ledger).

## Copyright rule (non-negotiable)
A transcript/caption is **ephemeral working input only** — read it, paraphrase it,
delete it. Store **only original-wording, transformative takeaways** (the new idea and
why it matters to our niche, a sentence or two, with the source link). **Never** write
transcripts, captions, or verbatim/near-verbatim excerpts into the repo, wiki, ledger,
or PR. If the only way to capture a point is to copy wording, paraphrase it or skip it.
