# Post-launch CRO, SEO/AEO and credibility audit

> Historical audit record from 2 October 2026. Its old prices and environment blockers describe that run, not the current site. Production release `3f0821f` uses $95 / 30 min ($190/hr reference) for two movers and $99 / 30 min ($198/hr reference) for three movers. The remaining improvements are being reconciled and validated separately below.
Date: 2 October 2026. Release status: **NOT READY — build, browser and live baseline verification blocked. No commit or push.**

## Evidence and scope

Requested baseline: the current production release at https://www.cheapadelaideremovalist.com.au/. Live HTML could not be retrieved: web fetch failed, local HTTP reported DNS resolution failure, Chrome DevTools reported `Target closed`, and Windows PowerShell failed with WSL `UtilBindVsockAnyPort` / `socket failed 1`. These are environment failures, not evidence that the production site is down.

Findings below are source-confirmed against local `main` at `06818a0`; that commit's correspondence with current production is **NOT VERIFIED**. Initial tracked differences were CRLF/LF-only; unrelated differences and `.claude/` were preserved. Historical audit reports were not used as fresh validation evidence. No design-system, dependency, business-rate or contact-detail changes.

## Critical

| Finding / exact file or component | Implemented change | Expected benefit |
| --- | --- | --- |
| Truck artwork described as a company vehicle: `src/app/page.tsx`, `src/app/about/page.tsx`; business schema image in `src/config/seo.ts` | Customer-facing illustration alt text, visible artwork disclosure, logo as MovingCompany image | Avoids suggesting fleet ownership or completed-job evidence; improves accessible descriptions |
| Unqualified rates in `src/components/common/QuoteForm.tsx`, `src/components/content/QuoteAside.tsx`, `src/app/blog/[slug]/page.tsx` | Configured pricing disclaimer beside the team choices, rate chips and related-service rates | Keeps starting rates distinct from a confirmed total quote |
| Unsupported popularity claim in `src/components/common/PricingCards.tsx` | Suppress the “Most popular” flag; retain navy featured-card styling | Removes an unsubstantiated credibility claim without changing visual identity |
| Unsupported crew-route experience in `src/data/areas.ts` | Replace “familiar”/“regular route” statements with configured Elizabeth Vale location and availability enquiry guidance | Avoids invented job-history claims; FAQ schema automatically follows the revised visible answer |

## High-value

| Exact file or component | Implemented change | Expected benefit |
| --- | --- | --- |
| `src/app/page.tsx` | Shorter H1 and introduction, tighter mobile spacing, visible quote and phone CTAs, unchanged two starting rates with brighter qualification text | Reduces competing hero copy and brings rate/CTA information earlier in the mobile flow |
| `src/app/get-a-quote/page.tsx` | Compact introduction; form remains first; rates, checklist and subdued phone help follow in matching DOM/visual order | Makes mobile form entry easier to reach without removing assistance |
| `src/components/layout/MobileActionBar.tsx`, `src/components/layout/Header.tsx` | Suppress repeated quote-route actions only on `/get-a-quote` | Reduces competing actions while the visitor completes the form; phone access remains available |
| `src/components/common/QuoteForm.tsx` | Short required-field introduction; linked privacy/provider notice near submit in place of competing phone prompt; retain phone/email failure recovery | Less pre-form friction with a clear privacy link and one submit action |
| `src/app/blog/[slug]/page.tsx` | Guide-body links to service areas, pricing and quote; pricing in related links; CBD guide links to the existing CBD region; replace “Pillar Master Guide” badge | Connects informational intent to relevant commercial pages and uses customer-facing language |
| `src/app/services/[slug]/page.tsx` | Add coverage link beside existing pricing and service-specific guide links | Helps readers check location fit before requesting a quote |
| `src/app/service-areas/[slug]/page.tsx` | Add pricing/quote links and relevant existing CBD, Hills or cost guide | Links region, service, practical advice and conversion pages without generating new doorway pages |

## Nice-to-have — deferred

- Enrich `src/data/areas.ts` northern region with business-verified Elizabeth Vale/Salisbury/Playford access and travel guidance. Do not claim route frequency, fleet capability or job history. Use existing `src/app/service-areas/[slug]/page.tsx`, not a batch of suburb clones.
- Enrich the existing CBD apartment and Hills guides in `src/data/blog.ts` with dated, primary-source building-access/council references once verified. Link them to their existing regions and relevant apartment/house services.
- Consider a distinct suburb page only when search demand and genuinely distinct, verified guidance justify it: address-specific access planning, building requirements and useful local references. Existing regional coverage is preferable to thin suburb pages.
- Measure quote starts, completion and phone actions before further form changes. No conversion uplift is claimed from this audit; analytics/event implementation would need a defined measurement and privacy brief.
- Reassess search-result title/description truncation with live/GSC data rather than shortening every title to an arbitrary character limit.

## Leave unchanged

Navy/orange identity, shared tokens/components, page architecture, primary quote and phone access, published rates ($79/30 min, $158/hr reference; $99/30 min, $198/hr reference), `26 Knowles Road, Elizabeth Vale SA 5112`, and `admin@cheapadelaideremovalist.com.au`.

Current schema fact review:

| Field | Source support / decision |
| --- | --- |
| Payment methods | Absent; do not add without business confirmation |
| Geo coordinates | Absent; do not infer coordinates from the address |
| Opening hours | `src/config/business.ts`: all seven days, 07:00–20:00; visible on contact/home/quote pages. Preserve as configured; not independently business-verified |
| Prices | `src/config/business.ts`, `src/data/pricing.ts`; pricing OfferCatalog uses AUD, explicit per-30-minute UnitPriceSpecification and starting-rate descriptions. No arbitrary business `priceRange` or local rates applied to interstate/backloading Service schema |
| Service areas | Business schema: Adelaide/Greater Adelaide; region schema: hubs from `src/data/areas.ts`, also visibly listed. Interstate corridors are enquiry routes with availability qualification |
| Reviews | User verified Google Business Profile on 2 October 2026: 5.0 Google rating, 9 Google reviews. Shared visible summary added; no review text, names, testimonials or aggregateRating schema |
| Awards, insurance, fleet, years, customer/job totals | No new claims or schema added. Illustrations are not operational proof |
| FAQ | Homepage/pricing/FAQ/service/region/blog schema uses the same data rendered in the respective page accordion |
| Business identity | Shared MovingCompany ID, configured address/email/phone, logo and website retained |

## Major-route review (source, not rendered/live)

Shared metadata builder supplies title, description, absolute canonical, Open Graph and Twitter data. Every major page has one explicit H1. H2s identify content sections; quote headings use the existing h2/h3 prop. Interior routes include visible breadcrumbs and BreadcrumbList schema; homepage correctly has neither. No blanket metadata or heading rewrite was justified. Browser layout, computed heading outline and rendered canonical checks remain pending.

| Routes reviewed | Exact source | Metadata / headings / canonical / breadcrumbs / additional schema |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Homepage intent, simplified H1, section H2s, root canonical; FAQPage |
| `/services` | `src/app/services/page.tsx` | Service index intent, service H2s, self-canonical/breadcrumb; ItemList |
| All 8 service routes: house-removals, apartment-removals, furniture-removals, office-removals, commercial-removals, packing-unpacking, interstate-removals, backloading | `src/app/services/[slug]/page.tsx`, `src/data/services.ts` | Per-service title/description, one service H1 and section H2s, slug canonical/breadcrumb; Service and visible FAQ |
| `/service-areas` | `src/app/service-areas/page.tsx` | Coverage index intent, one H1/section H2s, self-canonical/breadcrumb; ItemList |
| All 6 region routes: adelaide-cbd-inner-metro, northern-suburbs-playford, eastern-suburbs-foothills, western-suburbs-coastal, southern-suburbs-marion, adelaide-hills-regional-sa | `src/app/service-areas/[slug]/page.tsx`, `src/data/areas.ts` | Per-region title/description, region H1/access/service H2s, slug canonical/breadcrumb; Service and visible FAQ |
| `/pricing` | `src/app/pricing/page.tsx` | Pricing intent, H1/team-rate/quote-factor H2s, self-canonical/breadcrumb; qualified OfferCatalog and visible FAQ |
| `/get-a-quote` | `src/app/get-a-quote/page.tsx` | Quote intent, H1/form H2, self-canonical/breadcrumb; no invented offers |
| `/blog` | `src/app/blog/page.tsx` | Guide index intent, H1/guide H2s, self-canonical/breadcrumb; CollectionPage |
| All 12 blog routes | `src/app/blog/[slug]/page.tsx`, `src/data/blog.ts` | Unique per-guide SEO titles, descriptions, article H1 and section H2s, slug canonical/breadcrumb; BlogPosting and visible FAQ |
| `/about` | `src/app/about/page.tsx` | Identity intent, H1/business H2s, self-canonical/breadcrumb; illustration disclosure added |
| `/contact` | `src/app/contact/page.tsx` | Contact intent and configured details, H1/contact/form H2s, self-canonical/breadcrumb; ContactPage |
| `/faq` | `src/app/faq/page.tsx` | Question intent, H1/category H2s, self-canonical/breadcrumb; FAQPage |
| `/privacy`, `/terms` | respective `src/app/*/page.tsx` | Distinct legal intent, H1/section H2s, self-canonical/breadcrumb |

Blog slugs reviewed: cheap-removalists-adelaide-guide; how-much-do-removalists-cost-adelaide; hiring-removalists-vs-diy-truck-rental-adelaide; how-to-move-house-on-a-budget-adelaide; what-size-removal-truck-do-i-need; moving-adelaide-cbd-apartment-guide; moving-to-adelaide-hills-removals-guide; what-is-a-depot-fee-removalists-adelaide; adelaide-removalist-faqs; cheap-backloading-adelaide-guide; last-minute-emergency-removalists-adelaide; moving-heavy-furniture-safely-adelaide.

## Verification and release gate

- Updated-code ESLint: PASS (`npm run lint`).
- Updated-code TypeScript: PASS (`node node_modules/typescript/bin/tsc --noEmit`).
- Existing SEO source audit: 30/30 PASS using a temporary TypeScript transpilation loader. Normal `tsx` execution is blocked by Windows-only esbuild; the loader changes no project dependencies and is not a browser/schema-validator substitute.
- Diff reviewed; `git -c core.whitespace=cr-at-eol diff --check`: PASS. Initial CRLF differences remain preserved.
- Build: BLOCKED. Windows-only `@next/swc-win32-x64-msvc`; Linux build attempts to fetch SWC, then fails with `/bin/sh EPERM`. Windows fallback cannot launch due WSL socket failure.
- Browser: BLOCKED. Chrome DevTools target closed; local snap Chromium cannot create its runtime directory under the restricted filesystem. No screenshots, mobile overflow checks or form interaction tests claimed.
- Production baseline/live metadata: NOT VERIFIED. HTTP/web/browser access failed as above.
- Commit/push: NOT DONE. User's “if everything passes” condition is unmet.

Run in the existing Windows checkout after environment access is restored:

```powershell
Set-Location 'C:\Users\abuba\cheapadelaide'
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run seo:audit
npm.cmd run build
npm.cmd run start
# In another terminal, with Python available:
python scripts/test_pages.py
```

Then browser-check homepage and quote at 375/430/768/1024/1440px: rate/qualification proximity, CTA visibility, no horizontal overflow, form before rates/help, no mobile bar on quote, keyboard focus, configured quote submission using a stubbed provider response (no real lead), failure recovery and navigation back to other routes. Inspect all 37 rendered major routes using the sitemap for status, unique H1/title/description, exact canonical, breadcrumbs, JSON-LD and visible FAQ parity. Fetch production separately to establish the requested baseline before release. Only after these gates pass should the explicit audit files/hunks be staged, committed and pushed to `main`; do not stage unrelated CRLF differences or `.claude/`.

## Verified Google Business Profile follow-up

User-supplied verified snapshot: Cheap Adelaide Removalist; category Removalist; 5.0 Google rating; 9 Google reviews; phone 0491 704 136; opening time 7:00 am. This is user-verified information, not an independent fetch of the Google profile. Existing full opening hours remain unchanged because the supplied opening time does not establish a new closing time or day schedule.

Exact review changes shown before any commit:

| File | Review reference |
| --- | --- |
| `src/config/business.ts` | One verified rating/count/category snapshot and shared `googleReviewSummary` export |
| `src/app/page.tsx` | Existing hero badge now displays the shared review summary |
| `src/components/common/TrustSection.tsx` | Google Reviews card using the shared summary |
| `src/components/marketing/CTASection.tsx` | Shared conversion feature using the summary |
| `src/app/get-a-quote/page.tsx` | Review summary in the support panel below the mobile form |

Every visible summary is exactly **5.0 Google rating · 9 Google reviews**. No profile/review URL was invented. Whole-repository text search (including hidden project files; excluding dependencies, build output, Git objects, lockfile and environment files) found no existing customer-facing review counts, rating values, testimonial records or review schema. Existing documentation includes review-request templates and future targets; those are not published testimonials or current counts and were not rewritten as business facts.

No aggregateRating added. Google excludes self-serving LocalBusiness/Organization reviews from review rich results: https://developers.google.com/search/docs/appearance/structured-data/review-snippet.

Latest requested checks: `npm run lint` PASS; `npx tsc --noEmit` PASS; `npm run build` BLOCKED/exit 1 (Linux SWC absent; fallback process denied with `/bin/sh EPERM`). Temporary React static rendering independently confirmed the exact summary in homepage, trust section, shared conversion section and quote page, unchanged name/phone/email/address/07:00 opening time, and absence of aggregateRating. Static rendering is not browser or production verification. Diff whitespace check PASS.

No commit or push: the build condition remains unmet. Vercel production deployment and live display **NOT VERIFIED**; no new release exists from this work. Live www homepage, quote and sitemap fetches were retried and remain inaccessible from this environment.

## Reconciliation against production release 3f0821f - 3 October 2026

HEAD and origin/main were both `3f0821f75167d52e38797ca67c9d346437b1711f` when reconciliation began. Every uncommitted file was individually compared with that release. All 16 source changes contain unique compatible improvements. No source file or hunk was restored, discarded or overwritten from HEAD. The original binary diff and document were backed up outside the repository before document editing.

| File | Classification | Retained work |
| --- | --- | --- |
| `src/app/about/page.tsx` | Valuable intentional improvement | Illustration alt text and visible disclosure |
| `src/app/blog/[slug]/page.tsx` | Valuable intentional improvement | Planning links, distinct related destinations, readable guide badge and rate qualification; deployed authorship/date additions preserved |
| `src/app/get-a-quote/page.tsx` | Valuable intentional improvement | Compact introduction, form-first layout, shared verified review summary and retained phone assistance |
| `src/app/page.tsx` | Valuable intentional improvement | Compact hero, mobile phone CTA, brighter pricing qualification, shared review summary and illustration disclosure |
| `src/app/service-areas/[slug]/page.tsx` | Valuable intentional improvement | Existing local guides and pricing/quote links |
| `src/app/services/[slug]/page.tsx` | Valuable intentional improvement | Existing service-area discovery link |
| `src/components/common/PricingCards.tsx` | Valuable intentional improvement | Suppression of unsupported popularity badge while retaining featured styling |
| `src/components/common/QuoteForm.tsx` | Valuable intentional improvement | Rate qualification and linked privacy/provider notice; deployed validation, timeout and recovery preserved |
| `src/components/common/TrustSection.tsx` | Valuable intentional improvement | Shared user-verified Google review summary |
| `src/components/content/QuoteAside.tsx` | Valuable intentional improvement | Qualification beside centralised rate chips |
| `src/components/layout/Header.tsx` | Valuable intentional improvement | Suppression of redundant quote-route action with phone/menu preserved |
| `src/components/layout/MobileActionBar.tsx` | Valuable intentional improvement | Suppression on quote route and restoration elsewhere |
| `src/components/marketing/CTASection.tsx` | Valuable intentional improvement | Shared user-verified Google review summary |
| `src/config/business.ts` | Valuable intentional improvement | User-supplied review snapshot and summary helper; current rate constants unchanged |
| `src/config/seo.ts` | Valuable intentional improvement | Logo as business schema image instead of illustrative fleet artwork; canonical/entity architecture preserved |
| `src/data/areas.ts` | Valuable intentional improvement | Factual availability guidance in place of unsupported route-frequency wording |
| `docs/POST_LAUNCH_CRO_SEO_AUDIT.md` | Useful historical record with outdated status passages | Original audit and review provenance retained; current-pricing/history banner and reconciliation evidence added |

Proven duplicates: none. Accidental source edits: none. Conflicting or obsolete source hunks: none. Restored files/hunks: none. Historical rates and environment failures above describe the October 2 run, not the current production implementation.

Current business pricing remains sourced from `src/config/business.ts`: two movers $95 per 30 minutes / $190 hourly reference; three movers $99 per 30 minutes / $198 hourly reference. No AggregateRating or fabricated review text was added. The rating/count are the documented user-supplied October 2 snapshot, not a claim of independent profile verification today.

Reconciliation validation on the Windows production build:

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run seo:audit`: PASS, 30/30 checks.
- `npm run build`: PASS, including configured $95/$99 share-asset regeneration.
- `npm run start -- --port 3002`: server confirmed HTTP 200 before testing.
- `npm run test:site` with `QA_BASE_URL=http://localhost:3002`: PASS, exit 0, 37 routes and 42 responsive checks with zero failures. Includes four mock-only form scenarios, keyboard menu/skip link, 404/noindex handling, canonical/FAQ schema parity, metadata, internal links and pricing.
- Focused reconciliation QA: PASS, 26 assertions. Quote-route actions suppressed and restored after navigation; phone/menu retained; shared 5.0/9 review text and no AggregateRating; adjacent rate disclaimers; truthful artwork labels; inspected 320px homepage/quote and 1440px homepage screenshots without clipping or overlap.
- Pricing search: no current customer-facing $75/$79/$158 two-mover rates. Remaining matches are explicitly historical audit records and unrelated $750 sponsorship guidance.
- `git diff --check`: PASS. All original tracked source hunks were verified byte-for-byte against the pre-reconciliation backup.
- No real leads submitted. Review facts remain the documented user-supplied snapshot.

The reconciliation is a separate release after `3f0821f`; its exact commit SHA and production deployment verification are reported in the completion receipt. This record preserves the original environment-failure evidence rather than rewriting history.
