'use client';
import { useState, useEffect } from 'react';
export default function Projects({ items, labels }) {
  const [f, setF] = useState('all'), [open, setOpen] = useState(null);
  const sts = [...new Set(items.map((p) => p.status))], list = items.filter((p) => f === 'all' || p.status === f), cur = items.find((p) => p.id === open);
  useEffect(() => { if (!open) return; const k = (e) => e.key === 'Escape' && setOpen(null); document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; }; }, [open]);
  const Links = ({ p }) => <p className="links">{p.live && <a className="btn p sm" href={p.live} target="_blank" rel="noopener noreferrer">{labels.live} ↗</a>}{p.repo && <a className="btn o sm" href={p.repo} target="_blank" rel="noopener noreferrer">{labels.code}</a>}</p>;
  return <>
    <div className="pills">{['all', ...sts].map((s) => <button key={s} aria-pressed={f === s} onClick={() => setF(s)}>{s === 'all' ? labels.all : items.find((p) => p.status === s).statusLabel}</button>)}</div>
    <div className="grid">{list.map((p) => <article className="card pj rv in" key={p.id}>
      {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : <div className="ph" aria-hidden="true"><b>{p.ini}</b></div>}
      <h3>{p.title} <span className="badge">{p.statusLabel}</span></h3>{p.period && <small className="per">{p.period}</small>}<p>{p.summary}</p>
      <ul className="chips">{p.tech.map((x) => <li key={x}>{x}</li>)}</ul>
      <p className="links">{p.case && <button className="btn p sm" onClick={() => setOpen(p.id)}>{labels.case}</button>}{p.live && <a className="btn o sm" href={p.live} target="_blank" rel="noopener noreferrer">{labels.live} ↗</a>}</p></article>)}</div>
    {cur && <div className="modal" role="dialog" aria-modal="true" aria-label={cur.title} onClick={(e) => e.target === e.currentTarget && setOpen(null)}><div className="mbox">
      <button className="mx" onClick={() => setOpen(null)} aria-label="Close">×</button>{cur.image && <img src={cur.image} alt={cur.title} />}
      <h3>{cur.title} <span className="badge">{cur.statusLabel}</span></h3>{cur.period && <small className="per">{cur.period}</small>}<p className="pre">{cur.case}</p>
      <ul className="chips">{cur.tech.map((x) => <li key={x}>{x}</li>)}</ul><Links p={cur} /></div></div>}
  </>;
}
