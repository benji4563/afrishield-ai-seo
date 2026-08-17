#!/usr/bin/env node
/**
 * Renders every output/*.html one-pager to a matching A4 PDF using a local
 * Chromium (headless --print-to-pdf). No network needed — the HTML already
 * embeds the brand fonts.
 *
 * Chromium lookup order:
 *   1. $CHROMIUM_BIN
 *   2. /opt/pw-browsers/chromium   (Claude Code web sandbox)
 *   3. `chromium` / `chromium-browser` / `google-chrome` on PATH
 *
 * Usage:  node render-pdfs.mjs
 */
import { readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'output');

function findChromium() {
  if (process.env.CHROMIUM_BIN && existsSync(process.env.CHROMIUM_BIN)) return process.env.CHROMIUM_BIN;
  if (existsSync('/opt/pw-browsers/chromium')) return '/opt/pw-browsers/chromium';
  for (const bin of ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable']) {
    try { execFileSync('which', [bin], { stdio: 'pipe' }); return bin; } catch { /* keep looking */ }
  }
  throw new Error('No Chromium found. Set CHROMIUM_BIN=/path/to/chrome');
}

const chromium = findChromium();
const files = readdirSync(OUT).filter((f) => f.endsWith('.html') && f !== 'index.html');
let ok = 0;
for (const f of files) {
  const html = join(OUT, f);
  const pdf = join(OUT, f.replace(/\.html$/, '.pdf'));
  execFileSync(chromium, [
    '--headless', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer',
    `--print-to-pdf=${pdf}`, html,
  ], { stdio: 'pipe' });
  ok++;
  process.stdout.write(`  ✓ ${f.replace(/\.html$/, '.pdf')}\n`);
}
console.log(`\nRendered ${ok} PDFs with ${chromium}`);
