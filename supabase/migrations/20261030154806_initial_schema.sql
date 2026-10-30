-- ConectaRR: esquema inicial aplicado ao projeto Supabase dedicado.
-- O piloto usa candidatura por link externo; não armazena currículos.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create table private.moderators (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

revoke all on table private.moderators from public, anon, authenticated;

create or replace function private.is_moderator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from private.moderators as m
    where m.user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_moderator() from public, anon;
grant execute on function private.is_moderator() to authenticated;

create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'Pessoa candidata'
    check (char_length(display_name) between 2 and 80),
  municipality text,
  bio text check (bio is null or char_length(bio) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  description text check (description is null or char_length(description) <= 3000),
  website_url text check (website_url is null or website_url ~* '^https://'),
  municipality text,
  state_code text not null default 'RR' check (state_code ~ '^[A-Z]{2}$'),
  review_status text not null default 'pending'
    check (review_status in ('pending', 'approved', 'rejected')),
  created_by uuid not null default auth.uid() references auth.users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function private.owns_company(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.companies as c
    where c.id = target_company_id
      and c.created_by = (select auth.uid())
  );
$$;

revoke all on function private.owns_company(uuid) from public, anon;
grant execute on function private.owns_company(uuid) to authenticated;

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete restrict,
  title text not null check (char_length(title) between 3 and 140),
  summary text not null check (char_length(summary) between 10 and 300),
  description text not null check (char_length(description) between 30 and 8000),
  area text not null check (char_length(area) between 2 and 80),
  employment_type text not null
    check (employment_type in ('CLT', 'Estágio', 'Aprendiz', 'Temporário', 'PJ', 'Freelance', 'Outro')),
  work_mode text not null check (work_mode in ('presencial', 'hibrido', 'remoto')),
  municipality text,
  state_code text check (state_code is null or state_code ~ '^[A-Z]{2}$'),
  salary_min numeric(12, 2) check (salary_min is null or salary_min >= 0),
  salary_max numeric(12, 2) check (salary_max is null or salary_max >= 0),
  salary_period text check (salary_period is null or salary_period in ('hora', 'mês', 'ano')),
  application_url text not null check (application_url ~* '^https://'),
  closes_at date,
  status text not null default 'draft'
    check (status in ('draft', 'pending', 'published', 'paused', 'closed', 'expired', 'rejected')),
  published_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint jobs_salary_range_check check (
    salary_min is null or salary_max is null or salary_min <= salary_max
  ),
  constraint jobs_location_check check (
    (
      work_mode = 'remoto'
      and (
        (municipality is null and state_code is null)
        or (municipality is not null and state_code is not null)
      )
    )
    or (
      work_mode <> 'remoto'
      and municipality is not null
      and state_code is not null
    )
  ),
  constraint jobs_published_timestamp_check check (
    status <> 'published' or published_at is not null
  )
);

create table public.saved_jobs (
  user_id uuid not null references auth.users (id) on delete cascade,
  job_id uuid not null references public.jobs (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, job_id)
);

create index companies_created_by_idx on public.companies (created_by);
create index companies_review_status_idx on public.companies (review_status);
create index jobs_company_status_idx on public.jobs (company_id, status);
create index jobs_public_listing_idx on public.jobs (state_code, municipality, closes_at)
  where status = 'published';
create index jobs_area_idx on public.jobs (area);
create index saved_jobs_job_id_idx on public.saved_jobs (job_id);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function private.set_updated_at();

create trigger companies_set_updated_at
before update on public.companies
for each row execute function private.set_updated_at();

create trigger jobs_set_updated_at
before update on public.jobs
for each row execute function private.set_updated_at();

create or replace function private.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), 'Pessoa candidata')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger auth_user_created_profile
after insert on auth.users
for each row execute function private.create_profile_for_new_user();

create or replace function private.guard_company_review_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is not null
    and not private.is_moderator()
    and (
      new.review_status is distinct from old.review_status
      or new.created_by is distinct from old.created_by
    ) then
    raise exception 'Company review fields can only be changed by a moderator';
  end if;
  return new;
end;
$$;

create trigger companies_guard_review_fields
before update on public.companies
for each row execute function private.guard_company_review_fields();

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.jobs enable row level security;
alter table public.saved_jobs enable row level security;
alter table private.moderators enable row level security;

grant select, insert, update on public.profiles to authenticated;

revoke all on public.companies from anon, authenticated;
grant select (id, name, description, website_url, municipality, state_code, review_status, created_at, updated_at)
  on public.companies to anon, authenticated;
grant insert (name, description, website_url, municipality, state_code)
  on public.companies to authenticated;
grant update (name, description, website_url, municipality, state_code, review_status)
  on public.companies to authenticated;

revoke all on public.jobs from anon, authenticated;
grant select (
  id, company_id, title, summary, description, area, employment_type, work_mode,
  municipality, state_code, salary_min, salary_max, salary_period, application_url,
  closes_at, status, published_at, created_at, updated_at
) on public.jobs to anon, authenticated;
grant insert (
  company_id, title, summary, description, area, employment_type, work_mode,
  municipality, state_code, salary_min, salary_max, salary_period, application_url,
  closes_at, status
) on public.jobs to authenticated;
grant update (
  title, summary, description, area, employment_type, work_mode, municipality,
  state_code, salary_min, salary_max, salary_period, application_url, closes_at,
  status, published_at
) on public.jobs to authenticated;
grant select, insert, delete on public.saved_jobs to authenticated;

create policy "Users can read their own profile"
on public.profiles for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own profile"
on public.profiles for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own profile"
on public.profiles for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Anyone can read approved companies"
on public.companies for select to anon, authenticated
using (review_status = 'approved');

create policy "Company owners can read their own company"
on public.companies for select to authenticated
using ((select private.owns_company(id)));

create policy "Moderators can read all companies"
on public.companies for select to authenticated
using ((select private.is_moderator()));

create policy "Users can submit a company for review"
on public.companies for insert to authenticated
with check (
  review_status = 'pending'
);

create policy "Company owners can edit their company profile"
on public.companies for update to authenticated
using ((select private.owns_company(id)))
with check ((select private.owns_company(id)));

create policy "Moderators can review companies"
on public.companies for update to authenticated
using ((select private.is_moderator()))
with check ((select private.is_moderator()));

create policy "Anyone can read published opportunities"
on public.jobs for select to anon, authenticated
using (
  status = 'published'
  and (closes_at is null or closes_at >= current_date)
  and exists (
    select 1
    from public.companies as c
    where c.id = company_id
      and c.review_status = 'approved'
  )
);

create policy "Company owners can read their opportunities"
on public.jobs for select to authenticated
using ((select private.owns_company(company_id)));

create policy "Moderators can read all opportunities"
on public.jobs for select to authenticated
using ((select private.is_moderator()));

create policy "Company owners can submit draft opportunities"
on public.jobs for insert to authenticated
with check (
  status in ('draft', 'pending')
  and (select private.owns_company(company_id))
  and exists (
    select 1 from public.companies as c
    where c.id = company_id and c.review_status = 'approved'
  )
);

create policy "Company owners can edit unpublished opportunities"
on public.jobs for update to authenticated
using ((select private.owns_company(company_id)))
with check (
  status in ('draft', 'pending', 'paused', 'closed')
  and (select private.owns_company(company_id))
);

create policy "Moderators can review opportunities"
on public.jobs for update to authenticated
using ((select private.is_moderator()))
with check ((select private.is_moderator()));

create policy "Users can read their saved opportunities"
on public.saved_jobs for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can save published opportunities"
on public.saved_jobs for insert to authenticated
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1
    from public.jobs as j
    where j.id = job_id
      and j.status = 'published'
      and (j.closes_at is null or j.closes_at >= current_date)
  )
);

create policy "Users can remove their saved opportunities"
on public.saved_jobs for delete to authenticated
using ((select auth.uid()) = user_id);
