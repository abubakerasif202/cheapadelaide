import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight, Compass, AlertTriangle, CheckCircle2 } from "lucide-react";
import { business } from "@/config/business";
import { adelaideRegions } from "@/data/areas";
import { services } from "@/data/services";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { CTASection } from "@/components/common/CTASection";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/config/seo";

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return adelaideRegions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = adelaideRegions.find((r) => r.slug === slug);

  if (!region) {
    return constructMetadata({
      title: "Area Not Found",
      description: "The requested service area could not be found.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: region.seoTitle,
    description: region.metaDescription,
    canonical: `/service-areas/${region.slug}`,
  });
}

export default async function RegionDetailPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = adelaideRegions.find((r) => r.slug === slug);

  if (!region) {
    notFound();
  }

  const otherRegions = adelaideRegions.filter((r) => r.slug !== region.slug);
  const featuredServices = services.filter((s) =>
    ["house-removals", "apartment-removals", "office-removals"].includes(s.slug)
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Service Areas", item: "/service-areas" },
    { name: region.name, item: `/service-areas/${region.slug}` },
  ]);

  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Removalists in ${region.name}`,
    serviceType: "Removals",
    description: region.metaDescription,
    provider: { "@id": `${business.domain}/#moving-company` },
    areaServed: region.keyHubs.map((hub) => ({
      "@type": "Place",
      name: hub,
    })),
    url: `${business.domain}/service-areas/${region.slug}`,
  };

  const faqSchema = region.faqs.length > 0 ? generateFAQSchema(region.faqs) : null;

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 1. HERO */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Service Areas", href: "/service-areas" },
              { name: region.name, href: `/service-areas/${region.slug}` },
            ]}
          />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A63F00]">
                <MapPin className="h-3.5 w-3.5" />
                Adelaide Service Area
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] leading-tight">
                Removalists in {region.name}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {region.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/get-a-quote"
                  className="rounded-xl bg-[#FF6A00] px-6 py-3.5 text-sm font-bold text-[#071933] shadow-lg shadow-orange-500/20 transition hover:bg-orange-300"
                >
                  Request a Free Quote
                </Link>
                <a
                  href={business.contact.primaryPhoneHref}
                  className="rounded-xl border-2 border-[#0B2D5B] bg-white px-6 py-3.5 text-sm font-bold text-[#0B2D5B] hover:bg-slate-50 transition"
                >
                  Call {business.contact.primaryPhone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Key Suburb Hubs
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {region.keyHubs.map((hub) => (
                    <span
                      key={hub}
                      className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200"
                    >
                      {hub}
                    </span>
                  ))}
                </div>
                <p className="pt-2 text-[13px] text-slate-500 italic border-t border-slate-100">
                  {region.serviceNotes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOCAL MOVING CONSIDERATIONS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A63F00]">
                  Local Planning Notes
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[#0B2D5B] sm:text-3xl font-[family-name:var(--font-heading)]">
                  Moving Considerations for {region.name}
                </h2>
              </div>
              <ul className="space-y-3">
                {region.movingConsiderations.map((note, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <h3 className="text-lg font-bold text-[#0B2D5B]">
                  Well Suited For
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {region.suitedFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED SERVICES */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-[#0B2D5B] mb-8 text-center sm:text-left">
            Services Available in {region.name}
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#FF6A00] hover:shadow-md"
              >
                <h4 className="text-base font-bold text-[#0B2D5B] group-hover:text-[#A63F00] transition-colors">
                  {svc.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                  {svc.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#A63F00]">
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      {region.faqs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A63F00]">
                Questions Answered
              </span>
              <h2 className="mt-3 text-2xl font-bold text-[#0B2D5B] sm:text-3xl font-[family-name:var(--font-heading)]">
                {region.name} FAQs
              </h2>
            </div>
            <FAQAccordion
              items={region.faqs.map((f, idx) => ({
                id: `${region.slug}-faq-${idx}`,
                question: f.question,
                answer: f.answer,
              }))}
            />
          </div>
        </section>
      )}

      {/* 5. NEARBY AREAS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-[#0B2D5B] mb-8 text-center sm:text-left">
            Other Adelaide Service Areas
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherRegions.map((r) => (
              <Link
                key={r.slug}
                href={`/service-areas/${r.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#FF6A00] hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-[#0B2D5B] font-bold text-sm">
                  <Compass className="h-4 w-4 text-[#FF6A00]" />
                  <span>{r.name}</span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#A63F00]">
                  <span>View area</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
            <Link
              href="/service-areas"
              className="group rounded-2xl border border-dashed border-slate-300 bg-white p-6 shadow-sm transition hover:border-[#FF6A00] flex items-center justify-center text-sm font-bold text-[#0B2D5B]"
            >
              View All Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <CTASection
        title={`Ready to Book Your ${region.name} Move?`}
        subtitle={`Call ${business.contact.primaryPhone} during our listed hours or submit your move details online.`}
      />
    </div>
  );
}
