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

const SLUG = "salt-haze-windows-sunshine-coast";
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
  { id: "quick-answer", label: "Why coastal windows fog so fast" },
  { id: "chemistry", label: "The chemistry of salt haze" },
  { id: "tap-water", label: "Why tap water makes it worse" },
  { id: "di-water", label: "How deionised water fixes it" },
  { id: "frequency", label: "Cleaning frequency by suburb" },
  { id: "etching", label: "What if you've left it too long" },
  { id: "faqs", label: "FAQs" },
];

const FAQS = [
  {
    q: "Why do my Sunshine Coast windows fog up so quickly?",
    a: "It's not fog — it's salt haze. Windborne sea spray carries microscopic salt crystals that land on glass and remain after the moisture evaporates. Within 2–4 weeks on a coastal home (Mooloolaba, Noosa, Coolum, Maroochydore) the build-up is visible. Within 6–8 weeks the haze is uniform enough that the glass looks foggy from inside even on a sunny day.",
  },
  {
    q: "Will normal washing remove the haze?",
    a: "Initially, yes — but only if the chemistry is right. Tap water is around 60–120 ppm of dissolved minerals on the Sunshine Coast, which redeposits as the water evaporates. So you remove the salt and add a mineral spot in its place. After two or three cycles of tap-water cleaning the glass looks worse than before. The only finish that stays clear is deionised water — mineral-free water that evaporates without leaving anything behind.",
  },
  {
    q: "How often do coastal Sunshine Coast windows need cleaning?",
    a: "Every 6–8 weeks for properties within 500 m of sand. Every 2–3 months for properties 500 m–3 km inland. Every 3–4 months for properties further inland. Salt deposition rate is roughly inversely proportional to distance from the coast and exposure to onshore wind.",
  },
  {
    q: "What is deionised water and how is it different from tap water?",
    a: "Deionised water has been passed through ion-exchange resin that removes every dissolved mineral, leaving water at near-zero ppm. Standard tap water is 60–120 ppm of dissolved minerals on the Sunshine Coast (mostly calcium, magnesium, silicates, plus regional variation). When DI water evaporates off glass there's nothing left to leave a spot or streak. When tap water evaporates, the minerals stay behind.",
  },
  {
    q: "Can salt haze permanently etch the glass?",
    a: "Yes — eventually. Salt that sits on glass for years (especially in combination with UV) can leave a permanent etched haze that no cleaning will fully remove. This is a coastal-Australia reality on neglected glass. Glass that has been etched needs a restoration polish (mechanical) rather than a chemistry clean, and even then full clarity recovery isn't guaranteed.",
  },
  {
    q: "Do I need to clean the frames too?",
    a: "On coastal homes, yes — salt accelerates corrosion on aluminium frames and pits the surface. Frame and sill care is an inexpensive add-on ($2–$4 per window) and extends the life of the frame finish significantly. Track flush is also worth doing on sliding doors because salt + grit in tracks chews the rollers.",
  },
  {
    q: "Is the DI-water method safer for tinted and laminated glass?",
    a: "Yes. There are no detergents touching the glass, no squeegee scraping pressure, and no risk of abrasive grit being dragged across the surface. For tinted and laminated panels — common on modern Sunshine Coast homes — DI-water pole work is the safest method.",
  },
];

const SUBURB_FREQUENCY = [
  {
    zone: "Beachfront (within 200 m of sand, direct onshore exposure)",
    suburbs: "Mooloolaba foreshore, Noosa Main Beach, Sunshine Beach, Marcoola Beach, Coolum Beach",
    frequency: "Every 4–6 weeks",
  },
  {
    zone: "Coastal (within 500 m of sand)",
    suburbs: "Buddina, Twin Waters, Sunrise Beach, Peregian Beach, Wurtulla",
    frequency: "Every 6–8 weeks",
  },
  {
    zone: "Near-coastal (500 m – 3 km inland)",
    suburbs: "Maroochydore, Caloundra, Yaroomba, Bli Bli, Pelican Waters",
    frequency: "Every 2–3 months",
  },
  {
    zone: "Inland Sunshine Coast",
    suburbs: "Sippy Downs, Diddillibah, Nambour, Tanawha",
    frequency: "Every 3–4 months",
  },
  {
    zone: "Hinterland",
    suburbs: "Buderim, Maleny, Montville, Eumundi",
    frequency: "Every 3–4 months (mildew, not salt, drives the cycle here)",
  },
];

const CHEMISTRY_FACTS = [
  {
    fact: "Sodium chloride (NaCl)",
    detail:
      "The primary salt in sea spray. Dissolves on contact with humidity, recrystallises as the water evaporates.",
  },
  {
    fact: "Calcium and magnesium",
    detail:
      "Mineral cocktail in seawater that bonds with the silica in glass over years, producing the permanent haze.",
  },
  {
    fact: "Silica gel residue",
    detail:
      "Salt + UV + heat slowly converts silica from the glass into surface silica gel — visible as the unrecoverable haze.",
  },
  {
    fact: "Onshore breeze deposition",
    detail:
      "Most salt is deposited overnight and in the early morning when onshore breezes are strongest and humidity highest.",
  },
];

export default function SaltHazeWindowsGuide() {
  const pageSchema = graph(
    articleSchemaFor({ guide: GUIDE, pageUrl: PAGE_URL, siteUrl: SITE_URL }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      {
        name: "Salt haze windows Sunshine Coast",
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
              Coastal method guide · Sunshine Coast
            </span>
            <h1>
              Salt haze on Sunshine Coast windows — why{" "}
              <em className="hl-orange">tap water</em> won&rsquo;t fix it.
            </h1>
            <GuideMeta guide={GUIDE} />
            <p>
              Coastal Sunshine Coast windows fog within 4–8 weeks from salt
              spray. Tap water makes it worse because it leaves mineral spots.
              Deionised water is the only finish that stays clear on
              salt-exposed glass.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="/#quote">
                Book a coastal clean →
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
              Salt haze is a chemistry problem, not a dirt problem.
            </strong>{" "}
            Sea spray deposits microscopic salt crystals that the eye reads
            as fog. Tap water (60–120 ppm minerals) doesn&rsquo;t fix
            it — it adds mineral spots on top of the salt. The only finish
            that stays clear on coastal Sunshine Coast glass is deionised
            water, applied with a pole brush, which leaves nothing behind as
            it dries. Beachfront homes need this every 4–6 weeks.
          </QuickAnswer>

          <KeyFacts
            items={[
              { label: "Beachfront cycle", value: "4–6 weeks" },
              { label: "Coastal cycle", value: "6–8 weeks" },
              { label: "Tap water minerals", value: "60–120 ppm" },
              { label: "DI water minerals", value: "≈ 0 ppm" },
            ]}
          />

          <GuideToc items={TOC} />
        </section>

        <section className="content-section">
          <span id="chemistry" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            The chemistry
          </span>
          <h2>What&rsquo;s actually on your coastal glass.</h2>
          <p>
            Sea spray isn&rsquo;t just water. Every droplet carries a mineral
            cocktail that&rsquo;s left behind when the moisture evaporates.
            Across the Sunshine Coast, the four most consequential deposits on
            coastal glass are:
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">What&rsquo;s deposited</th>
                  <th scope="col">What it does to the glass</th>
                </tr>
              </thead>
              <tbody>
                {CHEMISTRY_FACTS.map((row) => (
                  <tr key={row.fact}>
                    <th scope="row">{row.fact}</th>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Salt deposition is heaviest on east- and northeast-facing windows
            on the Sunshine Coast — the direction of the prevailing onshore
            breeze. Properties along Mooloolaba Esplanade, Hastings Street
            Noosa and the Marcoola foreshore see deposition rates 3–5 times
            higher than properties 2 km inland.
          </p>
        </section>

        <section className="content-section">
          <span id="tap-water" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            The DIY problem
          </span>
          <h2>Why tap water makes the haze worse.</h2>
          <p>
            Sunshine Coast tap water sits at around 60–120 ppm of dissolved
            minerals (calcium, magnesium, silicates) depending on the bore
            mix and the season. When you wipe a coastal window with a cloth
            and a bucket of tap water, you do two things:
          </p>
          <ol>
            <li>
              Dissolve and lift some of the surface salt — good.
            </li>
            <li>
              Leave behind 60–120 ppm of <em>different</em> minerals as the
              water evaporates — bad.
            </li>
          </ol>
          <p>
            After one cycle the glass looks better. After three cycles the
            mineral redeposit has built up its own haze, and the glass
            doesn&rsquo;t reach the clarity it had after the first clean. By
            cycle five you&rsquo;ve created a mineral problem on top of a
            salt problem. Squeegee technique hides this on a single pane but
            you can&rsquo;t squeegee a second-storey cluster, and the haze
            shows up brightest on a sunny day backlit from inside.
          </p>
        </section>

        <section className="content-section">
          <span id="di-water" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            The fix
          </span>
          <h2>How deionised water actually fixes salt haze.</h2>
          <p>
            Deionised (DI) water is tap water passed through an ion-exchange
            resin that removes every dissolved mineral. Output is near-zero
            ppm. When DI water lands on glass and evaporates, there&rsquo;s
            nothing left behind — no minerals to leave a spot, no streak from
            calcium drying unevenly.
          </p>
          <p>
            Our pole system carries DI water from a tank in the van, up the
            carbon-fibre pole and out through a soft brush head. The brush
            agitates the salt and grit; the DI water rinses it; the glass
            air-dries clear. No wiping, no squeegee scraping, no detergent
            residue. On a second-storey window cluster the system reaches
            from the ground without ladders or risk.
          </p>
          <Callout title="Why this matters for coastal glass long-term">
            Repeated DI-water cleaning prevents the silica-gel haze that
            permanently etches neglected coastal glass over years. A 5-year
            cleaning programme on DI water keeps the glass clear; the same
            5 years of tap-water cleaning leaves a mineral-and-salt cocktail
            that bonds permanently.
          </Callout>
        </section>

        <section className="content-section">
          <span id="frequency" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            By suburb
          </span>
          <h2>Cleaning frequency by Sunshine Coast suburb.</h2>
          <p>
            Salt deposition rate falls off quickly with distance from the
            coast and dramatically with shielding (dunes, neighbouring
            buildings, vegetation). Here&rsquo;s our working cycle by zone:
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Zone</th>
                  <th scope="col">Typical suburbs</th>
                  <th scope="col">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {SUBURB_FREQUENCY.map((row) => (
                  <tr key={row.zone}>
                    <th scope="row">{row.zone}</th>
                    <td>{row.suburbs}</td>
                    <td>
                      <strong>{row.frequency}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span id="etching" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            If you&rsquo;ve left it too long
          </span>
          <h2>What if the glass is already etched?</h2>
          <p>
            On properties that haven&rsquo;t been cleaned for years — common
            on rental properties, holiday homes between bookings, or
            inheritance-stage estates — the salt and minerals can have bonded
            into the silica of the glass itself. The visible haze stops
            responding to chemistry-led cleaning because the deposit is now
            inside the surface, not on it.
          </p>
          <p>
            The fix at that stage is a mechanical restoration: a polish with
            a low-grit compound and an oscillating pad. We don&rsquo;t do
            etched-glass restoration in scope, but the right diagnosis still
            saves money — you don&rsquo;t book five rounds of cleaning hoping
            it will come back. You go straight to restoration or replacement
            on the affected panes and keep the rest of the property on a DI
            water cycle.
          </p>
        </section>

        <AuthorCard />

        <section className="content-section service-faqs">
          <span id="faqs" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            FAQ
          </span>
          <h2>Salt haze on Sunshine Coast windows — your questions.</h2>
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
