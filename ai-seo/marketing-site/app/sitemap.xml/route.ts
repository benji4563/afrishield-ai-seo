import { POSTS } from '@/lib/posts';
import { CITIES } from '@/lib/cities';
import { SITE_URL } from '@/lib/site';

/**
 * Hand-authored route list. Every entry here must return 200 — a sitemap that
 * lists routes that do not exist is worse than no sitemap.
 * `/thank-you` is deliberately absent: it is noindex.
 *
 * **`lastmod` is hand-maintained on purpose.** Until 2026-10-13 every static
 * route and every city page reported `new Date()`, so all 21 of them claimed to
 * have changed on whatever day the site was last deployed — including routes
 * untouched since July. Google treats a sitemap whose dates move without the
 * content moving as unreliable and starts ignoring `lastmod` for the whole
 * domain, which costs recrawl priority on the pages that genuinely did change.
 *
 * The dates below were read from `git log` per page on 2026-10-13. The rule when
 * you edit a page: bump its date only for a **significant content change** —
 * new or rewritten copy, a new section, changed metadata. A shared component
 * tweak that happens to touch the render tree is not one, which is why
 * `/solutions` and `/about` still read 2026-07-29 even though `CtaDrop.tsx`
 * changed in August.
 *
 * `/blog` and the post URLs are exempt: they derive their dates from `POSTS`
 * below and need no maintenance.
 */
const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-10-12' },
  { path: '/solutions', priority: '0.9', changefreq: 'monthly', lastmod: '2026-07-29' },
  { path: '/how-it-works', priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/for-tourism-hospitality', priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/for-safari-operators', priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/for-lodges-hotels', priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/geo-services', priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/ai-seo', priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/ai-visibility-check', priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/about', priority: '0.8', changefreq: 'monthly', lastmod: '2026-07-29' },
  { path: '/case-studies', priority: '0.8', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/resources/ai-visibility-checklist', priority: '0.7', changefreq: 'monthly', lastmod: '2026-10-12' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly', lastmod: '2026-10-12' },
];

/**
 * Every city page renders from one template plus `lib/cities.ts`, so they share
 * a real modification date: the later of those two files' last content change.
 * Bump this when you edit either.
 */
const CITIES_LASTMOD = '2026-10-12';

export const dynamic = 'force-static';

/** The newest post date — the blog index genuinely changes when a post lands. */
function blogIndexLastmod() {
  return POSTS.map((post) => post.modified ?? post.published).sort().at(-1) ?? '2026-07-29';
}

export function GET() {
  const entries = [
    ...ROUTES,
    { path: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: blogIndexLastmod() },
    ...CITIES.map((city) => ({
      path: `/ai-seo/${city.slug}`,
      priority: '0.9',
      changefreq: 'monthly',
      lastmod: CITIES_LASTMOD,
    })),
    ...POSTS.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: post.modified ?? post.published,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
