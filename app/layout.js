import './globals.css';
import { getLang } from '../lib/content';
export default function Root({ children }) {
  const lang = getLang();
  return <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&display=swap" /></head><body>{children}</body></html>;
}
