import type { Metadata } from "next";
import { Info, Phone } from "lucide-react";
import { business } from "@/config/business";
import { quoteFactors } from "@/data/pricing";
import { generalFaqs } from "@/data/faqs";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PricingCards } from "@/components/common/PricingCards";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { QuoteForm } from "@/components/common/QuoteForm";
import { CTASection } from "@/components/common/CTASection";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Removalist Pricing & Rates Adelaide | Cheap Adelaide Removalist",
  description:
    "Upfront starting rates for Adelaide removals: 2 Movers + Truck from $79 / 30 min, 3 Movers + Truck from $99 / 30 min. View transparent rates and get a quote.",
  canonical: "/pricing",
});

export default function PricingPage() {
  const pricingFaqs = generalFaqs.filter(
    (f) => f.category === "pricing" || f.id === "request-quote" || f.id === "info-needed"
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Pricing", item: "/pricing" },
  ]);

  const faqSchema = generateFAQSchema(pricingFaqs);

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Adelaide Removalist Rates & Pricing",
    description: "Published starting rates for moving teams in Adelaide. Final quote terms depend on the move details.",
    itemListElement: [
      {
        "@type": "Offer",
        name: "2 Movers + Truck",
        price: "79",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "79",
          priceCurrency: "AUD",
          unitText: "per 30 minutes",
        },
        description: "Published starting rate for 2 movers and a truck. Confirm the applicable quote terms for the move.",
        url: `${business.domain}/pricing`,
      },
      {
        "@type": "Offer",
        name: "3 Movers + Truck",
        price: "99",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "99",
          priceCurrency: "AUD",
          unitText: "per 30 minutes",
        },
        description: "Published starting rate for 3 movers and a truck. Confirm the applicable quote terms for the move.",
        url: `${business.domain}/pricing`,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      {/* 1. HERO */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Pricing", href: "/pricing" }]} />

          <div className="mt-4 max-w-3xl">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A63F00]">
              Transparent Rates
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
              Straightforward Moving Rates
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Starting rates are shown for both team options. Final pricing depends on move size, inventory, access, travel and any additional services required.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PRICING CARDS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingCards />
        </div>
      </section>

      {/* 3. WHAT AFFECTS YOUR QUOTE */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A63F00]">
              Clear Scoping
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              What Affects Your Moving Quote?
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Every relocation is different. Here are the primary operational factors our coordinators consider when scoping your job:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {quoteFactors.map((factor, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#A63F00] font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#0B2D5B]">
                    {factor.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Notice Box */}
          <div className="mt-12 rounded-2xl bg-white p-6 sm:p-8 max-w-4xl mx-auto border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0B2D5B]">
                <Info className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0B2D5B]">
                  Confirm the full quote
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Share your inventory, route and access details in advance. Confirm the applicable travel, access and additional-service charges before booking.
                </p>
              </div>
            </div>

            <a
              href={business.contact.primaryPhoneHref}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#0B2D5B] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#071933] transition"
            >
              <Phone className="h-4 w-4 text-[#FF6A00]" />
              <span>Call 0491 704 136</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. PRICING FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A63F00]">
              Pricing Clarity
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#0B2D5B] sm:text-3xl font-[family-name:var(--font-heading)]">
              Pricing & Quote Questions
            </h2>
          </div>

          <FAQAccordion items={pricingFaqs} />
        </div>
      </section>

      {/* 5. QUOTE FORM */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              Tell Us About Your Move
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Submit your inventory and dates below for a fast, free moving estimate.
            </p>
          </div>
          <QuoteForm sourcePage="Pricing Page" />
        </div>
      </section>

      {/* 6. CTA */}
      <CTASection />
    </div>
  );
}
