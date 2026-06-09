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

const SLUG = "house-washing-cost-brisbane";
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
  { id: "quick-answer", label: "How much does a Brisbane house wash cost?" },
  { id: "price-bands", label: "Price bands by home size" },
  { id: "what-changes", label: "What changes the quote" },
  { id: "whats-included", label: "What's included (and what's not)" },
  { id: "diy-vs-pro", label: "DIY vs professional — is it worth it?" },
  { id: "save", label: "How to keep the cost down" },
  { id: "faqs", label: "FAQs" },
];

const FAQS = [
  {
    q: "How much does a house wash cost in Brisbane?",
    a: "A typical Brisbane single-storey house wash is $380–$650 in 2026. Two-storey homes run $650–$1,200. Pricing is per square metre of wall area, with substrate (render, weatherboard, brick), condition (light mould vs heavy lichen), access (tight side paths, balconies) and storey count driving the variance. All quotes are fixed-price in writing within 24 business hours of enquiry.",
  },
  {
    q: "Why is house washing priced per square metre, not per hour?",
    a: "Square-metre pricing is fairer for the customer because you're paying for the surface, not how long the crew takes. An efficient soft-wash crew with the right pump and dwell time finishes a job faster than a slow operator with weaker chemistry — but the customer shouldn't be punished for that. Hourly billing also makes quotes unpredictable; per-m² is fixed once we measure the elevations.",
  },
  {
    q: "Is soft washing more expensive than pressure washing the house?",
    a: "Slightly — soft washing carries a small chemistry premium per square metre (the sodium hypochlorite blend and surfactant). But it's the only correct method for rendered, painted, weatherboard, brick and fibre cement walls. Pressure washing those surfaces causes paint failure, cracked render and water ingress that costs thousands to repair. The 'cheaper' method is the wrong tool on residential exteriors.",
  },
  {
    q: "Are gutters and roof included in the house wash price?",
    a: "No — gutter cleaning and roof cleaning are quoted separately because they need different equipment, different access plans and (for the roof) a working-at-heights SWMS. Most Brisbane homeowners book the house wash and the gutter clear at the same time so the crew is on site once; we'll quote them together but you'll see two line items.",
  },
  {
    q: "Do you charge extra for two-storey homes?",
    a: "Yes, because two-storey work requires longer lances, taller poles, sometimes scaffold or rope access, and a longer dwell time per elevation. Two-storey premium is typically 60–80% on top of the single-storey rate for the same wall area — not double, because we're not doing the job twice.",
  },
  {
    q: "What's the cheapest house wash I should accept?",
    a: "Anyone quoting under $250 for a full single-storey Brisbane house wash is either underinsured, skipping the soft-wash chemistry (just rinsing with water), or pricing for repeat-customer maintenance only. Ask three questions: is the operator $20M-insured, is sodium hypochlorite + surfactant being used, and what's the dwell time? If any answer is unclear, that's why the price is low.",
  },
  {
    q: "How do I get an accurate quote without a site visit?",
    a: "Send four photos — front elevation, back, both sides — plus your address. We measure from imagery and Council records, then confirm on arrival. The written quote is fixed inside 24 business hours and the price doesn't change unless the scope does.",
  },
];

const PRICE_BANDS = [
  {
    band: "Small single-storey (≤120 m² wall area)",
    typical: "$380 – $480",
    note: "Weatherboard or small render box, simple access",
  },
  {
    band: "Standard single-storey (120–200 m² wall area)",
    typical: "$480 – $650",
    note: "Typical Brisbane brick or render home, average tree cover",
  },
  {
    band: "Large single-storey or split-level",
    typical: "$650 – $900",
    note: "Generous footprint, harder side-path access, eaves detail",
  },
  {
    band: "Two-storey standard",
    typical: "$650 – $1,100",
    note: "Includes upper elevations from pole or controlled lift",
  },
  {
    band: "Two-storey large / architectural",
    typical: "$1,100 – $2,000+",
    note: "Multiple gables, deep eaves, ornate render, EWP often required",
  },
];

const COST_DRIVERS = [
  {
    factor: "Storey count",
    effect: "+60–80% for two-storey vs single-storey of same wall area",
  },
  {
    factor: "Substrate",
    effect:
      "Acrylic render ≈ baseline. Weatherboard with deep grooves +10%. Heritage timber needs more dwell time +15%.",
  },
  {
    factor: "Biological load",
    effect:
      "Light mould = baseline. Heavy lichen on south-facing walls or under tree cover +15–25%.",
  },
  {
    factor: "Access",
    effect:
      "Tight side paths, balcony overhangs, garden bed protection, no driveway parking — typically +$60–$150.",
  },
  {
    factor: "Eave depth & complexity",
    effect:
      "Deep Queenslander eaves, ornate cornicing or under-storey ceilings add 10–20%.",
  },
  {
    factor: "Travel zone",
    effect:
      "Standard within Greater Brisbane. Far western corridor (past Karana Downs) may carry a small travel allocation.",
  },
];

const WHATS_INCLUDED = [
  "Walls — all elevations soft-washed at correct dilution for the substrate",
  "Eaves, soffits, fascias and barge boards",
  "Entry doors, frames, external sills",
  "Downpipes and external pipework (exterior of)",
  "External light fittings cleaned by hand where safe",
  "Garden bed pre-watering and post-rinse to neutralise overspray",
  "Photo documentation of each elevation before and after",
];

const WHATS_NOT_INCLUDED = [
  "Roof cleaning (quoted separately)",
  "Gutter cleaning (quoted separately)",
  "Window cleaning (quoted separately — often booked together)",
  "Driveway and paving (pressure-washed, quoted separately)",
  "Repainting, render repairs or sealing",
];

export default function HouseWashingCostBrisbaneGuide() {
  const pageSchema = graph(
    articleSchemaFor({ guide: GUIDE, pageUrl: PAGE_URL, siteUrl: SITE_URL }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      { name: "House washing cost Brisbane", url: `/guides/${SLUG}` },
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
              House washing cost <em className="hl-orange">Brisbane</em> —
              what you&rsquo;ll actually pay in 2026.
            </h1>
            <GuideMeta guide={GUIDE} />
            <p>
              A typical Brisbane single-storey house wash is $380–$650 in 2026.
              Pricing is per square metre of wall area, and the variance comes
              from storey count, substrate condition and access — not how long
              the crew takes. Here&rsquo;s the full breakdown.
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
              A typical Brisbane single-storey house wash costs $380–$650 in
              2026.
            </strong>{" "}
            Two-storey homes run $650–$1,200. Pricing is per square metre of
            wall area, with storey count, substrate, condition and access
            driving the quote. Soft washing is the correct method for
            rendered, painted, weatherboard and brick exteriors — pressure
            washing those surfaces causes paint failure and cracked render.
            All WSI Cleaning quotes are fixed in writing within 24 business
            hours.
          </QuickAnswer>

          <KeyFacts
            items={[
              { label: "Single-storey", value: "$380 – $650" },
              { label: "Two-storey", value: "$650 – $1,200" },
              { label: "Per m² wall", value: "$3 – $6" },
              { label: "Quote turnaround", value: "24 hours" },
            ]}
          />

          <GuideToc items={TOC} />
        </section>

        <section className="content-section">
          <span id="price-bands" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Price bands
          </span>
          <h2>What does a Brisbane house wash cost by home size?</h2>
          <p>
            The single biggest driver of a house-wash quote in Brisbane is
            wall area, not floor area. Two homes with identical floor plans
            can carry very different exterior wall measurements once you
            include gables, garages and entry features. Below are 2026 price
            bands we see across our quoting log for Greater Brisbane:
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Home size</th>
                  <th scope="col">Typical 2026 price</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_BANDS.map((row) => (
                  <tr key={row.band}>
                    <th scope="row">{row.band}</th>
                    <td>
                      <strong>{row.typical}</strong>
                    </td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            These bands assume the home is in average condition for the
            suburb. Walls with heavy lichen build-up under tree canopy or
            shaded southern aspects are quoted at the top of the band; homes
            that get a wash every 12 months tend to land near the bottom.
          </p>
        </section>

        <section className="content-section">
          <span id="what-changes" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Cost drivers
          </span>
          <h2>What actually changes the price?</h2>
          <p>
            Most Brisbane house-wash quotes move on six variables. Knowing
            which ones apply to your home is the difference between getting
            three quotes that vary by 80% and three quotes that come in within
            10% of each other.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Factor</th>
                  <th scope="col">Effect on price</th>
                </tr>
              </thead>
              <tbody>
                {COST_DRIVERS.map((row) => (
                  <tr key={row.factor}>
                    <th scope="row">{row.factor}</th>
                    <td>{row.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout title="Brisbane-specific note">
            Inner-city Queenslanders in Paddington, Bardon, New Farm and
            Auchenflower nearly always sit at the top of the band — heritage
            timber, deep eaves, multi-elevation gables and tight side paths
            all push the price up. Modern brick estate homes in the western
            corridor (Kenmore, Chapel Hill, Pullenvale) are the easiest to
            price low because access is good and the substrate is forgiving.
          </Callout>
        </section>

        <section className="content-section">
          <span id="whats-included" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Scope
          </span>
          <h2>What&rsquo;s included in a WSI house wash?</h2>
          <p>
            Every WSI Cleaning house wash includes the elevations, eaves and
            entry details. Roof, gutters, windows and paving are separate
            services because they need different equipment and a different
            safety plan — bundling them invisibly is how budget operators end
            up doing the cheapest part well and the rest badly.
          </p>
          <ul className="suburb-list">
            {WHATS_INCLUDED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h3 style={{ marginTop: 28 }}>What&rsquo;s not included</h3>
          <ul className="suburb-list">
            {WHATS_NOT_INCLUDED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="content-section">
          <span id="diy-vs-pro" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            DIY vs professional
          </span>
          <h2>Is it cheaper to wash the house yourself?</h2>
          <p>
            On paper, yes — a 9-litre garden sprayer, a sodium hypochlorite
            bottle and a Saturday afternoon will cost you under $80. In
            practice, three things go wrong:
          </p>
          <ol>
            <li>
              <strong>Dilution.</strong> Too strong and you bleach the paint
              or kill garden beds. Too weak and the mould comes back inside
              six months.
            </li>
            <li>
              <strong>Rinse direction.</strong> Top-down rinsing forces water
              behind weatherboards, under tile laps and into eave cavities
              when done with a pressure wand instead of a soft-wash pump.
            </li>
            <li>
              <strong>The eaves.</strong> 80% of the visible mould on a
              Queensland home is in the eaves and the southern aspect — both
              awkward angles from a ladder.
            </li>
          </ol>
          <p>
            The professional fix isn&rsquo;t about labour cost. It&rsquo;s
            about dilution, dwell time, pump pressure and a rinse plan that
            doesn&rsquo;t push water into places it shouldn&rsquo;t go.
          </p>
        </section>

        <section className="content-section">
          <span id="save" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Save without cutting corners
          </span>
          <h2>How to keep the cost down (without picking the wrong operator)</h2>
          <ul className="suburb-list">
            <li>
              <strong>Book in autumn (March–May).</strong> Booking density is
              lower than peak spring; quotes are sharper and lead times are
              shorter.
            </li>
            <li>
              <strong>Bundle the gutter clean.</strong> Same site visit, less
              travel cost. Most Brisbane homeowners book both before October
              storm season.
            </li>
            <li>
              <strong>Set up an annual cycle.</strong> Maintenance pricing
              (year-on-year) is typically 10–15% lower than one-off because
              the biological load is lighter and the job is faster.
            </li>
            <li>
              <strong>Don&rsquo;t leave it three years.</strong> Heavy lichen
              load adds the most to the quote because of dwell time.
              Twelve-monthly cycles compound to cheaper over five years.
            </li>
            <li>
              <strong>Get three quotes — but compare scope, not just price.</strong>{" "}
              The cheapest quote that excludes eaves and entry details
              isn&rsquo;t cheaper. It&rsquo;s a smaller job.
            </li>
          </ul>
        </section>

        <AuthorCard />

        <section className="content-section service-faqs">
          <span id="faqs" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            FAQ
          </span>
          <h2>Brisbane house wash pricing — frequently asked.</h2>
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
