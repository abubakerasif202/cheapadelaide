import type { Metadata } from "next";
import { Phone, Clock, CheckCircle2 } from "lucide-react";
import { business } from "@/config/business";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { QuoteForm } from "@/components/common/QuoteForm";
import { constructMetadata } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Get a Free Moving Quote Adelaide | Cheap Adelaide Removalist",
  description:
    "Request an upfront, no-obligation moving quote for Adelaide house, apartment, office, or interstate relocations. Starting from $79 / 30 min.",
  canonical: "/get-a-quote",
});

interface QuotePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GetQuotePage({ searchParams }: QuotePageProps) {
  const resolvedParams = await searchParams;
  const teamParam = typeof resolvedParams.team === "string" ? resolvedParams.team : "";
  const serviceParam = typeof resolvedParams.service === "string" ? resolvedParams.service : "";

  let defaultTeam = "Not Sure";
  if (teamParam === "two-movers") defaultTeam = "2 Movers + Truck";
  if (teamParam === "three-movers") defaultTeam = "3 Movers + Truck";

  let defaultMoveType = "House";
  if (serviceParam.includes("apartment")) defaultMoveType = "Apartment";
  if (serviceParam.includes("office")) defaultMoveType = "Office";
  if (serviceParam.includes("commercial")) defaultMoveType = "Commercial";
  if (serviceParam.includes("furniture")) defaultMoveType = "Furniture";
  if (serviceParam.includes("interstate")) defaultMoveType = "Interstate";

  return (
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Get a Quote", href: "/get-a-quote" }]} />

          <div className="mt-4 max-w-3xl">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Free Moving Estimate
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
              Request Your Adelaide Moving Quote
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Tell us what you&apos;re moving, where from, and where to. We&apos;ll calculate the scope and recommend the most cost-effective team size for your job.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & BENEFIT HIGHLIGHTS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Form Left/Main */}
            <div className="lg:col-span-8">
              <QuoteForm
                defaultMoveType={defaultMoveType}
                defaultTeam={defaultTeam}
                sourcePage="Get A Quote Page"
              />
            </div>

            {/* Quick Details Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct Call Box */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                  Prefer to Talk?
                </span>
                <h3 className="text-xl font-bold text-[#0B2D5B]">
                  Direct Phone Enquiries
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Call our Adelaide dispatch team directly to check truck availability or discuss specialized access.
                </p>

                <div className="pt-2">
                  <a
                    href={business.contact.primaryPhoneHref}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2D5B] py-3.5 text-sm font-bold text-white hover:bg-[#071933] transition"
                  >
                    <Phone className="h-4 w-4 text-[#FF6A00]" />
                    <span>Call {business.contact.primaryPhone}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <Clock className="h-3.5 w-3.5 text-[#FF6A00]" />
                  <span>Open 7:00 am – 8:00 pm, 7 Days</span>
                </div>
              </div>

              {/* Rates Recap */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B2D5B]">
                  Starting Rates Reference
                </h4>
                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                  <div className="flex items-center justify-between font-bold text-[#0B2D5B]">
                    <span>2 Movers + Truck</span>
                    <span className="text-[#FF6A00]">From $79 / 30 min</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Hourly reference: $158/hr</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                  <div className="flex items-center justify-between font-bold text-[#0B2D5B]">
                    <span>3 Movers + Truck</span>
                    <span className="text-[#FF6A00]">From $99 / 30 min</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Hourly reference: $198/hr</span>
                </div>

                <p className="text-[11px] text-slate-500 leading-snug pt-1">
                  {business.pricing.disclaimer}
                </p>
              </div>

              {/* Moving Inclusions */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-2.5 text-xs text-slate-600">
                <h4 className="font-bold text-[#0B2D5B] text-sm mb-2">
                  All Moves Include:
                </h4>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0 mt-0.5" />
                  <span>Thick padded furniture blankets for all large items</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0 mt-0.5" />
                  <span>Heavy-duty webbing straps & internal truck tie-rails</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0 mt-0.5" />
                  <span>Professional dollies, upright trolleys & ramps</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0 mt-0.5" />
                  <span>Room-by-room unloading at your new address</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
