import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { business } from "@/config/business";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { QuoteForm } from "@/components/common/QuoteForm";
import { constructMetadata } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us & Adelaide Depot | Cheap Adelaide Removalist",
  description:
    "Contact Cheap Adelaide Removalist. Phone 0491 704 136, email admin@hfremovalsadelaide.com.au, operations base at 20 Prunus Ave, Elizabeth Vale SA. Open 7 days.",
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Contact", href: "/contact" }]} />

          <div className="mt-4 max-w-3xl">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Direct Contact
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
              Get in Touch with Our Adelaide Team
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Have an enquiry about your upcoming move? Call our dispatch line directly, send an email, or fill out the online form below.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & DEPOT INFO */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Contact Cards Left */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                  Depot & Communication
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[#0B2D5B]">
                  Business & Dispatch Information
                </h2>
              </div>

              {/* Primary Phone */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6A00]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Primary Phone (Direct Line)
                  </span>
                  <p className="mt-1 text-xl font-bold text-[#0B2D5B]">
                    <a
                      href={business.contact.primaryPhoneHref}
                      className="hover:text-[#FF6A00] transition"
                    >
                      {business.contact.primaryPhone}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fast phone response for urgent bookings & enquiries
                  </p>
                </div>
              </div>

              {/* Secondary Phone */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#0B2D5B]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Secondary Phone
                  </span>
                  <p className="mt-1 text-xl font-bold text-[#0B2D5B]">
                    <a
                      href={business.contact.secondaryPhoneHref}
                      className="hover:text-[#FF6A00] transition"
                    >
                      {business.contact.secondaryPhone}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Alternative operational line
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6A00]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email Address
                  </span>
                  <p className="mt-1 text-base font-bold text-[#0B2D5B]">
                    <a
                      href={`mailto:${business.contact.email}`}
                      className="hover:text-[#FF6A00] transition break-all"
                    >
                      {business.contact.email}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Written quotes, commercial floor plans & invoicing
                  </p>
                </div>
              </div>

              {/* Operations Base Address */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#0B2D5B]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Operations Base
                  </span>
                  <p className="mt-1 text-base font-bold text-[#0B2D5B]">
                    {business.location.street}
                    <br />
                    {business.location.suburb} {business.location.state} {business.location.postcode}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fleet dispatch hub serving Greater Adelaide
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6A00]">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Public Operating Hours
                  </span>
                  <p className="mt-1 text-base font-bold text-[#0B2D5B]">
                    {business.hours}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monday to Sunday including public holidays by booking
                  </p>
                </div>
              </div>

              {/* Operator Notice Box */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#0B2D5B]">
                  <ShieldCheck className="h-4 w-4 text-[#FF6A00]" />
                  <span>Operator Notice</span>
                </div>
                <p className="leading-relaxed">
                  {business.operatorNotice}
                </p>
              </div>
            </div>

            {/* Quote Form Right */}
            <div className="lg:col-span-7">
              <QuoteForm sourcePage="Contact Page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
