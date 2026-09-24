import { business } from "@/config/business";
import { Button } from "@/components/core";
import { RateChip } from "@/components/pricing";

export interface QuoteAsideProps {
  eyebrow?: string;
  title?: string;
  text?: string;
}

export function QuoteAside({
  eyebrow = "Instant Moving Estimate",
  title = "Book Adelaide Movers Today",
  text = "Transparent 30-minute rates with zero hidden stair surcharges. Share your move details to discuss an estimate.",
}: QuoteAsideProps) {
  return (
    <div className="ca-tile ca-tile--navy ca-on-dark" style={{ padding: 28, borderRadius: "var(--radius-tile)", gap: 0 }}>
      <span className="ca-eyebrow">{eyebrow}</span>
      <h3 className="ca-h3" style={{ marginTop: 8, fontSize: 20 }}>
        {title}
      </h3>
      <p className="ca-small" style={{ marginTop: 8 }}>
        {text}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
        <RateChip code="2P" name="2 Movers + Truck" rate={business.pricing.twoMovers.thirtyMinutes} hourly={business.pricing.twoMovers.hourlyReference} inverse />
        <RateChip code="3P" name="3 Movers + Truck" rate={business.pricing.threeMovers.thirtyMinutes} hourly={business.pricing.threeMovers.hourlyReference} inverse />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
        <Button href="/get-a-quote" block trailingIcon="arrow-right">
          Request a Free Quote
        </Button>
        <Button href={business.contact.primaryPhoneHref} variant="inverse" block leadingIcon="phone">
          Call {business.contact.primaryPhone}
        </Button>
      </div>
    </div>
  );
}
