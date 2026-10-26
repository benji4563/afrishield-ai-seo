import Link from 'next/link';
import { SignalNodeMark } from '@/components/signature/SignalNode';
import { FOOTER_COLUMNS, SITE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="surface-dark border-t border-white/10">
      <div className="container-page">
        <div className="container-inner py-[80px]">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
            <div className="max-w-[320px]">
              <Link href="/" className="flex items-center gap-2.5 text-green-300">
                <SignalNodeMark className="h-6 w-6" />
                <span className="font-display text-[15px] font-bold tracking-tight text-white">
                  {SITE.name}
                </span>
              </Link>
              <p className="mt-5 text-small body-dim">{SITE.tagline}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-5 inline-block font-mono text-label uppercase text-green-300 hover:text-green-200"
              >
                {SITE.email}
              </a>
              {/*
                Two numbers, labelled apart on purpose. `SITE.phone` is the
                business line that must match the Google Business Profile and
                every directory. Only `SITE.aiCallLine` is AI-answered, so the
                "24/7" claim stays attached to that one.
              */}
              {SITE.phone ? (
                <a
                  href={SITE.phoneHref}
                  className="mt-3 block font-mono text-label uppercase text-white/60 transition-colors hover:text-white"
                >
                  {SITE.phone} — Cameroon
                </a>
              ) : null}
              {SITE.aiCallLine ? (
                <a
                  href={SITE.aiCallLineHref}
                  className="mt-2 block font-mono text-label uppercase text-white/60 transition-colors hover:text-white"
                >
                  {SITE.aiCallLine} — answered 24/7 by our AI
                </a>
              ) : null}
              {/*
                TechBehemoths verification badge, profile live 2026-10-24.
                Their checker looks for this anchor as they supply it - the
                `data-techbehemoths-verification` attribute plus an href to our
                own profile - so the markup is left alone rather than tidied.

                A plain <img> on purpose: next/image would rewrite the src
                through /_next/image and serve it from this domain, hiding the
                CDN URL their check expects to find.

                The badge wordmark is #242F46, which is invisible on this dark
                footer, so it sits on a light chip. Recolouring their SVG is
                not an option - it is their trust mark, not our asset.
              */}
              <a
                href="https://techbehemoths.com/company/afrishield-ai"
                target="_blank"
                rel="noopener"
                data-techbehemoths-verification
                className="mt-6 inline-flex rounded-lg bg-white px-3 py-2 transition-opacity hover:opacity-90"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.techbehemoths.com/public/static/validation/tb-verified-logo.svg"
                  alt="AfriShield AI, verified on TechBehemoths"
                  width={123}
                  height={40}
                  loading="lazy"
                />
              </a>
            </div>

            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="eyebrow text-white/40">{column.heading}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-small text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-label uppercase text-white/35">
              © {new Date().getFullYear()} {SITE.legalName}
            </p>
            <p className="font-mono text-label uppercase text-white/35">
              Built by Africans, for African screens
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
