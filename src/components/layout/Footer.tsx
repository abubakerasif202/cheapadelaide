import Link from "next/link";
import Image from "next/image";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";
import { Icon, Button } from "@/components/core";

const QUICK_LINKS = [
  ["Moving Rates & Pricing", "/pricing"],
  ["Service Areas", "/service-areas"],
  ["Moving Guides & Tips", "/blog"],
  ["About Our Operation", "/about"],
  ["Frequently Asked Questions", "/faq"],
  ["Contact & Depot Details", "/contact"],
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const services = navigation.mainNav[0].children ?? [];

  return (
    <footer className="ca-footer ca-on-dark">
      <div className="ca-footer__strip">
        <div className="ca-container ca-footer__strip-row">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="ca-eyebrow">Ready to Book Your Adelaide Move?</span>
            <h3 className="ca-h2" style={{ fontSize: "var(--fs-h3)" }}>
              Discuss Your Adelaide Move With Us.
            </h3>
            <p className="ca-small">2 Movers from $79 / 30 min • 3 Movers from $99 / 30 min • Open daily</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button variant="inverse" href={business.contact.primaryPhoneHref} leadingIcon="phone">
              {business.contact.primaryPhone}
            </Button>
            <Button href="/get-a-quote" trailingIcon="arrow-right">
              Get a Free Quote
            </Button>
          </div>
        </div>
      </div>

      <div className="ca-container ca-footer__main">
        <div className="ca-footer__grid">
          <div className="ca-footer__brand">
            <Link href="/">
              <Image src="/brand/logo-horizontal-dark.png" alt={business.name} width={210} height={50} />
            </Link>
            <p className="ca-small">
              {business.positioning} Starting rates, contact details and listed service areas are available here for
              Adelaide moves.
            </p>
            <div className="ca-glassbox">
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13, color: "#fff" }}>
                <Icon name="shield-check" size={16} style={{ color: "var(--orange-500)" }} />
                Operational Notice
              </div>
              <p className="ca-caption" style={{ marginTop: 6 }}>
                {business.operatorNotice}
              </p>
            </div>
          </div>

          <div>
            <h4>Removals Services</h4>
            <ul>
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map(([title, href]) => (
                <li key={href}>
                  <Link href={href}>{title}</Link>
                </li>
              ))}
              <li>
                <Link href="/get-a-quote" style={{ color: "var(--orange-500)", fontWeight: 600 }}>
                  Request a Free Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Direct Contact</h4>
            <ul className="ca-footer__contact">
              <li>
                <Icon name="phone" size={18} />
                <div>
                  <a href={business.contact.primaryPhoneHref} style={{ color: "#fff", fontWeight: 700 }}>
                    {business.contact.primaryPhone}
                  </a>
                  <small>Primary Phone</small>
                </div>
              </li>
              <li>
                <Icon name="phone" size={18} style={{ color: "var(--slate-400)" }} />
                <div>
                  <a href={business.contact.secondaryPhoneHref}>{business.contact.secondaryPhone}</a>
                  <small>Secondary Line</small>
                </div>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={`mailto:${business.contact.email}`} style={{ fontSize: 13, wordBreak: "break-all" }}>
                  {business.contact.email}
                </a>
              </li>
              <li>
                <Icon name="map-pin" size={18} />
                <span style={{ fontSize: 13 }}>
                  {business.location.street}
                  <br />
                  {business.location.suburb} {business.location.state} {business.location.postcode}
                </span>
              </li>
              <li>
                <Icon name="clock" size={18} />
                <span style={{ fontSize: 13 }}>
                  <b style={{ color: "#fff" }}>Hours:</b>
                  <br />
                  {business.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ca-footer__legal">
          <p>
            © {currentYear} {business.name}. All rights reserved. Adelaide, South Australia.
          </p>
          <nav aria-label="Legal">
            {navigation.legalNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
