export type AdsBlock = { title: string; body: string };

export type AdsPage = {
  path: string;
  eyebrow: string;
  h1: string;
  lede: string;
  title: string;
  description: string;
  introTitle: string;
  intro: string;
  points: AdsBlock[];
  surfacesTitle: string;
  surfacesIntro: string;
  surfaces: AdsBlock[];
  stepsTitle: string;
  stepsIntro: string;
  steps: AdsBlock[];
  areaTitle: string;
  areaBody: string;
  closingTitle: string;
  closingBody: string;
  faqs: { q: string; a: string }[];
};

export const HOUSE_WASH_LP: AdsPage = {
  path: "/house-washing-brisbane-lp/",
  eyebrow: "House Washing · Brisbane QLD",
  h1: "House Washing Brisbane – Get a Free Quote",
  lede:
    "Safely remove mould, algae, grime and weather staining from your home's exterior with professional soft washing built for Brisbane conditions.",
  title: "House Washing Brisbane - WSI Cleaning",
  description:
    "Professional house washing in Brisbane using safe soft-wash methods for render, brick, weatherboard and painted exteriors. $20M insured, 4.9/5 Google rating, free fixed quote.",
  introTitle: "Clean the exterior without blasting the surface.",
  intro:
    "Brisbane’s humidity and warm conditions encourage mould, algae and grime on render, painted weatherboard and brick. Soft washing uses lower pressure and the right treatment to clean the surface without the damage associated with aggressive high pressure.",
  points: [
    {
      title: "Surface-safe soft washing",
      body: "Designed for render, paint, weatherboard, brick and fibre cement where excessive pressure can cause damage.",
    },
    {
      title: "Mould & algae treated properly",
      body: "The cleaning process targets organic build-up rather than simply blasting visible dirt from the wall.",
    },
    {
      title: "Fixed quote before the job",
      body: "Know the agreed price before work begins — no hourly surprise at the end.",
    },
  ],
  surfaces: [
    { title: "Acrylic render", body: "Low-pressure soft washing for grime, mould and biological staining without aggressive blasting." },
    { title: "Painted weatherboard", body: "Controlled cleaning designed to protect painted finishes and avoid forcing water behind boards." },
    { title: "Brick exteriors", body: "House washing for accumulated dirt, cobwebs and organic growth across brick facades and walls." },
    { title: "Fibre cement", body: "Gentler exterior cleaning for coated surfaces such as fibre cement and James Hardie products." },
  ],
  surfacesTitle: "Exterior surfaces we wash.",
  surfacesIntro: "A focused Brisbane house washing service for the exterior materials homeowners deal with most.",
  stepsTitle: "Your house wash in four steps.",
  stepsIntro: "A low-friction quote process built to move Brisbane homeowners from enquiry to clean exterior quickly.",
  steps: [
    { title: "Request your quote", body: "Send your name, phone and suburb/postcode. Add extra details only if you want to." },
    { title: "Receive a fixed price", body: "WSI reviews the property details and returns a written quote, usually within one business day." },
    { title: "Book the clean", body: "Choose a suitable appointment. Most residential work can be scheduled within the same week." },
    { title: "Walk through the result", body: "Your exterior is cleaned using the method appropriate to the surface and checked before completion." },
  ],
  areaTitle: "Focused on Greater Brisbane.",
  areaBody:
    "Our team washes homes throughout Greater Brisbane, including the inner city, western corridor, northern suburbs and bayside areas.",
  closingTitle: "Get your Brisbane house washing quote.",
  closingBody: "Tell us about the exterior and we'll send a fixed price for the house wash.",
  faqs: [
    { q: "How often should I wash my house in Brisbane?", a: "Most Brisbane homes benefit from a full exterior wash around every 12–18 months. Shaded walls, heavy tree cover and properties with faster mould build-up may need cleaning sooner." },
    { q: "Will soft washing damage render or paint?", a: "Soft washing is specifically used where high pressure may damage render, painted weatherboard, fibre cement or coated surfaces. The method relies on appropriate treatment and controlled pressure." },
    { q: "How quickly can I get a quote?", a: "Quotes are normally returned within 24 business hours, with many residential jobs scheduled within the same week." },
    { q: "Is WSI Cleaning insured?", a: "Yes. WSI Cleaning carries $20 million in public liability insurance." },
    { q: "Do I need to be home during the clean?", a: "Not necessarily. If the team has suitable access to the exterior, outdoor water and required utilities, many jobs can proceed without the homeowner being present." },
    { q: "What happens if I am not happy with the result?", a: "If you report a problem within 24 hours of completion, the team will return to address it at no extra cost." },
  ],
};

export const PRESSURE_WASH_LP: AdsPage = {
  path: "/pressure-washing-brisbane-lp/",
  eyebrow: "Pressure Washing · Brisbane QLD",
  h1: "Pressure Washing Brisbane – Get a Free Quote",
  lede:
    "Restore driveways, concrete, patios, pavers and hard exterior surfaces with professional pressure washing across Brisbane.",
  title: "Pressure Washing Brisbane - WSI Cleaning",
  description:
    "Professional pressure washing in Brisbane for driveways, concrete, patios, pavers and hard exterior surfaces. $20M insured, 4.9/5 Google rating, free fixed quote.",
  introTitle: "Powerful cleaning, controlled for the surface.",
  intro:
    "Brisbane driveways, paths and outdoor surfaces collect dirt, mould, algae and traffic grime. Professional pressure washing combines the right equipment, pressure and technique to lift built-up contamination while protecting the surface beneath.",
  points: [
    { title: "Professional pressure control", body: "Pressure, nozzle selection and working distance are adjusted to suit concrete, pavers and other hard exterior surfaces." },
    { title: "Built-up grime removed", body: "The cleaning process targets dirt, mould, algae and weather staining that ordinary rinsing leaves behind." },
    { title: "Fixed quote before the job", body: "Know the agreed price before work begins — no hourly surprise at the end." },
  ],
  surfacesTitle: "What we clean with pressure washing.",
  surfacesIntro: "A focused Brisbane pressure washing service built around the surfaces homeowners need cleaned most.",
  surfaces: [
    { title: "Driveways & concrete", body: "Professional pressure washing for concrete driveways, parking areas and hardstand surfaces." },
    { title: "Paths & walkways", body: "Remove built-up dirt, mould and grime from exterior paths and pedestrian areas." },
    { title: "Patios & courtyards", body: "Refresh outdoor entertaining areas with controlled pressure cleaning suited to the surface." },
    { title: "Pavers & hard surfaces", body: "Pressure cleaning for pavers and other durable exterior surfaces where higher pressure is appropriate." },
  ],
  stepsTitle: "Your pressure washing in four steps.",
  stepsIntro: "A low-friction quote process built to move Brisbane homeowners from enquiry to completed pressure washing quickly.",
  steps: [
    { title: "Request your quote", body: "Send your name, phone and suburb/postcode. Add extra details only if you want to." },
    { title: "Receive a fixed price", body: "WSI reviews the property details and returns a written quote, usually within one business day." },
    { title: "Book the clean", body: "Choose a suitable appointment. Most residential work can be scheduled within the same week." },
    { title: "Walk through the result", body: "Your exterior is cleaned using the method appropriate to the surface and checked before completion." },
  ],
  areaTitle: "Focused on Greater Brisbane.",
  areaBody:
    "Our team pressure washes driveways and hard surfaces throughout Greater Brisbane, including the inner city, western corridor, northern suburbs and bayside areas.",
  closingTitle: "Get your Brisbane pressure washing quote.",
  closingBody: "Tell us about the surfaces and we'll send a fixed price for the pressure wash.",
  faqs: [
    { q: "What surfaces can you pressure wash?", a: "Pressure washing is commonly used for concrete driveways, paths, patios, pavers, retaining walls and other hard exterior surfaces where controlled higher pressure is appropriate." },
    { q: "Can pressure washing damage concrete or pavers?", a: "Incorrect pressure, distance or nozzle choice can damage some surfaces. WSI uses professional equipment and adjusts the cleaning method to suit the material and condition." },
    { q: "Can you remove mould and built-up grime?", a: "Yes. Pressure washing can remove accumulated dirt, mould, algae and surface grime from many hard outdoor surfaces, with treatment used where appropriate." },
    { q: "How quickly can I get a quote?", a: "Quotes are normally returned within 24 business hours, with many residential jobs scheduled within the same week." },
    { q: "Is WSI Cleaning insured?", a: "Yes. WSI Cleaning carries $20 million in public liability insurance." },
    { q: "Do I need to be home during the clean?", a: "Not necessarily. If the team has suitable access to the areas being cleaned, outdoor water and required utilities, many jobs can proceed without the homeowner being present." },
  ],
};

export const WINDOW_WASH_LP: AdsPage = {
  path: "/window-cleaning-brisane-lp/",
  eyebrow: "Window Cleaning · Brisbane QLD",
  h1: "Window Cleaning Brisbane – Get a Free Quote",
  lede:
    "Clear, streak-free glass for Brisbane homes, offices and shopfronts — with frames, sills, tracks and fly screens cleaned as part of the job.",
  title: "Window Cleaning Brisbane - WSI Cleaning",
  description:
    "Professional window cleaning in Brisbane for homes, offices and shopfronts. Glass, frames, sills, tracks and screens. $20M insured, free fixed quote.",
  introTitle: "More than a quick wipe of the glass.",
  intro:
    "Dust, pollen, cobwebs and water marks build up quickly on Brisbane windows, and dirty frames and tracks wash straight back onto the glass if they are skipped. A professional clean works from the outside in: frames and sills first, then a two-stage glass wash finished by hand at the edges and corners.",
  points: [
    {
      title: "Two-stage glass clean",
      body: "A microfibre and detergent wash lifts the grime, then a squeegee or a deionised-water rinse leaves the glass clear.",
    },
    {
      title: "Upper storeys handled safely",
      body: "Hard-to-reach and second-storey windows are cleaned with a water-fed pole using deionised water, which dries without spotting.",
    },
    {
      title: "Fixed quote before the job",
      body: "Know the agreed price before work begins — no hourly surprise at the end.",
    },
  ],
  surfacesTitle: "Glass and frames we clean.",
  surfacesIntro: "A focused Brisbane window cleaning service for the glass and fittings property owners ask about most.",
  surfaces: [
    { title: "Windows & sliding doors", body: "Single and double-glazed glass cleaned inside and out where access allows, with frames, sills and tracks." },
    { title: "Fly screens", body: "Screens are removed, rinsed, dried and refitted. Damaged screens are shown to you rather than put back broken." },
    { title: "Tinted glass", body: "Cleaned with soft microfibre only, with no abrasives that could dull the tint." },
    { title: "Balustrades & pool fences", body: "Detergent wash and deionised-water rinse for a spot-free finish on glass balustrades and pool fencing." },
  ],
  stepsTitle: "Your window clean in four steps.",
  stepsIntro: "A simple quote process that takes Brisbane property owners from enquiry to clear windows quickly.",
  steps: [
    { title: "Request your quote", body: "Send your name, phone and suburb/postcode. Let us know if you need inside, outside or both." },
    { title: "Receive a fixed price", body: "WSI reviews the property details and returns a written quote, usually within one business day." },
    { title: "Book the clean", body: "Choose a one-off clean or a regular schedule — fortnightly, monthly or quarterly." },
    { title: "Walk through the result", body: "Edges and corners are detailed by hand, and every side of the property is checked with you before completion." },
  ],
  areaTitle: "Window cleaning across Greater Brisbane.",
  areaBody:
    "Our team cleans windows for homes, offices, shopfronts and body corporate properties throughout Greater Brisbane, including the inner city, western corridor, northern suburbs and bayside areas.",
  closingTitle: "Get your Brisbane window cleaning quote.",
  closingBody: "Tell us about your windows and we'll send a fixed price — inside, outside or both.",
  faqs: [
    { q: "What is included in a window clean?", a: "The glass (both sides where access permits), frames, sills, tracks and fly screens. Edges and corners are finished by hand." },
    { q: "How often should I have my windows cleaned?", a: "For most Brisbane homes, quarterly is the most common cycle. Street-front shops often book fortnightly or monthly to keep their glass presentable." },
    { q: "Can you clean upstairs windows?", a: "Yes. Upper-storey and difficult-access glass is cleaned with a water-fed pole and deionised water, which dries without water spots." },
    { q: "Can you clean windows in the rain?", a: "Light rain is fine because rainwater on clean glass dries spot-free. In heavy rain we reschedule at no callout fee." },
    { q: "Is WSI Cleaning insured?", a: "Yes. WSI Cleaning carries $20 million in public liability insurance." },
    { q: "What happens if I am not happy with the result?", a: "If you report a problem within 24 hours of completion, the team will return to address it at no extra cost." },
  ],
};
