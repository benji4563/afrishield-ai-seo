'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  ['/dashboard', 'Overview'],
  ['/dashboard/acquisition', 'Acquisition'],
  ['/dashboard/website', 'Website performance'],
  ['/dashboard/funnel', 'Conversion funnel'],
  ['/dashboard/leads', 'Leads'],
  ['/dashboard/pipeline', 'Sales pipeline'],
  ['/dashboard/revenue', 'Revenue'],
  ['/dashboard/campaigns', 'Campaigns'],
  ['/dashboard/recommendations', 'AI recommendations'],
  ['/dashboard/settings', 'Settings'],
] as const;

export function NavLinks({ query }: { query: string }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-3 lg:pb-0">
      {LINKS.map(([href, label]) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href === '/dashboard/settings' ? href : `${href}${query}`}
            aria-current={active ? 'page' : undefined}
            className={`block shrink-0 whitespace-nowrap rounded-card px-3 py-2 text-small transition ${
              active ? 'bg-green-600 text-white' : 'text-bone/75 hover:bg-white/10 hover:text-bone'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
