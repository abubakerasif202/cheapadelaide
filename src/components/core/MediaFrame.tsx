import Image from "next/image";
import { Icon } from "./Icon";

export interface MediaFrameProps {
  src?: string;
  alt?: string;
  ratio?: string;
  caption?: string;
  captionIcon?: string;
  illustrative?: boolean;
  shade?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
}

export function MediaFrame({
  src,
  alt = "",
  ratio = "16/11",
  caption,
  captionIcon = "map-pin",
  illustrative = false,
  shade = true,
  placeholder = "Photo coming soon",
  className = "",
  style,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: MediaFrameProps) {
  return (
    <figure
      className={["ca-media", shade && src && caption && "ca-media--shade", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: ratio, position: "relative", ...style }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="ca-media__empty">
          <Icon name="image" size={22} />
          {placeholder}
        </div>
      )}
      {illustrative && src ? <span className="ca-media__tag">Illustrative image</span> : null}
      {caption && src ? (
        <figcaption className="ca-media__cap">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name={captionIcon} size={14} style={{ color: "var(--orange-500)" }} />
            {caption}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
