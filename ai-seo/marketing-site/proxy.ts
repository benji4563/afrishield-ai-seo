import { NextResponse, type NextRequest } from 'next/server';
import { REF_COOKIE, REF_MAX_AGE_SECONDS, normalizeRef } from '@/lib/affiliate';

/**
 * Affiliate capture. Next 16 renamed middleware.ts to proxy.ts — same job.
 *
 * Any page opened with `?ref=CODE` stores the code in the `afs_ref` cookie for
 * the 90-day attribution window. First touch wins: an existing cookie is never
 * overwritten, so a later visit through another partner's link (or an ad)
 * cannot take the referral away from whoever sent the visitor first.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const ref = normalizeRef(request.nextUrl.searchParams.get('ref'));

  if (ref && !request.cookies.has(REF_COOKIE)) {
    response.cookies.set(REF_COOKIE, ref, {
      maxAge: REF_MAX_AGE_SECONDS,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      // Readable by the lead forms, which send it with the submission.
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  // Only runs when the URL actually carries a ref, and never on assets or the API.
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
      has: [{ type: 'query', key: 'ref' }],
    },
  ],
};
