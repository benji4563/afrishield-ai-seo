export type PostMeta = {
  slug: string;
  title: string;
  /** Short label used on cards — the H1 in full is `title`. */
  cardTitle: string;
  /** ≤44 chars: the SERP <title> (brand suffix keeps it under 60). H1 stays `title`. */
  metaTitle: string;
  description: string;
  category: string;
  published: string;
  modified?: string;
  readingMinutes: number;
  primaryKeyword: string;
  /**
   * Card + social image for the post. Lives here (not in a separate hardcoded
   * map) so a post and its image never drift out of sync. Every post SHOULD
   * declare one; a post left without an image renders a clean placeholder
   * rather than a broken `<img>`. Files live in `public/images/` and are
   * sourced via `scripts/pull-pexels.mjs`.
   */
  image?: { src: string; alt: string };
};

/** Default social share image used when a page/post has none of its own. */
export const DEFAULT_OG_IMAGE = '/images/home-band.jpg';

/** OG/Twitter image list for a post — its own image, or the site default. */
export function postOgImages(post: PostMeta) {
  return [{ url: post.image?.src ?? DEFAULT_OG_IMAGE }];
}

export const POSTS: PostMeta[] = [
  {
    slug: 'top-geo-ai-seo-agencies-africa-2026',
    title:
      'The 2026 guide to Generative Engine Optimization (GEO) and AI search agencies in Africa',
    cardTitle: 'Top GEO & AI search agencies in Africa (2026)',
    metaTitle: 'Top GEO Agencies in Africa (2026)',
    description:
      'An objective comparison of the leading Generative Engine Optimization (GEO) and AI search visibility agencies serving African enterprises in 2026 — the evaluation framework, a provider matrix, and when GEO beats local SEO.',
    category: 'Comparison',
    published: '2026-08-30',
    modified: '2026-08-30',
    readingMinutes: 9,
    primaryKeyword: 'generative engine optimization agencies africa',
    image: {
      src: '/images/blog-top-geo-ai-seo-agencies-africa-2026.jpg',
      alt: 'Two African business professionals comparing options on a laptop across a table in a meeting.',
    },
  },
  {
    slug: 'enterprise-geo-launch-africa',
    title:
      'AfriShield AI launches enterprise Generative Engine Optimization across Africa',
    cardTitle: 'AfriShield AI launches enterprise GEO in Africa',
    metaTitle: 'Enterprise GEO Launches in Africa',
    description:
      'AfriShield AI is launching an enterprise Generative Engine Optimization (GEO) and Answer Engine Optimization service across Central, East, and West Africa — getting brands named inside AI answers, the honest way.',
    category: 'Announcements',
    published: '2026-08-30',
    modified: '2026-08-30',
    readingMinutes: 7,
    primaryKeyword: 'enterprise generative engine optimization africa',
    image: {
      src: '/images/blog-enterprise-geo-launch-africa.jpg',
      alt: 'A focused African technology professional working at a computer in an open-plan office.',
    },
  },
  {
    slug: 'ai-search-visibility-study',
    title:
      'Who does AI recommend when someone searches for an African business? A 5-city study',
    cardTitle: 'Who AI recommends in African cities (a study)',
    metaTitle: 'Who AI names when Africa searches',
    description:
      'We ran real searches across Nairobi, Lagos, Accra, Johannesburg and Arusha. In travel, a business’s own website was just 23% of page one; in professional services, 68%. Google served an AI answer on every single query.',
    category: 'Original research',
    published: '2026-08-28',
    modified: '2026-08-28',
    readingMinutes: 8,
    primaryKeyword: 'ai search visibility for african businesses',
    image: {
      src: '/images/blog-ai-search-visibility-study.webp',
      alt: 'An African business owner smiling at a laptop while checking search results in an office.',
    },
  },
  {
    slug: 'content-marketing-for-small-business',
    title: 'Content marketing for small business: what actually earns attention (and what wastes it)',
    cardTitle: 'Content marketing for small business, honestly',
    metaTitle: 'Content Marketing For Small Business',
    description:
      'What content marketing actually means for a small business, the content worth the time, how often to publish, and how to tell whether any of it is working.',
    category: 'Content strategy',
    published: '2026-08-23',
    readingMinutes: 10,
    primaryKeyword: 'content marketing for small business',
    image: {
      src: '/images/blog-content-marketing-for-small-business.webp',
      alt: 'A small-business owner writing content on a laptop, a notebook and coffee beside them.',
    },
  },
  {
    slug: 'how-to-get-more-website-traffic',
    title: 'How to get more website traffic: the channels that actually move the number',
    cardTitle: 'How to get more website traffic, honestly',
    metaTitle: 'How To Get More Website Traffic',
    description:
      'Why a higher Google ranking does not automatically mean more visitors, the five traffic channels a small business actually controls, and how to tell which one is working.',
    category: 'Traffic growth',
    published: '2026-08-22',
    readingMinutes: 10,
    primaryKeyword: 'how to get more website traffic',
    image: {
      src: '/images/blog-how-to-get-more-website-traffic.webp',
      alt: 'A business owner reviewing website traffic and analytics charts on a laptop and tablet.',
    },
  },
  {
    slug: 'how-to-appear-on-google-maps',
    title: 'How to appear on Google Maps: the ranking factors that actually decide it',
    cardTitle: 'How to appear on Google Maps, explained',
    metaTitle: 'How To Appear On Google Maps',
    description:
      'Why a business does not show on Google Maps at all, the three ranking factors Google actually uses, and the concrete profile fixes that move a listing into the map pack.',
    category: 'Local visibility',
    published: '2026-08-21',
    readingMinutes: 10,
    primaryKeyword: 'how to appear on google maps',
    image: {
      src: '/images/blog-how-to-appear-on-google-maps.webp',
      alt: 'A smiling shop owner in an apron at his storefront, holding a crate of fresh produce.',
    },
  },
  {
    slug: 'how-to-improve-google-ranking',
    title: 'How to improve your Google ranking: the checklist that actually works',
    cardTitle: 'How to improve Google ranking, the plain checklist',
    metaTitle: 'How To Improve Your Google Ranking',
    description:
      'The technical fixes, on-page basics, content, and trust signals that actually move a Google ranking, in the order that matters, plus how long each layer realistically takes to show.',
    category: 'Fundamentals',
    published: '2026-08-20',
    readingMinutes: 11,
    primaryKeyword: 'how to improve google ranking',
    image: {
      src: '/images/blog-how-to-improve-google-ranking.webp',
      alt: 'A focused entrepreneur working intently at a laptop by an office window.',
    },
  },
  {
    slug: 'how-to-do-keyword-research',
    title: 'How to do keyword research: a method that works without an agency budget',
    cardTitle: 'How to do keyword research, the real method',
    metaTitle: 'How To Do Keyword Research, Explained',
    description:
      'Finding the exact words customers use before they buy, without a paid tool: where to look, how to read low African search volumes, matching intent, and a five-step process for one afternoon.',
    category: 'Research',
    published: '2026-08-19',
    readingMinutes: 10,
    primaryKeyword: 'how to do keyword research',
    image: {
      src: '/images/blog-how-to-do-keyword-research.webp',
      alt: 'A young entrepreneur jotting research notes in a notebook beside a laptop.',
    },
  },
  {
    slug: 'seo-vs-google-ads',
    title: 'SEO vs Google Ads: which one should a small business fund first?',
    cardTitle: 'SEO vs Google Ads, the honest breakdown',
    metaTitle: 'SEO vs Google Ads: The Honest Breakdown',
    description:
      'Google Ads buys clicks the day you launch; SEO earns them for free after months of work. The real comparison on cost, speed, and durability, and which one a small business should fund first.',
    category: 'Comparison',
    published: '2026-08-18',
    readingMinutes: 10,
    primaryKeyword: 'seo vs google ads',
    image: {
      src: '/images/blog-seo-vs-google-ads.webp',
      alt: 'Two colleagues comparing performance charts and figures across a desk.',
    },
  },
  {
    slug: 'local-seo-for-small-business',
    title: 'Local SEO for small business: the checklist that actually moves rankings',
    cardTitle: 'Local SEO for small business, the real checklist',
    metaTitle: 'Local SEO For Small Business, Explained',
    description:
      'What local SEO actually is, how it differs from general SEO, and the concrete, mostly-free work — Google Business Profile, NAP consistency, citations, and reviews — that moves the map pack.',
    category: 'Local visibility',
    published: '2026-08-17',
    readingMinutes: 10,
    primaryKeyword: 'local seo for small business',
    image: {
      src: '/images/blog-local-seo-for-small-business.webp',
      alt: 'A smiling café owner in an apron standing in her shop.',
    },
  },
  {
    slug: 'how-long-does-seo-take',
    title: 'How long does SEO take? The realistic timeline, month by month',
    cardTitle: 'How long does SEO take? A realistic timeline',
    metaTitle: 'How Long Does SEO Take? A Realistic Timeline',
    description:
      'Most small business sites see the first ranking movement in three to six months, and real traffic in six to twelve. The honest month-by-month timeline, what speeds it up, and what does not.',
    category: 'Fundamentals',
    published: '2026-08-14',
    readingMinutes: 10,
    primaryKeyword: 'how long does seo take',
    image: {
      src: '/images/blog-how-long-does-seo-take.webp',
      alt: 'A business owner pausing in thought at a laptop, coffee in hand, waiting on results.',
    },
  },
  {
    slug: 'is-seo-worth-it',
    title: 'Is SEO worth it? The honest answer, with the math that backs it up',
    cardTitle: 'Is SEO worth it? An honest answer',
    metaTitle: 'Is SEO Worth It? The Honest Answer',
    description:
      'SEO is worth it for most small businesses, but not on every timeline or budget. The real return, what it costs to get there, and the honest case for skipping it.',
    category: 'Money',
    published: '2026-08-13',
    readingMinutes: 10,
    primaryKeyword: 'is seo worth it',
    image: {
      src: '/images/blog-is-seo-worth-it.webp',
      alt: 'A business owner counting cash over financial statements and a notebook.',
    },
  },
  {
    slug: 'how-to-rank-on-chatgpt',
    title:
      'How to rank on ChatGPT: the actual work, since there is no ranking algorithm to game',
    cardTitle: 'How to rank on ChatGPT, without the ranking',
    metaTitle: 'How to rank on ChatGPT, explained',
    description:
      'There is no ChatGPT ranking algorithm to climb. Here is the concrete, checkable work that actually gets a business named in a ChatGPT answer instead.',
    category: 'AI answers',
    published: '2026-08-12',
    readingMinutes: 10,
    primaryKeyword: 'how to rank on chatgpt',
    image: {
      src: '/images/blog-how-to-rank-on-chatgpt.webp',
      alt: 'A professional checking his phone the way customers now ask an AI assistant a question.',
    },
  },
  {
    slug: 'google-business-profile-optimization',
    title: 'Google Business Profile optimization: the work that happens after setup',
    cardTitle: 'Google Business Profile optimization, done right',
    metaTitle: 'Google Business Profile Optimization',
    description:
      'The ranking factors, category and attribute choices, photo and Posts cadence, and review habits that actually move a Google Business Profile once it is already set up.',
    category: 'Local visibility',
    published: '2026-08-11',
    readingMinutes: 10,
    primaryKeyword: 'google business profile optimization',
    image: {
      src: '/images/blog-google-business-profile-optimization.webp',
      alt: 'A shop owner turning the sign to Open at the door of his store.',
    },
  },
  {
    slug: 'how-to-get-hotel-cited-by-chatgpt',
    title: 'How to get your hotel cited by ChatGPT (and the other assistants travelers now ask)',
    cardTitle: 'How to get your hotel cited by ChatGPT',
    metaTitle: 'Get your hotel cited by ChatGPT',
    description:
      'Travelers now ask ChatGPT, Perplexity and Gemini where to stay — here is how to rank inside those AI answers. What actually gets a hotel named: crawler access, answer-first content, structured data, and one consistent identity across the web.',
    category: 'AI answers',
    published: '2026-08-10',
    readingMinutes: 10,
    primaryKeyword: 'how to get hotel cited by chatgpt',
    image: {
      src: '/images/blog-how-to-get-hotel-cited-by-chatgpt.webp',
      alt: 'A luxury safari lodge surfacing inside an AI assistant’s answer to the query “best luxury lodges near Arusha.”',
    },
  },
  {
    slug: 'how-to-reduce-ota-commission',
    title: 'How to reduce OTA commission: the direct-booking playbook for lodges and hotels',
    cardTitle: 'How to reduce OTA commission',
    metaTitle: 'How to reduce OTA commission',
    description:
      'OTA commissions run 10–25% of every booking. A practical playbook for African lodges and hotels to shift reservations onto direct channels — mostly arithmetic and consistency, no magic.',
    category: 'Direct bookings',
    published: '2026-08-10',
    readingMinutes: 11,
    primaryKeyword: 'how to reduce ota commission',
    image: {
      src: '/images/blog-how-to-reduce-ota-commission.webp',
      alt: 'A Tanzanian safari operator checking a booking calendar on a tablet, Mount Meru framed in the window behind him.',
    },
  },
  {
    slug: 'what-is-schema-markup',
    title:
      'What is schema markup? The structured data explainer for a small business site',
    cardTitle: 'What is schema markup, explained plainly',
    metaTitle: 'What is schema markup? A plain answer',
    description:
      'What schema markup actually is, the handful of schema.org types worth using on a small business site, and the honest limits of what a few lines of JSON-LD can do for you.',
    category: 'Technical SEO',
    published: '2026-08-10',
    readingMinutes: 9,
    primaryKeyword: 'what is schema markup',
    image: {
      src: '/images/blog-what-is-schema-markup.webp',
      alt: 'A nyama choma food-stall owner on her phone — the hours, menu and reviews that schema markup turns into facts a machine can read.',
    },
  },
  {
    slug: 'how-to-get-my-business-on-google',
    title:
      'How to get your business on Google: search, Maps, and being the answer an AI names',
    cardTitle: 'How to get your business on Google',
    metaTitle: 'Get your business on Google, step by step',
    description:
      'The three separate ways a business shows up on Google — Maps, organic search, and AI answers — and the concrete, mostly-free steps for each, cheapest first.',
    category: 'Local visibility',
    published: '2026-08-10',
    readingMinutes: 10,
    primaryKeyword: 'how to get my business on google',
    image: {
      src: '/images/blog-how-to-get-my-business-on-google.webp',
      alt: 'A phone-repair shop owner holding up his phone showing his Google Business Profile and a Google Maps pin.',
    },
  },
  {
    slug: 'small-business-seo',
    title: 'Small business SEO: what actually matters when you do not have an agency budget',
    cardTitle: 'Small business SEO, without the agency budget',
    metaTitle: 'Small business SEO, explained',
    description:
      'What small business SEO actually is, why it is not scaled-down enterprise SEO, and the specific, mostly-free moves that matter before you consider hiring anyone.',
    category: 'Fundamentals',
    published: '2026-08-05',
    readingMinutes: 10,
    primaryKeyword: 'small business seo',
    image: {
      src: '/images/blog-small-business-seo.webp',
      alt: 'A small-business owner looking anxiously at a laptop showing a falling website-traffic graph.',
    },
  },
  {
    slug: 'answer-engine-optimization',
    title: 'Answer engine optimization: getting your business quoted by the AI, not just ranked by Google',
    cardTitle: 'Answer engine optimization, without the hype',
    metaTitle: 'Answer engine optimization explained',
    description:
      'What it takes to be named inside an AI assistant’s answer — not just listed underneath it — and why the gap is wider, and more winnable, in African markets.',
    category: 'AI answers',
    published: '2026-07-29',
    readingMinutes: 9,
    primaryKeyword: 'answer engine optimization',
    image: {
      src: '/images/blog-answer-engine-optimization.webp',
      alt: 'Two marketers celebrating in front of a screen showing a falling Google traffic graph — hype outpacing the results.',
    },
  },
  {
    slug: 'what-ai-seo-actually-does',
    title: 'What an AI SEO agency actually does all day (and what it definitely does not)',
    cardTitle: 'What an AI SEO agency actually does all day',
    metaTitle: 'What an AI SEO agency does all day',
    description:
      'A plain, slightly unflattering tour of the work behind an AI SEO retainer — the clustering, the writing, the schema, and the parts nobody photographs.',
    category: 'The work',
    published: '2026-07-24',
    readingMinutes: 9,
    primaryKeyword: 'ai seo agency for small business',
    image: {
      src: '/images/blog-what-ai-seo-actually-does.jpg',
      alt: 'An African professional focused on work at a laptop in an office.',
    },
  },
  {
    slug: 'what-seo-actually-costs',
    title: 'What SEO actually costs, with the awkward numbers left in',
    cardTitle: 'What SEO actually costs, awkward numbers included',
    metaTitle: 'What SEO actually costs, explained',
    description:
      'Real ranges, what sits behind each one, and the four months of paying before earning that nobody puts on the pricing page.',
    category: 'Money',
    published: '2026-07-24',
    readingMinutes: 10,
    primaryKeyword: 'how much does seo cost',
    image: {
      src: '/images/blog-what-seo-actually-costs.jpg',
      alt: 'An African small-business owner managing money and a phone at a market stall.',
    },
  },
  {
    slug: 'ai-seo-vs-traditional-seo',
    title: 'AI SEO vs traditional SEO: a fair fight, refereed badly',
    cardTitle: 'AI SEO vs traditional SEO: a fair fight',
    metaTitle: 'AI SEO vs traditional SEO: a fair fight',
    description:
      'Where automation genuinely wins, where it quietly loses, and the specific jobs you should never hand to a machine without a human reading the output.',
    category: 'Comparison',
    published: '2026-07-24',
    readingMinutes: 9,
    primaryKeyword: 'ai seo vs traditional seo',
    image: {
      src: '/images/blog-ai-seo-vs-traditional-seo.jpg',
      alt: 'An African team working at computers in a technology office.',
    },
  },
];

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function otherPosts(slug: string) {
  return POSTS.filter((post) => post.slug !== slug);
}
