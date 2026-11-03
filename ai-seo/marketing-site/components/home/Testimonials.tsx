import {
  CLUTCH_PROFILE_URL,
  GOOGLE_PROFILE_URL,
  REVIEW_TOTALS,
  TESTIMONIALS,
  type Testimonial,
} from '@/lib/testimonials';

/**
 * Real reviews, quoted from Google and Clutch — see lib/testimonials.ts for the
 * rules. A server component with no entry animation, so every quote is in the
 * server HTML that crawlers and AI assistants read.
 */

function Stars({ rating }: { rating: number }) {
  return (
    <p className="font-mono text-label uppercase text-green-300">
      <span aria-hidden="true">{'★'.repeat(Math.floor(rating))}{rating % 1 ? '½' : ''}</span>
      <span className="sr-only">{rating} out of 5</span>
    </p>
  );
}

function Card({ item }: { item: Testimonial }) {
  return (
    <figure className="card-dark flex flex-col">
      <Stars rating={item.rating} />
      <blockquote className="mt-4 flex-1 text-small text-white/85">“{item.quote}”</blockquote>
      <figcaption className="mt-6 border-t border-white/10 pt-4">
        <p className="text-small font-semibold text-white">{item.name}</p>
        {item.role ? <p className="text-small body-dim">{item.role}</p> : null}
        <p className="mt-2 font-mono text-label uppercase text-white/40">
          <a href={item.url} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
            {item.platform} review
          </a>{' '}
          · {item.date}
          {item.translated ? ' · Translated from French by Google' : ''}
        </p>
        {item.disclosure ? (
          <p className="mt-3 text-[13px] leading-snug text-white/55">{item.disclosure}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <div>
      <p className="font-mono text-label uppercase text-white/50">
        <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener" className="hover:underline">
          Google {REVIEW_TOTALS.google.rating}/5 from {REVIEW_TOTALS.google.count} reviews
        </a>{' '}
        ·{' '}
        <a href={CLUTCH_PROFILE_URL} target="_blank" rel="noopener" className="hover:underline">
          Clutch {REVIEW_TOTALS.clutch.rating}/5 from {REVIEW_TOTALS.clutch.count} verified review
        </a>{' '}
        · as of {REVIEW_TOTALS.asOf}
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {TESTIMONIALS.map((item) => (
          <Card key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
