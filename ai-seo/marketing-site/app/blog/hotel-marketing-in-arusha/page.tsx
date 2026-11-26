import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('hotel-marketing-in-arusha')!;

export const metadata: Metadata = {
  title: post.metaTitle,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.published,
    images: postOgImages(post),
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: postOgImages(post),
  },
};

const TOC = [
  { id: 'search', label: 'What an Arusha hotel search shows today' },
  { id: 'by-name', label: 'Found by name, missing by need' },
  { id: 'three-markets', label: 'Three Arusha hotel markets, not one' },
  { id: 'operators', label: 'On a safari package, the operator chooses the bed' },
  { id: 'commission', label: 'What the commission is really paying for' },
  { id: 'ai', label: 'What an assistant needs before it names a hotel' },
  { id: 'order', label: 'The order of work for an Arusha property' },
  { id: 'compare', label: 'Usual spending against what the data supports' },
  { id: 'not-yet', label: 'When marketing is not the problem' },
];

const FAQ = [
  {
    q: 'How do hotels in Arusha get more direct bookings?',
    a: 'By owning the specific searches their guests make: a night near Kilimanjaro International Airport, a lodge in Usa River, a room in Arusha before a safari. In four Arusha hotel searches AfriShield ran on 26 November 2026, the broad search returned one hotel website in ten results, while the narrow Usa River search returned four. A page per room type, with a USD from-price and a direct booking route, is what lets a property win those narrow searches.',
  },
  {
    q: 'Does a hotel in Arusha need to be on Booking.com?',
    a: 'For most properties, yes, as one channel among several. In AfriShield’s searches on 26 November 2026, Booking.com, TripAdvisor, Agoda, Expedia and Kayak held most first-page places for Arusha hotel searches, so leaving them hides the property. Booking.com charges a commission on each completed reservation at the rate set in the accommodation agreement, so the aim is to stop paying it on guests who already searched for the property by name.',
  },
  {
    q: 'How can an Arusha hotel get recommended by ChatGPT?',
    a: 'Publish the facts an assistant needs on the hotel’s own website: location stated in text, distance to the airport and to town, room types, a from-price in USD, check-in hours and how to book. In AfriShield’s Safari & Hotel AI Visibility Index, published in November 2026, no business was named by an assistant unless the question already contained its name, and booking platforms were named instead.',
  },
  {
    q: 'What should a hotel in Arusha measure?',
    a: 'Measure direct bookings and enquiries by source, the share of bookings paying commission, and whether the property appears for five or six searches a new guest would make. Check those searches each month, in Google and in ChatGPT, without typing the hotel’s name. Website visits on their own say little about whether the marketing is working.',
  },
  {
    q: 'How much does hotel marketing cost in Arusha?',
    a: 'None of the Arusha agency pages on Google’s first page publishes a price, checked on 26 November 2026. AfriShield publishes its plans at USD 150, 400 and 900 a month across African markets. Before comparing prices, ask any provider which searches it will target for the property and how it will report on them.',
  },
  {
    q: 'Does an Arusha lodge need a new website to be found on Google?',
    a: 'Usually not. A redesign that keeps the same missing facts changes little for search engines or assistants, which read text, not themes. Adding room pages, location facts and a direct booking route to the existing site costs less than a redesign and addresses what they actually read.',
  },
];

const STEPS = [
  {
    name: 'Fill in the Google Business Profile completely',
    text: 'Choose the correct category, add the exact location pin, check-in hours, the website link and current photographs, and reply to reviews.',
  },
  {
    name: 'State the location in plain text on the website',
    text: 'Write the driving time to Kilimanjaro International Airport, to Arusha town and to the nearest park gate, and the area name guests search for.',
  },
  {
    name: 'Publish one page per room type with a USD from-price',
    text: 'Give each room type its own page with occupancy, what is included and a from-price in USD, and link it to a direct booking route.',
  },
  {
    name: 'Write a page for safari operators',
    text: 'List transfer times, late check-in arrangements, parking for safari vehicles and a contact for trade rates, so operators can place guests without phoning.',
  },
  {
    name: 'Write a short llms.txt by hand and allow AI crawlers',
    text: 'Describe the property, where it is, what it costs and how to book, name the property in the first line, and check that robots.txt does not refuse AI crawlers.',
  },
  {
    name: 'Test the searches a new guest would make',
    text: 'Each month, search Google and ask ChatGPT for a hotel in your area without your name, and record which businesses are named.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />
      <StructuredData
        data={howToJsonLd(STEPS, 'Hotel marketing in Arusha: the order of work')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Hotel marketing in Arusha means being found by guests who do not yet know the property&rsquo;s
          name, on Google and in AI assistants. In four Arusha hotel searches we ran on 26 November 2026,
          <strong> the broad search &ldquo;best hotel in Arusha&rdquo; returned one hotel website in ten
          results; the narrow search &ldquo;lodge in Usa River Arusha&rdquo; returned four</strong>. Booking
          platforms held the top places in both. The work that changes this is specific: a complete Google
          Business Profile, the location stated in text, one page per room type with a USD price, a page for
          safari operators, and a direct booking route.
        </ShortAnswer>

        <EditorialImage src={post.image!.src} alt={post.image!.alt} priority className="my-10" />

        <Scene>
          <p>
            A fourteen-room lodge outside Arusha, on the road towards the airport, gets a booking at eleven
            at night. It comes through a booking platform. The guest&rsquo;s first WhatsApp message says they
            found the lodge on its own Instagram, liked the verandas, searched the name, and clicked the
            first result.
          </p>
          <p>
            The first result was not the lodge&rsquo;s website. It was the platform&rsquo;s page for the
            lodge, with the lodge&rsquo;s photographs, the lodge&rsquo;s verandas and somebody else&rsquo;s
            commission.
          </p>
          <p>
            The owner is pleased about the booking and annoyed about the invoice, which is the normal
            emotional state of an independent hotelier in northern Tanzania.
          </p>
        </Scene>

        <h2 id="search">What an Arusha hotel search shows today</h2>

        <p>
          An Arusha hotel search today mostly shows booking platforms, not hotels. On 26 November 2026 we
          ran four searches a guest might make, through a search tool set to Tanzania, and counted whose
          pages came back in the first ten results. Google results move with location and device, so treat
          these as one dated reading, not a permanent ranking.
        </p>

        <ul>
          <li>
            <strong>&ldquo;best hotel in Arusha&rdquo;</strong>: one hotel website in ten, an international
            chain at position three. The rest were Booking.com twice, TripAdvisor, Agoda, Expedia, Kayak, a
            tour operator&rsquo;s guide, a luxury travel magazine and a Reddit thread.
          </li>
          <li>
            <strong>&ldquo;hotel near Kilimanjaro International Airport&rdquo;</strong>: one independent
            lodge&rsquo;s own site, at position seven. Booking.com, TripAdvisor and Agoda held the top three.
          </li>
          <li>
            <strong>&ldquo;where to stay in Arusha before a safari&rdquo;</strong>: six of the ten results
            were written by safari operators. One Arusha lodge&rsquo;s own guide appeared, at position six.
          </li>
          <li>
            <strong>&ldquo;lodge in Usa River Arusha&rdquo;</strong>: four lodges&rsquo; own sites in ten.
            Booking.com and TripAdvisor still took positions one, two, three and five.
          </li>
        </ul>

        <p>
          The pattern is the useful part. The broader the search, the fewer hotels on the page. The
          narrower and more local the search, the more room there is for a property&rsquo;s own website.
          None of the agency pages ranking for &ldquo;hotel marketing in Arusha&rdquo; publishes figures
          like these, which is understandable: counting search results is less glamorous than drone
          footage of an infinity pool.
        </p>

        <h2 id="by-name">Found by name, missing by need</h2>

        <p>
          Hospitality businesses in East Africa are usually found by people who know their name and missed
          by people who need what they sell. That was the central finding of our{' '}
          <a href="/blog/africa-safari-hotel-ai-visibility-index-2026">Safari &amp; Hotel AI Visibility
          Index</a>, which audited seven operators and hotels in Tanzania, Kenya, Uganda and South Africa
          between 14 September and 14 October 2026: five of the seven ranked first for their own name, and
          five of the seven reached page one for none of the searches that describe what they sell.
        </p>

        <p>
          The two hotels in that index did a little better than the operators, and only a little. The
          Kampala hotel reached page one once, in position eight; the Cape Town hotel twice. On most other
          hotel searches, the winning pages were booking platforms selling those same hotels&rsquo; rooms.
          In our{' '}
          <a href="/blog/ai-search-visibility-study-october-2026">October 2026 search study</a>, TripAdvisor
          was the first organic result in all four city-hotel searches, in Nairobi, Lagos, Accra and
          Johannesburg, and hotels and safari operators owned 28% of page one against 62% for accounting
          firms.
        </p>

        <p>
          An Arusha property is in the same position. Ranking first for your own name feels like
          visibility. It is the easiest search on the internet to win, and it only reaches guests who were
          coming anyway.
        </p>

        <h2 id="three-markets">Three Arusha hotel markets, not one</h2>

        <p>
          An Arusha hotel should market itself to one of three distinct groups of guests, because each
          searches differently. Treating &ldquo;Arusha&rdquo; as one market is how a property ends up
          competing with Booking.com for the broadest phrase in the region.
        </p>

        <ul>
          <li>
            <strong>The airport night.</strong> Guests landing late at Kilimanjaro International Airport,
            between Arusha and Moshi, search for a hotel near the airport, a late check-in and a
            transfer. Our airport search returned only one lodge&rsquo;s
            own website on page one. A property on that side of town that states its driving time to the
            terminal and its late check-in hours is answering a question almost nobody else answers on
            their own site.
          </li>
          <li>
            <strong>The town stay.</strong> Guests staying in town or in residential areas such as Njiro
            want restaurants, shops and short drives to meetings. They compare on price, safety and
            location in the city, and Google Maps does most of the deciding, so the Google Business Profile
            matters more here than anywhere. Its reviews, and the property&rsquo;s replies to them, are
            what a guest reads in the minute before choosing; they build trust once you are found, though
            our index showed they do not get you found on their own.
          </li>
          <li>
            <strong>The pre-safari lodge.</strong> Usa River and the Meru foothills sit on the road between
            Arusha and the airport, and lodges there sell gardens, quiet and a first night before the
            Serengeti. This is the market where our searches found the most lodges&rsquo; own websites, and
            the one where a property can realistically hold a page-one place against the platforms.
          </li>
        </ul>

        <p>
          Pick the one your property actually serves, and write the website for those guests in their
          words. A lodge in Usa River that describes itself as &ldquo;a luxury hotel in Arusha&rdquo; has
          chosen the one phrase it cannot win.
        </p>

        <h2 id="operators">On a safari package, the operator chooses the bed</h2>

        <p>
          When a guest books a safari package in Arusha, the operator chooses the beds, so the safari
          operator is the customer to win for those nights. Our &ldquo;where to stay in Arusha before a safari&rdquo; search
          shows how far this goes: six of the ten first-page results were written by safari operators. The
          operators are, in effect, the editors of Arusha&rsquo;s accommodation guide.
        </p>

        <p>
          That makes operators a marketing audience in their own right. An operator building a six-day
          itinerary at speed wants to know four things about the first night: how long the transfer from
          the airport takes, whether a late arrival can check in, whether there is parking for a safari
          vehicle, and who to call for trade rates. A property that answers all four on one page of its
          website is easier to place than one that answers them by phone during office hours.
        </p>

        <p>
          This post is written for the property owner. If you run the safari company that does the
          booking, our guide to{' '}
          <a href="/blog/seo-for-safari-companies-in-tanzania">SEO for safari companies in Tanzania</a>{' '}
          covers your side of the same problem, from the audits of three Arusha and Moshi operators.
        </p>

        <h2 id="commission">What the commission is really paying for</h2>

        <p>
          OTA commission is the price a property pays for a booking it did not win on its own website.
          Booking.com&rsquo;s own partner help states that commission is charged as a percentage of each
          completed reservation, at the rate set in the property&rsquo;s accommodation agreement. On guests
          who discovered you through the platform, that is a fair price for reach. On guests who already
          searched for your name, it is a fee for a lost click.
        </p>

        <p>
          The arithmetic is worth doing with your own agreement in front of you. With illustrative
          figures: at a 15 percent rate, a guest who books a USD 120 room for two nights through the
          platform costs the property USD 36 in commission. Multiply that by the bookings each month whose
          guests searched for the property by name, and you have the budget a direct channel is competing
          against.
        </p>

        <p>
          The aim is not to leave the platforms. In every search we ran they held most of page one, and a
          property that disappears from them disappears from most guests. The aim is to change the mix,
          which our guide to{' '}
          <a href="/blog/how-to-reduce-ota-commission">reducing OTA commission</a> sets out step by step.
        </p>

        <h2 id="ai">What an assistant needs before it names a hotel</h2>

        <p>
          An AI assistant names a hotel when the hotel&rsquo;s own pages state the facts the question asks
          for, in text it can read. A guest asking ChatGPT for a quiet lodge near Arusha with an airport
          transfer is asking about location, atmosphere, service and price. If those facts live only in
          photographs, a booking platform&rsquo;s listing and a PDF rate card, the assistant names the
          platform, which is what our index found it doing.
        </p>

        <p>
          The facts an Arusha property should publish on its own site, in plain sentences:
        </p>

        <ul>
          <li>The area name guests use, and driving times to the airport, to town and to the nearest park gate.</li>
          <li>Room types, occupancy and a from-price in USD, with what is included.</li>
          <li>Check-in hours, late arrival arrangements and whether transfers are offered.</li>
          <li>How to book directly: a booking engine, a form or a WhatsApp number that someone answers.</li>
        </ul>

        <p>
          Then make sure an assistant is allowed to read them. In our index, one hotel group published an{' '}
          <code>llms.txt</code> file that did not name the hotel we audited, and one operator listed pages
          its own server refused to AI crawlers. Neither problem takes more than an afternoon to fix. Our
          guide to{' '}
          <a href="/blog/how-to-get-hotel-cited-by-chatgpt">getting a hotel cited by ChatGPT</a> covers
          what each property page should contain.
        </p>

        <h2 id="order">The order of work for an Arusha property</h2>

        <p>
          The order of work for an Arusha hotel or lodge is: Google Business Profile, location facts, room
          pages, an operator page, AI access, then monthly testing. Most properties start with paid social
          posts, which are pleasant to look at and leave no page behind for anyone to find later.
        </p>

        <ol>
          <li>
            <strong>Complete the Google Business Profile</strong>: correct category, exact pin, check-in
            hours, website link, current photographs, and replies to reviews.
          </li>
          <li>
            <strong>State the location in text</strong>: area name and driving times to the airport, to
            town and to the nearest park gate.
          </li>
          <li>
            <strong>Publish one page per room type</strong> with occupancy, inclusions and a USD
            from-price, linked to a direct booking route.
          </li>
          <li>
            <strong>Write a page for safari operators</strong>: transfer times, late check-in, vehicle
            parking and a trade contact.
          </li>
          <li>
            <strong>Write a short <code>llms.txt</code> by hand</strong>, name the property in its first
            line, and check that <code>robots.txt</code> does not refuse AI crawlers.
          </li>
          <li>
            <strong>Test what a new guest sees</strong>: search Google and ask ChatGPT for a hotel in your
            area without your name. Our <a href="/ai-visibility-check">free AI visibility check</a> runs
            this for you.
          </li>
        </ol>

        <p>
          This is the work we do{' '}
          <a href="/for-lodges-hotels">for lodges and hotels</a>, and what{' '}
          <a href="/research">AfriShield Research</a> will keep measuring across the region, edition by
          edition, so the claims in this post can be checked against the next reading rather than taken on
          trust.
        </p>

        <h2 id="compare">Usual spending against what the data supports</h2>

        <p>
          The spending that moves an Arusha property in search is mostly on its own pages, not on
          advertising or design. The table sets common choices against what the searches and the index
          point to.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>What properties usually do</th>
                <th>What the data points to instead</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Target &ldquo;best hotel in Arusha&rdquo;</td>
                <td>Target the airport night, the area or the pre-safari stay</td>
                <td>The broad search returned one hotel website in ten results</td>
              </tr>
              <tr>
                <td>One &ldquo;Rooms&rdquo; page with a gallery</td>
                <td>One page per room type with a USD from-price</td>
                <td>Search engines and assistants quote text, not photographs</td>
              </tr>
              <tr>
                <td>Leave the booking platforms</td>
                <td>Stay on them, and win the searches for your own name</td>
                <td>Platforms held most of page one in all four searches</td>
              </tr>
              <tr>
                <td>Wait for operators to phone</td>
                <td>Publish an operator page with transfer times and a trade contact</td>
                <td>Six of ten pre-safari results were written by operators</td>
              </tr>
              <tr>
                <td>Redesign the website</td>
                <td>Add the missing pages to the current site</td>
                <td>A new theme with the same missing facts is a new frame round an empty picture</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="not-yet">When marketing is not the problem</h2>

        <p>
          An Arusha property that sells most of its rooms on contract to safari operators does not need to
          spend much on search marketing yet. If two or three operators fill the lodge in season under
          allotment agreements, the relationship with those operators is the marketing, and an operator
          page plus a complete Google Business Profile is enough.
        </p>

        <p>
          The same is true if nobody can answer enquiries quickly. A guest in Europe who writes on WhatsApp
          after dinner is writing at about ten at night in Arusha; one in North America, in the small hours.
          A guest left waiting until morning has had all night to book somewhere that replied. Fix the reply time first; otherwise the visibility is
          paid for and then handed back to the platform.
        </p>

        <p>
          It is worth doing when commission on name searches is a line you notice every month, when the
          low season is quiet enough to hurt, or when you would simply like the verandas to bring in guests
          under your own name. We are, admittedly, a company that writes long articles telling hotels to
          write more pages. We have at least checked the search results first.
        </p>
      </PostShell>
    </>
  );
}
