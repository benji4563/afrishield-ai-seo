import { SITE, SITE_URL } from './site';
import { POSTS } from './posts';

const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/**
 * Stable node identities, so the Organization and the founder resolve to one
 * linked pair rather than two loose nodes. Follows the `abs('/path#fragment')`
 * convention already used by the service and itemlist nodes below.
 */
export const ORGANIZATION_ID = abs('/#organization');
export const FOUNDER_ID = abs('/#founder');

/**
 * Postal address, **city-level on purpose**.
 *
 * `local-seo/business.json` is the source of truth for NAP and carries
 * `service_area_business: true` with `hide_address: true`. The Google Business
 * Profile is a service-area listing: it uses the street line for verification
 * and geocoding, but does not display it publicly. Asserting the street here
 * would therefore *diverge* from the profile Google compares this against —
 * and would publish a physical address on all 41 pages, permanently.
 *
 * City, region and country are what a service-area business is meant to
 * publish, and they still anchor the entity to Douala for local relevance.
 *
 * If `hide_address` is ever set to false, add `streetAddress` here from
 * `business.json.address.street` — do not retype it from memory.
 */
const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Douala',
  addressRegion: 'Littoral',
  addressCountry: 'CM',
} as const;

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL,
  email: SITE.email,
  // Asserted only once a real inbound number is provisioned — never fabricate NAP.
  // E.164 (from the tel: href) rather than the display formatting.
  ...(SITE.phone ? { telephone: SITE.phoneHref.replace('tel:', '') } : {}),
  description: SITE.description,
  // Entity disambiguation. Omitted entirely rather than emitted empty when no
  // profile is confirmed yet — an empty sameAs is a wasted signal, not a
  // neutral one. See SITE.profiles for what is allowed in here.
  ...(SITE.profiles.length ? { sameAs: SITE.profiles } : {}),
  // Google reads `logo` for the knowledge-panel image, and it is one of the
  // few Organization properties it documents explicitly. Rendered from the
  // SignalNode mark — see scripts note in public/logo.png's commit.
  logo: abs('/logo.png'),
  address: BUSINESS_ADDRESS,
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    // Cameroon is the head office, so it leads the list. It was missing here
    // while SERVED_CITIES already carried Douala — the two now agree.
    { '@type': 'Country', name: 'Cameroon' },
    { '@type': 'Country', name: 'Nigeria' },
    { '@type': 'Country', name: 'Ghana' },
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Country', name: 'South Africa' },
  ],
  /**
   * The founder, asserted first-party.
   *
   * This exists because Google's AI Overview for "AfriShield AI" (checked
   * 2026-10-16) stated "Founded by ... Benjamin Enyong Njock" and cited
   * LinkedIn — it had learned the fact from a third party, because this site
   * never said it in a machine-readable way. Everything below is already
   * claimed in prose on /about; this only makes it legible to a parser.
   *
   * Nested rather than referenced by @id on purpose: the Organization renders
   * in the root layout on all 41 pages, so a bare {'@id'} pointer would dangle
   * on every page that is not /about.
   *
   * `alternateName` reconciles the split between the name this site uses and
   * the fuller one LinkedIn carries, so both strings resolve to one person.
   */
  founder: {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    // The verified public LinkedIn profile carries the full form, so that is
    // the primary name; the shorter form the site's prose uses is kept as the
    // alternate so both strings resolve to one person.
    name: 'Benjamin Enyong Njock',
    alternateName: 'Benjamin Njock',
    jobTitle: 'Founder',
    image: abs('/team/benjamin-njock.jpg'),
    url: abs('/about'),
    worksFor: { '@id': ORGANIZATION_ID },
  },
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
  address: BUSINESS_ADDRESS,
  // Same profiles as the Organization node, so both entities resolve to one
  // company rather than reading as two.
  ...(SITE.profiles.length ? { sameAs: SITE.profiles } : {}),
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
  name: 'AI SEO',
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
  name: 'Hospitality SEO services',
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
  name: 'SEO for safari operators',
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
  name: 'SEO for lodges and hotels',
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
  name: 'Generative engine optimization',
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
  lang?: 'en' | 'fr';
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
    // Stated explicitly rather than left to language detection, which is a
    // guess on short pages. Defaults to English so the 27 existing posts are
    // unaffected.
    inLanguage: post.lang ?? 'en',
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

/**
 * The site itself, as a `WebSite` node.
 *
 * Two reasons it exists, both from the GEO audit:
 *
 * 1. `WebSite` was simply absent. It is the node that ties the domain to the
 *    publishing Organization, so AI answer engines resolving "who runs
 *    afrishieldai.com" had only the Organization to go on.
 * 2. `dateModified` had nowhere valid to live. It is a `CreativeWork`
 *    property - **`Organization` does not support it** - so asserting it on
 *    the Organization node would have emitted invalid markup to satisfy a
 *    scoring heuristic. `WebSite` is a CreativeWork, so it belongs here.
 *
 * The date is derived from the newest post rather than hardcoded, because a
 * hand-written date is wrong the day after it is written. Google treats a
 * stale or fabricated freshness signal worse than an absent one.
 *
 * No `potentialAction`/`SearchAction` here on purpose: the site has no search
 * endpoint, and declaring one that does not exist is a broken promise to a
 * crawler. Add it the day /search ships, not before.
 */
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': abs('/#website'),
  name: SITE.name,
  url: SITE_URL,
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
  dateModified: POSTS.reduce(
    (latest, post) => {
      const touched = post.modified ?? post.published;
      return touched > latest ? touched : latest;
    },
    POSTS[0]?.modified ?? POSTS[0]?.published ?? '',
  ),
};

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
