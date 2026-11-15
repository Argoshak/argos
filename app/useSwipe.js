import { useRef } from 'react';
export default function useSwipe(go) {
  const s = useRef([0, 0]);
  return { onTouchStart: (e) => { s.current = [e.touches[0].clientX, e.touches[0].clientY]; },
    onTouchEnd: (e) => { const t = e.changedTouches[0], dx = t.clientX - s.current[0], dy = t.clientY - s.current[1]; if (Math.abs(dx) > 50 && Math.abs(dy) < 40) { let dir = dx < 0 ? 1 : -1; if (document.documentElement.dir === 'rtl') dir = -dir; go(dir); try { navigator.vibrate?.(8); } catch {} } } };
}
