"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const JOBS = [
  {
    id: 0,
    label: "Driveway · Pressure wash",
    location: "Ascot, QLD",
    duration: "3h 20m",
    surface: "95m² concrete",
    before: "/images/soft-wash.jpg",
    after: "/images/commercial-pressure.jpg",
  },
  {
    id: 1,
    label: "House · Soft wash",
    location: "Broadbeach, QLD",
    duration: "6h 00m",
    surface: "220m² render",
    before: "/images/window-clean.jpg",
    after: "/images/residential-aerial.jpg",
  },
  {
    id: 2,
    label: "Commercial · Exterior",
    location: "New Farm, QLD",
    duration: "4h 15m",
    surface: "180m² facade",
    before: "/images/house-wash.jpg",
    after: "/images/commercial-windows.jpg",
  },
];

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [activeJob, setActiveJob] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      handleMove(x);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [handleMove]);

  const job = JOBS[activeJob];

  return (
    <section className="ba-section" id="gallery">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            The receipts
          </span>
          <h2 className="section-title">Drag to see the difference.</h2>
        </div>
        <div className="section-head-right">
          <p>
            Every job photographed at arrival and completion. No filters, no
            retouching — just the honest delta between ten years of dirt and
            two hours of work.
          </p>
        </div>
      </div>

      <div className="ba-inner">
        <div className="ba-layout">
          <div>
            <div
              ref={containerRef}
              className="ba-viewer"
              onMouseDown={(e) => {
                draggingRef.current = true;
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                draggingRef.current = true;
                handleMove(e.touches[0].clientX);
              }}
            >
              <div className="ba-after">
                <Image src={job.after} alt={`${job.label} — after`} fill sizes="60vw" className="ba-img" />
              </div>
              <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Image src={job.before} alt={`${job.label} — before`} fill sizes="60vw" className="ba-img" />
                <div className="ba-before-tint" />
              </div>
              <div className="ba-divider" style={{ left: `${pos}%` }}>
                <div className="ba-handle">
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                    <path d="M9 6 L5 12 L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 6 L19 12 L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="ba-label ba-label-before">BEFORE</div>
              <div className="ba-label ba-label-after">AFTER</div>
            </div>

            <div className="ba-meta">
              <div>
                <div className="ba-meta-label">Job</div>
                <div className="ba-meta-value">{job.label}</div>
              </div>
              <div>
                <div className="ba-meta-label">Location</div>
                <div className="ba-meta-value">{job.location}</div>
              </div>
              <div>
                <div className="ba-meta-label">Completed in</div>
                <div className="ba-meta-value">{job.duration}</div>
              </div>
            </div>
          </div>

          <div className="ba-thumbs">
            <div className="ba-thumbs-head">
              <span className="eyebrow-sm">Recent jobs</span>
              <span className="ba-count">{activeJob + 1} / {JOBS.length}</span>
            </div>
            {JOBS.map((j, i) => (
              <button
                key={j.id}
                type="button"
                className={`ba-thumb ${i === activeJob ? "active" : ""}`}
                onClick={() => setActiveJob(i)}
              >
                <div className="ba-thumb-img">
                  <Image src={j.after} alt={j.label} width={136} height={136} className="ba-thumb-photo" />
                </div>
                <div className="ba-thumb-body">
                  <div className="ba-thumb-title">{j.label}</div>
                  <div className="ba-thumb-meta">
                    {j.location} · {j.duration}
                  </div>
                </div>
                <span className="ba-thumb-arrow">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
