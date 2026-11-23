'use client';

import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { CONSENT_EVENT, OPEN_SETTINGS_EVENT, readConsent, saveConsent } from '@/lib/consent';

/**
 * Cookie banner. Shows until the visitor chooses; "Cookie settings" in the
 * footer reopens it. Equal-weight Accept and Reject buttons, nothing optional
 * on by default, and the site stays usable while it is open (no wall).
 */
/** "saved" once a valid choice exists, "" before; null on the server (renders nothing). */
const consentState = () => (readConsent() ? 'saved' : '');
const subscribe = (notify: () => void) => {
  window.addEventListener(CONSENT_EVENT, notify);
  return () => window.removeEventListener(CONSENT_EVENT, notify);
};

export function CookieBanner() {
  const state = useSyncExternalStore(subscribe, consentState, () => null);
  const [reopened, setReopened] = useState(false);
  const [customise, setCustomise] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setCustomise(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  const open = state !== null && (state === '' || reopened);
  if (!open) return null;

  const choose = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setReopened(false);
    setCustomise(false);
  };

  const button =
    'inline-flex h-10 items-center justify-center px-4 font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] transition-colors';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/15 bg-ink text-white shadow-[0_-8px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto max-w-container px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p id="cookie-title" className="font-display text-[15px] font-semibold">
              Cookies on afrishieldai.com
            </p>
            <p className="mt-1 text-small text-white/75">
              We use cookies to measure visits (Google Analytics) and to connect your enquiry to how you found us (HubSpot). They stay off unless you
              accept. <Link href="/privacy#cookies" className="underline hover:text-white">Read our privacy and cookie policy</Link>.
            </p>
          </div>
          {!customise && (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => choose(false, false)} className={`${button} border border-white/30 hover:border-white`}>
                Reject optional
              </button>
              <button type="button" onClick={() => setCustomise(true)} className={`${button} border border-white/30 hover:border-white`}>
                Choose
              </button>
              <button type="button" onClick={() => choose(true, true)} className={`${button} bg-green-300 text-ink hover:bg-green-200`}>
                Accept all
              </button>
            </div>
          )}
        </div>

        {customise && (
          <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 md:grid-cols-3">
            <Toggle label="Necessary" note="Remembers this choice and credits referral partners. Always on." checked disabled />
            <Toggle
              label="Analytics"
              note="Google Analytics: which pages are visited and how people arrive."
              checked={analytics}
              onChange={setAnalytics}
            />
            <Toggle
              label="Marketing"
              note="HubSpot tracking: links your visits to an enquiry you send us. Google ad signals."
              checked={marketing}
              onChange={setMarketing}
            />
            <div className="flex flex-wrap gap-2 md:col-span-3">
              <button type="button" onClick={() => choose(false, false)} className={`${button} border border-white/30 hover:border-white`}>
                Reject optional
              </button>
              <button type="button" onClick={() => choose(analytics, marketing)} className={`${button} bg-green-300 text-ink hover:bg-green-200`}>
                Save my choice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({
  label,
  note,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  note: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label className={`flex gap-3 rounded-card border border-white/10 p-3 ${disabled ? 'opacity-70' : 'cursor-pointer hover:border-white/30'}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 accent-green-400"
      />
      <span>
        <span className="block text-small font-medium">{label}</span>
        <span className="block text-[12.5px] leading-snug text-white/65">{note}</span>
      </span>
    </label>
  );
}
