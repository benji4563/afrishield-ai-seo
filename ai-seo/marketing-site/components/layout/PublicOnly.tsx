'use client';

import { usePathname } from 'next/navigation';

/**
 * Renders its children on public pages only. The internal /dashboard shares
 * the root layout, but must not show the site nav, footer, floating WhatsApp
 * and call buttons, or send Vercel Analytics page views. On every public page
 * this renders exactly what it wraps, so their HTML is unchanged.
 */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/dashboard' || pathname?.startsWith('/dashboard/')) return null;
  return <>{children}</>;
}
