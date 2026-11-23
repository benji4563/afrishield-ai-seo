-- Internal /dashboard: the owner's status on each recommendation the
-- dashboard generates (new, under review, approved, in progress, completed,
-- rejected). One row per recommendation rule id. No personal data.
--
-- Only the site's server code writes here, with the service-role key. RLS is
-- on with no policies, so anon and authenticated keys can read or write
-- nothing; the grants below exist because Supabase no longer auto-grants Data
-- API access on new public tables (see the root CLAUDE.md), and RLS stays the
-- security boundary.

create table if not exists public.dashboard_recommendations (
  id text primary key,
  status text not null default 'new'
    check (status in ('new', 'under_review', 'approved', 'in_progress', 'completed', 'rejected')),
  note text,
  updated_at timestamptz not null default now()
);

comment on table public.dashboard_recommendations is
  'afrishieldai.com /dashboard: owner status per recommendation rule. Server-only (service role).';

alter table public.dashboard_recommendations enable row level security;

grant select on public.dashboard_recommendations to anon;
grant select, insert, update, delete on public.dashboard_recommendations to authenticated, service_role;
