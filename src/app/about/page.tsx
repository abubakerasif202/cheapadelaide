import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Check } from "lucide-react";
import { business } from "@/config/business";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CTASection } from "@/components/common/CTASection";
import { constructMetadata } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "About Us | Cheap Adelaide Removalist",
  description:
    "Learn about Cheap Adelaide Removalist: an affordable moving service backed by an established local Adelaide removals operation with transparent rates.",
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "About", href: "/about" }]} />

          <div className="mt-4 max-w-3xl">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Our Operation
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
              About Cheap Adelaide Removalist
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              We provide affordable, well-organised moving services for Adelaide homes, apartments, and businesses, backed by an established local removals infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY & POSITIONING */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                  Core Philosophy
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[#0B2D5B] sm:text-3xl font-[family-name:var(--font-heading)]">
                  Affordable Service. Premium Presentation.
                </h2>
              </div>

              <p className="text-base text-slate-600 leading-relaxed">
                The name &quot;Cheap Adelaide Removalist&quot; refers to value, affordability, and practical pricing. But when our team arrives at your door, there is nothing cheap about the standard of service we deliver.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Too often, budget moving companies cut corners by hiring inexperienced workers, skipping protective blankets, or surprising customers with hidden fees at the end of the day. We take the exact opposite approach: transparent starting rates, fully equipped trucks, and careful handling from start to finish.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
                <h3 className="text-base font-bold text-[#0B2D5B]">
                  Our Service Principles:
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-[#FF6A00] mt-0.5" />
                    <span><strong>Transparent Starting Rates:</strong> $79 / 30 min (2 movers) and $99 / 30 min (3 movers) with clear 30-min billing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-[#FF6A00] mt-0.5" />
                    <span><strong>Real Furniture Protection:</strong> Every load carries heavy-duty furniture blankets and tie-down strapping.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-[#FF6A00] mt-0.5" />
                    <span><strong>Direct Local Contact:</strong> Talk directly to our coordinators on 0491 704 136, 7 days a week.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Card: Vehicle Presentation */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <div className="relative aspect-[16/11] w-full bg-slate-900">
                  <Image
                    src="/brand/hero-truck.webp"
                    alt="Cheap Adelaide Removalist Branded Moving Truck"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Operational Transparency</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#0B2D5B]">
                    Local Operations Depot
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our removals operation is based at {business.location.fullAddress}.
                  </p>
                  <p className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                    {business.operatorNotice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TYPES OF MOVES HANDLED */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Scope of Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              Moves Handled by Our Crews
            </h2>
            <p className="mt-2 text-base text-slate-600">
              We handle moves across residential, commercial, and long-distance transport sectors:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B2D5B] text-lg">House Removals</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                1 to 4+ bedroom residential relocations with 2 or 3 mover crews.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B2D5B] text-lg">Apartments & Lifts</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                High-rise lift reservations, dock access, and walk-up stairs across metro Adelaide.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B2D5B] text-lg">Workplaces & Offices</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Commercial desks, IT boxes, and retail stock moved with minimal downtime.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B2D5B] text-lg">Interstate Transport</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Direct trucks and economical backloading to Melbourne, Sydney, and Brisbane.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <CTASection />
    </div>
  );
}
