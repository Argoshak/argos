'use client';
import { useEffect } from 'react';
export default function Fx() {
  useEffect(() => {
    const d = document, h = d.documentElement, fine = matchMedia('(hover:hover) and (pointer:fine)').matches, reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    h.classList.add('js');
    try { h.dataset.theme = localStorage.getItem('th') || 'dark'; } catch {}
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -4% 0px' });
    const watch = (root) => root.querySelectorAll?.('.rv:not(.in)').forEach((el) => io.observe(el));
    watch(d); const mo = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.matches?.('.rv:not(.in)')) io.observe(n); watch(n); } }))); mo.observe(d.body, { childList: true, subtree: true });
    const safety = setTimeout(() => d.querySelectorAll('.rv:not(.in)').forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('in'); }), 1200);
    const co = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; co.unobserve(e.target); const el = e.target, to = +el.dataset.count; let t0; const step = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }));
    d.querySelectorAll('[data-count]').forEach((el) => { el.textContent = '0'; co.observe(el); });
    const secs = [...d.querySelectorAll('section[id]')], links = [...d.querySelectorAll('nav a, .rail a')], pg = d.getElementById('pg'), up = d.getElementById('up');
    const onS = () => { const y = h.scrollTop; pg.style.width = (y / ((h.scrollHeight - h.clientHeight) || 1)) * 100 + '%'; up.classList.toggle('show', y > 600);
      let cur = ''; secs.forEach((s) => { if (s.offsetTop - 140 <= y) cur = s.id; }); links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
      d.querySelectorAll('.tl').forEach((tl) => { const r = tl.getBoundingClientRect(); tl.style.setProperty('--p', Math.max(0, Math.min(1, (innerHeight * 0.62 - r.top) / r.height))); tl.querySelectorAll('li').forEach((li) => li.classList.toggle('lit', li.getBoundingClientRect().top < innerHeight * 0.62)); }); };
    let tick = false, settle = 0; const sweep = () => d.querySelectorAll('.rv:not(.in)').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 1.05) el.classList.add('in'); });
    const sc = () => { clearTimeout(settle); settle = setTimeout(sweep, 140); if (!tick) { tick = true; requestAnimationFrame(() => { onS(); tick = false; }); } };
    addEventListener('scroll', sc, { passive: true }); onS();
    // pointer effects (mouse only): card spotlight + 3D tilt, hero spotlight, magnetic buttons, cursor ring
    let ring = null, cx = -100, cy = -100, px = -100, py = -100, raf = 0, tilted = null, mag = null;
    if (fine && !reduce) { ring = d.createElement('div'); ring.id = 'cur'; d.body.appendChild(ring); const loop = () => { cx += (px - cx) * 0.22; cy += (py - cy) * 0.22; ring.style.transform = `translate3d(${cx - 18}px,${cy - 18}px,0)`; raf = requestAnimationFrame(loop); }; loop(); }
    const reset = (el) => { if (el) { el.style.transform = ''; el.style.transition = ''; } };
    const pm = (e) => { if (e.pointerType !== 'mouse') return; px = e.clientX; py = e.clientY; const t = e.target; if (!t.closest) return;
      const cd = t.closest('.card'); if (cd) { const r = cd.getBoundingClientRect(); cd.style.setProperty('--mx', e.clientX - r.left + 'px'); cd.style.setProperty('--my', e.clientY - r.top + 'px');
        if (fine && !reduce && !cd.classList.contains('cc')) { if (tilted && tilted !== cd) reset(tilted); tilted = cd; const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; cd.style.transition = 'transform .12s ease-out'; cd.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`; } }
      else if (tilted) { reset(tilted); tilted = null; }
      const hr = t.closest('.hero'); if (hr) { const r = hr.getBoundingClientRect(); hr.style.setProperty('--hx', e.clientX - r.left + 'px'); hr.style.setProperty('--hy', e.clientY - r.top + 'px'); }
      const mb = fine && !reduce ? t.closest('.cta .btn') : null; if (mag && mag !== mb) { reset(mag); mag = null; } if (mb) { mag = mb; const r = mb.getBoundingClientRect(); mb.style.transition = 'transform .15s ease-out'; mb.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`; }
      if (ring) ring.classList.toggle('big', !!t.closest('a,button,summary,.card,input,textarea,.mapcv,.plate')); };
    d.addEventListener('pointermove', pm, { passive: true });
    const out = () => { reset(tilted); tilted = null; reset(mag); mag = null; if (ring) ring.style.opacity = 0; }, inn = () => { if (ring) ring.style.opacity = 1; };
    d.documentElement.addEventListener('mouseleave', out); d.documentElement.addEventListener('mouseenter', inn);
    const click = (e) => { if (e.target.closest('#bg')) d.body.classList.toggle('menu'); if (e.target.closest('nav a')) d.body.classList.remove('menu');
      if (e.target.closest('#th')) { const t = h.dataset.theme === 'dark' ? 'light' : 'dark'; h.dataset.theme = t; try { localStorage.setItem('th', t); } catch {} } };
    d.addEventListener('click', click);
    const cy2 = d.querySelector('.cycle'), w = (cy2?.dataset.words || '').split('|'); let i = 0;
    const iv = cy2 && w.length > 1 && setInterval(() => { cy2.classList.add('sw'); setTimeout(() => { i = (i + 1) % w.length; cy2.textContent = w[i]; cy2.classList.remove('sw'); }, 250); }, 2200);
    return () => { removeEventListener('scroll', sc); d.removeEventListener('click', click); d.removeEventListener('pointermove', pm); d.documentElement.removeEventListener('mouseleave', out); d.documentElement.removeEventListener('mouseenter', inn); io.disconnect(); co.disconnect(); mo.disconnect(); clearTimeout(safety); clearTimeout(settle); cancelAnimationFrame(raf); ring?.remove(); if (iv) clearInterval(iv); };
  }, []);
  return null;
}
