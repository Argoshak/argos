'use client';
import { useState, useEffect, useRef } from 'react';
import Portal from './Portal';
const T = { en: { ph: 'Search sections, projects, actions…', no: 'No results', act: 'Actions', go: 'Go to', th: 'Toggle light / dark', top: 'Back to top', lang: 'Switch language' }, ar: { ph: 'ابحث في الأقسام والمشاريع والإجراءات…', no: 'لا نتائج', act: 'إجراءات', go: 'انتقل إلى', th: 'تبديل الفاتح / الداكن', top: 'العودة للأعلى', lang: 'تغيير اللغة' }, fr: { ph: 'Rechercher sections, projets, actions…', no: 'Aucun résultat', act: 'Actions', go: 'Aller à', th: 'Basculer clair / sombre', top: 'Haut de page', lang: 'Changer de langue' } };
export default function Quick({ entries, lang }) {
  const [o, setO] = useState(false), [q, setQ] = useState(''), [i, setI] = useState(0), r = useRef(null), t = T[lang] || T.en;
  const setLang = (l) => { document.cookie = `lang=${l};path=/;max-age=31536000;samesite=lax`; location.reload(); };
  const acts = [{ t: t.th, s: t.act, f: () => document.getElementById('th')?.click() }, { t: t.top, s: t.act, f: () => scrollTo({ top: 0, behavior: 'smooth' }) }, ...['en', 'fr', 'ar'].filter((l) => l !== lang).map((l) => ({ t: `${t.lang}: ${l.toUpperCase()}`, s: t.act, f: () => setLang(l) }))];
  const n = q.trim().toLowerCase(), pool = [...acts, ...entries.map((e) => ({ t: e.t, s: e.s || t.go, f: () => document.getElementById(e.id)?.scrollIntoView({ behavior: 'smooth' }) }))];
  const hits = (n ? pool.filter((e) => (e.t + ' ' + e.s).toLowerCase().includes(n)) : pool).slice(0, 40);
  const run = (h) => { setO(false); setQ(''); setI(0); h?.f(); };
  useEffect(() => { const k = (e) => { if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !/input|textarea/i.test(e.target.tagName))) { e.preventDefault(); setO(true); } if (e.key === 'Escape') setO(false); }; document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, []);
  useEffect(() => { if (o) r.current?.focus(); }, [o]);
  const key = (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => Math.min(hits.length - 1, x + 1)); } if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => Math.max(0, x - 1)); } if (e.key === 'Enter') run(hits[i]); };
  return <><button className="qb" onClick={() => setO(true)} aria-label={t.ph}>⌕<span className="kbd">Ctrl K</span></button>{o && <Portal><div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setO(false)}><div className="mbox qbox">
    <input ref={r} value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={key} placeholder={t.ph} aria-label={t.ph} />
    <ul>{hits.map((h, k) => <li key={k}><button className={k === i ? 'sel' : ''} onMouseEnter={() => setI(k)} onClick={() => run(h)}><b>{h.t}</b><small>{h.s}</small></button></li>)}{!hits.length && <li className="nr">{t.no}</li>}</ul></div></div></Portal>}</>;
}
