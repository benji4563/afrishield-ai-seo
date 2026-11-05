import { NextResponse } from 'next/server';
import { SITE } from '@/lib/site';

/**
 * Lead capture for every site form (/contact, /ai-visibility-check, /review),
 * forwarded to HubSpot as a contact.
 *
 * **Why only standard HubSpot properties.** Until 2026-11-05 this route also
 * sent `afrishield_tier_interest` and `afrishield_source_page`, two custom
 * properties that were never created in the portal. HubSpot rejects the whole
 * create when any property is unknown, so every lead failed, the visitor still
 * saw the thank-you page, and the only copy was a server log Vercel's Hobby
 * plan keeps for one hour. Tier, source page, business type and WhatsApp now
 * travel inside `message`, which exists on every portal.
 *
 * **Why a failure is shown to the visitor.** A lead that cannot be saved now
 * returns an error with the WhatsApp number and email, so the visitor can send
 * it another way, instead of a thank-you page for a message nobody received.
 */

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  tier?: string;
  message?: string;
  whatsapp?: string;
  businessType?: string;
  source?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits, spaces and the usual separators; at least 7 digits (checked below).
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

const FALLBACK = `We could not save that just now. Please send it on WhatsApp (${SITE.phone}) or email ${SITE.email}, and we will reply the same way.`;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'That request was not readable. Try again.' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim() ?? '';
  // The contact form sends `phone`, the visibility check sends `whatsapp`.
  const phone = (body.phone?.trim() || body.whatsapp?.trim()) ?? '';

  if (!name) {
    return NextResponse.json({ error: 'Add your name so we know who to reply to.' }, { status: 400 });
  }

  if (!email && !phone) {
    return NextResponse.json(
      { error: 'Add a WhatsApp or phone number, or an email, so we can reach you.' },
      { status: 400 },
    );
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: 'That email address does not look complete. Check it and resend.' },
      { status: 400 },
    );
  }

  if (phone && (!PHONE_PATTERN.test(phone) || phone.replace(/\D/g, '').length < 7)) {
    return NextResponse.json(
      { error: 'That number does not look complete. Include the country code, e.g. +237.' },
      { status: 400 },
    );
  }

  const sourcePage = body.source?.trim() || request.headers.get('referer') || '/contact';

  // Everything that is not a standard HubSpot field rides in `message`, so a
  // missing custom property can never sink a lead again.
  const message = [
    body.message?.trim(),
    [
      body.businessType?.trim() ? `Business type: ${body.businessType.trim()}` : '',
      body.tier?.trim() ? `Tier interest: ${body.tier.trim()}` : '',
      phone ? `WhatsApp/phone: ${phone}` : '',
      `Source: ${sourcePage}`,
      `Received: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join('\n'),
  ]
    .filter(Boolean)
    .join('\n\n');

  const properties: Record<string, string> = {
    firstname: name,
    message,
    hs_lead_status: 'NEW',
  };
  if (email) properties.email = email;
  if (phone) properties.phone = phone;
  if (body.company?.trim()) properties.company = body.company.trim();
  if (body.website?.trim()) properties.website = body.website.trim();

  const lead = JSON.stringify({ name, email, phone, sourcePage });
  const token = process.env.HUBSPOT_TOKEN;

  if (!token) {
    console.error('[contact] HUBSPOT_TOKEN unset, lead NOT saved:', lead, message);
    return NextResponse.json({ error: FALLBACK }, { status: 503 });
  }

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  try {
    let response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers,
      body: JSON.stringify({ properties }),
    });

    // A returning visitor's email already exists: update that contact with the
    // new message rather than dropping it.
    if (response.status === 409 && email) {
      response = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
        { method: 'PATCH', headers, body: JSON.stringify({ properties }) },
      );
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      console.error('[contact] HubSpot rejected the lead:', response.status, lead, message, errorBody);
      return NextResponse.json({ error: FALLBACK }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] HubSpot request failed:', error, lead, message);
    return NextResponse.json({ error: FALLBACK }, { status: 502 });
  }
}
