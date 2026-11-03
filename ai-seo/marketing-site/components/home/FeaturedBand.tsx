import { FeaturedSlider, type Slide } from '@/components/home/FeaturedSlider';
import { POSTS } from '@/lib/posts';

/**
 * The homepage slider band, added 2026-11-04 to lighten the first screens:
 * research, the founder, a guide and the free check, five slides in all.
 *
 * Post slides read their title, description and image from lib/posts.ts, so
 * a retitled post updates here without a second edit. A slug that stops
 * existing simply drops its slide instead of breaking the build.
 */

function postSlide(slug: string, eyebrow: string, cta: string): Slide | null {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post?.image) return null;
  return {
    eyebrow,
    title: post.cardTitle,
    body: post.description,
    href: `/blog/${post.slug}`,
    cta,
    image: post.image,
  };
}

const SLIDES: Slide[] = [
  postSlide('barometre-ia-cameroun-2026', 'Research · Cameroon', 'Read the barometer'),
  {
    eyebrow: 'Meet the founder',
    title: 'Benjamin Njock',
    body: 'An 18-year insurance executive and co-founder of Tataachi Network Insurance and Optimere. His story, and why AfriShield AI exists.',
    href: '/about',
    cta: 'Read his story',
    image: { src: '/team/benjamin-njock.jpg', alt: 'Benjamin Njock, founder of AfriShield AI.' },
  },
  postSlide('ai-search-visibility-study', 'Research · Africa', 'Read the study'),
  postSlide('why-is-my-business-not-showing-on-google-maps-nigeria', 'Guide · Nigeria', 'Read the guide'),
  {
    eyebrow: 'Free tool',
    title: 'Does ChatGPT recommend your business?',
    body: 'We ask ChatGPT, Perplexity and Gemini the questions your buyers ask and send you a one-page result within 48 hours. Free, no lock-in.',
    href: '/ai-visibility-check',
    cta: 'Get the free check',
    image: POSTS.find((p) => p.slug === 'how-to-check-if-chatgpt-recommends-your-business-in-africa')
      ?.image ?? { src: '/images/blog-how-to-rank-on-chatgpt.webp', alt: '' },
  },
].filter((slide): slide is Slide => slide !== null);

export function FeaturedBand() {
  return (
    <section aria-labelledby="featured-heading" className="bg-white py-[64px] text-ink md:py-[88px]">
      <div className="container-page">
        <div className="container-inner">
          <p className="eyebrow-light">Featured</p>
          <h2 id="featured-heading" className="h2 mt-4">
            Research, guides and the people behind them
          </h2>
          <FeaturedSlider slides={SLIDES} />
        </div>
      </div>
    </section>
  );
}
