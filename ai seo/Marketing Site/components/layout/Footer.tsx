import Link from 'next/link';
import { SignalNodeMark } from '@/components/signature/SignalNode';
import { FOOTER_COLUMNS, SITE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="surface-dark border-t border-white/10">
      <div className="container-page">
        <div className="container-inner py-[80px]">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
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
