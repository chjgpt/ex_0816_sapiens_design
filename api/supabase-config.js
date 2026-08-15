module.exports = function handler(request, response) {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return response.status(503).json({ error: "Supabase 환경변수가 설정되지 않았습니다." });
  }

  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ url, anonKey });
};
