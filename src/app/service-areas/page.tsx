import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Route, Compass, ArrowRight, Phone, BookOpen } from "lucide-react";
import { business } from "@/config/business";
import { adelaideRegions, interstateCorridors } from "@/data/areas";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CTASection } from "@/components/common/CTASection";
import { constructMetadata, generateBreadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Service Areas Adelaide | Cheap Adelaide Removalist",
  description:
    "See Adelaide suburbs and regional routes to ask about for a house, apartment or office move. Availability depends on your locations and date.",
  canonical: "/service-areas",
});

export default function ServiceAreasPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Service Areas", item: "/service-areas" },
  ]);

  const areasSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Adelaide Removalist Service Areas & Regions",
    description: "Adelaide areas customers can enquire about. Confirm route and date availability before booking.",
    itemListElement: adelaideRegions.map((region, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "AdministrativeArea",
        name: region.name,
        description: region.description,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "South Australia",
        },
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasSchema) }}
      />

      {/* 1. HERO */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Service Areas", href: "/service-areas" }]} />

          <div className="mt-4 max-w-3xl text-left">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A63F00]">
              Greater Adelaide & Beyond
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
              Removalists Across Adelaide
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              We are based in Elizabeth Vale and provide removal services around Adelaide. Send your pickup and delivery suburbs to confirm whether your route can be accommodated.
            </p>
          </div>
        </div>
      </section>

      {/* 2. BASE OF OPERATIONS CALLOUT */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#FF6A00]">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A63F00]">
                  Depot Location
                </span>
                <h3 className="text-lg font-bold text-[#0B2D5B]">
                  {business.location.street}, {business.location.suburb} SA {business.location.postcode}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Our listed address is {business.location.fullAddress}. Contact us with your route and timing to discuss availability.
                </p>
              </div>
            </div>

            <a
              href={business.contact.primaryPhoneHref}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#0B2D5B] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#071933] transition active:scale-[0.98]"
            >
              <Phone className="h-4 w-4 text-[#FF6A00]" />
              <span>Call Dispatch ({business.contact.primaryPhone})</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. METROPOLITAN ADELAIDE REGIONS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A63F00]">
              Regional Coverage
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              Adelaide Metropolitan Sectors
            </h2>
            <p className="mt-2 text-base text-slate-600">
              These locations provide a guide to areas around Adelaide. Confirm your pickup and delivery suburbs with us before making plans.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {adelaideRegions.map((region) => {
              const guideLink =
                region.id === "adelaide-cbd-inner"
                  ? {
                      href: "/blog/moving-adelaide-cbd-apartment-guide",
                      label: "Read CBD Apartment Moving Guide",
                    }
                : region.id === "adelaide-hills-regional"
                  ? {
                      href: "/blog/moving-to-adelaide-hills-removals-guide",
                      label: "Read Adelaide Hills Moving Guide",
                    }
                  : null;

              return (
                <div
                  key={region.id}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-[#FF6A00]/50 hover:shadow-lg text-left"
                >
                  <div>
                    <div className="flex items-center gap-2.5 font-bold text-lg text-[#0B2D5B]">
                      <Compass className="h-5 w-5 text-[#FF6A00]" />
                      <span>{region.name}</span>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {region.description}
                    </p>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Key Suburb Hubs:
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
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 italic">
                      {region.serviceNotes}
                    </p>
                    {guideLink && (
                      <Link
                        href={guideLink.href}
                        className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-[#A63F00] hover:text-[#0B2D5B] transition"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{guideLink.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INTERSTATE CORRIDORS */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left mb-12">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A63F00]">
              Interstate Routes
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              Long-Distance Transport Corridors
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Direct moves and backload space connecting Adelaide with interstate cities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl">
            {interstateCorridors.map((route, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#0B2D5B] font-bold text-base">
                    <Route className="h-5 w-5 text-[#FF6A00]" />
                    <span>{route.route}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    {route.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  <Link
                    href="/services/interstate-removals"
                    className="flex min-h-11 items-center justify-between text-xs font-bold text-[#A63F00] hover:underline"
                  >
                    <span>Interstate Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/blog/cheap-backloading-adelaide-guide"
                    className="flex min-h-11 items-center justify-between text-xs font-medium text-slate-500 hover:text-[#0B2D5B]"
                  >
                    <span>Backloading Guide</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        title="Moving to or from an Adelaide Suburb?"
        subtitle="Contact our coordinators today to discuss truck access, timing windows, and pricing for your area."
      />
    </div>
  );
}
