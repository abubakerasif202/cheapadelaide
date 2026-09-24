import type { Metadata } from "next";
import { business } from "./business";

export const siteConfig = {
  name: business.name,
  domain: business.domain,
  description:
    "Affordable Adelaide removalists for house, apartment, office, furniture and interstate moves. View starting rates and request a moving quote.",
  ogImage: `${business.domain}/brand/og-image.jpg`,
  locale: "en_AU",
  keywords: [
    "cheap removalists Adelaide",
    "cheap Adelaide removalist",
    "affordable removalists Adelaide",
    "Adelaide removalists",
    "Adelaide movers",
    "house removalists Adelaide",
    "apartment removalists Adelaide",
    "office removalists Adelaide",
    "furniture removalists Adelaide",
    "interstate removals Adelaide",
    "backloading Adelaide",
  ],
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  canonical,
  ogImage = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const pageTitle = title
    ? title.toLowerCase().includes(business.name.toLowerCase())
      ? title
      : `${title} | ${business.name}`
    : `${business.name} | Affordable Adelaide Movers`;

  let canonicalUrl: string = business.domain;
  if (canonical) {
    if (canonical.startsWith("http")) {
      canonicalUrl = canonical;
    } else {
      const cleanPath =
        canonical === "/"
          ? ""
          : canonical.startsWith("/")
          ? canonical
          : `/${canonical}`;
      canonicalUrl = `${business.domain}${cleanPath}`;
    }
  }

  return {
    title: pageTitle,
    description,
    keywords: siteConfig.keywords,
    metadataBase: new URL(business.domain),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: business.name,
      locale: siteConfig.locale,
      type: "website" as const,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${business.name} - Concept 4 Brand Identity`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/brand/favicon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export function generateMovingCompanySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: business.name,
    legalName: business.name,
    description: siteConfig.description,
    image: `${business.domain}/brand/hero-truck.webp`,
    logo: `${business.domain}/brand/logo-horizontal.png`,
    url: business.domain,
    telephone: business.contact.primaryPhone,
    email: business.contact.email,
    priceRange: "$$ (From $79/30 min)",
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, Credit Card, Direct Debit, Bank Transfer, EFTPOS",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.location.street,
      addressLocality: business.location.suburb,
      addressRegion: business.location.state,
      postalCode: business.location.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.7508,
      longitude: 138.6811,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Adelaide",
      },
      {
        "@type": "AdministrativeArea",
        name: "Greater Adelaide, South Australia",
      },
      {
        "@type": "AdministrativeArea",
        name: "Adelaide Hills, South Australia",
      },
      {
        "@type": "AdministrativeArea",
        name: "South Australia",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Adelaide Moving Services and Rates",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "2 Movers + Truck Removals",
            description: "2 movers with truck suitable for 1-2 bedroom apartments and unit relocations in Adelaide.",
          },
          price: "79",
          priceCurrency: "AUD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "79",
            priceCurrency: "AUD",
            unitText: "per 30 minutes",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "3 Movers + Truck Removals",
            description: "3 movers with truck suitable for 3-4 bedroom houses and larger commercial moves across Adelaide.",
          },
          price: "99",
          priceCurrency: "AUD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "99",
            priceCurrency: "AUD",
            unitText: "per 30 minutes",
          },
        },
      ],
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: business.domain,
    description: siteConfig.description,
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; item: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => {
      let resolvedUrl = crumb.item;
      if (!crumb.item.startsWith("http")) {
        const clean =
          crumb.item === "/"
            ? ""
            : crumb.item.startsWith("/")
            ? crumb.item
            : `/${crumb.item}`;
        resolvedUrl = `${business.domain}${clean}`;
      }
      return {
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.name,
        item: resolvedUrl,
      };
    }),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateServiceSchema(service: {
  title: string;
  shortDescription: string;
  slug: string;
  startingRate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} Adelaide`,
    serviceType: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "MovingCompany",
      name: business.name,
      url: business.domain,
      telephone: business.contact.primaryPhone,
    },
    areaServed: {
      "@type": "City",
      name: "Adelaide",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: "79",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "79",
        priceCurrency: "AUD",
        unitText: "per 30 minutes",
      },
      availability: "https://schema.org/InStock",
      url: `${business.domain}/services/${service.slug}`,
    },
  };
}
