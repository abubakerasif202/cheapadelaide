import Link from "next/link";
import { ShieldCheck, Clock, MapPin, BadgeDollarSign, Truck, Phone } from "lucide-react";
import { business } from "@/config/business";

export function TrustSection() {
  const trustPoints = [
    {
      icon: BadgeDollarSign,
      title: "Transparent Starting Rates",
      description:
        "No hidden tiers. Clear starting rates of $79 / 30 min (2 movers) and $99 / 30 min (3 movers) with 30-minute billing intervals.",
    },
    {
      icon: MapPin,
      title: "Verified Adelaide Operations Base",
      description:
        `Dispatching daily from ${business.location.street}, ${business.location.suburb} SA ${business.location.postcode} across Greater Adelaide and regional SA.`,
    },
    {
      icon: Phone,
      title: "Direct Phone Contact",
      description:
        `Speak directly to our local coordinators at ${business.contact.primaryPhone}. Fast responses, honest scheduling, and zero runaround.`,
    },
    {
      icon: Truck,
      title: "Equipped Moving Trucks",
      description:
        "Our vehicles carry heavy-duty furniture blankets, tie-down webbing, upright hand trucks, and furniture dollies on every run.",
    },
    {
      icon: Clock,
      title: "7 Days • 7:00 am – 8:00 pm",
      description:
        "Flexible weekend, early morning, and end-of-lease move windows designed to match real tenancy handovers and work schedules.",
    },
    {
      icon: ShieldCheck,
      title: "Careful Two-Person Handling",
      description:
        "Heavy items are lifted using proper techniques to prevent strain and protect timber floors, walls, and door frames.",
    },
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
            Transparent Service
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
            Why Adelaide Chooses Our Moving Teams
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We focus on genuine, supportable service fundamentals: clear rates, punctual arrivals, careful furniture protection, and direct local communication.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#FF6A00]/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#FF6A00]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#0B2D5B]">
                  {point.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Operational statement callout */}
        <div className="mt-10 rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-[#0B2D5B]">
              Part of an Established Local Adelaide Removals Operation
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              {business.operatorNotice}
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 rounded-xl border-2 border-[#0B2D5B] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0B2D5B] hover:bg-[#0B2D5B] hover:text-white transition"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
