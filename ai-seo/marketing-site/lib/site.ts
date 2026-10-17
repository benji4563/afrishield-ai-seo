export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://afrishieldai.com';

export const SITE = {
  name: 'AfriShield AI',
  legalName: 'AfriShield',
  domain: 'afrishieldai.com',
  url: SITE_URL,
  email: 'benji@afrishieldai.com',
  /** WhatsApp click-to-chat link (Cameroon +237) — same line as `phone`. */
  whatsapp: 'https://wa.me/237688099752',
  /**
   * **The business phone number, and the one that must match everywhere.**
   * This is the number on the Google Business Profile, in `local-seo/
   * business.json`, in the JSON-LD `telephone`, and on every directory
   * listing. Google cross-checks all of those against each other, and a
   * mismatch is the most common reason a new local profile stays flat.
   *
   * It is a Cameroon number on purpose, changed 2026-10-13: the profile is
   * anchored on Douala, and a US number on a Cameroon business is both a
   * verification mismatch and a trust problem for a local buyer. It is also
   * the WhatsApp line, so a prospect can call or message the same number.
   *
   * **Do not point this at the US AI line again** without also changing the
   * Google profile, `business.json` and the directory listings in step.
   */
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+237 688 099 752',
  /** tel: href derived from `phone`, with display formatting stripped. */
  phoneHref: `tel:${(process.env.NEXT_PUBLIC_PHONE ?? '+237 688 099 752').replace(/[^+\d]/g, '')}`,
  /**
   * Inbound AI call line (Vapi + Twilio) — the US number that "Elodie"
   * answers 24/7. Kept as a **separate, secondary** number rather than the
   * site's main one, because only this line is AI-answered: any copy that
   * says "answered 24/7 by our AI" must reference `aiCallLine`, never
   * `phone`, or the site claims something untrue about the WhatsApp number.
   */
  aiCallLine: process.env.NEXT_PUBLIC_AI_CALL_LINE ?? '+1 (559) 543-5844',
  aiCallLineHref: `tel:${(process.env.NEXT_PUBLIC_AI_CALL_LINE ?? '+1 (559) 543-5844').replace(/[^+\d]/g, '')}`,
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
    // Crunchbase, created and confirmed live 2026-10-17: name, description,
    // Douala/Littoral/CM, headcount and the four industries all render as
    // submitted, and the founder resolves to its own linked Person entity at
    // /person/benjamin-njock. Second Knowledge Graph pillar after LinkedIn.
    'https://www.crunchbase.com/organization/afrishield-ai',
    // Facebook Page, confirmed by the account owner 2026-10-17 as the company
    // Page and not a personal profile - which is the distinction that decides
    // whether a URL belongs on this Organization or on the founder's Person
    // schema. The `profile.php?id=` form is deliberate: it is stable, whereas
    // the /people/<name>/<id>/ URL Facebook redirects to embeds the display
    // name and breaks on rename. Replace with https://www.facebook.com/<name>
    // once a Page username is set.
    'https://www.facebook.com/profile.php?id=61593013063982',
  ] as string[],
  /** Public-facing one-liner. Company brand guidelines, verbatim. */
  tagline: 'Search visibility, run by agents. Reported in plain numbers.',
  /**
   * **One description, used by both the meta tag and the Organization node.**
   *
   * These were two different strings: a 249-character entity description in
   * schema and a 156-character sales line in the homepage meta tag. The GEO
   * audit read that as a brand-consistency failure, and it was right - the two
   * described the same entity differently, and the meta version named neither
   * the company nor the continent.
   *
   * This one is 157 characters, so it survives a SERP snippet intact, and it
   * leads with the brand name, which is the same reason the homepage title and
   * H1 do. Keep it under 160 and keep "AfriShield AI" first.
   */
  description:
    'AfriShield AI runs search visibility for African businesses — keyword research, content, technical SEO, and AI-answer visibility. Month to month, no lock-in.',
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
