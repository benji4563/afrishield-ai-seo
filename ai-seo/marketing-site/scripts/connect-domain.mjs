// Connect the custom domain to the Vercel project and report DNS status.
//
// Token is read from VERCEL_TOKEN in the environment — never hardcode it and
// never commit it. Optional overrides:
//   VERCEL_TEAM_ID   team / scope id, if the project lives under a team
//   VERCEL_PROJECT   project name or id           (default: afrishield-ai-seo)
//   APEX_DOMAIN      apex domain to attach        (default: afrishieldai.com)
//
// Idempotent: safe to re-run. It ensures the apex and www domains are attached
// to the project, points www -> apex as a 308 redirect (all metadata in this
// codebase hardcodes the bare apex), then prints each domain's verification
// state and the exact DNS records to set at the registrar. It changes Vercel
// project config only — it never touches the registrar, and it never prints
// the token. Run: VERCEL_TOKEN=xxx node scripts/connect-domain.mjs

const API = 'https://api.vercel.com';
const TOKEN = process.env.VERCEL_TOKEN;
const TEAM = process.env.VERCEL_TEAM_ID;
const PROJECT = process.env.VERCEL_PROJECT ?? 'afrishield-ai-seo';
const APEX = process.env.APEX_DOMAIN ?? 'afrishieldai.com';
const WWW = `www.${APEX}`;

if (!TOKEN) {
  console.error(
    'VERCEL_TOKEN not set. Add it as an environment secret (never paste it in\n' +
      'chat or commit it), then re-run: VERCEL_TOKEN=xxx node scripts/connect-domain.mjs',
  );
  process.exit(1);
}

function fail(msg) {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
}

async function api(path, { method = 'GET', body } = {}) {
  const url = new URL(API + path);
  if (TEAM) url.searchParams.set('teamId', TEAM);
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  return { status: res.status, ok: res.ok, json };
}

const errMsg = (r) => r.json?.error?.message ?? r.json?.raw ?? `HTTP ${r.status}`;
const isAlreadyExists = (r) =>
  r.status === 409 ||
  r.json?.error?.code === 'domain_already_in_use' ||
  /already/i.test(r.json?.error?.message ?? '');

// Attach a domain to the project, tolerating "already attached". Returns the
// project-domain record (which carries verified / verification fields).
async function ensureDomain(name, extra = {}) {
  const add = await api(`/v10/projects/${PROJECT}/domains`, {
    method: 'POST',
    body: { name, ...extra },
  });
  if (!add.ok && !isAlreadyExists(add)) {
    fail(`Could not attach ${name}: ${errMsg(add)}`);
  }
  const get = await api(`/v9/projects/${PROJECT}/domains/${name}`);
  if (!get.ok) fail(`Attached ${name} but could not read it back: ${errMsg(get)}`);
  return { created: add.ok, record: get.json };
}

async function main() {
  // 1. Resolve the project so a bad token / wrong scope fails loudly up front.
  const proj = await api(`/v9/projects/${PROJECT}`);
  if (!proj.ok) {
    fail(
      `Cannot read project "${PROJECT}" (${errMsg(proj)}).\n` +
        '  • 403/401 → the token is wrong or lacks scope.\n' +
        '  • 404 → wrong VERCEL_PROJECT, or the project is under a team and\n' +
        '    VERCEL_TEAM_ID is not set.',
    );
  }
  console.log(`Project: ${proj.json.name} (${proj.json.id})`);

  // 2. Attach apex (production) and www (308 redirect to apex).
  const apex = await ensureDomain(APEX);
  const www = await ensureDomain(WWW, { redirect: APEX, redirectStatusCode: 308 });

  // Make sure an already-existing www actually redirects (idempotent fix-up).
  if (www.record.redirect !== APEX || www.record.redirectStatusCode !== 308) {
    const patch = await api(`/v9/projects/${PROJECT}/domains/${WWW}`, {
      method: 'PATCH',
      body: { redirect: APEX, redirectStatusCode: 308 },
    });
    if (!patch.ok) fail(`Could not set ${WWW} -> ${APEX} 308 redirect: ${errMsg(patch)}`);
  }

  // 3. Report status + required DNS for each domain.
  let allReady = true;
  for (const [label, { record }] of [
    [`${APEX} (apex, production)`, apex],
    [`${WWW} (308 -> ${APEX})`, www],
  ]) {
    const cfg = await api(`/v6/domains/${record.name}/config`);
    const misconfigured = cfg.json?.misconfigured;
    const verified = record.verified !== false;
    const ready = verified && misconfigured === false;
    allReady &&= ready;

    console.log(`\n${ready ? '✔' : '…'} ${label}`);
    console.log(`    verified: ${verified}   dns configured: ${misconfigured === false}`);

    if (Array.isArray(record.verification) && record.verification.length) {
      console.log('    verification records required (add at your DNS host):');
      for (const v of record.verification) {
        console.log(`      ${v.type}  ${v.domain}  ->  ${v.value}`);
      }
    }
  }

  // 4. DNS the registrar still needs, in plain terms.
  if (allReady) {
    console.log('\n✔ Both domains verified and DNS-configured. Nothing left at the registrar.');
  } else {
    console.log(
      '\nDNS to set at the registrar (pick ONE approach):\n' +
        '\n  A) Nameserver delegation (recommended — all DNS then lives in Vercel):\n' +
        '       ns1.vercel-dns.com\n' +
        '       ns2.vercel-dns.com\n' +
        '\n  B) Individual records (keep DNS at the registrar):\n' +
        `       ${APEX}   A       76.76.21.21\n` +
        `       ${WWW}   CNAME   cname.vercel-dns.com\n` +
        '\n  Plus any verification records printed above. HTTPS provisions\n' +
        '  automatically about a minute after DNS resolves. Re-run this script\n' +
        '  to confirm once records propagate.',
    );
  }

  console.log('\nDone. Vercel project config is set; remaining steps are DNS-side.');
}

main().catch((e) => fail(e?.message ?? String(e)));
