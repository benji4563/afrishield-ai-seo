import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="surface-dark flex min-h-[70vh] items-center pb-[110px] pt-[160px]">
      <div className="container-page">
        <div className="container-inner max-w-[58ch]">
          <p className="eyebrow-dark">404</p>
          {/* An empty screen is an invitation to act, not a joke at the
              visitor's expense. */}
          <h1 className="h1 mt-6">That page is not here</h1>
          <p className="mt-7 text-lead body-dim">
            Either the link is wrong or we moved something without leaving a redirect. If
            you followed a link from our own site, tell us and we will fix it today.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/blog" variant="ghost-dark">
              Read the blog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
