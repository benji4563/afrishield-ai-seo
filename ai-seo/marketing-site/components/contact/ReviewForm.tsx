'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD =
  'w-full border border-white/15 bg-white/[0.03] px-4 py-3 text-body text-white placeholder:text-white/30 focus:border-green-300 focus:outline-none';

const RATINGS = [
  { value: '5', label: '5 — would recommend without hesitating' },
  { value: '4', label: '4 — good, with a caveat' },
  { value: '3', label: '3 — mixed' },
  { value: '2', label: '2 — fell short' },
  { value: '1', label: '1 — would not recommend' },
] as const;

/**
 * On-site review capture. Posts to /api/contact with `source: '/review'`, so a
 * review lands in the same place leads do and is never lost — the route logs it
 * even when the CRM is down.
 *
 * Deliberately NOT self-publishing. Reviews collected here go to Ben, who picks
 * which ones appear on the site. Two reasons: an open, unmoderated review widget
 * is a spam target, and Google ignores self-published Review markup anyway, so
 * auto-posting would buy risk without buying rich snippets.
 */
export function ReviewForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    const form = new FormData(event.currentTarget);
    const rating = String(form.get('rating') ?? '');
    const worked = String(form.get('worked') ?? '').trim();
    const role = String(form.get('role') ?? '').trim();

    // The contact route expects a single `message`, so fold the review-specific
    // fields into it rather than widening the API for one form.
    const payload = {
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      company: String(form.get('company') ?? '').trim(),
      source: '/review',
      message: [
        `Rating: ${rating} / 5`,
        role ? `Role: ${role}` : '',
        '',
        worked,
      ]
        .filter((line) => line !== '')
        .join('\n'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setStatus('error');
        setMessage(
          body.error ??
            'That did not send. Check the required fields and try again, or email it to benji@afrishieldai.com.',
        );
        return;
      }

      setStatus('sent');
    } catch {
      setStatus('error');
      setMessage(
        'The request could not reach us — usually a network drop. Try again, or email it to benji@afrishieldai.com.',
      );
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="border border-green-300/40 bg-green-300/[0.06] p-6 text-body text-white"
      >
        <p className="font-mono text-label uppercase text-green-300">Received</p>
        <p className="mt-3">
          Thank you — that is genuinely useful. We read every one, and we will ask
          before quoting you anywhere.
        </p>
      </div>
    );
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
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={`${FIELD} mt-2.5`}
          />
        </div>
        <div>
          <label htmlFor="role" className="block font-mono text-label uppercase text-white/50">
            Your role
          </label>
          <input
            id="role"
            name="role"
            placeholder="Owner, manager, marketing lead"
            className={`${FIELD} mt-2.5`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="rating" className="block font-mono text-label uppercase text-white/50">
          How did the work go?
        </label>
        <select id="rating" name="rating" defaultValue="5" className={`${FIELD} mt-2.5`}>
          {RATINGS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="worked" className="block font-mono text-label uppercase text-white/50">
          What changed for your business?
        </label>
        <textarea id="worked" name="worked" rows={6} required className={`${FIELD} mt-2.5`} />
        <p className="mt-2 text-small text-white/40">
          The useful ones are specific. What you were struggling with, what we did, what
          moved — a number if you have one. Two or three sentences is plenty.
        </p>
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
        {status === 'sending' ? 'Sending' : 'Send review'}
      </button>
    </form>
  );
}
