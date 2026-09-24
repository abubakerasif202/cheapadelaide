import { IconTile } from "@/components/core";

export interface ContactMethodProps {
  icon?: string;
  label: string;
  value: string;
  href?: string;
  note?: string;
  emphasis?: boolean;
  tone?: "accent" | "navy" | "solid";
}

export function ContactMethod({ icon = "phone", label, value, href, note, emphasis = false, tone }: ContactMethodProps) {
  const valueClass = "ca-contact__value" + (emphasis ? " ca-contact__value--lg" : "");
  return (
    <div className="ca-card ca-card--compact ca-contact">
      <IconTile name={icon} tone={tone || (emphasis ? "accent" : "navy")} />
      <div style={{ minWidth: 0 }}>
        <span className="ca-contact__label">{label}</span>
        {href ? (
          <a href={href} className={valueClass}>
            {value}
          </a>
        ) : (
          <span className={valueClass}>{value}</span>
        )}
        {note ? <p className="ca-contact__note">{note}</p> : null}
      </div>
    </div>
  );
}
