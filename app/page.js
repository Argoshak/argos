import { getSite, getProjects, getLang, tx } from '../lib/content';
import { session } from '../lib/auth';
import LangSwitch from './LangSwitch';
import Fx from './Fx';
export const dynamic = 'force-dynamic';
const safe = (u) => { try { return ['http:', 'https:', 'mailto:'].includes(new URL(u).protocol) ? u : null; } catch { return null; } };
export async function generateMetadata() {
  const s = await getSite(); const m = s.seo[getLang()] || s.seo.en;
  return { metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined, title: m.title, description: m.description, keywords: m.keywords,
    robots: m.index === false ? 'noindex,nofollow' : 'index,follow', alternates: m.canonical ? { canonical: m.canonical } : undefined,
    openGraph: { title: m.og_title || m.title, description: m.og_description || m.description, images: m.og_image ? [m.og_image] : undefined },
    icons: m.favicon ? { icon: m.favicon } : undefined };
}
const ALL = { en: 'All', ar: 'الكل', fr: 'Tous' };
const host = (u) => { try { return u.startsWith('mailto:') ? u.slice(7) : new URL(u).hostname.replace('www.', ''); } catch { return ''; } };
export default async function Home({ searchParams }) {
  const s = await getSite(), lang = getLang(), en = s.copy.en, t = s.copy[lang] || {}, c = (k) => t[k] || en[k] || '';
  const adm = searchParams?.preview ? await session() : null;
  const P = await getProjects(!!adm); const th = s.theme;
  const social = s.socials.filter((x) => x.enabled && safe(x.url));
  const words = s.skills.flatMap((g) => g.items.map((x) => x.name));
  const nSk = words.length, sts = [...new Set(P.map((p) => p.status))];
  const links = (cls) => social.map((x) => <a key={x.id} className={cls} href={safe(x.url)} rel="noopener noreferrer" target={x.url.startsWith('mailto:') ? undefined : '_blank'}>{x.label}</a>);
  const ini = (n) => n.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const rv = (i) => ({ transitionDelay: i * 70 + 'ms' });
  const body = {
    about: <div className="two"><p className="pre rv">{c('about')}</p><div className="rv" style={rv(2)}>{c('education') && <p>{c('education')}</p>}
      <ul className="facts"><li><b>{c('location')}</b></li><li><b>{words.slice(0, 4).join(' · ')}</b></li><li><b>AR · FR · EN</b></li></ul></div></div>,
    skills: <div className="grid">{s.skills.map((g, i) => <div className="card rv" style={rv(i)} key={i}><h3>{tx(g.cat, lang)}</h3><ul className="chips">{g.items.map((x) => <li key={x.name} title={x.note || undefined}>{x.name}</li>)}</ul></div>)}</div>,
    projects: P.length ? <><div className="pills">{['all', ...sts].map((f, i) => <button key={f} data-f={f} aria-pressed={i === 0}>{f === 'all' ? ALL[lang] : c('st_' + f)}</button>)}</div>
      <div className="grid">{P.map((p, i) => { const d = p.data, L = safe(d.live), R = safe(d.repo), ti = tx(d.title, lang); return (
        <article className="card pj rv" style={rv(i)} data-s={p.status} key={p.id}>
          {d.image ? <img src={d.image} alt={ti} loading="lazy" /> : <div className="ph" aria-hidden="true"><b>{ini(ti)}</b></div>}
          <h3>{ti} <span className="badge">{c('st_' + p.status)}</span></h3><p>{tx(d.summary, lang)}</p>
          <ul className="chips">{(d.tech || []).map((x) => <li key={x}>{x}</li>)}</ul>
          {tx(d.case, lang) && <details><summary>{c('case')}</summary><p className="pre">{tx(d.case, lang)}</p></details>}
          <p className="links">{L && <a className="btn p sm" href={L} target="_blank" rel="noopener noreferrer">{c('view_live')} ↗</a>}{R && <a className="btn o sm" href={R} target="_blank" rel="noopener noreferrer">{c('view_code')}</a>}</p></article>); })}</div></> : <p>{c('no_projects')}</p>,
    journey: <ol className="tl">{s.timeline.map((x, i) => <li className="rv" style={rv(i)} key={i}><b>{tx(x.label, lang)}</b><span>{tx(x.text, lang)}</span></li>)}</ol>,
    systems: <div className="two"><p className="pre big rv">{c('systems')}</p><div className="os rv" style={rv(2)} aria-hidden="true"><span>Linux</span><span>FreeBSD</span><span>Unix</span><span>LumaOS</span></div></div>,
    philosophy: <blockquote className="quote rv"><p className="pre">{c('philosophy')}</p></blockquote>,
    contact: <><p className="rv">{c('contact_text')}</p><div className="grid">{social.map((x, i) => <a key={x.id} className="card cc rv" style={rv(i)} href={safe(x.url)} rel="noopener noreferrer" target={x.url.startsWith('mailto:') ? undefined : '_blank'}><b>{x.label}</b><span>{host(x.url)}</span></a>)}</div></>,
  };
  const secs = s.sections.filter((x) => x.enabled), dark = ['skills', 'systems'];
  return (
    <div className="site" style={{ '--navy': th.navy, '--royal': th.royal, '--gold': th.gold, '--bg0': th.bg, '--r': th.radius }}>
      <div id="pg" /><Fx />
      {adm && <div className="prev">Preview mode: unpublished projects are visible only to you.</div>}
      <header className="top"><div className="wrap"><a className="logo" href="#top" aria-label="Home">ZA</a>
        <nav aria-label="Main">{secs.map((x) => <a key={x.id} href={'#' + x.id}>{c('nav_' + x.id)}</a>)}</nav>
        <button id="th" aria-label="Theme">◐</button><LangSwitch lang={lang} /><button id="bg" aria-label="Menu">☰</button></div></header>
      <main>
        <div className="hero" id="top"><div className="wrap">
          <div><p className="loc">{c('location')}</p><h1>{c('name')}</h1><p className="role">{c('role')}</p>
            <p className="tag">{c('tagline')} <span className="cycle" data-words={words.join('|')}>{words[0]}</span></p>
            <p><a className="btn p" href="#projects">{c('cta_projects')}</a><a className="btn s" href="#contact">{c('cta_contact')}</a></p><p className="links soc">{links('')}</p>
            <div className="stats">{P.length > 0 && <div><b>{P.length}</b>{c('nav_projects')}</div>}<div><b>{nSk}</b>{c('nav_skills')}</div><div><b>3</b>AR · FR · EN</div></div></div>
          <div className="av"><img src={s.identity.photo} alt={c('photo_alt')} width="340" height="340" /></div>
        </div></div>
        {secs.map((x, i) => <section id={x.id} key={x.id} className={dark.includes(x.id) ? 'dk' : i % 2 ? 'alt' : ''}><div className="wrap"><h2 className="rv"><i>{String(i + 1).padStart(2, '0')}</i>{c('nav_' + x.id)}</h2>{body[x.id]}</div></section>)}
      </main>
      <footer><div className="wrap"><b className="logo">ZA</b><p className="links soc">{links('')}</p>© {new Date().getFullYear()} {c('footer')}</div></footer>
      <a id="up" href="#top" aria-label="Top">↑</a>
      <noscript><style>{'.rv{opacity:1!important;transform:none!important}'}</style></noscript>
    </div>);
}
