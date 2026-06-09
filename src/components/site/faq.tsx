import { FAQ_ITEMS } from "@/lib/faq";
import { site } from "@/lib/site";

export function FAQ() {
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
          <details
            key={f.q}
            name="homepage-faq"
            className="faq-item"
            open={i === 0}
          >
            <summary className="faq-q">
              <span className="faq-num">Q{String(i + 1).padStart(2, "0")}</span>
              <span className="faq-qtext">{f.q}</span>
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="faq-a-wrap">
              <p className="faq-a">{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
