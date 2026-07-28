# Claude Code session `.jsonl` format (observed 2026-07)

Location: `~/.claude/projects/<project-slug>/<session-uuid>.jsonl`
Project slug example: `C--Users-hp-Documents-AFRISHIELD-03-Clients-nj-accounting-tax`
(drive + path with separators collapsed to `-`).

One JSON object per line. Types the command center cares about:

```jsonc
// titles (no timestamp)
{"type":"ai-title","aiTitle":"Check website status…","sessionId":"…"}
{"type":"custom-title","customTitle":"Website status check","sessionId":"…"}

// user message — content is a string OR an array of blocks
{"type":"user","message":{"role":"user","content":"is my website still on…"},
 "timestamp":"2026-07-18T07:35:12.240Z","cwd":"C:\\Users\\hp\\…","uuid":"…"}

// assistant message — content is ALWAYS an array of blocks
{"type":"assistant",
 "message":{"model":"claude-sonnet-5","role":"assistant","content":[
   {"type":"thinking","thinking":"…","signature":"…"},
   {"type":"text","text":"…"},
   {"type":"tool_use","name":"Bash","input":{…}}
 ]},
 "timestamp":"…","uuid":"…","parentUuid":"…"}

// other types exist (queue-operation, summary, progress, …) — skip unknown
// types defensively; never assume a field is present.
```

Parsing rules used by the command center:

- `JSON.parse` each line inside try/catch; skip failures (last line may be
  partial while a session is being written).
- Message count = `user` + `assistant` events.
- Tool runs = count of `tool_use` blocks inside assistant content arrays.
- Activity-per-day = bucket `timestamp.slice(0, 10)` for user+assistant events.
- Model usage = tally `message.model` on assistant events.
- Tailing: seek to `max(0, size - 256*1024)`, read to EOF, drop the first
  (possibly partial) line if you didn't start at 0.
