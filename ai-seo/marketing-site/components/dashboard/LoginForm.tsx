'use client';

import { useActionState } from 'react';
import { login, type LoginState } from '@/app/dashboard/actions';

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-small font-medium">Password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          autoFocus
          className="mt-1 w-full rounded-card border border-ink/20 px-3 py-2.5 text-body outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-small text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:opacity-60"
      >
        {pending ? 'Checking…' : 'Sign in'}
      </button>
    </form>
  );
}
