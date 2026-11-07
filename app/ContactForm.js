'use client';
import { useState } from 'react';
const X = { en: { n: 'Your name', e: 'Email', m: 'Your message', s: 'Send message', ok: 'Thank you! Your message was sent.', er: 'Could not send. Please check the fields and try again.' },
  ar: { n: 'اسمك', e: 'البريد الإلكتروني', m: 'رسالتك', s: 'إرسال الرسالة', ok: 'شكراً لك! تم إرسال رسالتك.', er: 'تعذّر الإرسال. تحقق من الحقول وحاول مجدداً.' },
  fr: { n: 'Votre nom', e: 'E-mail', m: 'Votre message', s: 'Envoyer', ok: 'Merci ! Votre message a été envoyé.', er: 'Envoi impossible. Vérifiez les champs et réessayez.' } };
export default function ContactForm({ lang }) {
  const t = X[lang] || X.en, [st, setSt] = useState(''), [busy, setBusy] = useState(false);
  const go = async (e) => { e.preventDefault(); const f = e.target; setBusy(true);
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(f))) }).then((x) => x.json()).catch(() => ({}));
    setBusy(false); setSt(r.ok ? 'ok' : 'er'); if (r.ok) f.reset(); };
  return <form className="cf rv" onSubmit={go}><input name="name" placeholder={t.n} aria-label={t.n} required maxLength={100} /><input name="email" type="email" placeholder={t.e} aria-label={t.e} required maxLength={200} />
    <textarea name="message" rows={5} placeholder={t.m} aria-label={t.m} required minLength={5} maxLength={3000} /><input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="btn p" disabled={busy}>{t.s}</button>{st && <p role="status" className="cf-s">{t[st]}</p>}</form>;
}
