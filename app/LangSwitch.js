'use client';
import { useRouter } from 'next/navigation';
import { useTransition, useEffect } from 'react';
import Portal from './Portal';
export default function LangSwitch({ lang }) {
  const r = useRouter(), [pending, start] = useTransition();
  useEffect(() => { document.body.style.opacity = pending ? '.6' : ''; }, [pending]);
  const set = (l) => { document.cookie = `lang=${l};path=/;max-age=31536000;samesite=lax`; const h = document.documentElement; h.lang = l; h.dir = l === 'ar' ? 'rtl' : 'ltr'; start(() => r.refresh()); };
  return <><div className="lang">{[['en', 'EN'], ['fr', 'FR'], ['ar', 'AR']].map(([l, n]) => <button key={l} aria-pressed={l === lang} onClick={() => set(l)}>{n}</button>)}</div>
    {pending && <Portal><div className="ldr" role="status" aria-label="Loading"><i /><i /><i /></div></Portal>}</>;
}
