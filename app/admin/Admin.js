'use client';
import { useState, useEffect, useCallback } from 'react';
const T3 = [["Exploring","قيد الاستكشاف","En exploration"],["Period","الفترة","Période"],["Dashboard", "لوحة التحكم", "Tableau de bord"], ["Preview", "معاينة", "Aperçu"], ["Sign out", "تسجيل الخروج", "Se déconnecter"], ["Admin sign in", "تسجيل دخول المدير", "Connexion administrateur"], ["Username", "اسم المستخدم", "Nom d'utilisateur"], ["Password", "كلمة المرور", "Mot de passe"], ["Sign in", "دخول", "Connexion"], ["Set a new password", "تعيين كلمة مرور جديدة", "Définir un nouveau mot de passe"], ["You must replace the initial password before continuing.", "يجب استبدال كلمة المرور الأولية قبل المتابعة.", "Vous devez remplacer le mot de passe initial pour continuer."], ["Current password", "كلمة المرور الحالية", "Mot de passe actuel"], ["New password (12+ characters, upper, lower, digit)", "كلمة مرور جديدة (12 حرفاً فأكثر، حرف كبير وصغير ورقم)", "Nouveau mot de passe (12+ caractères, majuscule, minuscule, chiffre)"], ["Change password", "تغيير كلمة المرور", "Changer le mot de passe"], ["Loading…", "جارٍ التحميل…", "Chargement…"], ["overview", "نظرة عامة", "Aperçu"], ["projects", "المشاريع", "Projets"], ["modules", "الوحدات", "Modules"], ["search", "بحث", "Recherche"], ["content", "المحتوى", "Contenu"], ["data", "البيانات", "Données"], ["images", "الصور", "Images"], ["history", "السجل", "Historique"], ["Projects", "المشاريع", "Projets"], ["Published", "منشورة", "Publiés"], ["Drafts", "مسودات", "Brouillons"], ["Modules on", "وحدات مفعّلة", "Modules actifs"], ["Sections", "الأقسام", "Sections"], ["Translations", "الترجمات", "Traductions"], ["Recent activity", "آخر النشاطات", "Activité récente"], ["missing", "ناقص", "manquant"], ["← Back", "← رجوع", "← Retour"], ["Slug", "المعرّف (slug)", "Slug"], ["Status", "الحالة", "Statut"], ["Completed", "مكتمل", "Terminé"], ["In progress", "قيد التطوير", "En cours"], ["Concept", "فكرة", "Concept"], ["Featured", "مميّز", "En vedette"], ["Technologies (comma separated)", "التقنيات (مفصولة بفواصل)", "Technologies (séparées par des virgules)"], ["Repository URL", "رابط المستودع", "URL du dépôt"], ["Live website URL", "رابط الموقع", "URL du site"], ["Image", "الصورة", "Image"], ["None", "بدون", "Aucune"], ["Save project", "حفظ المشروع", "Enregistrer le projet"], ["+ New project", "+ مشروع جديد", "+ Nouveau projet"], ["No projects yet.", "لا توجد مشاريع بعد.", "Aucun projet pour le moment."], ["Publish", "نشر", "Publier"], ["Unpublish", "إلغاء النشر", "Dépublier"], ["Duplicate", "نسخ", "Dupliquer"], ["Delete", "حذف", "Supprimer"], ["Edit", "تعديل", "Modifier"], ["Publish all", "نشر الكل", "Tout publier"], ["title", "العنوان", "Titre"], ["summary", "الملخص", "Résumé"], ["case", "دراسة الحالة", "Étude de cas"], ["Save all languages", "حفظ كل اللغات", "Enregistrer toutes les langues"], ["Edit skills, social links, section order/visibility, colors, SEO, timeline and photo. Invalid values are rejected.", "عدّل المهارات وروابط التواصل وترتيب الأقسام وظهورها والألوان وSEO والجدول الزمني والصورة. القيم غير الصالحة تُرفض.", "Modifiez compétences, liens sociaux, ordre/visibilité des sections, couleurs, SEO, parcours et photo. Les valeurs invalides sont refusées."], ["Upload image (JPG, PNG, WebP, max 4 MB)", "رفع صورة (JPG أو PNG أو WebP، حتى 4 ميغابايت)", "Téléverser une image (JPG, PNG, WebP, 4 Mo max)"], ["No images uploaded yet.", "لا توجد صور مرفوعة بعد.", "Aucune image téléversée."], ["Copy URL", "نسخ الرابط", "Copier l'URL"], ["Backups (created automatically before every change)", "النسخ الاحتياطية (تُنشأ تلقائياً قبل كل تغيير)", "Sauvegardes (créées automatiquement avant chaque modification)"], ["No backups yet.", "لا توجد نسخ احتياطية بعد.", "Aucune sauvegarde."], ["Restore", "استعادة", "Restaurer"], ["Activity", "النشاط", "Activité"], ["Each module is a section on the public site. Turn it on, choose where it appears, and edit its content in every language.", "كل وحدة هي قسم في الموقع. فعّلها، وحدّد مكان ظهورها، وعدّل محتواها بكل اللغات.", "Chaque module est une section du site. Activez-le, choisissez sa place et modifiez son contenu dans chaque langue."], ["← Modules", "← الوحدات", "← Modules"], ["Type", "النوع", "Type"], ["Place after", "ضعه بعد قسم", "Placer après"], ["Title", "العنوان", "Titre"], ["Intro", "المقدمة", "Introduction"], ["Text", "النص", "Texte"], ["Items", "العناصر", "Éléments"], ["Category / tag", "الفئة / الوسم", "Catégorie / étiquette"], ["Badge / date", "الشارة / التاريخ", "Badge / date"], ["+ Add item", "+ إضافة عنصر", "+ Ajouter un élément"], ["Save modules", "حفظ الوحدات", "Enregistrer les modules"], ["+ New module", "+ وحدة جديدة", "+ Nouveau module"], ["On", "مفعّل", "Actif"], ["Remove", "إزالة", "Retirer"], ["Saved.", "تم الحفظ.", "Enregistré."], ["Order updated.", "تم تحديث الترتيب.", "Ordre mis à jour."], ["Published.", "تم النشر.", "Publié."], ["Unpublished.", "أُلغي النشر.", "Dépublié."], ["Duplicated.", "تم النسخ.", "Dupliqué."], ["Deleted.", "تم الحذف.", "Supprimé."], ["Uploaded.", "تم الرفع.", "Téléversé."], ["Image deleted.", "حُذفت الصورة.", "Image supprimée."], ["Restored.", "تمت الاستعادة.", "Restauré."], ["Modules saved.", "تم حفظ الوحدات.", "Modules enregistrés."], ["Delete this project permanently?", "هل تريد حذف المشروع نهائياً؟", "Supprimer définitivement ce projet ?"], ["Delete this image?", "هل تريد حذف هذه الصورة؟", "Supprimer cette image ?"], ["Restore this version? Current content is backed up first.", "استعادة هذه النسخة؟ سيُحفظ المحتوى الحالي أولاً.", "Restaurer cette version ? Le contenu actuel est d'abord sauvegardé."], ["Remove this item?", "إزالة هذا العنصر؟", "Retirer cet élément ?"], ["Delete this module?", "حذف هذه الوحدة؟", "Supprimer ce module ?"], ["Search projects, modules and texts…", "ابحث في المشاريع والوحدات والنصوص…", "Rechercher projets, modules et textes…"], ["No results.", "لا نتائج.", "Aucun résultat."], ["dashboard", "الرئيسية", "Accueil"], ["skills", "المهارات", "Compétences"], ["socials", "التواصل", "Réseaux"], ["inbox", "الرسائل", "Messages"], ["media", "الصور", "Médias"], ["sections", "الأقسام", "Sections"], ["appearance", "المظهر", "Apparence"], ["seo", "SEO", "SEO"], ["account", "الحساب", "Compte"], ["journey", "رحلتي", "Parcours"], ["Projects by status", "المشاريع حسب الحالة", "Projets par statut"], ["Translation coverage", "اكتمال الترجمة", "Couverture des traductions"], ["Quick actions", "إجراءات سريعة", "Actions rapides"], ["Unread", "غير مقروءة", "Non lus"], ["No messages yet.", "لا توجد رسائل بعد.", "Aucun message."], ["Mark read", "تعليم كمقروءة", "Marquer lu"], ["Reply by email", "رد بالبريد", "Répondre par e-mail"], ["Delete this message?", "حذف هذه الرسالة؟", "Supprimer ce message ?"], ["Name", "الاسم", "Nom"], ["Link", "الرابط", "Lien"], ["+ Add account", "+ إضافة حساب", "+ Ajouter un compte"], ["Save", "حفظ", "Enregistrer"], ["Show", "إظهار", "Afficher"], ["Group title", "عنوان المجموعة", "Titre du groupe"], ["Items (comma separated)", "العناصر (مفصولة بفواصل)", "Éléments (séparés par des virgules)"], ["+ Add group", "+ إضافة مجموعة", "+ Ajouter un groupe"], ["Show on site", "يظهر في الموقع", "Visible sur le site"], ["Navy", "الكحلي", "Marine"], ["Royal blue", "الأزرق الملكي", "Bleu roi"], ["Gold", "الذهبي", "Or"], ["Background", "الخلفية", "Arrière-plan"], ["Corner radius (px)", "استدارة الزوايا (px)", "Rayon des coins (px)"], ["Reset to OGM defaults", "استعادة ألوان OGM", "Rétablir les couleurs OGM"], ["Profile photo", "الصورة الشخصية", "Photo de profil"], ["Page title", "عنوان الصفحة", "Titre de la page"], ["Meta description", "وصف الصفحة", "Description de la page"], ["Keywords", "الكلمات المفتاحية", "Mots-clés"], ["Social preview title", "عنوان المعاينة", "Titre d'aperçu"], ["Social preview description", "وصف المعاينة", "Description d'aperçu"], ["Social preview image URL", "رابط صورة المعاينة", "URL de l'image d'aperçu"], ["Canonical URL", "الرابط الأساسي", "URL canonique"], ["Favicon URL", "رابط الأيقونة", "URL du favicon"], ["Allow search engines", "السماح لمحركات البحث", "Autoriser les moteurs de recherche"], ["Password changed.", "تم تغيير كلمة المرور.", "Mot de passe modifié."], ["Restore default content", "استعادة المحتوى الافتراضي", "Rétablir le contenu par défaut"], ["Replaces your saved version of this part with the built-in content. Cannot be undone.", "يستبدل نسختك المحفوظة من هذا الجزء بالمحتوى المدمج. لا يمكن التراجع.", "Remplace votre version enregistrée par le contenu intégré. Action irréversible."], ["Reset this part to default content?", "استعادة هذا الجزء إلى المحتوى الافتراضي؟", "Rétablir cette partie au contenu par défaut ?"], ["Reset done.", "تمت الاستعادة.", "Rétabli."], ["copy", "نصوص الموقع", "Textes du site"], ["timeline", "رحلتي", "Parcours"], ["skills", "المهارات", "Compétences"], ["Welcome", "مرحباً بك في لوحة التحكم", "Bienvenue dans le tableau de bord"], ["Search", "بحث", "Recherche"]];
const D = { ar: {}, fr: {} }; T3.forEach(([e, a, f]) => { D.ar[e] = a; D.fr[e] = f; });
let LNG = 'en'; const tr = (x) => D[LNG]?.[x] || x;
const ov = (v) => (v && typeof v === 'object' ? v : v ? { en: v } : {});
function LangPick() { return <span className="lp">{['en', 'fr', 'ar'].map((x) => <button key={x} aria-pressed={x === LNG} onClick={() => { document.cookie = `lang=${x};path=/;max-age=31536000`; location.reload(); }}>{x.toUpperCase()}</button>)}</span>; }
const L = ['en', 'ar', 'fr'];
const fmt = (t) => new Date(t).toLocaleString();
const mv = (a, i, k) => { const b = [...a]; if (i + k < 0 || i + k >= b.length) return b; [b[i], b[i + k]] = [b[i + k], b[i]]; return b; };
const post = (u, b) => fetch(u, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }).then((r) => r.json()).catch(() => ({ error: 'Network error' }));
const api = (b) => post('/api/admin', b);
const LT = ({ l, setL }) => <p className="lt">{L.map((x) => <button key={x} aria-pressed={x === l} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}</p>;

export default function Admin({ auth, lang }) {
  LNG = lang || 'en';
  const [a, setA] = useState(auth);
  if (!a) return <Login onOk={(r) => setA({ mc: r.mustChange })} />;
  if (a.mc) return <div className="ax-login"><Pw forced onOk={() => setA({ mc: false })} /></div>;
  return <Panel out={async () => { await post('/api/auth', { action: 'logout' }); setA(null); }} />;
}
function Login({ onOk }) {
  const [u, setU] = useState(''), [p, setP] = useState(''), [e, setE] = useState('');
  const go = async (ev) => { ev.preventDefault(); const r = await post('/api/auth', { action: 'login', username: u, password: p }); r.error ? setE(r.error) : onOk(r); };
  return <div className="ax-login"><form className="adm ax-card" onSubmit={go}><div className="lg">ZA</div><h1>{tr('Admin sign in')}</h1><LangPick />
    <label>{tr('Username')}<input value={u} onChange={(x) => setU(x.target.value)} autoComplete="username" required /></label>
    <label>{tr('Password')}<input type="password" value={p} onChange={(x) => setP(x.target.value)} autoComplete="current-password" required /></label>
    {e && <div className="msg" role="alert">{e}</div>}<button className="go">{tr('Sign in')}</button></form></div>;
}
function Pw({ forced, onOk }) {
  const [c, setC] = useState(''), [n, setN] = useState(''), [e, setE] = useState('');
  const go = async (ev) => { ev.preventDefault(); const r = await post('/api/auth', { action: 'password', current: c, next: n }); if (r.error) setE(r.error); else { setC(''); setN(''); setE(''); onOk(); } };
  return <form className="adm ax-card" onSubmit={go}><h1>{tr(forced ? 'Set a new password' : 'Change password')}</h1>{forced && <p>{tr('You must replace the initial password before continuing.')}</p>}
    <label>{tr('Current password')}<input type="password" value={c} onChange={(x) => setC(x.target.value)} autoComplete="current-password" required /></label>
    <label>{tr('New password (12+ characters, upper, lower, digit)')}<input type="password" value={n} onChange={(x) => setN(x.target.value)} autoComplete="new-password" required /></label>
    {e && <div className="msg" role="alert">{e}</div>}<button className="go">{tr('Change password')}</button></form>;
}
const NAV = [['dashboard', '▦'], ['projects', '◧'], ['modules', '▤'], ['content', '✎'], ['skills', '✦'], ['journey', '⟿'], ['socials', '☍'], ['inbox', '✉'], ['media', '▣'], ['sections', '☰'], ['appearance', '◐'], ['seo', '⌕'], ['search', '⌖'], ['account', '⚙']];
function Panel({ out }) {
  const [d, setD] = useState(null), [tab, setTab] = useState('dashboard'), [msg, setMsg] = useState('');
  const load = useCallback(async () => { const r = await api({ action: 'all' }); r.error ? setMsg(r.error) : setD(r); }, []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(''), 4500); return () => clearTimeout(t); }, [msg]);
  const run = async (b, ok = tr('Saved.')) => { const r = await api(b); setMsg(r.error ? 'Error: ' + r.error : ok); if (!r.error) await load(); return r; };
  if (!d) return <div className="ax-load">{msg || tr('Loading…')}</div>;
  const un = d.messages.filter((m) => !m.read).length;
  const V = { dashboard: <Dashboard d={d} go={setTab} />, projects: <Projects d={d} run={run} />, modules: <Modules d={d} run={run} />, content: <Content d={d} run={run} />, skills: <Skills d={d} run={run} />, journey: <Journey d={d} run={run} />,
    socials: <Socials d={d} run={run} />, inbox: <Inbox d={d} run={run} />, media: <Images d={d} load={load} setMsg={setMsg} run={run} />, sections: <SectionsEd d={d} run={run} />, appearance: <Appearance d={d} run={run} />,
    seo: <Seo d={d} run={run} />, search: <Search d={d} go={setTab} />, account: <div><Pw onOk={() => setMsg(tr('Password changed.'))} /><Reset run={run} /></div> };
  return <div className="ax adm"><aside className="ax-side"><div className="brand"><b className="lg">ZA</b>{tr('Dashboard')}</div>
    {NAV.map(([k, i]) => <button key={k} aria-current={k === tab ? 'page' : undefined} onClick={() => setTab(k)}><i>{i}</i>{tr(k)}{k === 'inbox' && un > 0 && <em>{un}</em>}</button>)}</aside>
    <main className="ax-main"><div className="ax-top"><h1>{tr(tab)}</h1><LangPick /><a className="pv" href="/?preview=1" target="_blank" rel="noreferrer">{tr('Preview')} ↗</a><button onClick={out}>{tr('Sign out')}</button></div>
      {msg && <div className="toast" role="status">{msg}</div>}{V[tab]}</main></div>;
}
function Dashboard({ d, go }) {
  const P = d.projects, M = d.content.modules || [], c = d.content.copy, un = d.messages.filter((m) => !m.read).length;
  const st = [['completed', 'Completed'], ['ongoing', 'In progress'], ['concept', 'Concept']].map(([k, t]) => [tr(t), P.filter((p) => p.status === k).length]);
  const keys = Object.keys(c.en).filter((k) => k !== 'education'), mx = Math.max(1, ...st.map((x) => x[1]));
  const cov = L.map((l) => [l.toUpperCase(), Math.round((keys.filter((k) => c[l]?.[k]).length / keys.length) * 100)]);
  const S = [[P.length, 'Projects', 'projects'], [P.filter((p) => p.published).length, 'Published', 'projects'], [M.filter((m) => m.enabled).length, 'Modules on', 'modules'], [un, 'Unread', 'inbox']];
  return <div><p className="hello">{tr('Welcome')}</p><div className="stat-g">{S.map(([n, t, g]) => <button key={t} className="sc" onClick={() => go(g)}><b>{n}</b>{tr(t)}</button>)}</div>
    <div className="ax-2"><div className="card2"><h3>{tr('Projects by status')}</h3>{st.map(([t, n]) => <div className="hb" key={t}><span>{t}</span><div><i style={{ width: (n / mx) * 100 + '%' }} /></div><b>{n}</b></div>)}</div>
      <div className="card2"><h3>{tr('Translation coverage')}</h3>{cov.map(([t, n]) => <div className="hb" key={t}><span>{t}</span><div><i style={{ width: n + '%' }} /></div><b>{n}%</b></div>)}</div></div>
    <div className="card2"><h3>{tr('Quick actions')}</h3><div className="row">{[['projects', '+ New project'], ['modules', 'Save modules'], ['socials', '+ Add account'], ['inbox', 'Unread']].map(([g, t]) => <button key={g} onClick={() => go(g)}>{tr(g)}</button>)}</div></div></div>;
}
function Skills({ d, run }) {
  const [G, setG] = useState(d.content.skills), [l, setL] = useState('en'); const up = (i, p) => setG(G.map((g, k) => (k === i ? { ...g, ...p } : g)));
  return <div><LT l={l} setL={setL} />{G.map((g, i) => <div className="card2" key={i}><div className="row"><button onClick={() => setG(mv(G, i, -1))}>↑</button><button onClick={() => setG(mv(G, i, 1))}>↓</button><button className="bad" onClick={() => confirm(tr('Remove this item?')) && setG(G.filter((_, k) => k !== i))}>{tr('Remove')}</button></div>
    <label>{tr('Group title')} ({l}){!g.cat?.[l] && <em> — {tr('missing')}</em>}<input dir={l === 'ar' ? 'rtl' : 'ltr'} value={g.cat?.[l] || ''} onChange={(e) => up(i, { cat: { ...g.cat, [l]: e.target.value } })} /></label>
    <label>{tr('Items (comma separated)')}<input value={g.items.map((x) => x.name).join(', ')} onChange={(e) => up(i, { items: e.target.value.split(',').map((x) => x.trim()).filter(Boolean).map((name) => ({ name })) })} /></label></div>)}
    <button onClick={() => setG([...G, { cat: {}, items: [] }])}>{tr('+ Add group')}</button> <button className="go" onClick={() => run({ action: 'save', key: 'skills', value: G })}>{tr('Save')}</button></div>;
}
function Journey({ d, run }) {
  const [J, setJ] = useState(d.content.timeline), [l, setL] = useState('en'); const up = (i, p) => setJ(J.map((x, k) => (k === i ? { ...x, ...p } : x)));
  return <div><LT l={l} setL={setL} />{J.map((x, i) => <div className="card2" key={i}><div className="row"><button onClick={() => setJ(mv(J, i, -1))}>↑</button><button onClick={() => setJ(mv(J, i, 1))}>↓</button><button className="bad" onClick={() => confirm(tr('Remove this item?')) && setJ(J.filter((_, k) => k !== i))}>{tr('Remove')}</button></div>
    <label>{tr('Title')} ({l}){!x.label?.[l] && <em> — {tr('missing')}</em>}<input dir={l === 'ar' ? 'rtl' : 'ltr'} value={x.label?.[l] || ''} onChange={(e) => up(i, { label: { ...x.label, [l]: e.target.value } })} /></label>
    <label>{tr('Text')} ({l}){!x.text?.[l] && <em> — {tr('missing')}</em>}<textarea rows={3} dir={l === 'ar' ? 'rtl' : 'ltr'} value={x.text?.[l] || ''} onChange={(e) => up(i, { text: { ...x.text, [l]: e.target.value } })} /></label></div>)}
    <button onClick={() => setJ([...J, { label: {}, text: {} }])}>{tr('+ Add item')}</button> <button className="go" onClick={() => run({ action: 'save', key: 'timeline', value: J })}>{tr('Save')}</button></div>;
}
function Socials({ d, run }) {
  const [S, setS] = useState(d.content.socials); const up = (i, p) => setS(S.map((x, k) => (k === i ? { ...x, ...p } : x)));
  return <div>{S.map((x, i) => <div className="card2 soc-r" key={x.id}><div className="row"><button onClick={() => setS(mv(S, i, -1))}>↑</button><button onClick={() => setS(mv(S, i, 1))}>↓</button>
    <label className="inl"><input type="checkbox" className="sw" checked={!!x.enabled} onChange={(e) => up(i, { enabled: e.target.checked })} /> {tr('Show')}</label><button className="bad" onClick={() => confirm(tr('Remove this item?')) && setS(S.filter((_, k) => k !== i))}>{tr('Remove')}</button></div>
    <div className="row"><label>{tr('Name')}<input value={x.label} onChange={(e) => up(i, { label: e.target.value })} /></label><label>{tr('Link')}<input dir="ltr" placeholder="https://…  /  mailto:you@mail.com" value={x.url} onChange={(e) => up(i, { url: e.target.value })} /></label></div></div>)}
    <button onClick={() => setS([...S, { id: 's' + Date.now().toString(36), label: '', url: '', enabled: true }])}>{tr('+ Add account')}</button> <button className="go" onClick={() => run({ action: 'save', key: 'socials', value: S })}>{tr('Save')}</button></div>;
}
function Inbox({ d, run }) {
  const M = d.messages; const [o, setO] = useState(null);
  if (!M.length) return <p>{tr('No messages yet.')}</p>;
  return <div>{M.map((m) => <div className={'card2 msgc' + (m.read ? '' : ' unr')} key={m.id}><div className="row"><b>{m.name}</b><small dir="ltr">{m.email}</small><small>{fmt(m.at)}</small>{!m.read && <span className="badge2">{tr('Unread')}</span>}</div>
    <p className="pre2">{o === m.id || m.message.length < 160 ? m.message : m.message.slice(0, 160) + '…'}</p>
    <div className="row">{m.message.length >= 160 && <button onClick={() => setO(o === m.id ? null : m.id)}>{o === m.id ? '−' : '+'}</button>}<a className="btn2" href={'mailto:' + m.email}>{tr('Reply by email')}</a>
      <button onClick={() => run({ action: 'readMsg', id: m.id, read: !m.read }, tr('Saved.'))}>{m.read ? tr('Unread') : tr('Mark read')}</button><button className="bad" onClick={() => confirm(tr('Delete this message?')) && run({ action: 'deleteMsg', id: m.id }, tr('Deleted.'))}>{tr('Delete')}</button></div></div>)}</div>;
}
function SectionsEd({ d, run }) {
  const [S, setS] = useState(d.content.sections), c = d.content.copy.en;
  return <div>{S.map((x, i) => <div className="card2 row" key={x.id}><label className="inl"><input type="checkbox" className="sw" checked={x.enabled} onChange={(e) => setS(S.map((y, k) => (k === i ? { ...y, enabled: e.target.checked } : y)))} /> <b>{c['nav_' + x.id] || x.id}</b></label>
    <span className="grow" /><button onClick={() => setS(mv(S, i, -1))}>↑</button><button onClick={() => setS(mv(S, i, 1))}>↓</button></div>)}
    <button className="go" onClick={() => run({ action: 'save', key: 'sections', value: S })}>{tr('Save')}</button></div>;
}
const OGM = { navy: '#0B1953', royal: '#1F4FD8', gold: '#FFC800', bg: '#FFFFFF', radius: '6px' };
function Appearance({ d, run }) {
  const [t, setT] = useState(d.content.theme), [ph, setPh] = useState(d.content.identity?.photo || '/profile.jpg'); const rd = parseInt(t.radius) || 6;
  return <div><div className="row">{[['navy', 'Navy'], ['royal', 'Royal blue'], ['gold', 'Gold'], ['bg', 'Background']].map(([k, n]) => <label key={k}>{tr(n)}<input type="color" value={t[k]} onChange={(e) => setT({ ...t, [k]: e.target.value })} /></label>)}</div>
    <label>{tr('Corner radius (px)')}: {rd}<input type="range" min="0" max="24" value={rd} onChange={(e) => setT({ ...t, radius: e.target.value + 'px' })} /></label>
    <div className="prevb" style={{ background: t.navy, borderRadius: t.radius, borderBottom: '5px solid ' + t.gold }}><b style={{ color: t.gold }}>ZA</b><span style={{ background: t.royal, borderRadius: t.radius }}>Royal</span><span style={{ background: t.gold, color: t.navy, borderRadius: t.radius }}>Gold</span></div>
    <label>{tr('Profile photo')}<select value={ph} onChange={(e) => setPh(e.target.value)}><option value="/profile.jpg">Default</option>{d.media.map((m) => <option key={m.name} value={m.url}>{m.name}</option>)}</select></label>
    <button className="go" onClick={async () => { await run({ action: 'save', key: 'theme', value: t }); await run({ action: 'save', key: 'identity', value: { ...d.content.identity, photo: ph } }); }}>{tr('Save')}</button> <button onClick={() => setT(OGM)}>{tr('Reset to OGM defaults')}</button></div>;
}
function Seo({ d, run }) {
  const [S, setS] = useState(d.content.seo), [l, setL] = useState('en'), v = S[l] || {}, set = (k, x) => setS({ ...S, [l]: { ...v, [k]: x } });
  const F = [['title', 'Page title'], ['description', 'Meta description'], ['keywords', 'Keywords'], ['og_title', 'Social preview title'], ['og_description', 'Social preview description'], ['og_image', 'Social preview image URL'], ['canonical', 'Canonical URL'], ['favicon', 'Favicon URL']];
  return <div><LT l={l} setL={setL} />{F.map(([k, n]) => <label key={k}>{tr(n)}<input dir={l === 'ar' && !k.includes('url') ? 'rtl' : 'ltr'} value={v[k] || ''} onChange={(e) => set(k, e.target.value)} /></label>)}
    <label className="inl"><input type="checkbox" className="sw" checked={v.index !== false} onChange={(e) => set('index', e.target.checked)} /> {tr('Allow search engines')}</label><br /><button className="go" onClick={() => run({ action: 'save', key: 'seo', value: S })}>{tr('Save')}</button></div>;
}
function Reset({ run }) {
  return <div className="card2"><h3>{tr('Restore default content')}</h3><p>{tr('Replaces your saved version of this part with the built-in content. Cannot be undone.')}</p><div className="row">{['copy', 'modules', 'timeline', 'skills'].map((k) => <button key={k} className="bad" onClick={() => confirm(tr('Reset this part to default content?')) && run({ action: 'reset', key: k }, tr('Reset done.'))}>{tr(k)}</button>)}<button className="bad" onClick={() => confirm(tr('Reset this part to default content?')) && run({ action: 'reseedProjects' }, tr('Reset done.'))}>{tr('projects')}</button></div></div>;
}
const blank = { slug: '', status: 'ongoing', published: false, featured: false, data: { title: {}, summary: {}, case: {}, tech: [], repo: '', live: '', image: '' } };
function Projects({ d, run }) {
  const [ed, setEd] = useState(null), [l, setL] = useState('en'); const P = d.projects;
  const move = (i, k) => { const ids = P.map((p) => p.id); [ids[i], ids[i + k]] = [ids[i + k], ids[i]]; run({ action: 'reorder', ids }, tr('Order updated.')); };
  if (ed) { const set = (k, v) => setEd({ ...ed, data: { ...ed.data, [k]: v } }), lang = (k, v) => set(k, { ...ed.data[k], [l]: v });
    return <div><button onClick={() => setEd(null)}>{tr('← Back')}</button>
      <label>{tr('Slug')}<input value={ed.slug} onChange={(e) => setEd({ ...ed, slug: e.target.value })} /></label>
      <div className="row"><label>{tr('Status')}<select value={ed.status} onChange={(e) => setEd({ ...ed, status: e.target.value })}><option value="completed">{tr('Completed')}</option><option value="ongoing">{tr('In progress')}</option><option value="concept">{tr('Concept')}</option><option value="exploring">{tr('Exploring')}</option></select></label>
        <label><input type="checkbox" checked={ed.published} onChange={(e) => setEd({ ...ed, published: e.target.checked })} /> {tr(tr('Published'))}</label>
        <label><input type="checkbox" checked={ed.featured} onChange={(e) => setEd({ ...ed, featured: e.target.checked })} /> {tr('Featured')}</label></div>
      <p>{L.map((x) => <button key={x} aria-pressed={x === l} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}</p>
      {[['title', 1], ['summary', 3], ['case', 8]].map(([k, r]) => <label key={k}>{tr(k)} ({l}){!ed.data[k]?.[l] && <em> — {tr('missing')}</em>}<textarea dir={l === 'ar' ? 'rtl' : 'ltr'} rows={r} value={ed.data[k]?.[l] || ''} onChange={(e) => lang(k, e.target.value)} /></label>)}
      <label>{tr('Technologies (comma separated)')}<input value={(ed.data.tech || []).join(', ')} onChange={(e) => set('tech', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} /></label>
      <label>{tr('Period')}<input value={ed.data.period || ''} onChange={(e) => set('period', e.target.value)} /></label>
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
function Images({ d, load, setMsg, run }) {
  const up = async (ev) => { const f = ev.target.files[0]; if (!f) return; const fd = new FormData(); fd.append('file', f);
    const r = await fetch('/api/admin', { method: 'POST', body: fd }).then((x) => x.json()).catch(() => ({ error: 'Network error' })); setMsg(r.error ? 'Error: ' + r.error : tr('Uploaded.')); ev.target.value = ''; load(); };
  return <div><label>{tr('Upload image (JPG, PNG, WebP, max 4 MB)')}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={up} /></label>
    {d.media.length === 0 && <p>{tr('No images uploaded yet.')}</p>}
    <div className="media">{d.media.map((m) => <div key={m.name}><img src={m.url} alt={m.name} /><small>{m.name}</small>
      <button onClick={() => navigator.clipboard?.writeText(m.url)}>{tr('Copy URL')}</button> <button className="bad" onClick={() => confirm(tr('Delete this image?')) && run({ action: 'deleteMedia', name: m.name }, tr('Image deleted.'))}>{tr('Delete')}</button></div>)}</div></div>;
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
