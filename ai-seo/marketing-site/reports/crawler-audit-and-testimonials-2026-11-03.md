# AfriShield AI: crawler audit and testimonials, 3 November 2026

## Summary

Crawlers can reach the site without trouble. Every bot tested got the same 200 response, and robots.txt, the sitemap, canonicals and the indexing directives are all clean. Most of the master prompt was therefore already handled. The audit found three real gaps: duplicate company and founder entities in the JSON-LD, no Google Business Profile link in `sameAs`, and a homepage still saying "we have no client quotes" when real reviews exist. Those are fixed in this change, which has not been deployed yet.

## Technical findings (live site, checked 3 Nov 2026)

| Check | Result | Evidence |
|---|---|---|
| robots.txt | OK | HTTP 200. Allows `*` plus GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Google-Extended and Applebot-Extended. Only `/thank-you` is disallowed. Sitemap is referenced. |
| Bot access (WAF/CDN) | OK | GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Googlebot and bingbot user agents each get 200 on `/` from Vercel. |
| Redirects | OK | `http://` and `www.` each 308 to `https://afrishieldai.com/` in a single hop. HSTS is set. |
| Sitemap | OK | 57 URLs, no duplicates, every URL 200, each with a lastmod (27 distinct dates, so they are not all stamped the same day). |
| Canonical / noindex | OK | All 57 have a self-referencing canonical. No noindex in meta or X-Robots-Tag. |
| Server HTML | OK | All 57 have exactly one H1, and every page has 250+ words in the raw HTML before JavaScript runs. |
| llms.txt | OK, extended | Present (200). Added a "Reviews and profiles" section. |
| JSON-LD validity | OK | Every block parses. Types found: Organization, WebSite, ProfessionalService, Service, FAQPage, BreadcrumbList, HowTo, BlogPosting, Dataset, ItemList, AboutPage, Blog. |
| **Duplicate company entity** | **Fixed (Medium)** | The homepage `ProfessionalService` had no `@id`, so it read as a second AfriShield AI. Service and Article `provider`/`publisher` were inline anonymous Organizations. All now point to `https://afrishieldai.com/#organization`. |
| **Duplicate founder entity** | **Fixed (Medium)** | /about emitted a separate "Benjamin Njock" Person with no `@id`. It now carries `#founder`, matching the Organization's founder node. |
| **GBP missing from sameAs** | **Fixed (Low)** | Added `https://www.google.com/maps?cid=10050195790891044224`. |
| Core Web Vitals | Not measured | Live TTFB ran 0.4 to 1.2 s from this machine. No PageSpeed key was used, so there are no LCP, INP or CLS numbers here. |

## Testimonials

Sources, read on 3 Nov 2026:
- **Google**: 4.5 from 4 reviews. Quoted: Martin Desire Mbang (4★), Eyang Romeo (5★) and Flawless For You Spa (5★). Left out: Jackson Fon (4★), because the review describes Jackson Eye Clinic and says nothing about AfriShield.
- **Clutch**: 4.5 from 1 verified review, by Benjamin Njock, CEO of Tataachi Network.

The homepage section is now "What clients say, and what we put in writing". Every card links to its source, and French reviews are labelled as Google's translation. The case-studies page has a Tataachi entry with the client's own description of the problem and the client-reported 5–10% traffic figure, clearly labelled as client-reported.

No Review or AggregateRating schema was added. Google ignores review markup a business publishes about itself.

## Open items (need you)

1. **The Clutch review is not independent.** The reviewer, Benjamin Njock, is AfriShield's founder, and /about says he co-founded Tataachi. The site now discloses this on every place the review appears. Clutch's guidelines exclude reviews from people with an ownership stake in the vendor, so the review could be removed if Clutch notices. Do not present it to prospects as third-party proof. The strongest move is to get a Clutch review from a client with no shared ownership, such as Jackson Eye Clinic or Niss Optique.
2. **A proper Tataachi case study needs a baseline.** Without a dated Search Console figure for before and after, a dedicated case-study page would be thin. Export Tataachi's GSC clicks for Aug–Sep vs Oct–Nov and it can be built.
3. **Courtesy permission.** The reviews are public, but a WhatsApp message to the three Google reviewers ("we've quoted your review on our site, okay?") is good practice.
4. **Deploy, then re-test**: Rich Results Test on `/` and `/about`, and resubmit the sitemap in Search Console and Bing Webmaster Tools. Neither needs to happen for indexing, but it speeds up the recrawl.
5. **TechBehemoths and other profiles**: add the Clutch profile link in their portfolio or social fields. This has to be done by hand in each dashboard.
