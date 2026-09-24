# Cheap Adelaide Removalist

> **Affordable Service. Premium Presentation.**  
> Official local removals website for Cheap Adelaide Removalist ([cheapadelaideremovalist.com.au](https://www.cheapadelaideremovalist.com.au)).

---

## 🚚 Overview

Cheap Adelaide Removalist is an Adelaide-focused moving service pairing value-driven rates with a high-trust, premium service experience. The website features:
- **Concept 4 Brand Identity**: High-contrast Deep Navy (`#0B2D5B`), Vivid Orange (`#FF6A00`), and clean editorial design extracted directly from the approved Concept 4 identity pack.
- **Next.js App Router (v16.3.6)**: Server-side rendering (SSR/SSG), high-performance static page generation, zero hydration lag, modern metadata API with JSON-LD structured data.
- **Tailwind CSS v4**: Utility-first CSS styling with custom brand color tokens and responsive grid architecture.
- **Zero Hallucination / Pure Truthfulness**: Strictly adheres to verified business data (shared HF Removals Adelaide operations base, verified phones, verified rates, 8 verified services). Zero fake reviews, zero fake testimonials, and zero fake staff biographies.
- **Conversion-Optimized Flow**: Clear quote calculation touchpoints, sticky mobile action bar (Call + Free Quote), and Web3Forms lead capture with spam honeypot.

---

## 🏢 Business Source of Truth

- **Brand**: Cheap Adelaide Removalist
- **Canonical Domain**: `https://www.cheapadelaideremovalist.com.au`
- **Primary Phone**: `0491 704 136` (`tel:+61491704136`)
- **Secondary Phone**: `0493 092 539` (`tel:+61493092539`)
- **Email**: `admin@cheapadelaideremovalist.com.au`
- **Operations Base / Depot**: `26 Knowles Road, Elizabeth Vale SA 5112, Australia`
- **Hours**: 7:00 am – 8:00 pm daily (7 days)
- **Primary Market**: Metropolitan Adelaide, South Australia
- **Operator Relationship**: *"Cheap Adelaide Removalist is operated by the same local removals operation behind HF Removals Adelaide."*

---

## 💰 Approved Pricing Structure

- **2 Movers + Truck**: From **$79 per 30 minutes** (hourly reference: $158/hr)
- **3 Movers + Truck**: From **$99 per 30 minutes** (hourly reference: $198/hr)
- **Mandatory Qualifier**: *"Final pricing depends on move size, inventory, access, travel and any additional services required."*

---

## 📦 Verified Service Offering

1. **House Removals** (`/services/house-removals`)
2. **Apartment Removals** (`/services/apartment-removals`)
3. **Furniture Removals** (`/services/furniture-removals`)
4. **Office Removals** (`/services/office-removals`)
5. **Commercial Removals** (`/services/commercial-removals`)
6. **Packing & Unpacking** (`/services/packing-unpacking`)
7. **Interstate Removals** (`/services/interstate-removals`)
8. **Backloading** (`/services/backloading`)

---

## 📁 Repository Structure

```text
cheapadelaide/
├── public/
│   ├── brand/
│   │   ├── logo-horizontal.png       # Primary navbar logo (transparent PNG)
│   │   ├── logo-horizontal-dark.png  # Inverted logo for dark backgrounds
│   │   ├── logo-stacked.png          # Stacked brand badge
│   │   ├── logo-primary.png          # High-resolution primary mark
│   │   ├── logo-monochrome.png       # Single-color icon
│   │   ├── logo-mark.png             # 512x512 app icon & squircle
│   │   ├── favicon.png               # 512x512 favicon
│   │   ├── apple-touch-icon.png      # 180x180 iOS touch icon
│   │   ├── hero-truck.webp           # Branded Adelaide hero vehicle
│   │   └── og-image.jpg              # 1200x630 social share card
│   ├── favicon.ico
│   ├── icon.png
│   ├── apple-icon.png
│   └── opengraph-image.png
├── scripts/
│   ├── generate_assets.py            # Concept 4 logo extraction & generation
│   ├── test_pages.py                 # Automated HTTP 200 route & asset tester
│   └── verify_codebase.py            # Zero placeholder & truthfulness linter
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Global HTML shell & schema
│   │   ├── page.tsx                  # Homepage
│   │   ├── services/                 # Service directory & [slug] dynamic pages
│   │   ├── service-areas/            # Adelaide metropolitan coverage
│   │   ├── pricing/                  # Transparent rate breakdown
│   │   ├── about/                    # Operating principles & equipment
│   │   ├── faq/                      # Grouped moving FAQ
│   │   ├── contact/                  # Direct phone, email, depot & map
│   │   ├── get-a-quote/              # Interactive quote request form
│   │   ├── privacy/                  # Privacy policy
│   │   ├── terms/                    # Terms of service
│   │   ├── sitemap.ts                # Dynamic XML sitemap generator
│   │   ├── robots.ts                 # Robots.txt generator
│   │   └── not-found.tsx             # Branded 404 page
│   ├── components/
│   │   ├── common/                   # Reusable UI elements (Pricing, FAQ, Forms)
│   │   └── layout/                   # Header, Footer, MobileMenu, MobileActionBar
│   ├── config/                       # Centralized business, SEO, and navigation configs
│   │   ├── business.ts               # Contact, depot, pricing, brand colours
│   │   ├── navigation.ts             # Header/footer route definitions
│   │   └── seo.ts                    # Metadata factory & JSON-LD schemas
│   └── data/                         # Verified structured data
│       ├── areas.ts                  # Suburb clusters & coverage
│       ├── faqs.ts                   # Q&As
│       ├── pricing.ts                # Rate plans & estimate tiers
│       └── services.ts               # Detailed descriptions for 8 services
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🛠️ Local Development & Scripts

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Production Build Locally
```bash
npm run start
```

### 5. Code Quality & Linter
```bash
npm run lint
```

### 6. Automated Codebase Truthfulness Check
```bash
python scripts/verify_codebase.py
```

### 7. Automated Route & Asset Smoke Test
```bash
python scripts/test_pages.py
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` to enable external form submissions:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for lead capture | Optional (falls back gracefully to tel/email) |
