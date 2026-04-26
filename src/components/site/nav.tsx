"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site, locations } from "@/lib/site";
import { PhoneIcon } from "./icons";

const NAV_SERVICES = [
  { name: "House Washing", href: "/services/house-washing" },
  { name: "Pressure Washing", href: "/services/pressure-washing" },
  { name: "Window Cleaning", href: "/services/window-cleaning" },
  { name: "Gutter Cleaning", href: "/services/gutter-cleaning" },
  { name: "Roof Cleaning", href: "/services/roof-cleaning" },
  { name: "Driveway Cleaning", href: "/services/driveway-cleaning" },
  { name: "Solar Panel Cleaning", href: "/services/solar-panel-cleaning" },
  { name: "Strata Cleaning", href: "/services/strata-cleaning" },
  { name: "Commercial Buildings", href: "/services/commercial-cleaning" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "locations" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label="WSI Cleaning home">
          <Image
            src="/design/logo-color.png"
            alt="WSI Cleaning"
            width={240}
            height={120}
            className="logo-img"
            style={{ height: 44, width: "auto" }}
            priority
          />
        </Link>

        <div className="nav-links">
          <Link href="/#about">About</Link>
          <div
            className="nav-dropdown"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button type="button">
              Services <span className="caret">›</span>
            </button>
            {openMenu === "services" && (
              <div className="dropdown-panel">
                <div className="dropdown-head">
                  <span className="eyebrow">Exterior cleaning</span>
                  <p className="dropdown-title">9 services. One trusted team.</p>
                </div>
                <div className="dropdown-grid">
                  {NAV_SERVICES.map((s) => (
                    <Link key={s.name} href={s.href} className="dropdown-item">
                      <span>{s.name}</span>
                      <span className="arrow">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            className="nav-dropdown"
            onMouseEnter={() => setOpenMenu("locations")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button type="button">
              Locations <span className="caret">›</span>
            </button>
            {openMenu === "locations" && (
              <div className="dropdown-panel dropdown-panel-sm">
                <div className="dropdown-head">
                  <span className="eyebrow">Service areas</span>
                  <p className="dropdown-title">Queensland</p>
                </div>
                <div className="dropdown-list">
                  {locations.map((l) => (
                    <Link key={l.slug} href={`/locations/${l.slug}`} className="dropdown-item">
                      <span>{l.name}</span>
                      <span className="arrow">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/gallery">Gallery</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#faq">FAQ</Link>
        </div>

        <div className="nav-cta">
          <a href={site.phoneHref} className="nav-phone">
            <PhoneIcon />
            {site.phoneDisplay}
          </a>
          <Link href="/#quote" className="btn btn-orange btn-sm">
            Free Quote
          </Link>
          <button
            className="nav-burger"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`nav-mobile ${mobileOpen ? "open" : ""}`}>
        <Link href="/#about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link href="/#services" onClick={() => setMobileOpen(false)}>Services</Link>
        <Link href="/#areas" onClick={() => setMobileOpen(false)}>Locations</Link>
        <Link href="/gallery" onClick={() => setMobileOpen(false)}>Gallery</Link>
        <Link href="/#reviews" onClick={() => setMobileOpen(false)}>Reviews</Link>
        <Link href="/#faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
        <Link href="/#quote" onClick={() => setMobileOpen(false)}>Free Quote</Link>
      </div>
    </nav>
  );
}
