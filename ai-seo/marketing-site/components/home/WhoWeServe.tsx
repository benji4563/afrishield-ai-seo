import { Section, SectionHeader } from '@/components/ui/Section';

const SEGMENTS = [
  {
    img: '/images/serve-small.jpg',
    alt: 'A young African shop owner at his kiosk stocked with goods.',
    label: 'Small business',
    body: 'The shop, the salon, the one-person practice. Found by the neighbourhood already looking for them.',
  },
  {
    img: '/images/serve-mid.jpg',
    alt: 'An African businesswoman working on a laptop in an office.',
    label: 'Growing & mid-market',
    body: 'Several services, more than one city, and competitors who already invest in being found.',
  },
  {
    img: '/images/serve-corporate.jpg',
    alt: 'An African corporate team reviewing charts and documents in a meeting.',
    label: 'Corporate & professional',
    body: 'Firms where trust drives the sale — insurers, accountants, lawyers, consultancies.',
  },
];

export function WhoWeServe() {
  return (
    <Section tone="dark">
      <SectionHeader
        eyebrow="Who we serve"
        tone="dark"
        title="Built for African businesses, at every size"
        blurb="From a single kiosk to a firm across several markets — the same three loops, priced so the smallest business can start."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {SEGMENTS.map((segment) => (
          <article key={segment.label} className="overflow-hidden border border-white/10 bg-white/[0.02]">
            <div className="aspect-[1200/720] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={segment.img}
                alt={segment.alt}
                width={1200}
                height={720}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-[17px] font-semibold text-white">{segment.label}</h3>
              <p className="mt-3 text-small body-dim">{segment.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
