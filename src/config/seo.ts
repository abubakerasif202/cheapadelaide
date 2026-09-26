import type { Metadata } from "next";
import { business } from "./business";

export const siteConfig = {
  name: business.name,
  domain: business.domain,
  description:
    "Affordable removalists in Adelaide for home, apartment, office and furniture moves. Compare starting rates and request a quote.",
  ogImage: `${business.domain}/brand/og-image.jpg`,
  locale: "en_AU",
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
  const pageTitle = title ?? "Affordable Adelaide Removalists | Cheap Adelaide Removalist";

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
          alt: `${business.name} removalist services in Adelaide`,
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
    "@id": `${business.domain}/#moving-company`,
    name: business.name,
    description: siteConfig.description,
    image: `${business.domain}/brand/hero-truck.webp`,
    logo: `${business.domain}/brand/logo-horizontal.png`,
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
    areaServed: [
      {
        "@type": "City",
        name: "Adelaide",
      },
      {
        "@type": "AdministrativeArea",
        name: "Greater Adelaide, South Australia",
      },
    ],
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
      "@id": `${business.domain}/#moving-company`,
    },
    areaServed: {
      "@type": "City",
      name: "Adelaide",
    },
    url: `${business.domain}/services/${service.slug}`,
  };
}
