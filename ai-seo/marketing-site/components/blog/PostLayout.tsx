import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Faq } from '@/components/ui/Faq';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { POSTS, type PostMeta } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

export function TableOfContents({ items }: { items: ReadonlyArray<{ id: string; label: string }> }) {
  return (
    <nav aria-label="On this page" className="border border-ink/10 bg-white p-6">
      <p className="eyebrow-light">On this page</p>
      <ol className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={item.id} className="flex gap-3 text-small">
            <span className="font-mono text-mute">{String(i + 1).padStart(2, '0')}</span>
            <a href={`#${item.id}`} className="text-slate underline-offset-4 hover:text-green-600 hover:underline">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ShortAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-green-600 bg-green-50 p-6 md:p-7">
      <p className="text-lead text-green-800">
        <strong className="font-display font-bold">Short answer:</strong> {children}
      </p>
    </div>
  );
}

export function Scene({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 border-y border-ink/10 py-8">
      <div className="space-y-5 text-lead text-slate">{children}</div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
        Illustrative composite — not a client, not a testimonial
      </p>
    </div>
  );
}

export function AuthorBio() {
  return (
    <aside className="mt-14 border border-ink/10 bg-white p-7">
      <p className="eyebrow-light">Who wrote this</p>
      <p className="mt-4 text-small body-dim-light">
        Written by the AfriShield AI SEO team — the same people who would run your keyword
        map, publish your pages, and sign the monthly report. Everything here is drawn from
        work we have actually done, and where we have not done it yet, we say so.
      </p>
      <a
        href="mailto:hello@afrishieldai.com"
        className="mt-5 inline-block font-mono text-label uppercase text-green-600 hover:text-green-500"
      >
        Argue with us — hello@afrishieldai.com
      </a>
    </aside>
  );
}

export function RelatedPosts({ current }: { current: string }) {
  const related = POSTS.filter((post) => post.slug !== current);
  if (related.length === 0) return null;

  return (
    <aside className="mt-14">
      <p className="eyebrow-light">Read next</p>
      <ul className="mt-5 space-y-px bg-ink/10">
        {related.map((post) => (
          <li key={post.slug} className="bg-white p-6">
            <Link href={`/blog/${post.slug}`} className="font-display text-[17px] font-semibold hover:text-green-600">
              {post.cardTitle}
            </Link>
            <p className="mt-2 text-small body-dim-light">{post.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function PostShell({
  post,
  toc,
  faq,
  children,
}: {
  post: PostMeta;
  toc: ReadonlyArray<{ id: string; label: string }>;
  faq: ReadonlyArray<{ q: string; a: string }>;
  children: React.ReactNode;
}) {
  const published = new Date(post.published).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article>
      <header className="surface-dark pb-[70px] pt-[140px]">
        <div className="container-page">
          <div className="container-inner">
            <nav aria-label="Breadcrumb" className="font-mono text-label uppercase text-white/40">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </nav>
            <p className="mt-8 eyebrow-dark">{post.category}</p>
            <h1 className="h1 mt-5 max-w-[22ch]">{post.title}</h1>
            <p className="mt-7 max-w-[60ch] text-lead body-dim">{post.description}</p>
            <p className="mt-8 font-mono text-label uppercase text-white/35">
              <time dateTime={post.published}>{published}</time>
              <span aria-hidden="true"> · </span>
              {post.readingMinutes} min read
            </p>
          </div>
        </div>
      </header>

      <div className="surface-light section">
        <div className="container-page">
          <div className="container-inner">
            <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:items-start">
              <div className="lg:sticky lg:top-[100px]">
                <TableOfContents items={toc} />
              </div>

              <div className="max-w-prose">
                <ShareButtons
                  url={`${SITE_URL}/blog/${post.slug}`}
                  title={post.title}
                  className="mt-0 border-t-0 pt-0"
                />

                <div className="post-body">{children}</div>

                <ShareButtons url={`${SITE_URL}/blog/${post.slug}`} title={post.title} />

                <section id="faq" className="mt-16">
                  <h2 className="h2">Questions people actually ask</h2>
                  <div className="mt-8">
                    <Faq items={faq} />
                  </div>
                </section>

                <AuthorBio />
                <RelatedPosts current={post.slug} />

                <div className="mt-14 border border-ink/10 bg-white p-8">
                  <h2 className="h3">Want this run for your business?</h2>
                  <p className="mt-3 text-small body-dim-light">
                    Thirty minutes, and you keep the audit findings whether or not you hire us.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/contact" variant="accent-light">
                      Book a call
                    </Button>
                    <Button href="/pricing" variant="ghost-light">
                      See pricing
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
