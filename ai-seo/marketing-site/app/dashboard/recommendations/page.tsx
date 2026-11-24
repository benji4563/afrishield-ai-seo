import { setRecommendationStatus } from '@/app/dashboard/actions';
import { Shell } from '@/components/dashboard/Shell';
import { Notice, Section, SourceBar } from '@/components/dashboard/ui';
import { CATEGORIES, generateInsights } from '@/lib/dashboard/insights';
import { getGsc } from '@/lib/dashboard/gsc';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { STATUSES, STATUS_LABEL, readStatuses } from '@/lib/dashboard/store';

const PRIORITY_STYLE = { High: 'bg-red-100 text-red-800', Medium: 'bg-amber-100 text-amber-900', Low: 'bg-green-100 text-green-900' } as const;

export default async function Recommendations({ searchParams }: PageProps) {
  const { period, ga4, crm, ga4Result, crmResult } = await loadDashboard(searchParams);
  const gscResult = await getGsc(period.start, period.end, period.prevStart, period.prevEnd);
  const { recommendations, notEnoughData } = generateInsights(period, crm, ga4, gscResult.status === 'ok' ? gscResult.data : null);
  const store = await readStatuses();

  return (
    <Shell
      title="AI recommendations"
      intro="What to do next to win more qualified leads and revenue, generated from the numbers on this dashboard. Nothing is executed automatically: you review and set the status."
      period={period}
    >
      <SourceBar sources={[['GA4', ga4Result], ['HubSpot', crmResult], ['Search Console', gscResult]]} />
      <Notice>
        Each recommendation comes from a fixed rule with a minimum sample size, applied to real GA4 and HubSpot data. No statistic is estimated or invented,
        and no external AI service receives your data. When a rule lacks data it says so below instead of guessing.
        {!store.ok && ` Status changes are disabled: ${store.reason}`}
      </Notice>

      {CATEGORIES.map((category) => {
        const items = recommendations.filter((r) => r.category === category);
        const thin = notEnoughData.filter((n) => n.category === category);
        return (
          <Section key={category} title={category} note={items.length ? `${items.length} recommendation${items.length === 1 ? '' : 's'}` : undefined}>
            {items.length === 0 && (
              <p className="text-small text-slate">
                No recommendation for this period.{' '}
                {thin.length ? `More data is required: ${thin.map((t) => t.note).join(' ')}` : 'The rules found nothing that needs attention.'}
              </p>
            )}
            <div className="space-y-4">
              {items.map((rec) => {
                const status = store.statuses[rec.id] ?? 'new';
                return (
                  <article key={rec.id} className="rounded-card border border-ink/10 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-display text-base font-semibold">{rec.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`rounded px-2 py-0.5 text-[12px] font-medium ${PRIORITY_STYLE[rec.priority]}`}>{rec.priority} priority</span>
                        <span className="text-[12px] text-mute">Generated {rec.generatedAt}</span>
                      </div>
                    </div>
                    <dl className="mt-3 grid gap-3 text-small md:grid-cols-2">
                      <div>
                        <dt className="font-medium text-slate">Observation</dt>
                        <dd>{rec.observation}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-slate">Business implication</dt>
                        <dd>{rec.implication}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-slate">Supporting data</dt>
                        <dd>
                          <ul className="list-disc pl-4">
                            {rec.evidence.map((e) => (
                              <li key={e}>{e}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-slate">Recommended action</dt>
                        <dd>{rec.action}</dd>
                        <dt className="mt-2 font-medium text-slate">Expected measurement</dt>
                        <dd>{rec.measurement}</dd>
                      </div>
                    </dl>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-3">
                      <p className="text-[12px] text-mute">Why this was generated: {rec.why}</p>
                      <form action={setRecommendationStatus} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={rec.id} />
                        <label className="text-[12px] text-slate" htmlFor={`status-${rec.id}`}>
                          Status
                        </label>
                        <select id={`status-${rec.id}`} name="status" defaultValue={status} disabled={!store.ok} className="border border-ink/20 bg-white px-2 py-1 text-small">
                          {STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {STATUS_LABEL[st]}
                            </option>
                          ))}
                        </select>
                        <button disabled={!store.ok} className="bg-ink px-3 py-1 text-small text-white disabled:opacity-40">
                          Save
                        </button>
                      </form>
                    </div>
                  </article>
                );
              })}
            </div>
          </Section>
        );
      })}
    </Shell>
  );
}
