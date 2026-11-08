'use client';
import { useEffect } from 'react';
export default function Fx() {
  useEffect(() => {
    const d = document, h = d.documentElement; h.classList.add('js');
    try { h.dataset.theme = localStorage.getItem('th') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'); } catch {}
    // reveal on scroll, including nodes React adds later (language switch)
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -4% 0px' });
    const watch = (root) => root.querySelectorAll?.('.rv:not(.in)').forEach((el) => io.observe(el));
    watch(d); const mo = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.matches?.('.rv:not(.in)')) io.observe(n); watch(n); } }))); mo.observe(d.body, { childList: true, subtree: true });
    const safety = setTimeout(() => d.querySelectorAll('.rv:not(.in)').forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('in'); }), 1200);
    // counters
    const co = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; co.unobserve(e.target); const el = e.target, to = +el.dataset.count; let t0; const step = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }));
    d.querySelectorAll('[data-count]').forEach((el) => { el.textContent = '0'; co.observe(el); });
    // scroll: progress bar, back-to-top, scroll-spy, hero parallax
    const secs = [...d.querySelectorAll('section[id]')], links = [...d.querySelectorAll('nav a')], pg = d.getElementById('pg'), up = d.getElementById('up'), hero = d.querySelector('.hero');
    const onS = () => { const y = h.scrollTop; pg.style.width = (y / ((h.scrollHeight - h.clientHeight) || 1)) * 100 + '%'; up.classList.toggle('show', y > 600); if (hero && y < 900) hero.style.setProperty('--sy', y * 0.15 + 'px');
      let cur = ''; secs.forEach((s) => { if (s.offsetTop - 140 <= y) cur = s.id; }); links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + cur)); };
    let tick = false; const sc = () => { if (!tick) { tick = true; requestAnimationFrame(() => { onS(); tick = false; }); } };
    addEventListener('scroll', sc, { passive: true }); onS();
    // avatar tilt (mouse only)
    const av = d.querySelector('.av'), mm = (e) => { if (e.pointerType !== 'mouse' || !av) return; const r = av.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; av.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; };
    const ml = () => { if (av) av.style.transform = ''; }; hero?.addEventListener('pointermove', mm); hero?.addEventListener('pointerleave', ml);
    const click = (e) => {
      if (e.target.closest('#bg')) d.body.classList.toggle('menu'); if (e.target.closest('nav a')) d.body.classList.remove('menu');
      if (e.target.closest('#th')) { const t = h.dataset.theme === 'dark' ? 'light' : 'dark'; h.dataset.theme = t; try { localStorage.setItem('th', t); } catch {} }
    };
    d.addEventListener('click', click);
    const cy = d.querySelector('.cycle'), w = (cy?.dataset.words || '').split('|'); let i = 0;
    const iv = cy && w.length > 1 && setInterval(() => { cy.classList.add('sw'); setTimeout(() => { i = (i + 1) % w.length; cy.textContent = w[i]; cy.classList.remove('sw'); }, 250); }, 2200);
    return () => { removeEventListener('scroll', sc); d.removeEventListener('click', click); io.disconnect(); co.disconnect(); mo.disconnect(); clearTimeout(safety); hero?.removeEventListener('pointermove', mm); hero?.removeEventListener('pointerleave', ml); if (iv) clearInterval(iv); };
  }, []);
  return null;
}
