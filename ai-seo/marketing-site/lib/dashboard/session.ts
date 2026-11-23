/**
 * Dashboard session tokens. Web Crypto only, so the same code runs in
 * proxy.ts and in server components.
 *
 * A token is `<expiresAtMs>.<hmac>` signed with DASHBOARD_SESSION_SECRET. It
 * carries no user data: there is one owner login. Changing the secret on
 * Vercel logs every session out at once.
 */

export const SESSION_COOKIE = 'afs_dash';
export const SESSION_HOURS = 8;

function secret(): string | null {
  const value = process.env.DASHBOARD_SESSION_SECRET;
  return value && value.length >= 32 ? value : null;
}

async function hmac(message: string, key: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(message));
  return Buffer.from(signature).toString('base64url');
}

/** Constant-time comparison of two strings of any length. */
export function safeEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let diff = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i++) diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  return diff === 0;
}

export async function createSessionToken(): Promise<string | null> {
  const key = secret();
  if (!key) return null;
  const expiresAt = Date.now() + SESSION_HOURS * 3600 * 1000;
  return `${expiresAt}.${await hmac(`dash:${expiresAt}`, key)}`;
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  const key = secret();
  if (!key || !token) return false;
  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature || !/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return safeEqual(signature, await hmac(`dash:${expiresAt}`, key));
}

/** True when the owner has configured both secrets on the server. */
export function authConfigured(): boolean {
  return Boolean(secret() && process.env.DASHBOARD_PASSWORD_HASH);
}
