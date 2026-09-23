import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { generalFaqs } from "@/data/faqs";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { CTASection } from "@/components/common/CTASection";
import { constructMetadata } from "@/config/seo";

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

  return (
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "FAQ", href: "/faq" }]} />

          <div className="mt-4 max-w-3xl">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Got Questions?
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Everything you need to know about our Adelaide moving services, transparent starting rates, preparation tips, and how our teams work on moving day.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FAQ GROUPS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* General & Pricing */}
          <div>
            <div className="border-b border-slate-200 pb-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Category 1
              </span>
              <h2 className="text-2xl font-bold text-[#0B2D5B]">
                Quotes & Pricing FAQs
              </h2>
            </div>
            <FAQAccordion items={pricingFaqs} />
          </div>

          {/* Services */}
          <div>
            <div className="border-b border-slate-200 pb-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Category 2
              </span>
              <h2 className="text-2xl font-bold text-[#0B2D5B]">
                Services & Capabilities
              </h2>
            </div>
            <FAQAccordion items={serviceFaqs} />
          </div>

          {/* Preparation */}
          <div>
            <div className="border-b border-slate-200 pb-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Category 3
              </span>
              <h2 className="text-2xl font-bold text-[#0B2D5B]">
                Moving Day Preparation
              </h2>
            </div>
            <FAQAccordion items={prepFaqs} />
          </div>

          {/* Have a Question Not Listed Here? */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center space-y-4">
            <h3 className="text-xl font-bold text-[#0B2D5B]">
              Have a Specific Question About Your Move?
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Our Adelaide dispatch team is on hand 7 days a week from 7:00 am to 8:00 pm to discuss access, trucks, and bookings.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href={business.contact.primaryPhoneHref}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B2D5B] px-6 py-3 text-sm font-bold text-white hover:bg-[#071933] transition"
              >
                <Phone className="h-4 w-4 text-[#FF6A00]" />
                <span>Call {business.contact.primaryPhone}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
              >
                <span>Contact Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <CTASection />
    </div>
  );
}
