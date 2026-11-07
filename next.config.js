const prod = process.env.NODE_ENV === 'production';
module.exports = { images: { unoptimized: true }, async headers() { return [{ source: '/(.*)', headers: [
  { key: 'X-Frame-Options', value: 'DENY' }, { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ...(prod ? [{ key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; frame-ancestors 'none'" }] : [])] }]; } };
