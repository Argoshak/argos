import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { session, sameOrigin } from '../../../lib/auth';
import { db } from '../../../lib/supabase';
import { PROJECTS } from '../../../lib/defaults';
import { getSite, getProjects, snapshot, log, ensureSeed, ID } from '../../../lib/content';
export const dynamic = 'force-dynamic';
const J = (o, status = 200) => NextResponse.json(o, { status });
const KEYS = ['copy', 'modules', 'identity', 'skills', 'socials', 'sections', 'theme', 'seo', 'timeline'];
const url = (u) => { try { return ['http:', 'https:', 'mailto:'].includes(new URL(u).protocol); } catch { return false; } };
const img = (u) => !u || u.startsWith('/') && !u.startsWith('//') || url(u) && u.startsWith('https:');
const hex = /^#[0-9a-fA-F]{6}$/;
function check(key, v) {
  if (key === 'socials') { if (!Array.isArray(v)) return 'Socials must be a list'; for (const x of v) if (x.enabled && !url(x.url)) return `Invalid URL for ${x.label}`; }
  if (key === 'theme') { for (const k of ['navy', 'royal', 'gold', 'bg']) if (!hex.test(v?.[k] || '')) return `Invalid color: ${k}`; if (!/^\d{1,2}px$/.test(v.radius || '')) return 'Invalid radius (e.g. 6px)'; }
  if (key === 'sections' && (!Array.isArray(v) || v.some((x) => !ID.includes(x.id)))) return 'Unknown section id';
  if (key === 'modules' && (!Array.isArray(v) || v.some((m) => !/^[a-z0-9-]{2,40}$/.test(m.id || '') || !['cards', 'editorial', 'steps', 'explorer', 'list', 'layers', 'bars'].includes(m.type) || (m.items || []).some((i) => i.url && !/^https?:\/\//.test(i.url))))) return 'Invalid module';
  if (key === 'identity' && !img(v?.photo)) return 'Invalid photo URL';
  if (typeof v !== 'object' || v === null) return 'Invalid value';
  return null;
}
function checkProject(p) {
  if (!/^[a-z0-9-]{2,60}$/.test(p.slug || '')) return 'Slug: 2-60 chars, lowercase letters, digits, hyphens';
  if (!['completed', 'ongoing', 'concept', 'exploring'].includes(p.status)) return 'Invalid status';
  const d = p.data || {};
  for (const k of ['repo', 'live']) if (d[k] && !url(d[k])) return `Invalid ${k} URL`;
  if (!img(d.image)) return 'Invalid image URL';
  if (!d.title?.en?.trim()) return 'English title is required';
  return null;
}
async function media(sb) {
  const { data } = await sb.storage.from('media').list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
  return (data || []).filter((f) => f.name !== '.emptyFolderPlaceholder').map((f) => ({ name: f.name, url: sb.storage.from('media').getPublicUrl(f.name).data.publicUrl }));
}
async function upload(req, who, sb) {
  const f = (await req.formData()).get('file');
  if (!f || typeof f === 'string' || f.size > 4e6 || f.size < 12) return J({ error: 'File missing or larger than 4 MB' }, 400);
  const buf = Buffer.from(await f.arrayBuffer()); const h = buf.subarray(0, 12);
  const ext = h[0] === 0xff && h[1] === 0xd8 ? 'jpg' : h.subarray(0, 4).toString('hex') === '89504e47' ? 'png' : h.subarray(0, 4).toString() === 'RIFF' && h.subarray(8, 12).toString() === 'WEBP' ? 'webp' : null;
  if (!ext) return J({ error: 'Only JPG, PNG or WebP images are allowed' }, 400);
  const name = `${crypto.randomUUID()}.${ext}`;
  const { error } = await sb.storage.from('media').upload(name, buf, { contentType: ext === 'jpg' ? 'image/jpeg' : `image/${ext}` });
  if (error) return J({ error: 'Upload failed' }, 500);
  await log(who, 'upload', name); return J({ ok: true });
}
async function handle(req) {
  if (!sameOrigin(req)) return J({ error: 'Bad origin' }, 403);
  const s = await session(); if (!s || s.mc) return J({ error: 'Unauthorized' }, 401);
  const who = s.u; const sb = db();
  try {
    if ((req.headers.get('content-type') || '').startsWith('multipart/')) return await upload(req, who, sb);
    const b = await req.json().catch(() => null); if (!b) return J({ error: 'Bad request' }, 400);
    switch (b.action) {
      case 'all': {
        await ensureSeed();
        const [content, projects, m, msgs] = await Promise.all([getSite(true), getProjects(true), media(sb), sb.from('messages').select('*').order('id', { ascending: false }).limit(200)]);
        return J({ content, projects, media: m, messages: msgs.data || [] });
      }
      case 'save': {
        if (!KEYS.includes(b.key)) return J({ error: 'Unknown key' }, 400);
        const e = check(b.key, b.value); if (e) return J({ error: e }, 400);
        await snapshot(who); await sb.from('site_content').upsert({ key: b.key, value: b.value, updated_at: new Date().toISOString() });
        await log(who, 'save', b.key); return J({ ok: true });
      }
      case 'saveProject': {
        const p = b.project || {}; const e = checkProject(p); if (e) return J({ error: e }, 400);
        const row = { slug: p.slug, status: p.status, published: !!p.published, featured: !!p.featured, data: p.data, updated_at: new Date().toISOString() };
        await snapshot(who);
        const r = p.id ? await sb.from('projects').update(row).eq('id', p.id) : await sb.from('projects').insert({ ...row, sort: 999 });
        if (r.error) return J({ error: r.error.code === '23505' ? 'Slug already used' : 'Save failed' }, 400);
        await log(who, p.id ? 'edit project' : 'create project', p.slug); return J({ ok: true });
      }
      case 'publishAll': await snapshot(who); await sb.from('projects').update({ published: true }).neq('id', '00000000-0000-0000-0000-000000000000'); await log(who, 'publish all'); return J({ ok: true });
      case 'readMsg': if (!Number.isInteger(b.id)) return J({ error: 'Bad id' }, 400); await sb.from('messages').update({ read: !!b.read }).eq('id', b.id); return J({ ok: true });
      case 'deleteMsg': if (!Number.isInteger(b.id)) return J({ error: 'Bad id' }, 400); await sb.from('messages').delete().eq('id', b.id); return J({ ok: true });
      case 'reset': if (!KEYS.includes(b.key)) return J({ error: 'Unknown key' }, 400); await snapshot(who); await sb.from('site_content').delete().eq('key', b.key); return J({ ok: true });
      case 'reseedProjects': await snapshot(who); await sb.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000'); await sb.from('projects').insert(PROJECTS); await log(who, 'reseed projects'); return J({ ok: true });
      case 'deleteProject': await snapshot(who); await sb.from('projects').delete().eq('id', b.id); await log(who, 'delete project', b.id); return J({ ok: true });
      case 'duplicateProject': {
        const { data: p } = await sb.from('projects').select('*').eq('id', b.id).single(); if (!p) return J({ error: 'Not found' }, 404);
        const { id, ...rest } = p; await sb.from('projects').insert({ ...rest, slug: `${p.slug}-copy-${Math.random().toString(36).slice(2, 6)}`, published: false, sort: 999 });
        await log(who, 'duplicate project', p.slug); return J({ ok: true });
      }
      case 'reorder': {
        if (!Array.isArray(b.ids)) return J({ error: 'Bad request' }, 400);
        await Promise.all(b.ids.map((id, i) => sb.from('projects').update({ sort: i }).eq('id', id))); await log(who, 'reorder projects'); return J({ ok: true });
      }
      case 'deleteMedia': {
        if (!/^[\w-]+\.(jpg|png|webp)$/.test(b.name || '')) return J({ error: 'Bad name' }, 400);
        await sb.storage.from('media').remove([b.name]); await log(who, 'delete image', b.name); return J({ ok: true });
      }
      case 'restore': {
        const { data: v } = await sb.from('versions').select('snapshot').eq('id', b.id).single(); if (!v) return J({ error: 'Version not found' }, 404);
        await snapshot(who);
        for (const c of v.snapshot.c || []) await sb.from('site_content').upsert(c);
        await sb.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (v.snapshot.p?.length) await sb.from('projects').insert(v.snapshot.p);
        await log(who, 'restore', String(b.id)); return J({ ok: true });
      }
    }
    return J({ error: 'Unknown action' }, 400);
  } catch (e) { return J({ error: 'Server error' }, 500); }
}

export async function POST(req) { const res = await handle(req); if (res.status === 200) revalidateTag('site'); return res; }
