import { Icon } from "./Icon";

export interface BadgeProps {
  variant?: "accent" | "neutral" | "outline" | "inverse" | "solid" | "navy";
  icon?: string;
  live?: boolean;
  quiet?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function Badge({ variant = "accent", icon, live = false, quiet = false, className = "", style, children }: BadgeProps) {
  const cls = ["ca-badge", `ca-badge--${variant}`, quiet && "ca-badge--quiet", className].filter(Boolean).join(" ");
  return (
    <span className={cls} style={style}>
      {live ? <span className="ca-live-dot" aria-hidden="true" /> : null}
      {icon ? <Icon name={icon} size={14} /> : null}
      <span>{children}</span>
    </span>
  );
}
