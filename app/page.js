import { getSite, getProjects, getLang, tx } from '../lib/content';
import { session } from '../lib/auth';
import LangSwitch from './LangSwitch';
import Fx from './Fx';
import ContactForm from './ContactForm';
import Projects from './Projects';
import Quick from './Quick';
import StackMap from './StackMap';
import Flow from './Flow';
import { Steps, Explorer, Layers } from './Mods';
import './site.css';
export const dynamic = 'force-dynamic';
const VIEW = { en: 'View', ar: 'عرض', fr: 'Voir' }, ALL = { en: 'All', ar: 'الكل', fr: 'Tous' };
const HINT = { en: 'Hover a node · drag it · double-click to open the ecosystem', ar: 'مرّر على عقدة · اسحبها · انقر مرتين لفتح المنظومة', fr: "Survolez un nœud · glissez · double-clic pour l'écosystème" };
const LBL = { en: 'Interactive map of the technologies I use', ar: 'خريطة تفاعلية للتقنيات التي أستخدمها', fr: 'Carte interactive des technologies que j\'utilise' };
const safe = (u) => { try { return ['http:', 'https:', 'mailto:'].includes(new URL(u).protocol) ? u : null; } catch { return null; } };
const host = (u) => { try { return u.startsWith('mailto:') ? u.slice(7) : new URL(u).hostname.replace('www.', ''); } catch { return ''; } };
export async function generateMetadata() {
  const s = await getSite(); const m = s.seo[getLang()] || s.seo.en;
  return { metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined, title: m.title, description: m.description, keywords: m.keywords,
    robots: m.index === false ? 'noindex,nofollow' : 'index,follow', alternates: m.canonical ? { canonical: m.canonical } : undefined,
    openGraph: { title: m.og_title || m.title, description: m.og_description || m.description, images: m.og_image ? [m.og_image] : undefined }, icons: m.favicon ? { icon: m.favicon } : undefined };
}
export default async function Home({ searchParams }) {
  const adm = searchParams?.preview ? await session() : null;
  const [s, P] = await Promise.all([getSite(), getProjects(!!adm)]);
  const lang = getLang(), en = s.copy.en, t = s.copy[lang] || {}, c = (k) => t[k] || en[k] || ''; const th = s.theme;
  const social = s.socials.filter((x) => x.enabled && safe(x.url));
  const words = s.skills.flatMap((g) => g.items.map((x) => x.name)), nSk = words.length;
  const links = (cls) => social.map((x) => <a key={x.id} className={cls} href={safe(x.url)} rel="noopener noreferrer" target={x.url.startsWith('mailto:') ? undefined : '_blank'}>{x.label}</a>);
  const ini = (n) => n.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const rv = (i) => ({ transitionDelay: i * 70 + 'ms' });
  const mods = s.modules || [];
  const lv = (v) => (v && typeof v === 'object' ? tx(v, lang) : v || '');
  const eco = mods.find((m) => m.id === 'ecosystem')?.items || [], rad = (mods.find((m) => m.id === 'radar')?.items || []).filter((i) => i.tag?.en === 'Exploring');
  const mapNodes = [...eco, ...rad].map((i) => ({ id: i.title?.en || tx(i.title, 'en'), t: tx(i.title, lang), g: lv(i.tag), d: tx(i.text, lang) }));
  const body = {
    about: <div className="two"><p className="pre rv">{c('about')}</p><div className="rv" style={rv(2)}>{c('education') && <p>{c('education')}</p>}
      <ul className="facts"><li><small>◆</small><b>{c('location')}</b></li><li><small>◆</small><b>{words.slice(0, 4).join(' · ')}</b></li><li><small>◆</small><b>AR · FR · EN</b></li></ul></div></div>,
    skills: <div className="grid">{s.skills.map((g, i) => <div className="card rv" style={rv(i)} key={i}><h3>{tx(g.cat, lang)}</h3><ul className="chips">{g.items.map((x) => <li key={x.name} title={x.note || undefined}>{x.name}</li>)}</ul></div>)}</div>,
    projects: P.length ? <Projects labels={{ all: ALL[lang], live: c('view_live'), code: c('view_code'), case: c('case') }} items={P.map((p) => ({ id: p.id, title: tx(p.data.title, lang), summary: tx(p.data.summary, lang), case: tx(p.data.case, lang), tech: p.data.tech || [], status: p.status, statusLabel: c('st_' + p.status) || p.status, period: p.data.period || '', image: p.data.image || '', ini: ini(tx(p.data.title, lang)), live: safe(p.data.live) || '', repo: safe(p.data.repo) || '' }))} /> : <p>{c('no_projects')}</p>,
    journey: <ol className="tl">{s.timeline.map((x, i) => <li className="rv" style={rv(i)} key={i}><b>{tx(x.label, lang)}</b><span>{tx(x.text, lang)}</span></li>)}</ol>,
    systems: <div className="two"><p className="pre big rv">{c('systems')}</p><div className="os rv" style={rv(2)} aria-hidden="true"><span>Linux</span><span>FreeBSD</span><span>Unix</span><span>LumaOS</span></div></div>,
    philosophy: <blockquote className="quote rv"><p className="pre">{c('philosophy')}</p></blockquote>,
    contact: <><p className="rv">{c('contact_text')}</p><div className="grid">{social.map((x, i) => <a key={x.id} className="card cc rv" style={rv(i)} href={safe(x.url)} rel="noopener noreferrer" target={x.url.startsWith('mailto:') ? undefined : '_blank'}><b>{x.label}</b><span>{host(x.url)}</span></a>)}</div><ContactForm lang={lang} /></>,
  };
  const modBody = (m) => { const it = (m.items || []).map((i) => ({ t: tx(i.title, lang), x: tx(i.text, lang), tag: lv(i.tag), meta: lv(i.meta), url: i.url || '' }));
    if (m.type === 'flow') return <Flow items={it} />;
    if (m.type === 'layers') return <Layers items={it} />;
    if (m.type === 'bars') { const src = m.auto === 'ecosystem' ? Object.entries(eco.reduce((a, i) => { const g = lv(i.tag); a[g] = (a[g] || 0) + 1; return a; }, {})).map(([t, v]) => ({ t, v })) : it.map((i) => ({ t: i.t, v: parseFloat(i.meta) || 0 })); const mx = Math.max(1, ...src.map((b) => b.v));
      return <div className="bars">{src.map((b) => <div className="bar rv" key={b.t}><span>{b.t}</span><div><i style={{ '--w': (b.v / mx) * 100 + '%' }} /></div><b>{b.v}</b></div>)}</div>; }
    if (m.type === 'steps') return <Steps items={it} />;
    if (m.type === 'explorer') return <Explorer items={it} all={ALL[lang]} />;
    if (m.type === 'list') return <ol className="tl">{it.map((i, k) => <li className="rv" key={k}><b>{i.t} {i.meta && <span className="badge">{i.meta}</span>}</b><span>{i.x}</span></li>)}</ol>;
    if (m.type === 'editorial') return <div className="ed">{it.filter((i) => i.x).map((i, k) => <div className="rv" key={k}><h3>{i.t}</h3><p className="pre">{i.x}</p></div>)}<ul className="chips big">{it.filter((i) => !i.x).map((i, k) => <li className="rv" key={k}><span>{i.t}</span></li>)}</ul></div>;
    return <div className="grid">{it.map((i, k) => <div className="card rv" style={rv(k)} key={k}><span className="num">{String(k + 1).padStart(2, '0')}</span><h3>{i.t}</h3><p className="pre">{i.x}</p>{i.meta && <span className="badge">{i.meta}</span>}{safe(i.url) && <p className="links"><a href={safe(i.url)} target="_blank" rel="noopener noreferrer">{VIEW[lang]} ↗</a></p>}</div>)}</div>; };
  const secs = s.sections.filter((x) => x.enabled), dark = ['systems'];
  const toc = secs.flatMap((x) => [{ id: x.id, t: c('nav_' + x.id) }, ...mods.filter((m) => m.enabled && (m.at || 'projects') === x.id).map((m) => ({ id: m.id, t: tx(m.title, lang) }))]);
  const qs = [...toc.map((e) => ({ t: e.t, id: e.id, s: '' })), ...P.map((p) => ({ t: tx(p.data.title, lang), id: 'projects', s: c('nav_projects') })), ...mods.filter((m) => m.enabled).flatMap((m) => (m.items || []).map((i) => ({ t: tx(i.title, lang), id: m.id, s: tx(m.title, lang) })))];
  const nm = c('name').split(' ');
  return (
    <div className="site" style={{ '--navy': th.navy, '--royal': th.royal, '--gold': th.gold, '--bg0': th.bg, '--r': th.radius }}>
      <div id="pg" /><Fx />
      {adm && <div className="prev">Preview mode: unpublished projects are visible only to you.</div>}
      <header className="top"><div className="wrap"><a className="logo" href="#top" aria-label="Home">ZA</a>
        <nav aria-label="Main">{secs.map((x) => <a key={x.id} href={'#' + x.id}>{c('nav_' + x.id)}</a>)}</nav>
        <Quick entries={qs} lang={lang} /><button id="th" aria-label="Theme">◐</button><LangSwitch lang={lang} /><button id="bg" aria-label="Menu">☰</button>
        <nav className="toc" aria-label="Sections">{toc.map((e) => <a key={e.id} href={'#' + e.id}>{e.t}</a>)}</nav></div></header>
      <main>
        <div className="hero" id="top"><div className="wrap">
          <div className="hl"><p className="eyebrow">{c('location')}</p>
            <h1>{nm.map((w, k) => <span key={k} className={k ? 'a' : ''} style={{ animationDelay: k * 140 + 'ms' }}>{w}{' '}</span>)}</h1>
            <p className="role">{c('role')}</p>
            <p className="tag">{c('tagline')} <span className="cycle" data-words={words.join('|')}>{words[0]}</span></p>
            <p className="cta"><a className="btn p" href="#projects">{c('cta_projects')}</a><a className="btn s" href="#contact">{c('cta_contact')}</a></p>
            <p className="links soc">{links('')}</p>
            <div className="stats">{P.length > 0 && <div><b data-count={P.length}>{P.length}</b><small>{c('nav_projects')}</small></div>}<div><b data-count={nSk}>{nSk}</b><small>{c('nav_skills')}</small></div><div><b>3</b><small>AR · FR · EN</small></div></div></div>
          <StackMap nodes={mapNodes} avatar={s.identity.photo} hint={HINT[lang]} label={LBL[lang]} />
        </div>
          <svg className="cut" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><polygon points="0,10 100,0 100,10" style={{ fill: 'var(--bg)' }} /><line x1="0" y1="10" x2="100" y2="0" style={{ stroke: 'var(--gold)' }} strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg></div>
        <div className="mq" aria-hidden="true"><div>{[...words, ...words].map((w, k) => <span key={k}>{w}</span>)}</div></div>
        {(() => { let n = 0; const sec = (id, title, intro, inner, cls) => { n++; return <section id={id} key={id} className={cls}><div className="wrap"><div className="hd rv"><span className="idx">{String(n).padStart(2, '0')}</span><h2>{title}</h2>{intro && <p className="lead">{intro}</p>}</div>{inner}</div></section>; };
          return secs.flatMap((x) => [sec(x.id, c('nav_' + x.id), '', body[x.id], dark.includes(x.id) ? 'dk' : n % 2 ? 'alt' : ''), ...mods.filter((m) => m.enabled && (m.at || 'projects') === x.id).map((m) => sec(m.id, tx(m.title, lang), tx(m.intro, lang), modBody(m), n % 2 ? 'alt' : ''))]); })()}
      </main>
      <footer><div className="wrap"><b className="logo">ZA</b><p className="links soc">{links('')}</p>© {new Date().getFullYear()} {c('footer')}</div></footer>
      <a id="up" href="#top" aria-label="Top">↑</a>
      <noscript><style>{'.rv{opacity:1!important;transform:none!important}'}</style></noscript>
    </div>);
}
