import { business } from "@/config/business";
import { IconTile, Badge, Button } from "@/components/core";

export interface PricingCardProps {
  name: string;
  suitability: string;
  rate: number;
  hourly: number;
  featured?: boolean;
  icon?: string;
  cta?: string;
  href?: string;
  disclaimer?: string;
  flag?: string;
}

export function PricingCard({
  name,
  suitability,
  rate,
  hourly,
  featured = false,
  icon,
  cta = "Get a Quote",
  href = "/get-a-quote",
  disclaimer = business.pricing.disclaimer,
  flag = "Most popular",
}: PricingCardProps) {
  return (
    <article className={"ca-price" + (featured ? " ca-price--featured ca-on-dark" : "")}>
      {featured && flag ? (
        <Badge variant="solid" className="ca-price__flag">
          {flag}
        </Badge>
      ) : null}
      <div>
        <div className="ca-price__head">
          <IconTile name={icon || (featured ? "truck" : "users")} tone={featured ? "solid" : "accent"} />
          <div>
            <h3 className="ca-h3" style={{ fontSize: 20 }}>
              {name}
            </h3>
            <p className="ca-small" style={{ marginTop: 2 }}>
              {suitability}
            </p>
          </div>
        </div>
        <div className="ca-price__box">
          <p className="ca-eyebrow" style={{ color: featured ? "var(--orange-200)" : "var(--text-muted)", letterSpacing: ".12em" }}>
            Starting rate
          </p>
          <p className="ca-price__amount">
            <b>${rate}</b>
            <span>/ 30 min</span>
          </p>
          <p className="ca-price__hourly">${hourly}/hr reference</p>
        </div>
        {disclaimer ? <p className="ca-price__note">{disclaimer}</p> : null}
      </div>
      <Button variant={featured ? "primary" : "secondary"} href={href} trailingIcon="arrow-right" block>
        {cta}
      </Button>
    </article>
  );
}
