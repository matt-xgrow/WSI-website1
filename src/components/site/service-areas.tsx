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
            <MapSVG active={a.name} onSelect={setActive} />
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

function MapSVG({ active, onSelect }: { active: string; onSelect: (k: AreaKey) => void }) {
  return (
    <div className="map-wrap">
      <svg viewBox="0 0 600 600" className="map-svg" aria-hidden="true">
        <defs>
          <pattern id="mgrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#1F2A66" strokeWidth="0.4" opacity="0.08" />
          </pattern>
          <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DCEEFB" />
            <stop offset="100%" stopColor="#EAF4FB" />
          </linearGradient>
          <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18" />
          </filter>
          <filter id="labelShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Sea background */}
        <rect width="600" height="600" fill="url(#seaGradient)" />
        {/* Subtle grid */}
        <rect width="600" height="600" fill="url(#mgrid)" />

        {/* Coastline (the curved line representing the QLD coast) */}
        <path
          d="M 540 -20 C 480 60, 520 130, 470 200 C 430 260, 450 320, 380 380 C 320 430, 360 500, 300 560 C 270 590, 240 620, 220 640"
          fill="none"
          stroke="#3DC6ED"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* QLD / NSW border (dashed diagonal line) */}
        <path
          d="M 320 -20 C 300 120, 280 260, 240 420 C 220 500, 200 560, 180 620"
          fill="none"
          stroke="#1F2A66"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity="0.35"
        />

        {/* State labels */}
        <text x="60" y="500" fontFamily="var(--font-mono)" fontSize="14" fill="#1F2A66" fontWeight="600" letterSpacing="3" opacity="0.45">Q L D</text>
        <text x="60" y="555" fontFamily="var(--font-mono)" fontSize="14" fill="#1F2A66" fontWeight="600" letterSpacing="3" opacity="0.45">N S W</text>

        {/* Pins */}
        <MapPin x={420} y={130} label="Sunshine Coast" active={active === "Sunshine Coast"} onSelect={() => onSelect("sunshine-coast")} />
        <MapPin x={380} y={310} label="Brisbane" active={active === "Brisbane"} onSelect={() => onSelect("brisbane")} />
        <MapPin x={340} y={485} label="Gold Coast" active={active === "Gold Coast"} onSelect={() => onSelect("gold-coast")} />
      </svg>
      <div className="map-legend">Tap a region to see local services</div>
    </div>
  );
}

function MapPin({ x, y, label, active, onSelect }: { x: number; y: number; label: string; active: boolean; onSelect: () => void }) {
  const labelWidth = label.length * 7.5 + 22;
  return (
    <g style={{ cursor: "pointer" }} onClick={onSelect}>
      {/* Pulse ring on active */}
      {active && (
        <circle cx={x} cy={y} r={22} fill="#F7941E" opacity="0.2">
          <animate attributeName="r" values="14;30;14" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="2.2s" repeatCount="indefinite" />
        </circle>
      )}
      {/* Halo */}
      <circle cx={x} cy={y} r={16} fill="white" opacity="0.9" filter="url(#pinShadow)" />
      {/* Outer ring */}
      <circle cx={x} cy={y} r={13} fill="none" stroke="#F7941E" strokeWidth="2.5" />
      {/* Inner dot */}
      <circle cx={x} cy={y} r={6.5} fill="#F7941E" />

      {/* Label pill */}
      <g transform={`translate(${x + 22}, ${y - 14})`} filter="url(#labelShadow)">
        <rect width={labelWidth} height={28} rx={14} fill="#15204E" />
        <text
          x={labelWidth / 2}
          y={18}
          textAnchor="middle"
          fontSize="13"
          fill="white"
          fontWeight="500"
          fontFamily="var(--font-display)"
        >
          {label}
        </text>
      </g>
    </g>
  );
}
