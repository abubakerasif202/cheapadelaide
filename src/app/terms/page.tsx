import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { constructMetadata, generateBreadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service | Cheap Adelaide Removalist",
  description:
    "Terms of Service for Cheap Adelaide Removalist website, quoting procedures, booking scopes, and service terms.",
  canonical: "/terms",
});

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Terms of Service", item: "/terms" },
  ]);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Terms of Service", href: "/terms" }]} />
          <h1 className="mt-4 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: September 2026
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website of Cheap Adelaide Removalist (<Link href="/" className="text-[#A63F00] underline [overflow-wrap:anywhere]">{business.domain}</Link>) or submitting an online enquiry, you agree to comply with these terms.
            </p>
            <p className="mt-2">
              {business.operatorNotice}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              2. Nature of Quotes & Estimates
            </h2>
            <p>
              All rates and prices published on this website (such as 2 Movers from $79 / 30 min and 3 Movers from $99 / 30 min) represent starting base rates. Online estimates and telephone quotes are indicative assessments based on the information provided by the customer.
            </p>
            <p className="mt-2">
              {business.pricing.disclaimer} Final billable hours reflect actual loading time, transport time, and unloading time required to complete the move.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              3. Customer Responsibilities on Moving Day
            </h2>
            <p>
              To ensure safe and efficient service, customers are asked to:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1.5 pl-2 text-slate-700">
              <li>Ensure clear, legal parking access for the removal vehicle at both addresses</li>
              <li>Arrange building lift bookings and keys prior to the arrival of the team</li>
              <li>Box and securely seal loose personal items before movers commence loading (unless full packing has been booked)</li>
              <li>Inform our team of any unusually heavy items (e.g. pianos, pool tables, heavy safes) in advance</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              4. Service Availability
            </h2>
            <p>
              We operate 7 days a week between 7:00 am and 8:00 pm. Specific arrival time slots are agreed upon during the booking confirmation process and depend on traffic and previous job completions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              5. Operator Contact
            </h2>
            <p>
              For any questions regarding your booking, invoice, or these terms, please contact our team:
            </p>
            <div className="mt-3 rounded-2xl bg-slate-50 p-5 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
              <p><strong>{business.name}</strong></p>
              <p>Operations Base: {business.location.fullAddress}</p>
              <p>Primary Phone: <a href={business.contact.primaryPhoneHref} className="text-[#A63F00] underline">{business.contact.primaryPhone}</a></p>
              <p>Email: <a href={`mailto:${business.contact.email}`} className="text-[#A63F00] underline">{business.contact.email}</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
