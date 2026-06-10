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
  "house-washing__sunshine-coast": {
    angle: [
      "On the Sunshine Coast, how often a home needs washing depends on which side of the highway it sits. Coastal homes in Mooloolaba, Maroochydore, Coolum and Noosa carry salt film and sea-spray haze, so they typically need a wash every 9–12 months. Hinterland homes around Buderim, Maleny and Montville sit under higher rainfall and dense tree canopy, which drives heavier mould and mildew on shaded walls.",
      "We travel from our Brisbane base and batch Sunshine Coast jobs into scheduled runs to keep the quote efficient, so booking ahead helps — though urgent and pre-event cleans can be turned around inside the week as a standalone trip. Every home is soft-washed at low pressure, which is the right call for the salt-affected paint and rendered finishes that dominate the coastal strip.",
    ],
    faqs: [
      { q: "How often should a Sunshine Coast home be washed?", a: "Coastal properties within a kilometre of the water usually need a house wash every 9–12 months because of salt film and faster mould. Hinterland homes under tree cover are similar or more frequent. Drier, more exposed blocks can stretch to 18 months." },
      { q: "Do you charge extra to travel to the Sunshine Coast?", a: "We batch Sunshine Coast jobs into scheduled runs to keep travel cost contained, so a flexible date usually means no separate travel charge. Very remote hinterland properties (30 km-plus west of the Bruce Highway) are quoted individually and may carry a travel component." },
      { q: "Can you clean a holiday rental between guests?", a: "Yes. Pre-arrival exterior cleans for short-term rentals are common scope on the Coast. Where access is straightforward we can turn a presentation clean around inside 24 hours and work to your property manager's changeover schedule." },
    ],
    relatedGuide: { slug: "house-wash-frequency-sunshine-coast", label: "How often to wash a house on the Sunshine Coast" },
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
  "pressure-washing__sunshine-coast": {
    angle: [
      "Pressure washing on the Sunshine Coast splits the same way the region does. Coastal paths, pool surrounds and driveways around Mooloolaba, Caloundra and Noosa pick up salt and windblown sand that grinds into the surface; hinterland concrete and pavers near Buderim and Maleny green over fast with moss and algae thanks to the shade and rainfall. Both need real pressure and a surface cleaner for an even result.",
      "Because we run Sunshine Coast work as batched trips from Brisbane, larger jobs — long driveways, full pool surrounds, multi-surface scopes — are the most cost-effective to book on a scheduled run. We match pressure to each surface and treat organic growth so it doesn't grow straight back through the wet season.",
    ],
    faqs: [
      { q: "Do coastal pavers need different treatment to hinterland ones?", a: "Yes. Coastal pavers carry salt and sand and clean up well under straight pressure; shaded hinterland pavers are usually green with moss and algae, which needs a treatment step so the growth is killed rather than just rinsed off the top and regrowing within weeks." },
      { q: "Is it worth booking pressure washing with another service?", a: "On the Sunshine Coast, yes — because jobs are batched into scheduled trips, combining a driveway clean with a house wash or gutter clear on the same visit keeps the overall quote more efficient than two separate trips." },
      { q: "How long will a pressure-cleaned surface stay clean here?", a: "On exposed coastal surfaces, 12–18 months is typical. Shaded hinterland concrete greens up faster — sometimes inside a year — so those properties often move to an annual cycle to stay on top of it." },
    ],
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
  "window-cleaning__sunshine-coast": {
    angle: [
      "On the Sunshine Coast coastline, salt is the enemy of clean glass. Sea spray leaves a mineral haze on windows in Mooloolaba, Coolum, Peregian and Noosa that ordinary washing smears rather than removes, and it returns faster than it does inland. We use a deionised-water system that lifts the salt film and dries spot-free, and we clean the frames and tracks where salt corrosion tends to start.",
      "Coastal homes and holiday rentals here often run shorter window-cleaning cycles than inland properties for exactly this reason. Because Sunshine Coast work is batched into scheduled trips, window cleans pair efficiently with a house wash or pool-surround clean on the same visit.",
    ],
    faqs: [
      { q: "Why do my coastal windows haze over so quickly?", a: "Salt. Sea spray deposits a fine mineral film on glass near the water that builds up far faster than inland grime and smears if you wipe it dry. A deionised-water clean lifts the salt and dries without spots, which lasts longer than a standard wash." },
      { q: "How often should beachfront windows be cleaned?", a: "Homes right on the water often benefit from a clean every 2–3 months; a few streets back, quarterly is usually enough. Holiday rentals tend to clean to their changeover and presentation schedule rather than a fixed interval." },
      { q: "Can you clean windows for a Sunshine Coast holiday let?", a: "Yes — pre-arrival window and exterior cleans for short-term rentals are common scope. Give us the changeover dates and we'll batch the visit with the nearest scheduled run, or run it standalone for urgent turnarounds." },
    ],
    relatedGuide: { slug: "salt-haze-windows-sunshine-coast", label: "Salt haze on Sunshine Coast windows — why it happens" },
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
  "gutter-cleaning__sunshine-coast": {
    angle: [
      "Gutter cleaning is heavier work in the Sunshine Coast hinterland than almost anywhere in South East Queensland. Properties around Buderim, Maleny, Montville and Eumundi sit under constant tree canopy, so leaf load is relentless and downpipes block fast — and the region's higher rainfall means a blocked gutter overflows sooner and harder. Coastal homes carry less leaf litter but still need clearing before storm season.",
      "We clear gutters and flush downpipes with photo documentation of each elevation, and because hinterland tree cover never stops dropping, many of those properties move to a twice-yearly cycle. Sunshine Coast jobs run on batched trips, so booking the pre-storm clean ahead of October is the efficient way to lock it in.",
    ],
    faqs: [
      { q: "How often do hinterland gutters need clearing?", a: "Twice a year for most heavily treed hinterland properties — once before storm season and once mid-year — because the canopy drops leaf litter continuously. Coastal homes with less tree cover are usually fine with an annual pre-storm clean." },
      { q: "Why is gutter overflow worse in the hinterland?", a: "Higher rainfall plus constant leaf load. The hinterland gets more intense downpours than the coast, and gutters already packed with canopy litter can't carry the volume, so they overflow into eaves and walls faster. Clearing before the wet season is the fix." },
      { q: "Do you photograph the work?", a: "Yes. We document each elevation before and after so you can see the gutters and downpipes were actually cleared — useful for hinterland properties where the roofline isn't visible from the ground." },
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
  "roof-cleaning__sunshine-coast": {
    angle: [
      "Roof cleaning is one of the heaviest-demand jobs in the Sunshine Coast hinterland. Homes around Buderim, Maleny and Montville sit under high rainfall and dense canopy, and that combination grows moss and lichen on roofs faster than almost any other part of South East Queensland — thick enough on north-shaded pitches to lift and hold moisture against the tiles. Coastal roofs grow more slowly but still streak with algae over time.",
      "We soft-wash at low pressure to kill the growth at the spore level, which is the only safe method for tile and terracotta. Hinterland roofs often need a tighter cycle than the 3–5 year coastal norm, and heavily shaded properties sometimes move to a top-up treatment between full cleans. Sunshine Coast roof work is booked into our scheduled runs.",
    ],
    faqs: [
      { q: "Why do hinterland roofs grow so much moss?", a: "Shade and rainfall. Hinterland properties under tree canopy stay damp far longer after rain than open coastal blocks, and that constant moisture is exactly what moss and lichen need. North-facing shaded pitches are usually the worst affected." },
      { q: "How often should a hinterland roof be cleaned?", a: "Often tighter than the coastal 3–5 year norm — every 2–3 years for heavily shaded, treed properties, with a possible top-up treatment in between. We'll assess the growth and recommend a realistic cycle for your specific roof at the quote." },
      { q: "Can you clean roofs on the coast as well?", a: "Yes. Coastal roofs in Mooloolaba, Coolum and Noosa grow algae and streaking more slowly than hinterland ones but still benefit from a soft-wash clean. We batch coastal and hinterland roof jobs into the same scheduled Sunshine Coast trips." },
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
  "driveway-cleaning__sunshine-coast": {
    angle: [
      "Sunshine Coast driveways pick up two different problems depending on location. Coastal driveways in Caloundra, Mooloolaba and Noosa carry salt and windblown sand alongside the usual grime; hinterland driveways around Buderim and Maleny green over with moss and algae from the shade and rainfall, and can get genuinely slippery. Both clean up best with a rotary surface cleaner and, for the green growth, a treatment step.",
      "Because we run Sunshine Coast work as batched trips, driveway cleans are most cost-effective combined with another service on the same visit — a house wash or pool-surround clean, for example. We match pressure to the surface and treat organic growth so it doesn't return within weeks.",
    ],
    faqs: [
      { q: "Why is my hinterland driveway so slippery?", a: "Moss and algae. Shaded, damp hinterland driveways grow a thin biological film that's slick when wet. Rinsing it off is temporary; we treat it so the growth is killed at the root and the surface stays clean and grippy for far longer." },
      { q: "Should I book the driveway with another job?", a: "On the Sunshine Coast it's usually the smart move — jobs are batched into scheduled trips, so pairing the driveway with a house wash or gutter clean on the same visit is more efficient than booking a separate trip for it." },
      { q: "Does salt affect coastal driveways?", a: "Salt and windblown sand grind into coastal concrete and pavers and dull the finish over time. Regular cleaning lifts the salt film before it builds up; we use a surface cleaner for an even result across the whole slab." },
    ],
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
  "solar-panel-cleaning__sunshine-coast": {
    angle: [
      "On the Sunshine Coast, solar panels collect different things depending on where the home sits. Coastal arrays in Mooloolaba, Coolum and Noosa carry a salt film that bonds to the glass and cuts output between rain; hinterland arrays around Buderim and Maleny collect pollen, leaf debris and bird droppings from the surrounding canopy. Both reduce generation, and neither fully rinses away in normal rain.",
      "We clean with deionised water and soft brushes only — no detergents or abrasives — so the manufacturer's warranty stays intact, and we use safe roof-access equipment. Coastal salt-affected panels often benefit from a tighter cleaning cycle than inland ones. Sunshine Coast solar cleans are booked into our scheduled trips.",
    ],
    faqs: [
      { q: "Does coastal salt affect solar output?", a: "Yes. Salt film bonds to panel glass near the water and cuts light transmission, and it doesn't fully wash off in rain. Coastal Sunshine Coast arrays often benefit from more frequent cleaning than inland ones to hold their generation through the year." },
      { q: "What do you use to clean the panels?", a: "Deionised (pure) water and soft brushes only — no detergents, no abrasives, no pressure washing. That's the method manufacturers specify, so it keeps your warranty intact while lifting salt, pollen and bird droppings off the glass." },
      { q: "Can you reach panels on a two-storey hinterland home?", a: "Yes. We use safe roof-access equipment suited to the pitch and height, including the steeper roofs common on hinterland builds. Access is assessed as part of the written quote so there are no surprises on the day." },
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
  "strata-cleaning__sunshine-coast": {
    angle: [
      "Sunshine Coast strata splits between coastal resort-style complexes and hinterland developments, and they age differently. Beachfront and near-beach buildings in Mooloolaba, Maroochydore and Noosa carry salt on glass, balustrades and facades and present to a high holiday-let standard; hinterland complexes deal with moss, leaf load and gutter overflow from the surrounding canopy. Both need a systematic, insured contractor.",
      "We service Sunshine Coast body corporate on batched scheduled trips with the same compliance other regions get — $20M public liability, certificates of currency, SWMS and contractor inductions issued before the first visit. Quarterly common-area cycles and pre-storm gutter clears are the usual scope, quoted to committees in writing within 24 business hours.",
    ],
    faqs: [
      { q: "Do you service coastal resort and holiday-let complexes?", a: "Yes. Near-beach Sunshine Coast complexes present to a high standard for guests and carry salt on glass and facades, so they often run tighter common-area and window cycles. We scope these to the building's presentation requirements and changeover patterns." },
      { q: "Are you compliant for Sunshine Coast body corporate work?", a: "Yes — the same as everywhere we work. $20M public liability, certificates of currency, SWMS and contractor inductions (Cm3, Rapid Global, Avetta) are issued before the first attendance, regardless of which region the complex is in." },
      { q: "How do you handle travel for Sunshine Coast strata?", a: "Strata scopes are batched into our scheduled Sunshine Coast runs, which keeps the cost efficient for committees. A whole-of-year maintenance plan is the most economical way to book it, since the visits are planned into the trip cadence in advance." },
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
  "commercial-cleaning__sunshine-coast": {
    angle: [
      "Sunshine Coast commercial work centres on the tourism and hospitality strip — shopfronts, restaurant facades, resort exteriors and car parks in Mooloolaba, Maroochydore, Caloundra and Noosa that present directly to holiday traffic and carry coastal salt. Hinterland commercial sites deal more with moss, leaf load and damp staining. Both need an insured contractor that works cleanly around customers and trading hours.",
      "We service Sunshine Coast commercial exteriors on batched scheduled trips with after-hours availability, EWP-licensed crew for height work and $20M public liability behind every job. Pre-season and pre-event presentation cleans are common scope for hospitality venues, quoted in writing within 24 business hours.",
    ],
    faqs: [
      { q: "Do you clean hospitality and retail exteriors on the Coast?", a: "Yes — shopfronts, restaurant facades, resort exteriors and entries are core scope on the Sunshine Coast. Coastal salt dulls glass and facades quickly in high-traffic tourist areas, so these venues often run regular presentation cleans, scheduled around trading." },
      { q: "Can presentation cleans be timed for peak season?", a: "Yes. Hospitality and retail venues commonly book a presentation clean before peak holiday periods and major events so the exterior looks its best for the busiest traffic. We plan these into our scheduled Sunshine Coast trips ahead of time." },
      { q: "Is your crew insured and licensed for Coast commercial work?", a: "Yes — $20M public liability, EWP licensing for height and facade work, SWMS and site safety protocols apply to every commercial job regardless of region. Documentation is provided up front for property and venue managers." },
    ],
  },
};

export function getServiceLocationContent(
  serviceSlug: string,
  citySlug: string,
): ServiceLocationContent | undefined {
  return SERVICE_LOCATION_CONTENT[serviceLocationKey(serviceSlug, citySlug)];
}
