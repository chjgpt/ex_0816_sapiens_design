-- MVP1~MVP3 공통 실험 이벤트 테이블
-- Supabase Dashboard > SQL Editor에서 한 번 실행하세요.

create table if not exists public.mvp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id text not null,
  mvp_version text not null,
  event_name text not null,
  quote_id text,
  quote_category text,
  rating smallint check (rating between 1 and 5),
  feedback varchar(300),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.mvp_events enable row level security;

-- 익명 로그인을 포함한 authenticated 사용자는 자기 user_id로만 이벤트를 추가할 수 있습니다.
drop policy if exists "users can create own mvp events" on public.mvp_events;
create policy "users can create own mvp events"
on public.mvp_events for insert
to authenticated
with check ((select auth.uid()) = user_id);

-- 브라우저에서는 실험 원본을 조회·수정·삭제하지 못하도록 관련 정책을 만들지 않습니다.
create index if not exists mvp_events_created_at_idx
on public.mvp_events (created_at desc);

create index if not exists mvp_events_session_id_idx
on public.mvp_events (session_id);

create index if not exists mvp_events_version_event_idx
on public.mvp_events (mvp_version, event_name);

create index if not exists mvp_events_quote_id_idx
on public.mvp_events (quote_id);
