import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { PostCard } from '@/components/blog/PostCard';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogIndexJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import { POSTS } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Blog: search, content & real costs';
const DESCRIPTION =
  'Plain writing on SEO for African businesses — pricing with the awkward numbers left in, what an AI SEO agency does all day, and where automation quietly loses.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function BlogIndexPage() {
  return (
    <>
      <StructuredData data={blogIndexJsonLd} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      <PageHero
        eyebrow="Blog"
        title="Written to be read, not to be ranked at you"
        blurb="Three pieces so far. Each one covers something the other results on that search quietly skip — usually the price, and usually the part where you should not buy this yet."
      />

      <Section tone="light">
        <div className="grid gap-5 md:grid-cols-3">
          {POSTS.map((post) => (
            <div key={post.slug} className="relative">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Section>

      <CtaDrop
        title="Rather talk than read?"
        body="Book thirty minutes and we will cover the parts of this that apply to your business specifically."
      />
    </>
  );
}
