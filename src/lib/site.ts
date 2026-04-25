export const site = {
  name: "WSI Cleaning",
  legalName: "WSI Cleaning Services",
  url: "https://wsicleaning.com",
  phoneDisplay: "0426 400 029",
  phoneHref: "tel:+61426400029",
  email: "info@wsicleaning.com",
  mapsUrl:
    "https://www.google.com/maps/place/WSI+Pressure+Cleaning+-+Pressure+Cleaning+Service/@-27.5521735,152.9337057,11.86z/data=!4m6!3m5!1s0x474f05cdf0f2bcdb:0xca2a5024b05aa548!8m2!3d-30.265976!4d152.254271!16s%2Fg%2F11t_hnfh7n",
  areas: ["Brisbane", "Gold Coast", "Sunshine Coast"],
  primaryArea: "Brisbane",
  rating: "5.0",
  reviewCountLabel: "100+",
  experienceLabel: "10+ years",
  insuranceLabel: "$20M public liability insurance",
};

export const services = [
  {
    slug: "house-washing-brisbane",
    name: "House Washing",
    eyebrow: "Priority service",
    title: "House Washing Brisbane",
    description:
      "Soft washing for rendered, painted, brick and weatherboard homes across Brisbane, built to remove mould, algae and grime without blasting delicate surfaces.",
    image: "/images/house-wash.jpg",
    intent:
      "For homeowners who want the exterior refreshed before sale, inspection, repainting or seasonal maintenance.",
    proof: "Gentle method, visible curb appeal, safer for painted and rendered surfaces.",
    tags: ["house-wash", "brisbane"],
  },
  {
    slug: "pressure-cleaning-brisbane",
    name: "Pressure Cleaning",
    eyebrow: "High-demand service",
    title: "Pressure Cleaning Brisbane",
    description:
      "Professional pressure cleaning for driveways, paths, patios, pool surrounds and hard exterior surfaces where dirt, oil and organic growth have built up.",
    image: "/images/pressure-cleaning.jpg",
    intent:
      "For properties with concrete, pavers or outdoor areas that need a strong, even clean.",
    proof: "Right pressure for each surface, commercial-grade equipment, tidy finish.",
    tags: ["pressure-cleaning", "brisbane"],
  },
  {
    slug: "window-cleaning-brisbane",
    name: "Window Cleaning",
    eyebrow: "Residential and commercial",
    title: "Window Cleaning Brisbane",
    description:
      "Interior and exterior window cleaning for homes, offices, shopfronts and body corporate properties across Brisbane.",
    image: "/images/window-cleaning.jpg",
    intent:
      "For clear glass, better natural light and a cleaner-looking property from the street.",
    proof: "Streak-conscious process, frames and sills considered, suitable for repeat maintenance.",
    tags: ["window-cleaning", "brisbane"],
  },
  {
    slug: "gutter-cleaning-brisbane",
    name: "Gutter Cleaning",
    eyebrow: "Maintenance service",
    title: "Gutter Cleaning Brisbane",
    description:
      "Gutter cleaning for Brisbane homes and small commercial properties, helping reduce overflow, blockages and water damage risks during storm season.",
    image: "/images/gutter-cleaning.jpg",
    intent:
      "For homeowners who need roofline maintenance before heavy rain or after leaf build-up.",
    proof: "Debris removal, downpipe awareness and safety-first access planning.",
    tags: ["gutter-cleaning", "brisbane"],
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
    slug: "gold-coast",
    name: "Gold Coast",
    title: "Exterior Cleaning Services Gold Coast",
    description:
      "Selective exterior cleaning availability for Gold Coast homes and properties, depending on crew scheduling.",
    priority: "Secondary service area",
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

export const faqs = [
  {
    question: "What is WSI Cleaning best known for?",
    answer:
      "WSI Cleaning is best known for house washing, pressure cleaning, window cleaning and gutter cleaning across Brisbane, with selected availability on the Gold Coast and Sunshine Coast.",
  },
  {
    question: "Does WSI Cleaning service Brisbane?",
    answer:
      "Yes. Brisbane is the primary focus area for WSI Cleaning, especially for house washing, pressure cleaning, window cleaning and gutter cleaning enquiries.",
  },
  {
    question: "Is pressure cleaning safe for every exterior surface?",
    answer:
      "No. Some surfaces need pressure cleaning, while painted, rendered or more delicate exterior surfaces may need soft washing. WSI Cleaning chooses the method based on the surface and the result needed.",
  },
  {
    question: "Does WSI Cleaning offer roof cleaning?",
    answer:
      "WSI Cleaning can assess roof cleaning enquiries, but the core service focus is house washing, pressure cleaning, window cleaning and gutter cleaning.",
  },
  {
    question: "How can I get a quote?",
    answer:
      "Use the website form or call 0426 400 029. Sharing the suburb, service needed and a few photos helps the team respond with better context.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

