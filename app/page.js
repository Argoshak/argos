import { getSite, getProjects, getLang, tx } from '../lib/content';
import { session } from '../lib/auth';
import LangSwitch from './LangSwitch';
export const dynamic = 'force-dynamic';
const safe = (u) => { try { return ['http:', 'https:', 'mailto:'].includes(new URL(u).protocol) ? u : null; } catch { return null; } };
export async function generateMetadata() {
  const s = await getSite(); const m = s.seo[getLang()] || s.seo.en;
  return { metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined, title: m.title, description: m.description, keywords: m.keywords,
    robots: m.index === false ? 'noindex,nofollow' : 'index,follow', alternates: m.canonical ? { canonical: m.canonical } : undefined,
    openGraph: { title: m.og_title || m.title, description: m.og_description || m.description, images: m.og_image ? [m.og_image] : undefined },
    icons: m.favicon ? { icon: m.favicon } : undefined };
}
export default async function Home({ searchParams }) {
  const s = await getSite(), lang = getLang(), en = s.copy.en, t = s.copy[lang] || {}, c = (k) => t[k] || en[k] || '';
  const adm = searchParams?.preview ? await session() : null;
  const P = await getProjects(!!adm); const th = s.theme;
  const social = s.socials.filter((x) => x.enabled && safe(x.url));
  const links = (cls) => social.map((x) => <a key={x.id} className={cls} href={safe(x.url)} rel="noopener noreferrer" target={x.url.startsWith('mailto:') ? undefined : '_blank'}>{x.label}</a>);
  const body = {
    about: <><p className="pre">{c('about')}</p>{c('education') && <p>{c('education')}</p>}</>,
    skills: <div className="grid">{s.skills.map((g, i) => <div className="card" key={i}><h3>{tx(g.cat, lang)}</h3><ul className="chips">{g.items.map((x) => <li key={x.name} title={x.note || undefined}>{x.name}</li>)}</ul></div>)}</div>,
    projects: P.length ? <div className="grid">{P.map((p) => { const d = p.data, L = safe(d.live), R = safe(d.repo); return (
      <article className="card" key={p.id}>{d.image && <img src={d.image} alt={tx(d.title, lang)} loading="lazy" />}
        <h3>{tx(d.title, lang)} <span className="badge">{c('st_' + p.status)}</span></h3><p>{tx(d.summary, lang)}</p>
        <ul className="chips">{(d.tech || []).map((x) => <li key={x}>{x}</li>)}</ul>
        {tx(d.case, lang) && <details><summary>{c('case')}</summary><p className="pre">{tx(d.case, lang)}</p></details>}
        <p className="links">{L && <a href={L} target="_blank" rel="noopener noreferrer">{c('view_live')}</a>}{R && <a href={R} target="_blank" rel="noopener noreferrer">{c('view_code')}</a>}</p></article>); })}</div> : <p>{c('no_projects')}</p>,
    journey: <ol className="tl">{s.timeline.map((x, i) => <li key={i}><b>{tx(x.label, lang)}</b><br />{tx(x.text, lang)}</li>)}</ol>,
    systems: <p className="pre">{c('systems')}</p>,
    philosophy: <p className="pre big">{c('philosophy')}</p>,
    contact: <><p>{c('contact_text')}</p><p className="links">{links('btn p')}</p></>,
  };
  const secs = s.sections.filter((x) => x.enabled);
  return (
    <div style={{ '--navy': th.navy, '--royal': th.royal, '--gold': th.gold, '--bg': th.bg, '--r': th.radius }}>
      {adm && <div className="prev">Preview mode: unpublished projects are visible only to you.</div>}
      <header className="top"><div className="wrap"><nav aria-label="Main">{secs.map((x) => <a key={x.id} href={'#' + x.id}>{c('nav_' + x.id)}</a>)}</nav><LangSwitch lang={lang} /></div></header>
      <main>
        <div className="hero"><div className="wrap">
          <div><h1>{c('name')}</h1><p className="role">{c('role')}</p><p className="tag">{c('tagline')}</p>
            <p className="loc">{c('location')}</p>
            <p><a className="btn p" href="#projects">{c('cta_projects')}</a><a className="btn s" href="#contact">{c('cta_contact')}</a></p><p className="links soc">{links('')}</p></div>
          <div className="av"><img src={s.identity.photo} alt={c('photo_alt')} width="320" height="320" /></div>
        </div></div>
        {secs.map((x) => <section id={x.id} key={x.id}><div className="wrap"><h2>{c('nav_' + x.id)}</h2>{body[x.id]}</div></section>)}
      </main>
      <footer><div className="wrap"><p className="links soc">{links('')}</p>© {new Date().getFullYear()} {c('footer')}</div></footer>
    </div>);
}
