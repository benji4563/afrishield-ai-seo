import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

// Image comes from the post itself (lib/posts.ts) — African-business photography,
// Pexels, see public/images/credits.json. A post without an image renders the
// placeholder band rather than a broken <img>.
export function PostCard({ post }: { post: PostMeta }) {
  const image = post.image;
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
