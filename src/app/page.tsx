import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Home,
  Building2,
  Armchair,
  Briefcase,
  Store,
  PackageCheck,
  Truck,
  Repeat,
  MapPin,
  Check,
} from "lucide-react";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { generalFaqs } from "@/data/faqs";
import { AdelaideMoveBento } from "@/components/home/AdelaideMoveBento";
import { ProcessTimeline } from "@/components/common/ProcessTimeline";
import { TrustSection } from "@/components/common/TrustSection";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { QuoteForm } from "@/components/common/QuoteForm";
import { CTASection } from "@/components/common/CTASection";

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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION (Asymmetric Split Screen with Liquid Glass) */}
      <section className="relative overflow-hidden bg-[#071933] py-12 text-white sm:py-16 lg:py-24">
        {/* Subtle geometric angle background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(115deg,transparent_62%,#FF6A00_62.1%,transparent_62.5%),linear-gradient(115deg,transparent_67%,#fff_67.1%,transparent_67.2%)]"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Left-Aligned Editorial Typographic Hierarchy */}
            <div className="relative z-10 space-y-6 text-left lg:col-span-7">
              {/* Liquid Glass Status Pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6A00] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6A00]" />
                </span>
                <span>Adelaide Specialist Removals • Open Daily</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] leading-[1.03]">
                Affordable Adelaide Removalists{" "}
                <span className="text-[#FF6A00] block mt-1">
                  Without the Runaround.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Straightforward moving services for homes, apartments, offices, and furniture across Greater Adelaide. Transparent rates from $79 per 30 minutes with zero hidden stair surcharges.
              </p>

              {/* Tactile Action Buttons */}
              <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
                <Link
                  href="/get-a-quote"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-7 py-4 text-base font-extrabold text-[#071933] shadow-xl shadow-orange-500/25 transition-all hover:bg-orange-300 active:scale-[0.98]"
                >
                  <span>Get My Free Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <a
                  href={business.contact.primaryPhoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:bg-white/15 active:scale-[0.98]"
                >
                  <Phone className="h-5 w-5 text-[#FF6A00]" />
                  <span>Call {business.contact.primaryPhone}</span>
                </a>
              </div>

              {/* Quick Pricing Badge Strip with Diffusion Shadows */}
              <div className="pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-3 max-w-lg">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] text-xs font-mono font-bold text-[#071933]">
                      2P
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight text-white">
                        2 Movers + Truck
                      </div>
                      <div className="text-[11px] leading-tight text-slate-300">
                        From <strong className="text-orange-300 font-mono">$79</strong> / 30 min{" "}
                        <span className="text-slate-400 font-mono">($158/hr)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] text-xs font-mono font-bold text-[#071933]">
                      3P
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight text-white">
                        3 Movers + Truck
                      </div>
                      <div className="text-[11px] leading-tight text-slate-300">
                        From <strong className="text-orange-300 font-mono">$99</strong> / 30 min{" "}
                        <span className="text-slate-400 font-mono">($198/hr)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-[11px] text-slate-400">
                  {business.pricing.disclaimer}
                </p>
              </div>
            </div>

            {/* Right Column: Branded Visual Card with Diffusion Shadow */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                  <div className="relative aspect-[16/11] w-full bg-slate-900">
                    <Image
                      src="/brand/hero-truck.webp"
                      alt="Concept 4 branded removal truck on an Adelaide road"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071933]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold tracking-wide flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#FF6A00]" />
                        Adelaide Metro & Regional SA
                      </span>
                      <span className="rounded-full bg-[#FF6A00] px-2.5 py-0.5 font-bold text-[10px] uppercase text-[#071933]">
                        Active Crew
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 bg-white p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0" />
                      <span>{business.location.fullAddress}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0" />
                      <span>{business.hours} (Monday – Sunday)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0" />
                      <span>Direct phone dispatch with zero automated bot delays</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (Anti-Center Layout & Tactile Cards) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="text-left">
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Verified Services
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)] tracking-tight">
                Our Adelaide Removals Services
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                House, apartment, furniture, office, commercial, packing, and interstate moving services.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6A00] hover:text-[#E63900] transition active:scale-[0.98]"
            >
              <span>Explore All 8 Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug] || Truck;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:border-[#FF6A00]/50 hover:shadow-lg active:scale-[0.98]"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6A00] transition group-hover:bg-[#FF6A00] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-[#0B2D5B] group-hover:text-[#FF6A00] transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-[#0B2D5B]">
                    <span>View Service Details</span>
                    <ArrowRight className="h-4 w-4 text-[#FF6A00] transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BENTO 2.0 ARCHITECTURAL SECTION (Move Sizer, Radar, Zero-Surprise & Metro Matrix) */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8 mb-12">
            <div className="text-left">
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Bento Architecture
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)] tracking-tight">
                Move Logistics & Pricing Engine
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                Compare configuration models, assess realistic duration ranges, and inspect regional arterial coverage.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2D5B] hover:text-[#FF6A00] transition"
            >
              <span>Full Pricing Breakdown</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <AdelaideMoveBento />
        </div>
      </section>

      {/* 4. WORKFLOW & PROCESS TIMELINE (Anti-Center Layout) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8 mb-12">
            <div className="text-left">
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Clear Workflow
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)] tracking-tight">
                How Moving Works With Us
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                A predictable four-phase sequence from initial quotation through to final key handover.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Reliable Local Moving Protocol
            </span>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* 5. RESIDENTIAL & APARTMENT FEATURE SECTION (NAVY ACCENT) */}
      <section className="relative overflow-hidden bg-[#071933] py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-left">
              <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                Residential Moves
              </span>
              <h2 className="text-3xl font-extrabold sm:text-4xl font-[family-name:var(--font-heading)] tracking-tight leading-tight">
                Homes & Apartments Moved With Real Care Across Adelaide
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Moving from a house or apartment? Share your pickup and delivery details, inventory, and building access requirements when you request a quote.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-[#071933]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">Building Access:</strong>
                    <span className="text-xs text-slate-300">
                      Include lift bookings, stairs, and loading-area details in your request.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-[#071933]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">Inventory Scoping:</strong>
                    <span className="text-xs text-slate-300">
                      List larger furniture, appliances, and boxed counts to help configure vehicle volume.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-[#071933]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">Flexible 2 or 3 Mover Crews:</strong>
                    <span className="text-xs text-slate-300">
                      Starting rates available for both 2 ($79/30 min) and 3 ($99/30 min) movers with a truck.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/services/house-removals"
                  className="rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-bold text-[#071933] transition-all hover:bg-orange-300 active:scale-[0.98]"
                >
                  House Removals
                </Link>
                <Link
                  href="/services/apartment-removals"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
                >
                  Apartment Removals
                </Link>
              </div>
            </div>

            {/* Right side: Office & Commercial Box with Liquid Glass */}
            <div className="rounded-[2.5rem] border border-white/15 bg-white/5 p-8 sm:p-10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] space-y-6 text-left">
              <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">
                Office & Commercial
              </span>
              <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
                Workplace Relocations
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Minimise business downtime with structured after-hours or weekend office transfers across metropolitan Adelaide.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                  <span>Scheduled weekend or evening dispatch to avoid operational disruptions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                  <span>Goods elevator protection curtains and loading dock clearances</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                  <span>Systematic workstation labelling and electronics handling</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/services/office-removals"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6A00] hover:text-white transition"
                >
                  <span>Explore Office & Commercial Moving</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST & TRANSPARENCY SECTION */}
      <TrustSection />

      {/* 7. FAQ ACCORDION SECTION (Anti-Center Layout) */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8 mb-12">
            <div className="text-left">
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Common Questions
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                Clear, transparent answers about booking, preparation, and moving rates in Adelaide.
              </p>
            </div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6A00] hover:text-[#E63900] transition active:scale-[0.98]"
            >
              <span>View All Questions & Answers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <FAQAccordion items={generalFaqs} />
        </div>
      </section>

      {/* 8. QUOTE FORM SECTION */}
      <section id="quote-section" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <QuoteForm sourcePage="Homepage Quote Block" />
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <CTASection />
    </div>
  );
}
