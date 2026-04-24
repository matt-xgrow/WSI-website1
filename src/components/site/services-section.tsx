"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ServiceEntry = {
  id: string;
  name: string;
  desc: string;
  tag: string | null;
  img: string;
  kind: "residential" | "commercial";
};

const SERVICES: ServiceEntry[] = [
  { id: "pressure", name: "Pressure Washing", desc: "Restore driveways, paths and concrete to factory finish.", tag: "Most booked", img: "/images/commercial-pressure.jpg", kind: "residential" },
  { id: "house", name: "House Washing", desc: "Soft-wash render, brick, weatherboard. Algae and grime, gone.", tag: null, img: "/images/residential-aerial.jpg", kind: "residential" },
  { id: "roof", name: "Roof Cleaning", desc: "Tile, Colorbond, terracotta — moss and lichen treated at the root.", tag: "Specialist", img: "/images/aerial-clean.jpg", kind: "residential" },
  { id: "gutter", name: "Gutter Cleaning", desc: "Unclog, flush and inspect. Protect your home before storm season.", tag: null, img: "/images/soft-wash.jpg", kind: "residential" },
  { id: "window", name: "Window Cleaning", desc: "Streak-free interior + exterior glass, screens and sills.", tag: null, img: "/images/commercial-windows.jpg", kind: "residential" },
  { id: "solar", name: "Solar Panel Cleaning", desc: "Restore up to 25% lost output. Safe, deionised-water process.", tag: null, img: "/images/drone-aerial.jpg", kind: "residential" },
  { id: "driveway", name: "Driveway Cleaning", desc: "Oil, rust, tyre marks — lifted with commercial-grade pressure.", tag: null, img: "/images/commercial-aerial.jpg", kind: "residential" },
  { id: "strata", name: "Strata Cleaning", desc: "Common areas, car parks, facades. Scheduled or on-demand.", tag: "Commercial", img: "/images/wsi-team.jpg", kind: "commercial" },
  { id: "deck", name: "Deck & Patio", desc: "Timber, composite and tile — revived without damage.", tag: null, img: "/images/glass-wash.jpg", kind: "residential" },
  { id: "render", name: "Concrete Render", desc: "Deep-clean painted and rendered surfaces. No chipping.", tag: null, img: "/images/house-wash.jpg", kind: "residential" },
  { id: "tennis", name: "Tennis Court", desc: "Acrylic-safe cleaning. Courts return bouncing true.", tag: null, img: "/images/pressure-cleaning.jpg", kind: "commercial" },
  { id: "commercial", name: "Commercial Buildings", desc: "High-access facade work for offices, retail and hospitality.", tag: "Commercial", img: "/images/commercial-windows.jpg", kind: "commercial" },
  { id: "pest", name: "Pest Control", desc: "General pest treatments for homes and businesses.", tag: null, img: "/images/soft-wash.jpg", kind: "residential" },
  { id: "newbuild", name: "Newbuild Cleaning", desc: "Post-construction clean, inside and out. Handover ready.", tag: null, img: "/images/residential-aerial.jpg", kind: "residential" },
  { id: "presale", name: "Presale Cleaning", desc: "Kerb-appeal package for agents and sellers. Sells faster.", tag: null, img: "/images/commercial-pressure.jpg", kind: "residential" },
];

export function ServicesSection() {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial">("all");

  const filters = useMemo(
    () => [
      { id: "all" as const, label: "All services", count: SERVICES.length },
      { id: "residential" as const, label: "Residential", count: SERVICES.filter((s) => s.kind === "residential").length },
      { id: "commercial" as const, label: "Commercial", count: SERVICES.filter((s) => s.kind === "commercial").length },
    ],
    []
  );

  const filtered = filter === "all" ? SERVICES : SERVICES.filter((s) => s.kind === filter);

  return (
    <section className="services" id="services">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            What we clean
          </span>
          <h2 className="section-title">
            One team. <em className="hl-orange">Fifteen</em> services.
            <br />
            Every surface your property owns.
          </h2>
        </div>
        <div className="section-head-right">
          <p>
            From a single window to a 40-unit strata complex — we bring the
            equipment, the chemistry, and the crew. Quoted in 24 hours, on-site
            within the week.
          </p>
          <a className="btn btn-dark btn-md" href="#quote">
            Request a quote →
          </a>
        </div>
      </div>

      <div className="services-filters">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`filter-chip ${filter === f.id ? "active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <span className="chip-count">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filtered.map((s, i) => (
          <a key={s.id} href="#quote" className="service-card">
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
                <span>Learn more</span>
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
          </a>
        ))}
      </div>
    </section>
  );
}
