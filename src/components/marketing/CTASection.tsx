import { business, googleReviewSummary } from "@/config/business";
import { Icon, Button } from "@/components/core";

export interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: [string, string][];
}

export function CTASection({
  eyebrow = "Adelaide Moves Further Together",
  title = "Tell Us What You're Moving & Get a Clear Price Estimate",
  subtitle = "Call us during our listed hours or send your move details through the online quote form.",
  features = [
    ["star", googleReviewSummary],
    ["clock", `Open ${business.hours}`],
    ["shield-check", `${business.pricing.twoMovers.name} from $${business.pricing.twoMovers.thirtyMinutes} / 30 min`],
    ["shield-check", `${business.pricing.threeMovers.name} from $${business.pricing.threeMovers.thirtyMinutes} / 30 min`],
  ],
}: CTASectionProps) {
  return (
    <section className="ca-cta ca-on-dark">
      <div className="ca-container">
        <div className="ca-cta__inner">
          <span className="ca-eyebrow ca-eyebrow--rule" style={{ color: "var(--orange-300)" }}>
            {eyebrow}
          </span>
          <h2 className="ca-h1">{title}</h2>
          <p className="ca-lead" style={{ maxWidth: 640 }}>
            {subtitle}
          </p>
          <div className="ca-cta__features">
            {features.map(([icon, text]) => (
              <span key={text}>
                <Icon name={icon} size={16} />
                {text}
              </span>
            ))}
          </div>
          <div className="ca-cta__actions">
            <Button size="lg" href="/get-a-quote" trailingIcon="arrow-right">
              Request a Moving Quote
            </Button>
            <Button size="lg" variant="inverse" href={business.contact.primaryPhoneHref} leadingIcon="phone">
              Call {business.contact.primaryPhone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
