import { NextResponse } from 'next/server';
import { login, logout, session, sameOrigin, changePassword } from '../../../lib/auth';
export const dynamic = 'force-dynamic';
const J = (o, status = 200) => NextResponse.json(o, { status });
export async function POST(req) {
  if (!sameOrigin(req)) return J({ error: 'Bad origin' }, 403);
  const b = await req.json().catch(() => ({}));
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  try {
    if (b.action === 'login') return J(await login(String(b.username || ''), String(b.password || ''), ip));
    if (b.action === 'logout') { logout(); return J({ ok: true }); }
    if (b.action === 'password') { const s = await session(); if (!s) return J({ error: 'Unauthorized' }, 401); return J(await changePassword(s, String(b.current || ''), String(b.next || ''))); }
  } catch (e) { return J({ error: 'Server error. Check Supabase configuration.' }, 500); }
  return J({ error: 'Unknown action' }, 400);
}
