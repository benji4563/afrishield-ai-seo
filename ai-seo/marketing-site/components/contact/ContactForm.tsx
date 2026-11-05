'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { readRefInBrowser } from '@/lib/affiliate';

type Status = 'idle' | 'sending' | 'error';

const FIELD =
  'w-full border border-ink/15 bg-white px-4 py-3.5 text-body text-ink placeholder:text-ink/35 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20';
const LABEL = 'block text-small font-medium text-ink';

/**
 * Four fields, two required (2026-11-05 rebuild). Name, plus a WhatsApp number
 * OR an email: most prospects in Cameroon and Nigeria answer WhatsApp first, so
 * forcing an email lost them. The tier dropdown and the required "what do you
 * sell" essay are gone; the call settles both.
 */
export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;

    if (!data.phone?.trim() && !data.email?.trim()) {
      setStatus('error');
      setMessage('Add a WhatsApp number or an email, so we know where to reply.');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: '/contact', ref: readRefInBrowser() }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setStatus('error');
        setMessage(
          body.error ??
            'That did not send. Try again, or message us on WhatsApp or email benji@afrishieldai.com.',
        );
        return;
      }

      router.push('/thank-you');
    } catch {
      setStatus('error');
      setMessage(
        'The request could not reach us, usually a network drop. Try again, or message us on WhatsApp.',
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={LABEL}>
          Your name
        </label>
        <input id="name" name="name" required autoComplete="name" className={`${FIELD} mt-2`} />
      </div>

      <div>
        <label htmlFor="phone" className={LABEL}>
          WhatsApp number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+237 6XX XX XX XX"
          className={`${FIELD} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="email" className={LABEL}>
          Email <span className="font-normal text-ink/50">(or leave blank if you gave WhatsApp)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
          className={`${FIELD} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="company" className={LABEL}>
          Your business <span className="font-normal text-ink/50">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Name, or what you do and where"
          className={`${FIELD} mt-2`}
        />
      </div>

      {status === 'error' ? (
        <p role="alert" className="rounded-[10px] border border-red-300 bg-red-50 p-4 text-small text-red-900">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex h-14 w-full items-center justify-center bg-green-600 px-6 font-mono text-label uppercase text-white transition-colors hover:bg-green-500 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Get my free visibility review'}
      </button>

      <p className="text-center text-small text-ink/55">
        A person replies within one working day. No newsletter, no sales sequence.
      </p>
    </form>
  );
}
