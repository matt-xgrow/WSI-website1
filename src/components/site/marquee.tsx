const MARQUEE_ITEMS = [
  "Greater Brisbane",
  "$20M insured",
  "Rated 4.9 on Google",
  "Same-week bookings",
  "Afterpay accepted",
  "10+ years trading",
  "Soft-wash specialists",
];

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((it) => (
          <span key={it} className="marquee-item">
            <span className="marquee-dot">◆</span>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
