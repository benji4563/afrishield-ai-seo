'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'error';

const FIELD =
  'w-full border border-white/15 bg-white/[0.03] px-4 py-3 text-body text-white placeholder:text-white/30 focus:border-green-300 focus:outline-none';

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setStatus('error');
        // Errors say what went wrong and how to fix it — never just "failed".
        setMessage(
          body.error ??
            'That did not send. Check the required fields and try again, or email hello@afrishieldai.com directly.',
        );
        return;
      }

      router.push('/thank-you');
    } catch {
      setStatus('error');
      setMessage(
        'The request could not reach us — usually a network drop. Try again, or email hello@afrishieldai.com.',
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block font-mono text-label uppercase text-white/50">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={`${FIELD} mt-2.5`} />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-label uppercase text-white/50">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${FIELD} mt-2.5`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block font-mono text-label uppercase text-white/50">
            Business name
          </label>
          <input id="company" name="company" autoComplete="organization" className={`${FIELD} mt-2.5`} />
        </div>
        <div>
          <label htmlFor="website" className="block font-mono text-label uppercase text-white/50">
            Website (if you have one)
          </label>
          <input id="website" name="website" inputMode="url" className={`${FIELD} mt-2.5`} />
        </div>
      </div>

      <div>
        <label htmlFor="tier" className="block font-mono text-label uppercase text-white/50">
          Which tier are you looking at?
        </label>
        <select id="tier" name="tier" defaultValue="Not sure yet" className={`${FIELD} mt-2.5`}>
          <option>Not sure yet</option>
          <option>Foundation — $150/mo</option>
          <option>Engine — $400/mo</option>
          <option>Operation — $900/mo</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-label uppercase text-white/50">
          What do you sell, and to whom?
        </label>
        <textarea id="message" name="message" rows={5} required className={`${FIELD} mt-2.5`} />
      </div>

      {status === 'error' ? (
        <p role="alert" className="border border-white/20 bg-white/[0.04] p-4 text-small text-white">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex h-10 items-center justify-center bg-green-300 px-6 font-mono text-label uppercase text-ink transition-colors hover:bg-green-200 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending' : 'Send message'}
      </button>

      <p className="text-small text-white/40">
        We reply within one working day. No sequence, no newsletter — just a reply.
      </p>
    </form>
  );
}
