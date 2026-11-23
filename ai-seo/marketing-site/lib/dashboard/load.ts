import { requireSession } from './auth';
import { getGa4 } from './ga4';
import { getCrm } from './hubspot';
import { resolvePeriod, type SearchParams } from './period';

/** Shared page loader: session check first, then both sources in parallel. */
export async function loadDashboard(searchParams: Promise<SearchParams>) {
  await requireSession();
  const params = await searchParams;
  const period = resolvePeriod(params);
  const [ga4, crm] = await Promise.all([getGa4(period.start, period.end, period.prevStart, period.prevEnd), getCrm()]);
  return {
    params,
    period,
    ga4Result: ga4,
    crmResult: crm,
    ga4: ga4.status === 'ok' ? ga4.data : null,
    crm: crm.status === 'ok' ? crm.data : null,
  };
}

export type PageProps = { searchParams: Promise<SearchParams> };
