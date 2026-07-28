# Deployment — afrishieldai.com

Not executed in this build. It needs a GitHub repo you create and a Vercel
login, neither of which an agent should do on your behalf. Everything below is
ready to run.

## 1. Repository

Create an **empty** repo named `afrishieldai-marketing-site` — no README, no
`.gitignore`, no licence. Then, from this folder:

```bash
git init && git add -A && git commit -m "Initial AfriShield AI SEO marketing site" && git branch -M main && git remote add origin https://github.com/<you>/afrishieldai-marketing-site.git && git push -u origin main
```

## 2. Vercel

Sign in with GitHub → Import Repository → it auto-detects Next.js. No build
settings need changing.

### Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://afrishieldai.com` — canonicals and OG break without it |
| `HUBSPOT_TOKEN` | No | Private-app token. Unset, the contact form still accepts and logs leads |
| `GOOGLE_SITE_VERIFICATION` | Later | Paste the value Search Console gives you, then redeploy |
| `BING_SITE_VERIFICATION` | Later | Same, from Bing Webmaster Tools |

Do not invent verification hashes. They are issued per property and a guessed
value silently fails.

## 3. Domain

Prefer **nameserver delegation** over manual A records — all DNS then lives in
Vercel and you never touch the registrar again.

1. Vercel → **Project** Settings → Domains (note: Project, not Team — this trips
   people up) → add `afrishieldai.com` and `www.afrishieldai.com`
2. At your registrar, set nameservers to `ns1.vercel-dns.com` and
   `ns2.vercel-dns.com`
3. **GoDaddy specifically:** their Airo assistant does not support Vercel. Ignore
   it entirely and use the Nameservers sub-tab under DNS
4. Set the apex as Production; `www` should be a 308 redirect to apex. All
   metadata in this codebase hardcodes the apex with no `www`
5. HTTPS provisions automatically about a minute after DNS resolves

Verify:

```bash
curl -I https://www.afrishieldai.com
```

That must return `308`, redirecting to the apex. Both defaulting to Production
is the most common misconfiguration.

## 4. Post-launch

1. Search Console → add `afrishieldai.com` as a domain property → paste the
   verification value into `GOOGLE_SITE_VERIFICATION` → redeploy → verify
2. Submit `sitemap.xml` (Search Console → Sitemaps → enter `sitemap.xml`)
3. Run Lighthouse on the live URL. Expect near-100 across the board — there are
   no images, no third-party scripts, and no client-side data fetching yet
4. Smoke-test every route:

```bash
for r in / /solutions /how-it-works /pricing /case-studies /blog /contact; do echo "$(curl -s -o /dev/null -w '%{http_code}' https://afrishieldai.com$r) $r"; done
```

## 5. Before you announce it

- [ ] `NEXT_PUBLIC_SITE_URL` set, canonicals resolve to the apex
- [ ] `www` returns 308
- [ ] Contact form submits and the lead arrives somewhere you check
- [ ] The `TODO(ben)` note in `app/case-studies/page.tsx` is resolved or still
      accurately says nothing is claimed
- [ ] Update `ai-seo-marketing-site-CLAUDE.md`, which still names the site
      `ai-seo.afrishield.com`
