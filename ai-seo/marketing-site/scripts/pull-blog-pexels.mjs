// Pull one curated Pexels photo per image-less blog post into public/images,
// converted to optimized WebP, and append attribution to credits.json.
//
// Key resolution (never printed): PEXELS_API_KEY from the environment, or the
// PEXELS_API_KEY line of ./.env.local if present. Run from marketing-site/:
//   node scripts/pull-blog-pexels.mjs
//
// Pexels license: free for commercial use, attribution appreciated (recorded
// in credits.json). Requires ffmpeg on PATH for PNG/JPEG -> WebP conversion.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const run_ = promisify(execFile);

function resolveKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim();
  const envPath = path.resolve('.env.local');
  if (existsSync(envPath)) {
    const line = readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .find((l) => l.startsWith('PEXELS_API_KEY='));
    if (line) return line.slice('PEXELS_API_KEY='.length).replace(/^["']|["']$/g, '').trim();
  }
  return '';
}

const KEY = resolveKey();
if (!KEY) {
  console.error('PEXELS_API_KEY not set (env or .env.local). Aborting.');
  process.exit(1);
}

const OUT = path.resolve('public/images');
const CREDITS = path.join(OUT, 'credits.json');

// slug -> ordered candidate queries (African subjects, matched to post intent).
const SLOTS = [
  { slug: 'content-marketing-for-small-business', queries: ['african entrepreneur writing blog laptop', 'african woman content creator laptop'] },
  { slug: 'how-to-get-more-website-traffic', queries: ['african entrepreneur laptop analytics growth', 'african business person checking phone laptop'] },
  { slug: 'how-to-appear-on-google-maps', queries: ['african woman shop owner storefront entrance', 'nigerian small business owner shop front', 'african shopkeeper standing outside store'] },
  { slug: 'how-to-improve-google-ranking', queries: ['african professional laptop office focused', 'african entrepreneur working computer desk'] },
  { slug: 'how-to-do-keyword-research', queries: ['african woman laptop notebook research', 'african person planning notes laptop'] },
  { slug: 'seo-vs-google-ads', queries: ['african marketer laptop charts office', 'african business person laptop graphs'] },
  { slug: 'local-seo-for-small-business', queries: ['african local shop owner counter', 'african market vendor stall shop'] },
  { slug: 'how-long-does-seo-take', queries: ['african business owner thinking laptop window', 'african entrepreneur waiting office laptop'] },
  { slug: 'is-seo-worth-it', queries: ['african entrepreneur counting cash shop', 'black business owner calculator money desk', 'african woman counting money small business'] },
  { slug: 'how-to-rank-on-chatgpt', queries: ['african professional using smartphone technology', 'african person phone ai assistant'] },
  { slug: 'google-business-profile-optimization', queries: ['african shop owner smartphone storefront', 'african business owner phone shop counter'] },
];

async function search(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`search ${query}: ${res.status}`);
  const data = await res.json();
  return data.photos ?? [];
}

async function download(srcUrl, dest) {
  await run_('curl', ['-sSL', '--max-time', '60', '-o', dest, srcUrl]);
}

async function toWebp(srcJpg, destWebp) {
  await run_('ffmpeg', ['-y', '-loglevel', 'error', '-i', srcJpg,
    '-vf', 'scale=1600:-1:flags=lanczos', '-c:v', 'libwebp', '-quality', '80',
    '-compression_level', '6', destWebp]);
}

async function run() {
  await mkdir(OUT, { recursive: true });
  let credits = [];
  try { credits = JSON.parse(await readFile(CREDITS, 'utf8')); } catch {}
  const usedIds = new Set(credits.map((c) => c.pexelsId).filter(Boolean));

  // Optional slug filter: `node scripts/pull-blog-pexels.mjs slugA slugB`
  const only = process.argv.slice(2);
  const slots = only.length ? SLOTS.filter((s) => only.includes(s.slug)) : SLOTS;

  for (const { slug, queries } of slots) {
    let picked = null;
    for (const q of queries) {
      const photos = await search(q);
      picked = photos.find((p) => p.width >= p.height && p.src?.landscape && !usedIds.has(p.id));
      if (picked) { picked.query = q; break; }
    }
    if (!picked) { console.warn(`no result for ${slug}`); continue; }
    usedIds.add(picked.id);

    const tmpJpg = path.join(OUT, `.tmp-${slug}.jpg`);
    const webp = path.join(OUT, `blog-${slug}.webp`);
    await download(picked.src.landscape, tmpJpg);
    await toWebp(tmpJpg, webp);
    await run_('node', ['-e', `require('fs').unlinkSync(${JSON.stringify(tmpJpg)})`]).catch(() => {});

    // Replace any existing credit for this slot (so re-runs don't duplicate).
    credits = credits.filter((c) => c.slot !== `blog-${slug}`);
    credits.push({
      slot: `blog-${slug}`,
      file: `images/blog-${slug}.webp`,
      source: 'Pexels',
      query: picked.query,
      pexelsId: picked.id,
      pexelsUrl: picked.url,
      photographer: picked.photographer,
      photographerUrl: picked.photographer_url,
      alt: picked.alt,
      avgColor: picked.avg_color,
    });
    console.log(`✓ blog-${slug}  <-  ${picked.photographer} (${picked.query})`);
  }

  await writeFile(CREDITS, JSON.stringify(credits, null, 2));
  console.log('credits.json updated.');
}

run().catch((err) => { console.error(err); process.exit(1); });
