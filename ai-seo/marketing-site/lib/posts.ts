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
    slug: 'how-to-get-hotel-cited-by-chatgpt',
    title: 'How to get your hotel cited by ChatGPT (and the other assistants travelers now ask)',
    cardTitle: 'How to get your hotel cited by ChatGPT',
    metaTitle: 'Get your hotel cited by ChatGPT',
    description:
      'Travelers increasingly ask ChatGPT and Perplexity where to stay. What actually gets a hotel named in the answer: crawler access, answer-first content, structured data, and one consistent identity across the web.',
    category: 'AI answers',
    published: '2026-08-10',
    readingMinutes: 10,
    primaryKeyword: 'how to get hotel cited by chatgpt',
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
