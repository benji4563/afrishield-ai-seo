import Link from 'next/link';
import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '@/lib/structured-data';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-to-put-your-business-on-google-maps-in-nigeria')!;

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
  { id: 'two-routes', label: 'Adding a place versus owning a profile' },
  { id: 'which-account', label: 'Which Google account should own it' },
  { id: 'search-first', label: 'Search first, then claim or request access' },
  { id: 'create', label: 'Creating the profile, step by step' },
  { id: 'address', label: 'Nigerian addresses without street numbers' },
  { id: 'verify', label: 'Verification: what to expect' },
  { id: 'after', label: 'The first week after verification' },
  { id: 'when-not-to-pay', label: 'When not to pay anyone for this' },
  { id: 'checklist', label: 'The full checklist' },
];

const FAQ = [
  {
    q: 'How do I put my business on Google Maps in Nigeria?',
    a: 'Search for the business on Google Maps first. If a listing already exists, claim it. If not, go to business.google.com/add, enter the business name, category and address or service area, and then complete the verification method Google offers. The business shows on Maps once the profile is verified.',
  },
  {
    q: 'Is it free to put my business on Google Maps?',
    a: 'Yes. Google states that a business can be added or claimed at no charge, so a Business Profile costs ₦0 in Nigeria. Anyone who charges a fee is charging for their own time to set it up. Google also states that there is no way to pay for a better local ranking.',
  },
  {
    q: 'Can I put my business on Google Maps if my address has no street number?',
    a: 'Yes. Google says that if an address does not have a street number, or the system cannot find it, the business location can be pinned directly on the map. Enter the street and area as accurately as possible, add the shop or suite number on the second address line, and place the pin on the entrance.',
  },
  {
    q: 'What is the difference between adding a missing place and creating a Business Profile?',
    a: 'Anyone can suggest a missing place on Google Maps, and it shows publicly once it is added, but the person who added it does not control it. A verified Business Profile lets the owner manage the hours, address, photos and reviews. A business should be claimed through a Business Profile, not only added as a place.',
  },
  {
    q: 'Someone else created the Google listing for my business. How do I get it back?',
    a: 'Search for the business at business.google.com/add and select it. If Google shows that someone else may manage the profile, select Request access and submit the form. Google notifies the current owner, who has 3 days to respond. If there is no response, Google may offer the option to claim the profile, although it says that option is not always available.',
  },
  {
    q: 'How long does it take for my business to show on Google Maps?',
    a: 'Creating the profile takes under an hour. Google says verification reviews take up to 5 business days and occasionally longer. Where a postcard is the method offered, Google says most codes arrive within 14 days and expire after 30 days, so that route takes longer.',
  },
];

const CHECKLIST = [
  {
    name: 'Choose the Google account that will own the profile',
    text: 'Use a Google account the business controls, not one belonging to a relative, designer or employee who may leave. Write down which account it is.',
  },
  {
    name: 'Search Google Maps for the business name and city',
    text: 'If a listing already exists, select Claim this business. If Google says someone else manages it, select Request access instead of creating a second profile.',
  },
  {
    name: 'Create the profile at business.google.com/add',
    text: 'Enter the name exactly as it appears on the signboard, choose the most specific primary category, and decide whether customers visit the location.',
  },
  {
    name: 'Enter the address or the service area',
    text: 'A business with premises customers visit enters its address and pins the entrance. A business that travels to customers hides its address and lists the areas it serves.',
  },
  {
    name: 'Complete the verification method Google offers',
    text: 'Google decides which methods are available. Complete the one shown, then avoid editing the name, address or category until the review is finished.',
  },
  {
    name: 'Add a second owner or a manager',
    text: 'Invite a second trusted person through People and access so the business is not locked out if one account is lost.',
  },
  {
    name: 'Complete the profile and start asking for reviews',
    text: 'Add hours, a phone number that is answered, photos and a description, then ask every customer for a Google review.',
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
        data={howToJsonLd(
          CHECKLIST,
          'How to put your business on Google Maps in Nigeria',
        )}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          To put your business on Google Maps in Nigeria, search for it on Google Maps first
          and <strong>claim the listing if one exists</strong>. If none exists, create a free
          Google Business Profile at business.google.com/add with the signboard name, the most
          specific category and your address or service area, then{' '}
          <strong>complete the verification method Google offers</strong>. The business
          appears on Maps once the profile is verified. It costs ₦0. Where an address has no
          street number, Google lets you pin the location directly on the map.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Tunde runs a small printing shop near Dugbe in Ibadan: business cards, wedding
            programmes, the occasional banner for a church harvest. A customer asked him for
            his Google Maps location so her driver could collect an order, and he realised he
            did not have one to send.
          </p>
          <p>
            He opened Google Maps and found that he did, in a way. Someone had added
            &ldquo;Tunde Prints&rdquo; as a place two years earlier, pinned it on the wrong
            side of the road and given it opening hours he has never kept. He could see it.
            He could not change any of it.
          </p>
          <p>
            Within a week, a man on WhatsApp had offered to &ldquo;register him on Google&rdquo;
            for ₦45,000. The form the man was selling access to is free.
          </p>
        </Scene>

        <p>
          This guide covers the setup itself: deciding who owns the listing, claiming or
          creating it, entering a Nigerian address Google can use, and getting through
          verification. If your profile already exists and is simply not appearing, start with{' '}
          <a href="/blog/why-is-my-business-not-showing-on-google-maps-nigeria">
            our diagnosis of why a business is not showing on Google Maps in Nigeria
          </a>
          . If you are in Lagos and want to know how to rank once you are listed, read{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos">
            our guide to appearing on Google Maps in Lagos
          </a>
          . The steps below apply from Kano to Calabar.
        </p>

        <h2 id="two-routes">Adding a place versus owning a profile</h2>

        <p>
          Putting a business on Google Maps properly means owning a verified Google Business
          Profile, not just adding the business as a place. Google Maps lets any user add a
          missing place, and Google says it shows publicly once added, but the person who adds
          it does not manage it. Only a verified Business Profile lets the owner control the
          hours, address, photos and replies to reviews.
        </p>

        <p>
          That is Tunde&rsquo;s situation, and it is common. A customer, a delivery rider or
          a well-meaning cousin adds the shop, and the business now exists on Maps with
          details nobody at the business chose. The fix is not to add it again. It is to
          claim the listing that is already there, which the next sections cover.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Your situation</th>
                <th>What to do</th>
                <th>What you end up with</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No listing exists anywhere</td>
                <td>Create a profile at business.google.com/add</td>
                <td>A new profile you own, live after verification</td>
              </tr>
              <tr>
                <td>A listing exists and nobody has claimed it</td>
                <td>Select Claim this business on Maps</td>
                <td>The existing listing, now managed by you</td>
              </tr>
              <tr>
                <td>A listing exists and someone else verified it</td>
                <td>Select Request access</td>
                <td>Ownership, if the current owner approves or does not respond</td>
              </tr>
              <tr>
                <td>You only want to tell Google a place exists</td>
                <td>Add a missing place in Google Maps</td>
                <td>A public place you cannot manage, which is fine for a landmark and not for a business</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="which-account">Which Google account should own the profile</h2>

        <p>
          The profile should be owned by a Google account the business itself controls, because
          whoever owns that account owns the listing. Google says a Google account is needed
          to sign up and that it can be a Gmail address or any other email address, so a
          personal Gmail works. The question is not whether it works but whose it is.
        </p>

        <p>
          The most common setup problem we see is not technical at all. A nephew, a web
          designer or a former employee created the profile on their own account, then moved
          to Abuja, changed phones or stopped answering. A Business Profile created on someone
          else&rsquo;s Gmail is a family heirloom: everyone agrees it belongs to the business,
          and nobody can open it.
        </p>

        <ul>
          <li>
            <strong>Use an account the owner signs in to.</strong> A dedicated Gmail for the
            business is sensible. Keep the password and recovery phone number with the owner.
          </li>
          <li>
            <strong>Add a second owner or a manager.</strong> Google says a profile can have
            several owners but only one primary owner. Owners have full control, including
            adding users. Managers have almost the same access but cannot add or remove users or
            remove the profile. Invite people from People and access in the profile settings;
            each person needs their own Google account.
          </li>
          <li>
            <strong>Give an agency manager access, not ownership.</strong> Anyone helping with
            the profile, us included, can do the work as a manager. Ownership stays with the
            business.
          </li>
        </ul>

        <h2 id="search-first">Search first, then claim or request access</h2>

        <p>
          Before creating anything, search Google Maps for the business name and city, because
          a listing may already exist and Google says there should be only one profile per
          business. Creating a second one does not replace the first; it gives Google two
          versions of the same shop to choose between.
        </p>

        <ul>
          <li>
            <strong>If the listing exists and is unclaimed:</strong> on a computer, select{' '}
            <em>Claim this business</em>, then <em>Manage now</em>. On the Google Maps app, open
            the listing, tap <em>About</em>, then <em>Claim this business</em>. You take over
            the existing listing rather than starting a rival one.
          </li>
          <li>
            <strong>If someone else already verified it:</strong> go to
            business.google.com/add, enter the name and address and choose the business. When
            Google says someone else may manage the profile, select <em>Request access</em> and
            submit the form.
          </li>
          <li>
            <strong>What happens next:</strong> Google emails the current owner, who has 3 days
            to respond. If they approve, you can manage the profile. If they do not respond,
            Google says you may be given the option to claim it, although it also says that
            option is not always available. If they deny the request, you can still suggest
            edits or appeal.
          </li>
        </ul>

        <p>
          For a business that serves customers at their location and has no storefront, Google
          handles ownership transfers through its support team rather than the request form.
        </p>

        <h2 id="create">Creating the profile, step by step</h2>

        <p>
          A new profile is created at business.google.com/add by entering the business name,
          choosing a category, saying whether customers visit the location, and adding contact
          details before verification. It takes well under an hour on a phone, and most of
          that time is spent deciding on the category.
        </p>

        <ol>
          <li>
            <strong>Name.</strong> Use the name on the signboard and the invoices. Google&rsquo;s
            guidelines forbid adding taglines, services, locations or keywords to the name, and
            legal suffixes such as LTD only appear where the business uses them in the real
            world. &ldquo;Tunde Prints&rdquo; is a name. &ldquo;Tunde Prints Best Printing Press
            Ibadan Dugbe&rdquo; is a suspension waiting to happen.
          </li>
          <li>
            <strong>Primary category.</strong> Choose the most specific one that describes the
            main business. A printing shop is a printing service, not a stationery store, even if
            it sells envelopes.
          </li>
          <li>
            <strong>Location.</strong> Say whether customers come to you. If they do, enter the
            address. If you travel to them, as a plumber, caterer or mobile hairdresser does, the
            address is hidden and you list a service area instead.
          </li>
          <li>
            <strong>Contact details.</strong> Add a phone number that is answered during the
            hours you list, and a website if you have one.
          </li>
          <li>
            <strong>Verification.</strong> Google then shows the verification options for the
            profile, covered below.
          </li>
        </ol>

        <h2 id="address">Nigerian addresses without street numbers</h2>

        <p>
          A business whose address has no street number can still be listed, because Google
          says that when an address lacks a street number or the system cannot find it, the
          location can be pinned directly on the map. This describes a large share of shops,
          plazas and compounds in Nigeria, and it is the step that most often goes quietly
          wrong.
        </p>

        <ul>
          <li>
            <strong>Write the address as precisely as it exists.</strong> Street, area and city,
            with the shop or suite number on the second line. Google accepts suite and floor
            numbers. It does not accept P.O. boxes, and it says address lines should not carry
            keywords or anything unrelated to the physical location.
          </li>
          <li>
            <strong>Then move the pin by hand.</strong> Zoom in on a phone and place it on the
            entrance, not the road and not the compound next door. In the profile this is under
            Edit profile, then Location, then Adjust.
          </li>
          <li>
            <strong>Do not use a virtual office.</strong> Google says a rented mailing address
            the business does not operate from is not eligible. A co-working space qualifies only
            with clear signage, customers received during business hours and staff on site.
          </li>
          <li>
            <strong>Keep a signboard up.</strong> Google says businesses showing their address
            should maintain permanent fixed signage with the business name. It also matters for
            verification, which usually asks you to show it.
          </li>
          <li>
            <strong>Service-area businesses hide the address.</strong> Google&rsquo;s guidelines
            say a business that does not serve customers at its address should hide it and list
            the areas served, and that a service area should not normally reach beyond about two
            hours of driving from the base. A Lagos caterer listing Kano as a service area is
            ambitious, and Google is not going to take it seriously.
          </li>
        </ul>

        <h2 id="verify">Verification: what to expect</h2>

        <p>
          Verification is the step that makes the profile appear on Maps, and Google decides
          which methods each business is offered; the method cannot be changed. The options
          Google lists include a phone call or text, email, a live video call, a postcard and a
          recorded video, and some businesses are asked to complete more than one.
        </p>

        <p>Three rules from Google&rsquo;s help pages save the most time:</p>

        <ul>
          <li>
            <strong>Use video if it is offered.</strong> Google recommends video verification
            where a business is eligible. The rules for the recording are strict, and they are
            set out in{' '}
            <a href="/blog/how-to-appear-on-google-maps-in-lagos#verification">
              the verification section of our Lagos guide
            </a>
            ; they apply unchanged across Nigeria.
          </li>
          <li>
            <strong>Allow up to five business days.</strong> Google says verification reviews
            take up to 5 business days and occasionally longer. A live video call is only
            available during the business hours you have listed.
          </li>
          <li>
            <strong>Do not edit while you wait.</strong> If a postcard is the method, Google says
            most codes arrive within 14 days and expire after 30. Editing the name, address or
            category, or requesting a new code, while waiting can invalidate the one in the post.
          </li>
        </ul>

        <h2 id="after">The first week after verification</h2>

        <p>
          Once verified, the profile should be completed straight away, because Google says
          complete and accurate information makes a business more likely to appear in local
          results. Being on Maps and being found on Maps are different achievements.
        </p>

        <ul>
          <li>
            Add opening hours you actually keep, a short description of what the business does,
            and photos of the signboard, the entrance and the inside.
          </li>
          <li>
            Ask every customer for a review, not only the happy ones. Google&rsquo;s rules forbid
            filtering by rating, and{' '}
            <a href="/blog/how-to-get-more-google-reviews-in-nigeria">
              our guide to getting more Google reviews in Nigeria
            </a>{' '}
            covers the WhatsApp link that does most of the work.
          </li>
          <li>
            Keep the name, phone number and address identical on the profile, Instagram,
            invoices and the website.
          </li>
          <li>
            Settle into the weekly habits in{' '}
            <a href="/blog/google-business-profile-optimization">
              our Google Business Profile optimization guide
            </a>
            : photos, replies and posts.
          </li>
        </ul>

        <h2 id="when-not-to-pay">When not to pay anyone for this</h2>

        <p>
          A single-location Nigerian business does not need to pay anyone to put itself on
          Google Maps, because Google states that a business can be added or claimed at no
          charge and the setup is an afternoon of work. Anyone selling &ldquo;Google
          registration&rdquo; is selling a free form with a delivery fee attached.
        </p>

        <p>
          We sell SEO, and we have just spent a whole article explaining how to skip us for the
          first step. Our accountant has been informed and is coping.
        </p>

        <p>
          Paying for help starts to make sense later: when a crowded category means every
          competitor is already verified, when several branches each need their own profile and
          review routine, or when the website and the pages around the profile are what decide
          who wins. That is ongoing work. Our{' '}
          <Link href="/ai-seo/lagos">Lagos</Link> and{' '}
          <Link href="/ai-seo/abuja">Abuja</Link> services cover it, the{' '}
          <Link href="/pricing">pricing page</Link> sets out the plans, and{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">
            our guide to what SEO costs in Nigeria
          </a>{' '}
          gives market rates in naira so you can compare anyone&rsquo;s quote, ours included.
        </p>

        <p>
          Maps is also not for every business. A seller who ships nationwide and takes every
          order on Instagram has customers who do not search by location, and a perfect profile
          will not change that.
        </p>

        <h2 id="checklist">The full checklist</h2>

        <p>
          A Nigerian business can be put on Google Maps by working through seven steps in order,
          from choosing the owning account to the first review request.
        </p>

        <ol>
          {CHECKLIST.map((step) => (
            <li key={step.name}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>

        <p>
          Tunde claimed the listing someone else had added, moved the pin to his side of the
          road and corrected the hours. He verified it from the shop and made his daughter a
          manager, on her own account, so the profile is no longer kept in one phone. The driver
          found the shop on the first attempt. The man on WhatsApp has since offered to
          &ldquo;upgrade&rdquo; the listing for ₦30,000, which Tunde regards as a discount.
        </p>
      </PostShell>
    </>
  );
}
