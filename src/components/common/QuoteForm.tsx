"use client";

import { useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { business } from "@/config/business";

interface QuoteFormProps {
  defaultMoveType?: string;
  defaultTeam?: string;
  sourcePage?: string;
}

export function QuoteForm({
  defaultMoveType = "House",
  defaultTeam = "Not Sure",
  sourcePage = "Quote Page",
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    movingFrom: "",
    movingTo: "",
    moveDate: "",
    moveType: defaultMoveType,
    propertySize: "2 Bedrooms",
    preferredTeam: defaultTeam,
    additionalServices: [] as string[],
    accessDetails: "",
    message: "",
    botcheck: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "unconfigured">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);

  const moveTypeOptions = [
    "House",
    "Apartment",
    "Office",
    "Commercial",
    "Furniture",
    "Interstate",
    "Other",
  ];

  const propertySizeOptions = [
    "1 Bedroom / Studio",
    "2 Bedrooms",
    "3 Bedrooms",
    "4+ Bedrooms",
    "Small Commercial / Office",
    "Large Commercial / Multi-Office",
    "Single / Few Furniture Items",
  ];

  const teamOptions = [
    { label: "2 Movers + Truck — from $79 / 30 min ($158/hr)", value: "2 Movers + Truck" },
    { label: "3 Movers + Truck — from $99 / 30 min ($198/hr)", value: "3 Movers + Truck" },
    { label: "Not Sure — Advise Me on Best Option", value: "Not Sure" },
  ];

  const additionalServiceOptions = [
    "Packing",
    "Unpacking",
    "Backloading",
    "Other",
  ];

  const handleCheckboxChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter((s) => s !== service)
        : [...prev.additionalServices, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    // Basic Validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.movingFrom.trim() || !formData.movingTo.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields (Name, Phone, Moving From, Moving To).");
      return;
    }

    // Bot honeypot check
    if (formData.botcheck) {
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // Graceful unconfigured handling
    if (!accessKey || accessKey.trim() === "") {
      setStatus("unconfigured");
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Moving Quote Enquiry: ${formData.fullName} (${formData.moveType})`,
          from_name: business.name,
          website: business.name,
          lead_type: "Moving Quote Request",
          submission_source: sourcePage,
          ...formData,
          botcheck: formData.botcheck || false,
          additionalServices: formData.additionalServices.join(", ") || "None",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Submission failed. Please call us directly on 0491 704 136.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error sending quote. Please call us directly on 0491 704 136.");
    } finally {
      submittingRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-[#0B2D5B]">
          Thank You, {formData.fullName}!
        </h3>
        <p className="mt-2 text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
          Your online request was received for a move from <strong className="text-slate-900">{formData.movingFrom}</strong> to <strong className="text-slate-900">{formData.movingTo}</strong>. For direct contact, call us during our listed business hours.
        </p>
        <div className="mt-6 rounded-2xl bg-white p-4 text-xs text-slate-600 max-w-md mx-auto border border-emerald-100 space-y-1">
          <p className="font-semibold text-[#0B2D5B]">Need immediate confirmation?</p>
          <p>
            Call dispatch directly on{" "}
            <a
              href={business.contact.primaryPhoneHref}
              className="font-bold text-[#FF6A00] hover:underline"
            >
              {business.contact.primaryPhone}
            </a>{" "}
            (7:00 am – 8:00 pm Daily).
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg">
      <div className="border-b border-slate-100 pb-5">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#FF6A00]">
          Quote Request
        </span>
        <h3 className="mt-2 text-2xl font-bold text-[#0B2D5B] sm:text-3xl font-[family-name:var(--font-heading)]">
          Tell Us About Your Move
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Fields marked with <span className="text-[#FF6A00] font-bold">*</span> are required. Submission is handled by our online form provider; see our privacy policy for details.
        </p>
      </div>

      {/* Honeypot field (hidden from users) */}
      <input
        type="checkbox"
        name="botcheck"
        aria-hidden="true"
        style={{ display: "none" }}
        value={formData.botcheck}
        checked={!!formData.botcheck}
        onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked ? "bot" : "" })}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mt-6 space-y-6">
        {/* Contact details row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Full Name <span className="text-[#FF6A00]">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              required
              autoComplete="name"
              placeholder="e.g. Sarah Jenkins"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Phone Number <span className="text-[#FF6A00]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              required
              autoComplete="tel"
              placeholder="e.g. 0400 000 000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Email Address <span className="text-slate-500 font-normal lowercase">(optional for written quote)</span>
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="e.g. sarah.j@outlook.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
          />
        </div>

        {/* Suburbs row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="movingFrom" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Moving From (Suburb) <span className="text-[#FF6A00]">*</span>
            </label>
            <input
              type="text"
              id="movingFrom"
              required
              placeholder="e.g. Norwood SA or Adelaide CBD"
              value={formData.movingFrom}
              onChange={(e) => setFormData({ ...formData, movingFrom: e.target.value })}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
            />
          </div>

          <div>
            <label htmlFor="movingTo" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Moving To (Suburb) <span className="text-[#FF6A00]">*</span>
            </label>
            <input
              type="text"
              id="movingTo"
              required
              placeholder="e.g. Glenelg SA or Melbourne VIC"
              value={formData.movingTo}
              onChange={(e) => setFormData({ ...formData, movingTo: e.target.value })}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
            />
          </div>
        </div>

        {/* Date and Move Type */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="moveDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Approximate Move Date
            </label>
            <input
              type="date"
              id="moveDate"
              value={formData.moveDate}
              onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
            />
          </div>

          <div>
            <label htmlFor="moveType" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Move Type
            </label>
            <select
              id="moveType"
              value={formData.moveType}
              onChange={(e) => setFormData({ ...formData, moveType: e.target.value })}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 bg-white focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
            >
              {moveTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Size */}
        <div>
          <label htmlFor="propertySize" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Property Size / Inventory Scope
          </label>
          <select
            id="propertySize"
            value={formData.propertySize}
            onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
            className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 bg-white focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
          >
            {propertySizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Team */}
        <fieldset>
          <legend className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Preferred Team Option
          </legend>
          <div className="space-y-2">
            {teamOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 rounded-xl border p-3.5 text-xs sm:text-sm cursor-pointer transition ${
                  formData.preferredTeam === opt.value
                    ? "border-[#FF6A00] bg-orange-50/40 text-[#0B2D5B] font-semibold"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="preferredTeam"
                  value={opt.value}
                  checked={formData.preferredTeam === opt.value}
                  onChange={(e) => setFormData({ ...formData, preferredTeam: e.target.value })}
                  className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF6A00]"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Additional Services */}
        <fieldset>
          <legend className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Additional Services Required
          </legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {additionalServiceOptions.map((service) => (
              <label
                key={service}
                className={`flex items-center gap-2 rounded-xl border p-3 text-xs sm:text-sm cursor-pointer transition ${
                  formData.additionalServices.includes(service)
                    ? "border-[#FF6A00] bg-orange-50/40 text-[#0B2D5B] font-semibold"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.additionalServices.includes(service)}
                  onChange={() => handleCheckboxChange(service)}
                  className="rounded text-[#FF6A00] focus:ring-[#FF6A00]"
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Access Details */}
        <div>
          <label htmlFor="accessDetails" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Property Access & Lift Conditions
          </label>
          <input
            type="text"
            id="accessDetails"
            placeholder="e.g. Ground floor at pickup, 2nd floor with lift booked at delivery, long driveway"
            value={formData.accessDetails}
            onChange={(e) => setFormData({ ...formData, accessDetails: e.target.value })}
            className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
          />
        </div>

        {/* Message / Item List */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Additional Inventory Notes or Questions
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="List any oversized items (piano, heavy marble table, large sectional) or special instructions..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
          />
        </div>
      </div>

      {/* Unconfigured Web3Forms Notice */}
      {status === "unconfigured" && (
        <div role="status" aria-live="polite" className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Online quote submission is not configured right now.</p>
              <p className="mt-1 text-slate-700">
                Please call{" "}
                <a href={business.contact.primaryPhoneHref} className="font-bold text-[#A63F00] underline">
                  {business.contact.primaryPhone}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${business.contact.email}`} className="font-bold text-[#A63F00] underline">
                  {business.contact.email}
                </a>{" "}
                during our listed hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div role="alert" aria-live="assertive" className="mt-6 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 text-center sm:text-left">
          Direct telephone enquiries:{" "}
          <a
            href={business.contact.primaryPhoneHref}
            className="font-bold text-[#0B2D5B] hover:text-[#FF6A00]"
          >
            {business.contact.primaryPhone}
          </a>
        </p>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-8 py-3.5 text-sm font-bold text-[#071933] shadow-lg shadow-orange-500/20 transition hover:bg-orange-300 active:scale-[0.98] disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending Details...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Quote Request</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
