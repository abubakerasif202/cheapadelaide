import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-[#071933] text-slate-300">
      {/* Upper CTA Strip */}
      <div className="border-b border-white/10 bg-[#0B2D5B]/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              Ready to Book Your Adelaide Move?
            </span>
            <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl font-[family-name:var(--font-heading)]">
              Get an Upfront, Transparent Quote Today.
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              2 Movers from $79 / 30 min • 3 Movers from $99 / 30 min • 7 Days
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={business.contact.primaryPhoneHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <Phone className="h-4 w-4 text-[#FF6A00]" />
              <span>{business.contact.primaryPhone}</span>
            </a>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#E63900]"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              {/* White badge for stacked logo or horizontal logo */}
              <div className="rounded-xl bg-white p-3 inline-block shadow-sm">
                <Image
                  src="/brand/logo-horizontal.png"
                  alt="Cheap Adelaide Removalist"
                  width={210}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {business.positioning} Straightforward moving rates, careful handling, and dependable moving crews across Adelaide and regional South Australia.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-[#FF6A00]" />
                <span>Operational Notice</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {business.operatorNotice}
              </p>
            </div>
          </div>

          {/* Removals Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Removals Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navigation.mainNav[0].children?.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-slate-300 transition hover:text-[#FF6A00]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/pricing" className="text-slate-300 transition hover:text-[#FF6A00]">
                  Moving Rates & Pricing
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="text-slate-300 transition hover:text-[#FF6A00]">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 transition hover:text-[#FF6A00]">
                  About Our Operation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-300 transition hover:text-[#FF6A00]">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 transition hover:text-[#FF6A00]">
                  Contact & Depot Details
                </Link>
              </li>
              <li>
                <Link href="/get-a-quote" className="text-[#FF6A00] font-semibold transition hover:text-white">
                  Request a Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#FF6A00] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={business.contact.primaryPhoneHref}
                    className="font-bold text-white transition hover:text-[#FF6A00]"
                  >
                    {business.contact.primaryPhone}
                  </a>
                  <span className="block text-xs text-slate-400">Primary Dispatch</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={business.contact.secondaryPhoneHref}
                    className="text-slate-200 transition hover:text-[#FF6A00]"
                  >
                    {business.contact.secondaryPhone}
                  </a>
                  <span className="block text-xs text-slate-400">Secondary Line</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#FF6A00] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${business.contact.email}`}
                    className="break-all text-xs text-slate-300 transition hover:text-[#FF6A00]"
                  >
                    {business.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#FF6A00] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-snug">
                  <span>{business.location.street}</span>
                  <br />
                  <span>{business.location.suburb} {business.location.state} {business.location.postcode}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#FF6A00] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">Hours:</span>
                  <br />
                  <span>{business.hours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Legal */}
        <div className="mt-14 border-t border-white/10 pt-8 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} {business.name}. All rights reserved. Adelaide, South Australia.
          </p>
          <div className="flex items-center gap-6">
            {navigation.legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-400 transition hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
