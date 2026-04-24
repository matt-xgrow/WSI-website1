const STEPS = [
  { n: "01", t: "You request a quote", b: "Two minutes, no phone call required. Upload a photo if you have one.", time: "~2 min" },
  { n: "02", t: "We price it in 24 hours", b: "Fixed quote back to you by end of next business day. No hidden fees.", time: "24 hours" },
  { n: "03", t: "We schedule the job", b: "Most jobs start within the week. You'll know our arrival window the day before.", time: "Same week" },
  { n: "04", t: "We clean and walk you through", b: "Job photographed at start and finish. Paid only once you're happy.", time: "On site" },
];

export function Process() {
  return (
    <section className="process">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            How it works
          </span>
          <h2 className="section-title">
            From first click to
            <br />
            <em className="hl-orange">clean</em>, in four steps.
          </h2>
        </div>
      </div>

      <div className="process-grid">
        {STEPS.map((s, i) => (
          <div key={s.n} className="process-step">
            <div className="process-line-row">
              <span className="process-num">{s.n}</span>
              {i < STEPS.length - 1 && <span className="process-line" />}
            </div>
            <div className="process-body">
              <div className="process-time">{s.time}</div>
              <h4 className="process-title">{s.t}</h4>
              <p className="process-desc">{s.b}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
