"use client";

import Image from "next/image";
import { useState } from "react";

type Slide = {
  id: number;
  title: string;
  service: string;
  src: string;
};

const SLIDES: Slide[] = [
  {
    id: 0,
    title: "Driveway restoration",
    service: "Pressure Washing",
    src: "/images/before-after/driveway-1.jpg",
  },
  {
    id: 1,
    title: "Concrete recovery",
    service: "Pressure Washing",
    src: "/images/before-after/driveway-2.jpg",
  },
];

export function BeforeAfter() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((p) => (p + 1) % SLIDES.length);
  const prev = () => setIndex((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section className="before-after" id="gallery">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Real results
          </span>
          <h2 className="section-title">
            See the <em className="hl-orange">difference</em> we make.
          </h2>
        </div>
        <div className="section-head-right">
          <p>
            Real before-and-after photos from jobs across Brisbane, Gold Coast and
            the Sunshine Coast. Same surface, same day — just our crew, our
            chemistry and the right pressure.
          </p>
        </div>
      </div>

      <div className="ba-stage">
        <div className="ba-frame">
          <Image
            key={slide.id}
            src={slide.src}
            alt={`${slide.title} — before and after`}
            fill
            sizes="(max-width: 900px) 100vw, 1100px"
            className="ba-img"
            priority
          />
          <span className="ba-tag ba-tag-before">BEFORE</span>
          <span className="ba-tag ba-tag-after">AFTER</span>

          <button
            type="button"
            onClick={prev}
            className="ba-arrow ba-arrow-left"
            aria-label="Previous result"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="ba-arrow ba-arrow-right"
            aria-label="Next result"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="ba-meta">
          <div>
            <div className="eyebrow-sm">{slide.service}</div>
            <h3 className="ba-title">{slide.title}</h3>
          </div>
          <div className="ba-dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`ba-dot ${i === index ? "active" : ""}`}
                aria-label={`Show result ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
