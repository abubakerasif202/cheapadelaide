import type { Metadata } from "next";
import { business } from "@/config/business";
import { generalFaqs } from "@/data/faqs";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { CTASection } from "@/components/common/CTASection";
import { Button } from "@/components/core";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Adelaide Removalist FAQs | Cheap Adelaide Removalist",
  description:
    "Find answers to frequently asked questions about booking, rates, packing, moving preparation, and choosing the right mover team in Adelaide.",
  canonical: "/faq",
});

export default function FAQPage() {
  const serviceFaqs = generalFaqs.filter((f) => f.category === "services");
  const pricingFaqs = generalFaqs.filter((f) => f.category === "pricing" || f.category === "general");
  const prepFaqs = generalFaqs.filter((f) => f.category === "preparation");

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "FAQ", item: "/faq" },
  ]);

  const faqSchema = generateFAQSchema(generalFaqs);

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="ca-section" style={{ background: "var(--paper)", borderBottom: "1px solid var(--border-default)", paddingBlock: 48 }}>
        <div className="ca-container">
          <Breadcrumbs crumbs={[{ name: "FAQ", href: "/faq" }]} />

          <div style={{ marginTop: 16, maxWidth: 720 }}>
            <span className="ca-badge ca-badge--accent">Got Questions?</span>
            <h1 className="ca-h1" style={{ marginTop: 12 }}>
              Frequently Asked Questions
            </h1>
            <p className="ca-lead" style={{ marginTop: 16 }}>
              Everything you need to know about our Adelaide moving services, transparent starting rates, preparation
              tips, and how our teams work on moving day.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Groups */}
      <section className="ca-section">
        <div className="ca-container ca-container--narrow" style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          <div>
            <div className="ca-sechead" style={{ marginBottom: 24 }}>
              <div className="ca-sechead__text">
                <span className="ca-eyebrow">Category 1</span>
                <h2 className="ca-h2">Quotes & Pricing FAQs</h2>
              </div>
            </div>
            <FAQAccordion items={pricingFaqs} />
          </div>

          <div>
            <div className="ca-sechead" style={{ marginBottom: 24 }}>
              <div className="ca-sechead__text">
                <span className="ca-eyebrow">Category 2</span>
                <h2 className="ca-h2">Services & Capabilities</h2>
              </div>
            </div>
            <FAQAccordion items={serviceFaqs} />
          </div>

          <div>
            <div className="ca-sechead" style={{ marginBottom: 24 }}>
              <div className="ca-sechead__text">
                <span className="ca-eyebrow">Category 3</span>
                <h2 className="ca-h2">Moving Day Preparation</h2>
              </div>
            </div>
            <FAQAccordion items={prepFaqs} />
          </div>

          {/* Have a Question Not Listed Here? */}
          <div className="ca-card ca-card--flat" style={{ textAlign: "center", alignItems: "center", gap: 16, padding: 32 }}>
            <h3 className="ca-h3" style={{ fontSize: 20 }}>
              Have a Specific Question About Your Move?
            </h3>
            <p className="ca-small" style={{ maxWidth: 480 }}>
              Call us during our listed hours to discuss access, team options and your move details.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, paddingTop: 8 }}>
              <Button href={business.contact.primaryPhoneHref} variant="secondary" leadingIcon="phone">
                Call {business.contact.primaryPhone}
              </Button>
              <Button href="/contact" variant="outline" trailingIcon="arrow-right">
                Contact Page
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
