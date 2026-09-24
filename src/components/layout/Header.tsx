"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown, Menu, ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2.5"
            : "bg-white border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-95"
            aria-label="Cheap Adelaide Removalist - Home"
          >
            <Image
              src="/brand/logo-horizontal.png"
              alt="Cheap Adelaide Removalist"
              width={240}
              height={56}
              className="h-10 sm:h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {/* Services with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
              onFocus={() => setServicesDropdownOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setServicesDropdownOpen(false);
              }}
            >
              <Link
                href="/services"
                aria-controls="desktop-services-menu"
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#0B2D5B] transition hover:text-[#FF6A00]"
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-hover:rotate-180" />
              </Link>

              {servicesDropdownOpen && (
                <div id="desktop-services-menu" className="absolute left-0 top-full pt-2 w-80 z-50">
                  <div className="rounded-2xl bg-white p-3 shadow-xl border border-slate-100 ring-1 ring-black/5">
                    <div className="grid grid-cols-1 gap-1">
                      {navigation.mainNav[0].children?.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="group flex flex-col rounded-xl p-2.5 transition hover:bg-slate-50"
                        >
                          <span className="text-sm font-semibold text-[#0B2D5B] group-hover:text-[#FF6A00]">
                            {service.title}
                          </span>
                          <span className="text-xs text-slate-500 line-clamp-1">
                            {service.description}
                          </span>
                        </Link>
                      ))}
                      <div className="border-t border-slate-100 pt-2 mt-1">
                        <Link
                          href="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#FF6A00] hover:bg-orange-50"
                        >
                          <span>View All Services</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="px-3 py-2 text-sm font-semibold text-[#0B2D5B] transition hover:text-[#FF6A00]"
            >
              Pricing
            </Link>
            <Link
              href="/service-areas"
              className="px-3 py-2 text-sm font-semibold text-[#0B2D5B] transition hover:text-[#FF6A00]"
            >
              Service Areas
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-semibold text-[#0B2D5B] transition hover:text-[#FF6A00]"
            >
              Guides
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-semibold text-[#0B2D5B] transition hover:text-[#FF6A00]"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="px-3 py-2 text-sm font-semibold text-[#0B2D5B] transition hover:text-[#FF6A00]"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-semibold text-[#0B2D5B] transition hover:text-[#FF6A00]"
            >
              Contact
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={business.contact.primaryPhoneHref}
              className="flex items-center gap-2 text-sm font-bold text-[#0B2D5B] transition hover:text-[#FF6A00]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[#FF6A00]">
                <Phone className="h-4 w-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Direct Line
                </span>
                <span>{business.contact.primaryPhone}</span>
              </div>
            </a>

            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-bold text-[#071933] shadow-md shadow-orange-500/20 transition hover:bg-orange-300 active:scale-[0.98]"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={business.contact.primaryPhoneHref}
              className="flex sm:hidden h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#FF6A00]"
              aria-label="Call Direct Line"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open main menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        triggerRef={menuTriggerRef}
      />
    </>
  );
}
