import { Icon, Button } from "@/components/core";

export interface RegionCardProps {
  icon?: string;
  name: string;
  description: string;
  hubs?: string[];
  note?: string;
  link?: { label: string; href: string };
}

export function RegionCard({ icon = "compass", name, description, hubs = [], note, link }: RegionCardProps) {
  return (
    <article className="ca-card ca-card--interactive ca-region" style={{ gap: 12 }}>
      <h3 className="ca-h4">
        <Icon name={icon} size={20} />
        {name}
      </h3>
      <p className="ca-small">{description}</p>
      {hubs.length ? (
        <div style={{ paddingTop: 14, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="ca-contact__label">Key Suburb Hubs</span>
          <ul className="ca-hubs">
            {hubs.map((hub) => (
              <li key={hub}>{hub}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {link ? (
        <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
          <Button variant="link" href={link.href} trailingIcon="arrow-right">
            {link.label}
          </Button>
        </div>
      ) : note ? (
        <p className="ca-region__note">{note}</p>
      ) : null}
    </article>
  );
}
