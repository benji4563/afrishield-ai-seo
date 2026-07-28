export function PageHero({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <section className="surface-dark pb-[70px] pt-[140px]">
      <div className="container-page">
        <div className="container-inner">
          <p className="eyebrow-dark">{eyebrow}</p>
          <h1 className="h1 mt-6 max-w-[18ch]">{title}</h1>
          <p className="mt-7 max-w-[58ch] text-lead body-dim">{blurb}</p>
        </div>
      </div>
    </section>
  );
}
