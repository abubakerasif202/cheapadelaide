"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Phone, ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071933]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Image
              src="/brand/logo-horizontal.png"
              alt="Cheap Adelaide Removalist"
              width={180}
              height={42}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#FF6A00]"
            >
              Home
            </Link>

            {/* Services with expanded items */}
            <div className="py-1">
              <Link
                href="/services"
                onClick={onClose}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold text-[#0B2D5B] hover:bg-slate-50"
              >
                <span>All Services</span>
                <ArrowRight className="h-4 w-4 text-[#FF6A00]" />
              </Link>
              <div className="ml-3 mt-1 flex flex-col space-y-1 border-l-2 border-slate-100 pl-3">
                {navigation.mainNav[0].children?.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={onClose}
                    className="rounded-md px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#FF6A00]"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/pricing"
              onClick={onClose}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#FF6A00]"
            >
              Pricing
            </Link>
            <Link
              href="/service-areas"
              onClick={onClose}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#FF6A00]"
            >
              Service Areas
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#FF6A00]"
            >
              About Us
            </Link>
            <Link
              href="/faq"
              onClick={onClose}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#FF6A00]"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#FF6A00]"
            >
              Contact
            </Link>
          </nav>

          {/* Quick Info Box in Drawer */}
          <div className="mt-8 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
            <p className="font-semibold text-[#0B2D5B]">{business.name}</p>
            <p className="mt-1">{business.hours}</p>
            <p className="mt-1">{business.location.suburb}, {business.location.state}</p>
            <p className="mt-2 text-slate-500">{business.operatorNotice}</p>
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="border-t border-slate-100 p-5 space-y-3">
          <a
            href={business.contact.primaryPhoneHref}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0B2D5B] bg-white py-3 text-sm font-bold text-[#0B2D5B] transition hover:bg-slate-50"
          >
            <Phone className="h-4 w-4 text-[#FF6A00]" />
            <span>Call {business.contact.primaryPhone}</span>
          </a>
          <Link
            href="/get-a-quote"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-[#E63900]"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
