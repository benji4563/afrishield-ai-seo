export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://afrishieldai.com';

export const SITE = {
  name: 'AfriShield AI',
  legalName: 'AfriShield',
  domain: 'afrishieldai.com',
  url: SITE_URL,
  email: 'benji@afrishieldai.com',
  /** WhatsApp click-to-chat link (Cameroon +237). */
  whatsapp: 'https://wa.me/237688099752',
  /**
   * Inbound AI call line (Vapi + Twilio). NEXT_PUBLIC_PHONE overrides the
   * display value if the number ever changes; phoneHref is derived with the
   * formatting stripped.
   */
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+1 (559) 543-5844',
  /** tel: href derived from `phone`, with display formatting stripped. */
  phoneHref: `tel:${(process.env.NEXT_PUBLIC_PHONE ?? '+1 (559) 543-5844').replace(/[^+\d]/g, '')}`,
  /**
   * On-page voice assistant (Vapi web calls — the same "Elodie" assistant that
   * answers the phone line). The public key is designed for browser exposure;
   * the private key must NEVER appear here. Env-overridable per client.
   */
  voice: {
    assistantId:
      process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID ?? '5456b332-d9ba-4928-a978-0a4f3c407a24',
    publicKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? '00c9535c-aa2a-45b6-bacb-69174343d0a4',
  },
  /**
   * Google Business Profile "write a review" link, surfaced on /review as the
   * primary call to action. Empty until the GBP is claimed and verified — the
   * page detects that and leads with the on-site form instead, so the link is
   * safe to share before the profile exists.
   *
   * Set NEXT_PUBLIC_GOOGLE_REVIEW_URL to the short link GBP hands you
   * (`https://g.page/r/<id>/review`) or the Place ID form
   * (`https://search.google.com/local/writereview?placeid=<PLACE_ID>`).
   *
   * Why the Google link outranks the on-site form: Google ignores Review and
   * AggregateRating markup a site publishes about itself, so on-site reviews
   * never produce stars in search results. GBP reviews do, and they feed Maps
   * and the AI answer engines as well.
   */
  googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? '',
  /**
   * Official profiles for this organisation, emitted as schema.org `sameAs`.
   *
   * This is entity disambiguation, not decoration. Without it Google has
   * nothing tying the string "AfriShield AI" to this company, which is why a
   * brand search surfaced Afri-Shield on VC4A and the US defence firm Shield AI
   * instead of this site. The geo-optimizer audit of 2026-10-11 scored Social
   * Trust 0/5 and Knowledge Graph pillars 0 for exactly this reason.
   *
   * **Only verified, organisation-owned profiles go here.** Never a guessed URL
   * and never a founder's personal account — a personal profile belongs on a
   * Person schema, not on the Organization's `sameAs`. Add Crunchbase, Wikidata
   * and the Google Business Profile as each one is created and confirmed.
   */
  profiles: [
    // Company page, confirmed 2026-10-11 against LinkedIn's own API, which
    // returned organisation id 146729948 as administered by this account.
    'https://www.linkedin.com/company/146729948',
  ] as string[],
  /** Public-facing one-liner. Company brand guidelines, verbatim. */
  tagline: 'Search visibility, run by agents. Reported in plain numbers.',
  description:
    'AfriShield AI runs search visibility for African businesses — keyword research, content, technical SEO, and AI-answer-engine visibility (ChatGPT, Claude, Perplexity, Google) handled by agents, edited by people, and reported in numbers you can check.',
} as const;

export const NAV_LINKS = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Story', href: '/about' },
  { label: 'Blog', href: '/blog' },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: 'Service',
    links: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Case study', href: '/case-studies' },
      { label: 'Free AI-visibility check', href: '/ai-visibility-check' },
    ],
  },
  {
    heading: 'Who we serve',
    links: [
      { label: 'Tourism & hospitality', href: '/for-tourism-hospitality' },
      { label: 'Safari operators', href: '/for-safari-operators' },
      { label: 'Lodges & hotels', href: '/for-lodges-hotels' },
      { label: 'GEO services', href: '/geo-services' },
    ],
  },
  {
    heading: 'Where we work',
    links: [
      { label: 'AI SEO in Lagos', href: '/ai-seo/lagos' },
      { label: 'AI SEO in Nairobi', href: '/ai-seo/nairobi' },
      { label: 'AI SEO in Accra', href: '/ai-seo/accra' },
      { label: 'AI SEO in Johannesburg', href: '/ai-seo/johannesburg' },
      { label: 'All six cities', href: '/ai-seo' },
    ],
  },
  {
    heading: 'Reading',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'What AI SEO actually does', href: '/blog/what-ai-seo-actually-does' },
      { label: 'What SEO actually costs', href: '/blog/what-seo-actually-costs' },
      { label: 'AI SEO vs traditional SEO', href: '/blog/ai-seo-vs-traditional-seo' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our story', href: '/about' },
      { label: 'Case study', href: '/case-studies' },
      { label: 'Contact', href: '/contact' },
    ],
  },
] as const;
