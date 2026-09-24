import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Users,
  CalendarCheck,
  ShieldCheck,
  Home,
  Building2,
  Armchair,
  Briefcase,
  Store,
  PackageCheck,
  Truck,
  Repeat,
} from "lucide-react";
import { services } from "@/data/services";
import { business } from "@/config/business";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
} from "@/config/seo";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { QuoteForm } from "@/components/common/QuoteForm";
import { CTASection } from "@/components/common/CTASection";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const serviceIcons: Record<string, React.ElementType> = {
  "house-removals": Home,
  "apartment-removals": Building2,
  "furniture-removals": Armchair,
  "office-removals": Briefcase,
  "commercial-removals": Store,
  "packing-unpacking": PackageCheck,
  "interstate-removals": Truck,
  backloading: Repeat,
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return constructMetadata({
      title: "Service Not Found",
      description: "The requested removalist service could not be found.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    canonical: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = serviceIcons[service.slug] || Truck;
  const related = services.filter((s) => service.relatedServices.includes(s.slug));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: service.title, item: `/services/${service.slug}` },
  ]);

  const serviceSchema = generateServiceSchema(service);

  const faqSchema =
    service.faqs && service.faqs.length > 0
      ? generateFAQSchema(service.faqs)
      : null;

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* 1. HERO & BREADCRUMBS */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Services", href: "/services" },
              { name: service.title, href: `/services/${service.slug}` },
            ]}
          />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                <span>Adelaide Specialist Removals</span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] leading-tight">
                {service.heroHeadline}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {service.heroSubheadline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/get-a-quote?service=${service.slug}`}
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

            {/* Service Summary Card */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6A00]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-slate-400">
                      Starting Rate
                    </h3>
                    <p className="text-lg font-extrabold text-[#0B2D5B]">
                      {service.startingRate}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#FF6A00]" />
                    <span>Starting rates from $79 / 30 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#FF6A00]" />
                    <span>2 or 3 movers with a truck</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-[#FF6A00]" />
                    <span>{business.hours}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-slate-500 italic">
                    {business.pricing.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & WHAT IT COVERS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Overview Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                  Service Overview
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[#0B2D5B] sm:text-3xl font-[family-name:var(--font-heading)]">
                  How We Handle {service.title} in Adelaide
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* What the Service Covers */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="text-xl font-bold text-[#0B2D5B] mb-4">
                  What This Service Covers
                </h3>
                <ul className="space-y-3">
                  {service.whatItCovers.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="h-5 w-5 text-[#FF6A00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Who It Suits & Access Considerations */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <h3 className="text-lg font-bold text-[#0B2D5B]">
                  Who This Service Suits
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {service.whoItSuits.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00] shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Planning & Access Considerations</span>
                </div>
                <ul className="space-y-2 text-xs text-amber-950">
                  {service.accessConsiderations.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP BY STEP PROCESS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Step-by-Step
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#0B2D5B] sm:text-3xl font-[family-name:var(--font-heading)]">
              Our {service.title} Process
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              A sequence of practical steps from enquiry to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.processSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-extrabold text-[#FF6A00] font-[family-name:var(--font-heading)]">
                    Step {step.step}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-[#0B2D5B]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICE FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Questions Answered
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#0B2D5B] sm:text-3xl font-[family-name:var(--font-heading)]">
              {service.title} FAQs
            </h2>
          </div>

          <FAQAccordion
            items={service.faqs.map((f, idx) => ({
              id: `${service.slug}-faq-${idx}`,
              question: f.question,
              answer: f.answer,
            }))}
          />
        </div>
      </section>

      {/* 5. RELATED SERVICES */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-[#0B2D5B] mb-8 text-center sm:text-left">
              Related Removals Services in Adelaide
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => {
                const RelIcon = serviceIcons[rel.slug] || Truck;
                return (
                  <Link
                    key={rel.slug}
                    href={`/services/${rel.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#FF6A00] hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#FF6A00]">
                      <RelIcon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-base font-bold text-[#0B2D5B] group-hover:text-[#FF6A00] transition-colors">
                      {rel.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {rel.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#FF6A00]">
                      <span>Learn more</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. QUOTE FORM BLOCK */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <QuoteForm
            defaultMoveType={service.title.split(" ")[0]}
            sourcePage={`Service Page: ${service.title}`}
          />
        </div>
      </section>

      {/* 7. CTA */}
      <CTASection
        title={`Ready to Book Your Adelaide ${service.title}?`}
        subtitle="Call 0491 704 136 during our listed hours or submit your move details online."
      />
    </div>
  );
}
