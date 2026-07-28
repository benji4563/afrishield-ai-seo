#!/usr/bin/env node
/**
 * AfriShield Command Center — local server.
 * Zero dependencies. Personal tool — binds to 127.0.0.1 only, never deploy.
 *
 *   node server.js          → http://localhost:4780
 *
 * Reads (never writes) Claude Code session files in ~/.claude/projects/
 * and the AfriShield company folder for the projects follow-up panel.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 4780;
const PROJECTS_ROOT = path.join(os.homedir(), '.claude', 'projects');
const AFRISHIELD_ROOT = path.join(os.homedir(), 'Documents', 'AFRISHIELD');
const LIVE_WINDOW_MS = 2 * 60 * 1000; // session counts as live if written to in last 2 min
const SAFE_NAME = /^[A-Za-z0-9._-]+$/;

// ---------- session file parsing (cached by size+mtime) ----------

const cache = new Map(); // absPath -> {size, mtimeMs, summary}

function parseSessionFile(absPath, stat) {
  const hit = cache.get(absPath);
  if (hit && hit.size === stat.size && hit.mtimeMs === stat.mtimeMs) return hit.summary;

  const summary = {
    title: null,
    firstTs: null,
    lastTs: null,
    userMsgs: 0,
    assistantMsgs: 0,
    toolUses: 0,
    models: {},
    eventsPerDay: {}, // 'YYYY-MM-DD' -> count
  };
  let firstUserText = null;

  let raw;
  try { raw = fs.readFileSync(absPath, 'utf8'); } catch { return summary; }
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    let ev;
    try { ev = JSON.parse(line); } catch { continue; }

    if (ev.type === 'custom-title' && ev.customTitle) summary.title = ev.customTitle;
    else if (ev.type === 'ai-title' && ev.aiTitle && !summary.title) summary.title = ev.aiTitle;

    const ts = ev.timestamp;
    if (ts) {
      if (!summary.firstTs) summary.firstTs = ts;
      summary.lastTs = ts;
    }

    if (ev.type === 'user' && ev.message) {
      summary.userMsgs++;
      if (!firstUserText) {
        const c = ev.message.content;
        if (typeof c === 'string') firstUserText = c;
        else if (Array.isArray(c)) {
          const t = c.find((b) => b.type === 'text');
          if (t) firstUserText = t.text;
        }
      }
      if (ts) bumpDay(summary.eventsPerDay, ts);
    } else if (ev.type === 'assistant' && ev.message) {
      summary.assistantMsgs++;
      if (ev.message.model) summary.models[ev.message.model] = (summary.models[ev.message.model] || 0) + 1;
      if (Array.isArray(ev.message.content)) {
        summary.toolUses += ev.message.content.filter((b) => b.type === 'tool_use').length;
      }
      if (ts) bumpDay(summary.eventsPerDay, ts);
    }
  }
  if (!summary.title && firstUserText) summary.title = firstUserText.slice(0, 80);

  cache.set(absPath, { size: stat.size, mtimeMs: stat.mtimeMs, summary });
  return summary;
}

function bumpDay(map, ts) {
  const day = ts.slice(0, 10);
  map[day] = (map[day] || 0) + 1;
}

// ---------- API: overview ----------

function apiOverview() {
  const now = Date.now();
  const projects = [];
  let dirs = [];
  try { dirs = fs.readdirSync(PROJECTS_ROOT, { withFileTypes: true }); } catch {}

  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const projDir = path.join(PROJECTS_ROOT, d.name);
    let files = [];
    try { files = fs.readdirSync(projDir).filter((f) => f.endsWith('.jsonl')); } catch {}
    if (!files.length) continue;

    const sessions = [];
    for (const f of files) {
      const abs = path.join(projDir, f);
      let stat;
      try { stat = fs.statSync(abs); } catch { continue; }
      const s = parseSessionFile(abs, stat);
      sessions.push({
        id: f.replace(/\.jsonl$/, ''),
        title: s.title || f.replace(/\.jsonl$/, ''),
        mtime: stat.mtimeMs,
        size: stat.size,
        live: now - stat.mtimeMs < LIVE_WINDOW_MS,
        userMsgs: s.userMsgs,
        assistantMsgs: s.assistantMsgs,
        toolUses: s.toolUses,
        models: s.models,
        eventsPerDay: s.eventsPerDay,
      });
    }
    sessions.sort((a, b) => b.mtime - a.mtime);
    projects.push({
      key: d.name,
      name: prettyProjectName(d.name),
      sessions,
      sessionCount: sessions.length,
      lastActivity: sessions.length ? sessions[0].mtime : 0,
    });
  }
  projects.sort((a, b) => b.lastActivity - a.lastActivity);

  // aggregate 14-day activity
  const activity = [];
  for (let i = 13; i >= 0; i--) {
    const day = new Date(now - i * 86400000).toISOString().slice(0, 10);
    let count = 0;
    for (const p of projects) for (const s of p.sessions) count += s.eventsPerDay[day] || 0;
    activity.push({ day, count });
  }

  const allSessions = projects.flatMap((p) => p.sessions);
  return {
    generatedAt: now,
    projects,
    activity,
    totals: {
      projects: projects.length,
      sessions: allSessions.length,
      live: allSessions.filter((s) => s.live).length,
      eventsToday: activity[activity.length - 1].count,
      toolUses: allSessions.reduce((n, s) => n + s.toolUses, 0),
    },
  };
}

function prettyProjectName(dirName) {
  // 'C--Users-hp-Documents-AFRISHIELD-03-Clients-nj-accounting-tax' → readable tail
  const parts = dirName.replace(/^C--/, '').split('-').filter(Boolean);
  const tail = parts.slice(3).join(' ') || parts.join(' ');
  return tail || dirName;
}

// ---------- API: session tail (live viewer) ----------

function apiSessionTail(projectKey, sessionId) {
  if (!SAFE_NAME.test(projectKey) || !SAFE_NAME.test(sessionId)) return { error: 'bad params' };
  const abs = path.join(PROJECTS_ROOT, projectKey, sessionId + '.jsonl');
  let stat;
  try { stat = fs.statSync(abs); } catch { return { error: 'not found' }; }

  const TAIL = 256 * 1024;
  const start = Math.max(0, stat.size - TAIL);
  const fd = fs.openSync(abs, 'r');
  const buf = Buffer.alloc(stat.size - start);
  fs.readSync(fd, buf, 0, buf.length, start);
  fs.closeSync(fd);

  let lines = buf.toString('utf8').split('\n');
  if (start > 0) lines = lines.slice(1); // drop partial first line

  const events = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    let ev;
    try { ev = JSON.parse(line); } catch { continue; }
    const out = { ts: ev.timestamp || null };

    if (ev.type === 'user' && ev.message) {
      out.kind = 'user';
      out.text = blockText(ev.message.content);
    } else if (ev.type === 'assistant' && ev.message && Array.isArray(ev.message.content)) {
      const tools = ev.message.content.filter((b) => b.type === 'tool_use').map((b) => b.name);
      const text = ev.message.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
      if (tools.length) { out.kind = 'tool'; out.text = tools.join(', '); }
      else if (text.trim()) { out.kind = 'assistant'; out.text = text; }
      else continue;
    } else continue;

    if (out.text) out.text = String(out.text).slice(0, 400);
    events.push(out);
  }
  return { mtime: stat.mtimeMs, size: stat.size, events: events.slice(-50) };
}

function blockText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.filter((b) => b.type === 'text').map((b) => b.text).join('\n')
      || content.map((b) => b.type).join(', ');
  }
  return '';
}

// ---------- API: AfriShield projects follow-up ----------

function apiAfrishield() {
  const skip = new Set(['.git', '.obsidian', '.claude', 'node_modules', '_pre-migration-archive']);
  let entries = [];
  try { entries = fs.readdirSync(AFRISHIELD_ROOT, { withFileTypes: true }); } catch {}
  const folders = [];
  for (const e of entries) {
    if (!e.isDirectory() || skip.has(e.name)) continue;
    const abs = path.join(AFRISHIELD_ROOT, e.name);
    let latest = 0, fileCount = 0;
    try {
      for (const f of fs.readdirSync(abs, { withFileTypes: true })) {
        fileCount++;
        try {
          const st = fs.statSync(path.join(abs, f.name));
          if (st.mtimeMs > latest) latest = st.mtimeMs;
        } catch {}
      }
    } catch {}
    folders.push({ name: e.name, items: fileCount, lastTouched: latest });
  }
  folders.sort((a, b) => b.lastTouched - a.lastTouched);
  return { root: AFRISHIELD_ROOT, folders };
}

// ---------- server ----------

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const send = (code, body, type) => {
    res.writeHead(code, { 'Content-Type': type || 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(body);
  };
  try {
    if (url.pathname === '/') {
      send(200, fs.readFileSync(path.join(__dirname, 'index.html')), 'text/html; charset=utf-8');
    } else if (url.pathname === '/api/overview') {
      send(200, JSON.stringify(apiOverview()));
    } else if (url.pathname === '/api/session') {
      send(200, JSON.stringify(apiSessionTail(url.searchParams.get('project') || '', url.searchParams.get('id') || '')));
    } else if (url.pathname === '/api/afrishield') {
      send(200, JSON.stringify(apiAfrishield()));
    } else {
      send(404, JSON.stringify({ error: 'not found' }));
    }
  } catch (err) {
    send(500, JSON.stringify({ error: String(err && err.message) }));
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`AfriShield Command Center → http://localhost:${PORT}`);
});
