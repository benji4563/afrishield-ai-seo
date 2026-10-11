import { POSTS, type PostMeta } from '@/lib/posts';
import { SITE, SITE_URL } from '@/lib/site';

/**
 * /rss.xml — the blog feed, generated from POSTS so it never drifts as content
 * is added. Mirrors the sitemap and llms.txt routes: force-static, everything
 * derived from the same source of truth.
 *
 * This feed is also the publishing trigger: Zapier polls it and pushes each new
 * item to the LinkedIn company page, so an item appearing here IS the post
 * going out. Two rules follow from that — items are newest-first (pollers read
 * from the top), and `guid` is the permalink and never changes, because a
 * changed guid re-posts an old article as if it were new.
 */

/** Escapes the five XML entities. Titles carry ampersands and em dashes. */
function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** RSS dates are RFC 822. `published` is a plain YYYY-MM-DD, so anchor it at UTC noon. */
function rfc822(date: string) {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

function mimeFor(src: string) {
  if (src.endsWith('.png')) return 'image/png';
  if (src.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

function item(post: PostMeta) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.image
    ? `\n    <enclosure url="${SITE_URL}${post.image.src}" type="${mimeFor(post.image.src)}" length="0" />`
    : '';

  return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${rfc822(post.published)}</pubDate>
    <category>${escapeXml(post.category)}</category>
    <description>${escapeXml(post.description)}</description>${image}
  </item>`;
}

export const dynamic = 'force-static';

export function GET() {
  // Newest first: pollers (Zapier, readers) take the top of the feed as latest.
  const posts = [...POSTS].sort((a, b) => b.published.localeCompare(a.published));
  const lastBuild = posts[0] ? rfc822(posts[0].published) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(SITE.name)} — Blog</title>
  <link>${SITE_URL}/blog</link>
  <description>${escapeXml(SITE.description)}</description>
  <language>en</language>
  <lastBuildDate>${lastBuild}</lastBuildDate>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${posts.map(item).join('\n')}
</channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
