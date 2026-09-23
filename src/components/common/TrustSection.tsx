import Link from "next/link";
import { Clock, MapPin, BadgeDollarSign, Phone, Mail } from "lucide-react";
import { business } from "@/config/business";

export function TrustSection() {
  const trustPoints = [
    {
      icon: BadgeDollarSign,
      title: "Published Starting Rates",
      description: "$79 / 30 min for 2 movers + truck, or $99 / 30 min for 3 movers + truck.",
    },
    {
      icon: MapPin,
      title: "Adelaide Address",
      description: business.location.fullAddress,
    },
    {
      icon: Phone,
      title: "Call Us Directly",
      description: business.contact.primaryPhone,
    },
    {
      icon: Mail,
      title: "Email",
      description: business.contact.email,
    },
    {
      icon: Clock,
      title: "Contact Hours",
      description: business.hours,
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
            Practical Details, Up Front
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Check the starting rates, contact details and listed hours, then share your move requirements for a quote.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
              className="scroll-reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#FF6A00]/40"
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
              Operated by a Local Removals Business
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
