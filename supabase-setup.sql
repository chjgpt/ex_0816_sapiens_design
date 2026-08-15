-- Supabase Dashboard > SQL Editor에서 한 번 실행하세요.
create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  mood text not null check (char_length(mood) between 1 and 30),
  content varchar(120),
  quote_text text not null,
  quote_author text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entry_date)
);

alter table public.journal_entries enable row level security;

create policy "users can read own journal"
on public.journal_entries for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "users can create own journal"
on public.journal_entries for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "users can update own journal"
on public.journal_entries for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "users can delete own journal"
on public.journal_entries for delete
to authenticated
using ((select auth.uid()) = user_id);

create index if not exists journal_entries_user_id_idx
on public.journal_entries (user_id);
