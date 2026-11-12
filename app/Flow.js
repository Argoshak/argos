'use client';
import { useState, useEffect } from 'react';
const NODES = { b: [20, 150, 'Browser · PWA'], m: [250, 150, 'Middleware'], a: [480, 150, 'Next.js server'], au: [710, 40, 'Supabase Auth'], d: [710, 150, 'PostgreSQL · RLS'], s: [480, 290, 'Sheets API'], st: [710, 290, 'Storage'], c: [250, 290, 'Vercel Cron'] };
const EDGES = { 'b-m': 'b>m', 'm-a': 'm>a', 'a-au': 'a>au', 'a-d': 'a>d', 'a-s': 'a>s', 'c-a': 'c>a', 'a-st': 'a>st' };
const STEPS = [{ n: ['b', 'm'], e: ['b-m'] }, { n: ['m'], e: ['b-m'] }, { n: ['a', 'au'], e: ['m-a', 'a-au'] }, { n: ['d'], e: ['a-d'] }, { n: ['s', 'b'], e: ['a-s'] }, { n: ['c', 'st'], e: ['c-a', 'a-st'] }, { n: ['b'], e: [] }];
const W = 170, H = 56, ctr = (k, side) => { const [x, y] = NODES[k]; return side === 'r' ? [x + W, y + H / 2] : side === 'l' ? [x, y + H / 2] : side === 't' ? [x + W / 2, y] : [x + W / 2, y + H]; };
const path = (id) => { const [a, b] = EDGES[id].split('>'), [ax, ay] = NODES[a], [bx, by] = NODES[b]; const p = ay === by ? [ctr(a, ax < bx ? 'r' : 'l'), ctr(b, ax < bx ? 'l' : 'r')] : [ctr(a, ay < by ? 'b' : 't'), ctr(b, ay < by ? 't' : 'b')]; return `M${p[0][0]},${p[0][1]} L${p[1][0]},${p[1][1]}`; };
export default function Flow({ items }) {
  const [a, setA] = useState(0), [auto, setAuto] = useState(true), it = items[a], st = STEPS[a] || STEPS[0];
  useEffect(() => { if (!auto) return; const t = setInterval(() => setA((x) => (x + 1) % items.length), 4500); return () => clearInterval(t); }, [auto, items.length]);
  if (!it) return null;
  return <div className="flow"><div className="flow-svg"><svg viewBox="0 0 900 370" role="img" aria-label={it.t}>
    {Object.keys(EDGES).map((id) => { const on = st.e.includes(id); return <g key={id}><path d={path(id)} className={on ? 'fe on' : 'fe'} />{on && <circle r="6" className="pk"><animateMotion dur="1.4s" repeatCount="indefinite" path={path(id)} /></circle>}</g>; })}
    {Object.entries(NODES).map(([k, [x, y, t]]) => <g key={k} className={st.n.includes(k) ? 'fn on' : 'fn'}><rect x={x} y={y} width={W} height={H} rx="14" /><text x={x + W / 2} y={y + H / 2 + 6} textAnchor="middle">{t}</text></g>)}</svg></div>
    <div className="flow-steps">{items.map((x, k) => <button key={k} aria-pressed={k === a} onClick={() => { setAuto(false); setA(k); }}><b>{k + 1}</b><span>{x.t}</span></button>)}</div>
    <div className="panel" key={a} aria-live="polite"><span className="num">{String(a + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><h3>{it.t}</h3><p>{it.x}</p></div></div>;
}
