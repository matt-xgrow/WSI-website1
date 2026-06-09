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

const SLUG = "window-cleaning-brisbane-cost";
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
  { id: "pricing", label: "Per-pane pricing breakdown" },
  { id: "examples", label: "Real Brisbane home examples" },
  { id: "whats-included", label: "What's included (and what's optional)" },
  { id: "frequency", label: "How often should windows be cleaned?" },
  { id: "diy", label: "Why DIY tap-water cleaning leaves streaks" },
  { id: "faqs", label: "FAQs" },
];

const FAQS = [
  {
    q: "How much does window cleaning cost in Brisbane?",
    a: "A standard Brisbane single-storey home window clean is $120–$240 in 2026 (interior + exterior, 12–20 panes). Two-storey homes run $220–$420. Pricing is per pane, with frames, sills, screens and tracks as optional add-ons. Commercial shopfronts and offices are quoted at $6–$12 per pane in maintenance cycles, lower per pane than residential because of mobilisation efficiency.",
  },
  {
    q: "Why are windows priced per pane instead of per hour?",
    a: "Per-pane pricing is more predictable for the customer. The crew gets faster as they work but the customer shouldn't pay for the first job being slower than the tenth. Per-pane also removes the incentive for slow billing; the price is fixed once the panes are counted on the quote.",
  },
  {
    q: "What is a 'pane' for pricing purposes?",
    a: "A pane is a single glass section, counted on both sides if interior and exterior are scoped. A double-hung window with an upper and lower sash is two panes. A sliding door with three glass sections is three panes. Skylights, splashbacks and shower screens are quoted separately because they need different equipment.",
  },
  {
    q: "How often should I clean my windows in Brisbane?",
    a: "Quarterly is the sweet spot for most Brisbane homes (every 3 months). Inner-city homes with high glazing and homes within a kilometre of the river benefit from bi-monthly cycles because of dust and pollen. Sunshine Coast coastal homes need 6–8 week cycles because of salt haze. Commercial shopfronts are usually fortnightly or monthly.",
  },
  {
    q: "Do you do interior windows?",
    a: "Yes. Interior is quoted at the same per-pane rate as exterior. Most residential clients book interior + exterior together so the panes match. Commercial scopes vary — many shopfronts are exterior-only, while offices are typically interior-only on a separate cycle.",
  },
  {
    q: "Do you charge extra for frames, sills, screens and tracks?",
    a: "Yes, because they're separate tasks. Frame + sill wipe is typically $2–$4 per window. Screen vacuum + wash is $4–$8 per screen depending on size. Track flush is $3–$6 per track. They're optional because some clients only want the glass spotted, while others want the full detail.",
  },
  {
    q: "What's the deionised-water pole system?",
    a: "It's a long carbon-fibre pole with a brush head and a mineral-free water feed. Used for windows above ground level (often up to three storeys) so we don't need ladders. The deionised water rinses streak-free because there are no minerals to leave a deposit — the glass dries to a clear finish without any wiping. Standard for high glazing, coastal homes and second-storey work.",
  },
];

const PRICING = [
  {
    type: "Standard pane (residential, interior or exterior)",
    rate: "$8 – $14 / pane",
    note: "Most single-pane windows and sliding-door panels",
  },
  {
    type: "Standard pane (commercial maintenance)",
    rate: "$6 – $12 / pane",
    note: "Discounted on recurring schedules (weekly, fortnightly, monthly)",
  },
  {
    type: "Skylight",
    rate: "$25 – $60 each",
    note: "Roof access; quoted as a separate line item",
  },
  {
    type: "Shower screen",
    rate: "$25 – $45 each",
    note: "Mineral spot treatment; clarity restoration only",
  },
  {
    type: "Mirrored splashback",
    rate: "$15 – $30 each",
    note: "Behind-stovetop oil/grease treatment",
  },
  {
    type: "Frame + sill wipe (add-on)",
    rate: "$2 – $4 / window",
    note: "Light grime, dust, cobwebs",
  },
  {
    type: "Screen vacuum + wash (add-on)",
    rate: "$4 – $8 / screen",
    note: "Coastal homes need this more often",
  },
  {
    type: "Track flush (add-on)",
    rate: "$3 – $6 / track",
    note: "Sliding door tracks, especially coastal",
  },
];

const EXAMPLES = [
  {
    home: "Small 2-bed apartment, single-storey",
    panes: "10–14",
    typical: "$120 – $180",
    notes: "Interior + exterior, no screens",
  },
  {
    home: "Standard 3-bed Brisbane home, single-storey",
    panes: "16–22",
    typical: "$160 – $260",
    notes: "Interior + exterior, basic frames",
  },
  {
    home: "Large 4-bed home with high glazing, single-storey",
    panes: "24–32",
    typical: "$240 – $360",
    notes: "Interior + exterior, frames + screens",
  },
  {
    home: "Standard 4-bed two-storey home",
    panes: "26–36",
    typical: "$280 – $420",
    notes: "Pole work on upper storey; interior + exterior",
  },
  {
    home: "Inner-city Queenslander with stained glass",
    panes: "30–40",
    typical: "$340 – $520",
    notes: "Heritage glass care; deeper detail",
  },
  {
    home: "Office or shopfront (maintenance)",
    panes: "varies",
    typical: "$6 – $12 / pane",
    notes: "Per-cycle pricing on recurring schedule",
  },
];

const INCLUDED = [
  "Both sides of each pane scoped (interior + exterior)",
  "Deionised-water finish on exterior glass — streak-free, no minerals",
  "Light cobweb removal around frames",
  "Spot-check of obvious mineral deposits",
  "Photo documentation before and after for commercial",
];

const OPTIONAL = [
  "Full frame + sill wipe",
  "Screen vacuum + wash",
  "Track flush (especially sliding doors)",
  "Skylight cleaning",
  "Shower screen mineral treatment",
  "Splashback grease removal",
];

export default function WindowCleaningBrisbaneCostGuide() {
  const pageSchema = graph(
    articleSchemaFor({ guide: GUIDE, pageUrl: PAGE_URL, siteUrl: SITE_URL }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      { name: "Window cleaning Brisbane cost", url: `/guides/${SLUG}` },
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
              Professional window cleaning in{" "}
              <em className="hl-orange">Brisbane</em> — cost, frequency and
              what&rsquo;s included.
            </h1>
            <GuideMeta guide={GUIDE} />
            <p>
              A typical Brisbane single-storey window clean is $120–$240 in
              2026. Pricing is per pane, with frames, screens and tracks as
              optional add-ons. Here&rsquo;s the full breakdown plus the
              right frequency for your property type.
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
              A standard Brisbane single-storey window clean is $120–$240
              (interior + exterior, 12–20 panes) in 2026.
            </strong>{" "}
            Two-storey homes run $220–$420. Commercial shopfronts and offices
            are typically $6–$12 per pane on recurring cycles. Frames, sills,
            screens and tracks are optional add-ons. The deionised-water pole
            system produces a streak-free finish without ladders for most
            two-storey work.
          </QuickAnswer>

          <KeyFacts
            items={[
              { label: "Single-storey", value: "$120 – $240" },
              { label: "Two-storey", value: "$220 – $420" },
              { label: "Per pane (residential)", value: "$8 – $14" },
              { label: "Per pane (commercial)", value: "$6 – $12" },
            ]}
          />

          <GuideToc items={TOC} />
        </section>

        <section className="content-section">
          <span id="pricing" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Per-pane pricing
          </span>
          <h2>The per-pane price list for Brisbane in 2026.</h2>
          <p>
            Every window clean quote we issue is built from a per-pane count
            and the optional add-ons. This is the price list we work from on
            assessment:
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Rate (2026)</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {PRICING.map((row) => (
                  <tr key={row.type}>
                    <th scope="row">{row.type}</th>
                    <td>
                      <strong>{row.rate}</strong>
                    </td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span id="examples" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            By home size
          </span>
          <h2>Real Brisbane home examples.</h2>
          <p>
            Below are quote ranges we issue across Greater Brisbane in 2026.
            More than 85% of single-property quotes sit inside these bands
            for the matching home type.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Home type</th>
                  <th scope="col">Pane count</th>
                  <th scope="col">2026 price</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((row) => (
                  <tr key={row.home}>
                    <th scope="row">{row.home}</th>
                    <td>{row.panes}</td>
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
          <span id="whats-included" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Scope
          </span>
          <h2>What&rsquo;s in scope by default — and what&rsquo;s optional.</h2>
          <p>
            The default quote covers the glass. Anything beyond the glass
            (frames, screens, tracks, skylights, shower screens) is quoted as
            a separate line item so you can choose what to add.
          </p>

          <h3 style={{ marginTop: 8 }}>Included by default</h3>
          <ul className="suburb-list">
            {INCLUDED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h3 style={{ marginTop: 24 }}>Optional add-ons</h3>
          <ul className="suburb-list">
            {OPTIONAL.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="content-section">
          <span id="frequency" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Frequency
          </span>
          <h2>How often should you clean the windows?</h2>
          <p>
            The right cycle depends entirely on what the glass is exposed to.
            For most Brisbane properties the cleanest finish at the lowest
            cost-per-year comes from one of these cycles:
          </p>
          <ul className="suburb-list">
            <li>
              <strong>Quarterly (every 3 months).</strong> Standard for most
              suburban Brisbane homes. Keeps dust and pollen off; matches a
              presentation cycle.
            </li>
            <li>
              <strong>Bi-monthly (every 2 months).</strong> Inner-city homes
              with high glazing. Riverside Brisbane homes. Homes near
              construction or arterial roads.
            </li>
            <li>
              <strong>Monthly.</strong> Coastal Sunshine Coast homes within
              500 m of sand. Commercial shopfronts and offices in customer-
              facing locations.
            </li>
            <li>
              <strong>Twice-yearly.</strong> Minimum viable cycle for any
              property with windows. Below that, mineral deposits and salt
              start to bond and the clean becomes a restoration job (more
              expensive).
            </li>
          </ul>
        </section>

        <section className="content-section">
          <span id="diy" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Why DIY leaves streaks
          </span>
          <h2>Why DIY window cleaning streaks (and what works instead).</h2>
          <p>
            Tap water in Brisbane and the Sunshine Coast is around 60–120 ppm
            of dissolved minerals (calcium, magnesium, silicates).
            When the water evaporates off glass it leaves those minerals
            behind as a streak or spot. Squeegee technique can hide it on a
            single pane but you can&rsquo;t squeegee a two-storey window
            cluster.
          </p>
          <p>
            A deionised-water pole system removes those minerals before the
            water touches the glass — so the glass dries clear with no
            wiping, even on second-storey panes. That&rsquo;s why
            professional pole work doesn&rsquo;t streak and DIY does. The
            equipment is the difference, not the technique.
          </p>
          <Callout title="Coastal note">
            On the Sunshine Coast, salt deposits on coastal glass actively
            need mineral-free water. Tap water makes salt haze worse because
            you&rsquo;re adding more minerals on top of what&rsquo;s already
            there. See our dedicated{" "}
            <Link href="/guides/salt-haze-windows-sunshine-coast">
              salt haze guide
            </Link>{" "}
            for the chemistry.
          </Callout>
        </section>

        <AuthorCard />

        <section className="content-section service-faqs">
          <span id="faqs" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            FAQ
          </span>
          <h2>Window cleaning Brisbane — your questions.</h2>
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
