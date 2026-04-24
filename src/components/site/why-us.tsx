const WHY_ITEMS = [
  {
    num: "01",
    title: "$20M public liability",
    body: "Every job covered by a $20 million public liability policy. Certificates issued on request for strata, commercial and government work.",
    meta: "Insured since 2014",
  },
  {
    num: "02",
    title: "Soft-wash certified",
    body: "We train our crew on surface chemistry — not just pressure. Render, paint and roof tiles leave our site intact.",
    meta: "No high-pressure damage",
  },
  {
    num: "03",
    title: "Fixed quotes",
    body: "Priced per surface, not per hour. You see the number before we start, and it doesn't move once we do.",
    meta: "No surprise invoices",
  },
  {
    num: "04",
    title: "Same-week bookings",
    body: "Quote in 24 hours. Most jobs scheduled within the week. Storm-response crew on call for emergencies.",
    meta: "Fast turnaround",
  },
];

export function WhyUs() {
  return (
    <section className="why" id="about">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow eyebrow-light">
            <span className="eyebrow-line" />
            Why WSI
          </span>
          <h2 className="section-title section-title-light">
            A decade of cleaning houses
            <br />
            has taught us what matters.
          </h2>
        </div>
        <div className="section-head-right section-head-right-light">
          <p>
            Plenty of operators own a pressure washer. What separates us is the
            boring stuff — the insurance certificates, the fixed pricing, the
            crew who turns up when they said they would.
          </p>
        </div>
      </div>

      <div className="why-grid">
        {WHY_ITEMS.map((it) => (
          <div key={it.num} className="why-card">
            <div className="why-num">{it.num}</div>
            <h3 className="why-title">{it.title}</h3>
            <p className="why-body">{it.body}</p>
            <div className="why-meta">
              <span className="why-meta-dot" />
              {it.meta}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
