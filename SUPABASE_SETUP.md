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

## 4. Google 계정 연결 켜기

`나의 기록 → Google로 기록 지키기`를 사용하려면 Supabase Dashboard에서 다음을 설정합니다.

1. **Authentication → Sign In / Providers → Google**에서 Google provider를 활성화합니다.
2. **Authentication 설정에서 Manual Linking**을 활성화합니다.
3. **URL Configuration**의 Site URL에 실제 Vercel 배포 주소를 입력합니다.

Google provider를 설정하지 않아도 익명 사용자는 같은 브라우저에서 기록 확인과 삭제를 사용할 수 있습니다.
