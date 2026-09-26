"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";
import { Icon, Button } from "@/components/core";
import { MobileMenu } from "./MobileMenu";

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const suppressServicesFocusRef = useRef(false);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = navigation.mainNav[0].children ?? [];

  return (
    <>
      <header className={"ca-header" + (isScrolled ? " ca-header--scrolled" : "")}>
        <div className="ca-container ca-header__row">
          <Link href="/" className="ca-header__logo" aria-label={`${business.name} – Home`}>
            <Image src="/brand/logo-horizontal.png" alt={business.name} width={240} height={56} loading="lazy" />
          </Link>

          <nav className="ca-nav" aria-label="Main navigation">
            <div
              className="ca-nav__item"
              data-open={servicesOpen}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  suppressServicesFocusRef.current = true;
                  event.currentTarget.querySelector<HTMLElement>(".ca-nav__link")?.focus();
                  setServicesOpen(false);
                  requestAnimationFrame(() => { suppressServicesFocusRef.current = false; });
                }
              }}
            >
              <Link
                href="/services"
                className="ca-nav__link"
                aria-expanded={servicesOpen}
                aria-controls="services-dropdown"
                aria-current={isCurrent(pathname, "/services") ? "page" : undefined}
                onFocus={() => { if (!suppressServicesFocusRef.current) setServicesOpen(true); }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setServicesOpen(true);
                    requestAnimationFrame(() => document.querySelector<HTMLElement>("#services-dropdown a")?.focus());
                  }
                }}
              >
                Services
                <Icon name="chevron-down" size={16} />
              </Link>
              {servicesOpen ? (
                <div id="services-dropdown" className="ca-dropdown">
                  <div className="ca-dropdown__panel">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setServicesOpen(false)}
                        className="ca-dropdown__item"
                      >
                        <div>
                          <strong>{service.title}</strong>
                          <span>{service.description}</span>
                        </div>
                      </Link>
                    ))}
                    <Link href="/services" onClick={() => setServicesOpen(false)} className="ca-dropdown__all">
                      <span>View All Services</span>
                      <Icon name="arrow-right" size={14} />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>

            {navigation.mainNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="ca-nav__link"
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="ca-header__actions">
            <a href={business.contact.primaryPhoneHref} className="ca-phone ca-phone--hide-md">
              <span className="ca-phone__icon">
                <Icon name="phone" size={16} />
              </span>
              <span>
                <span className="ca-phone__label">Direct Line</span>
                {business.contact.primaryPhone}
              </span>
            </a>
            <Button href="/get-a-quote" size="sm" trailingIcon="arrow-right">
              Get a Free Quote
            </Button>
          </div>

          <div className="ca-header__mobile">
            <a
              href={business.contact.primaryPhoneHref}
              className="ca-iconbtn ca-iconbtn--accent ca-iconbtn--sm-hide"
              aria-label={`Call ${business.contact.primaryPhone}`}
            >
              <Icon name="phone" size={20} />
            </a>
            <button
              ref={menuTriggerRef}
              type="button"
              className="ca-iconbtn"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open main menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} triggerRef={menuTriggerRef} />
    </>
  );
}
