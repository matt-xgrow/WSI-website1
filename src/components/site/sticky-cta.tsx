"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [quoteHref, setQuoteHref] = useState("#quote");

  useEffect(() => {
    // Pages that render <QuoteSection> have a local #quote anchor; the rest
    // (e.g. guides) must jump back to the homepage form.
    const quote = document.getElementById("quote");
    setQuoteHref(quote ? "#quote" : "/#quote");

    let formInView = false;
    const update = () => setVisible(window.scrollY > 350 && !formInView);

    update();
    window.addEventListener("scroll", update, { passive: true });

    // Hide the bar while the form is on screen so it never covers the fields.
    let observer: IntersectionObserver | undefined;
    if (quote) {
      observer = new IntersectionObserver(
        ([entry]) => {
          formInView = entry.isIntersecting;
          update();
        },
        { rootMargin: "0px 0px -25% 0px" },
      );
      observer.observe(quote);
    }

    return () => {
      window.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className={`sticky-cta ${visible ? "visible" : ""}`}>
      <a
        href={site.phoneHref}
        className="sticky-call"
        aria-label={`Call WSI Cleaning on ${site.phoneDisplay}`}
      >
        <PhoneIcon width={16} height={16} />
        <span className="sticky-call-label">Call now</span>
      </a>
      <a href={quoteHref} className="sticky-quote">
        Get a free quote
        <span className="sticky-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
