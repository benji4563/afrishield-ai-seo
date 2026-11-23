'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { updateTag } from 'next/cache';
import { clearFailures, isLockedOut, recordFailure, requireSession, verifyPassword } from '@/lib/dashboard/auth';
import { SESSION_COOKIE, SESSION_HOURS, authConfigured, createSessionToken } from '@/lib/dashboard/session';
import { STATUSES, writeStatus, type RecStatus } from '@/lib/dashboard/store';

export type LoginState = { error?: string };

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
}

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfigured()) return { error: 'The dashboard login is not configured on the server yet.' };
  const ip = await clientIp();
  if (isLockedOut(ip)) return { error: 'Too many attempts. Wait 15 minutes and try again.' };

  const password = String(formData.get('password') ?? '');
  if (password.length > 200 || !(await verifyPassword(password))) {
    recordFailure(ip);
    return { error: 'That password is not correct.' };
  }

  clearFailures(ip);
  const token = await createSessionToken();
  if (!token) return { error: 'The dashboard login is not configured on the server yet.' };
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/dashboard',
    maxAge: SESSION_HOURS * 3600,
  });
  redirect('/dashboard');
}

export async function logout(): Promise<void> {
  (await cookies()).delete({ name: SESSION_COOKIE, path: '/dashboard' });
  redirect('/dashboard/login');
}

/** Expires the cached GA4 and HubSpot data so the next render fetches fresh. */
export async function refreshData(): Promise<void> {
  await requireSession();
  updateTag('dashboard');
}

export async function setRecommendationStatus(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '') as RecStatus;
  if (!STATUSES.includes(status)) return;
  await writeStatus(id, status);
  updateTag('dashboard-statuses');
}
