import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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
import post from "@/content/driveway-stain-removal-brisbane.json";

const SLUG = "driveway-stain-removal-brisbane";
const GUIDE = getGuide(SLUG)!;
const PAGE_URL = `${SITE_URL}/guides/${SLUG}/`;

const HERO_IMAGE = {
  src: "/images/jobs/driveway-pressure-cleaning-brisbane-aerial.webp",
  width: 1600,
  height: 1200,
  alt: "Aerial view of a WSI Cleaning technician pressure washing a concrete driveway beside the work ute in Brisbane",
} as const;

const JOB_IMAGE = {
  src: "/images/jobs/driveway-pressure-cleaning-brisbane-townhouse.webp",
  width: 1600,
  height: 1067,
  alt: "WSI Cleaning technician on a concrete driveway in front of a Brisbane townhouse garage",
} as const;

const TYRE_IMAGE = {
  src: "/images/jobs/townhouse-complex-cleaning-brisbane-aerial.webp",
  width: 1600,
  height: 1200,
  alt: "WSI Cleaning technician pressure washing a common driveway through a Brisbane townhouse complex",
} as const;

const CCAA_CLEANING =
  "https://ccaa.com.au/wp-content/uploads/2026/09/CCAA_DS_Cleaning-Concrete.pdf";
const CCAA_STAINS =
  "https://ccaa.com.au/wp-content/uploads/2026/08/Removing-Stains-from-Concrete.pdf";
const BCC_COMPLAINT =
  "https://www.brisbane.qld.gov.au/about-council/contact-council/make-a-complaint";
const BCC_CREEKS =
  "https://www.brisbane.qld.gov.au/environment-and-water/creeks-and-waterways/creeks-and-catchments";

function GuideFigure({
  image,
}: {
  image: { src: string; width: number; height: number; alt: string };
}) {
  return (
    <figure className="guide-figure">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 860px) 100vw, 820px"
      />
    </figure>
  );
}

type Block = {
  h: string;
  p: string[];
  list?: string[];
  after?: string[];
};

type Anchor = {
  key: string;
  phrase: string;
  href: string;
  external?: boolean;
};

const BLOCKS = post.body as Block[];

const ANCHORS: Anchor[] = [
  {
    key: "mould-guide",
    phrase: "guide to mould, lichen and algae",
    href: "/guides/mould-vs-lichen-vs-algae/",
  },
  {
    key: "cost-guide",
    phrase: "driveway pressure washing costs in Brisbane",
    href: "/guides/pressure-washing-driveway-cost-brisbane/",
  },
  {
    key: "contact-form",
    phrase: "contact form",
    href: "/contact/",
  },
  {
    key: "phone",
    phrase: site.phoneDisplay,
    href: site.phoneHref,
  },
  {
    key: "ccaa-cleaning",
    phrase: "Cement Concrete & Aggregates Australia (CCAA)",
    href: CCAA_CLEANING,
    external: true,
  },
  {
    key: "ccaa-stains",
    phrase: "CCAA's data sheet on removing stains",
    href: CCAA_STAINS,
    external: true,
  },
  {
    key: "ccaa-rust",
    phrase: "CCAA's guidance",
    href: CCAA_STAINS,
    external: true,
  },
  {
    key: "ccaa-whole-surface",
    phrase: "CCAA makes the same point",
    href: CCAA_CLEANING,
    external: true,
  },
  {
    key: "bcc-diy",
    phrase: "Brisbane City Council",
    href: BCC_COMPLAINT,
    external: true,
  },
  {
    key: "bcc-faq",
    phrase: "Brisbane City Council",
    href: BCC_COMPLAINT,
    external: true,
  },
  {
    key: "bcc-creeks",
    phrase: "stormwater drain",
    href: BCC_CREEKS,
    external: true,
  },
];

function assignAnchors(nodes: { id: string; text: string }[]) {
  const claimed = new Set<string>();
  const byNode = new Map<string, Anchor[]>();
  for (const node of nodes) {
    const assigned: Anchor[] = [];
    let cursor = 0;
    while (cursor < node.text.length) {
      let best: { index: number; anchor: Anchor } | null = null;
      for (const anchor of ANCHORS) {
        if (claimed.has(anchor.key)) continue;
        const index = node.text
          .toLowerCase()
          .indexOf(anchor.phrase.toLowerCase(), cursor);
        if (index < 0) continue;
        if (
          !best ||
          index < best.index ||
          (index === best.index &&
            anchor.phrase.length > best.anchor.phrase.length)
        ) {
          best = { index, anchor };
        }
      }
      if (!best) break;
      claimed.add(best.anchor.key);
      assigned.push(best.anchor);
      cursor = best.index + best.anchor.phrase.length;
    }
    byNode.set(node.id, assigned);
  }
  return byNode;
}

const TEXT_NODES: { id: string; text: string }[] = [
  { id: "answer", text: post.answer },
  ...BLOCKS.flatMap((block, index) => [
    ...block.p.map((text, part) => ({ id: `p-${index}-${part}`, text })),
    ...(block.list ?? []).map((text, part) => ({
      id: `list-${index}-${part}`,
      text,
    })),
    ...(block.after ?? []).map((text, part) => ({
      id: `after-${index}-${part}`,
      text,
    })),
  ]),
  { id: "cta", text: post.cta },
  ...post.faq.map((item, index) => ({ id: `faq-${index}`, text: item.a })),
];

const ANCHORS_BY_NODE = assignAnchors(TEXT_NODES);

function RichText({ id, text }: { id: string; text: string }) {
  return <>{linkify(text, ANCHORS_BY_NODE.get(id) ?? [], id)}</>;
}

function linkify(text: string, anchors: Anchor[], keyPrefix: string) {
  if (!text) return null;
  const hits: { index: number; anchor: Anchor }[] = [];
  for (const anchor of anchors) {
    const index = text.toLowerCase().indexOf(anchor.phrase.toLowerCase());
    if (index >= 0) hits.push({ index, anchor });
  }
  hits.sort(
    (a, b) =>
      a.index - b.index || b.anchor.phrase.length - a.anchor.phrase.length,
  );

  const nodes: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((hit, index) => {
    if (hit.index < cursor) return;
    if (hit.index > cursor) nodes.push(text.slice(cursor, hit.index));
    const label = text.slice(hit.index, hit.index + hit.anchor.phrase.length);
    const key = `${keyPrefix}-a-${index}`;
    if (hit.anchor.external || hit.anchor.href.startsWith("tel:")) {
      nodes.push(
        <a
          key={key}
          href={hit.anchor.href}
          {...(hit.anchor.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={key} href={hit.anchor.href}>
          {label}
        </Link>,
      );
    }
    cursor = hit.index + hit.anchor.phrase.length;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function articleWordCount() {
  const parts = [post.h1, post.answer, post.cta];
  for (const block of BLOCKS) {
    parts.push(block.h, ...block.p, ...(block.list ?? []), ...(block.after ?? []));
  }
  for (const item of post.faq) parts.push(item.q, item.a);
  return parts.join(" ").split(/\s+/).filter((word) => word.length > 0).length;
}

const REVIEWED = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date(`${GUIDE.updated}T00:00:00`));

const TOC = [
  { id: "quick-answer", label: "Quick answer" },
  ...BLOCKS.map((block) => ({ id: headingId(block.h), label: block.h })),
  { id: "faqs", label: "FAQ" },
];

export const metadata: Metadata = {
  title: { absolute: GUIDE.title },
  description: GUIDE.description,
  alternates: { canonical: `/guides/${SLUG}/` },
  openGraph: {
    title: GUIDE.title,
    description: GUIDE.description,
    url: `/guides/${SLUG}/`,
    images: [{ url: GUIDE.image, alt: GUIDE.imageAlt }],
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

function articleSchema() {
  return {
    ...articleSchemaFor({ guide: GUIDE, pageUrl: PAGE_URL, siteUrl: SITE_URL }),
    "@type": "Article",
    headline: GUIDE.headline,
    alternativeHeadline: GUIDE.title,
    description: GUIDE.description,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${HERO_IMAGE.src}`,
      width: HERO_IMAGE.width,
      height: HERO_IMAGE.height,
      caption: HERO_IMAGE.alt,
    },
    author: {
      "@type": "Organization",
      name: "WSI Cleaning team, Brisbane",
      url: `${SITE_URL}/about-us/`,
    },
    publisher: {
      "@type": "Organization",
      name: "WSI Cleaning",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/design/logo-color.png`,
        width: 512,
        height: 512,
      },
    },
    wordCount: articleWordCount(),
  };
}

export default function DrivewayStainRemovalBrisbaneGuide() {
  const pageSchema = graph(
    articleSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides/" },
      {
        name: "Driveway stain removal Brisbane",
        url: `/guides/${SLUG}/`,
      },
    ]),
    faqPageSchemaFromList(
      post.faq.map((item) => ({ q: item.q, a: item.a })),
      `${PAGE_URL}#faq`,
    ),
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
              Guide · Brisbane
            </span>
            <h1>{post.h1}</h1>
            <GuideMeta guide={GUIDE} />
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
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={720}
              height={540}
              priority
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 720px"
            />
          </div>
        </section>

        <div className="guide-copy">
          <section className="content-section guide-section">
            <span id="quick-answer" />
            <QuickAnswer>
              <RichText id="answer" text={post.answer} />
            </QuickAnswer>
            <p className="related-guide">
              Related service:{" "}
              <Link href="/driveway-cleaning/">driveway cleaning</Link>.
            </p>
            <GuideToc items={TOC} />
          </section>

          {BLOCKS.map((block, index) => (
            <section key={block.h} className="content-section guide-section">
              <h2 id={headingId(block.h)}>{block.h}</h2>
              {block.p.map((paragraph, part) => (
                <p key={`p-${index}-${part}`}>
                  <RichText id={`p-${index}-${part}`} text={paragraph} />
                </p>
              ))}
              {block.list ? (
                <ul className="guide-list">
                  {block.list.map((item, part) => (
                    <li key={`list-${index}-${part}`}>
                      <RichText id={`list-${index}-${part}`} text={item} />
                    </li>
                  ))}
                </ul>
              ) : null}
              {(block.after ?? []).map((paragraph, part) => (
                <p key={`after-${index}-${part}`}>
                  <RichText id={`after-${index}-${part}`} text={paragraph} />
                </p>
              ))}
              {block.h === "Tyre marks and everyday grime" ? (
                <>
                  <GuideFigure image={TYRE_IMAGE} />
                  <p className="related-guide">
                    Related service:{" "}
                    <Link href="/pressure-washing/">
                      pressure washing in Brisbane
                    </Link>
                    .
                  </p>
                </>
              ) : null}
              {block.h === "How WSI handles a driveway stain job" ? (
                <GuideFigure image={JOB_IMAGE} />
              ) : null}
            </section>
          ))}

          <section className="content-section guide-section">
            <Callout>
              <RichText id="cta" text={post.cta} />
            </Callout>
            <p className="related-guide">
              Related service:{" "}
              <Link href="/driveway-cleaning/">driveway cleaning</Link>.
              Service area:{" "}
              <Link href="/brisbane/">
                exterior cleaning across Brisbane
              </Link>
              .
            </p>
          </section>

          <section className="content-section guide-section">
            <p>
              Written by the WSI Cleaning team, Brisbane. Reviewed {REVIEWED}.
            </p>
          </section>

          <AuthorCard name="WSI Cleaning team, Brisbane" />

          <section className="content-section service-faqs" id="faqs">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              FAQ
            </span>
            <h2>FAQ</h2>
            <div className="faq-list-inline">
              {post.faq.map((item, index) => (
                <details key={item.q} className="faq-item-inline">
                  <summary>
                    <h3>{item.q}</h3>
                    <span aria-hidden="true" className="faq-toggle">
                      +
                    </span>
                  </summary>
                  <p>
                    <RichText id={`faq-${index}`} text={item.a} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <RelatedGuides slug={SLUG} />
        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
