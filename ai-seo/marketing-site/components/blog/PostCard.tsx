import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

// African-business photography per post — Pexels, see public/images/credits.json.
const POST_IMAGE: Record<string, { src: string; alt: string }> = {
  'small-business-seo': {
    src: '/images/blog-small-business-seo.webp',
    alt: 'A small-business owner looking anxiously at a laptop showing a falling website-traffic graph.',
  },
  'answer-engine-optimization': {
    src: '/images/blog-answer-engine-optimization.webp',
    alt: 'Two marketers celebrating in front of a screen showing a falling Google traffic graph — hype outpacing the results.',
  },
  'what-ai-seo-actually-does': {
    src: '/images/blog-what-ai-seo-actually-does.jpg',
    alt: 'An African professional focused on work at a laptop in an office.',
  },
  'what-seo-actually-costs': {
    src: '/images/blog-what-seo-actually-costs.jpg',
    alt: 'An African small-business owner managing money and a phone at a market stall.',
  },
  'ai-seo-vs-traditional-seo': {
    src: '/images/blog-ai-seo-vs-traditional-seo.jpg',
    alt: 'An African team working at computers in a technology office.',
  },
};

export function PostCard({ post }: { post: PostMeta }) {
  const image = POST_IMAGE[post.slug];
  return (
    <article className="group flex flex-col border border-ink/10 bg-white">
      <div className="h-[168px] overflow-hidden border-b border-ink/10 bg-green-50">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={image.alt}
            width={1200}
            height={627}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="eyebrow-light">{post.category}</p>
        <h3 className="h3 mt-4">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.cardTitle}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-small body-dim-light">{post.description}</p>
        <p className="mt-6 font-mono text-label uppercase text-mute">
          {post.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
