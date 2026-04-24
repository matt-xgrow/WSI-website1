"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cta ${visible ? "visible" : ""}`}>
      <a href={site.phoneHref} className="sticky-call" aria-label="Call WSI Cleaning">
        <PhoneIcon width={16} height={16} />
      </a>
      <a href="#quote" className="sticky-quote">
        Get a free quote
        <span>→</span>
      </a>
    </div>
  );
}
