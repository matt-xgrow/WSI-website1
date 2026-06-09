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

const SLUG = "mould-vs-lichen-vs-algae";
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
  { id: "quick-answer", label: "Mould vs lichen vs algae — fast ID" },
  { id: "mould", label: "Mould — black streaks and shadow growth" },
  { id: "algae", label: "Algae — green film and slippery paths" },
  { id: "lichen", label: "Lichen — crusty patches on roofs" },
  { id: "treatments", label: "Treatment by organism" },
  { id: "prevention", label: "Prevention by surface" },
  { id: "faqs", label: "FAQs" },
];

const FAQS = [
  {
    q: "What's the difference between mould, algae and lichen?",
    a: "Mould is a fungus — black or dark grey streaks, usually shadowed or below waterflow lines, that grow at the spore level into porous substrates. Algae is a single-celled plant — a green slippery film on damp, shaded paving and walls. Lichen is a symbiotic organism (fungus + algae) — crusty grey-green or orange-yellow patches that embed into roof tiles, render and weatherboard. They look different, grow differently and need different treatment.",
  },
  {
    q: "Can I treat all three with the same chemistry?",
    a: "A sodium hypochlorite + surfactant soft-wash blend kills all three at the spore level. The dilution and dwell time differ — algae releases easily after a 5-minute dwell, mould needs 8–10 minutes for the chemistry to penetrate, and lichen often needs 10–15 minutes plus a second application if the colony is mature. Pressure-washing alone doesn't kill any of them; it just removes the visible top layer.",
  },
  {
    q: "Is the green on my driveway dangerous?",
    a: "It's slippery, which is the most common cause of slip injuries on residential property in South East Queensland — particularly around pools and on shaded paths after rain. Green algae also accelerates surface degradation on concrete and pavers because of acidic by-products. Treat it as soon as you can see a continuous film.",
  },
  {
    q: "Why does the lichen come back so fast on my Sunshine Coast roof?",
    a: "Pressure-washing alone leaves lichen spores embedded in the substrate; you've removed the visible colony but not killed it. Subtropical UV plus humidity allows the colony to regrow inside 12–18 months. A proper soft-wash treatment kills the spores; expected regrowth then sits at 3–5 years on a roof.",
  },
  {
    q: "Is mould on my house walls dangerous to my health?",
    a: "External mould on render or paint is rarely a direct health concern — it's outside, and the volume per square metre is low. The bigger risk is internal: external mould flagging that the wall cavity is damp, which is then driving an internal mould problem. If external mould is paired with internal staining, get the wall cavity inspected.",
  },
  {
    q: "Can I tell what I have from a photo?",
    a: "Yes — most of the time. Send four photos (wall, eaves, roof, paving) and we'll identify what's there and quote treatment accordingly. Black streaks below downpipes = mould. Green film on paving = algae. Crusty patches with raised edges on roof tiles = lichen. We confirm with a visual ID on the day and refine the chemistry to match.",
  },
  {
    q: "Will bleach from the supermarket kill it?",
    a: "Household bleach is sodium hypochlorite at 3–5% concentration — same active ingredient as soft-wash but at much lower strength. It will kill what it touches at the surface, but residential bleach without a surfactant doesn't cling to vertical surfaces long enough to penetrate the substrate. The biological top layer goes; the spores remain.",
  },
];

const ORGANISM_ID = [
  {
    organism: "Mould",
    appearance:
      "Black, dark grey or olive streaks. Often vertical, following waterflow under gutter joins, downpipe drips and below window sills.",
    where:
      "Render, paint, weatherboard. South-facing walls. Shaded sections. Eaves and soffits.",
    trigger:
      "Shade + humidity + low airflow. Worst on south aspects under tree cover.",
    treatment:
      "Soft-wash with sodium hypochlorite + surfactant. 8–10 min dwell, controlled rinse.",
  },
  {
    organism: "Algae",
    appearance:
      "Green slippery film. Smooth, even coverage on horizontal or shaded vertical surfaces.",
    where:
      "Driveways, paths, pool surrounds, retaining walls. Shaded north-facing fences. Concrete and pavers.",
    trigger:
      "Damp + low airflow. Sprinkler overspray. Pool splash. After rain in spring/summer.",
    treatment:
      "Pressure-wash with chemical pre-treat. Surface cleaner pass. 5 min dwell sufficient.",
  },
  {
    organism: "Lichen",
    appearance:
      "Crusty grey-green, white-grey or orange-yellow patches. Raised, scaly, embedded into the substrate.",
    where:
      "Roof tiles (concrete, terracotta, Colorbond), render walls under tree cover, fibre cement.",
    trigger:
      "Tree cover + humidity + UV. Worst on shaded hinterland roofs in Maleny, Buderim, hinterland Brisbane (Mt Coot-tha, Mt Gravatt).",
    treatment:
      "Soft-wash, longer dwell (10–15 min). Mature colonies need a second pass. 3–5 year regrowth after correct kill.",
  },
];

const TREATMENT_TABLE = [
  {
    surface: "Concrete tile roof with lichen",
    method: "Soft wash, sodium hypochlorite, 10–15 min dwell",
    avoid: "Pressure-washing strips the cementitious layer and accelerates regrowth",
  },
  {
    surface: "Render wall with mould streaks",
    method: "Soft wash, low-pressure pump, bottom-up application",
    avoid: "High pressure cracks render and forces water behind coating",
  },
  {
    surface: "Concrete driveway with algae",
    method: "Pressure wash with pre-treat algaecide, surface cleaner pass",
    avoid: "Chemistry without pressure leaves a film; pressure without chemistry regrows in months",
  },
  {
    surface: "Painted weatherboard with mould",
    method: "Soft wash, 5–7 min dwell, gentle rinse",
    avoid: "Pressure-washing strips paint and lifts boards",
  },
  {
    surface: "Pool-surround pavers with algae",
    method: "Pressure wash with detergent pre-treat (no acid)",
    avoid: "Acid etches paver surface and risks pool chemistry contamination",
  },
  {
    surface: "Colorbond roof with light lichen",
    method: "Soft wash at low pressure",
    avoid: "Pressure-washing pierces aged paint and creates rust-prone scratch lines",
  },
];

const PREVENTION = [
  {
    where: "Walls (general)",
    do: "Trim tree canopy 1 m back from the wall. Soft-wash every 12 months in coastal SC, 9 months in hinterland.",
  },
  {
    where: "Paving and driveways",
    do: "Sweep monthly. Don't let leaf litter sit. Reposition sprinklers off concrete edges.",
  },
  {
    where: "Roof",
    do: "Soft-wash every 3–5 years on the coast, sooner under hinterland canopy. Don't pressure-wash.",
  },
  {
    where: "Pool surround",
    do: "Detergent clean every 6–12 months. Check sunscreen-oil load before summer.",
  },
  {
    where: "Eaves and soffits",
    do: "Detail-clean as part of the house wash. Highest mould-pressure area on most Queensland homes.",
  },
];

export default function MouldVsLichenVsAlgaeGuide() {
  const pageSchema = graph(
    articleSchemaFor({ guide: GUIDE, pageUrl: PAGE_URL, siteUrl: SITE_URL }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      { name: "Mould vs lichen vs algae", url: `/guides/${SLUG}` },
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
              Diagnosis guide · Sunshine Coast & Brisbane
            </span>
            <h1>
              Mould vs lichen vs algae — what&rsquo;s actually growing on your{" "}
              <em className="hl-orange">property</em>?
            </h1>
            <GuideMeta guide={GUIDE} />
            <p>
              Black streaks below the gutter line = mould. Slippery green film
              on paving = algae. Crusty patches on the roof = lichen. Each one
              has a different cause and needs a different treatment. Get the
              ID wrong and the &ldquo;clean&rdquo; lasts six months instead of
              three years.
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
              Mould is fungus (dark streaks on walls), algae is a single-celled
              plant (green film on paving), lichen is fungus + algae living
              together (crusty patches on roofs).
            </strong>{" "}
            Mould and lichen need soft-wash chemistry to kill the spores in
            the substrate. Algae needs a pressure wash with a chemical
            pre-treat. Pressure-washing mould or lichen alone removes the
            visible layer but leaves the spores — regrowth inside 6–12
            months. The right method gets you 3–5 years between cleans.
          </QuickAnswer>

          <KeyFacts
            items={[
              { label: "Mould → method", value: "Soft wash" },
              { label: "Algae → method", value: "Pressure + pre-treat" },
              { label: "Lichen → method", value: "Soft wash (long dwell)" },
              { label: "Regrowth (correct)", value: "3–5 years" },
            ]}
          />

          <GuideToc items={TOC} />
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            ID at a glance
          </span>
          <h2>The three-organism visual ID.</h2>
          <p>
            Most Brisbane and Sunshine Coast properties carry at least two of
            these three organisms at any given time. Identifying them
            correctly is the difference between booking the right service and
            paying for a clean that doesn&rsquo;t last.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Organism</th>
                  <th scope="col">What it looks like</th>
                  <th scope="col">Where it grows</th>
                  <th scope="col">Trigger</th>
                </tr>
              </thead>
              <tbody>
                {ORGANISM_ID.map((row) => (
                  <tr key={row.organism}>
                    <th scope="row">{row.organism}</th>
                    <td>{row.appearance}</td>
                    <td>{row.where}</td>
                    <td>{row.trigger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span id="mould" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Mould
          </span>
          <h2>Mould — the dark streaks below gutter joins.</h2>
          <p>
            Mould is the most common organism on Queensland home walls. On
            rendered, painted or weatherboard exteriors it shows up as dark
            grey, black or olive streaks — usually vertical, almost always
            below a shadow line (gutter join, sill, downpipe drip).
            It&rsquo;s a fungus, and unlike algae it doesn&rsquo;t need
            sunlight to grow. Shade + humidity + low airflow is enough.
          </p>
          <p>
            Mould penetrates porous substrates at the spore level.
            Pressure-washing strips the top layer and leaves the spores
            behind, which is why mould always comes back inside 12 months
            after a pressure clean. A soft-wash treatment with sodium
            hypochlorite kills the spores at the root and resets the clock
            for 12–18 months on walls, 3–5 years on roofs.
          </p>
        </section>

        <section className="content-section">
          <span id="algae" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Algae
          </span>
          <h2>Algae — the slippery green on the path after rain.</h2>
          <p>
            Algae is the green film you see on shaded driveways, paths and
            pool surrounds — particularly after a wet spring or summer. It
            grows in places where water sits long enough for the surface to
            stay damp: under sprinkler overspray, in low-airflow side paths,
            near pool splash zones.
          </p>
          <p>
            On hard surfaces, the right treatment is a pressure wash with a
            chemical pre-treat — the chemistry breaks down the cell walls,
            the pressure removes the residue. Just pressure-washing without
            chemistry leaves a microfilm that re-greens within months. Just
            chemistry without pressure removes the colour but leaves the dirt
            and looks half-clean.
          </p>
          <Callout title="Safety note">
            Algae on shaded paths and pool surrounds is the leading cause of
            slip injuries on residential property in South East Queensland.
            If a path looks even slightly green after rain, treat it.
          </Callout>
        </section>

        <section className="content-section">
          <span id="lichen" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Lichen
          </span>
          <h2>Lichen — the crusty patches on the roof.</h2>
          <p>
            Lichen is the hardest of the three to remove because it&rsquo;s
            two organisms in one — a fungus that provides structure and an
            algae that photosynthesises. Together they form crusty grey-green
            patches (sometimes yellow or orange depending on species) with
            raised, scaly edges that embed into the substrate they grow on.
          </p>
          <p>
            On roofs, lichen is the single biggest threat to tile and
            Colorbond longevity. It traps moisture, releases mild acid as it
            grows and lifts ridge capping over years. On render walls under
            heavy tree cover (common in Maleny, Montville, Mt Coot-tha and
            inner-Brisbane heritage suburbs) it spreads in shaded patches and
            slowly degrades the coating.
          </p>
          <p>
            Pressure-washing lichen off a roof is a category mistake. The
            visible colony comes off but the embedded spores remain, the
            cementitious surface of the tile is stripped (which accelerates
            regrowth) and on aged Colorbond the paint is pierced. The correct
            treatment is a soft-wash with a long dwell time — 10–15 minutes
            for mature colonies, sometimes a second application — followed by
            a controlled rinse.
          </p>
        </section>

        <section className="content-section">
          <span id="treatments" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Treatments
          </span>
          <h2>The right treatment for each surface.</h2>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Surface</th>
                  <th scope="col">Right method</th>
                  <th scope="col">Don&rsquo;t do</th>
                </tr>
              </thead>
              <tbody>
                {TREATMENT_TABLE.map((row) => (
                  <tr key={row.surface}>
                    <th scope="row">{row.surface}</th>
                    <td>{row.method}</td>
                    <td>{row.avoid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <span id="prevention" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Prevention
          </span>
          <h2>How to slow down regrowth on every surface.</h2>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Where</th>
                  <th scope="col">What to do</th>
                </tr>
              </thead>
              <tbody>
                {PREVENTION.map((row) => (
                  <tr key={row.where}>
                    <th scope="row">{row.where}</th>
                    <td>{row.do}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AuthorCard />

        <section className="content-section service-faqs">
          <span id="faqs" />
          <span className="eyebrow">
            <span className="eyebrow-line" />
            FAQ
          </span>
          <h2>Mould, lichen and algae — your questions.</h2>
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
