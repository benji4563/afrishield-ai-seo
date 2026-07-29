import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'accent' | 'accent-light' | 'ghost-dark' | 'ghost-light';

const VARIANTS: Record<Variant, string> = {
  // On dark surfaces the CTA is green.300 — the brightest stop that holds up
  // against ink. On light it is green.600, per the company Application rule.
  accent: 'bg-green-300 text-ink hover:bg-green-200',
  'accent-light': 'bg-green-600 text-white hover:bg-green-500',
  'ghost-dark': 'border border-white/25 text-white hover:border-white/60',
  'ghost-light': 'border border-ink/20 text-ink hover:border-ink/50',
};

type Props = {
  href: string;
  children: string;
  variant?: Variant;
  className?: string;
};

/**
 * AgentFlow's signature micro-interaction: the label exists twice in the DOM.
 * On hover the first copy slides up and out while the duplicate slides up into
 * its place. Measured button box: 40px tall, padding 9px 24px 7px, radius 0.
 */
export function Button({ href, children, variant = 'accent', className }: Props) {
  const external = href.startsWith('http');
  const inner = (
    <span className="relative block h-[1em] overflow-hidden">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );

  const classes = cn(
    'group inline-flex h-10 items-center justify-center px-6 font-mono text-label font-medium uppercase transition-colors duration-200',
    VARIANTS[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
