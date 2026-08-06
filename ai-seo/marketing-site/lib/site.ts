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
   * Inbound AI call line. Empty until the number is provisioned — set
   * NEXT_PUBLIC_PHONE (e.g. "+237 6XX XXX XXX") and every phone UI element
   * switches on. Never fill this with a number we do not own.
   */
  phone: process.env.NEXT_PUBLIC_PHONE ?? '',
  /** tel: href derived from `phone`, with display formatting stripped. */
  phoneHref: `tel:${(process.env.NEXT_PUBLIC_PHONE ?? '').replace(/[^+\d]/g, '')}`,
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
      { label: 'AfriShield Cyber Security', href: 'https://afrishield.com' },
    ],
  },
] as const;
