"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function getLinkLabel(link: HTMLAnchorElement) {
  return link.getAttribute("aria-label") || link.textContent?.trim() || "";
}

export function TrackingEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href") || "";
      const label = getLinkLabel(link);

      if (href.startsWith("tel:")) {
        trackEvent("click_call", {
          link_text: label,
          link_url: href,
          page_path: window.location.pathname,
        });
        return;
      }

      if (href === "#quote" || href.endsWith("/#quote")) {
        trackEvent("click_quote_cta", {
          link_text: label,
          link_url: href,
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
