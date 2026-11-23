import { NextResponse, type NextRequest } from 'next/server';
import { REF_COOKIE, REF_MAX_AGE_SECONDS, normalizeRef } from '@/lib/affiliate';
import { SESSION_COOKIE, isValidSessionToken } from '@/lib/dashboard/session';

/**
 * Two jobs. Next 16 renamed middleware.ts to proxy.ts — same mechanism.
 *
 * 1. Internal dashboard gate. Anything under /dashboard except the login page
 *    needs a valid owner session; every response there is noindex and never
 *    cached. Pages and server actions check the session again server-side
 *    (lib/dashboard/auth.ts), so this is the first gate, not the only one.
 *
 * 2. Affiliate capture. Any page opened with `?ref=CODE` stores the code in the
 *    `afs_ref` cookie for the 90-day attribution window. First touch wins: an
 *    existing cookie is never overwritten, so a later visit through another
 *    partner's link (or an ad) cannot take the referral away from whoever sent
 *    the visitor first.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    const isLogin = pathname === '/dashboard/login';
    if (!isLogin && !(await isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value))) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  }

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
  matcher: [
    // The dashboard, on every request.
    '/dashboard',
    '/dashboard/:path*',
    // Public pages only when the URL actually carries a ref, never on assets or the API.
    {
      source: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
      has: [{ type: 'query', key: 'ref' }],
    },
  ],
};
