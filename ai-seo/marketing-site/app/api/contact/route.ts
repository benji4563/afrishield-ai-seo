import { NextResponse } from 'next/server';
import { REF_COOKIE, normalizeRef } from '@/lib/affiliate';
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
 * **Two destinations.** Each lead goes to HubSpot and to the Supabase
 * `site_leads` table (with the affiliate `ref` that referred it; see
 * supabase/migrations). It counts as saved if either one takes it, so a single
 * outage cannot lose a lead. Supabase stays optional: with SUPABASE_URL or
 * SUPABASE_SERVICE_ROLE_KEY unset, only HubSpot is used.
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
  ref?: string;
};

type StoredLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  tier: string;
  message: string;
  sourcePage: string;
  ref: string | null;
  receivedAt: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits, spaces and the usual separators; at least 7 digits (checked below).
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

const FALLBACK = `We could not save that just now. Please send it on WhatsApp (${SITE.phone}) or email ${SITE.email}, and we will reply the same way.`;

/** Cookie header lookup, for when the form could not read the cookie itself. */
function cookieValue(request: Request, name: string): string | null {
  const match = request.headers.get('cookie')?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Writes the lead to Supabase with the service-role key; RLS is on with no
 * public policies, so nothing in the browser can read or write the table.
 * Returns whether the row was stored, or null when Supabase is not configured.
 */
async function storeLead(lead: StoredLead): Promise<boolean | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  // New-style secret keys (sb_secret_…) are not JWTs and go in `apikey` only;
  // a legacy service_role JWT also goes in Authorization.
  const headers: Record<string, string> = {
    apikey: key,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  };
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`;

  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/site_leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: lead.name,
        email: lead.email || null,
        phone: lead.phone || null,
        company: lead.company || null,
        website: lead.website || null,
        tier: lead.tier || null,
        message: lead.message,
        source_page: lead.sourcePage,
        ref: lead.ref,
        received_at: lead.receivedAt,
      }),
    });
    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      console.error('[contact] Supabase rejected the lead:', response.status, errorBody, JSON.stringify(lead));
      return false;
    }
    return true;
  } catch (error) {
    console.error('[contact] Supabase request failed:', error, JSON.stringify(lead));
    return false;
  }
}

/** Creates the HubSpot contact, or updates it when the email already exists. */
async function forwardToHubSpot(properties: Record<string, string>, email: string): Promise<boolean> {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) {
    console.error('[contact] HUBSPOT_TOKEN unset, lead not forwarded to HubSpot');
    return false;
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
      console.error('[contact] HubSpot rejected the lead:', response.status, JSON.stringify(properties), errorBody);
      return false;
    }
    return true;
  } catch (error) {
    console.error('[contact] HubSpot request failed:', error, JSON.stringify(properties));
    return false;
  }
}

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

  const ref = normalizeRef(body.ref) ?? normalizeRef(cookieValue(request, REF_COOKIE));
  // Kept in HubSpot too, so a WhatsApp-closed deal can still be credited.
  if (ref) properties.message = `${message}\nAffiliate ref: ${ref}`;

  const [forwarded, stored] = await Promise.all([
    forwardToHubSpot(properties, email),
    storeLead({
      name,
      email,
      phone,
      company: body.company?.trim() ?? '',
      website: body.website?.trim() ?? '',
      tier: body.tier?.trim() ?? '',
      message,
      sourcePage,
      ref,
      receivedAt: new Date().toISOString(),
    }),
  ]);

  if (!forwarded && !stored) {
    console.error('[contact] lead NOT saved anywhere:', JSON.stringify({ name, email, phone, sourcePage, ref }), message);
    return NextResponse.json({ error: FALLBACK }, { status: 502 });
  }

  return NextResponse.json({ ok: true, forwarded, stored });
}
