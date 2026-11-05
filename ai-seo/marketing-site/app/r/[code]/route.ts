import { NextResponse } from 'next/server';
import { normalizeRef } from '@/lib/affiliate';

/**
 * Affiliate short link: /r/DIGIENT → /ai-visibility-check?ref=DIGIENT.
 * proxy.ts then stores the code on that next request. An invalid code still
 * lands on the page, just without attribution, so a typo never shows a 404.
 */
export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const ref = normalizeRef(code);
  const target = new URL('/ai-visibility-check', request.url);
  if (ref) target.searchParams.set('ref', ref);
  return NextResponse.redirect(target, 307);
}
