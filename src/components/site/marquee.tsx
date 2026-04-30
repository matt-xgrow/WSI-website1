const MARQUEE_ITEMS = [
  "Brisbane",
  "Sunshine Coast",
  "$20M insured",
  "100+ ★ reviews",
  "Same-week bookings",
  "Afterpay accepted",
  "10+ years trading",
  "Soft-wash specialists",
];

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((it, i) => (
          <span key={`${it}-${i}`} className="marquee-item">
            <span className="marquee-dot">◆</span>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
