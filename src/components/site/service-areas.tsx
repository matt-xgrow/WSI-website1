"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type AreaKey = "brisbane" | "sunshine-coast" | "gold-coast";

const AREAS: Record<AreaKey, {
  name: string;
  state: string;
  suburbs: string[];
  stats: { jobs: string; reviews: string; response: string };
}> = {
  brisbane: {
    name: "Brisbane",
    state: "QLD",
    suburbs: ["New Farm", "Hamilton", "Ascot", "Bulimba", "Teneriffe", "Paddington", "Toowong", "Indooroopilly", "Chelmer", "Graceville", "Wilston", "Clayfield"],
    stats: { jobs: "1,800+", reviews: "68", response: "24h" },
  },
  "gold-coast": {
    name: "Gold Coast",
    state: "QLD",
    suburbs: ["Broadbeach", "Surfers Paradise", "Burleigh Heads", "Mermaid Beach", "Robina", "Palm Beach", "Coolangatta", "Paradise Point", "Sanctuary Cove", "Isle of Capri"],
    stats: { jobs: "920+", reviews: "24", response: "24h" },
  },
  "sunshine-coast": {
    name: "Sunshine Coast",
    state: "QLD",
    suburbs: ["Noosa", "Maroochydore", "Mooloolaba", "Caloundra", "Coolum", "Peregian", "Buderim", "Sunrise Beach", "Twin Waters"],
    stats: { jobs: "410+", reviews: "12", response: "48h" },
  },
};

export function ServiceAreas() {
  const [active, setActive] = useState<AreaKey>("brisbane");
  const a = AREAS[active];

  return (
    <section className="areas" id="areas">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Where we work
          </span>
          <h2 className="section-title">
            We work across <em className="hl-orange">Queensland</em>.
          </h2>
        </div>
        <div className="section-head-right">
          <p>
            Three metro hubs, dozens of suburbs. Click a city to see what
            we&rsquo;ve been up to there recently.
          </p>
        </div>
      </div>

      <div className="areas-layout">
        <div className="areas-list">
          {(Object.entries(AREAS) as [AreaKey, typeof AREAS["brisbane"]][]).map(([id, data]) => (
            <button
              key={id}
              type="button"
              className={`area-item ${active === id ? "active" : ""}`}
              onClick={() => setActive(id)}
            >
              <div className="area-item-left">
                <span className="area-state">{data.state}</span>
                <span className="area-name">{data.name}</span>
              </div>
              <span className="area-arrow">→</span>
            </button>
          ))}
        </div>

        <div className="areas-detail">
          <div className="areas-map">
            <MapSVG active={a.name} />
          </div>

          <div className="areas-detail-body">
            <div className="areas-detail-head">
              <div>
                <div className="eyebrow-sm">Service area · {a.state}</div>
                <h3 className="areas-city">{a.name}</h3>
              </div>
              <a href={site.phoneHref} className="btn btn-dark btn-sm">
                Book in {a.name.split(" ")[0]} →
              </a>
            </div>

            <div className="areas-stats">
              <div>
                <div className="area-stat-num">{a.stats.jobs}</div>
                <div className="area-stat-lbl">Jobs completed</div>
              </div>
              <div>
                <div className="area-stat-num">{a.stats.reviews}</div>
                <div className="area-stat-lbl">Local 5★ reviews</div>
              </div>
              <div>
                <div className="area-stat-num">{a.stats.response}</div>
                <div className="area-stat-lbl">Quote turnaround</div>
              </div>
            </div>

            <div className="areas-suburbs">
              <div className="eyebrow-sm">Suburbs we cover</div>
              <div className="suburb-tags">
                {a.suburbs.map((s) => (
                  <span key={s} className="suburb-tag">{s}</span>
                ))}
                <span className="suburb-tag suburb-tag-more">+ more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSVG({ active }: { active: string }) {
  return (
    <div className="map-wrap">
      <svg viewBox="0 0 400 440" className="map-svg" aria-hidden="true">
        <defs>
          <pattern id="mgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
          </pattern>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.06" />
          </filter>
        </defs>
        <rect width="400" height="440" fill="url(#mgrid)" />
        <path
          d="M 230 30 Q 260 90 255 140 Q 250 180 240 220 Q 230 270 210 320 Q 190 370 160 410 Q 130 440 100 430 L 90 410 Q 110 360 130 310 Q 150 250 170 190 Q 190 130 210 70 Q 220 40 230 30 Z"
          fill="url(#mapGradient)"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
        <MapPin x={235} y={110} label="Sunshine Coast" active={active === "Sunshine Coast"} />
        <MapPin x={210} y={230} label="Brisbane" active={active === "Brisbane"} />
        <MapPin x={165} y={350} label="Gold Coast" active={active === "Gold Coast"} />
      </svg>
      <div className="map-legend">
        <span className="map-legend-dot" />
        <span>Service hubs · QLD</span>
      </div>
    </div>
  );
}

function MapPin({ x, y, label, active }: { x: number; y: number; label: string; active: boolean }) {
  return (
    <g>
      {active && (
        <>
          <circle cx={x} cy={y} r={32} fill="currentColor" opacity="0.06">
            <animate attributeName="r" values="16;36;16" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0;0.15" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r={18} fill="currentColor" opacity="0.1" />
        </>
      )}
      <g transform={`translate(${x - 12}, ${y - 24})`}>
        <path
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
          fill={active ? "var(--cyan)" : "currentColor"}
          stroke="white"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="10" r="3.5" fill="white" />
      </g>
      <text
        x={x + 16}
        y={y - 8}
        fontSize="14"
        fill="currentColor"
        fontWeight={active ? 600 : 400}
      >
        {label}
      </text>
    </g>
  );
}
