-- Project reads are public only when published; authenticated admins can manage
-- every project, including drafts.
alter table public.projects enable row level security;

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects"
on public.projects for select
using (is_published = true);

drop policy if exists "admin manage projects" on public.projects;
create policy "admin manage projects"
on public.projects for all to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);

-- The dashboard uploads the cover before inserting the project row, so storage
-- needs its own admin write policy.
drop policy if exists "admin manage project images" on storage.objects;
create policy "admin manage project images"
on storage.objects for all to authenticated
using (
  bucket_id = 'project-images'
  and exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
)
with check (
  bucket_id = 'project-images'
  and exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);
