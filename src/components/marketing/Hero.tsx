import Image from "next/image";
import { business } from "@/config/business";
import { Icon, Badge, Button } from "@/components/core";
import { RateChip } from "@/components/pricing";

export interface HeroProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
  facts?: string[];
  illustrative?: boolean;
  showRates?: boolean;
}

export function Hero({
  eyebrow = "Adelaide Specialist Removals • Open Daily",
  title = "Affordable Adelaide Removalists",
  highlight = "Without the Runaround.",
  description = "Straightforward moving services for homes, apartments, offices, and furniture across Greater Adelaide. Starting rates are listed for both mover-and-truck options.",
  imageSrc = "/brand/hero-truck.webp",
  imageAlt = "Cheap Adelaide Removalist truck in an Adelaide city setting",
  caption = "Adelaide Metro & Regional SA",
  facts = [
    business.location.fullAddress,
    `${business.hours} (Monday – Sunday)`,
    "Phone support during listed contact hours",
  ],
  illustrative = true,
  showRates = true,
}: HeroProps) {
  return (
    <section className="ca-hero ca-on-dark">
      <div className="ca-container">
        <div className="ca-hero__grid">
          <div className="ca-hero__copy">
            <Badge variant="inverse" live className="ca-reveal">
              {eyebrow}
            </Badge>
            <h1 className="ca-display ca-reveal ca-reveal-1">
              {title}
              {highlight ? (
                <span className="ca-accent-text" style={{ display: "block", marginTop: 4 }}>
                  {highlight}
                </span>
              ) : null}
            </h1>
            <p className="ca-lead ca-reveal ca-reveal-2" style={{ maxWidth: 580 }}>
              {description}
            </p>
            <div className="ca-hero__actions ca-reveal ca-reveal-3">
              <Button size="lg" href="/get-a-quote" trailingIcon="arrow-right">
                Get My Free Quote
              </Button>
              <Button size="lg" variant="inverse" href={business.contact.primaryPhoneHref} leadingIcon="phone">
                Call {business.contact.primaryPhone}
              </Button>
            </div>
            {showRates ? (
              <div className="ca-hero__rates">
                <div className="ca-hero__rates-grid">
                  <RateChip code="2P" name="2 Movers + Truck" rate={business.pricing.twoMovers.thirtyMinutes} hourly={business.pricing.twoMovers.hourlyReference} inverse />
                  <RateChip code="3P" name="3 Movers + Truck" rate={business.pricing.threeMovers.thirtyMinutes} hourly={business.pricing.threeMovers.hourlyReference} inverse />
                </div>
                <p className="ca-caption" style={{ marginTop: 10 }}>
                  {business.pricing.disclaimer}
                </p>
              </div>
            ) : null}
          </div>
          {imageSrc ? (
            <div className="ca-hero__media">
              <div className="ca-hero__img">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1280px) 479px, (min-width: 1024px) calc(41.667vw - 54.667px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
                  className="object-cover"
                  preload
                />
                {illustrative ? <span className="ca-media__tag">Illustrative image</span> : null}
                <div className="ca-hero__caption">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Icon name="map-pin" size={14} style={{ color: "var(--orange-500)" }} />
                    {caption}
                  </span>
                </div>
              </div>
              <ul className="ca-checklist ca-hero__facts">
                {facts.map((fact) => (
                  <li key={fact} style={{ color: "var(--slate-700)" }}>
                    <Icon name="check-circle-2" size={16} />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
