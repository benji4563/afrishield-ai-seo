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
};

export const POSTS: PostMeta[] = [
  {
    slug: 'small-business-seo',
    title: 'Small business SEO: what actually moves the needle when you do not have an enterprise budget',
    cardTitle: 'Small business SEO, without the enterprise budget',
    metaTitle: 'Small business SEO explained',
    description:
      'What actually works for small business SEO, what to skip, and what a small, realistic budget can and cannot buy in the first three to six months.',
    category: 'Small business',
    published: '2026-08-03',
    readingMinutes: 9,
    primaryKeyword: 'small business seo',
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
  },
];

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function otherPosts(slug: string) {
  return POSTS.filter((post) => post.slug !== slug);
}
