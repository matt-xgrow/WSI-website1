import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { CONTENT_UPDATED, locations, services, SITE_URL } from "@/lib/site";

function url(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: url("/"),
    lastModified: CONTENT_UPDATED.home,
    changeFrequency: "weekly",
    priority: 1,
  };

  const pages: MetadataRoute.Sitemap = [
    { path: "/about-us/", updated: CONTENT_UPDATED.about, freq: "monthly" as const, priority: 0.7 },
    { path: "/contact/", updated: CONTENT_UPDATED.about, freq: "monthly" as const, priority: 0.6 },
    { path: "/guides/", updated: CONTENT_UPDATED.guides, freq: "weekly" as const, priority: 0.8 },
    { path: "/gallery/", updated: CONTENT_UPDATED.gallery, freq: "monthly" as const, priority: 0.5 },
    { path: "/privacy-policy/", updated: CONTENT_UPDATED.about, freq: "yearly" as const, priority: 0.2 },
    { path: "/terms/", updated: CONTENT_UPDATED.about, freq: "yearly" as const, priority: 0.2 },
  ].map((page) => ({
    url: url(page.path),
    lastModified: page.updated,
    changeFrequency: page.freq,
    priority: page.priority,
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: url(`/guides/${guide.slug}/`),
    lastModified: guide.updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: url(`/${service.slug}/`),
    lastModified: CONTENT_UPDATED.services,
    changeFrequency: "monthly" as const,
    priority:
      service.slug === "house-washing" || service.slug === "pressure-washing"
        ? 0.9
        : 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: url(`/${location.slug}/`),
    lastModified: CONTENT_UPDATED.locations,
    changeFrequency: "monthly" as const,
    priority: location.slug === "brisbane" ? 0.9 : 0.7,
  }));

  return [home, ...servicePages, ...locationPages, ...pages, ...guides];
}
