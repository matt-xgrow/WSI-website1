export type LocationFaq = { q: string; a: string };

export type LocationContent = {
  lead: string;
  climate: { title: string; body: string };
  intro: string[];
  suburbs: string[];
  stats: { label: string; value: string }[];
  faqs: LocationFaq[];
};

export const LOCATION_CONTENT: Record<string, LocationContent> = {
  brisbane: {
    lead: "Brisbane exterior cleaning is essential for maintaining homes and commercial properties in the city's humid subtropical climate. Brisbane is the home base for WSI Cleaning and the city where most of our work is booked. We service residential, body corporate and commercial properties across Greater Brisbane — from inner-city Queenslanders in New Farm and Paddington to high-set homes in the western suburbs and modern townhouse complexes through the bayside. Brisbane's subtropical climate (high humidity, summer storms, year-round mould pressure) drives the same cleaning cycle for nearly every property: a full house wash every 12–18 months, gutters cleared before October, and roof soft-washed every 3–5 years to keep moss and lichen in check.",
    climate: {
      title: "What makes Brisbane exteriors different to clean?",
      body: "Brisbane sits in a humid subtropical climate zone (Köppen Cfa). Summer humidity above 70%, frequent thunderstorms from October to March and year-round warmth combine to create the perfect environment for mould, algae and lichen. Rendered walls, painted weatherboard and concrete tile roofs all develop visible biological growth within 12–18 months without intervention — faster on shaded southern aspects and properties under heavy tree cover. Pressure alone doesn't fix this; the surface looks clean for a few months and the spores grow back. Soft washing kills the growth at the spore level so the regrowth interval is years, not months.",
    },
    intro: [
      "We work the inner suburbs (New Farm, Teneriffe, Bulimba, Paddington, Hamilton, Ascot), the western corridor (Toowong, Indooroopilly, Chelmer, Graceville), the northern suburbs (Wilston, Clayfield, Hendra), and right out across the bayside, north and south. Quotes are returned within 24 business hours and most residential jobs are scheduled inside the same week.",
      "Brisbane's most common services in our schedule are full house washes (booked yearly or before-sale), driveway pressure cleans, gutter clears before storm season and quarterly window cleans for homes within a kilometre of the river. Strata and commercial scopes are typically quarterly common-area cleans, twice-yearly gutters and on-demand facade work.",
    ],
    suburbs: [
      "New Farm",
      "Teneriffe",
      "Hamilton",
      "Ascot",
      "Bulimba",
      "Paddington",
      "Toowong",
      "Indooroopilly",
      "Chelmer",
      "Graceville",
      "Wilston",
      "Clayfield",
      "Hendra",
      "Newstead",
      "Bardon",
      "Auchenflower",
      "Kenmore",
      "Carindale",
      "Holland Park",
      "Wynnum",
    ],
    stats: [
      { label: "Service availability", value: "Same-week" },
      { label: "Quote turnaround", value: "24 hours" },
      { label: "Coverage", value: "All Brisbane suburbs" },
    ],
    faqs: [
      { q: "What suburbs do you service in Brisbane?", a: "Greater Brisbane, including Logan and Ipswich. The suburbs we work most often are listed above, and we book jobs from the bayside to the western corridor and out through the northern suburbs. If you're unsure whether your suburb is inside that area, contact us with the postcode." },
      { q: "When should I book my house wash in Brisbane?", a: "Anytime — we work year-round. Most homeowners book in autumn (March–May) so the property is presentation-ready for spring inspections, or in spring (September–October) ahead of summer entertaining. Pre-storm-season gutter cleans should be booked in September." },
      { q: "How fast can you respond to a Brisbane storm clean-up?", a: "Same-week for most storm clean-up calls during October–March. We keep crew availability for emergency gutter and roof response when storms cluster in a single weekend." },
      { q: "Do you work in inner-city heritage Queenslanders?", a: "Yes. Heritage homes are some of our most common jobs in Paddington, Bardon, New Farm and Auchenflower. Soft washing and considered access are essential on heritage timber, tin and original paint — high pressure on a 100-year-old Queenslander is the wrong tool." },
      { q: "Can you service body corporate buildings in Brisbane?", a: "Yes. We work with strata managers across Brisbane on quarterly cycles for common areas, twice-yearly gutter clears and on-demand facade work. Certificates of currency, SWMS and contractor inductions (Cm3, Rapid Global, Avetta) are issued before the first attendance." },
    ],
  },

};

export function getLocationContent(slug: string): LocationContent | undefined {
  return LOCATION_CONTENT[slug];
}
