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
    ? `${title} | ${business.name}`
    : `${business.name} | Affordable Adelaide Movers`;

  const canonicalUrl = canonical
    ? `${business.domain}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : business.domain;

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
    image: `${business.domain}/brand/logo-primary.png`,
    url: business.domain,
    telephone: business.contact.primaryPhone,
    email: business.contact.email,
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
      latitude: -34.7577,
      longitude: 138.6757,
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
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Adelaide, South Australia",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; item: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http")
        ? crumb.item
        : `${business.domain}${crumb.item}`,
    })),
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
