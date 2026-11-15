/** On-page titles and descriptions from the Nov 2026 live-site baseline. */

export type BaselineMeta = {
  title: string;
  description?: string;
  /** Visible H1 when it differs from the service name. */
  h1?: string;
};

export const BASELINE_META: Record<string, BaselineMeta> = {
  "/": {
    title: "Commercial & Residential Exterior Pressure Cleaning In Brisbane",
    description:
      "Professional commercial and residential exterior pressure cleaning in Brisbane. WSI Cleaning removes dirt, mould, grime and stains for a cleaner property.",
  },
  "/house-washing/": {
    title: "Brisbane House Washing Services | WSI Cleaning Experts",
    description:
      "Get professional Brisbane house washing from WSI Cleaning. Remove dirt, mould, grime and buildup with reliable exterior cleaning that keeps your home looking fresh.",
  },
  "/pressure-washing/": {
    title: "Pressure Washing Brisbane | Driveways, Paths & Hard Surfaces",
    description:
      "Professional pressure washing in Brisbane for driveways, paths, patios and hard surfaces. Oil, mould and grime removed. Fixed-price quotes from WSI Cleaning.",
    h1: "Pressure washing in Brisbane for driveways and hard surfaces",
  },
  "/driveway-cleaning/": {
    title: "Driveway Cleaning - WSI Cleaning",
  },
  "/roof-cleaning/": {
    title: "Roof Cleaning - WSI Cleaning",
  },
  "/gutter-cleaning/": {
    title: "Gutter Cleaning - WSI Cleaning",
  },
  "/window-cleaning/": {
    title: "Window Cleaning - WSI Cleaning",
  },
  "/solar-panel-cleaning/": {
    title: "Solar Panel Cleaning - WSI Cleaning",
  },
  "/strata-cleaning/": {
    title: "Strata Cleaning - WSI Cleaning",
  },
  "/commercial-cleaning/": {
    title: "Commercial Pressure Cleaning Brisbane | Building Washing",
    description:
      "Commercial pressure cleaning and building washing in Brisbane for shopfronts, warehouses and facades, including after-hours work. Fixed-price quotes from WSI.",
    h1: "Commercial pressure cleaning and building washing in Brisbane",
  },
  "/brisbane/": {
    title: "Exterior Cleaning Brisbane | House, Driveway & Commercial",
    description:
      "House washing, driveway pressure washing and commercial pressure washing across Greater Brisbane, Logan and Ipswich. Fixed-price quotes from WSI Cleaning.",
    h1: "Exterior cleaning in Brisbane",
  },
  "/about-us/": {
    title: "About Us - WSI Cleaning",
  },
  "/gallery/": {
    title: "Gallery - WSI Cleaning",
  },
  "/guides/": {
    title: "Guides - WSI Cleaning",
  },
  "/privacy-policy/": {
    title: "Privacy Policy - WSI Cleaning",
    description:
      "How WSI Cleaning collects, uses and stores personal information submitted through wsicleaning.com, including quote requests.",
  },
  "/terms/": {
    title: "Terms - WSI Cleaning",
    description:
      "Terms of use for the WSI Cleaning website and exterior cleaning services in Greater Brisbane.",
  },
  "/contact/": {
    title: "Contact - WSI Cleaning",
    description:
      "Request a fixed quote from WSI Cleaning or call 0451 371 212. Exterior cleaning across Greater Brisbane.",
  },
  "/thank-you/": {
    title: "Thank you - WSI Cleaning",
    description:
      "Your WSI Cleaning quote request has been received. We will contact you within 24 business hours.",
  },
  "/house-washing-brisbane/": {
    title: "House Washing Brisbane - WSI Cleaning",
    description:
      "Exterior cleaning in Brisbane from WSI Cleaning. House washing, pressure cleaning, windows, gutters and roofs. Fixed quotes, $20M insured.",
  },
  "/house-washing-brisbane-lp/": {
    title: "House Washing Brisbane - WSI Cleaning",
    description:
      "Professional house washing in Brisbane using safe soft-wash methods for render, brick, weatherboard and painted exteriors. $20M insured, 4.9/5 Google rating, free fixed quote.",
  },
  "/pressure-washing-brisbane-lp/": {
    title: "Pressure Washing Brisbane - WSI Cleaning",
    description:
      "Professional pressure washing in Brisbane for driveways, concrete, patios, pavers and hard exterior surfaces. $20M insured, 4.9/5 Google rating, free fixed quote.",
  },
  "/window-cleaning-brisane-lp/": {
    title: "Window Cleaning Brisbane - WSI Cleaning",
    description:
      "Professional window cleaning in Brisbane for homes, offices and shopfronts. Streak-free glass, frames and sills. $20M insured, free fixed quote.",
  },
};

export const NOINDEX_PATHS = [
  "/thank-you/",
  "/house-washing-brisbane/",
  "/house-washing-brisbane-lp/",
  "/pressure-washing-brisbane-lp/",
  "/window-cleaning-brisane-lp/",
] as const;

export function baselineFor(path: string): BaselineMeta | undefined {
  if (path === "/") return BASELINE_META["/"];
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return BASELINE_META[withSlash];
}
