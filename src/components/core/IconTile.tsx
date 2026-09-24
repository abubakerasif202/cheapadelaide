import { Icon } from "./Icon";

export interface IconTileProps {
  name: string;
  size?: "sm" | "md" | "lg";
  tone?: "accent" | "solid" | "navy" | "inverse";
  hoverFill?: boolean;
  className?: string;
}

export function IconTile({ name, size = "md", tone = "accent", hoverFill = false, className = "" }: IconTileProps) {
  const cls = [
    "ca-icon-tile",
    size !== "md" && `ca-icon-tile--${size}`,
    tone !== "accent" && `ca-icon-tile--${tone}`,
    hoverFill && "ca-icon-tile--hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} aria-hidden="true">
      <Icon name={name} size={size === "sm" ? 20 : size === "lg" ? 28 : 24} />
    </span>
  );
}
