import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { db } from './supabase';
import { log } from './content';
const key = () => new TextEncoder().encode(process.env.SESSION_SECRET || '');
export async function session() {
  const t = cookies().get('sid')?.value; if (!t) return null;
  try { return (await jwtVerify(t, key())).payload; } catch { return null; }
}
export const sameOrigin = (req) => { const o = req.headers.get('origin'); try { return !!o && new URL(o).host === req.headers.get('host'); } catch { return false; } };
async function issue(u, mc) {
  const t = await new SignJWT({ u, mc }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('8h').sign(key());
  cookies().set('sid', t, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 28800 });
}
export const logout = () => cookies().delete('sid');
export async function login(username, password, ip) {
  if ((process.env.SESSION_SECRET || '').length < 32) return { error: 'Server is not configured (SESSION_SECRET).' };
  const s = db();
  const since = new Date(Date.now() - 15 * 60e3).toISOString();
  const { count } = await s.from('login_attempts').select('*', { count: 'exact', head: true }).eq('ip', ip).gte('at', since);
  if (count >= 5) return { error: 'Too many attempts. Try again in 15 minutes.' };
  await s.from('login_attempts').insert({ ip });
  let { data: a } = await s.from('admins').select('*').maybeSingle();
  if (!a && process.env.ADMIN_INITIAL_PASSWORD) { // first run: store only a hash of the env password
    a = { username: process.env.ADMIN_USERNAME || 'zakaria', pw_hash: await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD, 12), must_change: true };
    await s.from('admins').insert(a);
  }
  if (!a || username !== a.username || !(await bcrypt.compare(password, a.pw_hash))) return { error: 'Invalid credentials.' };
  await s.from('login_attempts').delete().eq('ip', ip);
  await issue(a.username, a.must_change); await log(a.username, 'login');
  return { ok: true, mustChange: a.must_change };
}
export async function changePassword(sess, current, next) {
  const s = db(); const { data: a } = await s.from('admins').select('*').maybeSingle();
  if (!a || !(await bcrypt.compare(current, a.pw_hash))) return { error: 'Current password is incorrect.' };
  if (next.length < 12 || !/[a-z]/.test(next) || !/[A-Z]/.test(next) || !/\d/.test(next)) return { error: 'Use 12+ characters with upper-case, lower-case and a digit.' };
  if (next === current || next === process.env.ADMIN_INITIAL_PASSWORD) return { error: 'Choose a new password.' };
  await s.from('admins').update({ pw_hash: await bcrypt.hash(next, 12), must_change: false }).eq('id', a.id);
  await issue(a.username, false); await log(a.username, 'password changed');
  return { ok: true };
}
