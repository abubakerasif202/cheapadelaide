import Image from "next/image";
import { business } from "@/config/business";
import { Icon, Button } from "@/components/core";

export interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: string;
  variant?: "primary" | "secondary" | "outline";
}

export interface EmptyStateProps {
  variant?: "inline" | "page";
  code?: string;
  markSrc?: string;
  icon?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: EmptyStateAction[];
  showPhone?: boolean;
  as?: "h1" | "h2" | "h3";
}

export function EmptyState({
  variant = "inline",
  code,
  markSrc,
  icon = "search",
  eyebrow,
  title,
  description,
  actions,
  showPhone = true,
  as = "h2",
}: EmptyStateProps) {
  const Heading = as;
  return (
    <div className={`ca-empty ca-empty--${variant}`}>
      {markSrc ? (
        <div className="ca-empty__mark">
          <Image src={markSrc} alt="" width={88} height={88} />
          {code ? <span className="ca-empty__code">{code}</span> : null}
        </div>
      ) : (
        <span className="ca-icon-tile ca-icon-tile--lg">
          <Icon name={icon} size={26} />
        </span>
      )}
      {eyebrow ? <span className="ca-eyebrow ca-eyebrow--rule">{eyebrow}</span> : null}
      <Heading className={variant === "page" ? "ca-h1" : "ca-h3"}>{title}</Heading>
      {description ? (
        <p className="ca-body" style={{ maxWidth: 460 }}>
          {description}
        </p>
      ) : null}
      {actions && actions.length ? (
        <div className="ca-empty__actions">
          {actions.map((action, i) =>
            action.href ? (
              <Button key={action.label} variant={action.variant || (i === 0 ? "secondary" : "outline")} href={action.href} leadingIcon={action.icon}>
                {action.label}
              </Button>
            ) : (
              <Button key={action.label} variant={action.variant || (i === 0 ? "secondary" : "outline")} onClick={action.onClick} leadingIcon={action.icon}>
                {action.label}
              </Button>
            )
          )}
        </div>
      ) : null}
      {showPhone ? (
        <p className="ca-caption" style={{ marginTop: 16 }}>
          Need direct assistance? Call dispatch on{" "}
          <a href={business.contact.primaryPhoneHref} style={{ fontWeight: 700, color: "var(--navy-900)" }}>
            {business.contact.primaryPhone}
          </a>
        </p>
      ) : null}
    </div>
  );
}
