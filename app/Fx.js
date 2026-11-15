'use client';
import { useEffect } from 'react';
const GL = '01<>/{}[]#$%&*+=?', RIP = '.btn,.pills button,.stack button,.flow-steps button,.dock a,.dock button,.plate,.stp ol button,.chips.big button,.qb,#th,.lang button,#bg,.mx,.dots button';
export default function Fx() {
  useEffect(() => {
    const d = document, h = d.documentElement, mq = (q) => matchMedia(q).matches, fine = mq('(hover:hover) and (pointer:fine)'), coarse = mq('(pointer:coarse)'), reduce = mq('(prefers-reduced-motion:reduce)'), ar = h.lang === 'ar';
    h.classList.add('js');
    let theme = 'dark'; try { theme = localStorage.getItem('th') || 'dark'; } catch {} h.dataset.theme = theme; d.getElementById('th')?.setAttribute('aria-checked', String(theme === 'dark'));
    const vib = (p) => { if (!reduce && coarse) try { navigator.vibrate?.(p); } catch {} };
    const scramble = (el) => { if (!el || ar || reduce) return; const fin = el.textContent; let f = 0; const iv = setInterval(() => { f++; const k = Math.floor((f / 14) * fin.length); el.textContent = fin.split('').map((c, i) => (c === ' ' || i < k ? c : GL[Math.floor(Math.random() * GL.length)])).join(''); if (f >= 14) { clearInterval(iv); el.textContent = fin; } }, 32); };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); if (e.target.classList.contains('hd')) scramble(e.target.querySelector('h2')); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -4% 0px' });
    const watch = (root) => root.querySelectorAll?.('.rv:not(.in)').forEach((el) => io.observe(el));
    watch(d); const mo = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.matches?.('.rv:not(.in)')) io.observe(n); watch(n); } }))); mo.observe(d.body, { childList: true, subtree: true });
    const safety = setTimeout(() => d.querySelectorAll('.rv:not(.in)').forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('in'); }), 1200);
    const co = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; co.unobserve(e.target); const el = e.target, to = +el.dataset.count; let t0; const step = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }));
    d.querySelectorAll('[data-count]').forEach((el) => { el.textContent = '0'; co.observe(el); });
    const secs = [...d.querySelectorAll('section[id]')], links = [...d.querySelectorAll('nav a, .rail a, .dock a')], pg = d.getElementById('pg'), up = d.getElementById('up'), hero = d.querySelector('.hero');
    const onS = () => { const y = h.scrollTop; pg.style.width = (y / ((h.scrollHeight - h.clientHeight) || 1)) * 100 + '%'; up.classList.toggle('show', y > 600); if (hero && y < 1100 && !reduce) hero.style.setProperty('--sy', y + 'px');
      let cur = ''; secs.forEach((s) => { if (s.offsetTop - 140 <= y) cur = s.id; }); links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + cur || (y < 200 && a.getAttribute('href') === '#top')));
      d.querySelectorAll('.tl').forEach((tl) => { const r = tl.getBoundingClientRect(); tl.style.setProperty('--p', Math.max(0, Math.min(1, (innerHeight * 0.62 - r.top) / r.height))); tl.querySelectorAll('li').forEach((li) => li.classList.toggle('lit', li.getBoundingClientRect().top < innerHeight * 0.62)); }); };
    let tick = false, settle = 0; const sweep = () => d.querySelectorAll('.rv:not(.in)').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 1.05) el.classList.add('in'); });
    const sc = () => { clearTimeout(settle); settle = setTimeout(sweep, 140); if (!tick) { tick = true; requestAnimationFrame(() => { onS(); tick = false; }); } };
    addEventListener('scroll', sc, { passive: true }); onS();
    let ring = null, cx = -100, cy = -100, px = -100, py = -100, raf = 0, tilted = null, mag = null;
    if (fine && !reduce) { ring = d.createElement('div'); ring.id = 'cur'; d.body.appendChild(ring); const loop = () => { cx += (px - cx) * 0.22; cy += (py - cy) * 0.22; ring.style.transform = `translate3d(${cx - 18}px,${cy - 18}px,0)`; raf = requestAnimationFrame(loop); }; loop(); }
    const reset = (el) => { if (el) { el.style.transform = ''; el.style.transition = ''; } };
    const pm = (e) => { if (e.pointerType !== 'mouse') return; px = e.clientX; py = e.clientY; const t = e.target; if (!t.closest) return;
      const cd = t.closest('.card'); if (cd) { const r = cd.getBoundingClientRect(); cd.style.setProperty('--mx', e.clientX - r.left + 'px'); cd.style.setProperty('--my', e.clientY - r.top + 'px');
        if (fine && !reduce && !cd.classList.contains('cc')) { if (tilted && tilted !== cd) reset(tilted); tilted = cd; const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; cd.style.transition = 'transform .12s ease-out'; cd.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`; } }
      else if (tilted) { reset(tilted); tilted = null; }
      const sh = t.closest('.shot'); if (sh) { const r = sh.getBoundingClientRect(); sh.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5) * 2); sh.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5) * 2); }
      const hr = t.closest('.hero'); if (hr) { const r = hr.getBoundingClientRect(); hr.style.setProperty('--hx', e.clientX - r.left + 'px'); hr.style.setProperty('--hy', e.clientY - r.top + 'px'); }
      const mb = fine && !reduce ? t.closest('.cta .btn.s') : null; if (mag && mag !== mb) { reset(mag); mag = null; } if (mb) { mag = mb; const r = mb.getBoundingClientRect(); mb.style.transition = 'transform .15s ease-out'; mb.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`; }
      if (ring) ring.classList.toggle('big', !!t.closest('a,button,summary,.card,input,textarea,.mapcv,.plate')); };
    d.addEventListener('pointermove', pm, { passive: true });
    const pd = (e) => { const t = e.target.closest?.(RIP); if (!t) return; vib(8); if (reduce) return; const r = t.getBoundingClientRect(), s = d.createElement('span'); s.className = 'rip'; s.style.left = e.clientX - r.left + 'px'; s.style.top = e.clientY - r.top + 'px'; t.classList.add('rip-host'); t.appendChild(s); setTimeout(() => s.remove(), 650); };
    d.addEventListener('pointerdown', pd, { passive: true });
    const out = () => { reset(tilted); tilted = null; reset(mag); mag = null; if (ring) ring.style.opacity = 0; }, inn = () => { if (ring) ring.style.opacity = 1; };
    h.addEventListener('mouseleave', out); h.addEventListener('mouseenter', inn);
    const setTheme = () => { const t = h.dataset.theme === 'dark' ? 'light' : 'dark'; h.dataset.theme = t; d.getElementById('th')?.setAttribute('aria-checked', String(t === 'dark')); try { localStorage.setItem('th', t); } catch {} };
    const click = (e) => { const T = e.target;
      if (T.closest('#bg')) d.body.classList.toggle('menu'); if (T.closest('nav a')) d.body.classList.remove('menu');
      const a = T.closest('[data-act]'); if (a) { if (a.dataset.act === 'menu') d.body.classList.toggle('menu'); if (a.dataset.act === 'search') d.dispatchEvent(new Event('open-palette')); }
      const th = T.closest('#th'); if (th) { if (d.startViewTransition && !reduce) { const r = th.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)); const tr = d.startViewTransition(setTheme); tr.ready.then(() => h.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] }, { duration: 650, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' })).catch(() => {}); } else setTheme(); } };
    d.addEventListener('click', click);
    const cy2 = d.querySelector('.cycle'), w = (cy2?.dataset.words || '').split('|'); let i = 0;
    const iv = cy2 && w.length > 1 && setInterval(() => { cy2.classList.add('sw'); setTimeout(() => { i = (i + 1) % w.length; cy2.textContent = w[i]; cy2.classList.remove('sw'); }, 250); }, 2200);
    return () => { removeEventListener('scroll', sc); d.removeEventListener('click', click); d.removeEventListener('pointermove', pm); d.removeEventListener('pointerdown', pd); h.removeEventListener('mouseleave', out); h.removeEventListener('mouseenter', inn); io.disconnect(); co.disconnect(); mo.disconnect(); clearTimeout(safety); clearTimeout(settle); cancelAnimationFrame(raf); ring?.remove(); if (iv) clearInterval(iv); };
  }, []);
  return null;
}
