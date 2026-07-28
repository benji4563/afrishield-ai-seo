import { cn } from '@/lib/utils';

/**
 * BLUF (Bottom Line Up Front) answer block — GEO requirement from the skill.
 * A 40–70 word, entity-dense factual summary that AI answer engines can lift
 * as a citation. Server-rendered plain text, always in the raw HTML.
 */
export function Bluf({
  children,
  tone = 'dark',
  className,
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'border-l-4 p-6 md:p-7',
        dark ? 'border-green-300 bg-white/[0.03]' : 'border-green-600 bg-green-50',
        className,
      )}
    >
      <p className={cn('eyebrow', dark ? 'text-green-300' : 'text-green-600')}>In short</p>
      <p className={cn('mt-3 text-lead', dark ? 'text-white/80' : 'text-green-800')}>{children}</p>
    </div>
  );
}
