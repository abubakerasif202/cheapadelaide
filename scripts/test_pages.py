"""Smoke-test the production build over HTTP. Start `npm run start` first."""

from html.parser import HTMLParser
import sys
from xml.etree import ElementTree
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

BASE_URL = "http://localhost:3000"
ROUTES = [
    "/", "/services", "/services/house-removals",
    "/services/apartment-removals", "/services/furniture-removals",
    "/services/office-removals", "/services/commercial-removals",
    "/services/packing-unpacking", "/services/interstate-removals",
    "/services/backloading", "/service-areas", "/pricing", "/about",
    "/faq", "/contact", "/get-a-quote", "/privacy", "/terms",
    "/blog",
    "/blog/cheap-removalists-adelaide-guide",
    "/blog/how-much-do-removalists-cost-adelaide",
    "/blog/hiring-removalists-vs-diy-truck-rental-adelaide",
    "/blog/how-to-move-house-on-a-budget-adelaide",
    "/blog/what-size-removal-truck-do-i-need",
    "/blog/moving-adelaide-cbd-apartment-guide",
    "/blog/moving-to-adelaide-hills-removals-guide",
    "/blog/what-is-a-depot-fee-removalists-adelaide",
    "/blog/adelaide-removalist-faqs",
    "/blog/cheap-backloading-adelaide-guide",
    "/blog/last-minute-emergency-removalists-adelaide",
    "/blog/moving-heavy-furniture-safely-adelaide",
]
ASSETS = [
    "/brand/logo-horizontal.png", "/brand/logo-mark.png",
    "/brand/favicon.png", "/brand/hero-truck.webp", "/brand/og-image.jpg",
]


class PageInspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1_count = 0
        self.canonical = None
        self.language = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "h1":
            self.h1_count += 1
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        elif tag == "html":
            self.language = attrs.get("lang")


def fetch(path):
    request = Request(f"{BASE_URL}{path}", headers={"User-Agent": "CheapAdelaideSmokeTest/1.0"})
    with urlopen(request, timeout=10) as response:
        return response.status, response.headers, response.read()


failures = 0
print("Testing route status, landmarks and canonical host:")
for path in ROUTES:
    try:
        status, _, body = fetch(path)
        parser = PageInspector()
        parser.feed(body.decode("utf-8", errors="replace"))
        valid = status == 200 and parser.h1_count == 1 and parser.language == "en-AU"
        valid = valid and bool(parser.canonical) and "www.cheapadelaideremovalist.com.au" in parser.canonical
        print(f"  [{'PASS' if valid else 'FAIL'}] {status} {path} (H1={parser.h1_count}, lang={parser.language}, canonical={parser.canonical})")
        failures += not valid
    except (HTTPError, URLError, TimeoutError) as error:
        print(f"  [FAIL] {path}: {error}")
        failures += 1

print("\nTesting sitemap and robots:")
for path, marker in [("/sitemap.xml", "<urlset"), ("/robots.txt", "Sitemap:")]:
    try:
        status, _, body = fetch(path)
        valid = status == 200 and marker.encode() in body
        if path == "/sitemap.xml":
            root = ElementTree.fromstring(body)
            urls = [item.text for item in root.findall("{*}url/{*}loc")]
            valid = valid and len(urls) == len(set(urls)) and all("https://www.cheapadelaideremovalist.com.au" in url for url in urls)
            valid = valid and all(
                f"https://www.cheapadelaideremovalist.com.au{route.rstrip('/')}" in urls
                for route in ROUTES
            )
        else:
            text = body.decode("utf-8", errors="replace")
            valid = valid and "Disallow: /" not in text and "https://www.cheapadelaideremovalist.com.au/sitemap.xml" in text
        print(f"  [{'PASS' if valid else 'FAIL'}] {status} {path}")
        failures += not valid
    except (HTTPError, URLError, TimeoutError) as error:
        print(f"  [FAIL] {path}: {error}")
        failures += 1

print("\nTesting custom 404:")
try:
    fetch("/codex-smoke-test-missing-route")
    print("  [FAIL] unknown route returned 200")
    failures += 1
except HTTPError as error:
    parser = PageInspector()
    parser.feed(error.read().decode("utf-8", errors="replace"))
    valid = error.code == 404 and parser.h1_count == 1
    print(f"  [{'PASS' if valid else 'FAIL'}] HTTP {error.code}, H1={parser.h1_count}")
    failures += not valid
except (URLError, TimeoutError) as error:
    print(f"  [FAIL] 404 check: {error}")
    failures += 1

print("\nTesting Concept 4 brand assets:")
for path in ASSETS:
    try:
        status, _, body = fetch(path)
        valid = status == 200 and len(body) > 100
        print(f"  [{'PASS' if valid else 'FAIL'}] {status} {path} ({len(body)} bytes)")
        failures += not valid
    except (HTTPError, URLError, TimeoutError) as error:
        print(f"  [FAIL] {path}: {error}")
        failures += 1

print(f"\nSmoke test complete: {failures} failure(s)")
sys.exit(1 if failures else 0)
