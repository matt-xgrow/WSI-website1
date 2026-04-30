export type ServiceFaq = { q: string; a: string };

export type ServiceContent = {
  lead: string;
  definition: { title: string; body: string };
  process: { title: string; body: string }[];
  surfaces: { name: string; note: string }[];
  faqs: ServiceFaq[];
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "house-washing": {
    lead: "House washing is the regular cleaning of exterior walls, eaves, fascias and entry points to remove mould, algae, lichen, dust and cobwebs. WSI Cleaning soft-washes residential exteriors across Brisbane and the Sunshine Coast, where the subtropical climate accelerates mould growth on render, paint and weatherboard. Most homes need a full house wash every 12–18 months; shaded southern walls and homes within a kilometre of the coast typically need it more often. We quote in writing within 24 business hours and most residential jobs are scheduled inside the same week.",
    definition: {
      title: "What is soft washing?",
      body: "Soft washing is a low-pressure exterior cleaning method that uses a biodegradable detergent — typically a sodium hypochlorite solution blended with a surfactant — to kill mould, algae and lichen at the spore level. Pressure stays under 500 PSI, compared with 1,500–3,000 PSI for residential pressure washing. Soft washing is the correct method for any surface where high pressure would force water behind the substrate or strip the finish: render, painted weatherboard, brick, fibre cement and roof tiles. The chemistry does the cleaning, not the pressure.",
    },
    process: [
      { title: "Surface assessment", body: "We walk the property, identify the substrate (render, brick, weatherboard, fibre cement) and flag any vulnerable points: timber, soft mortar, garden beds, painted shutters." },
      { title: "Pre-treatment", body: "Plants are pre-watered and tarped where needed. Windows, doors and outdoor electrics are checked and protected." },
      { title: "Soft-wash application", body: "Detergent is applied bottom-up via low-pressure pump to prevent streaking, then dwelled for 5–10 minutes so the chemistry kills mould and algae at the root." },
      { title: "Rinse", body: "Surfaces are rinsed with controlled-pressure water, top-down, until run-off is clear." },
      { title: "Finishing", body: "Eaves, downpipes, sills and entry points are detailed by hand. Garden beds are flushed to neutralise any over-spray." },
    ],
    surfaces: [
      { name: "Acrylic render", note: "Soft wash only. High pressure can blow render off the substrate." },
      { name: "Painted weatherboard", note: "Soft wash. Pressure strips paint and forces water behind the boards." },
      { name: "Face brick", note: "Soft wash for general dirt; targeted pressure for efflorescence." },
      { name: "Fibre cement & James Hardie", note: "Soft wash. Pressure can damage the surface coating." },
    ],
    faqs: [
      { q: "How often should I wash my house in Brisbane?", a: "Most Brisbane homes need a full exterior wash every 12–18 months. Shaded south-facing walls, properties under heavy tree cover and homes within a kilometre of the coast typically need it every 9–12 months because of faster mould and salt build-up." },
      { q: "Will soft washing kill my plants?", a: "No. We pre-water and tarp garden beds, dilute the application correctly for the substrate and flush the soil after we finish. The detergent we use breaks down on contact and is rated safe for residential landscaping when applied at the correct dilution." },
      { q: "Can I pressure wash my render?", a: "No. Acrylic render and most painted exteriors should never be pressure washed — high pressure cracks render, blows it off the substrate or strips paint. Soft washing is the correct method for any rendered, painted or coated wall." },
      { q: "How long does a house wash take?", a: "A standard single-storey home is usually 3–5 hours on site. Two-storey and architecturally complex homes take 5–8 hours. We confirm the time estimate with the written quote." },
      { q: "Do you guarantee the result?", a: "Yes. If you're not happy with the finish, tell us within 24 hours and we'll come back and fix it at no extra cost." },
    ],
  },

  "pressure-washing": {
    lead: "Pressure washing is the high-pressure cleaning of hard exterior surfaces — concrete, pavers, exposed aggregate, brick paths, retaining walls and pool surrounds — to remove ground-in dirt, oil, tyre marks, algae and rubber. WSI Cleaning runs commercial-grade pressure washers (3,000–4,000 PSI) with rotary surface cleaners for even results across Brisbane and the Sunshine Coast. We pressure-wash anything you walk or drive on; for walls, roofs and painted surfaces we use soft washing instead. Quotes are fixed in writing inside 24 business hours.",
    definition: {
      title: "Soft wash vs pressure wash — which does my property need?",
      body: "Render, paint, weatherboard, fibre cement and roof tiles need soft washing (under 500 PSI) so the surface isn't stripped or pierced. Concrete driveways, paver paths, pool surrounds, retaining walls and unsealed brick can take pressure washing (1,500–4,000 PSI) safely. As a rule of thumb: anything you would repaint needs soft wash; anything you walk or drive on can be pressure washed. WSI quotes both methods in the same site visit, so the right surface gets the right treatment.",
    },
    process: [
      { title: "Surface assessment", body: "We identify the substrate (broom-finish concrete, exposed aggregate, sandstone, pavers, brick) and check for cracks, lifting joints or sealing that affects pressure choice." },
      { title: "Pre-rinse and degreasing", body: "Loose debris is blown off. Oil stains are pre-treated with a degreaser and dwelled for 5–10 minutes." },
      { title: "Surface cleaner pass", body: "A rotary surface cleaner is run in overlapping passes for even pressure across the whole area — no zebra striping, no missed strips." },
      { title: "Edge and detail work", body: "Edges, expansion joints, around drains and against walls are detailed with a wand for a consistent finish." },
      { title: "Final rinse and inspection", body: "Run-off is rinsed clear of the area, then we walk the surface with you before leaving." },
    ],
    surfaces: [
      { name: "Concrete driveways", note: "Surface cleaner at 3,000–4,000 PSI. Restores broom and trowel finish." },
      { name: "Exposed aggregate", note: "Lower pressure (2,000–2,500 PSI) to avoid loosening stones; chemical pre-treat for moss." },
      { name: "Pavers & cobblestone", note: "Pressure plus optional re-sanding of joints after cleaning." },
      { name: "Pool surrounds", note: "Detergent-led clean to lift sunscreen and body oils without acid-etching." },
    ],
    faqs: [
      { q: "Will pressure washing damage my concrete?", a: "Not when it's done correctly. Standard broom-finish concrete handles 3,000–4,000 PSI. Exposed aggregate, sandstone and weak or aged concrete need lower pressure (2,000–2,500 PSI) and a wider tip to avoid pitting or stone loss." },
      { q: "Can you remove oil stains?", a: "Most fresh and intermediate-age oil stains lift with a degreaser pre-treat and pressure pass. Deep, decade-old oil that has soaked into porous concrete may not come out fully — we'll tell you on the quote whether to expect a 90% lift or a complete clean." },
      { q: "Do you re-sand pavers after cleaning?", a: "Yes, on request. Re-sanding stabilises the joints and stops weeds returning quickly. Specify on the quote if you want it included." },
      { q: "Should I seal the concrete after washing?", a: "Sealing isn't required, but it slows re-soiling and helps oil and rust resist staining. We can recommend a sealer or refer a coatings specialist for the application." },
      { q: "How much water does a pressure wash use?", a: "Roughly 200–400 litres per hour at residential PSI. We work from your outdoor tap; for properties on tank water we can bring our own supply on request." },
    ],
  },

  "window-cleaning": {
    lead: "Window cleaning covers interior and exterior glass, frames, sills, screens and tracks for homes, offices, shopfronts and body corporate properties. WSI Cleaning operates across Brisbane and the Sunshine Coast on either one-off bookings or recurring schedules — fortnightly, monthly and quarterly are the most common. Coastal Sunshine Coast homes typically need windows cleaned every 6–8 weeks because of salt-air haze; inland Brisbane homes can stretch to quarterly without losing clarity.",
    definition: {
      title: "What's included in a professional window clean?",
      body: "A full window clean covers the glass (both sides where access permits), frames, sills, tracks and fly screens. We use a two-stage process: a microfibre and detergent wash to lift dirt and salt, then either a squeegee on accessible glass or a deionised-water pole system for upper-storey and difficult-access windows. Deionised water dries with no spotting because the minerals that cause water marks have been filtered out — important on the salt-affected glass common across South East Queensland.",
    },
    process: [
      { title: "Site walk", body: "We confirm internal vs external scope, count windows, identify ground-floor vs upper-storey access and check for fly screens to remove and rinse separately." },
      { title: "Frame and sill clean", body: "Frames, sills and tracks are vacuumed and wiped before we touch the glass — otherwise dirt washes onto the just-cleaned glass." },
      { title: "Glass wash", body: "Detergent is applied with a microfibre, then squeegeed off in overlapping strokes (ground floor) or rinsed with deionised water on a pole (upper floors)." },
      { title: "Detail and inspection", body: "Edges and corners are detailed by hand. We walk every elevation with the customer before invoicing." },
    ],
    surfaces: [
      { name: "Standard glass (single, double-glazed)", note: "Full two-stage clean inside and out where access allows." },
      { name: "Tinted glass", note: "Soft microfibre only — no abrasives that could dull the tint coat." },
      { name: "Pool fence & balustrade glass", note: "Detergent + DI rinse for spot-free finish." },
      { name: "Skylights and high glazing", note: "DI water-fed pole or EWP for upper-storey access." },
    ],
    faqs: [
      { q: "Do you clean fly screens?", a: "Yes. Screens are removed, rinsed, allowed to dry and replaced. If a screen is damaged or sun-rotted we'll show you and quote a replacement separately rather than reinstall it broken." },
      { q: "How often should I have my windows cleaned?", a: "Inland Brisbane: quarterly is the most common cycle. Within 1 km of the coast (Sunshine Coast): every 6–8 weeks because of salt haze. Commercial street-front shops: fortnightly or monthly to maintain presentation." },
      { q: "Do you bring your own water?", a: "We work from your outdoor tap by default. For tank-water properties or commercial sites without external taps we can bring tank water for an additional fee — flag it on the quote." },
      { q: "Can you clean windows in the rain?", a: "Light rain is fine — rainwater on already-clean glass dries spot-free. Heavy rain we reschedule, because we can't see the result. We won't charge a callout fee for weather rescheduling." },
      { q: "Do you do same-day cleans?", a: "When the schedule allows, yes — we keep a same-week buffer for urgent cleans before opens, inspections and shopfront events." },
    ],
  },

  "gutter-cleaning": {
    lead: "Gutter cleaning is the clearing of leaf litter, sediment and debris from gutters and downpipes so rainwater can flow freely. WSI Cleaning services gutters across Brisbane and the Sunshine Coast — a region where storm-season rainfall (October to March) regularly produces rainfall events that overflow blocked gutters within minutes. Most homes need their gutters cleared once a year; properties under or near eucalypts, jacarandas or palms typically need it twice a year. We work from a roof or off ladders depending on pitch and access, and document every job with before-and-after photos.",
    definition: {
      title: "Why does gutter cleaning matter in South East Queensland?",
      body: "Blocked gutters cause water to overflow back under the roofline, into eaves, down internal walls and along fascia boards. In Brisbane — where 100mm-per-hour rainfall events are common during storm season — a partial blockage is enough to send water inside the home in a single afternoon. Clearing gutters before October each year is the single highest-leverage exterior maintenance task for most QLD homeowners, and it's the trigger for almost every internal water-damage insurance claim we see referrals for.",
    },
    process: [
      { title: "Access and safety set-up", body: "We assess pitch and roof type, set up working-at-heights gear and identify any tile or sheet damage from previous cleans before we get on the roof." },
      { title: "Hand removal of debris", body: "Larger leaves and twigs are removed by hand into a bucket — we don't blow debris into garden beds." },
      { title: "Sediment flush", body: "Remaining sediment is flushed downpipe-bound. Where the downpipe is partially blocked, we clear it by water pressure or rod-out." },
      { title: "Downpipe and overflow check", body: "Each downpipe is run with a hose to verify clear flow. Any standing water or back-flush is flagged on the report." },
      { title: "Photo documentation", body: "Before-and-after photos of each elevation are sent with the invoice — useful for landlords, strata managers and insurance records." },
    ],
    surfaces: [
      { name: "Quad gutter (most common in QLD)", note: "Standard hand-clear and flush." },
      { name: "Box gutter", note: "Higher attention because the consequences of overflow are bigger; often requires sediment flush via roof access." },
      { name: "Fascia gutter", note: "Often paired with eave or fascia inspection — a flagged sign of overflow damage." },
      { name: "Half-round gutter", note: "More common on heritage Queenslanders; same process, slower because of bracket spacing." },
    ],
    faqs: [
      { q: "How often should I clean my gutters?", a: "Once a year for most Brisbane and South East Queensland homes — booked before October so they're clear for storm season. Properties under heavy tree cover (eucalypt, jacaranda, palm) need it twice a year, typically May and September." },
      { q: "Can a blocked gutter cause inside-the-home damage?", a: "Yes — and quickly. In a 100mm-per-hour Brisbane storm a blocked gutter overflows backward under the roofline and water tracks down internal walls or into ceilings within an hour. Most internal water-damage claims trace back to a single blocked gutter." },
      { q: "Do you clear downpipes?", a: "Yes. Every gutter clean includes a downpipe flush. Where a downpipe is fully blocked and water-pressure flushing isn't enough, we'll quote a rod-out or recommend a plumber for a deeper clear." },
      { q: "Do you take photos of the work?", a: "Yes. Before-and-after photos of every elevation are sent with the invoice. Useful for landlords, body corporate compliance, and insurance documentation." },
      { q: "Will you walk on tile roofs?", a: "Yes, where the tiles can take it. We carry crawl boards and harness for tiled roofs and we walk only on supported tiles. We won't get on a roof we don't trust — we'll work from ladders instead." },
    ],
  },

  "roof-cleaning": {
    lead: "Roof cleaning is the chemical treatment and rinsing of tile, metal or terracotta roofs to remove moss, lichen, algae and accumulated grime. WSI Cleaning soft-washes residential roofs across Brisbane and the Sunshine Coast — three regions where humidity, tree shade and salt air drive faster organic growth than most parts of Australia. We treat at the spore level so the regrowth interval is 3–5 years, not the 6–12 months you get from a pressure-only clean. Quoted in 24 hours, on-site within the week.",
    definition: {
      title: "Why soft wash a roof instead of pressure wash?",
      body: "Soft washing kills moss and lichen at the root with a biocidal detergent, then lets rain rinse the dead growth off over the following weeks. Pressure-only cleaning blasts the visible surface clean but leaves the spores embedded in the substrate, so growth returns in 6–12 months. High pressure also strips the cementitious layer of concrete tiles, dislodges terracotta tiles and pierces aged Colorbond paint. WSI's soft-wash process treats and rinses at safe pressures (under 500 PSI) — a treated roof typically stays visibly clean for 3–5 years.",
    },
    process: [
      { title: "Roof assessment", body: "We identify the roof type (concrete tile, terracotta, Colorbond, tin), check for cracked or slipped tiles and confirm pitch for safe access." },
      { title: "Gutter pre-clean", body: "Gutters are cleared first so the wash run-off doesn't block them on the way down." },
      { title: "Soft-wash treatment", body: "Biocidal detergent is applied via low-pressure pump across the full roof, including the moss-prone southern aspect, and dwelled for 15–20 minutes." },
      { title: "Controlled rinse", body: "Roof is rinsed at safe pressure, top-down. We don't drive water under tile laps or behind ridge capping." },
      { title: "Final inspection and downpipe flush", body: "Each downpipe is flushed clear of dislodged debris and we walk the property with the customer before leaving." },
    ],
    surfaces: [
      { name: "Concrete tile", note: "Soft wash; pressure strips the cementitious surface and accelerates re-mossing." },
      { name: "Terracotta tile", note: "Soft wash only. Aged terracotta is brittle and pressure dislodges tiles and ridge capping." },
      { name: "Colorbond / metal", note: "Soft wash. Pressure pierces aged paint and creates rust-prone scratch lines." },
      { name: "Decramastic / tin", note: "Soft wash; pressure tears the granular finish off the panel." },
    ],
    faqs: [
      { q: "How long does a roof clean last?", a: "A soft-wash roof clean typically stays visibly clean for 3–5 years. Properties heavily shaded by trees or close to the coast may see regrowth on the southern aspect at the 2–3 year mark; a top-up treatment every 2 years keeps it indefinitely clean." },
      { q: "Will roof cleaning damage my tiles?", a: "Not the way we do it. Soft washing applies chemistry under 500 PSI — no different in pressure than a garden hose. Damage almost always traces back to high-pressure cleaning of aged or brittle tiles. Cracked or already-failing tiles will be flagged in the assessment so you can decide on replacement before we start." },
      { q: "Do I need to do anything to prepare?", a: "Move cars from the carport-adjacent driveway, close all windows on the day, and let us know if the rainwater tank should be disconnected. We'll handle the rest." },
      { q: "Can the runoff go into my rainwater tank?", a: "We disconnect the tank inlet before treatment and reconnect it after the first post-treatment rain has flushed the roof. If your home is fully tank-supplied, mention it on the quote and we'll plan around it." },
      { q: "Do you re-paint or seal the roof?", a: "Cleaning is a separate service from coating. We don't paint roofs, but we'll refer a coatings specialist if you want the roof recoated after cleaning." },
    ],
  },

  "driveway-cleaning": {
    lead: "Driveway cleaning is the high-pressure restoration of concrete, exposed aggregate, paver and brick driveways to remove ground-in dirt, oil, tyre marks, mould and lichen. WSI Cleaning works driveways across Brisbane and the Sunshine Coast using commercial-grade pressure washers and rotary surface cleaners — the same equipment used on commercial concrete restoration. A clean driveway is the highest-impact curb-appeal job per dollar on most properties: visible from the street, ages with the property, and lifts the sale-day impression of a home before any other exterior work shows.",
    definition: {
      title: "Pressure-washed driveway vs sealed driveway — what's the difference?",
      body: "A pressure wash restores the surface by removing organic build-up, oil and dirt — the visible problem. Sealing is a separate step where a clear coat is applied after cleaning to slow re-soiling, repel oil and stabilise the colour of exposed aggregate. WSI cleans, then refers a coatings specialist if you want the driveway sealed. Cleaning alone is enough for most Brisbane homes; sealing pays back fastest on exposed-aggregate driveways and homes with frequent oil exposure (workshop driveways, work utes).",
    },
    process: [
      { title: "Stain pre-treatment", body: "Oil, rust and tyre stains are degreaser-treated and dwelled before the main pass." },
      { title: "Surface cleaner pass", body: "Rotary surface cleaner runs in overlapping strips for even pressure — no zebra striping, no missed lines." },
      { title: "Edge detail", body: "Wand-detail along edges, expansion joints, around drains and against walls." },
      { title: "Final rinse", body: "Run-off is rinsed off the property and into the street drain." },
      { title: "Optional joint re-sand (pavers)", body: "If you've booked re-sanding, dry sand is brushed into the joints after the surface dries." },
    ],
    surfaces: [
      { name: "Broom-finish concrete", note: "3,000–4,000 PSI surface cleaner pass." },
      { name: "Exposed aggregate", note: "Lower pressure (2,000–2,500 PSI), wider tip — protects the stone." },
      { name: "Pavers", note: "Pressure clean + optional joint re-sanding." },
      { name: "Stamped or coloured concrete", note: "Lower pressure to preserve colour layer; chemical-led approach." },
    ],
    faqs: [
      { q: "Will the driveway look brand new?", a: "Closer to brand new than you'd expect. Most concrete driveways come up looking 90–95% of new. Deep oil that has soaked into porous concrete for years may leave a faint shadow — we'll tell you on the quote whether to expect a complete clean or a 90% lift." },
      { q: "How long does a driveway clean take?", a: "A standard residential driveway is 1.5–3 hours. Long, double-width or commercial driveways take longer; the quote will give you a time estimate." },
      { q: "Should I seal my driveway?", a: "Sealing isn't required, but it's worth doing on exposed aggregate, on workshop driveways with frequent oil exposure, and on stamped or coloured concrete where you want to lock in the colour. We'll point you to a sealer-specialist after the clean — sealing onto wet or dirty concrete defeats the purpose." },
      { q: "Will my plants be okay?", a: "Yes. We pre-water and tarp adjacent garden beds and flush the soil after we finish. The detergent we use is rated safe for residential landscaping at the dilution we apply." },
      { q: "Do you clean concrete cracks?", a: "Cracks come up cleaner along with the surface, but they don't disappear. If you want crack repair before sealing, mention it on the quote and we'll refer a concrete specialist." },
    ],
  },

  "solar-panel-cleaning": {
    lead: "Solar panel cleaning is the gentle washing of photovoltaic panels with deionised water and soft brushes to remove dust, bird droppings, salt and pollen — the build-up that quietly cuts solar output by up to 25% over 12–18 months. WSI Cleaning services residential and commercial solar across Brisbane and the Sunshine Coast. Most homes recover 10–20% of lost output after a single clean, with the highest gains on coastal, dust-zone and bird-perch-adjacent installs. Quoted in 24 hours, panels untouched by hard water or harsh chemistry.",
    definition: {
      title: "Why deionised water and not regular tap water?",
      body: "Deionised water has had its mineral content filtered out, so it dries with no spotting on glass — which is critical on solar panels, where mineral spots reduce light transmission and recreate the loss of output you just paid to remove. Tap water dries with calcium and magnesium spots that act like shade. We use a deionised-water-fed pole system with soft brushes — no detergent on the panel face, no high pressure, no abrasive contact. Manufacturer warranties are preserved.",
    },
    process: [
      { title: "Panel inspection", body: "We check panel condition, inverter status (panels switched off where the system requires it) and roof access before climbing." },
      { title: "Soft brush wash", body: "Each panel is washed with a soft brush on a deionised-water pole — no pressure, no abrasive contact." },
      { title: "Spot-free rinse", body: "Final rinse with deionised water leaves no mineral spots and no shading once dry." },
      { title: "Frame and edge clean", body: "Frame edges and gaps where dirt collects are detailed." },
      { title: "Output check (optional)", body: "We can note pre- and post-clean inverter output if your system has a public read-out — useful for measuring the gain." },
    ],
    surfaces: [
      { name: "Standard PV glass", note: "DI-water + soft brush. No detergent, no pressure." },
      { name: "Frosted / textured PV", note: "Same DI-water process, longer dwell to lift dust from texture." },
      { name: "Tilted ground-mount arrays", note: "Easier access, faster clean — and easier to spot-check for damage." },
      { name: "Commercial roof arrays", note: "Same chemistry; access often via EWP for safe walk-around." },
    ],
    faqs: [
      { q: "How often should I clean my solar panels?", a: "Once a year for most South East Queensland homes. Coastal properties (within 2 km of the beach), homes near agricultural land and installs near bird-roosting trees should be cleaned every 6 months — bird droppings are the single biggest output-killer because they create permanent shaded spots." },
      { q: "Will cleaning my panels void the warranty?", a: "Not when it's done correctly. Most manufacturers explicitly require periodic cleaning; warranty issues come from harsh chemicals, high pressure or scratching the surface. Our deionised-water and soft-brush process is what the manufacturer documentation typically recommends." },
      { q: "How much output will I gain?", a: "Most homes recover 10–20% of lost output after the first clean. Coastal and dust-zone installs sometimes recover more (up to the 25% maximum). Once you're on a regular cycle, the gain stays steady at 5–10% versus uncleaned." },
      { q: "Can you clean panels safely while they're generating?", a: "Yes — water on glass doesn't change the electrics, and we don't lift connectors. For systems where the manufacturer requires shutdown during cleaning, we follow that and switch the inverter off via the AC isolator before starting." },
      { q: "Do you walk on the panels?", a: "Never. We work the panels from the rooftop alongside, never standing on them. Walking on PV creates micro-cracks that fail months later." },
    ],
  },

  "strata-cleaning": {
    lead: "Strata cleaning is the scheduled exterior maintenance of common areas, car parks, breezeways and building facades for body corporate properties. WSI Cleaning works with strata managers and committees across Brisbane and the Sunshine Coast on regular cycles — most commonly quarterly common-area pressure washes paired with twice-yearly gutter cleans and ad-hoc facade work. We carry $20M public liability, issue certificates of currency on request, and work to formal scope-of-work documents so the committee can compare like-for-like quotes.",
    definition: {
      title: "What does a strata cleaning contract typically include?",
      body: "A standard strata maintenance scope covers: pressure cleaning of common-area pavement (driveways, paths, breezeways), washing of glass entry doors and balustrades, gutter cleaning across the full roof line, and ad-hoc soft-wash work on building facades when algae or staining accumulates. Frequency is usually quarterly for paving and breezeways, twice-yearly for gutters, and on-demand for facades. WSI prices each line per surface and per cycle so committees can scope up or down without re-tendering.",
    },
    process: [
      { title: "Site walk and SOW", body: "We meet the strata manager or committee delegate on site, walk every common area, agree the scope of work and put it in writing — surface-by-surface, cycle-by-cycle." },
      { title: "Compliance documentation", body: "Certificate of currency for $20M public liability, SWMS for any working-at-heights work, and induction sign-off to the building's preferred contractor system." },
      { title: "Scheduled work", body: "Each cycle is calendared 12 months in advance with the committee. Residents are notified of the work day per the building's communication preference." },
      { title: "Per-cycle reporting", body: "After each cycle we issue a photo report of the work completed — useful for the next AGM and for the building's compliance file." },
      { title: "Ad-hoc work", body: "Facade soft-wash, post-storm clean-up and emergency gutter response are quoted separately and turned around inside the week." },
    ],
    surfaces: [
      { name: "Common-area paving", note: "Quarterly pressure clean is the most common cycle." },
      { name: "Glass entry doors and balustrades", note: "Same-cycle window clean for a consistent presentation." },
      { name: "Gutters and box gutters", note: "Twice-yearly clear; emergency response in storm season." },
      { name: "Building facade", note: "Ad-hoc soft wash when algae or staining shows." },
    ],
    faqs: [
      { q: "Can you provide a certificate of currency?", a: "Yes. Issued on request before the first cycle, and on renewal each year. Our $20M public liability cover is held with a major Australian insurer; the certificate names the strata plan or body corporate." },
      { q: "How does scheduling work for residents?", a: "We work to the building's existing communication channel — usually the manager sends residents 48–72 hours notice. We arrive at agreed times and stay out of breezeways during high-traffic periods (morning peak, school pick-up) where the committee asks for it." },
      { q: "Do you provide SWMS for working-at-heights?", a: "Yes. Site-specific SWMS is issued for any roof, gutter or EWP work. We'll match the format the building's preferred contractor system uses (Cm3, Rapid Global, Avetta, etc.)." },
      { q: "Can the contract be paused or cancelled?", a: "Yes. Strata contracts are quoted per cycle, not locked in to a multi-year term. Pause, scale up or scale down between cycles without penalty." },
      { q: "How do you handle sensitive plantings or pet areas?", a: "Common-area garden beds and pet zones are tarped and flushed the same way as residential. Any sensitive landscaping is flagged on the SOW so the cleaning crew knows before they start." },
    ],
  },

  "commercial-cleaning": {
    lead: "Commercial exterior cleaning covers facades, shopfronts, awnings, signage, glazing and ground surfaces for offices, retail, hospitality and industrial properties. WSI Cleaning works commercial sites across Brisbane and the Sunshine Coast — typically before-hours or after-hours so the clean lands without disrupting trade. We're set up for working-at-heights with EWP, $20M public liability cover, and contractor-system inductions across the major Australian platforms (Cm3, Rapid Global, Avetta).",
    definition: {
      title: "What's the difference between commercial and residential exterior cleaning?",
      body: "Commercial work involves three things residential rarely does: scheduling around trade hours (most cleans run 4am–7am or after close), formal compliance documentation (SWMS, certificates of currency, contractor inductions) and access at heights (EWP, scaffold or rope access for facade work). The cleaning chemistry is similar — soft wash for facades, pressure wash for paving, deionised water for glazing — but the operational discipline is what makes a commercial clean work without a complaint at 9am open.",
    },
    process: [
      { title: "Site survey", body: "We walk the site with the operations or facilities manager, agree access, scope, hours and compliance requirements." },
      { title: "Compliance pack", body: "Certificate of currency, SWMS, contractor induction (Cm3 / Rapid Global / Avetta as required) issued before the first attendance." },
      { title: "Out-of-hours execution", body: "Most commercial cleans run before opening or after closing. Crew arrives, completes the scope inside the agreed window, and leaves the site presentation-ready." },
      { title: "Sign-off and report", body: "Photo sign-off issued the same day so facilities can verify the work without a return visit." },
      { title: "Recurring schedule", body: "Most commercial sites move to a recurring cycle — fortnightly for high-foot-traffic shopfronts, quarterly for offices, twice-yearly for industrial." },
    ],
    surfaces: [
      { name: "Glass facade and entry", note: "Deionised-water pole system for spot-free glass at any height." },
      { name: "Painted facade and render", note: "Soft wash to lift algae and pollution staining." },
      { name: "Paving, breezeways and loading bays", note: "Pressure wash with degreaser pre-treat where oil is present." },
      { name: "Signage and awnings", note: "Soft wash with detergent that won't fade vinyl or printed graphics." },
    ],
    faqs: [
      { q: "Can you work outside trading hours?", a: "Yes — most commercial cleans run before open or after close. We're set up for early-morning starts (4am–7am is the most common window) and after-hours work for retail, hospitality and 24-hour industrial sites." },
      { q: "What heights can you reach?", a: "Up to 3 storeys with EWP from our standard fleet; higher with hired access (boom lift or rope access). Quote will specify the access method and any weather-dependent rescheduling rules." },
      { q: "Are you on Cm3 / Rapid Global / Avetta?", a: "Yes — induction is straightforward for any of the major platforms. If your site uses a different system, we'll register before the first attendance." },
      { q: "Do you handle hospitality grease and food spills?", a: "Yes. Hospitality scope typically pairs a pressure wash with a degreaser-led pre-treat for back-of-house ground surfaces, plus signage and shopfront glass on the same visit." },
      { q: "How quickly can you respond to a one-off issue?", a: "Same-week is standard for non-urgent commercial work. Storm response, vandalism clean-up and pre-event presentation cleans are quoted and crewed inside 24 hours." },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT[slug];
}
