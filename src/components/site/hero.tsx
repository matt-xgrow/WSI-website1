"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { ArrowRightIcon, PhoneIcon, StarIcon } from "./icons";

const HERO_SERVICES = [
  { name: "House Washing", surface: "Render, brick, weatherboard", img: "/images/residential-aerial.jpg" },
  { name: "Pressure Washing", surface: "Driveways, paths, concrete", img: "/images/commercial-pressure.jpg" },
  { name: "Soft Washing", surface: "Render, paint, delicate surfaces", img: "/images/glass-wash.jpg" },
  { name: "Commercial Cleaning", surface: "Offices, strata, facades", img: "/images/commercial-windows.jpg" },
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
            <span>Est. 2014 · QLD + NSW · ABN verified</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">Exterior cleaning,</span>
            <span className="title-line">
              <em className="hl-orange">refined</em> to a science.
            </span>
          </h1>

          <p className="hero-sub">
            Brisbane&rsquo;s most-reviewed exterior cleaning team. Ten years of
            soft-washing homes, scrubbing driveways, polishing glass, and
            restoring roofs across Queensland — insured for $20M, rated five
            stars by hundreds of homeowners and strata managers.
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
              <div className="stat-num"><AnimatedNum to={100} suffix="+" /></div>
              <div className="stat-label">5-star Google reviews</div>
            </div>
            <div className="stat">
              <div className="stat-num">$<AnimatedNum to={20} />M</div>
              <div className="stat-label">Public liability insurance</div>
            </div>
            <div className="stat">
              <div className="stat-num"><AnimatedNum to={10} suffix="+" /></div>
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
                    alt={`WSI ${s.name} job`}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    priority={i === 0}
                    className="hero-photo-img"
                  />
                </div>
              ))}
              <div className="hero-photo-overlay">
                <div className="overlay-card">
                  <div className="overlay-title">{HERO_SERVICES[active].name} · Hamilton, QLD</div>
                  <div className="overlay-meta">
                    <span>{HERO_SERVICES[active].surface}</span>
                    <span className="overlay-sep">·</span>
                    <span>2h 40m</span>
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

function AnimatedNum({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
