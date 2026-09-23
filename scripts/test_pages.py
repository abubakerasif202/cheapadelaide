import urllib.request
import urllib.error
import sys

routes = [
    ("/", "Affordable Adelaide Removalists"),
    ("/services", "Our Professional Moving Services"),
    ("/services/house-removals", "House Removals Across Adelaide"),
    ("/services/apartment-removals", "Efficient Apartment Moves in Adelaide"),
    ("/services/furniture-removals", "Careful Furniture Removals Adelaide"),
    ("/services/office-removals", "Adelaide Office Relocations"),
    ("/services/commercial-removals", "Adelaide Commercial Removals"),
    ("/services/packing-unpacking", "Packing &amp; Unpacking in Adelaide"),
    ("/services/interstate-removals", "Interstate Removals From Adelaide"),
    ("/services/backloading", "Affordable Backloading Adelaide"),
    ("/service-areas", "Removalists Across Adelaide"),
    ("/pricing", "Straightforward Moving Rates"),
    ("/about", "About Cheap Adelaide Removalist"),
    ("/faq", "Frequently Asked Questions"),
    ("/contact", "Get in Touch with Our Adelaide Team"),
    ("/get-a-quote", "Request Your Adelaide Moving Quote"),
    ("/privacy", "Privacy Policy"),
    ("/terms", "Terms of Service"),
    ("/sitemap.xml", "<urlset"),
    ("/robots.txt", "User-agent: *"),
]

assets = [
    "/brand/logo-horizontal.png",
    "/brand/logo-stacked.png",
    "/brand/logo-mark.png",
    "/brand/favicon.png",
    "/brand/hero-truck.webp",
    "/brand/og-image.jpg",
]

base_url = "http://localhost:3000"
failed = 0

print("Testing Application Routes:")
for path, expected_text in routes:
    url = f"{base_url}{path}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "AntigravityQA/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            status = resp.status
            body = resp.read().decode("utf-8", errors="ignore")
            has_expected = (expected_text in body) or (expected_text.replace("&amp;", "&") in body) or (expected_text.lower() in body.lower())
            if status == 200 and has_expected:
                print(f"  [PASS] 200 OK: {path}")
            else:
                print(f"  [FAIL] {status} on {path} (Expected text match: {has_expected})")
                failed += 1
    except Exception as e:
        print(f"  [FAIL] {path} -> {e}")
        failed += 1

print("\nTesting Brand Static Assets:")
for path in assets:
    url = f"{base_url}{path}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "AntigravityQA/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            status = resp.status
            length = len(resp.read())
            if status == 200 and length > 100:
                print(f"  [PASS] 200 OK: {path} ({length} bytes)")
            else:
                print(f"  [FAIL] {status} on {path}")
                failed += 1
    except Exception as e:
        print(f"  [FAIL] {path} -> {e}")
        failed += 1

print(f"\nQA Route Testing Finished. Failures: {failed}")
if failed > 0:
    sys.exit(1)
