'use client';
import { useState } from 'react';
export function Steps({ items }) {
  const [a, setA] = useState(0); const it = items[a]; if (!it) return null;
  return <div className="stp"><div className="bar"><i style={{ width: ((a + 1) / items.length) * 100 + '%' }} /></div>
    <div className="stp-g"><ol>{items.map((x, k) => <li key={k}><button aria-pressed={k === a} onClick={() => setA(k)}><b>{k + 1}</b>{x.t}</button></li>)}</ol>
      <div className="panel" key={a} aria-live="polite"><span className="num">{String(a + 1).padStart(2, '0')}</span><h3>{it.t}</h3><p>{it.x}</p></div></div></div>;
}
export function Explorer({ items, all }) {
  const cats = [...new Set(items.map((i) => i.tag).filter(Boolean))]; const [c, setC] = useState('all'), [s, setS] = useState(null);
  const list = items.filter((i) => c === 'all' || i.tag === c), cur = list.find((i) => i.t === s) || list[0]; if (!cur) return null;
  return <div><div className="pills">{['all', ...cats].map((k) => <button key={k} aria-pressed={k === c} onClick={() => { setC(k); setS(null); }}>{k === 'all' ? all : k}</button>)}</div>
    <ul className="chips big">{list.map((i) => <li key={i.t}><button aria-pressed={cur.t === i.t} onClick={() => setS(i.t)}>{i.t}</button></li>)}</ul>
    <div className="panel" key={cur.t} aria-live="polite"><h3>{cur.t} {cur.tag && <span className="badge">{cur.tag}</span>}</h3><p>{cur.x}</p></div></div>;
}
