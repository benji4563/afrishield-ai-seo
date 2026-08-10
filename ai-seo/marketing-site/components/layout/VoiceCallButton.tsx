'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/lib/site';

/**
 * Floating "talk to Elodie" button — starts a Vapi web call with the same
 * assistant that answers the phone line. Sits just above the WhatsApp float.
 * The SDK is dynamically imported on first click so it never weighs down the
 * initial bundle, and nothing renders when no assistant is configured.
 */

type Status = 'idle' | 'connecting' | 'live';

/** Minimal shape of the @vapi-ai/web client we rely on. */
type VapiClient = {
  start: (assistantId: string) => Promise<unknown>;
  stop: () => void;
  on: (event: 'call-start' | 'call-end' | 'error', cb: () => void) => void;
};

export function VoiceCallButton() {
  const [status, setStatus] = useState<Status>('idle');
  const vapiRef = useRef<VapiClient | null>(null);

  useEffect(() => () => vapiRef.current?.stop(), []);

  if (!SITE.voice.publicKey || !SITE.voice.assistantId) return null;

  async function toggle() {
    if (status === 'live') {
      vapiRef.current?.stop();
      setStatus('idle');
      return;
    }
    if (status === 'connecting') return;

    setStatus('connecting');
    try {
      if (!vapiRef.current) {
        const { default: Vapi } = await import('@vapi-ai/web');
        const client: VapiClient = new Vapi(SITE.voice.publicKey);
        client.on('call-start', () => setStatus('live'));
        client.on('call-end', () => setStatus('idle'));
        client.on('error', () => setStatus('idle'));
        vapiRef.current = client;
      }
      await vapiRef.current.start(SITE.voice.assistantId);
    } catch {
      // Mic denied or network failure — fall back to idle, phone line still works.
      setStatus('idle');
    }
  }

  const label =
    status === 'live'
      ? 'Live with Elodie — tap to end'
      : status === 'connecting'
        ? 'Connecting to Elodie…'
        : 'Talk to Elodie, our AI assistant';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={status === 'live'}
      title={label}
      className={`fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105 ${
        status === 'live'
          ? 'animate-pulse border-green-300 bg-green-300 text-ink'
          : 'border-white/20 bg-ink text-green-300'
      }`}
    >
      {status === 'live' ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <rect x="6" y="6" width="12" height="12" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12 15a3.5 3.5 0 0 0 3.5-3.5v-5a3.5 3.5 0 1 0-7 0v5A3.5 3.5 0 0 0 12 15zm6-3.5a6 6 0 0 1-12 0H4.5a7.5 7.5 0 0 0 6.75 7.47V21h1.5v-2.03A7.5 7.5 0 0 0 19.5 11.5H18z" />
        </svg>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
