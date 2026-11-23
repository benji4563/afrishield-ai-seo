import { logout, refreshData } from '@/app/dashboard/actions';
import type { Period } from '@/lib/dashboard/period';
import { NavLinks } from './NavLinks';
import { PeriodPicker } from './PeriodPicker';

export function Shell({
  title,
  intro,
  period,
  children,
}: {
  title: string;
  intro?: string;
  period?: Period;
  children: React.ReactNode;
}) {
  return (
    <div className="lg:flex">
      <aside className="border-b border-ink/10 bg-ink text-bone lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0 lg:border-b-0">
        <div className="flex items-center justify-between px-4 py-4 lg:block lg:px-5 lg:py-6">
          <div>
            <p className="font-mono text-label uppercase text-green-300">AfriShield AI</p>
            <p className="mt-1 font-display text-lg font-semibold">Dashboard</p>
          </div>
          <form action={logout} className="lg:hidden">
            <button className="text-small text-bone/70 underline">Sign out</button>
          </form>
        </div>
        <NavLinks query={period ? periodQueryString(period) : ''} />
        <form action={logout} className="hidden px-5 pt-6 lg:block">
          <button className="text-small text-bone/60 underline hover:text-bone">Sign out</button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-8">
        <header className="flex flex-col gap-4 border-b border-ink/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h1>
            {intro && <p className="mt-1 max-w-2xl text-small text-slate">{intro}</p>}
          </div>
          {period && (
            <div className="flex flex-wrap items-center gap-2">
              <PeriodPicker period={period} />
              <form action={refreshData}>
                <button
                  className="border border-ink/20 bg-white px-3 py-2 text-small hover:border-green-500"
                  title="Fetch fresh data from GA4 and HubSpot now (otherwise every 15 minutes)"
                >
                  Refresh data
                </button>
              </form>
            </div>
          )}
        </header>
        <div className="mt-6 space-y-6">{children}</div>
      </main>
    </div>
  );
}

function periodQueryString(period: Period): string {
  const params = new URLSearchParams({ range: period.key });
  if (period.key === 'custom') {
    params.set('from', period.start);
    params.set('to', period.end);
  }
  return `?${params}`;
}
