import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { CONTENT_UPDATED, locations, services, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: CONTENT_UPDATED.home,
    changeFrequency: "weekly",
    priority: 1,
  };

  const about: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/about`,
    lastModified: CONTENT_UPDATED.about,
    changeFrequency: "monthly",
    priority: 0.7,
  };

  const guidesIndex: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/guides`,
    lastModified: CONTENT_UPDATED.guides,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: g.updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const gallery: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/gallery`,
    lastModified: CONTENT_UPDATED.gallery,
    changeFrequency: "monthly",
    priority: 0.5,
  };

  const privacy: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/privacy`,
    lastModified: CONTENT_UPDATED.about,
    changeFrequency: "yearly",
    priority: 0.2,
  };

  const terms: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/terms`,
    lastModified: CONTENT_UPDATED.about,
    changeFrequency: "yearly",
    priority: 0.2,
  };

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: CONTENT_UPDATED.services,
    changeFrequency: "monthly" as const,
    priority:
      service.slug === "house-washing" || service.slug === "pressure-washing"
        ? 0.9
        : 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${SITE_URL}/locations/${location.slug}`,
    lastModified: CONTENT_UPDATED.locations,
    changeFrequency: "monthly" as const,
    priority: location.slug === "brisbane" ? 0.9 : 0.7,
  }));

  const serviceLocationPages: MetadataRoute.Sitemap = services.flatMap(
    (service) =>
      locations.map((location) => ({
        url: `${SITE_URL}/services/${service.slug}/${location.slug}`,
        lastModified: CONTENT_UPDATED.services,
        changeFrequency: "monthly" as const,
        priority: location.slug === "brisbane" ? 0.8 : 0.7,
      })),
  );

  return [
    home,
    about,
    guidesIndex,
    ...guides,
    gallery,
    ...servicePages,
    ...locationPages,
    ...serviceLocationPages,
    privacy,
    terms,
  ];
}
