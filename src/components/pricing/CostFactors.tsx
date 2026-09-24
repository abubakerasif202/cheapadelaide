import { Icon } from "@/components/core";

export interface CostFactor {
  icon?: string;
  title: string;
  description: string;
}

const DEFAULT_FACTORS: CostFactor[] = [
  { icon: "boxes", title: "Move size and inventory", description: "The size and contents of the move help determine the team and time needed." },
  { icon: "building", title: "Property access", description: "Stairs, lifts, hallways, parking and distance from the truck can affect access." },
  { icon: "route", title: "Travel", description: "The route between pickup and delivery is part of the move details." },
  { icon: "package-plus", title: "Additional services", description: "Any additional services requested form part of the quote discussion." },
  { icon: "users", title: "Team size", description: "Choose a team size or ask for guidance based on your move details." },
];

export interface CostFactorsProps {
  items?: CostFactor[];
  columns?: 1 | 2 | 3 | 4;
}

export function CostFactors({ items = DEFAULT_FACTORS, columns = 1 }: CostFactorsProps) {
  return (
    <ul
      className={"ca-grid" + (columns > 1 ? ` ca-grid--${columns}` : "")}
      style={{ listStyle: "none", margin: 0, padding: 0, gap: 12 }}
    >
      {items.map((factor) => (
        <li
          key={factor.title}
          style={{
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            padding: 16,
            borderRadius: 16,
            border: "1px solid var(--border-subtle)",
            background: "var(--slate-50)",
          }}
        >
          <Icon name={factor.icon || "check-circle-2"} size={18} style={{ color: "var(--orange-500)", marginTop: 2 }} />
          <div>
            <strong style={{ display: "block", fontSize: 14, color: "var(--navy-900)" }}>{factor.title}</strong>
            <span className="ca-small" style={{ color: "var(--text-muted)" }}>
              {factor.description}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
