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
    title: "Driveway Pressure Washing and Cleaning in Brisbane",
    description:
      "Get professional driveway pressure washing and Cleaning in Brisbane with WSI Cleaning. Remove dirt, stains, mould and grime to restore your driveway’s clean appearance.",
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
    title: "Commercial Pressure Cleaning Brisbane | WSI Cleaning",
    description:
      "Get professional commercial pressure cleaning in Brisbane from WSI Cleaning. Remove dirt, grime and stains with reliable cleaning services for your business.",
    h1: "Commercial Buildings",
  },
  "/brisbane/": {
    title: "Brisbane Exterior Cleaning Services | WSI Cleaning",
    description:
      "Get professional Brisbane exterior cleaning from WSI Cleaning. Keep your home or business looking fresh with reliable pressure washing and exterior cleaning.",
  },
  "/sunshine-coast/": {
    title: "Sunshine Coast - WSI Cleaning",
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
      "Terms of use for the WSI Cleaning website and exterior cleaning services in Brisbane and the Sunshine Coast.",
  },
  "/contact/": {
    title: "Contact - WSI Cleaning",
    description:
      "Request a fixed quote from WSI Cleaning or call 0451 371 212. Exterior cleaning across Brisbane and the Sunshine Coast.",
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
