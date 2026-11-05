/**
 * Affiliate attribution. A partner shares a link carrying `?ref=CODE` (or the
 * short link /r/CODE); proxy.ts stores the code in a first-party cookie, and
 * the lead forms send it with the submission so the lead row records who
 * referred it.
 *
 * Kept free of server-only imports: proxy.ts, the API route and the client
 * forms all use it.
 */

export const REF_COOKIE = 'afs_ref';

/** The program's attribution window: 90 days from first contact. */
export const REF_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

const REF_PATTERN = /^[A-Z0-9]{1,20}$/;

/**
 * Returns the code in its canonical upper-case form, or null when it is not a
 * valid code. Codes are matched case-insensitively so `?ref=digient` still
 * credits DIGIENT.
 */
export function normalizeRef(value: string | null | undefined): string | null {
  const code = value?.trim().toUpperCase();
  return code && REF_PATTERN.test(code) ? code : null;
}

/**
 * Browser only. The cookie is the source of truth (first touch wins); the
 * current URL is the fallback for browsers that refuse the cookie.
 */
export function readRefInBrowser(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${REF_COOKIE}=([^;]*)`));
  const fromCookie = match ? normalizeRef(decodeURIComponent(match[1])) : null;
  return fromCookie ?? normalizeRef(new URLSearchParams(window.location.search).get('ref'));
}
