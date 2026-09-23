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
import { adelaideRegions } from "@/data/areas";
import { PricingCards } from "@/components/common/PricingCards";
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
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#071933] py-10 text-white sm:py-14 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(115deg,transparent_62%,#FF6A00_62.1%,transparent_62.5%),linear-gradient(115deg,transparent_67%,#fff_67.1%,transparent_67.2%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Hero Copy & Actions */}
            <div className="reveal relative z-10 space-y-5 text-center lg:col-span-7 lg:text-left lg:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-200">
                <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
                <span>Adelaide Removalists</span>
              </div>

              <h1 className="reveal reveal-delay-1 text-[2.1rem] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] leading-[1.04]">
                Affordable Adelaide Removalists{" "}
                <span className="text-[#FF6A00] block mt-1">
                  Without the Runaround.
                </span>
              </h1>

              <p className="reveal reveal-delay-2 mx-auto max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg lg:mx-0">
                Straightforward moving services for homes, apartments, offices and furniture moves across Adelaide. Tell us what you&apos;re moving and we&apos;ll help scope the right team for the job.
              </p>

              {/* Action Buttons */}
              <div className="reveal reveal-delay-3 flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
                <Link
                  href="/get-a-quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-7 py-4 text-base font-extrabold text-[#071933] shadow-xl shadow-orange-500/25 transition hover:bg-orange-300 active:scale-[0.98]"
                >
                  <span>Get My Free Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <a
                  href={business.contact.primaryPhoneHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/40 bg-white/5 px-7 py-4 text-base font-bold text-white transition hover:bg-white/10 active:scale-[0.98]"
                >
                  <Phone className="h-5 w-5 text-[#FF6A00]" />
                  <span>Call {business.contact.primaryPhone}</span>
                </a>
              </div>

              {/* Quick Pricing Badge Strip */}
              <div className="mt-7 border-t border-white/20 pt-6">
                <div className="grid grid-cols-2 gap-2 text-left sm:gap-3">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2.5 sm:gap-3 sm:p-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FF6A00] text-xs font-bold text-[#071933] sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm">
                      2P
                    </div>
                    <div>
                      <div className="text-[11px] font-bold leading-tight text-white sm:text-xs">
                        2 Movers + Truck
                      </div>
                      <div className="text-[10px] leading-tight text-slate-200 sm:text-xs">
                        From <strong className="text-orange-300">$79</strong> / 30 min{" "}
                        <span className="text-slate-300">($158/hr)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2.5 sm:gap-3 sm:p-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FF6A00] text-xs font-bold text-[#071933] sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm">
                      3P
                    </div>
                    <div>
                      <div className="text-[11px] font-bold leading-tight text-white sm:text-xs">
                        3 Movers + Truck
                      </div>
                      <div className="text-[10px] leading-tight text-slate-200 sm:text-xs">
                        From <strong className="text-orange-300">$99</strong> / 30 min{" "}
                        <span className="text-slate-300">($198/hr)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-slate-300 text-center lg:text-left">
                  {business.pricing.disclaimer}
                </p>
              </div>
            </div>

            {/* Right Column: Concept 4 Visual Composition */}
            <div className="reveal reveal-delay-2 relative lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#0B2D5B]/10 to-[#FF6A00]/15 blur-2xl" />

                {/* Branded Truck Visual Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl shadow-black/30">
                  <div className="relative aspect-[16/11] w-full bg-slate-900">
                    <Image
                      src="/brand/hero-truck.webp"
                        alt="Concept 4 branded removal truck on an Adelaide road"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071933]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold tracking-wide flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#FF6A00]" />
                        Adelaide Metro & Regional SA
                      </span>
                      <span className="rounded-full bg-[#FF6A00] px-2.5 py-0.5 font-bold text-[10px] uppercase text-[#071933]">
                        Adelaide
                      </span>
                    </div>
                  </div>

                  {/* Trust Highlights Under Card */}
                  <div className="space-y-3 bg-white p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0" />
                      <span>{business.location.fullAddress}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0" />
                      <span>{business.hours}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0" />
                      <span>Call or send a quote request to discuss your move</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Verified Services
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
                Our Adelaide Removals Services
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                House, apartment, furniture, office, commercial, packing and interstate moving services.
              </p>
            </div>
            <Link
              href="/services"
              className="contrast-safe-accent inline-flex items-center gap-2 text-sm font-bold text-[#FF6A00] hover:text-[#A63F00] transition"
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
                  className="scroll-reveal group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#FF6A00]/50 hover:shadow-lg"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6A00] transition group-hover:bg-[#FF6A00] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-[#0B2D5B] group-hover:text-[#FF6A00] transition-colors">
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

      {/* 3. TRANSPARENT PRICING SECTION */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Upfront Starting Rates
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              Straightforward Moving Rates
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Compare the two starting rates and share your move details to discuss the final price.
            </p>
          </div>

          <div className="mt-12">
            <PricingCards />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2D5B] hover:text-[#FF6A00] transition"
            >
              <span>Learn what factors affect your moving quote in detail</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. MOVING PROCESS TIMELINE */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Clear Workflow
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              How Moving Works With Us
            </h2>
            <p className="mt-3 text-base text-slate-600">
              A clear sequence from your first enquiry through to moving day.
            </p>
          </div>

          <div className="mt-12">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* 5. RESIDENTIAL & APARTMENT FEATURE SECTION (NAVY ACCENT) */}
      <section className="relative overflow-hidden bg-[#071933] py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">
                Residential Moves
              </span>
              <h2 className="text-3xl font-extrabold sm:text-4xl font-[family-name:var(--font-heading)] leading-tight">
                Homes & Apartments Moved With Real Care Across Adelaide
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Moving from a house or apartment? Share your pickup and delivery details, inventory and any building access requirements when you request a quote.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-[#071933]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">Building Access:</strong>
                    <span className="text-xs text-slate-300">
                      Include lift bookings, stairs and loading-area details in your request.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-[#071933]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">Move Details:</strong>
                    <span className="text-xs text-slate-300">
                      List larger furniture, appliances and boxes to help describe your inventory.
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
                      Starting rates are available for both 2 and 3 movers with a truck.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/services/house-removals"
                  className="rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-bold text-[#071933] transition hover:bg-orange-300"
                >
                  House Removals
                </Link>
                <Link
                  href="/services/apartment-removals"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  Apartment Removals
                </Link>
              </div>
            </div>

            {/* Right side: Office & Commercial Box */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm space-y-6">
              <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">
                Office & Commercial
              </span>
              <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
                Office & Commercial Relocations
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Share the items, locations, access details and preferred timing for an office or commercial move.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                  <span>Ask about your preferred moving date and time</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                  <span>Include floor, lift and loading-area information</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                  <span>Describe workstations, furniture and other items to move</span>
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

      {/* 7. ADELAIDE SERVICE COVERAGE */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Local Operations
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              Removalists Across Greater Adelaide
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Based in Elizabeth Vale, Adelaide. Contact us with your pickup and delivery suburbs to discuss service availability.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adelaideRegions.map((region) => (
              <div
                key={region.id}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 transition hover:border-[#FF6A00]/40 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center gap-2 font-bold text-base text-[#0B2D5B]">
                  <MapPin className="h-4 w-4 text-[#FF6A00]" />
                  <span>{region.name}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {region.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Key Areas Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {region.keyHubs.map((hub) => (
                      <span
                        key={hub}
                        className="rounded-md bg-white px-2 py-0.5 text-xs text-slate-700 border border-slate-200"
                      >
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0B2D5B] px-6 py-3 text-sm font-bold text-[#0B2D5B] hover:bg-[#0B2D5B] hover:text-white transition"
            >
              <span>View All Service Areas & Interstate Routes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Common Questions
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Clear, transparent answers about booking, preparation, and moving rates in Adelaide.
            </p>
          </div>

          <FAQAccordion items={generalFaqs} />

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="contrast-safe-accent inline-flex items-center gap-2 text-sm font-bold text-[#FF6A00] hover:text-[#A63F00] transition"
            >
              <span>View All Moving Questions & Answers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. QUOTE FORM SECTION */}
      <section id="quote-section" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <QuoteForm sourcePage="Homepage Quote Block" />
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <CTASection />
    </div>
  );
}
