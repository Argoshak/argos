import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() { return NextResponse.json({ ok: true, region: process.env.VERCEL_REGION || null, t: Date.now() }, { headers: { 'Cache-Control': 'no-store' } }); }
