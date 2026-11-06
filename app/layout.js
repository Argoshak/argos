import './globals.css';
import { getLang } from '../lib/content';
export default function Root({ children }) {
  const lang = getLang();
  return <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}><body>{children}</body></html>;
}
