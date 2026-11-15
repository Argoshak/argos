'use client';
import { useState, useEffect, useRef } from 'react';
import Portal from './Portal';
export default function Projects({ items, labels }) {
  const [f, setF] = useState('all'), [open, setOpen] = useState(null), [ix, setIx] = useState(0), gr = useRef(null), sheet = useRef(null);
  const sts = [...new Set(items.map((p) => p.status))], list = items.filter((p) => f === 'all' || p.status === f), cur = items.find((p) => p.id === open);
  useEffect(() => { if (!open) return; const k = (e) => e.key === 'Escape' && setOpen(null); document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; }; }, [open]);
  const onScroll = (e) => { const el = e.currentTarget, c = el.children[0]; if (c) setIx(Math.round(Math.abs(el.scrollLeft) / (c.offsetWidth + 14))); };
  const go = (k) => gr.current?.children[k]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  const drag = (e) => { const el = sheet.current; if (!el) return; const y0 = e.clientY, t0 = performance.now(); let dy = 0; el.style.transition = 'none';
    const mv = (ev) => { dy = Math.max(0, ev.clientY - y0); el.style.transform = `translateY(${dy}px)`; };
    const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); el.style.transition = 'transform .3s cubic-bezier(.2,.8,.2,1)'; const v = dy / Math.max(1, performance.now() - t0);
      if (dy > 110 || v > 0.6) { try { navigator.vibrate?.(8); } catch {} el.style.transform = 'translateY(105%)'; setTimeout(() => setOpen(null), 230); } else el.style.transform = ''; };
    addEventListener('pointermove', mv); addEventListener('pointerup', up); };
  const Links = ({ p }) => <p className="links">{p.live && <a className="btn p sm" href={p.live} target="_blank" rel="noopener noreferrer">{labels.live} ↗</a>}{p.repo && <a className="btn o sm" href={p.repo} target="_blank" rel="noopener noreferrer">{labels.code}</a>}</p>;
  return <>
    <div className="pills">{['all', ...sts].map((s) => <button key={s} aria-pressed={f === s} onClick={() => { setF(s); setIx(0); }}>{s === 'all' ? labels.all : items.find((p) => p.status === s).statusLabel}</button>)}</div>
    <div className="grid pg" ref={gr} onScroll={onScroll}>{list.map((p) => <article className="card pj rv in" key={p.id}>
      <div className="shot">{p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : <div className="ph" aria-hidden="true"><b>{p.ini}</b></div>}</div>
      <h3>{p.title} <span className="badge">{p.statusLabel}</span></h3>{p.period && <small className="per">{p.period}</small>}<p>{p.summary}</p>
      <ul className="chips">{p.tech.map((x) => <li key={x}>{x}</li>)}</ul>
      <p className="links">{p.case && <button className="btn p sm" onClick={() => setOpen(p.id)}>{labels.case}</button>}{p.live && <a className="btn o sm" href={p.live} target="_blank" rel="noopener noreferrer">{labels.live} ↗</a>}</p></article>)}</div>
    <div className="dots" role="tablist" aria-label="Projects">{list.map((p, k) => <button key={p.id} className={k === ix ? 'on' : ''} aria-label={p.title} onClick={() => go(k)} />)}<span className="cnt">{String(Math.min(ix + 1, list.length)).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span></div>
    {cur && <Portal><div className="modal sheet" role="dialog" aria-modal="true" aria-label={cur.title} onClick={(e) => e.target === e.currentTarget && setOpen(null)}><div className="mbox" ref={sheet}>
      <div className="grab" onPointerDown={drag} aria-hidden="true" />
      <button className="mx" onClick={() => setOpen(null)} aria-label="Close">×</button>{cur.image && <div className="shot"><img src={cur.image} alt={cur.title} /></div>}
      <h3>{cur.title} <span className="badge">{cur.statusLabel}</span></h3>{cur.period && <small className="per">{cur.period}</small>}<p className="pre">{cur.case}</p>
      <ul className="chips">{cur.tech.map((x) => <li key={x}>{x}</li>)}</ul><Links p={cur} /></div></div></Portal>}
  </>;
}
