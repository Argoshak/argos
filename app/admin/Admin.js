'use client';
import { useState, useEffect, useCallback } from 'react';
const L = ['en', 'ar', 'fr'];
const post = (u, b) => fetch(u, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }).then((r) => r.json()).catch(() => ({ error: 'Network error' }));
const api = (b) => post('/api/admin', b);
const fmt = (t) => new Date(t).toLocaleString();

export default function Admin({ auth }) {
  const [a, setA] = useState(auth);
  if (!a) return <Login onOk={(r) => setA({ mc: r.mustChange })} />;
  if (a.mc) return <Pw onOk={() => setA({ mc: false })} />;
  return <Panel out={async () => { await post('/api/auth', { action: 'logout' }); setA(null); }} />;
}
function Login({ onOk }) {
  const [u, setU] = useState(''), [p, setP] = useState(''), [e, setE] = useState('');
  const go = async (ev) => { ev.preventDefault(); const r = await post('/api/auth', { action: 'login', username: u, password: p }); r.error ? setE(r.error) : onOk(r); };
  return <form className="adm" onSubmit={go} style={{ maxWidth: 380 }}><h1>Admin sign in</h1>
    <label>Username<input value={u} onChange={(x) => setU(x.target.value)} autoComplete="username" required /></label>
    <label>Password<input type="password" value={p} onChange={(x) => setP(x.target.value)} autoComplete="current-password" required /></label>
    {e && <div className="msg" role="alert">{e}</div>}<button className="go">Sign in</button></form>;
}
function Pw({ onOk }) {
  const [c, setC] = useState(''), [n, setN] = useState(''), [e, setE] = useState('');
  const go = async (ev) => { ev.preventDefault(); const r = await post('/api/auth', { action: 'password', current: c, next: n }); r.error ? setE(r.error) : onOk(); };
  return <form className="adm" onSubmit={go} style={{ maxWidth: 420 }}><h1>Set a new password</h1><p>You must replace the initial password before continuing.</p>
    <label>Current password<input type="password" value={c} onChange={(x) => setC(x.target.value)} autoComplete="current-password" required /></label>
    <label>New password (12+ characters, upper, lower, digit)<input type="password" value={n} onChange={(x) => setN(x.target.value)} autoComplete="new-password" required /></label>
    {e && <div className="msg" role="alert">{e}</div>}<button className="go">Change password</button></form>;
}
function Panel({ out }) {
  const [d, setD] = useState(null), [tab, setTab] = useState('overview'), [msg, setMsg] = useState('');
  const load = useCallback(async () => { const r = await api({ action: 'all' }); r.error ? setMsg(r.error) : setD(r); }, []);
  useEffect(() => { load(); }, [load]);
  const run = async (b, ok = 'Saved.') => { const r = await api(b); setMsg(r.error ? 'Error: ' + r.error : ok); if (!r.error) await load(); return r; };
  if (!d) return <div className="adm"><p>{msg || 'Loading…'}</p></div>;
  const tabs = { overview: <Overview2 d={d} />, projects: <Projects d={d} run={run} />, modules: <Modules d={d} run={run} />, search: <Search d={d} go={setTab} />, content: <Content key={d.content.copy && JSON.stringify(d.content.copy).length} d={d} run={run} />, data: <DataEd d={d} run={run} />, images: <Images d={d} load={load} setMsg={setMsg} run={run} />, history: <History d={d} run={run} /> };
  return <div className="adm"><div className="ah"><h1>Dashboard</h1><a href="/?preview=1" target="_blank">Preview</a><button onClick={out}>Sign out</button></div>
    <div className="tabs" role="tablist">{Object.keys(tabs).map((k) => <button key={k} aria-pressed={k === tab} onClick={() => { setTab(k); setMsg(''); }}>{k}</button>)}</div>
    {msg && <div className="msg" role="status">{msg}</div>}{tabs[tab]}</div>;
}
function Overview({ d }) {
  const P = d.projects, pub = P.filter((p) => p.published).length, c = d.content.copy;
  const miss = (l) => Object.keys(c.en).filter((k) => k !== 'education' && !c[l]?.[k]).length;
  return <div><table><tbody>
    <tr><th>Projects</th><td>{P.length} total · {pub} published · {P.length - pub} draft</td></tr>
    <tr><th>Sections</th><td>{d.content.sections.filter((s) => s.enabled).length} enabled of {d.content.sections.length}</td></tr>
    <tr><th>Languages</th><td>{L.map((l) => `${l.toUpperCase()}: ${miss(l)} missing`).join(' · ')}</td></tr>
    <tr><th>Last update</th><td>{d.activity[0] ? fmt(d.activity[0].at) : '—'}</td></tr></tbody></table>
    <h3>Recent activity</h3>{d.activity.slice(0, 5).map((a) => <p key={a.id}>{fmt(a.at)} — {a.actor}: {a.action} {a.detail}</p>)}</div>;
}
const blank = { slug: '', status: 'ongoing', published: false, featured: false, data: { title: {}, summary: {}, case: {}, tech: [], repo: '', live: '', image: '' } };
function Projects({ d, run }) {
  const [ed, setEd] = useState(null), [l, setL] = useState('en'); const P = d.projects;
  const move = (i, k) => { const ids = P.map((p) => p.id); [ids[i], ids[i + k]] = [ids[i + k], ids[i]]; run({ action: 'reorder', ids }, 'Order updated.'); };
  if (ed) { const set = (k, v) => setEd({ ...ed, data: { ...ed.data, [k]: v } }), lang = (k, v) => set(k, { ...ed.data[k], [l]: v });
    return <div><button onClick={() => setEd(null)}>← Back</button>
      <label>Slug<input value={ed.slug} onChange={(e) => setEd({ ...ed, slug: e.target.value })} /></label>
      <div className="row"><label>Status<select value={ed.status} onChange={(e) => setEd({ ...ed, status: e.target.value })}><option value="completed">Completed</option><option value="ongoing">In progress</option><option value="concept">Concept</option></select></label>
        <label><input type="checkbox" checked={ed.published} onChange={(e) => setEd({ ...ed, published: e.target.checked })} /> Published</label>
        <label><input type="checkbox" checked={ed.featured} onChange={(e) => setEd({ ...ed, featured: e.target.checked })} /> Featured</label></div>
      <p>{L.map((x) => <button key={x} aria-pressed={x === l} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}</p>
      {[['title', 1], ['summary', 3], ['case', 8]].map(([k, r]) => <label key={k}>{k} ({l}){!ed.data[k]?.[l] && <em> — missing</em>}<textarea dir={l === 'ar' ? 'rtl' : 'ltr'} rows={r} value={ed.data[k]?.[l] || ''} onChange={(e) => lang(k, e.target.value)} /></label>)}
      <label>Technologies (comma separated)<input value={(ed.data.tech || []).join(', ')} onChange={(e) => set('tech', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} /></label>
      <label>Repository URL<input value={ed.data.repo || ''} onChange={(e) => set('repo', e.target.value)} /></label>
      <label>Live website URL<input value={ed.data.live || ''} onChange={(e) => set('live', e.target.value)} /></label>
      <label>Image<select value={ed.data.image || ''} onChange={(e) => set('image', e.target.value)}><option value="">None</option>{d.media.map((m) => <option key={m.name} value={m.url}>{m.name}</option>)}</select></label>
      <button className="go" onClick={async () => { const r = await run({ action: 'saveProject', project: ed }); if (!r.error) setEd(null); }}>Save project</button></div>; }
  return <div><button className="go" onClick={() => setEd(blank)}>+ New project</button>
    {P.length === 0 && <p>No projects yet.</p>}
    <table><tbody>{P.map((p, i) => <tr key={p.id}><td>{p.data.title?.en}<br /><small>{p.status} · {p.published ? 'published' : 'draft'}{p.featured ? ' · featured' : ''}</small></td>
      <td className="row"><button disabled={!i} onClick={() => move(i, -1)} aria-label="Move up">↑</button><button disabled={i === P.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
        <button onClick={() => setEd(p)}>Edit</button><button onClick={() => run({ action: 'saveProject', project: { ...p, published: !p.published } }, p.published ? 'Unpublished.' : 'Published.')}>{p.published ? 'Unpublish' : 'Publish'}</button>
        <button onClick={() => run({ action: 'duplicateProject', id: p.id }, 'Duplicated.')}>Duplicate</button>
        <button className="bad" onClick={() => confirm('Delete this project permanently?') && run({ action: 'deleteProject', id: p.id }, 'Deleted.')}>Delete</button></td></tr>)}</tbody></table></div>;
}
function Content({ d, run }) {
  const [l, setL] = useState('en'), [c, setC] = useState(d.content.copy);
  return <div><p>{L.map((x) => <button key={x} aria-pressed={x === l} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}</p>
    {Object.keys(c.en).map((k) => <label key={k}>{k}{k !== 'education' && !c[l]?.[k] && <em> — missing</em>}
      <textarea dir={l === 'ar' ? 'rtl' : 'ltr'} rows={(c[l]?.[k] || '').length > 90 ? 6 : 1} value={c[l]?.[k] || ''} onChange={(e) => setC({ ...c, [l]: { ...c[l], [k]: e.target.value } })} /></label>)}
    <button className="go" onClick={() => run({ action: 'save', key: 'copy', value: c })}>Save all languages</button></div>;
}
const DK = ['skills', 'socials', 'sections', 'theme', 'seo', 'timeline', 'identity'];
function DataEd({ d, run }) {
  const [k, setK] = useState('socials'), [t, setT] = useState(JSON.stringify(d.content.socials, null, 2)), [e, setE] = useState('');
  const pick = (x) => { setK(x); setT(JSON.stringify(d.content[x], null, 2)); setE(''); };
  const save = () => { let v; try { v = JSON.parse(t); } catch { return setE('Invalid JSON'); } setE(''); run({ action: 'save', key: k, value: v }); };
  return <div><p>Edit skills, social links, section order/visibility, colors, SEO, timeline and photo. Invalid values are rejected.</p>
    <p>{DK.map((x) => <button key={x} aria-pressed={x === k} onClick={() => pick(x)}>{x}</button>)}</p>
    <textarea rows={20} value={t} onChange={(x) => setT(x.target.value)} spellCheck={false} style={{ fontFamily: 'monospace' }} />{e && <div className="msg">{e}</div>}<button className="go" onClick={save}>Save {k}</button></div>;
}
function Images({ d, load, setMsg, run }) {
  const up = async (ev) => { const f = ev.target.files[0]; if (!f) return; const fd = new FormData(); fd.append('file', f);
    const r = await fetch('/api/admin', { method: 'POST', body: fd }).then((x) => x.json()).catch(() => ({ error: 'Network error' })); setMsg(r.error ? 'Error: ' + r.error : 'Uploaded.'); ev.target.value = ''; load(); };
  return <div><label>Upload image (JPG, PNG, WebP, max 4 MB)<input type="file" accept="image/jpeg,image/png,image/webp" onChange={up} /></label>
    {d.media.length === 0 && <p>No images uploaded yet.</p>}
    <div className="media">{d.media.map((m) => <div key={m.name}><img src={m.url} alt={m.name} /><small>{m.name}</small>
      <button onClick={() => navigator.clipboard?.writeText(m.url)}>Copy URL</button> <button className="bad" onClick={() => confirm('Delete this image?') && run({ action: 'deleteMedia', name: m.name }, 'Image deleted.')}>Delete</button></div>)}</div></div>;
}
function History({ d, run }) {
  return <div><h3>Backups (created automatically before every change)</h3>
    {d.versions.length === 0 && <p>No backups yet.</p>}
    {d.versions.map((v) => <p key={v.id}>{fmt(v.at)} — {v.actor} <button onClick={() => confirm('Restore this version? Current content is backed up first.') && run({ action: 'restore', id: v.id }, 'Restored.')}>Restore</button></p>)}
    <h3>Activity</h3>{d.activity.map((a) => <p key={a.id}>{fmt(a.at)} — {a.actor}: {a.action} {a.detail}</p>)}</div>;
}

function Overview2({ d }) {
  const P = d.projects, pub = P.filter((p) => p.published).length, c = d.content.copy, M = d.content.modules || [];
  const miss = (l) => Object.keys(c.en).filter((k) => k !== 'education' && !c[l]?.[k]).length;
  const S = [[P.length, 'Projects'], [pub, 'Published'], [P.length - pub, 'Drafts'], [M.filter((m) => m.enabled).length + '/' + M.length, 'Modules on'], [d.content.sections.filter((s) => s.enabled).length, 'Sections']];
  return <div><div className="stat-g">{S.map(([n, t]) => <div className="sc" key={t}><b>{n}</b>{t}</div>)}</div>
    <div className="card2"><h3>Translations</h3>{L.map((l) => <p key={l}><b>{l.toUpperCase()}</b>: {miss(l)} missing</p>)}</div>
    <div className="card2"><h3>Recent activity</h3>{d.activity.slice(0, 6).map((a) => <p key={a.id}>{fmt(a.at)} — {a.actor}: {a.action} {a.detail}</p>)}</div></div>;
}
function Search({ d, go }) {
  const [q, setQ] = useState(''), n = q.trim().toLowerCase();
  const all = [...d.projects.map((p) => ['projects', p.data.title?.en || p.slug, JSON.stringify(p.data)]), ...(d.content.modules || []).map((m) => ['modules', m.title?.en || m.id, JSON.stringify(m)]),
    ...Object.keys(d.content.copy.en).map((k) => ['content', k, Object.values(d.content.copy).map((x) => x[k]).join(' ')])];
  const hits = n ? all.filter((h) => (h[1] + h[2]).toLowerCase().includes(n)) : [];
  return <div><input placeholder="Search projects, modules and texts…" value={q} onChange={(e) => setQ(e.target.value)} />{n && !hits.length && <p>No results.</p>}
    {hits.slice(0, 40).map((h, i) => <p key={i}><button onClick={() => go(h[0])}>{h[0]}</button> {h[1]}</p>)}</div>;
}
const TYPES = ['cards', 'editorial', 'steps', 'explorer', 'list'], AT = ['about', 'skills', 'projects', 'journey', 'systems', 'philosophy', 'contact'];
function Modules({ d, run }) {
  const [M, setM] = useState(d.content.modules || []), [e, setE] = useState(null), [l, setL] = useState('en');
  const mv = (a, i, k) => { const b = [...a]; if (i + k < 0 || i + k >= b.length) return b; [b[i], b[i + k]] = [b[i + k], b[i]]; return b; };
  const save = () => run({ action: 'save', key: 'modules', value: M }, 'Modules saved.');
  const upd = (i, p) => setM(M.map((m, k) => (k === i ? { ...m, ...p } : m)));
  const tl = (o, v) => ({ ...(o || {}), [l]: v });
  const Lang = () => <p>{L.map((x) => <button key={x} aria-pressed={x === l} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}</p>;
  if (e !== null) { const m = M[e], it = m.items || [], setIt = (items) => upd(e, { items }), upI = (k, p) => setIt(it.map((x, j) => (j === k ? { ...x, ...p } : x)));
    return <div><button onClick={() => setE(null)}>← Modules</button>
      <div className="row"><label>Type<select value={m.type} onChange={(x) => upd(e, { type: x.target.value })}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label>Place after<select value={m.at || 'projects'} onChange={(x) => upd(e, { at: x.target.value })}>{AT.map((t) => <option key={t}>{t}</option>)}</select></label></div>
      <Lang /><label>Title ({l}){!m.title?.[l] && <em> — missing</em>}<input dir={l === 'ar' ? 'rtl' : 'ltr'} value={m.title?.[l] || ''} onChange={(x) => upd(e, { title: tl(m.title, x.target.value) })} /></label>
      <label>Intro ({l}){!m.intro?.[l] && <em> — missing</em>}<textarea rows={5} dir={l === 'ar' ? 'rtl' : 'ltr'} value={m.intro?.[l] || ''} onChange={(x) => upd(e, { intro: tl(m.intro, x.target.value) })} /></label>
      <h3>Items ({it.length})</h3>
      {it.map((x, k) => <div className="card2" key={k}><div className="row"><button onClick={() => setIt(mv(it, k, -1))}>↑</button><button onClick={() => setIt(mv(it, k, 1))}>↓</button>
        <button className="bad" onClick={() => confirm('Remove this item?') && setIt(it.filter((_, j) => j !== k))}>Remove</button></div>
        <label>Title ({l}){!x.title?.[l] && <em> — missing</em>}<input dir={l === 'ar' ? 'rtl' : 'ltr'} value={x.title?.[l] || ''} onChange={(y) => upI(k, { title: tl(x.title, y.target.value) })} /></label>
        <label>Text ({l}){!x.text?.[l] && <em> — missing</em>}<textarea rows={3} dir={l === 'ar' ? 'rtl' : 'ltr'} value={x.text?.[l] || ''} onChange={(y) => upI(k, { text: tl(x.text, y.target.value) })} /></label>
        <div className="row"><label>Category / tag<input value={x.tag || ''} onChange={(y) => upI(k, { tag: y.target.value })} /></label><label>Badge / date<input value={x.meta || ''} onChange={(y) => upI(k, { meta: y.target.value })} /></label></div></div>)}
      <button onClick={() => setIt([...it, { title: {}, text: {}, tag: '', meta: '' }])}>+ Add item</button> <button className="go" onClick={save}>Save modules</button></div>; }
  return <div><p>Each module is a section on the public site. Turn it on, choose where it appears, and edit its content in every language.</p>
    <table><tbody>{M.map((m, i) => <tr key={m.id}><td><b>{m.title?.en || m.id}</b><br /><small>{m.type} · after {m.at || 'projects'} · {(m.items || []).length} items</small></td>
      <td className="row"><label><input type="checkbox" checked={!!m.enabled} onChange={(x) => upd(i, { enabled: x.target.checked })} /> On</label>
        <button onClick={() => setM(mv(M, i, -1))}>↑</button><button onClick={() => setM(mv(M, i, 1))}>↓</button><button onClick={() => setE(i)}>Edit</button>
        <button className="bad" onClick={() => confirm('Delete this module?') && setM(M.filter((_, k) => k !== i))}>Delete</button></td></tr>)}</tbody></table>
    <button onClick={() => { setM([...M, { id: 'module-' + Date.now().toString(36), type: 'cards', enabled: false, at: 'projects', title: { en: 'New module' }, intro: {}, items: [] }]); }}>+ New module</button> <button className="go" onClick={save}>Save modules</button></div>;
}
