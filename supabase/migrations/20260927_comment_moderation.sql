-- Run once in Supabase Dashboard > SQL Editor.
-- Existing comments remain visible; every new comment requires admin approval.

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'portfolio_comments'
      and column_name = 'is_approved'
  ) then
    alter table public.portfolio_comments
      add column is_approved boolean not null default false,
      add column approved_at timestamptz,
      add column approved_by uuid references auth.users(id) on delete set null;

    update public.portfolio_comments
    set is_approved = true,
        approved_at = coalesce(created_at, now());
  end if;
end $$;

alter table public.portfolio_comments enable row level security;

drop policy if exists "public read comments" on public.portfolio_comments;
drop policy if exists "public read approved comments" on public.portfolio_comments;
create policy "public read approved comments"
on public.portfolio_comments for select
to anon, authenticated
using (is_approved = true);

drop policy if exists "public insert comment" on public.portfolio_comments;
drop policy if exists "public submit comment for review" on public.portfolio_comments;
create policy "public submit comment for review"
on public.portfolio_comments for insert
to anon, authenticated
with check (is_approved = false and is_pinned = false);

drop policy if exists "admin manage comments" on public.portfolio_comments;
create policy "admin manage comments"
on public.portfolio_comments for all
to authenticated
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

notify pgrst, 'reload schema';
