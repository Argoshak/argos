'use client';
import dynamic from 'next/dynamic';
const Lab = dynamic(() => import('./Lab'), { ssr: false, loading: () => <div className="lab-box lab-load">…</div> });
export default function LabLoader({ lang }) { return <Lab lang={lang} />; }
