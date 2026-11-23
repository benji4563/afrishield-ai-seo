import { unstable_cache } from 'next/cache';

/**
 * Every data source returns a SourceResult, so the UI can always say where a
 * number came from, how fresh it is, and why it is missing.
 */
export type SourceResult<T> =
  | { status: 'ok'; data: T; fetchedAt: string }
  | { status: 'not_configured'; reason: string }
  | { status: 'error'; reason: string; fetchedAt: string };

export const REFRESH_SECONDS = 900; // 15 minutes

/**
 * Caches a source call for 15 minutes under a tag the Refresh button can
 * expire. Errors are cached too, briefly, so a failing API is not hammered on
 * every page view; the error text is safe to show (no secrets, no PII).
 */
export function cachedSource<A extends unknown[], T>(
  tag: string,
  keyParts: string[],
  fn: (...args: A) => Promise<T>,
): (...args: A) => Promise<SourceResult<T>> {
  return unstable_cache(
    async (...args: A): Promise<SourceResult<T>> => {
      try {
        return { status: 'ok', data: await fn(...args), fetchedAt: new Date().toISOString() };
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        console.error(`[dashboard:${tag}]`, reason);
        return { status: 'error', reason: reason.slice(0, 300), fetchedAt: new Date().toISOString() };
      }
    },
    ['dashboard', tag, ...keyParts],
    { revalidate: REFRESH_SECONDS, tags: ['dashboard', tag] },
  );
}
