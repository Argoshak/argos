import { session } from '../../lib/auth';
import Admin from './Admin';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin', robots: 'noindex,nofollow' };
export default async function Page() { const s = await session(); return <Admin auth={s ? { u: s.u, mc: !!s.mc } : null} />; }
