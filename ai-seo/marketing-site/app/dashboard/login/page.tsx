import { LoginForm } from '@/components/dashboard/LoginForm';
import { authConfigured } from '@/lib/dashboard/session';

export default function LoginPage() {
  const configured = authConfigured();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-card border border-ink/10 bg-white p-8 shadow-sm">
        <p className="font-mono text-label uppercase text-green-600">AfriShield AI</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">Business dashboard</h1>
        <p className="mt-2 text-small text-slate">Internal. Owner access only.</p>
        {configured ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-card bg-amber-50 p-3 text-small text-amber-900">
            Login is not configured on this deployment. Set DASHBOARD_PASSWORD_HASH and DASHBOARD_SESSION_SECRET
            (run <code>node scripts/dashboard-password.mjs</code>), then redeploy.
          </p>
        )}
      </div>
    </div>
  );
}
