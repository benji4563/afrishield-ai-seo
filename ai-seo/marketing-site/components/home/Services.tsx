import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/Section';
import { SITE } from '@/lib/site';

/**
 * Services by customer outcome. Every link goes to a page that already exists;
 * no service page or URL was added or renamed for this section.
 */
const VISIBILITY = [
  {
    name: 'AI search optimisation (GEO)',
    problem: 'ChatGPT, Gemini and Perplexity describe your market without naming you.',
    work: 'We give AI assistants clear, citable facts about your business: who you serve, where, at what price.',
    benefit: 'More chances to be the business an assistant recommends.',
    href: '/geo-services',
    target: 'geo_services',
  },
  {
    name: 'AI SEO for Google',
    problem: 'Your site does not appear for the phrases customers actually type.',
    work: 'A keyword map you approve, then pages written for those phrases and edited by a person.',
    benefit: 'Steady, measurable visibility for the services that pay.',
    href: '/solutions',
    target: 'solutions',
  },
  {
    name: 'Technical SEO and AI-crawler access',
    problem: 'Google or AI crawlers cannot reach, read or trust parts of your site.',
    work: 'Schema on every page, a sitemap that matches reality, crawler access checked and fixed.',
    benefit: 'Nothing technical stands between your pages and the people searching.',
    href: '/how-it-works',
    target: 'how_it_works',
  },
  {
    name: 'Content strategy',
    problem: 'Posts stopped months ago, or never answered what buyers ask.',
    work: 'A publishing schedule that answers real questions, including price and timing.',
    benefit: 'Pages that keep earning visits and enquiries after they publish.',
    href: '/blog',
    target: 'blog',
  },
  {
    name: 'Local SEO and Google Business Profile',
    problem: 'Customers nearby find directories and competitors before they find you.',
    work: 'Your Google profile, reviews, listings and city pages, consistent everywhere.',
    benefit: 'Found by the people already looking in your city.',
    href: '/ai-seo',
    target: 'local_seo',
  },
];

const EVA_WHATSAPP = `${SITE.whatsapp}?text=${encodeURIComponent(
  'Hi AfriShield — I found you on afrishieldai.com and I would like to know more about EVA, the WhatsApp assistant.',
)}`;

export function Services() {
  const linkClass =
    'mt-6 inline-flex py-2 font-mono text-label uppercase text-green-600 underline-offset-4 hover:underline';

  return (
    <Section tone="light" id="services">
      <SectionHeader
        eyebrow="Services"
        tone="light"
        title="Get found, get chosen, answer every enquiry"
        blurb="Visibility work for Google and AI search, and AI assistants that answer the customers it brings in."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {VISIBILITY.map((service) => (
          <article key={service.name} className="card-light flex flex-col">
            <h3 className="h3">{service.name}</h3>
            <dl className="mt-5 space-y-3 text-small">
              <div>
                <dt className="font-mono text-label uppercase text-ink/45">The problem</dt>
                <dd className="mt-1 body-dim-light">{service.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-label uppercase text-ink/45">What we do</dt>
                <dd className="mt-1 body-dim-light">{service.work}</dd>
              </div>
              <div>
                <dt className="font-mono text-label uppercase text-ink/45">What you get</dt>
                <dd className="mt-1 text-ink">{service.benefit}</dd>
              </div>
            </dl>
            <Link
              href={service.href}
              className={`${linkClass} mt-auto pt-6`}
              data-cta-location="services_section"
              data-cta-target={service.target}
            >
              Learn more →
            </Link>
          </article>
        ))}

        {/* AI business automation: EVA is live and sold to clients. It has no
            page yet, so it links to WhatsApp; the voice line is a real demo. */}
        <article className="card-light flex flex-col border-green-600/40 bg-white">
          <p className="font-mono text-label uppercase text-green-600">AI business automation</p>
          <h3 className="h3 mt-4">EVA and AI voice agents</h3>
          <p className="mt-4 text-small body-dim-light">
            <strong className="font-medium text-ink">EVA</strong> answers your customers on WhatsApp,
            day and night, and passes serious enquiries to your team.{' '}
            <strong className="font-medium text-ink">AI voice agents</strong> pick up your phone line
            the same way. Our own number is answered by one: call {SITE.aiCallLine} to hear it.
          </p>
          <div className="mt-auto flex flex-wrap gap-x-6 pt-6">
            <a
              href={EVA_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              data-cta-location="services_section"
            >
              Ask about EVA on WhatsApp →
            </a>
            <a
              href={SITE.aiCallLineHref}
              className={linkClass}
              data-cta-location="services_section"
              data-cta-target="voice_agent_demo"
            >
              Call the AI line →
            </a>
          </div>
        </article>
      </div>

      <p className="mt-10 text-small body-dim-light">
        Prices start at USD 150 a month, month to month.{' '}
        <Link
          href="/pricing"
          className="inline-block py-2 text-green-600 underline underline-offset-4"
          data-cta-location="services_section"
          data-cta-target="pricing"
        >
          See pricing
        </Link>
      </p>
    </Section>
  );
}
