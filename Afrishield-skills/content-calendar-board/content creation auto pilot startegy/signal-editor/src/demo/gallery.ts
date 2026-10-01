import type { EditSpec, SpecEvent } from "../SignalEdit";
import type { CarouselSlideProps } from "../components/Carousel";

// Component gallery: every Signal Style component for ~2.6s. Used for visual QA of the
// library itself. All content here is labeled ILLUSTRATION — it is not a real result.
const events: Omit<SpecEvent, "startMs" | "endMs">[] = [
  { component: "Hook", props: { text: "Your website may be invisible to AI", emphasis: ["invisible"], tag: "Component · Hook" } },
  { component: "Headline", props: { setup: "Google knew the business existed.", punch: "AI didn't." } },
  { component: "ProofFlash", props: { label: "Receipt" } },
  { component: "Screenshot", props: { src: "demo/founder-frame.jpg", caption: "Real frame from a recording", source: "recordings/whitehouse-ai-visibility · 00:12" } },
  { component: "BrowserFrame", props: { url: "afrishieldai.com/blog/ai-search-visibility-study", title: "Browser frame preview", illustration: true } },
  { component: "Dashboard", props: { title: "Component preview", illustration: true, metrics: [{ label: "Views", value: "139" }, { label: "Comments", value: "4", tone: "signal" }], series: [105, 122, 125, 124, 139, 118], seriesLabel: "Sample series" } },
  { component: "MetricCounter", props: { label: "Component preview", to: 44, suffix: " / 45", note: "Counter animates to the value" } },
  { component: "BeforeAfter", props: { before: { label: "Rented land", points: ["Algorithm decides reach", "Platform owns the audience"] }, after: { label: "Owned property", points: ["Your domain", "Readable by AI"] } } },
  { component: "SignalPath", props: { title: "How AI picks a business", nodes: [{ label: "Customer", sub: "asks a question" }, { label: "AI engine" }, { label: "Sources", sub: "sites it can read" }, { label: "Your business" }], pulseLabel: "the signal" } },
  { component: "SignalPath", props: { title: "Where the booking leaks", nodes: [{ label: "Ad" }, { label: "Click" }, { label: "Checkout" }, { label: "Purchase data" }], brokenAfter: 2 } },
  { component: "AIChat", props: { engine: "AI assistant", prompt: "Best boutique hotel in Arusha?", response: "Component preview text. Real sessions are pasted verbatim from a screen recording, and the business name is highlighted.", highlight: ["business name"], illustration: true } },
  { component: "SearchResult", props: { query: "best safari operator arusha", illustration: true, results: [{ title: "Aggregator listing", url: "directory.example", badge: "Aggregator" }, { title: "Operator's own site", url: "operator.example", highlight: true, badge: "Own site" }, { title: "Travel blog", url: "blog.example" }] } },
  { component: "Comparison", props: { left: { title: "Old search", points: ["10 blue links", "You compare"], tone: "mute" }, right: { title: "AI search", points: ["2–3 names", "AI compares"], tone: "signal" }, verdict: "Be one of the names" } },
  { component: "ProcessFlow", props: { title: "Check in 10 minutes", steps: [{ label: "Ask AI your buyer's question" }, { label: "Open robots.txt" }, { label: "Read your homepage as a stranger" }] } },
  { component: "Callout", props: { x: 360, y: 900, text: "Callout points at one detail" } },
  { component: "Arrow", props: { from: { x: 300, y: 600 }, to: { x: 700, y: 1050 }, label: "Look here" } },
  { component: "CircleHighlight", props: { x: 540, y: 960, w: 420, h: 140, label: "The one number" } },
  { component: "Warning", props: { title: "Crawler blocked", text: "Component preview" } },
  { component: "Success", props: { title: "Fixed", text: "Component preview" } },
  { component: "StoryCard", props: { text: "Six TikToks. Five stalled at ~120 views. One told a story.", meta: "@enyongnjock723 · Aug–Sep 2026" } },
  { component: "HumorCard", props: { line: "Google knew the business existed. AI needed an introduction.", tag: "Humor" } },
  { component: "QuoteCard", props: { quote: "Quote cards require a real source.", author: "Component preview" } },
  { component: "NewsCard", props: { outlet: "Outlet name", date: "YYYY-MM-DD", headline: "News cards require outlet, date and link", whyItMatters: "One line on why it matters to the audience." } },
  { component: "CTA", props: { keyword: "AI", line: "and I'll show you how to check" } },
];

const STEP = 2600;
export const gallerySpec: EditSpec = {
  id: "signal-style-gallery",
  durationMs: events.length * STEP,
  events: events.map((e, i) => ({ ...e, id: `g${i}`, startMs: i * STEP, endMs: (i + 1) * STEP - 80 }) as SpecEvent),
};

export const demoSlide: CarouselSlideProps = {
  variant: "cover",
  theme: "instagram",
  index: 1,
  total: 7,
  headline: "44 of 45 businesses had no website",
  emphasis: ["no", "website"],
  sub: "What we found researching West African businesses that sell on TikTok.",
  handle: "@enyongnjock723",
};
