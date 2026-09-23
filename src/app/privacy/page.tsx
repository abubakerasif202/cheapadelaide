import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { constructMetadata } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Cheap Adelaide Removalist",
  description:
    "Privacy Policy for Cheap Adelaide Removalist. Information on how we collect, use, and protect your move enquiry details.",
  canonical: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Privacy Policy", href: "/privacy" }]} />
          <h1 className="mt-4 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl font-[family-name:var(--font-heading)]">
            Privacy Policy
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
              1. Introduction & Operator Notice
            </h2>
            <p>
              Cheap Adelaide Removalist respects your privacy. This Privacy Policy describes how we handle the personal information collected through our website (<Link href="/" className="text-[#FF6A00] underline">{business.domain}</Link>).
            </p>
            <p className="mt-2">
              {business.operatorNotice} Our operations depot is situated at {business.location.fullAddress}.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              2. Information We Collect
            </h2>
            <p>
              When you submit a quote request or contact us via our website, we may collect:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1.5 pl-2 text-slate-700">
              <li>Your name and contact details (phone number, email address)</li>
              <li>Pickup and delivery addresses or suburbs</li>
              <li>Property type, inventory scope, and approximate move dates</li>
              <li>Access notes such as stairs, elevator bookings, or heavy items</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              3. How We Use Your Information
            </h2>
            <p>
              Information you provide is used strictly for operational purposes:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1.5 pl-2 text-slate-700">
              <li>Preparing and communicating accurate moving quotes and scheduling</li>
              <li>Coordinating arrival times and team allocations with you</li>
              <li>Issuing invoices and service confirmations</li>
              <li>Responding to customer service enquiries and support requests</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to third-party marketing companies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              4. Third-Party Transmission & Form Services
            </h2>
            <p>
              Our online quote forms transmit form submission data securely using third-party email and notification infrastructure (such as Web3Forms) to deliver your enquiry directly to our dispatch team inbox. These providers process submission payloads strictly to relay the enquiry and do not use your information for independent purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2D5B] mb-3">
              5. Contact Us Regarding Your Privacy
            </h2>
            <p>
              If you have any questions about this Privacy Policy or wish to update or delete your contact details from our records, please reach out to:
            </p>
            <div className="mt-3 rounded-2xl bg-slate-50 p-5 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
              <p><strong>{business.name}</strong></p>
              <p>Email: <a href={`mailto:${business.contact.email}`} className="text-[#FF6A00] underline">{business.contact.email}</a></p>
              <p>Phone: <a href={business.contact.primaryPhoneHref} className="text-[#FF6A00] underline">{business.contact.primaryPhone}</a></p>
              <p>Address: {business.location.fullAddress}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
