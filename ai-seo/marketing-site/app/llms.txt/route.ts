import { POSTS } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

/**
 * /llms.txt — a machine-readable map of the site for LLMs and AI answer
 * engines (the llmstxt.org convention). Generated from POSTS and the curated
 * page list below so it never drifts as content is added. Mirrors the sitemap
 * route: force-static, hand-authored top-level routes, blog appended from POSTS.
 *
 * The point of this file for GEO: give an assistant a clean, labelled index of
 * what this site can answer, so a retrieval step lands on the right page
 * instead of guessing from navigation.
 */
const PAGES: { path: string; title: string; desc: string }[] = [
  {
    path: '/solutions',
    title: 'AI SEO & GEO services',
    desc: 'The service in full: search optimisation plus generative engine optimisation for African businesses.',
  },
  {
    path: '/geo-services',
    title: 'GEO services (get cited by AI)',
    desc: 'Generative Engine Optimisation — getting a business named inside ChatGPT, Perplexity, Gemini, and Google AI answers.',
  },
  {
    path: '/how-it-works',
    title: 'How an engagement runs',
    desc: 'The step-by-step process of an AfriShield AI SEO engagement, from audit to ongoing publishing.',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    desc: 'What AI SEO and GEO cost, with the real ranges and the awkward numbers left in.',
  },
  {
    path: '/for-tourism-hospitality',
    title: 'For tourism & hospitality',
    desc: 'AI SEO and GEO for tourism and hospitality businesses across African markets.',
  },
  {
    path: '/for-safari-operators',
    title: 'For safari operators',
    desc: 'Search and AI visibility for safari and tour operators, including direct-booking strategy.',
  },
  {
    path: '/for-lodges-hotels',
    title: 'For lodges & hotels',
    desc: 'AI SEO and GEO for lodges and hotels, including reducing OTA commission with direct bookings.',
  },
  {
    path: '/ai-visibility-check',
    title: 'Free AI visibility check',
    desc: 'A free check of how visible a business currently is to AI answer engines.',
  },
  {
    path: '/resources/ai-visibility-checklist',
    title: 'AI visibility checklist',
    desc: 'A do-it-yourself checklist for improving visibility to AI answer engines.',
  },
  {
    path: '/about',
    title: 'About AfriShield AI',
    desc: 'Who AfriShield AI is and how the AI SEO service came to be.',
  },
  {
    path: '/case-studies',
    title: 'Case studies',
    desc: 'Worked examples and results from AfriShield AI engagements.',
  },
  {
    path: '/contact',
    title: 'Contact',
    desc: 'How to reach AfriShield AI to talk through a specific business.',
  },
];

export const dynamic = 'force-static';

export function GET() {
  const pageLines = PAGES.map(
    (p) => `- [${p.title}](${SITE_URL}${p.path}): ${p.desc}`,
  ).join('\n');

  const blogLines = POSTS.map(
    (post) => `- [${post.cardTitle}](${SITE_URL}/blog/${post.slug}): ${post.description}`,
  ).join('\n');

  const body = `# AfriShield AI

> AI SEO and GEO (Generative Engine Optimisation) for African businesses — making a site easy for Google, ChatGPT, Perplexity, Gemini, and Google AI to find, understand, trust, and cite.

AfriShield AI helps small businesses, tourism operators, and hospitality brands across African markets get found in both traditional search and AI answers. The content below is written to be genuinely useful and quotable: direct answers first, plain language, and the honest limits included. All pages are server-rendered and openly crawlable by AI retrieval bots (see /robots.txt).

## Key pages
${pageLines}

## Blog — guides and answers
${blogLines}

## Contact
- Email: ${'benji@afrishieldai.com'}
- Site: ${SITE_URL}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
