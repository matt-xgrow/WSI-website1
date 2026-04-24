"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";
import { site } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="faq" id="faq">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            The small print
          </span>
          <h2 className="section-title">
            Questions we get every <em className="hl-orange">week</em>.
          </h2>
        </div>
        <div className="section-head-right">
          <p>
            Still unsure? Call {site.phoneDisplay} or drop us a line. We get
            back to you within a few hours during business days.
          </p>
        </div>
      </div>

      <div className="faq-list">
        {FAQ_ITEMS.map((f, i) => (
          <div key={f.q} className={`faq-item ${open === i ? "open" : ""}`}>
            <button className="faq-q" type="button" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="faq-num">Q{String(i + 1).padStart(2, "0")}</span>
              <span className="faq-qtext">{f.q}</span>
              <span className="faq-plus">{open === i ? "−" : "+"}</span>
            </button>
            <div className="faq-a-wrap">
              <p className="faq-a">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
