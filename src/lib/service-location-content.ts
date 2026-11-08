// Bespoke service × city content. Each combo carries a unique angle (two
// paragraphs written for that exact service-in-that-city) plus combo-specific
// FAQs, so every generated page clears the "unique content" bar rather than
// templating the same body across locations.

export type ServiceLocationFaq = { q: string; a: string };

export type ServiceLocationContent = {
  angle: string[];
  faqs: ServiceLocationFaq[];
  relatedGuide?: { slug: string; label: string };
};

export function serviceLocationKey(serviceSlug: string, citySlug: string) {
  return `${serviceSlug}__${citySlug}`;
}

export const SERVICE_LOCATION_CONTENT: Record<string, ServiceLocationContent> = {
  // ─── House Washing ──────────────────────────────────────────────────────
  "house-washing__brisbane": {
    angle: [
      "House washing is the most-booked job on our Brisbane schedule, and the city's subtropical climate is the reason. High summer humidity, storms from October to March and year-round warmth grow mould, algae and lichen on render, painted weatherboard and brick within 12–18 months — faster on shaded southern walls and the heavily tree-covered blocks common through Bardon, Auchenflower and The Gap.",
      "We soft-wash under 500 PSI so the growth is killed at the spore level instead of being blasted off only to regrow in a few months. A single-storey Brisbane home is typically 3–5 hours on site; two-storey Queenslanders and architecturally complex homes run 5–8. Quotes are fixed in writing within 24 business hours, and most inner-suburb jobs — New Farm, Paddington, Bulimba, Ascot — are scheduled inside the same week.",
    ],
    faqs: [
      { q: "How much does house washing cost in Brisbane?", a: "Most single-storey Brisbane homes sit in the low-to-mid hundreds, with size, height and how much mould has built up setting the final figure. Two-storey and rendered homes cost more because of access and surface area. We confirm a fixed price in writing before any work starts — no hourly surprises." },
      { q: "Why can't I just pressure wash my Brisbane render?", a: "High pressure cracks acrylic render, blows it off the substrate or strips paint, and it doesn't kill the mould — the surface looks clean for a few months then the spores regrow. Brisbane's humidity makes that regrowth fast. Soft washing is the correct method for any rendered, painted or coated wall." },
      { q: "When is the best time to book a house wash in Brisbane?", a: "Year-round works, but most homeowners book in autumn (March–May) to be presentation-ready for spring, or in spring ahead of summer entertaining. If you're selling, book 1–2 weeks before photography so the exterior is at its best for the listing." },
    ],
    relatedGuide: { slug: "house-washing-cost-brisbane", label: "House washing cost in Brisbane — full price guide" },
  },

  // ─── Pressure Washing ───────────────────────────────────────────────────
  "pressure-washing__brisbane": {
    angle: [
      "Brisbane driveways, paths and patios take a beating from the city's storm runoff and clay-heavy soils — concrete streaks with mould and algae, exposed aggregate traps grime, and pool surrounds turn slippery through the wet months. Pressure washing on hard surfaces is where high pressure (1,500–4,000 PSI) and a rotary surface cleaner belong, giving an even, line-free finish rather than the zebra-striping you get from a wand alone.",
      "We match the pressure and tip to each surface — full strength on concrete and pavers, dialled back on aggregate and tile — and treat oil and tyre stains separately. Across the inner suburbs and the western corridor, driveway and path cleans are some of our fastest-turnaround jobs, quoted in writing within 24 business hours.",
    ],
    faqs: [
      { q: "How much does pressure washing a driveway cost in Brisbane?", a: "Most standard Brisbane driveways fall in the low hundreds, set by size, surface type and stain load (oil and rust cost more to treat). We use a surface cleaner for an even finish and confirm a fixed price in writing before starting." },
      { q: "Will pressure washing damage my concrete or aggregate?", a: "Not when the pressure and tip are matched to the surface. Solid concrete and pavers handle full pressure; exposed aggregate and decorative finishes are cleaned at lower pressure with a surface cleaner to avoid dislodging stones. We assess the surface before we start." },
      { q: "Can you remove oil and tyre stains from my driveway?", a: "Most of them, yes. Fresh oil and tyre marks respond well to a degreaser pre-treatment plus hot-surface cleaning. Deep, old oil that has soaked into porous concrete may lighten rather than vanish completely — we'll tell you honestly what to expect at the quote." },
    ],
    relatedGuide: { slug: "pressure-washing-driveway-cost-brisbane", label: "Driveway pressure washing cost in Brisbane" },
  },

  // ─── Window Cleaning ────────────────────────────────────────────────────
  "window-cleaning__brisbane": {
    angle: [
      "Window cleaning in Brisbane is as much about the frames, sills and tracks as the glass. Storm-season rain throws mud and pollen onto windows, and homes within a kilometre of the river collect a fine haze that dulls natural light. We clean interior and exterior glass, detail the frames and tracks, and use a deionised-water pole system on high or hard-to-reach panes for a spot-free finish without ladders against the wall.",
      "Quarterly cleans are common for riverside and high-glazing homes; offices and shopfronts through the CBD and inner suburbs book on a regular maintenance cycle. Every job is quoted in writing within 24 business hours and fits around your access and trading hours.",
    ],
    faqs: [
      { q: "How much does window cleaning cost in Brisbane?", a: "Pricing is set by the number of panes, storeys and whether you want interior plus exterior or exterior only. Most standard homes sit in the low hundreds. We quote a fixed price in writing and can set a recurring rate for quarterly maintenance." },
      { q: "Do you clean the window frames and tracks too?", a: "Yes. Frames, sills and tracks are part of a standard clean — glass alone looks half-done if the frame is still grimy. Heavily built-up tracks (common after storm season) may need an extra detailing pass, which we'll flag at the quote." },
      { q: "Can you reach second-storey and high windows safely?", a: "Yes. We use a deionised-water pole system that cleans high glass from the ground for a spot-free, ladder-free finish, and licensed access equipment where a property genuinely needs it. Brisbane's two-storey Queenslanders are routine work for us." },
    ],
    relatedGuide: { slug: "window-cleaning-brisbane-cost", label: "Window cleaning cost in Brisbane" },
  },

  // ─── Gutter Cleaning ────────────────────────────────────────────────────
  "gutter-cleaning__brisbane": {
    angle: [
      "Brisbane's storm season runs October to March, and blocked gutters are the single biggest avoidable cause of overflow and water damage through it. Leaf litter from the city's heavy tree cover — especially across the western suburbs and leafy inner north — packs gutters and downpipes solid by spring. We hand-clear the gutters, flush the downpipes and photograph each elevation so you can see the before and after.",
      "The right time to book is September, before the first big storms. We work single-storey and small commercial rooflines with safety-first access planning, and most Brisbane gutter cleans are quoted in writing within 24 business hours and scheduled the same week.",
    ],
    faqs: [
      { q: "When should I get my gutters cleaned in Brisbane?", a: "September is ideal — clearing before the October–March storm season is when blocked gutters do the most damage. If your property is under heavy tree cover, a second clean in autumn keeps leaf load from packing the downpipes over winter." },
      { q: "Do you clean the downpipes as well as the gutters?", a: "Yes. Clearing the gutter but leaving a blocked downpipe just moves the problem — we flush the downpipes as part of the job and confirm they're running. Photo documentation of each elevation is included so you can see the result." },
      { q: "How fast can you respond after a Brisbane storm?", a: "Same-week for most storm clean-up calls during the wet season. We keep crew availability for emergency gutter and roof response when storms cluster over a single weekend and overflow becomes urgent." },
    ],
  },

  // ─── Roof Cleaning ──────────────────────────────────────────────────────
  "roof-cleaning__brisbane": {
    angle: [
      "Brisbane roofs grow moss and lichen the same way the walls grow mould — the subtropical humidity does it. Concrete tile, terracotta and Colorbond all develop visible biological growth, worst on shaded southern pitches and under tree cover. We soft-wash roofs, treating the moss and lichen at the spore level so the surface stays clean for years rather than being scoured off and regrowing in months.",
      "High pressure on a tiled roof cracks tiles, strips the protective glaze and forces water under the laps — which is why soft washing is the only correct method here. A full soft-wash roof clean typically holds for 3–5 years in Brisbane; heavily shaded roofs may want a top-up at the two-year mark. Every job is quoted in writing within 24 business hours.",
    ],
    faqs: [
      { q: "Is it safe to pressure wash a tile roof in Brisbane?", a: "No. High pressure cracks concrete and terracotta tiles, strips the surface glaze and drives water under the laps into the roof cavity. Soft washing kills the moss and lichen chemically at low pressure, which is the correct and safe method for any tiled roof." },
      { q: "How often does a Brisbane roof need cleaning?", a: "Every 3–5 years for a full soft-wash clean. Roofs on shaded southern pitches or under heavy tree canopy grow back faster and may want a top-up treatment around the two-year mark to stop thick lichen building up." },
      { q: "Will roof cleaning fix the staining for good?", a: "Soft washing kills the growth at the root, so the staining doesn't return for years rather than months. It won't change the age of the tiles, but it removes the moss, lichen and black streaking and dramatically improves how the roof looks from the street." },
    ],
  },

  // ─── Driveway Cleaning ──────────────────────────────────────────────────
  "driveway-cleaning__brisbane": {
    angle: [
      "A clean driveway is the fastest visible facelift a Brisbane property can get, and it's one of our highest-turnaround jobs. Brisbane's storms wash clay and organic matter across concrete and aggregate, while shaded entries green over with algae that gets slippery through the wet months. We use a rotary surface cleaner for an even, line-free finish and treat oil and tyre stains separately with a degreaser pre-treatment.",
      "Concrete and pavers take full pressure; exposed aggregate and decorative finishes are cleaned at a dialled-back pressure to avoid dislodging stones. Most Brisbane driveway cleans are done in a few hours and quoted in writing within 24 business hours.",
    ],
    faqs: [
      { q: "How much does driveway cleaning cost in Brisbane?", a: "Most standard Brisbane driveways sit in the low hundreds, with size, surface type and stain load setting the price — oil and rust treatment adds to it. We use a surface cleaner for an even result and confirm a fixed price in writing first." },
      { q: "Can you get the green algae off my shaded driveway?", a: "Yes, and we treat it rather than just blasting it — algae that's only rinsed off the surface regrows fast in Brisbane's humidity. A treatment step kills it at the root so the entry stays clean and non-slip for much longer." },
      { q: "Do you clean exposed aggregate driveways?", a: "Yes, at the correct lower pressure. Aggregate and decorative concrete need a surface cleaner and a gentler setting so stones aren't dislodged — full wand pressure in one spot can pit the finish. We match the method to the surface." },
    ],
    relatedGuide: { slug: "pressure-washing-driveway-cost-brisbane", label: "Driveway cleaning cost in Brisbane" },
  },

  // ─── Solar Panel Cleaning ───────────────────────────────────────────────
  "solar-panel-cleaning__brisbane": {
    angle: [
      "Brisbane is one of the highest solar-uptake cities in the country, and dirty panels quietly cost output. Dust, pollen, bird droppings and the fine grime that storm season throws up all cut how much light reaches the cells — and Brisbane's flat-ish residential roof pitches mean rain doesn't fully self-clean them. A professional clean commonly recovers 10–20% of lost output on a neglected array.",
      "We clean panels with deionised water and soft brushes — no detergents or abrasives that could void the manufacturer's warranty — using safe roof-access equipment. Most Brisbane homes benefit from an annual clean; properties under tree cover or near dust sources may want it more often. Quoted in writing within 24 business hours.",
    ],
    faqs: [
      { q: "Does cleaning solar panels actually increase output?", a: "Yes — a dirty array loses real generation, and a clean commonly recovers 10–20% on panels that haven't been touched in a year or more. The dirtier they were, the bigger the gain. You can usually see the difference in your monitoring app within a day." },
      { q: "Will cleaning void my panel warranty?", a: "Not the way we do it. We use deionised water and soft brushes with no detergents or abrasives, which is what manufacturers specify. Pressure washing or harsh chemicals are what void warranties — that's exactly what we avoid." },
      { q: "How often should Brisbane solar panels be cleaned?", a: "Once a year suits most Brisbane homes. Arrays under tree cover, near unsealed roads or in dusty pockets, or that collect a lot of bird traffic, benefit from twice-yearly cleaning to hold peak output." },
    ],
  },

  // ─── Strata Cleaning ────────────────────────────────────────────────────
  "strata-cleaning__brisbane": {
    angle: [
      "Brisbane's density of townhouse, unit and body corporate complexes makes strata one of our core commercial scopes. Common-area paths, car parks, building washdowns, common-area windows and gutters all need a systematic, fully insured contractor who works cleanly around residents. We run these on quarterly cycles for common areas, twice-yearly gutter clears and on-demand facade work, with clear scheduling so owners and tenants aren't caught off guard.",
      "Compliance is handled before the first attendance: certificates of currency, SWMS and contractor inductions (Cm3, Rapid Global, Avetta) are issued up front, backed by $20M public liability. We quote committees in writing within 24 business hours and can scope a whole-of-year maintenance plan rather than one-off visits.",
    ],
    faqs: [
      { q: "Do you carry the insurance and inductions strata managers need?", a: "Yes. We hold $20M public liability and issue certificates of currency, SWMS and the common contractor inductions — Cm3, Rapid Global, Avetta — before the first attendance, so the building's compliance requirements are covered up front." },
      { q: "Can you work around residents in an occupied Brisbane complex?", a: "Yes — it's most of what we do. We schedule common-area work to minimise disruption, give notice where access affects residents, and keep wet areas controlled. Quarterly common-area cycles and pre-notified gutter and facade work are standard." },
      { q: "Do you offer a yearly maintenance plan for body corporate?", a: "Yes. Most committees prefer a scoped whole-of-year plan — quarterly common-area cleans, twice-yearly gutters, on-demand facade work — over ad-hoc visits, because it budgets cleanly and keeps the property consistently presented. We'll quote the plan in writing." },
    ],
  },

  // ─── Commercial Cleaning ────────────────────────────────────────────────
  "commercial-cleaning__brisbane": {
    angle: [
      "Commercial exteriors set a customer's first impression, and in Brisbane that means keeping facades, shopfronts, warehouses and car parks clear of the mould, grime and storm staining the climate throws at them. We clean commercial building exteriors across the CBD and inner suburbs with after-hours availability so trading isn't disrupted, EWP-licensed crew for height work and full safety protocols on every site.",
      "Scope ranges from one-off pre-event or end-of-lease cleans to scheduled facade, shopfront and car-park maintenance. Everything is backed by $20M public liability and the compliance documentation commercial property managers expect, quoted in writing within 24 business hours.",
    ],
    faqs: [
      { q: "Can you clean our Brisbane premises after hours?", a: "Yes. Most commercial exterior work — shopfronts, facades, entries, car parks — is booked after hours or before opening so it doesn't disrupt trading or customers. We scope the timing around your operating hours at the quote." },
      { q: "Do you have the licensing for height and facade work?", a: "Yes. We run EWP-licensed crew for elevated facade and building work, with SWMS and site safety protocols in place. $20M public liability and the usual compliance documentation are provided up front for property managers." },
      { q: "Do you do one-off cleans or only contracts?", a: "Both. We handle one-off pre-event, end-of-lease and post-construction exterior cleans as readily as scheduled maintenance contracts. If you want ongoing upkeep, we'll scope a cycle; if you need a single clean, that's fine too." },
    ],
  },
};

export function getServiceLocationContent(
  serviceSlug: string,
  citySlug: string,
): ServiceLocationContent | undefined {
  return SERVICE_LOCATION_CONTENT[serviceLocationKey(serviceSlug, citySlug)];
}
