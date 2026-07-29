import { cn } from '@/lib/utils';

/**
 * Editorial photo in a fixed-aspect frame. Plain <img> with explicit
 * dimensions and lazy loading — no next/image remote config surface, and the
 * intrinsic size prevents layout shift. Images are Pexels-sourced African
 * business photography in public/images (see public/images/credits.json).
 */
export function EditorialImage({
  src,
  alt,
  className,
  ratio = 'aspect-[1200/627]',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn('relative overflow-hidden bg-ink/5', ratio, className)}>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={627}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </figure>
  );
}
