import type { MetadataRoute } from "next";
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

  const guides: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/guides/soft-wash-vs-pressure-wash`,
      lastModified: CONTENT_UPDATED.guides,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  const gallery: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/gallery`,
    lastModified: CONTENT_UPDATED.gallery,
    changeFrequency: "monthly",
    priority: 0.5,
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

  return [home, about, ...guides, gallery, ...servicePages, ...locationPages];
}
