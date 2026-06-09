"use client";

type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
    clarity?: (command: "event", eventName: string) => void;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, params);
  window.clarity?.("event", eventName);
}

export function trackLeadSubmitted(params: AnalyticsParams = {}) {
  trackEvent("generate_lead", {
    currency: "AUD",
    value: 0,
    ...params,
  });
}
