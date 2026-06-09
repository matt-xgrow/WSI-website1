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
  AuthorCard,
  Callout,
  GuideMeta,
  GuideToc,
  KeyFacts,
  QuickAnswer,
  RelatedGuides,
  articleSchemaFor,
} from "@/components/site/guide-parts";
import {
  breadcrumbSchema,
  faqPageSchemaFromList,
  graph,
} from "@/lib/seo/schema";
import { getGuide } from "@/lib/guides";
import { site, SITE_URL } from "@/lib/site";

const SLUG = "pressure-washing-driveway-cost-brisbane";
const GUIDE = getGuide(SLUG)!;
const PAGE_URL = `${SITE_URL}/guides/${SLUG}`;

export const metadata: Metadata = {
  title: GUIDE.title,
  description: GUIDE.description,
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: {
    title: GUIDE.title,
    description: GUIDE.description,
    url: `/guides/${SLUG}`,
    images: [{ url: GUIDE.image }],
    type: "article",
    publishedTime: GUIDE.published,
    modifiedTime: GUIDE.updated,
  },
  twitter: {
    card: "summary_large_image",
    title: GUIDE.title,
    description: GUIDE.description,
    images: [GUIDE.image],
  },
};

const TOC = [
  { id: "quick-answer", label: "How much does it cost in Brisbane?" },
  { id: "by-substrate", label: "Pricing by substrate" },
  { id: "size-examples", label: "Real examples by driveway size" },
  { id: "stains", label: "Oil, rust and tyre-mark surcharges" },
  { id: "whats-included", label: "What's included" },
  { id: "frequency", label: "How often should you do it?" },
  { id: "faqs", label: "FAQs" },
];

const FAQS = [
  {
    q: "How much does it cost to pressure-wash a driveway in Brisbane?",
    a: "Brisbane driveway pressure washing is $4–$8 per square metre in 2026. Plain broom-finish concrete is at the bottom of the range ($4–$5/m²), exposed aggregate is mid ($5–$6/m²) and pavers, cobblestone and exposed brick are at the top ($6–$8/m²) because of joint detailing. A typical single-car concrete driveway (40 m²) lands at $180–$260; a double driveway with a path (60 m²) lands at $280–$420.",
  },
  {
    q: "Why are pavers more expensive than concrete to pressure wash?",
    a: "Pavers are slower to clean per square metre because each joint has to be detailed and the surface cleaner has to overlap more carefully to avoid striping. Many paver jobs also need joint re-sanding after cleaning to lock the pavers back in place — sometimes included, sometimes quoted separately. Exposed aggregate sits between the two because the surface is uneven but jointless.",
  },
  {
    q: "How much extra does oil stain removal cost?",
    a: "Single-spot oil stain treatment is typically a $40–$80 surcharge per stain on top of the per-square-metre price. Heavily oiled commercial driveways or workshop pads are quoted as a different scope entirely — usually $10–$18/m² because of the degreaser cycles and multiple passes required.",
  },
  {
    q: "Will pressure washing damage my driveway?",
    a: "Not on the right substrate at the right pressure. Standard broom-finish concrete safely handles 3,000–4,000 PSI through a rotary surface cleaner. Exposed aggregate needs 2,000–2,500 PSI and a wider fan to avoid dislodging stones. Old weak concrete (pre-2000 in some Brisbane homes) needs the same gentler approach. Pavers are surface-cleaner-pressure but with attention to joint sand.",
  },
  {
    q: "How long does a driveway pressure wash take?",
    a: "A standard 40 m² Brisbane single-car concrete driveway is 60–90 minutes on site including setup, surface-cleaner pass, edges, detail work and rinse. Larger driveways and aggregate or paver surfaces extend pro-rata. We don't bill by time, but knowing the duration helps with scheduling.",
  },
  {
    q: "Can pressure washing remove tyre marks and rubber?",
    a: "Yes — rubber and tyre marks come up with the surface cleaner pass on plain concrete most of the time. Heavily set rubber in shaded sections may need a pre-treatment dwell with a degreaser before the surface-cleaner pass. We quote this as part of the line item if it's visible on assessment.",
  },
  {
    q: "Do you seal the driveway after pressure washing?",
    a: "Sealing is a separate service we don't currently offer in scope. We can recommend the right time to seal (typically 24–48 hours after the surface is fully dry, depending on the sealant) but the sealant application is best done by a coatings specialist who guarantees the product.",
  },
];

const BY_SUBSTRATE = [
  {
    substrate: "Broom-finish concrete",
    rate: "$4 – $5 / m²",
    note: "Standard residential driveway. Handles 3,000–4,000 PSI through surface cleaner.",
  },
  {
    substrate: "Exposed aggregate",
    rate: "$5 – $6 / m²",
    note: "Lower pressure (2,000–2,500 PSI), wider fan to protect stones. Joint moss extra dwell.",
  },
  {
    substrate: "Stamped or coloured concrete",
    rate: "$5 – $7 / m²",
    note: "Coloured surface is more delicate; controlled pressure to preserve finish.",
  },
  {
    substrate: "Clay pavers",
    rate: "$6 – $7 / m²",
    note: "Joint detail and overlap care; optional joint re-sand quoted separately.",
  },
  {
    substrate: "Cobblestone & natural stone",
    rate: "$7 – $9 / m²",
    note: "Slowest substrate. Joint detail is the bulk of the time.",
  },
  {
    substrate: "Concrete with heavy oil load (workshop/commercial)",
    rate: "$10 – $18 / m²",
    note: "Multiple degreaser dwell cycles, hot water where available.",
  },
];

const SIZE_EXAMPLES = [
  {
    type: "Single-car concrete driveway",
    size: "~40 m²",
    typical: "$180 – $260",
    notes: "Standard 80s/90s Brisbane suburban home",
  },
  {
    type: "Double-car concrete driveway",
    size: "~60 m²",
    typical: "$240 – $360",
    notes: "Includes apron and entry pad",
  },
  {
    type: "Double driveway + side path",
    size: "~80 m²",
    typical: "$320 – $480",
    notes: "Common in modern estate homes",
  },
  {
    type: "Exposed aggregate driveway",
    size: "~50 m²",
    typical: "$280 – $360",
    notes: "Higher rate per m², slightly smaller surface",
  },
  {
    type: "Paver driveway with cobblestone edge",
    size: "~60 m²",
    typical: "$380 – $540",
    notes: "Joint detail extends per-m² rate",
  },
  {
    type: "Large modern estate driveway + paths + patio",
    size: "150+ m²",
    typical: "$650 – $1,100",
    notes: "Best value per m² because of mobilisation efficiency",
  },
];

const SURCHARGES = [
  {
    issue: "Single oil drip spot (≤30 cm)",
    surcharge: "+$40 – $60",
    note: "Degreaser pre-treat, dwell, rinse",
  },
  {
    issue: "Vehicle leak patch (1–3 m²)",
    surcharge: "+$80 – $150",
    note: "Multiple degreaser cycles, longer dwell",
  },
  {
    issue: "Heavy rust staining (irrigation, planters)",
    surcharge: "+$60 – $120",
    note: "Specialty rust treatment, multiple rinses",
  },
  {
    issue: "Algae / lichen-bound paver joints",
    surcharge: "+10–15% on the line",
    note: "Pre-treatment dwell on joints before surface clean",
  },
  {
    issue: "Joint re-sanding after paver clean",
    surcharge: "$2 – $4 / m²",
    note: "Optional, recommended every 3–4 years",
  },
];

export default function PressureWashingDrivewayCostBrisbaneGuide() {
  const pageSchema = graph(
    articleSchemaFor({ guide: GUIDE, pageUrl: PAGE_URL, siteUrl: SITE_URL }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      {
        name: "Pressure washing driveway cost Brisbane",
        url: `/guides/${SLUG}`,
      },
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
              Pricing guide · Brisbane
            </span>
            <h1>
              Pressure washing a driveway in{" "}
              <em className="hl-orange">Brisbane</em> — 2026 prices per m².
            </h1>
            <GuideMeta guide={GUIDE} />
            <p>
              Brisbane driveway pressure washing is $4–$8 per square metre in
              2026. The variance is the substrate (concrete cheapest, pavers
              highest), not how long the crew takes. Here&rsquo;s the full
              breakdown with real driveway examples.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="/#quote">
                Get a fixed quote →
              </Link>
              <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="sub-hero-img">
            <Image
              src={GUIDE.image}
              alt={GUIDE.imageAlt}
              width={720}
              height={450}
              priority
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 720px"
            />
          </div>
        </section>

        <section className="content-section">
          <span id="quick-answer" />
          <QuickAnswer>
            <strong>
              Pressure washing a driveway in Brisbane costs $4–$8 per square
              metre in 2026.
            </strong>{" "}
            Plain broom-finish concrete is $4–$5/m², exposed aggregate
            $5–$6/m², and pavers or cobblestone $6–$8/m². A standard
            single-car concrete driveway (~40 m²) lands at $180–$260; a
            double driveway with a path (~60–80 m²) lands at $280–$480. Oil
            stains add $40–$120 per stain depending on size.
          </QuickAnswer>

          <KeyFacts
            items={[
              { label: "Concrete", value: "$4 – $5 / m²" },
              { label: "Aggregate", value: "$5 – $6 / m²" },
              { label: "Pavers", value: "$6 – $8 / m²" },
              { label: "Single-car typical", value: "$180 – $260" },
            ]}
          />

          <GuideToc items={TOC} />
        </section>

        <section className="content-section">
          <span id="by-substrate" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            By substrate
          </span>
          <h2>Per-m² pricing by what your driveway is made of.</h2>
          <p>
            The single biggest driver of a driveway pressure-wash quote is
            substrate. Per-m² pricing reflects how long the surface takes per
            unit area at the correct pressure — not labour time.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Substrate</th>
                  <th scope="col">Per m² rate</th>
                  <th scope="col">Why</th>
                </tr>
              </thead>
              <tbody>
                {BY_SUBSTRATE.map((row) => (
                  <tr key={row.substrate}>
                    <th scope="row">{row.substrate}</th>
                    <td>
                      <strong>{row.rate}</strong>
                    </td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout title="Why the wrong pressure is a real problem">
            Using 4,000 PSI on exposed aggregate dislodges the stones. Using
            it on old weak concrete from the 1980s can pit the surface. The
            crew should always pressure-test on a discreet section before
            opening up — and the quote should reflect the substrate, not the
            top-of-the-line nozzle.
          </Callout>
        </section>

        <section className="content-section">
          <span id="size-examples" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            By size
          </span>
          <h2>Real Brisbane driveway examples.</h2>
          <p>
            Below are typical quote ranges we issue across Greater Brisbane
            in 2026. The same scope at the same size sits inside these bands
            for over 90% of jobs we quote.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Driveway type</th>
                  <th scope="col">Approx. size</th>
                  <th scope="col">2026 price</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_EXAMPLES.map((row) => (
                  <tr key={row.type}>
                    <th scope="row">{row.type}</th>
                    <td>{row.size}</td>
                    <td>
                      <strong>{row.typical}</strong>
                    </td>
                    <td>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span id="stains" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Surcharges
          </span>
          <h2>What pushes the quote up: oil, rust and tyre marks.</h2>
          <p>
            The base per-m² rate covers a driveway in average condition. If
            the surface carries oil drips, irrigation rust, heavy lichen in
            paver joints or tyre marks set into shaded sections, there&rsquo;s
            a line-item surcharge for the extra treatment.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Issue</th>
                  <th scope="col">Typical surcharge</th>
                  <th scope="col">Why</th>
                </tr>
              </thead>
              <tbody>
                {SURCHARGES.map((row) => (
                  <tr key={row.issue}>
                    <th scope="row">{row.issue}</th>
                    <td>
                      <strong>{row.surcharge}</strong>
                    </td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span id="whats-included" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Scope
          </span>
          <h2>What&rsquo;s included in a WSI driveway pressure wash?</h2>
          <ul className="suburb-list">
            <li>Surface cleaner pass at the correct pressure for the substrate</li>
            <li>Edge and detail work with a fan wand</li>
            <li>Expansion-joint and joint-line detailing</li>
            <li>Pre-treatment of light algae and moss at no extra charge</li>
            <li>Drain protection and rinse to clean run-off</li>
            <li>Photo documentation before and after</li>
          </ul>

          <h3 style={{ marginTop: 28 }}>What&rsquo;s not included by default</h3>
          <ul className="suburb-list">
            <li>Driveway sealing (separate trade)</li>
            <li>Paver joint re-sanding (optional, quoted separately)</li>
            <li>Crack repair or surface patching</li>
            <li>Garage internal pad (quoted on request)</li>
          </ul>
        </section>

        <section className="content-section">
          <span id="frequency" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Frequency
          </span>
          <h2>How often should you pressure-wash the driveway?</h2>
          <p>
            For most Brisbane homes the right cycle is{" "}
            <strong>every 12–18 months</strong>. Driveways under tree cover
            (jacaranda, leopard tree, macadamia) need it closer to 12 months
            because of tannin staining and leaf litter. Driveways in open sun
            with no tree load can stretch to 18–24 months without losing
            visible cleanliness — assuming no fresh oil drips.
          </p>
          <p>
            Pool-surround paving sits on a tighter cycle —{" "}
            <strong>every 6–12 months</strong> — because sunscreen, body oils
            and chlorinated water leave a film that builds slip risk before
            it builds visible dirt.
          </p>
        </section>

        <AuthorCard />

        <section className="content-section service-faqs">
          <span id="faqs" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            FAQ
          </span>
          <h2>Brisbane driveway pressure washing — your questions.</h2>
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

        <RelatedGuides slug={SLUG} />

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
