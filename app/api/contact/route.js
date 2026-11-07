import { NextResponse } from 'next/server';
import { db } from '../../../lib/supabase';
import { sameOrigin } from '../../../lib/auth';
export const dynamic = 'force-dynamic';
const J = (o, s = 200) => NextResponse.json(o, { status: s });
export async function POST(req) {
  if (!sameOrigin(req)) return J({ error: 'origin' }, 403);
  const b = await req.json().catch(() => ({}));
  if (b.website) return J({ ok: true }); // honeypot
  const name = String(b.name || '').trim().slice(0, 100), email = String(b.email || '').trim().slice(0, 200), message = String(b.message || '').trim().slice(0, 3000);
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 5) return J({ error: 'invalid' }, 400);
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim(); const sb = db();
  const { count } = await sb.from('messages').select('*', { count: 'exact', head: true }).eq('ip', ip).gte('at', new Date(Date.now() - 3600e3).toISOString());
  if (count >= 5) return J({ error: 'rate' }, 429);
  const { error } = await sb.from('messages').insert({ name, email, message, ip });
  return error ? J({ error: 'server' }, 500) : J({ ok: true });
}
