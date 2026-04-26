import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqPageSchemaFromList,
  graph,
} from "@/lib/seo/schema";
import { CONTENT_UPDATED, site, SITE_URL } from "@/lib/site";

const SLUG = "soft-wash-vs-pressure-wash";
const PAGE_URL = `${SITE_URL}/guides/${SLUG}`;
const TITLE = "Soft Wash vs Pressure Wash — Which Does My Brisbane Property Need?";
const DESCRIPTION =
  "Soft washing uses chemistry under 500 PSI for render, paint and roof tiles. Pressure washing uses 1,500–4,000 PSI for concrete and pavers. Use this guide to pick the right method for every surface on your home.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `/guides/${SLUG}`,
    images: [{ url: "/images/soft-wash.jpg" }],
    type: "article",
    publishedTime: CONTENT_UPDATED.services,
    modifiedTime: CONTENT_UPDATED.services,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/soft-wash.jpg"],
  },
};

const COMPARISON_ROWS: {
  attribute: string;
  soft: string;
  pressure: string;
}[] = [
  {
    attribute: "Pressure range",
    soft: "Under 500 PSI",
    pressure: "1,500–4,000 PSI",
  },
  {
    attribute: "Cleaning agent",
    soft: "Biodegradable detergent (typically sodium hypochlorite + surfactant)",
    pressure: "Water-led, with degreaser pre-treat for oil stains",
  },
  {
    attribute: "What does the cleaning",
    soft: "Chemistry — kills mould and algae at the spore level",
    pressure: "Mechanical force — physically blasts dirt off the surface",
  },
  {
    attribute: "Regrowth interval",
    soft: "3–5 years on roofs; 12–18 months on walls",
    pressure: "6–12 months — pressure leaves spores behind",
  },
  {
    attribute: "Risk to surface",
    soft: "Very low — pressure is no higher than a garden hose",
    pressure: "High on the wrong surface — strips paint, cracks render, dislodges tiles",
  },
  {
    attribute: "Cost",
    soft: "Slightly higher per square metre (chemistry cost)",
    pressure: "Lower per square metre, but may need to repeat sooner",
  },
];

const SURFACE_TABLE: {
  surface: string;
  method: "Soft wash" | "Pressure wash" | "Deionised water";
  reason: string;
}[] = [
  {
    surface: "Acrylic render",
    method: "Soft wash",
    reason: "Pressure cracks render and can blow it off the substrate.",
  },
  {
    surface: "Painted weatherboard",
    method: "Soft wash",
    reason: "Pressure strips paint and forces water behind boards.",
  },
  {
    surface: "Face brick",
    method: "Soft wash",
    reason: "Soft wash for general dirt; targeted pressure only for efflorescence.",
  },
  {
    surface: "Fibre cement / James Hardie",
    method: "Soft wash",
    reason: "Pressure damages the surface coating.",
  },
  {
    surface: "Concrete tile roof",
    method: "Soft wash",
    reason: "Pressure strips the cementitious layer and accelerates re-mossing.",
  },
  {
    surface: "Terracotta tile roof",
    method: "Soft wash",
    reason: "Aged terracotta is brittle; pressure dislodges tiles and ridge capping.",
  },
  {
    surface: "Colorbond / metal roof",
    method: "Soft wash",
    reason: "Pressure pierces aged paint and creates rust-prone scratch lines.",
  },
  {
    surface: "Concrete driveway",
    method: "Pressure wash",
    reason: "Standard broom-finish concrete handles 3,000–4,000 PSI safely.",
  },
  {
    surface: "Exposed aggregate",
    method: "Pressure wash",
    reason: "Lower pressure (2,000–2,500 PSI) and a wider tip — protects the stone.",
  },
  {
    surface: "Pavers and brick paths",
    method: "Pressure wash",
    reason: "Pressure clean plus optional joint re-sanding after cleaning.",
  },
  {
    surface: "Pool surrounds",
    method: "Pressure wash",
    reason: "Detergent-led to lift sunscreen and body oils without acid-etching.",
  },
  {
    surface: "Solar panels",
    method: "Deionised water",
    reason: "No detergent on glass; mineral-free water leaves no spotting.",
  },
  {
    surface: "Glass facades and windows",
    method: "Deionised water",
    reason: "DI water dries spot-free, critical on salt-affected coastal glass.",
  },
];

const FAQS = [
  {
    q: "What is the difference between soft wash and pressure wash?",
    a: "Soft washing is a low-pressure cleaning method (under 500 PSI) that uses biodegradable detergent to kill mould, algae and lichen at the spore level. Pressure washing uses high-pressure water (1,500–4,000 PSI) to physically blast dirt off hard surfaces. Soft wash is the right method for any surface where high pressure would cause damage — render, paint, weatherboard, fibre cement and roof tiles. Pressure wash is the right method for concrete, pavers, retaining walls and other hard ground surfaces.",
  },
  {
    q: "How do I tell which method my surface needs?",
    a: "The simplest rule: anything you would repaint needs soft wash; anything you walk or drive on can be pressure washed. Walls, eaves, fascias, weatherboard, render, roofs and painted timber → soft wash. Concrete driveways, paver paths, retaining walls and pool surrounds → pressure wash. Solar panels and glass → neither — deionised water with soft brushes.",
  },
  {
    q: "Will pressure washing damage my house render?",
    a: "Yes — pressure washing acrylic render is one of the most common DIY mistakes. High pressure cracks render, blows it off the substrate and forces water behind the coating, which then bubbles and peels. Render must always be soft-washed (under 500 PSI) with a detergent-led approach.",
  },
  {
    q: "Why does soft-washed cleaning last longer than pressure-washed cleaning?",
    a: "Pressure washing blasts the visible surface clean but leaves mould and algae spores embedded in the substrate. Within 6–12 months in Brisbane's subtropical climate the spores grow back. Soft washing kills the spores at the chemistry level, so the regrowth interval is years (3–5 on a roof, 12–18 months on walls), not months.",
  },
  {
    q: "Can I do soft wash myself with a garden sprayer?",
    a: "The mechanical part — applying detergent at low pressure — is technically possible. The hard parts are choosing the right detergent dilution per substrate, protecting plants and adjacent surfaces from over-spray, and rinsing safely without driving water under tile laps or behind cladding. Mistakes typically show up as bleached plants, paint failure or streaking that's hard to undo. Most homeowners book the service for the method choice, not just the labour.",
  },
  {
    q: "How much does soft wash vs pressure wash cost in Brisbane?",
    a: "Both are priced per square metre, not per hour. Soft wash typically runs slightly higher per square metre because of the chemistry cost, but the longer regrowth interval (3–5 years on a roof) usually makes it cheaper over the lifecycle. WSI Cleaning quotes both methods in the same site visit so you can compare like-for-like.",
  },
];

export default function ComparisonGuide() {
  const pageSchema = graph(
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      datePublished: CONTENT_UPDATED.services,
      dateModified: CONTENT_UPDATED.services,
      inLanguage: "en-AU",
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
      image: `${SITE_URL}/images/soft-wash.jpg`,
      about: { "@id": `${SITE_URL}/#business` },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Soft wash vs pressure wash", url: `/guides/${SLUG}` },
    ]),
    faqPageSchemaFromList(FAQS, `${PAGE_URL}#faq`)
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <main className="page-shell">
        <TopBar />
        <Nav />

        <section className="sub-hero">
          <div>
            <span className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Cleaning method guide
            </span>
            <h1>
              Soft wash vs pressure wash —{" "}
              <em className="hl-orange">which</em> does my property need?
            </h1>
            <p>
              Render, paint, weatherboard and roof tiles need{" "}
              <strong>soft washing</strong> (under 500 PSI). Concrete,
              driveways, pavers and pool surrounds can take{" "}
              <strong>pressure washing</strong> (1,500–4,000 PSI). Solar panels
              and glass need <strong>deionised water</strong>. The right method
              depends on the surface, not the price.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="/#quote">
                Get a free quote →
              </Link>
              <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="sub-hero-img">
            <Image
              src="/images/soft-wash.jpg"
              alt="Soft-wash treatment running down a Brisbane tile roof at low pressure"
              width={720}
              height={450}
              priority
            />
          </div>
        </section>

        <section className="content-section service-lead">
          <p className="service-lead-text">
            Most exterior cleaning failures come from using the wrong method on
            the wrong surface. High-pressure washing on render, paint or roof
            tiles strips the coating, cracks the surface or shortens its life.
            Soft washing on a concrete driveway leaves it visibly dirty.
            Knowing which method matches which surface is what separates a
            clean that lasts five years from one that needs redoing in twelve
            months.
          </p>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Side by side
          </span>
          <h2>Soft wash vs pressure wash: the differences that matter.</h2>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Attribute</th>
                  <th scope="col">Soft wash</th>
                  <th scope="col">Pressure wash</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.attribute}>
                    <th scope="row">{row.attribute}</th>
                    <td>{row.soft}</td>
                    <td>{row.pressure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            By surface
          </span>
          <h2>Which method does each surface need?</h2>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Surface</th>
                  <th scope="col">Method</th>
                  <th scope="col">Why</th>
                </tr>
              </thead>
              <tbody>
                {SURFACE_TABLE.map((row) => (
                  <tr key={row.surface}>
                    <th scope="row">{row.surface}</th>
                    <td>
                      <span
                        className={`method-pill method-pill-${row.method
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {row.method}
                      </span>
                    </td>
                    <td>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Rule of thumb
          </span>
          <h2>The one-line rule.</h2>
          <p className="service-lead-text">
            Anything you would <em>repaint</em> needs soft washing. Anything
            you <em>walk or drive on</em> can be pressure washed. Glass and
            solar panels need deionised water. Match the method to the surface
            and the clean will last years longer.
          </p>
        </section>

        <section className="content-section service-faqs">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Frequently asked
          </span>
          <h2>Soft wash vs pressure wash — your questions, answered.</h2>
          <div className="faq-list-inline">
            {FAQS.map((faq) => (
              <details key={faq.q} className="faq-item-inline">
                <summary>
                  <h3>{faq.q}</h3>
                  <span aria-hidden="true" className="faq-toggle">
                    +
                  </span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Read next
          </span>
          <h2>Related services.</h2>
          <ul className="suburb-list">
            <li>
              <Link href="/services/house-washing">House washing →</Link>
            </li>
            <li>
              <Link href="/services/pressure-washing">Pressure washing →</Link>
            </li>
            <li>
              <Link href="/services/roof-cleaning">Roof cleaning →</Link>
            </li>
            <li>
              <Link href="/services/driveway-cleaning">Driveway cleaning →</Link>
            </li>
            <li>
              <Link href="/services/solar-panel-cleaning">
                Solar panel cleaning →
              </Link>
            </li>
          </ul>
        </section>

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
