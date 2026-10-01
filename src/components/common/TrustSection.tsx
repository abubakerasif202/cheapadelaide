import { business } from "@/config/business";
import { SectionHeader } from "@/components/core";
import { TrustCard } from "@/components/marketing";

const trustPoints = [
  { icon: "badge-dollar-sign", title: "Published Starting Rates", description: `${business.pricing.twoMovers.name}: $${business.pricing.twoMovers.thirtyMinutes} / 30 min; ${business.pricing.threeMovers.name}: $${business.pricing.threeMovers.thirtyMinutes} / 30 min.` },
  { icon: "map-pin", title: "Adelaide Address", description: business.location.fullAddress },
  { icon: "phone", title: "Call Us Directly", description: business.contact.primaryPhone },
  { icon: "mail", title: "Email", description: business.contact.email },
  { icon: "clock", title: "Contact Hours", description: business.hours },
];

export function TrustSection() {
  return (
    <section className="ca-section ca-section--subtle">
      <div className="ca-container">
        <SectionHeader
          align="center"
          eyebrow="Transparent Service"
          title="Practical Details, Up Front"
          description="Check the starting rates, contact details and listed hours, then share your move requirements for a quote."
          divider={false}
        />
        <div className="ca-grid ca-grid--3" style={{ marginTop: 48 }}>
          {trustPoints.map((point) => (
            <TrustCard key={point.title} icon={point.icon} title={point.title} description={point.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
