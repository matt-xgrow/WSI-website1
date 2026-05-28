"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

type MenuKey = "services" | "locations" | null;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [openMenu]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleMenu = (key: MenuKey) => {
    setOpenMenu((current) => (current === key ? null : key));
  };

  const toggleMobileSection = (key: MenuKey) => {
    setMobileSection((current) => (current === key ? null : key));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  return (
    <nav ref={navRef} className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label="WSI Cleaning home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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
          <Link href="/about">About</Link>
          <div
            className="nav-dropdown"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => toggleMenu("services")}
              aria-haspopup="true"
              aria-expanded={openMenu === "services"}
            >
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
                    <Link
                      key={s.name}
                      href={s.href}
                      className="dropdown-item"
                      onClick={() => setOpenMenu(null)}
                    >
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
            <button
              type="button"
              onClick={() => toggleMenu("locations")}
              aria-haspopup="true"
              aria-expanded={openMenu === "locations"}
            >
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
                    <Link
                      key={l.slug}
                      href={`/locations/${l.slug}`}
                      className="dropdown-item"
                      onClick={() => setOpenMenu(null)}
                    >
                      <span>{l.name}</span>
                      <span className="arrow">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/guides">Guides</Link>
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
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile-panel"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div
        id="nav-mobile-panel"
        className={`nav-mobile ${mobileOpen ? "open" : ""}`}
      >
        <Link href="/about" onClick={closeMobile}>
          About
        </Link>

        <div className="nav-mobile-group">
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => toggleMobileSection("services")}
            aria-expanded={mobileSection === "services"}
          >
            <span>Services</span>
            <span className="caret">{mobileSection === "services" ? "−" : "+"}</span>
          </button>
          {mobileSection === "services" && (
            <div className="nav-mobile-sub">
              {NAV_SERVICES.map((s) => (
                <Link key={s.name} href={s.href} onClick={closeMobile}>
                  {s.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="nav-mobile-group">
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => toggleMobileSection("locations")}
            aria-expanded={mobileSection === "locations"}
          >
            <span>Locations</span>
            <span className="caret">{mobileSection === "locations" ? "−" : "+"}</span>
          </button>
          {mobileSection === "locations" && (
            <div className="nav-mobile-sub">
              {locations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  onClick={closeMobile}
                >
                  {l.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/guides" onClick={closeMobile}>
          Guides
        </Link>
        <Link href="/gallery" onClick={closeMobile}>
          Gallery
        </Link>
        <Link href="/#reviews" onClick={closeMobile}>
          Reviews
        </Link>
        <Link href="/#faq" onClick={closeMobile}>
          FAQ
        </Link>
        <Link
          href="/#quote"
          onClick={closeMobile}
          className="nav-mobile-cta"
        >
          Free Quote →
        </Link>
      </div>
    </nav>
  );
}
