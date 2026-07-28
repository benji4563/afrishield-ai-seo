---
name: command-center
description: Build or rebuild the AfriShield Command Center — a personal, local-only, black-themed mission-control dashboard showing live Claude Code agent sessions, KPIs, a sessions-by-project pie chart, 14-day activity bars, and an AfriShield projects follow-up panel. Use when asked to create, rebuild, restore, or modify the command center (or a personal agent-monitoring dashboard). Never deploy it anywhere — it binds to 127.0.0.1 and reads private session logs.
---

# AfriShield Command Center

A zero-dependency local web app: one Node server (`server.js`) + one HTML page
(`index.html`). It reads — never writes — Claude Code session logs and renders
a live, auto-refreshing dashboard.

**Canonical install location:** `Documents/AFRISHIELD/command-center/`
**Run:** double-click `start-command-center.cmd`, or `node server.js` → http://localhost:4780
**Theme:** pure black (`#000` background). See `references/design-tokens.md`.
**Privacy rule:** personal tool. Bind to `127.0.0.1` only. Never deploy to
Vercel or any host. Never commit session data it renders.

## What the finished dashboard must contain

1. **Header** — "AFRISHIELD COMMAND CENTER", live clock, pills for project
   count, session count, and live-session count (green pulsing dot when > 0).
2. **KPI row** — events today, live agent sessions, total tool runs,
   most-active project.
3. **Pie chart** — sessions by project. Hand-rolled SVG donut (no chart
   library, no CDN — must work fully offline). Total count in the middle.
4. **Bar chart** — events per day, last 14 days. Today's bar highlighted
   green when non-zero.
5. **Agent sessions table** — every session across every project, newest
   first. Columns: title, project, message count, tool runs, last activity,
   badge (`● LIVE` pulsing green if written to in last 2 min, else `idle`).
   Clicking a row opens the **live viewer**: last 50 events (user / assistant
   / tool-run), color-coded, polling every 2 s, auto-scrolls if at bottom.
6. **AfriShield projects follow-up table** — each folder in
   `Documents/AFRISHIELD` (skip `.git`, `.obsidian`, `.claude`,
   `node_modules`, `_pre-migration-archive`) with item count + last-touched.

## Build steps

1. Create `Documents/AFRISHIELD/command-center/` with four files:
   `server.js`, `index.html`, `start-command-center.cmd`, `README.md`.
2. Copy `references/server.js` and `references/index.html` from this skill —
   they are the complete working implementation, not snippets.
3. `start-command-center.cmd`:
   ```
   @echo off
   title AfriShield Command Center
   cd /d "%~dp0"
   start "" http://localhost:4780
   node server.js
   ```
4. Verify: `node -c server.js`, start it, then curl
   `/api/overview`, `/api/afrishield`, and
   `/api/session?project=<dir>&id=<uuid>` — all must return JSON.
   Open the page and confirm a currently-running Claude session shows `● LIVE`
   and its viewer streams the events of the session you are in right now.

## Key implementation facts (read before editing)

- Session data lives in `~/.claude/projects/<project-slug>/<session-uuid>.jsonl`.
  Event shapes are documented in `references/session-jsonl-format.md`.
- Parsing whole files on every poll is too slow (files reach 8 MB+). Cache
  parse results in a `Map` keyed by absolute path, invalidated on
  `size`/`mtimeMs` change. The live viewer reads only the last 256 KB.
- "Live" = file mtime within the last 2 minutes.
- Session title priority: `custom-title` → `ai-title` → first user message
  (truncated to 80 chars) → filename.
- Sanitize `project` and `id` query params with `/^[A-Za-z0-9._-]+$/` before
  touching the filesystem.
- The UI polls `/api/overview` every 4 s; refs into the table go stale on
  every refresh (rows are rebuilt) — anything driving the page externally
  should re-query the DOM each time.
- If viewing through the Claude Code Browser pane, arbitrary localhost ports
  are blocked: register the server in the project's `.claude/launch.json`
  (`runtimeExecutable: "node"`, absolute path to `server.js`, port 4780) and
  open it with `preview_start`.
