"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";
import { Icon, Button } from "@/components/core";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({ isOpen, onClose, triggerRef }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dismiss = useCallback(() => {
    onClose();
    triggerRef.current?.focus();
  }, [onClose, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>('button[aria-label="Close menu"]')?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, dismiss]);

  if (!isOpen) return null;

  const services = navigation.mainNav[0].children ?? [];
  const explore = navigation.mainNav.slice(1);

  return (
    <>
      <div className="ca-drawer-scrim" onClick={dismiss} aria-hidden="true" />
      <div
        ref={menuRef}
        className="ca-drawer"
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="ca-drawer__head">
          <Link href="/" onClick={dismiss}>
            <Image src="/brand/logo-horizontal.png" alt={business.name} width={180} height={42} priority />
          </Link>
          <button type="button" className="ca-iconbtn" onClick={dismiss} aria-label="Close menu">
            <Icon name="x" size={20} />
          </button>
        </div>

        <div className="ca-drawer__body">
          <div className="ca-drawer__group">Services</div>
          <div className="ca-drawer__services">
            {services.map((service) => (
              <Link key={service.href} href={service.href} onClick={dismiss} className="ca-drawer__svc">
                <Icon name="check-circle-2" size={18} />
                {service.title}
              </Link>
            ))}
          </div>

          <div className="ca-drawer__group">Explore</div>
          <Link href="/" onClick={dismiss} className="ca-drawer__link" aria-current={pathname === "/" ? "page" : undefined}>
            Home
            <Icon name="chevron-right" size={18} />
          </Link>
          {explore.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={dismiss}
              className="ca-drawer__link"
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {item.title}
              <Icon name="chevron-right" size={18} />
            </Link>
          ))}
        </div>

        <div className="ca-drawer__foot">
          <Button href="/get-a-quote" onClick={dismiss} block trailingIcon="arrow-right">
            Get a Free Quote
          </Button>
          <Button href={business.contact.primaryPhoneHref} variant="outline" block leadingIcon="phone">
            Call {business.contact.primaryPhone}
          </Button>
          <p className="ca-caption" style={{ textAlign: "center" }}>
            Open {business.hours}
          </p>
        </div>
      </div>
    </>
  );
}
