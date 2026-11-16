# Cheap Adelaide SEO and truck selection

## Scope and preservation
Branch: `feat/cheap-adelaide-truck-seo`. Before editing, saved the binary working-tree diff, status and untracked list under `/tmp/cheapadelaide-baseline/`. No reset, stash, cleanup, push or deployment was performed. Existing changes outside this implementation remain in the checkout.

## Commercial data
Source: existing `src/config/business.ts`, as explicitly confirmed in the implementation brief. Two movers + truck: $75/30 minutes ($150/hour). Three movers + truck: $95/30 minutes ($190/hour). These are crew packages, not truck-size prices. Existing crew cards and pricing schema remain separate from truck preferences.

No authoritative Small/Big truck capacities, size-specific prices, crew mapping, minimum booking, travel or call-out amounts were established. Both cards therefore use “Request a tailored quote” and ask customers to confirm capacity, crew, availability and charges in their quote. Fleet photographs remain unavailable for verified use. The existing asset-generation script precludes treating local truck artwork as verified fleet photography; the new cards use lightweight decorative truck icons without photographic claims.

## Design and behaviour
Navy, orange and white cards appear on the homepage and pricing page, side by side on desktop and stacked on mobile. Prominent graphic panels, large headings, short inventory/access guidance, selection borders, native radio controls and full-width buttons support comparison. Buttons select the truck, scroll to the existing quote form and focus its truck selector. Reduced-motion preferences disable smooth scrolling and transitions.

Truck preference and crew package remain independent. Changing the truck in the form updates the cards. Web3Forms JSON includes a human-readable truck selection and the existing preferredTeam value. Existing validation, honeypot, privacy disclosure, submission endpoint and error handling remain in place. The unconfigured email fallback also includes the truck preference. Selection is page-local; navigating to another route starts a new form.

The pricing page adds a crew comparison table from the existing business data and explains why total time, crew, access and travel matter more than the lowest hourly rate alone.

## GSC and SEO
Export: `/mnt/c/Users/abuba/GSC_Adelaide_Reports/gsc_20261115_042849/cheap_adelaide_removalist`.

- Current baseline: 16 clicks / 2,808 impressions; 0.57% CTR; average position 52.28.
- Homepage: 15 clicks / 1,215 impressions.
- “cheap removalists adelaide” homepage row: 140 impressions, zero clicks, position 2.736. This query-page average is not proof of a stable rank or the snippet Google displayed.
- Mobile: 11 clicks / 765 impressions, 1.438% CTR. Desktop: 5 / 2,022, 0.247% CTR.
- “hf removals adelaide” includes the privacy page (one click, 14 impressions). The explicit shared-operator disclosure explains a legitimate association and is preserved.

The homepage already has a relevant affordable-removalist title. Its description now states the target intent and the existing crew starting rates, calculated from shared configuration, to give searchers a concrete reason to compare. Google may choose a different snippet; no CTR uplift is claimed.

| Intent | Existing destination |
| --- | --- |
| Cheap removalists Adelaide; cheap removals; affordable movers | `/` |
| Adelaide removalist prices; moving truck with movers | `/pricing` |
| House and apartment moves | `/services/house-removals`, `/services/apartment-removals` |
| Furniture removals | `/services/furniture-removals` |
| Office/commercial moving | Existing office/commercial service pages |
| Local movers / removalists near me | `/service-areas` and useful existing area pages |
| Packing | Existing packing service page |

Established routes, canonical configuration, sitemap, robots, legal disclosures, business schema and navigation are preserved. No suburb doorway pages, fabricated reviews, capacities or offers were added.

## Exact implementation files
- `src/data/pricing.ts`: independent truck preference data and quote conditions.
- `src/components/common/TruckSelection.tsx`: new shared client interface.
- `src/components/common/QuoteForm.tsx`: independent truck field, state synchronisation and payload/fallback inclusion.
- `src/app/page.tsx`: cards and data-driven homepage description.
- `src/app/pricing/page.tsx`: cards and crew comparison.
- `src/app/globals.css`: responsive cards, focus and reduced-motion styling.
- `scripts/truck-qa.mjs`: responsive interaction and mocked provider submission test.
- `scripts/pricing-consistency.ts`: shared rates, hourly calculations and quote-only separation test.
- `docs/truck-qa/`: screenshots and browser results.
- This report.

`business.ts` and `PricingCards.tsx` required no changes: existing crew configuration/cards stay independent.

## Verification environment
The original node_modules installation lacks usable platform-native esbuild executables under both WSL and Windows. No checkout dependencies or lockfiles were replaced. Verification uses a source copy in `/tmp/cheapadelaide-verify`, clean `npm ci`, Node 22.23.2 and a mock-only Web3Forms key. Chromium is selected from the installed browser cache. The existing site QA's Edge launch is adapted to Chromium only in the isolated verification copy.

Validation commands:

```sh
npm run typecheck
npm run lint
npm run build
npm run seo:audit
npx tsx scripts/pricing-consistency.ts
QA_BASE_URL=http://localhost:3107 QA_CHROMIUM_PATH=/path/to/chrome node scripts/truck-qa.mjs
QA_BASE_URL=http://localhost:3107 npm run test:site
```

Final results and commit are recorded below after verification.

## Remaining owner inputs and monitoring
Obtain authentic photographs for each actual truck, vehicle capacities and a confirmed truck/crew/rate mapping before publishing size-specific commercial claims. Confirm minimum service, travel, call-out and tax terms. Quote-only truck preferences are usable without these values.

For 28 days after an approved release, compare query-page CTR, impressions and position for the homepage affordable terms and pricing terms; separate mobile/desktop and brand/non-brand traffic. Review quote starts/completions and truck preferences, monitor indexing/canonical reports, and compare equivalent periods before changing metadata again. Preserve accurate shared-operator disclosures. No production analytics or enquiry delivery is claimed from local mocked testing.

## Final validation results
- Typecheck: PASS.
- ESLint: PASS after fixing new JSX apostrophe escaping.
- Production build: PASS on the final source in the isolated native environment.
- SEO audit: 30/30 PASS.
- Pricing consistency: PASS ($75/$150 and $95/$190; quote-only truck preferences).
- Site QA: 37 routes, 42 responsive checks, zero failures; mocked success/failure, menu, skip link, metadata uniqueness, internal links, sitemap, robots, redirects, 404/noindex and schema checked.
- Truck QA: 14 responsive cases (two routes × seven widths), zero document overflow; card/form synchronisation and separate crew choice passed. Mocked payload contained `selectedTruck: Small Truck`, `preferredTeam: 2 Movers + Truck`. No real enquiry was sent. Initial test locator failures were corrected to activate the existing styled crew label.
- Screenshots: `docs/truck-qa/home-1440.png`, `home-390.png`, `pricing-1440.png`, `pricing-390.png`, plus every tested width. Desktop and mobile captures were visually inspected. Section captures hide the fixed navigation/action chrome to show the full cards; viewport overflow checks use the unchanged UI.
- Results: `docs/truck-qa/results.json`, `docs/truck-qa/site-qa-results.json`.
- Local browser samples: homepage LCP 196ms / CLS 0; pricing LCP 188ms / CLS 0. These unthrottled localhost observations do not establish field Core Web Vitals or a performance improvement. No new images or third-party scripts were added.
- Existing analytics configuration was not changed; local checks do not prove production conversion reporting.

No technical release blocker remains from these checks. Authentic fleet imagery and truck-specific commercial information remain missing; the implemented quote-only state avoids unsupported claims. No push, merge or deployment was performed.

Implementation commit: `74a52da056df62686d6ed692a8c9c3222c98981f`. This report records that implementation commit; the following documentation-only commit adds this reference. Commit identity was supplied per command using the author identity from the preceding three repository commits; no global Git configuration was changed.
