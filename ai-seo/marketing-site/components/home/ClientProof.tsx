import Link from 'next/link';

/**
 * Named clients, kept apart from research and from reviews. Only the four
 * engagements cleared to be named on /case-studies (2026-10-26) appear, and no
 * result figures: none has been cleared by its client yet. When one is, it goes
 * into app/case-studies/page.tsx first, then here.
 */
const CLIENTS = [
  'Jackson Eye Clinic',
  'Niss Optique Médical',
  'Tataachi Network',
  'NJ’s Accounting & Tax Services',
];

export function ClientProof() {
  return (
    <div className="border-y border-ink/10 bg-white py-9 text-ink">
      <div className="container-page">
        <div className="container-inner flex flex-col items-center gap-5 text-center">
          <p className="font-mono text-label uppercase text-ink/45">Client work you can check</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {CLIENTS.map((client) => (
              <li key={client} className="font-display text-[15px] font-semibold text-ink/70">
                {client}
              </li>
            ))}
          </ul>
          <Link
            href="/case-studies"
            className="py-2 font-mono text-label uppercase text-green-600 underline-offset-4 hover:underline"
            data-cta-location="proof_section"
            data-cta-target="case_studies"
          >
            See what we built for each →
          </Link>
        </div>
      </div>
    </div>
  );
}
