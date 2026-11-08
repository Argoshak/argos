'use client';
import { useState, useEffect, useRef } from 'react';
const PH = { en: ['Search the site…', 'No results'], ar: ['ابحث في الموقع…', 'لا نتائج'], fr: ['Rechercher…', 'Aucun résultat'] };
export default function Quick({ entries, lang }) {
  const [o, setO] = useState(false), [q, setQ] = useState(''), r = useRef(null), t = PH[lang] || PH.en;
  useEffect(() => { const k = (e) => { if (e.key === 'Escape') setO(false); if (e.key === '/' && !/input|textarea/i.test(e.target.tagName)) { e.preventDefault(); setO(true); } }; document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, []);
  useEffect(() => { if (o) r.current?.focus(); }, [o]);
  const n = q.trim().toLowerCase(), hits = (n ? entries.filter((e) => (e.t + ' ' + e.s).toLowerCase().includes(n)) : entries).slice(0, 30);
  const go = (id) => { setO(false); setQ(''); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return <><button className="qb" onClick={() => setO(true)} aria-label={t[0]}>⌕</button>{o && <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setO(false)}><div className="mbox qbox">
    <input ref={r} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t[0]} aria-label={t[0]} /><ul>{hits.map((h, i) => <li key={i}><button onClick={() => go(h.id)}><b>{h.t}</b>{h.s && <small>{h.s}</small>}</button></li>)}{!hits.length && <li className="nr">{t[1]}</li>}</ul></div></div>}</>;
}
