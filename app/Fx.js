'use client';
import { useEffect } from 'react';
export default function Fx() {
  useEffect(() => {
    const d = document, h = d.documentElement;
    try { h.dataset.theme = localStorage.getItem('th') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'); } catch {}
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    d.querySelectorAll('.rv').forEach((el) => io.observe(el));
    const secs = [...d.querySelectorAll('section[id]')], links = [...d.querySelectorAll('nav a')], pg = d.getElementById('pg'), up = d.getElementById('up');
    const onS = () => { const y = h.scrollTop; pg.style.width = (y / ((h.scrollHeight - h.clientHeight) || 1)) * 100 + '%'; up.classList.toggle('show', y > 600);
      let cur = ''; secs.forEach((s) => { if (s.offsetTop - 140 <= y) cur = s.id; }); links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + cur)); };
    let tick = false; const sc = () => { if (!tick) { tick = true; requestAnimationFrame(() => { onS(); tick = false; }); } };
    addEventListener('scroll', sc, { passive: true }); onS();
    const click = (e) => {
      const b = e.target.closest('[data-f]');
      if (b) { d.querySelectorAll('[data-f]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); d.querySelectorAll('[data-s]').forEach((c) => { c.hidden = b.dataset.f !== 'all' && c.dataset.s !== b.dataset.f; }); }
      if (e.target.closest('#bg')) d.body.classList.toggle('menu'); if (e.target.closest('nav a')) d.body.classList.remove('menu');
      if (e.target.closest('#th')) { const t = h.dataset.theme === 'dark' ? 'light' : 'dark'; h.dataset.theme = t; try { localStorage.setItem('th', t); } catch {} }
    };
    d.addEventListener('click', click);
    const cy = d.querySelector('.cycle'), w = (cy?.dataset.words || '').split('|'); let i = 0;
    const iv = cy && w.length > 1 && setInterval(() => { cy.classList.add('sw'); setTimeout(() => { i = (i + 1) % w.length; cy.textContent = w[i]; cy.classList.remove('sw'); }, 250); }, 2200);
    return () => { removeEventListener('scroll', sc); d.removeEventListener('click', click); io.disconnect(); if (iv) clearInterval(iv); };
  }, []);
  return null;
}
