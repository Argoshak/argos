'use client';
import { useRouter } from 'next/navigation';
export default function LangSwitch({ lang }) {
  const r = useRouter();
  const set = (l) => { document.cookie = `lang=${l};path=/;max-age=31536000;samesite=lax`; r.refresh(); };
  return <div className="lang">{[['en', 'EN'], ['fr', 'FR'], ['ar', 'AR']].map(([l, n]) => <button key={l} aria-pressed={l === lang} onClick={() => set(l)}>{n}</button>)}</div>;
}
