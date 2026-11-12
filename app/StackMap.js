'use client';
import { useEffect, useRef, useState } from 'react';
const EDGES = [['JavaScript', 'React'], ['JavaScript', 'TypeScript'], ['TypeScript', 'Next.js'], ['React', 'Next.js'], ['Tailwind CSS', 'Next.js'], ['CSS3', 'Tailwind CSS'], ['HTML', 'CSS3'], ['Next.js', 'Supabase'], ['Supabase', 'PostgreSQL'], ['SQL', 'PostgreSQL'], ['Next.js', 'Vercel'], ['GitHub', 'Vercel'], ['Git', 'GitHub'], ['Cursor', 'Claude'], ['Cursor', 'Git'], ['Arch Linux', 'Fedora'], ['FreeBSD', 'Oracle Solaris 11.4'], ['Oracle Solaris 11.4', 'illumos'], ['LumaOS kernel work', 'Linux app compatibility'], ['Linux app compatibility', 'FreeBSD'], ['LumaOS kernel work', 'FreeBSD']];
export default function StackMap({ nodes, avatar, hint, label }) {
  const cv = useRef(null), [tip, setTip] = useState(null);
  useEffect(() => {
    const c = cv.current, ctx = c.getContext('2d'), reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    const groups = [...new Set(nodes.map((n) => n.g))], N = nodes.map((n) => ({ ...n, x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 })), by = Object.fromEntries(N.map((n) => [n.id, n]));
    const E = EDGES.filter(([a, b]) => by[a] && by[b]).map(([a, b]) => [by[a], by[b]]);
    let W = 0, H = 0, dpr = 1, raf = 0, hover = null, drag = null, mouse = { x: -999, y: -999 }, vis = true, col = {}, fr = 0;
    const img = new Image(); img.src = avatar;
    const FONT = '500 12px "JetBrains Mono",ui-monospace,monospace';
    const toRight = (x, tw) => { const outR = x >= W / 2, fitR = x + 10 + tw < W - 6, fitL = x - 10 - tw > 6; return outR ? fitR || !fitL : !fitL && fitR; };
    const spread = () => { ctx.font = FONT; const bx = N.map((n) => { const tw = ctx.measureText(n.t).width, r = toRight(n.ax, tw); return r ? [n.ax - 8, n.ax + 10 + tw] : [n.ax - 10 - tw, n.ax + 8]; });
      for (let it = 0; it < 120; it++) for (let i = 0; i < N.length; i++) for (let j = i + 1; j < N.length; j++) { if (bx[i][1] < bx[j][0] || bx[j][1] < bx[i][0]) continue; const dy = N[j].ay - N[i].ay, ad = Math.abs(dy); if (ad >= 17) continue; const push = (17 - ad) / 2 + 0.5, sg = dy >= 0 ? 1 : -1; N[i].ay -= sg * push; N[j].ay += sg * push; }
      N.forEach((n) => { n.ay = Math.min(H - 30, Math.max(16, n.ay)); }); };
    const layout = () => { const L = N.length, no = Math.ceil(L / 2), ni = L - no; N.forEach((n, i) => { const outer = i % 2 === 0, k = i >> 1, cnt = outer ? no : ni, a = (k / cnt) * Math.PI * 2 - Math.PI / 2 + (outer ? 0 : Math.PI / cnt), rx = W * (outer ? 0.34 : 0.19), ry = H * (outer ? 0.39 : 0.22); n.ax = W / 2 + Math.cos(a) * rx; n.ay = H / 2 + Math.sin(a) * ry; if (!n.x) { n.x = n.ax; n.y = n.ay; } }); spread(); N.forEach((n) => { if (!n.y || Math.abs(n.y - n.ay) > H) n.y = n.ay; }); };
    const size = () => { dpr = Math.min(2, devicePixelRatio || 1); W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); layout(); };
    const colors = () => { const s = getComputedStyle(c); col = { gold: s.getPropertyValue('--gold').trim() || '#FFC800', ink: s.getPropertyValue('--ink').trim() || '#fff' }; };
    const nb = (n) => new Set(E.filter(([a, b]) => a.id === n || b.id === n).flatMap(([a, b]) => [a.id, b.id]));
    const draw = () => {
      if (++fr % 40 === 1) colors();
      ctx.clearRect(0, 0, W, H); const hn = hover || drag, near = hn ? nb(hn) : null;
      ctx.lineWidth = 1; E.forEach(([a, b]) => { const on = hn && (a.id === hn || b.id === hn); ctx.strokeStyle = on ? col.gold : col.ink; ctx.globalAlpha = on ? 0.95 : hn ? 0.05 : 0.3; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
      const r = Math.min(W, H) * 0.075; ctx.globalAlpha = 1; ctx.save(); ctx.beginPath(); ctx.arc(W / 2, H / 2, r, 0, 7); ctx.clip(); if (img.complete && img.naturalWidth) ctx.drawImage(img, W / 2 - r, H / 2 - r, r * 2, r * 2); ctx.restore();
      ctx.strokeStyle = col.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(W / 2, H / 2, r + 3, 0, 7); ctx.stroke();
      ctx.font = FONT; ctx.textBaseline = 'middle';
      N.forEach((n) => { const on = n.id === hn, rel = near && near.has(n.id), dim = hn && !on && !rel; ctx.globalAlpha = dim ? 0.25 : 1; ctx.fillStyle = on || rel ? col.gold : col.ink; ctx.beginPath(); ctx.arc(n.x, n.y, on ? 6.5 : 4, 0, 7); ctx.fill(); if (on) { ctx.strokeStyle = col.gold; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(n.x, n.y, 12, 0, 7); ctx.stroke(); }
        ctx.fillStyle = on ? col.gold : col.ink; const tw = ctx.measureText(n.t).width, rr = toRight(n.x, tw); ctx.direction = /[\u0600-\u06FF]/.test(n.t) ? 'rtl' : 'ltr'; ctx.textAlign = rr ? 'left' : 'right'; ctx.fillText(n.t, n.x + (rr ? 10 : -10), n.y); });
      ctx.globalAlpha = 1;
    };
    const step = () => { if (vis) { const t = performance.now() / 1000, hn = hover || drag, H0 = hn ? by[hn] : null, near = hn ? nb(hn) : null;
      N.forEach((n, i) => { if (n.id === drag) return; if (reduce) { n.x = n.ax; n.y = n.ay; return; } let tx = n.ax, ty = n.ay;
        if (n.id === hn) { n.vx *= 0.4; n.vy *= 0.4; } else { tx += Math.sin(t * 0.8 + i * 1.7) * 3; ty += Math.cos(t * 0.7 + i * 2.3) * 3; if (near && near.has(n.id)) { tx += (H0.ax - n.ax) * 0.1; ty += (H0.ay - n.ay) * 0.1; } }
        n.vx += (tx - n.x) * 0.07; n.vy += (ty - n.y) * 0.07; n.vx *= 0.8; n.vy *= 0.8; n.x += n.vx; n.y += n.vy; }); draw(); } raf = requestAnimationFrame(step); };
    const pick = (x, y) => { let b = null, bd = 26; N.forEach((n) => { const d = Math.hypot(n.x - x, n.y - y); if (d < bd) { bd = d; b = n; } }); return b; };
    const pos = (e) => { const r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const show = (p) => setTip(p ? { n: p, x: Math.min(Math.max(p.x, 90), W - 90), y: p.y } : null);
    const move = (e) => { const [x, y] = pos(e); mouse = e.pointerType === 'mouse' ? { x, y } : { x: -999, y: -999 }; if (drag) { const n = by[drag]; n.x = x; n.y = y; n.vx = n.vy = 0; } const p = pick(x, y); hover = p ? p.id : null; c.style.cursor = p ? 'grab' : 'default'; show(p); };
    const down = (e) => { const [x, y] = pos(e), p = pick(x, y); if (p && e.pointerType !== 'touch') { drag = p.id; c.setPointerCapture(e.pointerId); } else if (p) { hover = p.id; show(p); } };
    const up = () => { drag = null; };
    const dbl = (e) => { const [x, y] = pos(e); if (pick(x, y)) document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' }); };
    const leave = () => { mouse = { x: -999, y: -999 }; if (!drag) { hover = null; setTip(null); } };
    c.addEventListener('pointermove', move); c.addEventListener('pointerdown', down); c.addEventListener('pointerup', up); c.addEventListener('pointerleave', leave); c.addEventListener('dblclick', dbl);
    const ro = new ResizeObserver(size); ro.observe(c); const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); io.observe(c); size(); colors(); step();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); c.removeEventListener('pointermove', move); c.removeEventListener('pointerdown', down); c.removeEventListener('pointerup', up); c.removeEventListener('pointerleave', leave); c.removeEventListener('dblclick', dbl); };
  }, [nodes, avatar]);
  return <div className="mapwrap"><canvas ref={cv} className="mapcv" role="img" aria-label={label} />{tip && <div className="mtip" style={{ left: tip.x, top: tip.y }}><b>{tip.n.t}</b><small>{tip.n.g}</small>{tip.n.d && <span>{tip.n.d}</span>}</div>}<p className="mhint">{hint}</p></div>;
}
