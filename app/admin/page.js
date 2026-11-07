import { session } from '../../lib/auth';
import Admin from './Admin';
import { getLang } from '../../lib/content';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin', robots: 'noindex,nofollow' };
export default async function Page() { const s = await session(); return <Admin lang={getLang()} auth={s ? { u: s.u, mc: !!s.mc } : null} />; }
