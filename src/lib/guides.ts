export type GuideCategory =
  | "method"
  | "house-washing"
  | "pressure-washing"
  | "window-cleaning";

export type GuideTopic = "cost" | "frequency" | "method" | "diagnosis";

export type Guide = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  excerpt: string;
  category: GuideCategory;
  categoryLabel: string;
  topic: GuideTopic;
  topicLabel: string;
  region: "Brisbane" | "Sunshine Coast" | "South East Queensland";
  image: string;
  imageAlt: string;
  readingMinutes: number;
  published: string;
  updated: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "soft-wash-vs-pressure-wash",
    title:
      "Soft Wash vs Pressure Wash — Which Does My Brisbane Property Need?",
    headline: "Soft wash vs pressure wash — which does my property need?",
    description:
      "Soft washing uses chemistry under 500 PSI for render, paint and roof tiles. Pressure washing uses 1,500–4,000 PSI for concrete and pavers. Use this guide to pick the right method for every surface on your home.",
    excerpt:
      "The single most expensive mistake in exterior cleaning: using the wrong method on the wrong surface. Match the method to the substrate.",
    category: "method",
    categoryLabel: "Method",
    topic: "method",
    topicLabel: "Method",
    region: "South East Queensland",
    image: "/images/soft-wash.jpg",
    imageAlt: "Soft-wash treatment running down a Brisbane tile roof at low pressure",
    readingMinutes: 8,
    published: "2026-04-12",
    updated: "2026-04-26",
  },
  {
    slug: "house-washing-cost-brisbane",
    title: "House Washing Cost Brisbane 2026 — Pricing Per Square Metre",
    headline: "How much does a house wash cost in Brisbane in 2026?",
    description:
      "A typical Brisbane single-storey house wash is $380–$650 in 2026. Pricing is per square metre of wall area, with storey count, substrate and condition driving the quote. Full pricing breakdown inside.",
    excerpt:
      "Most Brisbane house washes price between $380 and $650 in 2026 — but the variance comes from storey count, render condition and the suburb's tree cover. Here's exactly what changes the quote.",
    category: "house-washing",
    categoryLabel: "House Washing",
    topic: "cost",
    topicLabel: "Cost",
    region: "Brisbane",
    image: "/images/house-wash.jpg",
    imageAlt: "Soft-wash exterior house cleaning on a rendered Brisbane home",
    readingMinutes: 9,
    published: "2026-05-08",
    updated: "2026-05-12",
  },
  {
    slug: "house-wash-frequency-sunshine-coast",
    title:
      "How Often Should You Wash Your House on the Sunshine Coast?",
    headline: "How often should you wash your house on the Sunshine Coast?",
    description:
      "Coastal Sunshine Coast homes need a full wash every 9–12 months; hinterland homes every 6–9 months. Salt, humidity and tree cover drive the cycle. Here's the per-suburb cleaning calendar.",
    excerpt:
      "On the Sunshine Coast the cleaning cycle splits in two: salt-driven on the coastal strip, mildew-driven in the hinterland. Same house type, different cycles.",
    category: "house-washing",
    categoryLabel: "House Washing",
    topic: "frequency",
    topicLabel: "Frequency",
    region: "Sunshine Coast",
    image: "/images/residential-aerial.jpg",
    imageAlt:
      "Aerial view of a Sunshine Coast home with subtropical tree cover and humid hinterland conditions",
    readingMinutes: 7,
    published: "2026-05-08",
    updated: "2026-05-12",
  },
  {
    slug: "pressure-washing-driveway-cost-brisbane",
    title:
      "Pressure Washing Driveway Cost Brisbane — 2026 Per Square Metre Guide",
    headline: "How much does it cost to pressure-wash a driveway in Brisbane?",
    description:
      "A standard Brisbane driveway pressure wash is $4–$8 per square metre in 2026 — concrete cheapest, exposed aggregate mid, pavers highest. Oil stain treatment adds $40–$120 per stain.",
    excerpt:
      "Driveway pressure washing in Brisbane is priced per square metre, not per hour. The substrate (concrete, exposed aggregate, pavers) and stain load do the rest. Full numbers inside.",
    category: "pressure-washing",
    categoryLabel: "Pressure Washing",
    topic: "cost",
    topicLabel: "Cost",
    region: "Brisbane",
    image: "/images/pressure-cleaning.jpg",
    imageAlt:
      "Pressure washing a concrete driveway with a rotary surface cleaner in Brisbane",
    readingMinutes: 8,
    published: "2026-05-08",
    updated: "2026-05-12",
  },
  {
    slug: "mould-vs-lichen-vs-algae",
    title:
      "Mould vs Lichen vs Algae — What's Growing on Your Sunshine Coast Property",
    headline: "Mould vs lichen vs algae — how to tell them apart.",
    description:
      "Black streaks on a roof are mould. Crusty grey-green patches are lichen. Slippery green film on paving is algae. Each one needs a different treatment — and the wrong one wastes the clean.",
    excerpt:
      "Brisbane and Sunshine Coast properties grow three very different organisms — mould, lichen and algae — and each one needs its own treatment. Visual ID guide inside.",
    category: "pressure-washing",
    categoryLabel: "Diagnosis",
    topic: "diagnosis",
    topicLabel: "Diagnosis",
    region: "Sunshine Coast",
    image: "/images/soft-wash.jpg",
    imageAlt:
      "Close-up of black mould streaks, grey lichen patches and green algae growth on a Sunshine Coast roof and paving",
    readingMinutes: 7,
    published: "2026-05-08",
    updated: "2026-05-12",
  },
  {
    slug: "window-cleaning-brisbane-cost",
    title:
      "Professional Window Cleaning Brisbane — Cost, Frequency, What's Included",
    headline:
      "Professional window cleaning in Brisbane — cost, frequency and what's included.",
    description:
      "A standard Brisbane single-storey home window clean is $120–$240 in 2026. Pricing is per pane, with frame, sill, screen and track service optional. Full breakdown of what's included and how often homes need it.",
    excerpt:
      "Brisbane window cleaning pricing is per pane, not per hour. Frames, sills, screens and tracks are usually optional add-ons. Here's the full breakdown plus frequency by property type.",
    category: "window-cleaning",
    categoryLabel: "Window Cleaning",
    topic: "cost",
    topicLabel: "Cost",
    region: "Brisbane",
    image: "/images/window-cleaning.jpg",
    imageAlt:
      "Professional window cleaner using a deionised-water pole system on a Brisbane Queenslander",
    readingMinutes: 8,
    published: "2026-05-08",
    updated: "2026-05-12",
  },
  {
    slug: "salt-haze-windows-sunshine-coast",
    title:
      "Salt Haze on Sunshine Coast Windows — Why Tap Water Won't Fix It",
    headline:
      "Salt haze on Sunshine Coast windows — why tap water won't fix it.",
    description:
      "Coastal Sunshine Coast windows fog within weeks from salt-laden sea spray. Tap water leaves mineral spotting that makes it worse. Deionised water is the only finish that stays clear on salt-exposed glass.",
    excerpt:
      "Salt haze is a chemistry problem, not a dirt problem. That's why DIY tap-water cleaning leaves Sunshine Coast windows worse than before. The fix is mineral-free water.",
    category: "window-cleaning",
    categoryLabel: "Window Cleaning",
    topic: "method",
    topicLabel: "Method",
    region: "Sunshine Coast",
    image: "/images/glass-wash.jpg",
    imageAlt:
      "Salt haze on coastal Sunshine Coast glass cleaned with a deionised-water pole system",
    readingMinutes: 7,
    published: "2026-05-08",
    updated: "2026-05-12",
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

export function getRelatedGuides(slug: string, limit = 3) {
  const current = getGuide(slug);
  if (!current) return GUIDES.slice(0, limit);
  return GUIDES.filter((g) => g.slug !== slug)
    .sort((a, b) => {
      const aCat = a.category === current.category ? 0 : 1;
      const bCat = b.category === current.category ? 0 : 1;
      if (aCat !== bCat) return aCat - bCat;
      const aRegion = a.region === current.region ? 0 : 1;
      const bRegion = b.region === current.region ? 0 : 1;
      return aRegion - bRegion;
    })
    .slice(0, limit);
}
