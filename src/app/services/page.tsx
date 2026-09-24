import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Home, Building2, Armchair, Briefcase, Store, PackageCheck, Truck, Repeat } from "lucide-react";
import { services } from "@/data/services";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CTASection } from "@/components/common/CTASection";
import { constructMetadata, generateBreadcrumbSchema } from "@/config/seo";
import { business } from "@/config/business";

export const metadata: Metadata = constructMetadata({
  title: "Removal Services Adelaide | Cheap Adelaide Removalist",
  description:
    "Explore our complete range of moving services across Adelaide: house removals, apartments, furniture transport, office relocations, packing, and interstate.",
  canonical: "/services",
});

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

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Adelaide Removalist Services",
    description: "Professional removals and transport services across Greater Adelaide.",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.shortDescription,
      url: `${business.domain}/services/${service.slug}`,
    })),
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Services", href: "/services" }]} />

          <div className="mt-4 max-w-3xl">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Adelaide Removals Solutions
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
              Our Professional Moving Services
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Compare the removal services available and share your move details to discuss the right option. Starting rates are published for both team sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug] || Truck;
              return (
                <div
                  key={service.slug}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#FF6A00]/50 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6A00]">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {service.startingRate}
                      </span>
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-[#0B2D5B]">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Inclusions:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                        {service.whatItCovers.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 shrink-0 text-[#FF6A00] mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6A00] hover:text-[#E63900] transition"
                    >
                      <span>Read Full Guide & FAQs</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href={`/get-a-quote?type=${service.title}`}
                      className="rounded-xl bg-[#0B2D5B] px-4 py-2 text-xs font-bold text-white hover:bg-[#071933] transition"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Discuss Your Move with Adelaide Locals?"
        subtitle="Call 0491 704 136 during our listed hours or send an online enquiry."
      />
    </div>
  );
}
