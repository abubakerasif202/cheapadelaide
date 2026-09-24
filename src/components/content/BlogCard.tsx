import Link from "next/link";
import { Icon, Badge } from "@/components/core";

const CAT_ICONS: Record<string, string> = {
  "Cost & Pricing": "dollar-sign",
  "Logistics & Planning": "map-pin",
  "Comparisons & Hacks": "sparkles",
  "Specialist Removals": "truck",
};

export interface BlogCardProps {
  category: string;
  title: string;
  summary: string;
  readTime?: string;
  tier?: string | number;
  href?: string;
  size?: "lead" | "default" | "compact";
}

export function BlogCard({ category, title, summary, readTime, tier, href = "#", size = "default" }: BlogCardProps) {
  const cls = ["ca-card", "ca-card--interactive", "ca-group", "ca-post", size === "lead" && "ca-post--lead", size === "compact" && "ca-post--compact"]
    .filter(Boolean)
    .join(" ");
  return (
    <article className={cls}>
      <div className="ca-post__meta">
        <Badge variant={size === "compact" ? "neutral" : "accent"} icon={CAT_ICONS[category] || "help-circle"} quiet>
          {category}
        </Badge>
        {readTime ? (
          <span className="ca-post__time">
            <Icon name="clock" size={12} />
            {readTime}
          </span>
        ) : null}
      </div>
      <h3 className={size === "lead" ? "ca-h3 ca-card__title" : "ca-h4 ca-card__title"}>
        <Link href={href}>{title}</Link>
      </h3>
      <p className="ca-small">{summary}</p>
      <div className="ca-card__foot">
        <span className="ca-num" style={{ color: "var(--text-muted)", fontWeight: 500 }}>
          {tier ? `Tier ${tier}${size === "compact" ? "" : " Analysis"}` : ""}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--orange-700)" }}>
          Read Guide
          <Icon name="arrow-right" size={14} className="ca-card__arrow" />
        </span>
      </div>
    </article>
  );
}
