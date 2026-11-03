/**
 * Client reviews quoted on the site. Every entry is copied from the public
 * review it links to, read on 2026-11-03 — never paraphrased, never improved.
 *
 * Rules for adding one:
 * - Quote the review as published. A French review is quoted in Google's own
 *   English translation and labelled as such, so nobody mistakes it for ours.
 * - Name the reviewer as the platform displays them (case aside), and link the
 *   platform so a visitor can check the original in one click.
 * - A review that is not about AfriShield's work does not go here. Jackson
 *   Fon's 4-star Google review describes his clinic, not our service, so it
 *   is left out even though it counts toward the 4.5 average.
 * - Any relationship between the reviewer and AfriShield is disclosed on the
 *   card itself (`disclosure`), not in a footnote.
 *
 * No Review or AggregateRating JSON-LD is emitted from these. Google ignores
 * review markup a business publishes about itself, and marking it up anyway is
 * a structured-data policy violation, not a free star rating.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  rating: number;
  platform: 'Google' | 'Clutch';
  url: string;
  date: string;
  translated?: boolean;
  disclosure?: string;
};

export const GOOGLE_PROFILE_URL = 'https://www.google.com/maps?cid=10050195790891044224';
export const CLUTCH_PROFILE_URL = 'https://clutch.co/profile/afrishield-ai';

/** Platform totals as displayed on 2026-11-03. Update the date with the numbers. */
export const REVIEW_TOTALS = {
  asOf: '3 November 2026',
  google: { rating: 4.5, count: 4 },
  clutch: { rating: 4.5, count: 1 },
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'A good experience with AfriShield AI. A serious, attentive team with great ideas. I’ve noticed improved online visibility for my business and more people discovering our services. There are a few areas for improvement in terms of follow-up, but overall I’m satisfied.',
    name: 'Martin Desire Mbang',
    rating: 4,
    platform: 'Google',
    url: GOOGLE_PROFILE_URL,
    date: 'October 2026',
    translated: true,
  },
  {
    quote:
      'I highly recommend Afrishield AI to anyone looking for reliable, professional, and high-quality services. They truly exceeded my expectations, and I wouldn’t hesitate to use their services again.',
    name: 'Eyang Romeo',
    rating: 5,
    platform: 'Google',
    url: GOOGLE_PROFILE_URL,
    date: 'October 2026',
  },
  {
    quote: 'Impeccable service, I highly recommend it.',
    name: 'Flawless For You Spa',
    rating: 5,
    platform: 'Google',
    url: GOOGLE_PROFILE_URL,
    date: 'October 2026',
    translated: true,
  },
  {
    quote: 'AfriShield AI’s communication is excellent and spot-on.',
    name: 'Benjamin Njock',
    role: 'CEO & Founder, Tataachi Network',
    rating: 4.5,
    platform: 'Clutch',
    url: CLUTCH_PROFILE_URL,
    date: '29 October 2026',
    disclosure:
      'Tataachi Network and AfriShield AI share a founder. Clutch verified the review; weigh it with that in mind.',
  },
];
