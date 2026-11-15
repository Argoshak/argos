'use client';
import { useState } from 'react';
const X = { en: { n: 'Your name', e: 'Email', m: 'Your message', s: 'Send message', ok: 'Thank you! Your message was sent.', er: 'Could not send. Please check the fields and try again.' },
  ar: { n: 'اسمك', e: 'البريد الإلكتروني', m: 'رسالتك', s: 'إرسال الرسالة', ok: 'شكراً لك! تم إرسال رسالتك.', er: 'تعذّر الإرسال. تحقق من الحقول وحاول مجدداً.' },
  fr: { n: 'Votre nom', e: 'E-mail', m: 'Votre message', s: 'Envoyer', ok: 'Merci ! Votre message a été envoyé.', er: 'Envoi impossible. Vérifiez les champs et réessayez.' } };
export default function ContactForm({ lang }) {
  const t = X[lang] || X.en, [st, setSt] = useState(''), [busy, setBusy] = useState(false);
  const go = async (e) => { e.preventDefault(); const f = e.target; setBusy(true); setSt('');
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(f))) }).then((x) => x.json()).catch(() => ({}));
    setBusy(false); setSt(r.ok ? 'ok' : 'er'); if (r.ok) { f.reset(); try { navigator.vibrate?.([12, 50, 12]); } catch {} } };
  return <form className="cf rv" onSubmit={go}>
    <div className="fld"><input id="cf-n" name="name" placeholder=" " required maxLength={100} autoComplete="name" /><label htmlFor="cf-n">{t.n}</label><i /></div>
    <div className="fld"><input id="cf-e" name="email" type="email" placeholder=" " required maxLength={200} autoComplete="email" /><label htmlFor="cf-e">{t.e}</label><i /></div>
    <div className="fld"><textarea id="cf-m" name="message" rows={5} placeholder=" " required minLength={5} maxLength={3000} /><label htmlFor="cf-m">{t.m}</label><i /></div>
    <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className={'btn p send' + (busy ? ' busy' : '')} disabled={busy}><span>{t.s}</span><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 11.5 21 3l-8.5 18-2.2-7.3z" fill="currentColor" /></svg></button>
    {st === 'ok' && <p role="status" className="cf-s ok"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" /><path className="tick" d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>{t.ok}</p>}
    {st === 'er' && <p role="alert" className="cf-s er">{t.er}</p>}</form>;
}
