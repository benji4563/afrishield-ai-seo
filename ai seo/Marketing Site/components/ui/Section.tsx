import { cn } from '@/lib/utils';

type SurfaceProps = {
  id?: string;
  tone: 'dark' | 'light';
  className?: string;
  children: React.ReactNode;
};

/**
 * The alternating dark/light beat measured off AgentFlow. Padding lives here
 * and nowhere else, so no nested rule can silently double it.
 */
export function Section({ id, tone, className, children }: SurfaceProps) {
  return (
    <section
      id={id}
      className={cn('section', tone === 'dark' ? 'surface-dark' : 'surface-light', className)}
    >
      <div className="container-page">
        <div className="container-inner">{children}</div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  blurb,
  tone,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
  tone: 'dark' | 'light';
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'max-w-[760px]',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      <p className={tone === 'dark' ? 'eyebrow-dark' : 'eyebrow-light'}>{eyebrow}</p>
      <h2 className="h2 mt-5">{title}</h2>
      {blurb ? (
        <p className={cn('mt-5 text-lead', tone === 'dark' ? 'body-dim' : 'body-dim-light')}>
          {blurb}
        </p>
      ) : null}
    </div>
  );
}
