"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

const NAV_SERVICES = [
  "Pressure Washing",
  "House Washing",
  "Roof Cleaning",
  "Gutter Cleaning",
  "Window Cleaning",
  "Driveway Cleaning",
  "Solar Panel Cleaning",
  "Strata Cleaning",
  "Commercial Building",
  "Tennis Court Cleaning",
  "Deck & Patio",
  "Concrete Render",
];

const NAV_LOCATIONS = ["Brisbane", "Sunshine Coast", "Gold Coast"];

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
          <a href="#about">About</a>
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
                  <h4>15 services. One trusted team.</h4>
                </div>
                <div className="dropdown-grid">
                  {NAV_SERVICES.map((s) => (
                    <a key={s} href="#services" className="dropdown-item">
                      <span>{s}</span>
                      <span className="arrow">→</span>
                    </a>
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
                  <h4>Queensland</h4>
                </div>
                <div className="dropdown-list">
                  {NAV_LOCATIONS.map((l) => (
                    <a key={l} href="#areas" className="dropdown-item">
                      <span>{l}</span>
                      <span className="arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="nav-cta">
          <a href={site.phoneHref} className="nav-phone">
            <PhoneIcon />
            {site.phoneDisplay}
          </a>
          <a href="#quote" className="btn btn-orange btn-sm">
            Free Quote
          </a>
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
        <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
        <a href="#areas" onClick={() => setMobileOpen(false)}>Locations</a>
        <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
        <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
        <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
        <a href="#quote" onClick={() => setMobileOpen(false)}>Free Quote</a>
      </div>
    </nav>
  );
}
