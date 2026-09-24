export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return <div className={`ca-bento ${className}`.trim()}>{children}</div>;
}

export interface BentoTileProps {
  span?: 3 | 4 | 5 | 6 | 7 | 8 | 12;
  rows?: 1 | 2;
  tone?: "light" | "subtle" | "inverse" | "navy" | "accent";
  interactive?: boolean;
  as?: "div" | "article" | "section" | "a";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function BentoTile({ span = 4, rows = 1, tone = "light", interactive = false, as = "div", className = "", children, ...rest }: BentoTileProps) {
  const Tag = as as React.ElementType;
  const cls = [
    "ca-tile",
    `ca-span-${span}`,
    rows === 2 && "ca-row-2",
    tone !== "light" && `ca-tile--${tone}`,
    (tone === "inverse" || tone === "navy") && "ca-on-dark",
    interactive && "ca-tile--interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
