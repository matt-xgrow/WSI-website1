"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ServiceEntry = {
  id: string;
  name: string;
  desc: string;
  tag: string | null;
  img: string;
  kind: "residential" | "commercial";
  href: string;
};

const SERVICES: ServiceEntry[] = [
  {
    id: "house-washing",
    name: "House Washing",
    desc: "Soft-wash render, brick and weatherboard. Algae and grime removed without blasting delicate surfaces.",
    tag: "Most booked",
    img: "/images/residential-aerial.jpg",
    kind: "residential",
    href: "/services/house-washing-brisbane",
  },
  {
    id: "pressure-washing",
    name: "Pressure Washing",
    desc: "Restore driveways, paths and concrete to factory finish with commercial-grade pressure.",
    tag: null,
    img: "/images/commercial-pressure.jpg",
    kind: "residential",
    href: "/services/pressure-cleaning-brisbane",
  },
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    desc: "Streak-free interior and exterior glass, frames, screens and sills.",
    tag: null,
    img: "/images/commercial-windows.jpg",
    kind: "residential",
    href: "/services/window-cleaning-brisbane",
  },
  {
    id: "gutter-cleaning",
    name: "Gutter Cleaning",
    desc: "Unclog, flush and inspect. Protect your home before storm season hits.",
    tag: null,
    img: "/images/soft-wash.jpg",
    kind: "residential",
    href: "/services/gutter-cleaning-brisbane",
  },
  {
    id: "roof-cleaning",
    name: "Roof Cleaning",
    desc: "Tile, Colorbond, terracotta — moss and lichen treated at the root.",
    tag: null,
    img: "/images/aerial-clean.jpg",
    kind: "residential",
    href: "#quote",
  },
  {
    id: "driveway-cleaning",
    name: "Driveway Cleaning",
    desc: "Oil, rust and tyre marks lifted. Concrete and pavers restored.",
    tag: null,
    img: "/images/commercial-aerial.jpg",
    kind: "residential",
    href: "#quote",
  },
  {
    id: "solar-panel",
    name: "Solar Panel Cleaning",
    desc: "Restore up to 25% lost output. Safe deionised-water process.",
    tag: null,
    img: "/images/drone-aerial.jpg",
    kind: "residential",
    href: "#quote",
  },
  {
    id: "strata",
    name: "Strata Cleaning",
    desc: "Common areas, car parks and facades. Scheduled or on-demand.",
    tag: "Commercial",
    img: "/images/wsi-team.jpg",
    kind: "commercial",
    href: "#quote",
  },
  {
    id: "commercial",
    name: "Commercial Buildings",
    desc: "High-access facade work for offices, retail and hospitality.",
    tag: "Commercial",
    img: "/images/glass-wash.jpg",
    kind: "commercial",
    href: "#quote",
  },
];

const FILTERS = [
  { id: "all" as const, label: "All services" },
  { id: "residential" as const, label: "Residential" },
  { id: "commercial" as const, label: "Commercial" },
];

export function ServicesSection() {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial">("all");

  const filtered = filter === "all" ? SERVICES : SERVICES.filter((s) => s.kind === filter);

  const counts = {
    all: SERVICES.length,
    residential: SERVICES.filter((s) => s.kind === "residential").length,
    commercial: SERVICES.filter((s) => s.kind === "commercial").length,
  };

  return (
    <section className="services" id="services">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            What we clean
          </span>
          <h2 className="section-title">
            One team. <em className="hl-orange">Nine</em> services.
            <br />
            Every surface your property owns.
          </h2>
        </div>
        <div className="section-head-right">
          <p>
            From a single window to a 40-unit strata complex — we bring the
            equipment, the chemistry, and the crew. Quoted in 24 hours,
            on-site within the week.
          </p>
          <a className="btn btn-dark btn-md" href="#quote">
            Request a quote →
          </a>
        </div>
      </div>

      <div className="services-filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`filter-chip ${filter === f.id ? "active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <span className="chip-count">{counts[f.id]}</span>
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filtered.map((s, i) => {
          const isExternal = s.href.startsWith("#");
          const inner = (
            <>
              <div className="service-img">
                <Image
                  src={s.img}
                  alt={s.name}
                  width={720}
                  height={495}
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                  className="service-photo"
                />
                <div className="service-img-overlay">
                  <span>{isExternal ? "Get a quote" : "Learn more"}</span>
                  <span className="service-arrow">→</span>
                </div>
              </div>
              <div className="service-body">
                <div className="service-top">
                  <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.tag && (
                    <span className={`service-tag${s.tag === "Specialist" ? " service-tag-cyan" : ""}`}>
                      {s.tag}
                    </span>
                  )}
                </div>
                <h3 className="service-name">{s.name}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            </>
          );

          return isExternal ? (
            <a key={s.id} href={s.href} className="service-card">
              {inner}
            </a>
          ) : (
            <Link key={s.id} href={s.href} className="service-card">
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
