import { POSTS } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

/**
 * Hand-authored route list. Every entry here must return 200 — a sitemap that
 * lists routes that do not exist is worse than no sitemap.
 * `/thank-you` is deliberately absent: it is noindex.
 */
const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/solutions', priority: '0.9', changefreq: 'monthly' },
  { path: '/how-it-works', priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { path: '/for-tourism-hospitality', priority: '0.9', changefreq: 'monthly' },
  { path: '/for-safari-operators', priority: '0.9', changefreq: 'monthly' },
  { path: '/for-lodges-hotels', priority: '0.9', changefreq: 'monthly' },
  { path: '/geo-services', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/case-studies', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
];

export const dynamic = 'force-static';

export function GET() {
  const today = new Date().toISOString().slice(0, 10);

  const entries = [
    ...ROUTES.map((route) => ({ ...route, lastmod: today })),
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
