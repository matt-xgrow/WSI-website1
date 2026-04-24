import type { MetadataRoute } from "next";
import { locations, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...locations.map((location) => ({
      url: `${site.url}/locations/${location.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: location.slug === "brisbane" ? 0.9 : 0.65,
    })),
  ];
}

