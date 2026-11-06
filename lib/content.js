import { cookies } from 'next/headers';
import { db } from './supabase';
import { DEFAULTS, PROJECTS } from './defaults';
export const LANGS = ['en', 'ar', 'fr'];
export const ID = ['about', 'skills', 'projects', 'journey', 'systems', 'philosophy', 'contact'];
export const getLang = () => { const l = cookies().get('lang')?.value; return LANGS.includes(l) ? l : 'en'; };
export const tx = (o, l) => o?.[l] || o?.en || '';
export async function getSite() {
  const c = { ...DEFAULTS };
  try { const { data } = await db().from('site_content').select('key,value'); (data || []).forEach((r) => { c[r.key] = r.value; }); } catch {}
  return c;
}
export async function getProjects(all) {
  try { let q = db().from('projects').select('*').order('sort'); if (!all) q = q.eq('published', true); const { data } = await q; return data || []; } catch { return []; }
}
export const log = (actor, action, detail = '') => db().from('activity').insert({ actor, action, detail });
export async function snapshot(actor) {
  const s = db();
  const [{ data: c }, { data: p }] = await Promise.all([s.from('site_content').select('key,value'), s.from('projects').select('*')]);
  await s.from('versions').insert({ actor, snapshot: { c, p } });
  const { data: old } = await s.from('versions').select('id').order('id', { ascending: false }).range(50, 300);
  if (old?.length) await s.from('versions').delete().in('id', old.map((o) => o.id));
}
export async function ensureSeed() {
  const s = db(); const { data } = await s.from('site_content').select('key').eq('key', 'seeded');
  if (data?.length) return;
  await s.from('projects').insert(PROJECTS); await s.from('site_content').insert({ key: 'seeded', value: true });
}
