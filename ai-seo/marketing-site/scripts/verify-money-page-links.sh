#!/usr/bin/env bash
# Money-page schema/link gate (board: King + Koray, 2026-09-22; scripted per
# board review 2026-09-29 and 2026-10-09 after three consecutive reviews
# found it unenforced by hand). For each money page, verifies:
#   1. the raw HTML contains an Offer/OfferCatalog schema block where the
#      page shows priced/named entities, and
#   2. at least one in-body <a href> to another core page, not just a nav,
#      Button, or CtaDrop link.
# Exits non-zero on any failure so this can be wired into CI / the B.7
# verification step instead of depending on a reviewer remembering to check.
#
# Usage: BASE_URL=https://afrishieldai.com ./scripts/verify-money-page-links.sh
# Defaults to http://localhost:3000 for a local `next build && next start`.

set -u

BASE_URL="${BASE_URL:-http://localhost:3000}"
PAGES=(solutions pricing how-it-works)
fail=0

for page in "${PAGES[@]}"; do
  url="${BASE_URL}/${page}"
  html="$(curl -fsS "$url" 2>/dev/null)"
  page_fail=0

  if [[ -z "$html" ]]; then
    echo "FAIL [$page] could not fetch $url"
    fail=1
    continue
  fi

  if ! grep -qE '"@type"\s*:\s*"Offer"|hasOfferCatalog' <<<"$html"; then
    echo "FAIL [$page] no Offer/hasOfferCatalog schema found in $url"
    page_fail=1
  fi

  # An in-body contextual link to another core page, excluding plain nav/CTA
  # wrappers (Button/CtaDrop render with class names containing "button" or
  # "cta" — this is a heuristic, not a parser, so it may need a real DOM
  # check later if it starts false-failing).
  if ! grep -oE '<a [^>]*href="/(solutions|pricing|how-it-works|case-studies)[^"]*"[^>]*>' <<<"$html" \
      | grep -vqE 'class="[^"]*(button|cta)'; then
    echo "FAIL [$page] no in-body link to another core page (/solutions, /pricing, /how-it-works, /case-studies) found in $url"
    page_fail=1
  fi

  if [[ $page_fail -eq 0 ]]; then
    echo "OK   [$page]"
  else
    fail=1
  fi
done

exit $fail
