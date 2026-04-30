function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
export const IS_PRODUCTION_HOST =
  process.env.VERCEL_ENV === "production" ||
  (!!process.env.NEXT_PUBLIC_SITE_URL && !process.env.VERCEL_ENV);

const FOUNDING_YEAR = 2014;
const CURRENT_YEAR = new Date().getFullYear();
const YEARS_IN_BUSINESS = CURRENT_YEAR - FOUNDING_YEAR;

export const site = {
  name: "WSI Cleaning",
  legalName: "WSI Cleaning Services",
  url: SITE_URL,
  phoneDisplay: "0426 400 029",
  phoneE164: "+61426400029",
  phoneHref: "tel:+61426400029",
  email: "info@wsicleaning.com",
  abn: "14 608 887 850",
  abnDisplay: "14 608 887 850",
  foundingYear: FOUNDING_YEAR,
  yearsInBusiness: YEARS_IN_BUSINESS,
  experienceLabel: `${YEARS_IN_BUSINESS}+ years`,
  rating: "4.9",
  reviewCount: 162,
  reviewCountLabel: "162",
  insuranceAmount: 20_000_000,
  insuranceLabel: "$20M public liability insurance",
  areas: ["Brisbane", "Sunshine Coast"],
  primaryArea: "Brisbane",
  socialLinks: [] as string[],
};

export const CONTENT_UPDATED = {
  home: "2026-04-26",
  services: "2026-04-26",
  locations: "2026-04-26",
  gallery: "2026-04-26",
  about: "2026-04-26",
  guides: "2026-04-26",
} as const;

export const services = [
  {
    slug: "house-washing",
    name: "House Washing",
    eyebrow: "Priority service",
    title: "House Washing Services",
    description:
      "Soft washing for rendered, painted, brick and weatherboard homes, built to remove mould, algae and grime without blasting delicate surfaces.",
    image: "/images/house-wash.jpg",
    intent:
      "For homeowners who want the exterior refreshed before sale, inspection, repainting or seasonal maintenance.",
    proof: "Gentle method, visible curb appeal, safer for painted and rendered surfaces.",
    tags: ["house-wash"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    eyebrow: "High-demand service",
    title: "Pressure Washing Services",
    description:
      "Professional pressure washing for driveways, paths, patios, pool surrounds and hard exterior surfaces where dirt, oil and organic growth have built up.",
    image: "/images/pressure-cleaning.jpg",
    intent: "For properties with concrete, pavers or outdoor areas that need a strong, even clean.",
    proof: "Right pressure for each surface, commercial-grade equipment, tidy finish.",
    tags: ["pressure-washing"],
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    eyebrow: "Residential and commercial",
    title: "Window Cleaning Services",
    description:
      "Interior and exterior window cleaning for homes, offices, shopfronts and body corporate properties.",
    image: "/images/window-cleaning.jpg",
    intent: "For clear glass, better natural light and a cleaner-looking property from the street.",
    proof: "Streak-conscious process, frames and sills considered, suitable for repeat maintenance.",
    tags: ["window-cleaning"],
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    eyebrow: "Maintenance service",
    title: "Gutter Cleaning Services",
    description:
      "Gutter cleaning for homes and small commercial properties, helping reduce overflow, blockages and water damage risks during storm season.",
    image: "/images/gutter-cleaning.jpg",
    intent: "For homeowners who need roofline maintenance before heavy rain or after leaf build-up.",
    proof: "Debris removal, downpipe awareness and safety-first access planning.",
    tags: ["gutter-cleaning"],
  },
  {
    slug: "roof-cleaning",
    name: "Roof Cleaning",
    eyebrow: "Specialized service",
    title: "Roof Cleaning Services",
    description: "Safe and effective roof cleaning for tiles, metal, and terracotta roofs, removing moss, lichen, and dirt build-up.",
    image: "/images/soft-wash.jpg",
    intent: "For homeowners looking to restore their roof's appearance and prevent long-term damage from organic growth.",
    proof: "Safety-first approach, soft wash techniques for delicate tiles, and high-pressure options for metal roofs.",
    tags: ["roof-cleaning"],
  },
  {
    slug: "driveway-cleaning",
    name: "Driveway Cleaning",
    eyebrow: "Curb appeal boost",
    title: "Driveway Cleaning Services",
    description: "High-pressure driveway cleaning to remove oil stains, tyre marks, dirt, and mould from concrete, exposed aggregate, and pavers.",
    image: "/images/pressure-cleaning.jpg",
    intent: "For properties needing an instant facelift to their entrance or removing slippery moss and algae.",
    proof: "Surface cleaners for even results, commercial-grade pressure washers, and specialized stain treatments.",
    tags: ["driveway-cleaning"],
  },
  {
    slug: "solar-panel-cleaning",
    name: "Solar Panel Cleaning",
    eyebrow: "Efficiency boost",
    title: "Solar Panel Cleaning Services",
    description: "Gentle, pure-water solar panel cleaning to maximize energy output by removing dust, bird droppings, and pollution.",
    image: "/images/glass-wash.jpg",
    intent: "For homeowners and businesses wanting to maintain peak efficiency of their solar energy system.",
    proof: "Chemical-free pure water systems, scratch-free brushes, and safe roof access equipment.",
    tags: ["solar-panel"],
  },
  {
    slug: "strata-cleaning",
    name: "Strata Cleaning",
    eyebrow: "Body corporate",
    title: "Strata Cleaning Services",
    description: "Comprehensive exterior cleaning for strata and body corporate properties, including common areas, pathways, and building washdowns.",
    image: "/images/commercial-aerial.jpg",
    intent: "For body corporate managers needing reliable, fully insured, and systematic exterior maintenance.",
    proof: "Clear communication, flexible scheduling around residents, and $20M public liability insurance.",
    tags: ["strata-cleaning"],
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    eyebrow: "Business presentation",
    title: "Commercial Building Cleaning Services",
    description: "Professional washing for commercial building exteriors, warehouses, and shopfronts to maintain a pristine business image.",
    image: "/images/commercial-pressure.jpg",
    intent: "For business owners and property managers requiring exterior maintenance with minimal disruption to operations.",
    proof: "After-hours availability, EWP-licensed crew, and comprehensive safety protocols.",
    tags: ["commercial"],
  },
];


export const locations = [
  {
    slug: "brisbane",
    name: "Brisbane",
    title: "Exterior Cleaning Services Brisbane",
    description:
      "The primary service area for WSI Cleaning, with priority availability for house washing, pressure cleaning, window cleaning and gutter cleaning.",
    priority: "Primary focus area",
  },
  {
    slug: "sunshine-coast",
    name: "Sunshine Coast",
    title: "Exterior Cleaning Services Sunshine Coast",
    description:
      "Selective exterior cleaning availability for Sunshine Coast properties, with Brisbane remaining the highest-priority area.",
    priority: "Secondary service area",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}
