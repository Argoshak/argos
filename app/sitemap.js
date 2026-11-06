export const dynamic = 'force-dynamic';
export default function sitemap() { const u = process.env.SITE_URL; return u ? [{ url: u, lastModified: new Date() }] : []; }
