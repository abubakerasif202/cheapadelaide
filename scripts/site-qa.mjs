import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

// Read-only route/browser QA. Provider submissions are intercepted and mocked.
const base = (process.env.QA_BASE_URL || 'https://www.cheapadelaideremovalist.com.au').replace(/\/$/, '');
const canonicalBase = 'https://www.cheapadelaideremovalist.com.au';
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const context = await browser.newContext();
await context.route('https://api.web3forms.com/**', route => route.abort());
const sitemap = await context.request.get(`${base}/sitemap.xml`);
const sitemapText = await sitemap.text();
const paths = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const report = { base, sitemapStatus: sitemap.status(), robots: await (await context.request.get(`${base}/robots.txt`)).text(), routes: [], responsive: [], forms: [], browserErrors: [] };
const page = await context.newPage();
let recordConsoleErrors = true;
page.on('pageerror', error => report.browserErrors.push({ url: page.url(), message: error.message }));
page.on('console', message => {
  if (recordConsoleErrors && message.type() === 'error') report.browserErrors.push({ url: page.url(), message: message.text() });
});
for (const path of paths) {
  const response = await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(() => {
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => { try { return JSON.parse(el.textContent); } catch { return { invalidJSON: true }; } });
    const searchable = document.body.innerText + '\n' + [...document.querySelectorAll('meta')].map(el => el.content).join('\n') + '\n' + JSON.stringify(schemas);
    const headings = [...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')].map(el => ({ level: Number(el.tagName[1]), text: el.textContent.trim() }));
    const headingJumps = headings.filter((heading, index) => index > 0 && heading.level > headings[index - 1].level + 1);
    const normalize = text => text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/[’‘]/g, "'").trim();
    const mainText = normalize(document.querySelector('main')?.textContent || '');
    const schemaIssues = [];
    function inspectSchema(schema) {
      if (Array.isArray(schema)) return schema.forEach(inspectSchema);
      if (!schema || typeof schema !== 'object') return;
      if (schema['@type'] === 'FAQPage') for (const question of schema.mainEntity || []) {
        if (!mainText.includes(normalize(question.name || ''))) schemaIssues.push(`FAQ question absent: ${question.name}`);
        if (!mainText.includes(normalize(question.acceptedAnswer?.text || ''))) schemaIssues.push(`FAQ answer absent: ${question.name}`);
      }
      if (schema['@type'] === 'BreadcrumbList' && !schema.itemListElement?.every(item => item.position > 0 && item.name && item.item)) schemaIssues.push('Incomplete breadcrumbs');
      if (schema['@type'] === 'OfferCatalog') {
        for (const [name, price] of [['2 Movers + Truck', 75], ['3 Movers + Truck', 95]]) {
          const offer = schema.itemListElement?.find(item => item.name === name);
          if (!offer || Number(offer.price) !== price || Number(offer.priceSpecification?.price) !== price || offer.priceCurrency !== 'AUD') schemaIssues.push(`Incorrect approved pricing offer: ${name}`);
        }
      }
      if (schema['@graph']) inspectSchema(schema['@graph']);
    }
    schemas.forEach(inspectSchema);
    return { title: document.title, description: document.querySelector('meta[name="description"]')?.content, canonical: document.querySelector('link[rel="canonical"]')?.href, robots: document.querySelector('meta[name="robots"]')?.content, h1: [...document.querySelectorAll('h1')].map(el => el.textContent.trim()), headings, headingJumps, schemas, schemaIssues, stalePrice: /\$(?:79|99|158|198)\b|(?:79|99)\s*(?:\/|per)\s*30|"price"\s*:\s*"?(?:79|99|158|198)\b/.test(searchable), newPrice: /\$75\b/.test(document.body.innerText) && /\$95\b/.test(document.body.innerText) && /\$150\/hr\b/.test(document.body.innerText) && /\$190\/hr\b/.test(document.body.innerText), links: [...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href')), imageIssues: [...document.images].filter(el => !el.hasAttribute('alt')).map(el => el.src) };
  });
  report.routes.push({ path, status: response.status(), ...result, canonicalValid: result.canonical === `${canonicalBase}${path === '/' ? '' : path}` || result.canonical === `${canonicalBase}${path}` });
}
const linkPaths = [...new Set(report.routes.flatMap(route => route.links).filter(href => href?.startsWith('/') && !href.startsWith('//')).map(href => href.split(/[?#]/)[0]))];
report.brokenLinks = [];
for (const path of linkPaths) {
  const response = await context.request.get(`${base}${path}`);
  if (response.status() >= 400) report.brokenLinks.push({ path, status: response.status() });
}
const representatives = ['/', '/pricing', '/get-a-quote', '/services/house-removals', '/blog/how-much-do-removalists-cost-adelaide', paths.find(path => path.startsWith('/service-areas/') && path.includes('hills'))];
for (const path of representatives) {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    report.responsive.push({ path, width, status: response.status(), ...await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth + 1, overflowing: [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1 && el.getBoundingClientRect().width > 0).slice(0, 8).map(el => `${el.tagName}.${el.className}`) })) });
  }
}
report.notFound = [];
recordConsoleErrors = false; // Expected 404 requests and mocked provider failures are intentional.
for (const path of ['/qa-unknown-page-74829', '/services/qa-unknown-service-74829', '/blog/qa-unknown-article-74829', '/service-areas/qa-unknown-area-74829']) {
  const response = await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
  report.notFound.push({ path, status: response.status(), noindex: await page.locator('meta[name="robots"]').evaluateAll(elements => elements.some(el => el.content.includes('noindex'))) });
}
report.redirects = [];
const variants = [`${base}/pricing/?qa=preserve-query`];
if (base === canonicalBase) variants.push('http://www.cheapadelaideremovalist.com.au/pricing?qa=preserve-query', 'https://cheapadelaideremovalist.com.au/pricing?qa=preserve-query');
for (const source of variants) {
  let current = source;
  const hops = [];
  for (let count = 0; count < 6; count++) {
    const response = await context.request.get(current, { maxRedirects: 0 });
    const location = response.headers().location;
    hops.push({ url: current, status: response.status(), location });
    if (!location || response.status() < 300 || response.status() >= 400) break;
    current = new URL(location, current).href;
  }
  const final = new URL(current);
  report.redirects.push({ source, hops, passed: final.origin === base && final.pathname === '/pricing' && final.searchParams.get('qa') === 'preserve-query' && hops.at(-1).status === 200 });
}
await page.setViewportSize({ width: 375, height: 900 });
recordConsoleErrors = true;
await page.goto(base, { waitUntil: 'networkidle' });
const menuTrigger = page.getByRole('button', { name: 'Open main menu' });
await menuTrigger.click();
const dialog = page.getByRole('dialog', { name: 'Main menu' });
const focusables = dialog.locator('a[href], button:not([disabled])');
await focusables.last().focus();
await page.keyboard.press('Tab');
const wrapsForward = await focusables.first().evaluate(el => el === document.activeElement);
await page.keyboard.press('Shift+Tab');
const wrapsBackward = await focusables.last().evaluate(el => el === document.activeElement);
await page.keyboard.press('Escape');
report.menu = { wrapsForward, wrapsBackward, closed: await dialog.count() === 0, focusRestored: await menuTrigger.evaluate(el => el === document.activeElement) };
await page.goto(base, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
const skipFocused = await page.getByRole('link', { name: 'Skip to main content' }).evaluate(el => el === document.activeElement);
await page.keyboard.press('Enter');
report.skipLink = { skipFocused, mainFocused: await page.locator('#main-content').evaluate(el => el === document.activeElement) };
await page.goto(`${base}/get-a-quote`, { waitUntil: 'networkidle' });
recordConsoleErrors = false;
await page.getByRole('button', { name: 'Submit Quote Request' }).click();
report.forms.push({ scenario: 'empty required fields', blocked: await page.locator('input:invalid').count() > 0 });
for (const success of [false, true]) {
  await page.goto(`${base}/get-a-quote`, { waitUntil: 'networkidle' });
  let intercepted = 0;
  await page.route('https://api.web3forms.com/**', async route => {
    intercepted++;
    await route.fulfill({ status: success ? 200 : 500, contentType: 'application/json', body: JSON.stringify({ success, message: success ? 'Mock accepted' : 'QA mocked provider failure' }) });
  });
  for (const [id, value] of Object.entries({ fullName: 'QA Mock Only', phone: '0400000000', movingFrom: 'Adelaide', movingTo: 'Norwood' })) await page.locator(`#${id}`).fill(value);
  await page.getByRole('button', { name: 'Submit Quote Request' }).click();
  await page.waitForTimeout(500);
  report.forms.push({ scenario: success ? 'mock success' : 'mock failure', intercepted, passed: await page.getByText(success ? 'Thank You, QA Mock Only!' : 'QA mocked provider failure', { exact: true }).count() > 0, unconfigured: await page.getByText('Online quote submission is unavailable', { exact: true }).count() > 0 });
  await page.unroute('https://api.web3forms.com/**');
}
await page.goto(`${base}/get-a-quote`, { waitUntil: 'networkidle' });
let timeoutIntercepted = 0;
await page.route('https://api.web3forms.com/**', () => { timeoutIntercepted++; });
for (const [id, value] of Object.entries({ fullName: 'QA Mock Timeout Only', phone: '0400000000', movingFrom: 'Adelaide', movingTo: 'Norwood' })) await page.locator(`#${id}`).fill(value);
await page.getByRole('button', { name: 'Submit Quote Request' }).click();
await page.getByText(/We could not confirm your request/).waitFor({ timeout: 25000 });
report.forms.push({ scenario: 'mock stalled provider timeout', intercepted: timeoutIntercepted, passed: await page.getByText(/before submitting again/).count() > 0 && await page.getByRole('button', { name: 'Submit Quote Request' }).isEnabled() });
await page.unroute('https://api.web3forms.com/**');
report.performance = [];
for (const path of ['/', '/pricing', '/get-a-quote']) {
  const sample = await context.newPage();
  await sample.setViewportSize({ width: 390, height: 844 });
  await sample.addInitScript(() => {
    window.__qaVitals = { lcpMs: null, cls: 0 };
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__qaVitals.lcpMs = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__qaVitals.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await sample.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  report.performance.push({ path, ...await sample.evaluate(() => ({ ...window.__qaVitals, transferBytes: performance.getEntriesByType('resource').reduce((total, entry) => total + entry.transferSize, 0) })) });
  await sample.close();
}
await browser.close();
const output = process.env.QA_REPORT_PATH || 'site-qa-report.json';
const duplicates = key => [...new Set(report.routes.map(route => route[key]).filter(Boolean))].filter(value => report.routes.filter(route => route[key] === value).length > 1);
report.failures = [];
for (const route of report.routes) {
  const problems = [route.status !== 200 && 'HTTP status', !route.title && 'missing title', !route.description && 'missing description', route.h1.length !== 1 && 'H1 count', !route.canonicalValid && 'canonical', route.robots?.includes('noindex') && 'unexpected noindex', route.schemas.some(schema => schema.invalidJSON) && 'invalid JSON-LD', route.stalePrice && 'stale pricing', route.imageIssues.length > 0 && 'missing alt'];
  for (const problem of problems.filter(Boolean)) report.failures.push(`${route.path}: ${problem}`);
  for (const heading of route.headingJumps) report.failures.push(`${route.path}: heading jump to H${heading.level} ${heading.text}`);
  for (const issue of route.schemaIssues) report.failures.push(`${route.path}: ${issue}`);
}
if (!report.routes.find(route => route.path === '/pricing')?.newPrice) report.failures.push('/pricing: approved $75/$150 and $95/$190 rates absent');
for (const key of ['title', 'description']) for (const value of duplicates(key)) report.failures.push(`Duplicate ${key}: ${value}`);
for (const check of report.responsive.filter(check => check.overflow || check.status !== 200)) report.failures.push(`${check.path}@${check.width}: responsive failure`);
for (const check of report.notFound.filter(check => check.status !== 404 || !check.noindex)) report.failures.push(`${check.path}: missing HTTP404/noindex`);
for (const check of report.redirects.filter(check => !check.passed)) report.failures.push(`${check.source}: redirect failure`);
for (const check of report.forms.filter(check => check.scenario === 'empty required fields' ? !check.blocked : !check.passed || check.intercepted !== 1)) report.failures.push(`${check.scenario}: form failure`);
for (const [key, value] of Object.entries(report.menu)) if (!value) report.failures.push(`Menu: ${key}`);
for (const [key, value] of Object.entries(report.skipLink)) if (!value) report.failures.push(`Skip link: ${key}`);
for (const link of report.brokenLinks) report.failures.push(`${link.path}: broken link`);
for (const error of report.browserErrors) report.failures.push(`${error.url}: ${error.message}`);
if (report.sitemapStatus !== 200 || !paths.length || new Set(paths).size !== paths.length) report.failures.push('Invalid sitemap status/URLs');
if (!report.robots.includes(`${canonicalBase}/sitemap.xml`)) report.failures.push('Robots sitemap reference missing');
await writeFile(output, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ output, routes: report.routes.length, responsiveChecks: report.responsive.length, failures: report.failures, forms: report.forms, menu: report.menu, skipLink: report.skipLink, redirects: report.redirects, notFound: report.notFound, performance: report.performance }, null, 2));
if (report.failures.length) process.exitCode = 1;
