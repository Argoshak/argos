import { createClient } from '@supabase/supabase-js';
// Server-only: never import from a client component.
export const db = () => createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
