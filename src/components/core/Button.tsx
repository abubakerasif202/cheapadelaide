import Link from "next/link";
import { Icon } from "./Icon";

type ButtonVariant = "primary" | "secondary" | "outline" | "inverse" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: string;
  trailingIcon?: string;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  type?: never;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

interface ButtonAsButton extends BaseProps {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  size = "md",
  href,
  leadingIcon,
  trailingIcon,
  block = false,
  loading = false,
  disabled = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    "ca-btn",
    `ca-btn--${variant}`,
    size !== "md" && `ca-btn--${size}`,
    block && "ca-btn--block",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const iconSize = size === "lg" ? 20 : 16;

  const content = (
    <>
      {loading ? (
        <Icon name="loader-2" size={iconSize} className="ca-spin" />
      ) : leadingIcon ? (
        <Icon name={leadingIcon} size={iconSize} className="ca-btn__lead" />
      ) : null}
      <span>{children}</span>
      {trailingIcon && !loading ? <Icon name={trailingIcon} size={iconSize} /> : null}
    </>
  );

  if (href) {
    const { onClick } = rest as ButtonAsLink;
    return (
      <Link href={href} className={cls} aria-disabled={disabled || undefined} onClick={onClick}>
        {content}
      </Link>
    );
  }

  const { type = "button", onClick } = rest as ButtonAsButton;
  return (
    <button type={type} className={cls} disabled={disabled || loading} onClick={onClick}>
      {content}
    </button>
  );
}
