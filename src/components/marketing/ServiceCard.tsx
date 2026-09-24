import Link from "next/link";
import { Icon, IconTile } from "@/components/core";

export interface ServiceCardProps {
  icon?: string;
  title: string;
  description: string;
  rate?: string;
  href?: string;
  cta?: string;
}

export function ServiceCard({ icon = "truck", title, description, rate, href = "#", cta = "View Service Details" }: ServiceCardProps) {
  return (
    <Link href={href} className="ca-card ca-card--interactive ca-group ca-service-card">
      <IconTile name={icon} hoverFill />
      <h3 className="ca-h4 ca-card__title">{title}</h3>
      <p className="ca-small">{description}</p>
      {rate ? <span className="ca-service-card__rate">{rate}</span> : null}
      <div className="ca-card__foot">
        <span>{cta}</span>
        <Icon name="arrow-right" size={16} className="ca-card__arrow" />
      </div>
    </Link>
  );
}
