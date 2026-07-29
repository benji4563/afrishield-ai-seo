import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PostCard } from '@/components/blog/PostCard';
import { POSTS } from '@/lib/posts';

export function BlogTeaser() {
  return (
    <Section tone="light">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeader
          eyebrow="Writing"
          tone="light"
          title="The parts of this job people usually keep quiet about"
          blurb="Pricing, trade-offs, and what actually happens in month three. Written to be read, not to be ranked at you."
        />
        <Button href="/blog" variant="ghost-light">
          All posts
        </Button>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {POSTS.map((post) => (
          <div key={post.slug} className="relative">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </Section>
  );
}
