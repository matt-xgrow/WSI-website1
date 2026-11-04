export type AdsPage = {
  path: string;
  eyebrow: string;
  h1: string;
  lede: string;
  title: string;
  description: string;
  points: { title: string; body: string }[];
  surfaces: { title: string; body: string }[];
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
  points: [
    { title: "Professional pressure control", body: "Pressure, nozzle and distance are matched to the surface so concrete and pavers are cleaned without unnecessary damage." },
    { title: "Built-up grime removed", body: "Oil, tyre marks, mould and ground-in dirt lifted from driveways, paths and hard outdoor areas." },
    { title: "Fixed quote before the job", body: "Know the agreed price before work begins — no hourly surprise at the end." },
  ],
  surfaces: [
    { title: "Driveways & concrete", body: "Surface-cleaner passes for an even finish on broom-finish concrete and exposed aggregate." },
    { title: "Paths & walkways", body: "Dirt and algae removed from paths so they look even and are less slippery when wet." },
    { title: "Patios & courtyards", body: "Outdoor living areas cleaned without zebra striping." },
    { title: "Pavers & hard surfaces", body: "Controlled pressure for pavers, retaining walls and other hard exterior surfaces." },
  ],
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
    "Streak-free interior and exterior window cleaning for Brisbane homes, offices and shopfronts. Frames, sills, tracks and flyscreens included.",
  title: "Window Cleaning Brisbane - WSI Cleaning",
  description:
    "Professional window cleaning in Brisbane for homes, offices and shopfronts. Streak-free glass, frames and sills. $20M insured, free fixed quote.",
  points: [
    { title: "Streak-free glass", body: "Detergent and squeegee on accessible glass, or deionised water on a pole for upper storeys, so the finish dries without spots." },
    { title: "Frames, sills and tracks", body: "Dirt is removed from the frame before the glass is finished, so dust is not washed back onto clean panes." },
    { title: "Fixed quote before the job", body: "Know the agreed price before work begins — no hourly surprise at the end." },
  ],
  surfaces: [
    { title: "Home windows", body: "Interior and exterior glass for houses and townhouses across Brisbane." },
    { title: "Shopfronts", body: "Street-facing glass cleaned so the business looks open and cared for." },
    { title: "Office glass", body: "Regular or one-off cleans for offices and strata foyers." },
    { title: "Flyscreens", body: "Screens removed, rinsed and refitted where access allows." },
  ],
  faqs: [
    { q: "Do you clean inside and outside?", a: "Yes. A standard clean covers both sides where we can reach them safely, plus frames, sills and tracks." },
    { q: "How often should Brisbane windows be cleaned?", a: "Most homes look right on a quarterly clean. Properties with more dust, trees or river exposure are often booked monthly." },
    { q: "How quickly can I get a quote?", a: "Quotes are normally returned within 24 business hours, with many residential jobs scheduled within the same week." },
    { q: "Is WSI Cleaning insured?", a: "Yes. WSI Cleaning carries $20 million in public liability insurance." },
    { q: "Do I need to be home?", a: "For exterior-only work, not always. Interior glass needs someone on site to let the crew in." },
  ],
};
