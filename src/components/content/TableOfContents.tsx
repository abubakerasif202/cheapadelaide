export interface TocItem {
  id: string;
  label: string;
}

export interface TableOfContentsProps {
  title?: string;
  items: TocItem[];
  activeId?: string;
}

export function TableOfContents({ title = "In This Guide", items = [], activeId }: TableOfContentsProps) {
  return (
    <nav className="ca-card ca-card--compact" aria-label={title} style={{ boxShadow: "var(--shadow-sm)" }}>
      <h3 className="ca-aside-label" style={{ marginBottom: 12 }}>
        {title}
      </h3>
      <div className="ca-toc">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} aria-current={activeId === item.id ? "true" : undefined}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
