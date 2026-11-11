import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
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
import post from "@/content/commercial-building-washing-brisbane.json";

const SLUG = "commercial-building-washing-brisbane";
const GUIDE = getGuide(SLUG)!;
const PAGE_URL = `${SITE_URL}/guides/${SLUG}/`;

const WASH_IMAGE = {
  src: "/images/guides/wsicleaningdrone-11.webp",
  width: 1600,
  height: 1200,
  alt: post.images[1].alt,
} as const;

const JOB_IMAGE = {
  src: "/images/guides/wsicleaningdrone-14.webp",
  width: 1600,
  height: 1200,
  alt: post.images[2].alt,
} as const;

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
  ...post.internal.map(([phrase, , href], index) => ({
    key: `internal-${index}`,
    phrase,
    href: new URL(href).pathname,
  })),
  {
    key: "heights",
    phrase: post.external[0].title,
    href: post.external[0].href,
    external: true,
  },
  {
    key: "act",
    phrase: "City of Brisbane Act 2010",
    href: post.external[1].href,
    external: true,
  },
  {
    key: "phone",
    phrase: site.phoneDisplay,
    href: site.phoneHref,
  },
  {
    key: "quote",
    phrase: "request a fixed-price quote",
    href: "/#quote",
  },
];

function confirmPattern() {
  return /\[CONFIRM WITH CLIENT:[^\]]*\]/g;
}

function maskConfirms(text: string) {
  return text.replace(confirmPattern(), (match) => " ".repeat(match.length));
}

function assignAnchors(nodes: { id: string; text: string }[]) {
  const claimed = new Set<string>();
  const byNode = new Map<string, Anchor[]>();
  for (const node of nodes) {
    const masked = maskConfirms(node.text);
    const assigned: Anchor[] = [];
    let cursor = 0;
    while (cursor < masked.length) {
      let best: { index: number; anchor: Anchor } | null = null;
      for (const anchor of ANCHORS) {
        if (claimed.has(anchor.key)) continue;
        const index = masked
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
  const anchors = ANCHORS_BY_NODE.get(id) ?? [];
  const parts = text.split(confirmPattern());
  const confirms = text.match(confirmPattern()) ?? [];
  const nodes: ReactNode[] = [];

  parts.forEach((part, index) => {
    nodes.push(
      <Fragment key={`${id}-t-${index}`}>
        {linkify(part, anchors, `${id}-${index}`)}
      </Fragment>,
    );
    const confirm = confirms[index];
    if (confirm) {
      nodes.push(
        <mark key={`${id}-c-${index}`} className="confirm-pending">
          {confirm}
        </mark>,
      );
    }
  });

  return <>{nodes}</>;
}

function linkify(text: string, anchors: Anchor[], keyPrefix: string) {
  if (!text) return null;
  const masked = maskConfirms(text);
  const hits: { index: number; anchor: Anchor }[] = [];
  for (const anchor of anchors) {
    const index = masked.toLowerCase().indexOf(anchor.phrase.toLowerCase());
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
  const parts = [post.answer, post.cta];
  for (const block of BLOCKS) {
    parts.push(block.h, ...block.p, ...(block.list ?? []), ...(block.after ?? []));
  }
  for (const item of post.faq) parts.push(item.q, item.a);
  return parts
    .join(" ")
    .replace(confirmPattern(), "")
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

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
    "@type": ["BlogPosting", "Article"],
    headline: GUIDE.headline,
    alternativeHeadline: GUIDE.title,
    description: GUIDE.description,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${GUIDE.image}`,
      width: 1280,
      height: 1920,
      caption: GUIDE.imageAlt,
    },
    author: {
      "@type": "Organization",
      name: "WSI Cleaning",
      url: `${SITE_URL}/`,
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

export default function CommercialBuildingWashingGuide() {
  const pageSchema = graph(
    articleSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides/" },
      {
        name: "Commercial building washing Brisbane",
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
              Planning guide · Brisbane
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

        <div className="guide-copy">
          <section className="content-section guide-section">
            <span id="quick-answer" />
            <QuickAnswer>
              <RichText id="answer" text={post.answer} />
            </QuickAnswer>
            <GuideToc items={TOC} />
          </section>

          {BLOCKS.map((block, index) => (
            <section
              key={block.h}
              className="content-section guide-section"
            >
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
              {block.h === "What happens to the wash water?" ? (
                <figure className="guide-figure">
                  <Image
                    src={WASH_IMAGE.src}
                    alt={WASH_IMAGE.alt}
                    width={WASH_IMAGE.width}
                    height={WASH_IMAGE.height}
                    sizes="(max-width: 860px) 100vw, 820px"
                  />
                </figure>
              ) : null}
              {block.h === "How a WSI Cleaning commercial job runs" ? (
                <figure className="guide-figure">
                  <Image
                    src={JOB_IMAGE.src}
                    alt={JOB_IMAGE.alt}
                    width={JOB_IMAGE.width}
                    height={JOB_IMAGE.height}
                    sizes="(max-width: 860px) 100vw, 820px"
                  />
                </figure>
              ) : null}
            </section>
          ))}

          <section className="content-section guide-section">
            <Callout>
              <RichText id="cta" text={post.cta} />
            </Callout>
          </section>

          <AuthorCard />

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
