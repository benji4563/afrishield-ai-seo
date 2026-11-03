const SECTORS = [
  'Accounting & tax',
  'Legal practices',
  'Fintech',
  'Logistics',
  'Health clinics',
  'Professional services',
];

export function TrustStrip() {
  return (
    <div className="border-y border-ink/10 bg-white py-9 text-ink">
      <div className="container-page">
        <div className="container-inner">
          <p className="text-center font-mono text-label uppercase text-ink/45">
            Built for service businesses that get found or get forgotten
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {SECTORS.map((sector) => (
              <li key={sector} className="font-display text-[15px] font-semibold text-ink/60">
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
