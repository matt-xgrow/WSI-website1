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

const SLUG = "house-wash-frequency-sunshine-coast";
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
  { id: "quick-answer", label: "How often should you wash your house?" },
  { id: "coast-vs-hinterland", label: "Coast vs hinterland — different cycles" },
  { id: "signs", label: "5 signs your house is overdue" },
  { id: "calendar", label: "The 12-month maintenance calendar" },
  { id: "cost-of-waiting", label: "What it costs to leave it too long" },
  { id: "faqs", label: "FAQs" },
];

const FAQS = [
  {
    q: "How often should I wash my house on the Sunshine Coast?",
    a: "Coastal Sunshine Coast homes (Mooloolaba, Maroochydore, Coolum, Noosa, Peregian) need a full soft-wash every 9–12 months because salt-laden sea spray accelerates surface staining. Hinterland homes (Buderim, Maleny, Montville, Eumundi) need it every 6–9 months because higher rainfall, lower wind and dense tree cover drive faster mould and lichen growth. Suburbs in between (Sippy Downs, Diddillibah, Bli Bli) sit at 9–10 months as a default.",
  },
  {
    q: "Why do coastal and hinterland homes have different cleaning cycles?",
    a: "They sit in two different environments. The coast is salt-driven — windborne sea spray creates a fine mineral haze on walls and glass that doesn't grow but does stain. The hinterland is biological — higher rainfall and tree cover create the ideal environment for mould, algae and lichen, which grow at the spore level into the substrate. The same render walls will need a chemistry-led wash much sooner inland than on the beachfront.",
  },
  {
    q: "Is the Sunshine Coast harder on house exteriors than Brisbane?",
    a: "Yes — both halves of it. Coastal Sunshine Coast properties are exposed to more salt per square metre than any Brisbane home. Hinterland properties sit in a higher-rainfall, more tree-shaded environment than Greater Brisbane and grow mould faster. The 12–18 month cycle that suits most Brisbane homes is too long for either half of the Sunshine Coast.",
  },
  {
    q: "When in the year should I book the wash?",
    a: "Two ideal windows. Late autumn (April–May) is the calmest period — the storm season is over, the booking calendar is light, and the house looks presentation-ready into winter. Early spring (September–October) is the second window — book before storm season to clear the gutters and get the walls fresh for summer. Avoid mid-summer if you can; humidity makes dwell time longer and the surface dries unevenly.",
  },
  {
    q: "Does living near tree cover change how often I need it?",
    a: "Significantly. A hinterland home under dense canopy in Maleny or Montville may need the south-facing walls top-up cleaned at 6 months while the rest of the house holds 9–12 months. Tree cover blocks UV, traps humidity, and drops leaf litter and tannin into wall textures. We often quote a partial top-up on shaded aspects between full house washes.",
  },
  {
    q: "Will pressure-washing the house make it last longer than soft-washing?",
    a: "No — the opposite. Pressure-washing the walls (render, paint, weatherboard, fibre cement) leaves mould spores embedded in the substrate; visible regrowth typically returns inside 6–12 months. Soft-washing kills the spores at the root with chemistry, so the regrowth interval lengthens to 12–18 months on the coast and 9–12 months in the hinterland. Same house, longer interval.",
  },
  {
    q: "How quickly can WSI get to the Sunshine Coast for an urgent wash?",
    a: "Most Sunshine Coast work is scheduled into weekly batched trips for travel efficiency. For urgent or pre-event work (real estate inspections, holiday rental turnarounds) we can run a same-week standalone visit; the quote reflects the standalone travel.",
  },
];

const CYCLES = [
  {
    zone: "Beachfront (within 500 m of sand)",
    examples: "Mooloolaba, Maroochydore, Noosa Heads, Coolum Beach, Marcoola",
    cycle: "9–12 months",
    drivers: "Salt-laden sea spray, low tree cover, high UV — staining more than growth",
  },
  {
    zone: "Coastal suburban (within ~3 km of coast)",
    examples: "Buddina, Twin Waters, Sunrise Beach, Bli Bli, Pelican Waters",
    cycle: "10–12 months",
    drivers: "Mixed salt + biological pressure; average tree cover",
  },
  {
    zone: "Mid-coast (3–15 km inland)",
    examples: "Sippy Downs, Mountain Creek, Caloundra West, Yandina",
    cycle: "10–12 months",
    drivers: "Standard subtropical pressure, similar to outer Brisbane",
  },
  {
    zone: "Hinterland",
    examples: "Buderim, Maleny, Montville, Eumundi, Mapleton, Bald Knob",
    cycle: "6–9 months",
    drivers: "Higher rainfall, dense canopy, persistent shade, heavy mould pressure",
  },
];

const OVERDUE_SIGNS = [
  {
    sign: "Visible black streaks down render below gutter joins",
    meaning:
      "Mould has colonised under shadowed waterflow. Twelve months overdue at minimum.",
  },
  {
    sign: "South-facing wall has obvious green tinge",
    meaning:
      "Algae bloom. Subtropical UV-shaded substrate; if untreated for another 6 months, lichen will follow.",
  },
  {
    sign: "Crusty grey-green spots on weatherboard or eaves",
    meaning:
      "Lichen. Embedded into substrate. Soft-wash dwell time will be longer and the quote higher.",
  },
  {
    sign: "Web-and-leaf-litter build-up in eave corners",
    meaning:
      "Months of leaf load. Likely sign the gutters need clearing at the same time.",
  },
  {
    sign: "Windows look hazy from outside before the wash",
    meaning:
      "Salt mineral deposit on coastal homes. Tap water won't fix it; you need deionised water and the cycle has slipped.",
  },
];

export default function HouseWashFrequencySunshineCoastGuide() {
  const pageSchema = graph(
    articleSchemaFor({ guide: GUIDE, pageUrl: PAGE_URL, siteUrl: SITE_URL }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      {
        name: "How often to wash your house Sunshine Coast",
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
              Frequency guide · Sunshine Coast
            </span>
            <h1>
              How often should you wash your house on the{" "}
              <em className="hl-orange">Sunshine Coast</em>?
            </h1>
            <GuideMeta guide={GUIDE} />
            <p>
              Coastal homes every 9–12 months. Hinterland homes every 6–9
              months. Same building type, different environments — and the
              wrong cycle costs you the paint, the render or both.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="/#quote">
                Get a Sunshine Coast quote →
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
              Coastal Sunshine Coast homes need a full soft-wash every 9–12
              months. Hinterland homes need it every 6–9 months.
            </strong>{" "}
            Salt-laden sea spray drives surface staining on the coast; higher
            rainfall, dense canopy and persistent shade drive biological
            growth (mould, algae, lichen) in the hinterland. Twelve-monthly
            cycles that suit Brisbane are too long for either half of the
            Sunshine Coast.
          </QuickAnswer>

          <KeyFacts
            items={[
              { label: "Coastal cycle", value: "9–12 months" },
              { label: "Hinterland cycle", value: "6–9 months" },
              { label: "Best book window", value: "Apr–May, Sep–Oct" },
              { label: "Salt to lichen ratio", value: "Opposite drivers" },
            ]}
          />

          <GuideToc items={TOC} />
        </section>

        <section className="content-section">
          <span id="coast-vs-hinterland" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Two regions, one suburb apart
          </span>
          <h2>Why coastal and hinterland Sunshine Coast homes don&rsquo;t share a cycle</h2>
          <p>
            The Sunshine Coast is small enough that you can drive from a salt-
            exposed beach house in Mooloolaba to a rainforest-shaded home in
            Maleny in under 40 minutes. But the cleaning cycles for those two
            homes are completely different, because the environments do
            different things to the surfaces:
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Zone</th>
                  <th scope="col">Typical suburbs</th>
                  <th scope="col">Cycle</th>
                  <th scope="col">What drives it</th>
                </tr>
              </thead>
              <tbody>
                {CYCLES.map((row) => (
                  <tr key={row.zone}>
                    <th scope="row">{row.zone}</th>
                    <td>{row.examples}</td>
                    <td>
                      <strong>{row.cycle}</strong>
                    </td>
                    <td>{row.drivers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout title="The single most useful test">
            Stand 5 metres back from the south-facing wall on a sunny day. If
            you can see uneven tone, streaks, green tinge or fine black
            speckle from that distance, the cycle has slipped. Decide on the
            book by that test, not the calendar.
          </Callout>
        </section>

        <section className="content-section">
          <span id="signs" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            The visible signs
          </span>
          <h2>Five signs your Sunshine Coast home is overdue.</h2>
          <p>
            If any of these apply, the next wash will need more dwell time
            and the quote will reflect that. Booking inside the cycle — not
            after it&rsquo;s slipped — is the cheapest way to maintain the
            exterior over five years.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Sign</th>
                  <th scope="col">What it means</th>
                </tr>
              </thead>
              <tbody>
                {OVERDUE_SIGNS.map((row) => (
                  <tr key={row.sign}>
                    <th scope="row">{row.sign}</th>
                    <td>{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span id="calendar" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            12-month plan
          </span>
          <h2>The Sunshine Coast 12-month maintenance calendar.</h2>
          <p>
            We use a simple seasonal split with our recurring Sunshine Coast
            clients. It maps to weather, booking density and the storms.
          </p>
          <ul className="suburb-list">
            <li>
              <strong>March–May (autumn).</strong> Best time for the annual
              house wash. Storm season has passed, the booking calendar is
              light, humidity drops and dwell times are predictable.
            </li>
            <li>
              <strong>June–August (winter).</strong> Window cleaning and
              roof-only cleans. Lower booking pressure, dry days, easier
              access on hinterland homes.
            </li>
            <li>
              <strong>September–October (pre-storm).</strong> Gutter cleaning
              before the first storms. If you skipped the autumn house wash,
              do it now.
            </li>
            <li>
              <strong>November–February (storm season).</strong> Reactive only
              — gutter clears after big storms, holiday-rental presentation
              cleans, urgent moss treatment on hinterland decks.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <span id="cost-of-waiting" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            What waiting costs
          </span>
          <h2>What does it cost to leave the wash too long?</h2>
          <p>
            Three real costs compound when the cycle slips past 18 months on
            the coast or 12 months in the hinterland:
          </p>
          <ol>
            <li>
              <strong>The next wash costs more.</strong> Heavy biological
              load needs longer dwell time and sometimes a two-pass
              treatment. Expect 15–25% on top of the maintenance rate.
            </li>
            <li>
              <strong>The paint or render fails sooner.</strong> Lichen
              embeds acidic residue into rendered substrates. We&rsquo;ve
              seen 8-year-old render look 15-year-old because the cleaning
              cycle was skipped.
            </li>
            <li>
              <strong>The roof goes with it.</strong> Hinterland roofs that
              skip a wash cycle grow lichen colonies that lift ridge capping
              and shorten the life of the tiles or the Colorbond paint.
            </li>
          </ol>
          <p>
            Annual maintenance is almost always cheaper over five years than
            two-or-three-year intervals because the dwell time, chemistry and
            access stay light.
          </p>
        </section>

        <AuthorCard />

        <section className="content-section service-faqs">
          <span id="faqs" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            FAQ
          </span>
          <h2>Sunshine Coast house wash frequency — your questions.</h2>
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
