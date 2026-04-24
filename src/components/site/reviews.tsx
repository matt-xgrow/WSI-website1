"use client";

import { useState } from "react";
import { StarIcon } from "./icons";

const REVIEWS = [
  { name: "Kate Plokstys", suburb: "Ascot, QLD", text: "Jay went above and beyond to remove years worth of algae, mould and grime from our house. Worked meticulously for hours on end and we couldn't be happier with the results.", service: "House wash" },
  { name: "Sarah Kelly", suburb: "Bulimba, QLD", text: "Exceptional window clean on very short notice — arrived within a few hours of my initial call. Already booking in again in a few months.", service: "Window cleaning" },
  { name: "Benjamin Ghibely", suburb: "Broadbeach, QLD", text: "My company has been using WSI regularly for years to clean our office. Efficient, professional, and I look forward to working with them for years to come.", service: "Commercial" },
  { name: "Daniel Broilo", suburb: "New Farm, QLD", text: "An excellent company that offers a high standard of quality service. The management team is very responsive and takes care that everything agreed will be accomplished.", service: "Pressure wash" },
  { name: "Tais Sombini", suburb: "Mosman, NSW", text: "Easy to book, arrived on time, reasonable price and very efficient. WSI go the extra mile to make customers happy.", service: "Soft wash" },
  { name: "Stephanus Potgieter", suburb: "Noosa, QLD", text: "Very decent, trustworthy and does a fantastic job. Will definitely make use of the team again.", service: "Roof cleaning" },
];

export function Reviews() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((idx + 1) % REVIEWS.length);
  const prev = () => setIdx((idx - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section className="reviews" id="reviews">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Five stars, one hundred times
          </span>
          <h2 className="section-title">
            Homeowners and managers
            <br />
            who&rsquo;d book us <em className="hl-orange">again</em>.
          </h2>
        </div>
        <div className="section-head-right">
          <div className="reviews-score">
            <div className="score-main">
              <span className="score-num">4.9</span>
              <span className="score-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={16} height={16} />
                ))}
              </span>
            </div>
            <div className="score-label">Based on 100+ Google reviews</div>
            <div className="reviews-nav">
              <button type="button" onClick={prev} aria-label="Previous review">←</button>
              <button type="button" onClick={next} aria-label="Next review">→</button>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-track-wrap">
        <div
          className="reviews-track"
          style={{ transform: `translateX(calc(-${idx} * (360px + 20px)))` }}
        >
          {REVIEWS.map((r) => (
            <article key={r.name} className="review-card">
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={13} height={13} />
                ))}
              </div>
              <blockquote className="review-text">&ldquo;{r.text}&rdquo;</blockquote>
              <div className="review-author">
                <div className="review-avatar">
                  {r.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-meta">
                    {r.suburb} · {r.service}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
