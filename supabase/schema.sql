-- ============================================================
-- Wavly · Phase 1 schema — Profiles
-- Run this in your Supabase project:
--   Supabase Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- 1. Profiles table (one row per user, linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  business_type text,
  struggle text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Enable Row-Level Security so users can only touch their own row
alter table public.profiles enable row level security;

-- 3. Policies
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 4. Auto-create a profile row whenever a new user signs up.
--    Pulls full_name from the signup metadata if provided.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
