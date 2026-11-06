export const dynamic = 'force-dynamic';
export default function robots() { const u = process.env.SITE_URL; return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }], sitemap: u ? `${u}/sitemap.xml` : undefined }; }
