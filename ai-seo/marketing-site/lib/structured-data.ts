import { SITE, SITE_URL } from './site';

const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL,
  email: SITE.email,
  // Asserted only once a real inbound number is provisioned — never fabricate NAP.
  // E.164 (from the tel: href) rather than the display formatting.
  ...(SITE.phone ? { telephone: SITE.phoneHref.replace('tel:', '') } : {}),
  description: SITE.description,
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    { '@type': 'Country', name: 'Nigeria' },
    { '@type': 'Country', name: 'Ghana' },
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Country', name: 'South Africa' },
  ],
};

/**
 * Cities we serve, used for areaServed on the service/local schema. These make
 * the ProfessionalService legible to local + AI answer engines ("best AI SEO in
 * Lagos"). No street address is asserted, and telephone only once a real
 * inbound number exists — we never fabricate NAP.
 */
export const SERVED_CITIES = [
  { name: 'Lagos', country: 'Nigeria' },
  { name: 'Abuja', country: 'Nigeria' },
  { name: 'Accra', country: 'Ghana' },
  { name: 'Nairobi', country: 'Kenya' },
  { name: 'Johannesburg', country: 'South Africa' },
  { name: 'Douala', country: 'Cameroon' },
] as const;

export const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: SITE_URL,
  description: SITE.description,
  serviceType: 'Search engine optimisation',
  priceRange: '$$',
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    ...SERVED_CITIES.map((city) => ({ '@type': 'City', name: city.name })),
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI SEO service tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Foundation',
        price: '150',
        priceCurrency: 'USD',
        description: 'Technical + AI-visibility foundation, keyword map, and two posts a month.',
      },
      {
        '@type': 'Offer',
        name: 'Engine',
        price: '400',
        priceCurrency: 'USD',
        description: 'Everything in Foundation plus four posts a month and local landing pages.',
      },
      {
        '@type': 'Offer',
        name: 'Operation',
        price: '900',
        priceCurrency: 'USD',
        description: 'Full content operation with weekly publishing and quarterly strategy review.',
      },
    ],
  },
};

export const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI SEO',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    ...SERVED_CITIES.map((city) => ({ '@type': 'City', name: city.name })),
  ],
  description:
    'Keyword and SERP intelligence, a content engine that publishes on a schedule, rank tracking reported monthly, and visibility in AI answer engines like ChatGPT, Claude and Perplexity.',
};

/** Founder, for the About page. */
export const founderJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Benjamin Njock',
  jobTitle: 'Founder, AfriShield AI',
  worksFor: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
  description:
    'Insurance executive with over 18 years of corporate experience and co-founder of Tataachi Network Insurance and Optimere, operating across 40+ African countries.',
  knowsAbout: ['Insurance', 'African financial services', 'AI adoption', 'Search visibility'],
};

export function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE.name}`,
    url: abs('/about'),
    mainEntity: founderJsonLd,
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
  };
}

export function faqPageJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(trail: ReadonlyArray<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

/** Takes a PostMeta straight from lib/posts.ts so the two cannot drift. */
export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  published: string;
  modified?: string;
  image?: { src: string; alt: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: abs(`/blog/${post.slug}`),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(`/blog/${post.slug}`) },
    datePublished: post.published,
    dateModified: post.modified ?? post.published,
    ...(post.image ? { image: abs(post.image.src) } : {}),
    author: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
  };
}

export function howToJsonLd(
  steps: ReadonlyArray<{ name: string; text: string }>,
  name: string = 'How an AfriShield AI SEO engagement runs',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export const blogIndexJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `${SITE.name} — Blog`,
  url: abs('/blog'),
  description: 'Plain-English writing on search visibility, content, and what it actually costs.',
  publisher: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
};
