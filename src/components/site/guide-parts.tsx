import Link from "next/link";
import type { ReactNode } from "react";
import { GUIDES, type Guide, getRelatedGuides } from "@/lib/guides";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(iso: string) {
  return DATE_FORMATTER.format(new Date(`${iso}T00:00:00`));
}

export function GuideMeta({
  guide,
}: {
  guide: Pick<Guide, "updated" | "readingMinutes" | "region" | "categoryLabel">;
}) {
  return (
    <div className="guide-meta">
      <time dateTime={guide.updated} className="guide-meta-updated">
        Updated {formatDate(guide.updated)}
      </time>
      <span className="guide-meta-dot" aria-hidden="true">
        ·
      </span>
      <span>{guide.readingMinutes} min read</span>
      <span className="guide-meta-dot" aria-hidden="true">
        ·
      </span>
      <span>{guide.region}</span>
      <span className="guide-meta-dot" aria-hidden="true">
        ·
      </span>
      <span>{guide.categoryLabel}</span>
    </div>
  );
}

export function QuickAnswer({ children }: { children: ReactNode }) {
  return (
    <aside className="tldr-box" aria-label="Quick answer">
      <p className="tldr-label">Quick answer</p>
      <p>{children}</p>
    </aside>
  );
}

export function KeyFacts({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <ul className="key-facts">
      {items.map((item) => (
        <li key={item.label}>
          <span className="key-label">{item.label}</span>
          <span className="key-value">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="callout">
      {title && <span className="callout-title">{title}</span>}
      <p>{children}</p>
    </div>
  );
}

export function AuthorCard() {
  return (
    <aside className="author-card" aria-label="About the author">
      <span className="author-card-avatar" aria-hidden="true">
        W
      </span>
      <div className="author-card-body">
        <p className="author-card-name">The WSI Cleaning crew</p>
        <p className="author-card-role">
          Brisbane &amp; Sunshine Coast exterior cleaning specialists
        </p>
        <p className="author-card-bio">
          Operating since 2014 — 12+ years of soft washing, pressure cleaning
          and window care on South East Queensland properties. $20M public
          liability insured, ABN-registered, 4.9/5 from 162 Google reviews.
          Every guide on this site is written from jobs we&rsquo;ve actually done,
          not from generic templates.
        </p>
      </div>
    </aside>
  );
}

export function GuideToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc-title">On this page</p>
      <ol className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`#${item.id}`}>{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function RelatedGuides({ slug }: { slug: string }) {
  const related = getRelatedGuides(slug, 3);
  if (!related.length) return null;

  return (
    <section className="content-section">
      <span className="eyebrow">
        <span className="eyebrow-line" />
        Read next
      </span>
      <h2>More guides for South East Queensland properties.</h2>
      <ul className="suburb-list">
        {related.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`}>
              {g.categoryLabel}: {g.headline.replace(/[.?]$/, "")} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function articleSchemaFor({
  guide,
  pageUrl,
  siteUrl,
}: {
  guide: Guide;
  pageUrl: string;
  siteUrl: string;
}) {
  return {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: guide.title,
    alternativeHeadline: guide.headline,
    description: guide.description,
    url: pageUrl,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: "en-AU",
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    image: guide.image.startsWith("http")
      ? guide.image
      : `${siteUrl}${guide.image}`,
    about: { "@id": `${siteUrl}/#business` },
    articleSection: guide.categoryLabel,
    wordCount: guide.readingMinutes * 230,
  };
}

export function allGuides(): Guide[] {
  return GUIDES;
}
