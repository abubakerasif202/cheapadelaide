import type { Metadata } from "next";
import { business } from "@/config/business";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { QuoteForm } from "@/components/common/QuoteForm";
import { ContactMethod, OperatorNotice } from "@/components/marketing";
import { constructMetadata, generateBreadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us & Adelaide Depot | Cheap Adelaide Removalist",
  description:
    "Contact Cheap Adelaide Removalist. Phone 0491 704 136, email admin@cheapadelaideremovalist.com.au, operations base at 26 Knowles Road, Elizabeth Vale SA. Open 7 days.",
  canonical: "/contact",
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" },
  ]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Cheap Adelaide Removalist",
    url: `${business.domain}/contact`,
    mainEntity: {
      "@type": "MovingCompany",
      name: business.name,
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
    },
  };

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      {/* Hero */}
      <section className="ca-section" style={{ background: "var(--paper)", borderBottom: "1px solid var(--border-default)", paddingBlock: 48 }}>
        <div className="ca-container">
          <Breadcrumbs crumbs={[{ name: "Contact", href: "/contact" }]} />

          <div style={{ marginTop: 16, maxWidth: 720 }}>
            <span className="ca-badge ca-badge--accent">Direct Contact</span>
            <h1 className="ca-h1" style={{ marginTop: 12 }}>
              Get in Touch with Our Adelaide Team
            </h1>
            <p className="ca-lead" style={{ marginTop: 16 }}>
              Have an enquiry about your upcoming move? Call our dispatch line directly, send an email, or fill out the
              online form below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details & Depot Info */}
      <section className="ca-section">
        <div className="ca-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Contact Cards */}
            <div className="lg:col-span-5" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <span className="ca-eyebrow">Depot & Communication</span>
                  <h2 className="ca-h2" style={{ marginTop: 8 }}>
                    Business & Dispatch Information
                  </h2>
                </div>

                <ContactMethod
                  icon="phone"
                  label="Primary Phone (Direct Line)"
                  value={business.contact.primaryPhone}
                  href={business.contact.primaryPhoneHref}
                  note="Call during our listed contact hours"
                  emphasis
                />
                <ContactMethod
                  icon="phone"
                  label="Secondary Phone"
                  value={business.contact.secondaryPhone}
                  href={business.contact.secondaryPhoneHref}
                  note="Alternative operational line"
                  tone="navy"
                />
                <ContactMethod
                  icon="mail"
                  label="Email Address"
                  value={business.contact.email}
                  href={`mailto:${business.contact.email}`}
                  note="Written quotes, commercial floor plans & invoicing"
                />
                <ContactMethod
                  icon="map-pin"
                  label="Operations Base"
                  value={`${business.location.street}, ${business.location.suburb} ${business.location.state} ${business.location.postcode}`}
                  note="Business address"
                  tone="navy"
                />
                <ContactMethod
                  icon="clock"
                  label="Public Operating Hours"
                  value={business.hours}
                  note="Monday to Sunday including public holidays by booking"
                />

                <OperatorNotice title="Operator Notice" action={null} />
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-7">
              <QuoteForm sourcePage="Contact Page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
