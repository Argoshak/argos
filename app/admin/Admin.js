'use client';
import { useState, useEffect, useCallback } from 'react';
const T3 = [["Dashboard", "لوحة التحكم", "Tableau de bord"], ["Preview", "معاينة", "Aperçu"], ["Sign out", "تسجيل الخروج", "Se déconnecter"], ["Admin sign in", "تسجيل دخول المدير", "Connexion administrateur"], ["Username", "اسم المستخدم", "Nom d'utilisateur"], ["Password", "كلمة المرور", "Mot de passe"], ["Sign in", "دخول", "Connexion"], ["Set a new password", "تعيين كلمة مرور جديدة", "Définir un nouveau mot de passe"], ["You must replace the initial password before continuing.", "يجب استبدال كلمة المرور الأولية قبل المتابعة.", "Vous devez remplacer le mot de passe initial pour continuer."], ["Current password", "كلمة المرور الحالية", "Mot de passe actuel"], ["New password (12+ characters, upper, lower, digit)", "كلمة مرور جديدة (12 حرفاً فأكثر، حرف كبير وصغير ورقم)", "Nouveau mot de passe (12+ caractères, majuscule, minuscule, chiffre)"], ["Change password", "تغيير كلمة المرور", "Changer le mot de passe"], ["Loading…", "جارٍ التحميل…", "Chargement…"], ["overview", "نظرة عامة", "Aperçu"], ["projects", "المشاريع", "Projets"], ["modules", "الوحدات", "Modules"], ["search", "بحث", "Recherche"], ["content", "المحتوى", "Contenu"], ["data", "البيانات", "Données"], ["images", "الصور", "Images"], ["history", "السجل", "Historique"], ["Projects", "المشاريع", "Projets"], ["Published", "منشورة", "Publiés"], ["Drafts", "مسودات", "Brouillons"], ["Modules on", "وحدات مفعّلة", "Modules actifs"], ["Sections", "الأقسام", "Sections"], ["Translations", "الترجمات", "Traductions"], ["Recent activity", "آخر النشاطات", "Activité récente"], ["missing", "ناقص", "manquant"], ["← Back", "← رجوع", "← Retour"], ["Slug", "المعرّف (slug)", "Slug"], ["Status", "الحالة", "Statut"], ["Completed", "مكتمل", "Terminé"], ["In progress", "قيد التطوير", "En cours"], ["Concept", "فكرة", "Concept"], ["Featured", "مميّز", "En vedette"], ["Technologies (comma separated)", "التقنيات (مفصولة بفواصل)", "Technologies (séparées par des virgules)"], ["Repository URL", "رابط المستودع", "URL du dépôt"], ["Live website URL", "رابط الموقع", "URL du site"], ["Image", "الصورة", "Image"], ["None", "بدون", "Aucune"], ["Save project", "حفظ المشروع", "Enregistrer le projet"], ["+ New project", "+ مشروع جديد", "+ Nouveau projet"], ["No projects yet.", "لا توجد مشاريع بعد.", "Aucun projet pour le moment."], ["Publish", "نشر", "Publier"], ["Unpublish", "إلغاء النشر", "Dépublier"], ["Duplicate", "نسخ", "Dupliquer"], ["Delete", "حذف", "Supprimer"], ["Edit", "تعديل", "Modifier"], ["Publish all", "نشر الكل", "Tout publier"], ["title", "العنوان", "Titre"], ["summary", "الملخص", "Résumé"], ["case", "دراسة الحالة", "Étude de cas"], ["Save all languages", "حفظ كل اللغات", "Enregistrer toutes les langues"], ["Edit skills, social links, section order/visibility, colors, SEO, timeline and photo. Invalid values are rejected.", "عدّل المهارات وروابط التواصل وترتيب الأقسام وظهورها والألوان وSEO والجدول الزمني والصورة. القيم غير الصالحة تُرفض.", "Modifiez compétences, liens sociaux, ordre/visibilité des sections, couleurs, SEO, parcours et photo. Les valeurs invalides sont refusées."], ["Upload image (JPG, PNG, WebP, max 4 MB)", "رفع صورة (JPG أو PNG أو WebP، حتى 4 ميغابايت)", "Téléverser une image (JPG, PNG, WebP, 4 Mo max)"], ["No images uploaded yet.", "لا توجد صور مرفوعة بعد.", "Aucune image téléversée."], ["Copy URL", "نسخ الرابط", "Copier l'URL"], ["Backups (created automatically before every change)", "النسخ الاحتياطية (تُنشأ تلقائياً قبل كل تغيير)", "Sauvegardes (créées automatiquement avant chaque modification)"], ["No backups yet.", "لا توجد نسخ احتياطية بعد.", "Aucune sauvegarde."], ["Restore", "استعادة", "Restaurer"], ["Activity", "النشاط", "Activité"], ["Each module is a section on the public site. Turn it on, choose where it appears, and edit its content in every language.", "كل وحدة هي قسم في الموقع. فعّلها، وحدّد مكان ظهورها، وعدّل محتواها بكل اللغات.", "Chaque module est une section du site. Activez-le, choisissez sa place et modifiez son contenu dans chaque langue."], ["← Modules", "← الوحدات", "← Modules"], ["Type", "النوع", "Type"], ["Place after", "ضعه بعد قسم", "Placer après"], ["Title", "العنوان", "Titre"], ["Intro", "المقدمة", "Introduction"], ["Text", "النص", "Texte"], ["Items", "العناصر", "Éléments"], ["Category / tag", "الفئة / الوسم", "Catégorie / étiquette"], ["Badge / date", "الشارة / التاريخ", "Badge / date"], ["+ Add item", "+ إضافة عنصر", "+ Ajouter un élément"], ["Save modules", "حفظ الوحدات", "Enregistrer les modules"], ["+ New module", "+ وحدة جديدة", "+ Nouveau module"], ["On", "مفعّل", "Actif"], ["Remove", "إزالة", "Retirer"], ["Saved.", "تم الحفظ.", "Enregistré."], ["Order updated.", "تم تحديث الترتيب.", "Ordre mis à jour."], ["Published.", "تم النشر.", "Publié."], ["Unpublished.", "أُلغي النشر.", "Dépublié."], ["Duplicated.", "تم النسخ.", "Dupliqué."], ["Deleted.", "تم الحذف.", "Supprimé."], ["Uploaded.", "تم الرفع.", "Téléversé."], ["Image deleted.", "حُذفت الصورة.", "Image supprimée."], ["Restored.", "تمت الاستعادة.", "Restauré."], ["Modules saved.", "تم حفظ الوحدات.", "Modules enregistrés."], ["Delete this project permanently?", "هل تريد حذف المشروع نهائياً؟", "Supprimer définitivement ce projet ?"], ["Delete this image?", "هل تريد حذف هذه الصورة؟", "Supprimer cette image ?"], ["Restore this version? Current content is backed up first.", "استعادة هذه النسخة؟ سيُحفظ المحتوى الحالي أولاً.", "Restaurer cette version ? Le contenu actuel est d'abord sauvegardé."], ["Remove this item?", "إزالة هذا العنصر؟", "Retirer cet élément ?"], ["Delete this module?", "حذف هذه الوحدة؟", "Supprimer ce module ?"], ["Search projects, modules and texts…", "ابحث في المشاريع والوحدات والنصوص…", "Rechercher projets, modules et textes…"], ["No results.", "لا نتائج.", "Aucun résultat."]];
const D = { ar: {}, fr: {} }; T3.forEach(([e, a, f]) => { D.ar[e] = a; D.fr[e] = f; });
let LNG = 'en'; const tr = (x) => D[LNG]?.[x] || x;
const ov = (v) => (v && typeof v === 'object' ? v : v ? { en: v } : {});
function LangPick() { return <span>{['en', 'fr', 'ar'].map((x) => <button key={x} aria-pressed={x === LNG} onClick={() => { document.cookie = `lang=${x};path=/;max-age=31536000`; location.reload(); }}>{x.toUpperCase()}</button>)}</span>; }
const L = ['en', 'ar', 'fr'];
const post = (u, b) => fetch(u, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }).then((r) => r.json()).catch(() => ({ error: 'Network error' }));
const api = (b) => post('/api/admin', b);
const fmt = (t) => new Date(t).toLocaleString();

export default function Admin({ auth, lang }) {
  LNG = lang || 'en';
  const [a, setA] = useState(auth);
  if (!a) return <Login onOk={(r) => setA({ mc: r.mustChange })} />;
  if (a.mc) return <Pw onOk={() => setA({ mc: false })} />;
  return <Panel out={async () => { await post('/api/auth', { action: 'logout' }); setA(null); }} />;
}
function Login({ onOk }) {
  const [u, setU] = useState(''), [p, setP] = useState(''), [e, setE] = useState('');
  const go = async (ev) => { ev.preventDefault(); const r = await post('/api/auth', { action: 'login', username: u, password: p }); r.error ? setE(r.error) : onOk(r); };
  return <form className="adm" onSubmit={go} style={{ maxWidth: 380 }}><h1>{tr('Admin sign in')}</h1>
    <label>{tr('Username')}<input value={u} onChange={(x) => setU(x.target.value)} autoComplete="username" required /></label>
    <label>{tr('Password')}<input type="password" value={p} onChange={(x) => setP(x.target.value)} autoComplete="current-password" required /></label>
    {e && <div className="msg" role="alert">{e}</div>}<button className="go">{tr('Sign in')}</button></form>;
}
function Pw({ onOk }) {
  const [c, setC] = useState(''), [n, setN] = useState(''), [e, setE] = useState('');
  const go = async (ev) => { ev.preventDefault(); const r = await post('/api/auth', { action: 'password', current: c, next: n }); r.error ? setE(r.error) : onOk(); };
  return <form className="adm" onSubmit={go} style={{ maxWidth: 420 }}><h1>{tr('Set a new password')}</h1><p>{tr('You must replace the initial password before continuing.')}</p>
    <label>{tr('Current password')}<input type="password" value={c} onChange={(x) => setC(x.target.value)} autoComplete="current-password" required /></label>
    <label>{tr('New password (12+ characters, upper, lower, digit)')}<input type="password" value={n} onChange={(x) => setN(x.target.value)} autoComplete="new-password" required /></label>
    {e && <div className="msg" role="alert">{e}</div>}<button className="go">{tr('Change password')}</button></form>;
}
function Panel({ out }) {
  const [d, setD] = useState(null), [tab, setTab] = useState('overview'), [msg, setMsg] = useState('');
  const load = useCallback(async () => { const r = await api({ action: 'all' }); r.error ? setMsg(r.error) : setD(r); }, []);
  useEffect(() => { load(); }, [load]);
  const run = async (b, ok = tr('Saved.')) => { const r = await api(b); setMsg(r.error ? 'Error: ' + r.error : ok); if (!r.error) await load(); return r; };
  if (!d) return <div className="adm"><p>{msg || tr('Loading…')}</p></div>;
  const tabs = { overview: <Overview2 d={d} />, projects: <Projects d={d} run={run} />, modules: <Modules d={d} run={run} />, search: <Search d={d} go={setTab} />, content: <Content key={d.content.copy && JSON.stringify(d.content.copy).length} d={d} run={run} />, data: <DataEd d={d} run={run} />, images: <Images d={d} load={load} setMsg={setMsg} run={run} />, history: <History d={d} run={run} /> };
  return <div className="adm"><div className="ah"><h1>{tr('Dashboard')}</h1><a href="/?preview=1" target="_blank">{tr('Preview')}</a><button onClick={out}>{tr('Sign out')}</button></div>
    <div className="tabs" role="tablist">{Object.keys(tabs).map((k) => <button key={k} aria-pressed={k === tab} onClick={() => { setTab(k); setMsg(''); }}>{tr(k)}</button>)}</div>
    {msg && <div className="msg" role="status">{msg}</div>}{tabs[tab]}</div>;
}
function Overview({ d }) {
  const P = d.projects, pub = P.filter((p) => p.published).length, c = d.content.copy;
  const miss = (l) => Object.keys(c.en).filter((k) => k !== 'education' && !c[l]?.[k]).length;
  return <div><table><tbody>
    <tr><th>{tr(tr('Projects'))}</th><td>{P.length} total · {pub} published · {P.length - pub} draft</td></tr>
    <tr><th>{tr(tr('Sections'))}</th><td>{d.content.sections.filter((s) => s.enabled).length} enabled of {d.content.sections.length}</td></tr>
    <tr><th>Languages</th><td>{L.map((l) => `${l.toUpperCase()}: ${miss(l)} missing`).join(' · ')}</td></tr>
    <tr><th>Last update</th><td>{d.activity[0] ? fmt(d.activity[0].at) : '—'}</td></tr></tbody></table>
    <h3>{tr('Recent activity')}</h3>{d.activity.slice(0, 5).map((a) => <p key={a.id}>{fmt(a.at)} — {a.actor}: {a.action} {a.detail}</p>)}</div>;
}
const blank = { slug: '', status: 'ongoing', published: false, featured: false, data: { title: {}, summary: {}, case: {}, tech: [], repo: '', live: '', image: '' } };
function Projects({ d, run }) {
  const [ed, setEd] = useState(null), [l, setL] = useState('en'); const P = d.projects;
  const move = (i, k) => { const ids = P.map((p) => p.id); [ids[i], ids[i + k]] = [ids[i + k], ids[i]]; run({ action: 'reorder', ids }, tr('Order updated.')); };
  if (ed) { const set = (k, v) => setEd({ ...ed, data: { ...ed.data, [k]: v } }), lang = (k, v) => set(k, { ...ed.data[k], [l]: v });
    return <div><button onClick={() => setEd(null)}>{tr('← Back')}</button>
      <label>{tr('Slug')}<input value={ed.slug} onChange={(e) => setEd({ ...ed, slug: e.target.value })} /></label>
      <div className="row"><label>{tr('Status')}<select value={ed.status} onChange={(e) => setEd({ ...ed, status: e.target.value })}><option value="completed">{tr('Completed')}</option><option value="ongoing">{tr('In progress')}</option><option value="concept">{tr('Concept')}</option></select></label>
        <label><input type="checkbox" checked={ed.published} onChange={(e) => setEd({ ...ed, published: e.target.checked })} /> {tr(tr('Published'))}</label>
        <label><input type="checkbox" checked={ed.featured} onChange={(e) => setEd({ ...ed, featured: e.target.checked })} /> {tr('Featured')}</label></div>
      <p>{L.map((x) => <button key={x} aria-pressed={x === l} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}</p>
      {[['title', 1], ['summary', 3], ['case', 8]].map(([k, r]) => <label key={k}>{tr(k)} ({l}){!ed.data[k]?.[l] && <em> — {tr('missing')}</em>}<textarea dir={l === 'ar' ? 'rtl' : 'ltr'} rows={r} value={ed.data[k]?.[l] || ''} onChange={(e) => lang(k, e.target.value)} /></label>)}
      <label>{tr('Technologies (comma separated)')}<input value={(ed.data.tech || []).join(', ')} onChange={(e) => set('tech', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} /></label>
      <label>{tr('Repository URL')}<input value={ed.data.repo || ''} onChange={(e) => set('repo', e.target.value)} /></label>
      <label>{tr('Live website URL')}<input value={ed.data.live || ''} onChange={(e) => set('live', e.target.value)} /></label>
      <label>{tr('Image')}<select value={ed.data.image || ''} onChange={(e) => set('image', e.target.value)}><option value="">{tr('None')}</option>{d.media.map((m) => <option key={m.name} value={m.url}>{m.name}</option>)}</select></label>
      <button className="go" onClick={async () => { const r = await run({ action: 'saveProject', project: ed }); if (!r.error) setEd(null); }}>{tr('Save project')}</button></div>; }
  return <div><button className="go" onClick={() => setEd(blank)}>{tr('+ New project')}</button> <button onClick={() => run({ action: 'publishAll' }, tr('Published.'))}>{tr('Publish all')}</button>
    {P.length === 0 && <p>{tr('No projects yet.')}</p>}
    <table><tbody>{P.map((p, i) => <tr key={p.id}><td>{p.data.title?.en}<br /><small>{p.status} · {p.published ? 'published' : 'draft'}{p.featured ? ' · featured' : ''}</small></td>
      <td className="row"><button disabled={!i} onClick={() => move(i, -1)} aria-label="Move up">↑</button><button disabled={i === P.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
        <button onClick={() => setEd(p)}>{tr('Edit')}</button><button onClick={() => run({ action: 'saveProject', project: { ...p, published: !p.published } }, p.published ? tr('Unpublished.') : tr('Published.'))}>{p.published ? 'Unpublish' : 'Publish'}</button>
        <button onClick={() => run({ action: 'duplicateProject', id: p.id }, tr('Duplicated.'))}>{tr('Duplicate')}</button>
        <button className="bad" onClick={() => confirm(tr('Delete this project permanently?')) && run({ action: 'deleteProject', id: p.id }, tr('Deleted.'))}>{tr('Delete')}</button></td></tr>)}</tbody></table></div>;
}
function Content({ d, run }) {
  const [l, setL] = useState('en'), [c, setC] = useState(d.content.copy);
  return <div><p>{L.map((x) => <button key={x} aria-pressed={x === l} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}</p>
    {Object.keys(c.en).map((k) => <label key={k}>{k}{k !== 'education' && !c[l]?.[k] && <em> — {tr('missing')}</em>}
      <textarea dir={l === 'ar' ? 'rtl' : 'ltr'} rows={(c[l]?.[k] || '').length > 90 ? 6 : 1} value={c[l]?.[k] || ''} onChange={(e) => setC({ ...c, [l]: { ...c[l], [k]: e.target.value } })} /></label>)}
    <button className="go" onClick={() => run({ action: 'save', key: 'copy', value: c })}>{tr('Save all languages')}</button></div>;
}
const DK = ['skills', 'socials', 'sections', 'theme', 'seo', 'timeline', 'identity'];
function DataEd({ d, run }) {
  const [k, setK] = useState('socials'), [t, setT] = useState(JSON.stringify(d.content.socials, null, 2)), [e, setE] = useState('');
  const pick = (x) => { setK(x); setT(JSON.stringify(d.content[x], null, 2)); setE(''); };
  const save = () => { let v; try { v = JSON.parse(t); } catch { return setE('Invalid JSON'); } setE(''); run({ action: 'save', key: k, value: v }); };
  return <div><p>{tr('Edit skills, social links, section order/visibility, colors, SEO, timeline and photo. Invalid values are rejected.')}</p>
    <p>{DK.map((x) => <button key={x} aria-pressed={x === k} onClick={() => pick(x)}>{x}</button>)}</p>
    <textarea rows={20} value={t} onChange={(x) => setT(x.target.value)} spellCheck={false} style={{ fontFamily: 'monospace' }} />{e && <div className="msg">{e}</div>}<button className="go" onClick={save}>Save {k}</button></div>;
}
function Images({ d, load, setMsg, run }) {
  const up = async (ev) => { const f = ev.target.files[0]; if (!f) return; const fd = new FormData(); fd.append('file', f);
    const r = await fetch('/api/admin', { method: 'POST', body: fd }).then((x) => x.json()).catch(() => ({ error: 'Network error' })); setMsg(r.error ? 'Error: ' + r.error : tr('Uploaded.')); ev.target.value = ''; load(); };
  return <div><label>{tr('Upload image (JPG, PNG, WebP, max 4 MB)')}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={up} /></label>
    {d.media.length === 0 && <p>{tr('No images uploaded yet.')}</p>}
    <div className="media">{d.media.map((m) => <div key={m.name}><img src={m.url} alt={m.name} /><small>{m.name}</small>
      <button onClick={() => navigator.clipboard?.writeText(m.url)}>{tr('Copy URL')}</button> <button className="bad" onClick={() => confirm(tr('Delete this image?')) && run({ action: 'deleteMedia', name: m.name }, tr('Image deleted.'))}>{tr('Delete')}</button></div>)}</div></div>;
}
function History({ d, run }) {
  return <div><h3>{tr('Backups (created automatically before every change)')}</h3>
    {d.versions.length === 0 && <p>{tr('No backups yet.')}</p>}
    {d.versions.map((v) => <p key={v.id}>{fmt(v.at)} — {v.actor} <button onClick={() => confirm(tr('Restore this version? Current content is backed up first.')) && run({ action: 'restore', id: v.id }, tr('Restored.'))}>{tr('Restore')}</button></p>)}
    <h3>{tr('Activity')}</h3>{d.activity.map((a) => <p key={a.id}>{fmt(a.at)} — {a.actor}: {a.action} {a.detail}</p>)}</div>;
}

function Overview2({ d }) {
  const P = d.projects, pub = P.filter((p) => p.published).length, c = d.content.copy, M = d.content.modules || [];
  const miss = (l) => Object.keys(c.en).filter((k) => k !== 'education' && !c[l]?.[k]).length;
  const S = [[P.length, tr('Projects')], [pub, tr('Published')], [P.length - pub, tr('Drafts')], [M.filter((m) => m.enabled).length + '/' + M.length, tr('Modules on')], [d.content.sections.filter((s) => s.enabled).length, tr('Sections')]];
  return <div><div className="stat-g">{S.map(([n, t]) => <div className="sc" key={t}><b>{n}</b>{t}</div>)}</div>
    <div className="card2"><h3>{tr('Translations')}</h3>{L.map((l) => <p key={l}><b>{l.toUpperCase()}</b>: {miss(l)} missing</p>)}</div>
    <div className="card2"><h3>{tr('Recent activity')}</h3>{d.activity.slice(0, 6).map((a) => <p key={a.id}>{fmt(a.at)} — {a.actor}: {a.action} {a.detail}</p>)}</div></div>;
}
function Search({ d, go }) {
  const [q, setQ] = useState(''), n = q.trim().toLowerCase();
  const all = [...d.projects.map((p) => ['projects', p.data.title?.en || p.slug, JSON.stringify(p.data)]), ...(d.content.modules || []).map((m) => ['modules', m.title?.en || m.id, JSON.stringify(m)]),
    ...Object.keys(d.content.copy.en).map((k) => ['content', k, Object.values(d.content.copy).map((x) => x[k]).join(' ')])];
  const hits = n ? all.filter((h) => (h[1] + h[2]).toLowerCase().includes(n)) : [];
  return <div><input placeholder="Search projects, modules and texts…" value={q} onChange={(e) => setQ(e.target.value)} />{n && !hits.length && <p>{tr('No results.')}</p>}
    {hits.slice(0, 40).map((h, i) => <p key={i}><button onClick={() => go(h[0])}>{h[0]}</button> {h[1]}</p>)}</div>;
}
const TYPES = ['cards', 'editorial', 'steps', 'explorer', 'list', 'layers', 'bars'], AT = ['about', 'skills', 'projects', 'journey', 'systems', 'philosophy', 'contact'];
function Modules({ d, run }) {
  const [M, setM] = useState(d.content.modules || []), [e, setE] = useState(null), [l, setL] = useState('en');
  const mv = (a, i, k) => { const b = [...a]; if (i + k < 0 || i + k >= b.length) return b; [b[i], b[i + k]] = [b[i + k], b[i]]; return b; };
  const save = () => run({ action: 'save', key: 'modules', value: M }, tr('Modules saved.'));
  const upd = (i, p) => setM(M.map((m, k) => (k === i ? { ...m, ...p } : m)));
  const tl = (o, v) => ({ ...(o || {}), [l]: v });
  const Lang = () => <p>{L.map((x) => <button key={x} aria-pressed={x === l} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}</p>;
  if (e !== null) { const m = M[e], it = m.items || [], setIt = (items) => upd(e, { items }), upI = (k, p) => setIt(it.map((x, j) => (j === k ? { ...x, ...p } : x)));
    return <div><button onClick={() => setE(null)}>{tr('← Modules')}</button>
      <div className="row"><label>{tr('Type')}<select value={m.type} onChange={(x) => upd(e, { type: x.target.value })}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label>{tr('Place after')}<select value={m.at || 'projects'} onChange={(x) => upd(e, { at: x.target.value })}>{AT.map((t) => <option key={t}>{t}</option>)}</select></label></div>
      <Lang /><label>{tr('Title')} ({l}){!m.title?.[l] && <em> — {tr('missing')}</em>}<input dir={l === 'ar' ? 'rtl' : 'ltr'} value={m.title?.[l] || ''} onChange={(x) => upd(e, { title: tl(m.title, x.target.value) })} /></label>
      <label>{tr('Intro')} ({l}){!m.intro?.[l] && <em> — {tr('missing')}</em>}<textarea rows={5} dir={l === 'ar' ? 'rtl' : 'ltr'} value={m.intro?.[l] || ''} onChange={(x) => upd(e, { intro: tl(m.intro, x.target.value) })} /></label>
      <h3>{tr('Items')} ({it.length})</h3>
      {it.map((x, k) => <div className="card2" key={k}><div className="row"><button onClick={() => setIt(mv(it, k, -1))}>↑</button><button onClick={() => setIt(mv(it, k, 1))}>↓</button>
        <button className="bad" onClick={() => confirm(tr('Remove this item?')) && setIt(it.filter((_, j) => j !== k))}>{tr('Remove')}</button></div>
        <label>{tr('Title')} ({l}){!x.title?.[l] && <em> — {tr('missing')}</em>}<input dir={l === 'ar' ? 'rtl' : 'ltr'} value={x.title?.[l] || ''} onChange={(y) => upI(k, { title: tl(x.title, y.target.value) })} /></label>
        <label>{tr('Text')} ({l}){!x.text?.[l] && <em> — {tr('missing')}</em>}<textarea rows={3} dir={l === 'ar' ? 'rtl' : 'ltr'} value={x.text?.[l] || ''} onChange={(y) => upI(k, { text: tl(x.text, y.target.value) })} /></label>
        <div className="row"><label>{tr('Category / tag')}<input value={x.tag || ''} onChange={(y) => upI(k, { tag: y.target.value })} /></label><label>{tr('Badge / date')}<input value={x.meta || ''} onChange={(y) => upI(k, { meta: y.target.value })} /></label></div></div>)}
      <button onClick={() => setIt([...it, { title: {}, text: {}, tag: '', meta: '' }])}>{tr('+ Add item')}</button> <button className="go" onClick={save}>{tr('Save modules')}</button></div>; }
  return <div><p>{tr('Each module is a section on the public site. Turn it on, choose where it appears, and edit its content in every language.')}</p>
    <table><tbody>{M.map((m, i) => <tr key={m.id}><td><b>{m.title?.en || m.id}</b><br /><small>{m.type} · after {m.at || 'projects'} · {(m.items || []).length} items</small></td>
      <td className="row"><label><input type="checkbox" checked={!!m.enabled} onChange={(x) => upd(i, { enabled: x.target.checked })} /> {tr('On')}</label>
        <button onClick={() => setM(mv(M, i, -1))}>↑</button><button onClick={() => setM(mv(M, i, 1))}>↓</button><button onClick={() => setE(i)}>{tr('Edit')}</button>
        <button className="bad" onClick={() => confirm(tr('Delete this module?')) && setM(M.filter((_, k) => k !== i))}>{tr('Delete')}</button></td></tr>)}</tbody></table>
    <button onClick={() => { setM([...M, { id: 'module-' + Date.now().toString(36), type: 'cards', enabled: false, at: 'projects', title: { en: 'New module' }, intro: {}, items: [] }]); }}>{tr('+ New module')}</button> <button className="go" onClick={save}>{tr('Save modules')}</button></div>;
}
