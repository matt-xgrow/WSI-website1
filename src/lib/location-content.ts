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
    lead: "Brisbane is the home base for WSI Cleaning and the city where most of our work is booked. We service residential, body corporate and commercial properties across Greater Brisbane — from inner-city Queenslanders in New Farm and Paddington to high-set homes in the western suburbs and modern townhouse complexes through the bayside. Brisbane's subtropical climate (high humidity, summer storms, year-round mould pressure) drives the same cleaning cycle for nearly every property: a full house wash every 12–18 months, gutters cleared before October, and roof soft-washed every 3–5 years to keep moss and lichen in check.",
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
      { q: "What suburbs do you service in Brisbane?", a: "All of greater Brisbane. The suburbs we work most often are listed above, but we book jobs across every postcode from the bayside to the western corridor and out to the northern suburbs. If you're unsure, the postcode test is simple: if you can drive to the Brisbane CBD in under an hour, we service it." },
      { q: "When should I book my house wash in Brisbane?", a: "Anytime — we work year-round. Most homeowners book in autumn (March–May) so the property is presentation-ready for spring inspections, or in spring (September–October) ahead of summer entertaining. Pre-storm-season gutter cleans should be booked in September." },
      { q: "How fast can you respond to a Brisbane storm clean-up?", a: "Same-week for most storm clean-up calls during October–March. We keep crew availability for emergency gutter and roof response when storms cluster in a single weekend." },
      { q: "Do you work in inner-city heritage Queenslanders?", a: "Yes. Heritage homes are some of our most common jobs in Paddington, Bardon, New Farm and Auchenflower. Soft washing and considered access are essential on heritage timber, tin and original paint — high pressure on a 100-year-old Queenslander is the wrong tool." },
      { q: "Can you service body corporate buildings in Brisbane?", a: "Yes. We work with strata managers across Brisbane on quarterly cycles for common areas, twice-yearly gutter clears and on-demand facade work. Certificates of currency, SWMS and contractor inductions (Cm3, Rapid Global, Avetta) are issued before the first attendance." },
    ],
  },

  "sunshine-coast": {
    lead: "WSI Cleaning services properties on the Sunshine Coast — from Caloundra in the south through Mooloolaba, Maroochydore, Coolum, Peregian and up to Noosa. The Sunshine Coast splits into two distinct cleaning environments: coastal salt air on the beachfront strip, and humid hinterland mildew further inland from Buderim and Eumundi up through the Glasshouse Mountains. We travel from our Brisbane base — Sunshine Coast jobs are grouped into batched trips so the quote stays efficient. Book ahead where you can; same-week is available for urgent work.",
    climate: {
      title: "How do Sunshine Coast hinterland and coast cleaning needs differ?",
      body: "Coastal Sunshine Coast properties (Mooloolaba, Maroochydore, Coolum, Noosa, Peregian) sit in a salt-air environment — with the same window-haze and metal-corrosion pattern you get on any salt-exposed coastline. Hinterland properties (Buderim, Maleny, Montville, Eumundi) sit in higher rainfall, lower wind, with more tree cover and dense humidity — that combination drives faster moss and mildew growth on roofs, decks and shaded walls than nearly any other region in South East Queensland. The same property type needs a different cleaning cycle depending on which side of the highway it sits.",
    },
    intro: [
      "Coastal Sunshine Coast jobs typically include window cleans on shorter cycles (salt haze), house washes every 9–12 months and quarterly pool-surround cleans. Hinterland properties book heavier on roof cleans (moss and lichen pressure is high), deck washes and gutter clears (tree cover means leaf load is constant). Both regions book gutter cleans before October each year for storm season.",
      "We run scheduled Sunshine Coast trips on a regular cadence — most jobs are batched together to keep travel cost contained. If your job is flexible on date, the quote reflects that. Urgent and pre-event work can be turned around inside the week as a standalone trip.",
    ],
    suburbs: [
      "Noosa",
      "Maroochydore",
      "Mooloolaba",
      "Caloundra",
      "Coolum",
      "Peregian",
      "Buderim",
      "Sunrise Beach",
      "Twin Waters",
      "Marcoola",
      "Pelican Waters",
      "Maleny",
      "Montville",
      "Eumundi",
      "Bli Bli",
    ],
    stats: [
      { label: "Service availability", value: "Batched trips, weekly" },
      { label: "Quote turnaround", value: "24 hours" },
      { label: "Specialty", value: "Hinterland moss & coastal salt" },
    ],
    faqs: [
      { q: "Do you service Noosa and Peregian?", a: "Yes — Noosa, Peregian, Sunrise Beach and Marcoola are part of our scheduled Sunshine Coast runs. Noosa and the surrounding hinterland (Eumundi, Cooroy) are also serviced; mention the suburb on the quote and we'll batch with the closest run." },
      { q: "How often should hinterland homes have their roofs cleaned?", a: "Every 3–5 years for a full soft-wash roof clean. Hinterland homes sit under higher tree cover and humidity than coastal properties, so moss returns faster. Properties heavily shaded by tree canopy may need a top-up treatment at the 2-year mark to prevent thick lichen build-up." },
      { q: "Are there suburbs you don't reach?", a: "We reach all populated Sunshine Coast suburbs. Very remote hinterland properties (more than 30 km west of the Bruce Highway) are quoted individually rather than batched, so they typically carry an additional travel charge." },
      { q: "Do you handle holiday-rental presentation cleans?", a: "Yes. Pre-arrival exterior cleans (windows, paving, pool surrounds) for short-term rentals are common scope. We can work to a property manager's schedule and turn around a full presentation clean inside 24 hours where access is straightforward." },
      { q: "Can you book regular cycles for hinterland deck and roof maintenance?", a: "Yes. Most hinterland clients move to an annual or bi-annual cycle for roof and deck maintenance — moss and mildew don't pause, so a regular cycle keeps the property visually consistent and reduces the size of any single visit." },
    ],
  },
};

export function getLocationContent(slug: string): LocationContent | undefined {
  return LOCATION_CONTENT[slug];
}
