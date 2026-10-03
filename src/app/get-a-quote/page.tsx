import type { Metadata } from "next";
import { Phone, Clock, CheckCircle2 } from "lucide-react";
import { business, googleReviewSummary } from "@/config/business";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { QuoteForm } from "@/components/common/QuoteForm";
import { constructMetadata, generateBreadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Get an Adelaide Removalist Quote | Cheap Adelaide Removalist",
  description:
    `Request an Adelaide removalist quote for a house, apartment, office, furniture or interstate move. Published team rates start from $${business.pricing.twoMovers.thirtyMinutes} per 30 minutes.`,
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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Get a Quote", item: "/get-a-quote" },
  ]);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 1. HERO */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-4 sm:py-6 lg:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Get a Quote", href: "/get-a-quote" }]} />

          <div className="mt-4 max-w-3xl">
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
              Request Your Adelaide Moving Quote
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Share your pickup and delivery suburbs, inventory and access details.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & BENEFIT HIGHLIGHTS */}
      <section className="py-6 sm:py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Form Left/Main */}
            <div className="lg:col-span-8">
              <QuoteForm
                defaultMoveType={defaultMoveType}
                defaultTeam={defaultTeam}
                sourcePage="Get A Quote Page"
                headingLevel="h2"
              />
            </div>

            {/* Quick Details Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Rates Recap */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <p className="text-sm font-bold uppercase tracking-wider text-[#0B2D5B]">
                  Starting Rates Reference
                </p>
                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                  <div className="flex items-center justify-between font-bold text-[#0B2D5B]">
                    <span>2 Movers + Truck</span>
                    <span className="text-[#A63F00]">From ${business.pricing.twoMovers.thirtyMinutes} / 30 min</span>
                  </div>
                  <span className="text-xs text-slate-500">Hourly reference: ${business.pricing.twoMovers.hourlyReference}/hr</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                  <div className="flex items-center justify-between font-bold text-[#0B2D5B]">
                    <span>3 Movers + Truck</span>
                    <span className="text-[#A63F00]">From ${business.pricing.threeMovers.thirtyMinutes} / 30 min</span>
                  </div>
                  <span className="text-xs text-slate-500">Hourly reference: ${business.pricing.threeMovers.hourlyReference}/hr</span>
                </div>

                <p className="text-[13px] text-slate-500 leading-snug pt-1">
                  {business.pricing.disclaimer}
                </p>
              </div>

              {/* Moving Inclusions */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-2.5 text-xs text-slate-600">
                <p className="font-bold text-[#0B2D5B] text-sm mb-2">
                  Before You Submit:
                </p>
                <p className="font-semibold text-[#0B2D5B]">{googleReviewSummary}</p>
                <div className="flex items-start gap-2">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#A63F00] shrink-0 mt-0.5" />
                  <span>Include pickup and delivery suburbs</span>
                </div>
                <div className="flex items-start gap-2">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#A63F00] shrink-0 mt-0.5" />
                  <span>List the main furniture and larger items</span>
                </div>
                <div className="flex items-start gap-2">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#A63F00] shrink-0 mt-0.5" />
                  <span>Note stairs, lifts, parking or other access details</span>
                </div>
                <div className="flex items-start gap-2">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#A63F00] shrink-0 mt-0.5" />
                  <span>Tell us about any additional services you need</span>
                </div>
              </div>

              {/* Direct Call Box */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A63F00]">
                  Prefer to Talk?
                </span>
                <h3 className="text-xl font-bold text-[#0B2D5B]">
                  Direct Phone Enquiries
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Call us during our listed hours to discuss availability or access requirements.
                </p>

                <div className="pt-2">
                  <a
                    href={business.contact.primaryPhoneHref}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0B2D5B] underline underline-offset-4"
                  >
                    <Phone className="h-4 w-4 text-[#FF6A00]" />
                    <span>Call {business.contact.primaryPhone}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <Clock className="h-3.5 w-3.5 text-[#FF6A00]" />
                  <span>Open {business.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
