import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // --- Service + city pages (old site) → new service pages ---
      // Brisbane services
      { source: "/pressure-washing-brisbane", destination: "/services/pressure-washing", permanent: true },
      { source: "/commercial-pressure-washing-brisbane", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/strata-cleaning-brisbane", destination: "/services/strata-cleaning", permanent: true },
      { source: "/gutter-cleaning-brisbane-benefits", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning-brisbane-3", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/driveway-cleaning-brisbane", destination: "/services/driveway-cleaning", permanent: true },
      { source: "/window-cleaning-brisbane", destination: "/services/window-cleaning", permanent: true },
      { source: "/house-washing-services-brisbane", destination: "/services/house-washing", permanent: true },
      { source: "/tennis-court-cleaning-brisbane", destination: "/services/pressure-washing", permanent: true },
      { source: "/pressure-washing-brisbane-solution", destination: "/services/pressure-washing", permanent: true },
      { source: "/pressure-washing-services-in-brisbane", destination: "/services/pressure-washing", permanent: true },
      { source: "/pressure-washing-services-brisbane-complete-exterior-cleaning-solutions", destination: "/services/pressure-washing", permanent: true },
      { source: "/concrete-render-cleaning", destination: "/services/house-washing", permanent: true },
      { source: "/pest-control-brisbane", destination: "/", permanent: true },

      // Gold Coast services (no longer serviced — redirect to generic service)
      { source: "/exterior-house-cleaning-gold-coast", destination: "/services/house-washing", permanent: true },
      { source: "/pressure-washing-gold-coast", destination: "/services/pressure-washing", permanent: true },
      { source: "/gutter-cleaning-gold-coast", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/window-cleaning-gold-coast", destination: "/services/window-cleaning", permanent: true },
      { source: "/strata-cleaning-gold-coast", destination: "/services/strata-cleaning", permanent: true },
      { source: "/commercial-pressure-washing-gold-coast", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/driveway-cleaning-gold-coast", destination: "/services/driveway-cleaning", permanent: true },
      { source: "/tennis-court-cleaning-gold-coast", destination: "/services/pressure-washing", permanent: true },
      { source: "/house-washing-gold-coast-australia-a-local-homeowners-guide", destination: "/services/house-washing", permanent: true },
      { source: "/pressure-washing-gold-coast-pros-and-cons-of-professional-vs-diy-pressure-washing", destination: "/services/pressure-washing", permanent: true },

      // Sydney services (no longer serviced — redirect to generic service)
      { source: "/pressure-washing-sydney", destination: "/services/pressure-washing", permanent: true },
      { source: "/commercial-pressure-washing-sydney", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/strata-cleaning-sydney", destination: "/services/strata-cleaning", permanent: true },
      { source: "/tennis-court-cleaning-sydney", destination: "/services/pressure-washing", permanent: true },

      // Sunshine Coast services
      { source: "/pressure-cleaning-sunshine-coast", destination: "/services/pressure-washing", permanent: true },
      { source: "/house-washing-sunshine-coast", destination: "/services/house-washing", permanent: true },
      { source: "/home-washing-in-sunshine-restore-your-homes-fresh-clean-look", destination: "/services/house-washing", permanent: true },

      // Generic service pages (no city)
      { source: "/gutter-cleaning", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/driveway-cleaning", destination: "/services/driveway-cleaning", permanent: true },
      { source: "/tennis-court-cleaning", destination: "/services/pressure-washing", permanent: true },
      { source: "/deck-patio-cleaning", destination: "/services/pressure-washing", permanent: true },
      { source: "/presale-property-cleaning", destination: "/services/house-washing", permanent: true },
      { source: "/newbuild-property-cleaning", destination: "/services/house-washing", permanent: true },
      { source: "/professional-pest-control", destination: "/", permanent: true },

      // Old service paths
      { source: "/services/facades-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/roof-cleaning-2", destination: "/services/roof-cleaning", permanent: true },

      // Old location pages
      { source: "/locations/gold-coast", destination: "/", permanent: true },
      { source: "/locations", destination: "/", permanent: true },

      // Blog posts → closest relevant page
      { source: "/gutter-cleaning-in-brisbane-why-its-essential-for-every-home", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning-peregian-springs-professional-roof-gutter-cleaning", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/choosing-right-strata-cleaning-company-in-brisbane", destination: "/services/strata-cleaning", permanent: true },
      { source: "/wizz-pressure-cleaning-vs-wsi-pressure-cleaning-who-is-best-for-pressure-cleaning-brisbane", destination: "/services/pressure-washing", permanent: true },
      { source: "/professional-cleaning-a-guide-to-choosing-the-right-pressure-washing-company", destination: "/guides/soft-wash-vs-pressure-wash", permanent: true },
      { source: "/top-rated-commercial-cleaning-companies-near-me", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/wsi-cleaning-blog", destination: "/", permanent: true },
      { source: "/privacy-policy", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
