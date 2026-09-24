import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

export interface IconProps extends Omit<LucideProps, "ref"> {
  /** kebab-case or PascalCase lucide icon name, e.g. "arrow-right" or "ArrowRight" */
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Accessible label. When omitted the icon is treated as decorative (aria-hidden). */
  label?: string;
}

function toPascalCase(name: string): string {
  return name
    .split(/[-_ ]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function Icon({ name, size = 20, strokeWidth = 2, className = "", label, ...rest }: IconProps) {
  const key = toPascalCase(name) as keyof typeof icons;
  const LucideIcon = icons[key] as React.ComponentType<LucideProps> | undefined;

  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={`ca-icon ${className}`.trim()}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      {...rest}
    />
  );
}
