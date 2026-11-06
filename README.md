# Zakaria Akheraaz — Portfolio + Admin

1. Create a free Supabase project. In SQL Editor, run `supabase/schema.sql`.
2. Copy `.env.example` to `.env.local` (locally) or add the same variables in Vercel > Settings > Environment Variables.
   `SESSION_SECRET`: 32+ random characters. `ADMIN_INITIAL_PASSWORD`: a strong one-time password. Never commit these.
3. `npm install && npm run dev`, then open `/admin`, sign in, and set a new password when asked.
4. Push to a new GitHub repo and import it in Vercel.
