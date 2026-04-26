"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { ArrowRightIcon, PhoneIcon, StarIcon } from "./icons";

const HERO_SERVICES = [
  {
    name: "House Washing",
    surface: "Render, brick, weatherboard",
    img: "/images/residential-aerial.jpg",
    alt: "Aerial view of a soft-washed Brisbane home showing clean rendered walls",
  },
  {
    name: "Pressure Washing",
    surface: "Driveways, paths, concrete",
    img: "/images/commercial-pressure.jpg",
    alt: "Commercial-grade pressure washer restoring a Brisbane concrete surface",
  },
  {
    name: "Window Cleaning",
    surface: "Glass, frames, balustrades",
    img: "/images/commercial-windows.jpg",
    alt: "Streak-free window cleaning on a Brisbane residential exterior",
  },
  {
    name: "Commercial Cleaning",
    surface: "Offices, strata, facades",
    img: "/images/glass-wash.jpg",
    alt: "Commercial glass facade cleaning on a Brisbane office building",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>
              Est. {site.foundingYear} · Brisbane · QLD · ABN {site.abnDisplay}
            </span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">Your home deserves</span>
            <span className="title-line">
              to look this <em className="hl-orange">clean.</em>
            </span>
          </h1>

          <p className="hero-sub">
            WSI Cleaning is a Brisbane-based exterior cleaning company,
            operating across Brisbane, the Gold Coast and the Sunshine Coast
            since {site.foundingYear}. We soft-wash homes, pressure-clean
            driveways and paving, polish windows, clear gutters and restore
            roofs — backed by {site.insuranceLabel.toLowerCase()},{" "}
            {site.rating}/5 from {site.reviewCount} Google reviews and{" "}
            {site.yearsInBusiness}+ years on the ground.
          </p>

          <div className="hero-actions">
            <a className="btn btn-orange btn-lg" href="#quote">
              Get a free quote
              <span className="btn-arrow"><ArrowRightIcon /></span>
            </a>
            <a href={site.phoneHref} className="btn btn-ghost btn-lg">
              <PhoneIcon />
              Call {site.phoneDisplay}
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">
                <AnimatedNum to={site.reviewCount} />
              </div>
              <div className="stat-label">5-star Google reviews</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                $<AnimatedNum to={20} />M
              </div>
              <div className="stat-label">Public liability insurance</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                <AnimatedNum to={site.yearsInBusiness} suffix="+" />
              </div>
              <div className="stat-label">Years on the ground</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual">
            <div className="hero-photo">
              {HERO_SERVICES.map((s, i) => (
                <div key={s.name} className={`hero-photo-slide ${i === active ? "active" : ""}`}>
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    priority={i === 0}
                    className="hero-photo-img"
                  />
                </div>
              ))}
              <div className="hero-photo-overlay">
                <div className="overlay-card">
                  <div className="overlay-title">{HERO_SERVICES[active].name} · Brisbane, QLD</div>
                  <div className="overlay-meta">
                    <span>{HERO_SERVICES[active].surface}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-service-picker">
              <div className="picker-head">
                <span className="picker-eyebrow">Pick a surface</span>
                <span className="picker-count">
                  {active + 1} / {HERO_SERVICES.length}
                </span>
              </div>
              <div className="picker-list">
                {HERO_SERVICES.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    className={`picker-item ${i === active ? "active" : ""}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="picker-num">0{i + 1}</span>
                    <span className="picker-name">{s.name}</span>
                    <span className="picker-arrow">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-badge">
            <div className="badge-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <div className="badge-text">
              <strong>{site.rating} / 5</strong>
              <span>from {site.reviewCountLabel} reviews on Google</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedNum({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const inViewportOnMount =
      rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewportOnMount) {
      started.current = true;
      return;
    }
    setN(0);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setN(Math.round(to * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
