/**
 * Recommendation statuses, stored in Supabase table dashboard_recommendations
 * (supabase/migrations/20261123120000_dashboard_recommendations.sql) with the
 * service-role key. Optional: without SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY every recommendation shows as New and the status
 * control is disabled.
 */

export const STATUSES = ['new', 'under_review', 'approved', 'in_progress', 'completed', 'rejected'] as const;
export type RecStatus = (typeof STATUSES)[number];
export const STATUS_LABEL: Record<RecStatus, string> = {
  new: 'New',
  under_review: 'Under review',
  approved: 'Approved',
  in_progress: 'In progress',
  completed: 'Completed',
  rejected: 'Rejected',
};

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' };
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`;
  return { base: `${url.replace(/\/$/, '')}/rest/v1/dashboard_recommendations`, headers };
}

export function storeConfigured(): boolean {
  return config() !== null;
}

export async function readStatuses(): Promise<{ ok: boolean; statuses: Record<string, RecStatus>; reason?: string }> {
  const c = config();
  if (!c) return { ok: false, statuses: {}, reason: 'Supabase is not configured on the server.' };
  try {
    const response = await fetch(`${c.base}?select=id,status`, { headers: c.headers, cache: 'no-store' });
    if (!response.ok) return { ok: false, statuses: {}, reason: `Supabase ${response.status}` };
    const rows = (await response.json()) as { id: string; status: RecStatus }[];
    return { ok: true, statuses: Object.fromEntries(rows.map((r) => [r.id, r.status])) };
  } catch (error) {
    return { ok: false, statuses: {}, reason: error instanceof Error ? error.message : 'Supabase request failed' };
  }
}

export async function writeStatus(id: string, status: RecStatus): Promise<boolean> {
  const c = config();
  if (!c || !STATUSES.includes(status) || !/^[a-z0-9:_-]{1,120}$/.test(id)) return false;
  const response = await fetch(`${c.base}?on_conflict=id`, {
    method: 'POST',
    headers: { ...c.headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ id, status, updated_at: new Date().toISOString() }),
    cache: 'no-store',
  });
  return response.ok;
}
