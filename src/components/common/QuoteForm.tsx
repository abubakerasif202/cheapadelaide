"use client";

import { useRef, useState } from "react";
import { business } from "@/config/business";
import { Icon, Button } from "@/components/core";
import { TextField, SelectField, ChoiceCard } from "@/components/forms";
import { Alert } from "@/components/feedback";

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

  const moveTypeOptions = ["House", "Apartment", "Office", "Commercial", "Furniture", "Interstate", "Other"];

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

  const additionalServiceOptions = ["Packing", "Unpacking", "Backloading", "Other"];

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
      <div role="status" aria-live="polite" className="ca-success">
        <div className="ca-success__icon">
          <Icon name="check-circle-2" size={32} />
        </div>
        <h3 className="ca-h3" style={{ marginTop: 4 }}>
          Thank You, {formData.fullName}!
        </h3>
        <p className="ca-small" style={{ maxWidth: 420 }}>
          Your online request was received for a move from <strong style={{ color: "var(--navy-900)" }}>{formData.movingFrom}</strong> to{" "}
          <strong style={{ color: "var(--navy-900)" }}>{formData.movingTo}</strong>. For direct contact, call us during our listed business hours.
        </p>
        <div className="ca-card ca-card--flat ca-card--compact" style={{ maxWidth: 420, textAlign: "left" }}>
          <p style={{ fontWeight: 700, color: "var(--navy-900)" }}>Need immediate confirmation?</p>
          <p className="ca-small" style={{ marginTop: 4 }}>
            Call dispatch directly on{" "}
            <a href={business.contact.primaryPhoneHref} style={{ fontWeight: 700, color: "var(--orange-600)" }}>
              {business.contact.primaryPhone}
            </a>{" "}
            (7:00 am – 8:00 pm Daily).
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ca-form">
      <div className="ca-form__head">
        <span className="ca-badge ca-badge--accent">Quote Request</span>
        <h3 className="ca-h2" style={{ fontSize: "var(--fs-h3)" }}>
          Tell Us About Your Move
        </h3>
        <p className="ca-small">
          Fields marked with <span style={{ color: "var(--orange-600)", fontWeight: 700 }}>*</span> are required. Submission is handled by our
          online form provider; see our privacy policy for details.
        </p>
      </div>

      {/* Honeypot field (hidden from users) */}
      <input
        type="checkbox"
        name="botcheck"
        aria-hidden="true"
        style={{ display: "none" }}
        checked={!!formData.botcheck}
        onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked ? "bot" : "" })}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="ca-form__body">
        <div className="ca-form__row">
          <TextField
            label="Full Name"
            id="fullName"
            required
            autoComplete="name"
            placeholder="e.g. Sarah Jenkins"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <TextField
            label="Phone Number"
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="e.g. 0400 000 000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <TextField
          label="Email Address"
          id="email"
          type="email"
          optionalNote="optional for written quote"
          autoComplete="email"
          placeholder="e.g. sarah.j@outlook.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <div className="ca-form__row">
          <TextField
            label="Moving From (Suburb)"
            id="movingFrom"
            required
            placeholder="e.g. Norwood SA or Adelaide CBD"
            value={formData.movingFrom}
            onChange={(e) => setFormData({ ...formData, movingFrom: e.target.value })}
          />
          <TextField
            label="Moving To (Suburb)"
            id="movingTo"
            required
            placeholder="e.g. Glenelg SA or Melbourne VIC"
            value={formData.movingTo}
            onChange={(e) => setFormData({ ...formData, movingTo: e.target.value })}
          />
        </div>

        <div className="ca-form__row">
          <TextField
            label="Approximate Move Date"
            id="moveDate"
            type="date"
            value={formData.moveDate}
            onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
          />
          <SelectField
            label="Move Type"
            id="moveType"
            options={moveTypeOptions}
            value={formData.moveType}
            onChange={(e) => setFormData({ ...formData, moveType: e.target.value })}
          />
        </div>

        <SelectField
          label="Property Size / Inventory Scope"
          id="propertySize"
          options={propertySizeOptions}
          value={formData.propertySize}
          onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
        />

        <fieldset>
          <legend className="ca-label ca-form__legend">Preferred Team Option</legend>
          <div className="ca-form__stack">
            {teamOptions.map((opt) => (
              <ChoiceCard
                key={opt.value}
                type="radio"
                name="preferredTeam"
                value={opt.value}
                label={opt.label}
                checked={formData.preferredTeam === opt.value}
                onChange={(e) => setFormData({ ...formData, preferredTeam: e.target.value })}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="ca-label ca-form__legend">Additional Services Required</legend>
          <div className="ca-form__choices ca-form__choices--4">
            {additionalServiceOptions.map((service) => (
              <ChoiceCard
                key={service}
                type="checkbox"
                name="additionalServices"
                value={service}
                label={service}
                checked={formData.additionalServices.includes(service)}
                onChange={() => handleCheckboxChange(service)}
              />
            ))}
          </div>
        </fieldset>

        <TextField
          label="Property Access & Lift Conditions"
          id="accessDetails"
          placeholder="e.g. Ground floor at pickup, 2nd floor with lift booked at delivery, long driveway"
          value={formData.accessDetails}
          onChange={(e) => setFormData({ ...formData, accessDetails: e.target.value })}
        />

        <TextField
          label="Additional Inventory Notes or Questions"
          id="message"
          multiline
          rows={3}
          placeholder="List any oversized items (piano, heavy marble table, large sectional) or special instructions..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      {/* Unconfigured Web3Forms Notice */}
      {status === "unconfigured" && (
        <div style={{ marginTop: 20 }}>
          <Alert type="warning" title="Online web form is currently in direct dispatch mode.">
            <span>Connect with our local Adelaide moving coordinators immediately using either option below:</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
              <Button href={business.contact.primaryPhoneHref} variant="secondary" size="sm" leadingIcon="phone">
                Call Dispatch ({business.contact.primaryPhone})
              </Button>
              <Button
                href={`mailto:${business.contact.email}?subject=${encodeURIComponent(
                  `Moving Quote Request: ${formData.fullName || "Adelaide Move"} (${formData.moveType})`
                )}&body=${encodeURIComponent(
                  `Hi Cheap Adelaide Removalist Team,\n\nI would like a quote for my upcoming move:\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nFrom: ${formData.movingFrom}\nTo: ${formData.movingTo}\nDate: ${formData.moveDate}\nMove Type: ${formData.moveType}\nProperty Size: ${formData.propertySize}\nPreferred Team: ${formData.preferredTeam}\nAccess / Lift Notes: ${formData.accessDetails}\nAdditional Services: ${formData.additionalServices.join(", ") || "None"}\nInventory / Notes: ${formData.message}\n\nThank you!`
                )}`}
                variant="outline"
                size="sm"
                leadingIcon="mail"
              >
                Email Pre-Filled Details
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div style={{ marginTop: 20 }}>
          <Alert type="error">
            <span>{errorMessage}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
              <Button href={business.contact.primaryPhoneHref} variant="secondary" size="sm" leadingIcon="phone">
                Call {business.contact.primaryPhone}
              </Button>
              <Button
                href={`mailto:${business.contact.email}?subject=${encodeURIComponent(
                  `Moving Quote Request: ${formData.fullName || "Adelaide Move"}`
                )}&body=${encodeURIComponent(
                  `From: ${formData.movingFrom}\nTo: ${formData.movingTo}\nPhone: ${formData.phone}\nNotes: ${formData.message}`
                )}`}
                variant="outline"
                size="sm"
                leadingIcon="mail"
              >
                Email Move Details
              </Button>
            </div>
          </Alert>
        </div>
      )}

      <div className="ca-form__foot">
        <p className="ca-small">
          Direct telephone enquiries:{" "}
          <a href={business.contact.primaryPhoneHref} style={{ fontWeight: 700, color: "var(--navy-900)" }}>
            {business.contact.primaryPhone}
          </a>
        </p>

        <Button type="submit" size="lg" loading={status === "loading"} trailingIcon={status === "loading" ? undefined : "send"}>
          {status === "loading" ? "Sending Details..." : "Submit Quote Request"}
        </Button>
      </div>
    </form>
  );
}
