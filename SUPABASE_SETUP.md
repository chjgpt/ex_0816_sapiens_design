# Supabase 연결 방법

## 1. 데이터 테이블 만들기

Supabase 프로젝트의 **SQL Editor**에서 `supabase-setup.sql` 전체를 한 번 실행합니다.

## 2. 익명 로그인 켜기

Supabase Dashboard에서 **Authentication → Sign In / Providers → Anonymous Sign-Ins**를 활성화합니다.

## 3. Vercel 환경변수 입력하기

Vercel 프로젝트의 **Settings → Environment Variables**에 다음 값을 등록합니다.

| 이름 | 값 |
|---|---|
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_ANON_KEY` | Supabase anon key 또는 publishable key |

Production, Preview, Development 환경에 모두 적용한 뒤 Vercel에서 다시 배포합니다.

실제 값은 `.env` 파일이나 GitHub에 커밋하지 않습니다. 브라우저는 `/api/supabase-config`를 통해 공개용 연결 정보를 전달받습니다. 일기 데이터는 `supabase-setup.sql`의 RLS 정책에 의해 본인 기록만 접근할 수 있습니다.
