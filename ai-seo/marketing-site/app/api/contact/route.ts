import { NextResponse } from 'next/server';

/**
 * Lead capture. HubSpot is the intended destination (see the folder CLAUDE.md)
 * but no token is provisioned yet, so the call is skipped gracefully rather
 * than failing the submission. Set HUBSPOT_TOKEN to switch it on — nothing
 * else needs to change.
 */

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  tier?: string;
  message?: string;
  whatsapp?: string;
  businessType?: string;
  source?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'That request was not readable. Try again.' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  // The visibility-check form sends a business type instead of free text, so a
  // message is only required when neither is present.
  const details = [
    body.businessType?.trim() ? `Business type: ${body.businessType.trim()}` : '',
    body.whatsapp?.trim() ? `WhatsApp: ${body.whatsapp.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  const message = [body.message?.trim(), details].filter(Boolean).join('\n\n');

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email and a short description are all needed before we can reply.' },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: 'That email address does not look complete — check it and resend.' },
      { status: 400 },
    );
  }

  const lead = {
    name,
    email,
    company: body.company?.trim() ?? '',
    website: body.website?.trim() ?? '',
    tier: body.tier?.trim() ?? '',
    message,
    // An explicit `source` from the form wins over the referer, which browsers
    // can strip. Keeps leads attributable to the page that captured them.
    sourcePage: body.source?.trim() || request.headers.get('referer') || '/contact',
    receivedAt: new Date().toISOString(),
  };

  const token = process.env.HUBSPOT_TOKEN;

  if (!token) {
    console.info('[contact] HUBSPOT_TOKEN unset — lead accepted, not forwarded:', lead.email);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          email: lead.email,
          firstname: lead.name,
          company: lead.company,
          website: lead.website,
          message: lead.message,
          hs_lead_status: 'NEW',
          afrishield_tier_interest: lead.tier,
          afrishield_source_page: lead.sourcePage,
        },
      }),
    });

    if (!response.ok) {
      // The lead is still captured in logs — never lose it to a CRM outage.
      const errorBody = await response.json().catch(() => null);
      console.error('[contact] HubSpot rejected the lead:', response.status, lead.email, errorBody);
      return NextResponse.json({ ok: true, forwarded: false });
    }

    return NextResponse.json({ ok: true, forwarded: true });
  } catch (error) {
    console.error('[contact] HubSpot request failed:', error, lead.email);
    return NextResponse.json({ ok: true, forwarded: false });
  }
}
