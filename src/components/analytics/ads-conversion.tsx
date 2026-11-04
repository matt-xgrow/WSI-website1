"use client";

import { useEffect } from "react";
import { GOOGLE_ADS_CONVERSION_LABEL, GOOGLE_ADS_ID } from "@/lib/tracking";

/**
 * Fires the Google Ads conversion on /thank-you/ when a real label is configured.
 * The live site still uses the placeholder AW-CONVERSION_ID/CONVERSION_LABEL, which does not record.
 * Set NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL to the label from Google Ads (the part after the slash).
 */
export function AdsConversion() {
  const label = GOOGLE_ADS_CONVERSION_LABEL;

  useEffect(() => {
    if (!label) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: `${GOOGLE_ADS_ID}/${label}`,
        });
        window.clearInterval(timer);
      } else if (attempts > 20) {
        window.clearInterval(timer);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [label]);

  return null;
}
