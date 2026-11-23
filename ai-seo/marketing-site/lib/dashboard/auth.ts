import { scrypt, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, isValidSessionToken } from './session';

/**
 * Owner password check. DASHBOARD_PASSWORD_HASH holds
 * `scrypt:<saltB64>:<hashB64>` (N=16384, r=8, p=1, 64-byte key), produced by
 * `node scripts/dashboard-password.mjs`. The plain password is never stored.
 */
export async function verifyPassword(password: string): Promise<boolean> {
  const stored = process.env.DASHBOARD_PASSWORD_HASH;
  if (!stored || !password) return false;
  const [scheme, saltB64, hashB64] = stored.split(':');
  if (scheme !== 'scrypt' || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, 'base64');
  const derived = await new Promise<Buffer>((resolve, reject) =>
    scrypt(password, Buffer.from(saltB64, 'base64'), expected.length, { N: 16384, r: 8, p: 1 }, (err, key) =>
      err ? reject(err) : resolve(key),
    ),
  );
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

/**
 * Server-side gate for every dashboard page and server action. proxy.ts also
 * redirects unauthenticated requests, but each page checks again so that data
 * is never fetched without a valid session.
 */
export async function requireSession(): Promise<void> {
  const store = await cookies();
  if (!(await isValidSessionToken(store.get(SESSION_COOKIE)?.value))) {
    redirect('/dashboard/login');
  }
}

/**
 * Best-effort login throttle: 5 failures per 15 minutes per IP, per server
 * instance. Serverless instances do not share memory, so this slows guessing
 * rather than guaranteeing a hard limit; the scrypt cost does the rest.
 */
const failures = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

export function isLockedOut(ip: string): boolean {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

export function recordFailure(ip: string): void {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.first > WINDOW_MS) failures.set(ip, { count: 1, first: Date.now() });
  else entry.count += 1;
}

export function clearFailures(ip: string): void {
  failures.delete(ip);
}
