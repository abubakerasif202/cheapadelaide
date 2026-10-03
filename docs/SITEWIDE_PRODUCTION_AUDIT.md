# Sitewide production audit - 3 October 2026

> Latest owner correction on 3 October 2026: 2 movers + truck $75 / 30 minutes ($150/hr reference); 3 movers + truck $95 / 30 minutes ($190/hr reference). Earlier rates in this document are historical release evidence. Current prices are configured in `src/config/business.ts`.


## Source findings and repairs



- Next.js 16.3.6 / React 19.2.8 App Router. Installed Next metadata documentation was inspected before implementation.

- Pricing was already centralized in `src/config/business.ts`; customer-facing rate text, pricing offers, FAQ answers and cost tables consume that config. The local baseline had $79/$158 for two movers and $99/$198 for three movers, rather than the requested historical $75 rate. The explicitly requested advertised rate supersedes the baseline two-mover price; retain the separately configured three-mover package unless otherwise verified.

- The cost guide URL is retained. Publication dates are preserved. The five guides that display the revised two-mover pricing carry 3 October 2026 as their actual modification date; dates of unchanged articles are preserved.

- Shared blog rendering emitted organizational authorship and modified dates in JSON-LD without a visible corresponding byline or modification date. It now displays the real business organization and existing article update date; no personal author qualifications were invented.

- Long regional titles and the Hills description were tightened without changing existing region routes, coverage, or local access guidance. Cost and heavy-furniture article titles were shortened naturally.

- Dynamic routes explicitly resolve their own canonical paths against the production www HTTPS domain. Valid static routes also supply canonical paths. Missing slugs call `notFound`; runtime status validation remains required.

- Sitemap is driven by the actual services, articles and six regional routes. It uses existing article modification dates and does not synthesize dates for undated pages. Robots permits crawling and points to the production sitemap.

- Regional pages contain distinct access considerations and suited-for guidance. No additional suburb pages are needed; the existing Hills route is retained.

- No new review claims, self-serving AggregateRating or fabricated review content were added. Pre-existing local review-summary edits were preserved outside the release commit.

- Structured data links Service and BlogPosting nodes to the shared business entity. FAQ content derives from the same arrays as visible FAQ accordions. Pricing OfferCatalog units explicitly say per 30 minutes.

- Repaired source copy findings: duplicate house loading/unloading bullets; unsupported exact backloading flexibility of 1-3 days; fixed-scope process label without fixed-price policy; blanket-wrap navigation promise; blog hub copy promising council logistics without primary-source references. These were simplified to the verified enquiry and service scope.



## Validation



Source findings were supplemented by the repeatable browser gate in `scripts/site-qa.mjs`. Lint, TypeScript, production build and the 30-check SEO gate passed. Final release and live browser results are recorded below. No field Core Web Vitals or Google Search Console performance claim is inferred from source inspection.


## Release repairs and evidence

- Two movers now $95 per 30 minutes / $190 hourly reference; separately configured three movers remain $99 / $198. Hourly values derive from half-hour constants. RateChip defaults and social artwork generator now use business configuration. README and draft listing copy updated; historical audit logs are not current price sources.
- Share artwork regenerated with configuration data and unclipped text. JPEG reduced from about 165 KB to 94 KB. No field Core Web Vitals improvement is claimed.
- Keyboard skip navigation added. Form submissions now time out after 20 seconds with uncertain-delivery wording and phone recovery; no automatic retry. Missing provider configuration clearly states the request has not been sent.
- Existing design, brand, route architecture, separate package rate and pre-existing local edits preserved. No unsupported rating schema added.
- Production dependency audit reports zero vulnerabilities. Development lint dependency braces 3.0.3 has GHSA-vfj7-8cjw-p6xm (five inherited high audit entries); npm and the upstream advisory report no patched release. Do not force-downgrade Next/eslint-config-next to satisfy the audit.

- Social price artwork regenerates automatically in prebuild, so a future rate edit uses the same single configuration source throughout the website and share assets.
- Corrected the service-area index address card from a skipped H3 heading to paragraph semantics.

Final isolated release gate: 37 sitemap routes, 42 responsive checks at 320/375/390/430/768/1024/1440 px, four unknown-route 404/noindex checks, keyboard menu/skip link, internal links, unique titles/descriptions, self canonicals, FAQ schema matching, and four mock-only form scenarios passed. No real lead was sent. Lint, typecheck, SEO 30/30 and production build passed on the release snapshot excluding pre-existing dirty edits. Historical audit records retain old prices as history; no current customer-facing old rates remain. Production deployment/live verification follows the commit.
