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
    { '@type': 'Country', name: 'Cameroon' },
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

/** Service schema for the tourism & hospitality umbrella page. */
export const tourismHospitalityServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Hospitality SEO services',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    ...SERVED_CITIES.map((city) => ({ '@type': 'City', name: city.name })),
  ],
  description:
    'Hospitality SEO services for African tourism businesses — safari operators, lodges, hotels, and tour companies — covering keyword research, technical SEO, a scheduled content engine, and visibility in AI answer engines like ChatGPT, Claude and Perplexity.',
};

/** Service schema for the safari operators segment page. */
export const safariOperatorsServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'SEO for safari operators',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Country', name: 'Tanzania' },
    { '@type': 'Country', name: 'Uganda' },
    { '@type': 'Country', name: 'South Africa' },
    { '@type': 'Country', name: 'Cameroon' },
  ],
  description:
    'SEO for safari operators and tour companies in Africa — keyword research aimed at international buyers, technical fixes, a content engine, and GEO work so AI assistants name the operator when travelers plan a safari.',
};

/** Service schema for the lodges & hotels segment page. */
export const lodgesHotelsServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'SEO for lodges and hotels',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    ...SERVED_CITIES.map((city) => ({ '@type': 'City', name: city.name })),
  ],
  description:
    'SEO for lodges, hotels, and guest houses in Africa — direct-booking visibility that reduces OTA commission dependence, plus AI search optimization so assistants like ChatGPT and Perplexity name the property.',
};

/** Service schema for the GEO (generative engine optimization) service page. */
export const geoServicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Generative engine optimization',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    ...SERVED_CITIES.map((city) => ({ '@type': 'City', name: city.name })),
  ],
  description:
    'Generative engine optimization services — AI-crawler allowlists, answer-first content blocks, a structured-data engine, Ask-AI prompts, and a monthly AI-citation benchmark across ChatGPT, Claude, Perplexity, and Gemini.',
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

/**
 * The three service tiers as discrete `Offer` entities.
 *
 * Sourced from one constant so `/pricing`'s visible cards and its JSON-LD
 * cannot drift apart, and so the same offers can be attached to a city page.
 * Board review 2026-09-22: `/pricing` shipped with no Offer schema at all —
 * the skill's own spec required it, but the offers only existed on the
 * homepage's `professionalServiceJsonLd`.
 */
export const OFFER_TIERS = [
  {
    name: 'Foundation',
    price: '150',
    description: 'Technical + AI-visibility foundation, keyword map, and two published pages a month.',
  },
  {
    name: 'Engine',
    price: '400',
    description:
      'Everything in Foundation plus four published pages a month, local landing pages, and competitor tracking.',
  },
  {
    name: 'Operation',
    price: '900',
    description:
      'Full content operation: weekly publishing, local pages on demand, and a quarterly strategy review.',
  },
] as const;

const offerItems = (url: string) =>
  OFFER_TIERS.map((tier) => ({
    '@type': 'Offer',
    name: tier.name,
    price: tier.price,
    priceCurrency: 'USD',
    description: tier.description,
    url: abs(url),
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: tier.price,
      priceCurrency: 'USD',
      billingIncrement: 1,
      unitCode: 'MON',
    },
  }));

/** `/pricing` — the priced offers, on the page that actually shows the prices. */
export const pricingOffersJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': abs('/pricing#service'),
  name: SITE.name,
  url: abs('/pricing'),
  description:
    'AI SEO and generative engine optimisation for African businesses, priced in public at USD 150, 400 or 900 per month.',
  serviceType: 'Search engine optimisation',
  priceRange: 'USD 150–900 per month',
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    ...SERVED_CITIES.map((city) => ({ '@type': 'City', name: city.name })),
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI SEO service tiers',
    itemListElement: offerItems('/pricing'),
  },
};

/**
 * A city landing page's `Service`, scoped to that city.
 *
 * `areaServed` is the city itself rather than the whole continent, and the
 * offers ride along so an answer engine reading a single city page has the
 * price without a second fetch. No street address or telephone is asserted per
 * city — we never fabricate NAP.
 */
export function cityServiceJsonLd(city: {
  slug: string;
  name: string;
  country: string;
  metaDescription: string;
  districts: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': abs(`/ai-seo/${city.slug}#service`),
    name: `AI SEO and GEO in ${city.name}`,
    url: abs(`/ai-seo/${city.slug}`),
    serviceType: 'Search engine optimisation',
    description: city.metaDescription,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE_URL,
      email: SITE.email,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'Country', name: city.country },
    },
    serviceArea: city.districts.map((district) => ({
      '@type': 'Place',
      name: `${district}, ${city.name}`,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `AI SEO service tiers in ${city.name}`,
      itemListElement: offerItems(`/ai-seo/${city.slug}`),
    },
  };
}

/** `/ai-seo` — the city index, as a liftable ItemList of the markets served. */
export const cityIndexJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': abs('/ai-seo#itemlist'),
  name: 'African cities where AfriShield AI provides AI SEO and GEO',
  numberOfItems: SERVED_CITIES.length,
  itemListElement: SERVED_CITIES.map((city, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `AI SEO in ${city.name}, ${city.country}`,
    url: abs(`/ai-seo/${city.name.toLowerCase()}`),
  })),
};
