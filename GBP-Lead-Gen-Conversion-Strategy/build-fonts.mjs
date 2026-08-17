#!/usr/bin/env node
/**
 * Builds a self-contained fonts.css: downloads the latin + latin-ext woff2
 * subsets for the AfriShield brand families (Sora, Inter, JetBrains Mono) and
 * inlines them as data: URIs so the one-pagers render with correct brand
 * typography with no network dependency (email attachments, offline PDF, etc).
 *
 * Input : /tmp/gf.css  (Google Fonts CSS fetched via curl through the proxy)
 * Output: ./fonts.css
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync('/tmp/gf.css', 'utf8');

// Split into @font-face blocks, each preceded by a /* subset */ comment.
const blocks = css.split('@font-face').slice(1);
const comments = [...css.matchAll(/\/\*\s*([a-z-]+)\s*\*\//g)].map((m) => m[1]);

const KEEP = new Set(['latin', 'latin-ext']);
const out = [];
let idx = 0;
for (const block of blocks) {
  const subset = comments[idx++] || 'latin';
  if (!KEEP.has(subset)) continue;
  const url = block.match(/src:\s*url\((https:[^)]+\.woff2)\)/)?.[1];
  if (!url) continue;
  const buf = execFileSync('curl', [
    '-sS', '--cacert', '/root/.ccr/ca-bundle.crt', url,
  ], { maxBuffer: 1024 * 1024 * 20 });
  const b64 = Buffer.from(buf).toString('base64');
  const rebuilt = ('@font-face' + block)
    .replace(/src:\s*url\(https:[^)]+\.woff2\)\s*format\('woff2'\)/,
      `src: url(data:font/woff2;base64,${b64}) format('woff2')`);
  out.push(rebuilt.trim());
  process.stderr.write(`  embedded ${subset} ${(buf.length / 1024).toFixed(0)}KB\n`);
}

writeFileSync(join(__dirname, 'fonts.css'), out.join('\n\n') + '\n');
console.log(`fonts.css written: ${out.length} faces, ${(Buffer.byteLength(out.join('')) / 1024).toFixed(0)}KB`);
