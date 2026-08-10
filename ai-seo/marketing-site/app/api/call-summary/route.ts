import { NextResponse } from 'next/server';

/**
 * Inbound AI call webhook. The voice platform (Vapi, Retell, or similar) POSTs
 * here when a call ends; the caller becomes a HubSpot contact, exactly like a
 * contact-form lead. Set CALL_WEBHOOK_SECRET to a random string and configure
 * the platform to send it — as Vapi's serverUrlSecret (x-vapi-secret header) or
 * as a custom x-call-webhook-secret header. Until then requests are accepted
 * with a warning, matching the HUBSPOT_TOKEN pattern in
 * app/api/contact/route.ts.
 *
 * Two payload shapes are understood:
 * - Vapi's end-of-call report ({ message: { type: 'end-of-call-report', ... } })
 * - a flat shape ({ caller, name, email, summary, transcript, durationSeconds })
 * Anything else that at least carries a caller number or a summary is accepted.
 */

type FlatPayload = {
  caller?: string;
  name?: string;
  email?: string;
  summary?: string;
  transcript?: string;
  durationSeconds?: number;
};

type VapiPayload = {
  message?: {
    type?: string;
    summary?: string;
    transcript?: string;
    recordingUrl?: string;
    call?: {
      customer?: { number?: string };
      startedAt?: string;
      endedAt?: string;
    };
    customer?: { number?: string };
    analysis?: {
      summary?: string;
      structuredData?: { name?: string; email?: string };
    };
  };
};

type CallLead = {
  caller: string;
  name: string;
  email: string;
  summary: string;
  transcript: string;
  durationSeconds: number | null;
  receivedAt: string;
};

function normalise(body: FlatPayload & VapiPayload): CallLead | null {
  const msg = body.message;

  // Vapi sends several event types to the same server URL — only the
  // end-of-call report carries everything we need. Other events are fine,
  // they just aren't leads.
  if (msg && msg.type && msg.type !== 'end-of-call-report') return null;

  const startedAt = msg?.call?.startedAt ? Date.parse(msg.call.startedAt) : NaN;
  const endedAt = msg?.call?.endedAt ? Date.parse(msg.call.endedAt) : NaN;
  const vapiDuration =
    Number.isFinite(startedAt) && Number.isFinite(endedAt)
      ? Math.max(0, Math.round((endedAt - startedAt) / 1000))
      : null;

  const lead: CallLead = {
    caller: (msg?.call?.customer?.number ?? msg?.customer?.number ?? body.caller ?? '').trim(),
    name: (msg?.analysis?.structuredData?.name ?? body.name ?? '').trim(),
    email: (msg?.analysis?.structuredData?.email ?? body.email ?? '').trim(),
    summary: (msg?.analysis?.summary ?? msg?.summary ?? body.summary ?? '').trim(),
    transcript: (msg?.transcript ?? body.transcript ?? '').trim(),
    durationSeconds: vapiDuration ?? body.durationSeconds ?? null,
    receivedAt: new Date().toISOString(),
  };

  if (!lead.caller && !lead.summary) return null;
  return lead;
}

export async function POST(request: Request) {
  const secret = process.env.CALL_WEBHOOK_SECRET;

  if (secret) {
    // Accept our own header or Vapi's native one (set via serverUrlSecret).
    const presented =
      request.headers.get('x-call-webhook-secret') ?? request.headers.get('x-vapi-secret');
    if (presented !== secret) {
      return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
    }
  } else {
    console.warn('[call-summary] CALL_WEBHOOK_SECRET unset — accepting unauthenticated calls.');
  }

  let body: FlatPayload & VapiPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'That request was not readable. Try again.' }, { status: 400 });
  }

  const lead = normalise(body);

  if (!lead) {
    // Not an end-of-call event, or nothing usable in it — acknowledge so the
    // platform does not retry.
    return NextResponse.json({ ok: true, lead: false });
  }

  const token = process.env.HUBSPOT_TOKEN;

  if (!token) {
    console.info('[call-summary] HUBSPOT_TOKEN unset — lead accepted, not forwarded:', lead.caller);
    return NextResponse.json({ ok: true, lead: true, forwarded: false });
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
          email: lead.email || undefined,
          firstname: lead.name || undefined,
          phone: lead.caller,
          hs_lead_status: 'NEW',
          afrishield_source_page: 'inbound-ai-call',
          afrishield_call_summary: lead.summary,
          afrishield_call_duration_seconds: lead.durationSeconds ?? undefined,
        },
      }),
    });

    if (!response.ok) {
      // The lead is still captured in logs — never lose it to a CRM outage.
      console.error('[call-summary] HubSpot rejected the lead:', response.status, lead.caller);
      return NextResponse.json({ ok: true, lead: true, forwarded: false });
    }

    return NextResponse.json({ ok: true, lead: true, forwarded: true });
  } catch (error) {
    console.error('[call-summary] HubSpot request failed:', error, lead.caller);
    return NextResponse.json({ ok: true, lead: true, forwarded: false });
  }
}
