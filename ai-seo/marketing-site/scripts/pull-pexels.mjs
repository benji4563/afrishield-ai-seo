// Pull curated African-business imagery from Pexels into public/images.
// Key is read from PEXELS_API_KEY in the environment — never hardcode it.
// Pexels license: free for commercial use, attribution appreciated (we record
// it in credits.json). Run: PEXELS_API_KEY=xxx node scripts/pull-pexels.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const run_ = promisify(execFile);

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error('PEXELS_API_KEY not set');
  process.exit(1);
}

const OUT = path.resolve('public/images');

// slot -> ordered candidate queries. First query that returns a usable
// landscape photo wins. Queries bias toward African subjects.
const SLOTS = [
  { slot: 'serve-small', queries: ['african shop owner small business', 'african market woman shop'] },
  { slot: 'serve-mid', queries: ['african businesswoman office laptop', 'african woman entrepreneur office'] },
  { slot: 'serve-corporate', queries: ['african corporate business meeting', 'african business team office meeting'] },
  { slot: 'home-band', queries: ['african entrepreneurs team working', 'african business people office'] },
  { slot: 'about-context', queries: ['african businessman working laptop', 'african entrepreneur office desk'] },
  { slot: 'pillar-research', queries: ['african woman analyst laptop data', 'african professional laptop office'] },
  { slot: 'pillar-content', queries: ['african man writing notebook office', 'african woman writing desk'] },
  { slot: 'pillar-reporting', queries: ['african business meeting charts', 'african team reviewing documents'] },
  { slot: 'blog-what-ai-seo-actually-does', queries: ['african man laptop office focused', 'african professional working computer'] },
  { slot: 'blog-what-seo-actually-costs', queries: ['african woman small business phone money', 'african market vendor stall'] },
  { slot: 'blog-ai-seo-vs-traditional-seo', queries: ['african office computers technology', 'african developer computer office'] },
];

async function search(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query,
  )}&per_page=6&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`search ${query}: ${res.status}`);
  const data = await res.json();
  return data.photos ?? [];
}

async function download(srcUrl, dest) {
  // curl reaches the Pexels CDN reliably here where node fetch times out.
  await run_('curl', ['-sSL', '--max-time', '45', '-o', dest, srcUrl]);
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const credits = [];

  for (const { slot, queries } of SLOTS) {
    let picked = null;
    for (const q of queries) {
      const photos = await search(q);
      // prefer a wide landscape with a real photographer
      picked = photos.find((p) => p.width >= p.height && p.src?.landscape);
      if (picked) {
        picked.query = q;
        break;
      }
    }
    if (!picked) {
      console.warn(`no result for ${slot}`);
      continue;
    }
    const dest = path.join(OUT, `${slot}.jpg`);
    await download(picked.src.landscape, dest);
    credits.push({
      slot,
      file: `images/${slot}.jpg`,
      query: picked.query,
      pexelsId: picked.id,
      pexelsUrl: picked.url,
      photographer: picked.photographer,
      photographerUrl: picked.photographer_url,
      alt: picked.alt,
      avgColor: picked.avg_color,
    });
    console.log(`✓ ${slot}  <-  ${picked.photographer} (${picked.query})`);
  }

  await writeFile(path.join(OUT, 'credits.json'), JSON.stringify(credits, null, 2));
  console.log(`\n${credits.length}/${SLOTS.length} slots filled. credits.json written.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
