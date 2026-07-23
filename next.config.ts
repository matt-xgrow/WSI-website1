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
      // --- Service + city pages (old site) → new service × city pages ---
      // Brisbane services
      { source: "/pressure-washing-brisbane", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/commercial-pressure-washing-brisbane", destination: "/services/commercial-cleaning/brisbane", permanent: true },
      { source: "/strata-cleaning-brisbane", destination: "/services/strata-cleaning/brisbane", permanent: true },
      { source: "/gutter-cleaning-brisbane-benefits", destination: "/services/gutter-cleaning/brisbane", permanent: true },
      { source: "/gutter-cleaning-brisbane-3", destination: "/services/gutter-cleaning/brisbane", permanent: true },
      { source: "/driveway-cleaning-brisbane", destination: "/services/driveway-cleaning/brisbane", permanent: true },
      { source: "/window-cleaning-brisbane", destination: "/services/window-cleaning/brisbane", permanent: true },
      { source: "/house-washing-brisbane", destination: "/services/house-washing/brisbane", permanent: true },
      { source: "/roof-cleaning-brisbane", destination: "/services/roof-cleaning/brisbane", permanent: true },
      { source: "/solar-panel-cleaning-brisbane", destination: "/services/solar-panel-cleaning/brisbane", permanent: true },
      { source: "/gutter-cleaning-brisbane", destination: "/services/gutter-cleaning/brisbane", permanent: true },
      { source: "/house-washing-services-brisbane", destination: "/services/house-washing/brisbane", permanent: true },
      { source: "/tennis-court-cleaning-brisbane", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/pressure-washing-brisbane-solution", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/pressure-washing-services-in-brisbane", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/pressure-washing-services-brisbane-complete-exterior-cleaning-solutions", destination: "/services/pressure-washing/brisbane", permanent: true },
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
      { source: "/pressure-cleaning-sunshine-coast", destination: "/services/pressure-washing/sunshine-coast", permanent: true },
      { source: "/house-washing-sunshine-coast", destination: "/services/house-washing/sunshine-coast", permanent: true },
      { source: "/home-washing-in-sunshine-restore-your-homes-fresh-clean-look", destination: "/services/house-washing/sunshine-coast", permanent: true },

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
      { source: "/gutter-cleaning-in-brisbane-why-its-essential-for-every-home", destination: "/services/gutter-cleaning/brisbane", permanent: true },
      { source: "/gutter-cleaning-peregian-springs-professional-roof-gutter-cleaning", destination: "/services/gutter-cleaning/sunshine-coast", permanent: true },
      { source: "/choosing-right-strata-cleaning-company-in-brisbane", destination: "/services/strata-cleaning/brisbane", permanent: true },
      { source: "/wizz-pressure-cleaning-vs-wsi-pressure-cleaning-who-is-best-for-pressure-cleaning-brisbane", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/professional-cleaning-a-guide-to-choosing-the-right-pressure-washing-company", destination: "/guides/soft-wash-vs-pressure-wash", permanent: true },
      { source: "/top-rated-commercial-cleaning-companies-near-me", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/wsi-cleaning-blog", destination: "/", permanent: true },
      { source: "/privacy-policy", destination: "/", permanent: true },

      // ============================================================
      // Legacy WordPress URLs recovered from web-archive history
      // (2026-07-23 migration audit — old URLs still returning 404).
      // Specific rules first; wildcard archive fallbacks at the end.
      // ============================================================

      // --- Legacy blog posts → closest service / guide ---
      { source: "/5-tips-for-hiring-a-professional-pressure-washing-service-in-brisbane-and-gold-coast", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/discover-the-best-pressure-washing-services-in-brisbane-and-gold-coast", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/ditch-the-diy-why-hiring-a-professional-pressure-washing-company-is-the-smarter-choice", destination: "/services/pressure-washing", permanent: true },
      { source: "/importance-of-pressure-washing-for-homes", destination: "/services/pressure-washing", permanent: true },
      { source: "/preparing-your-home-for-professional-pressure-cleaning", destination: "/services/pressure-washing", permanent: true },
      { source: "/tips-for-diy-pressure-cleaning", destination: "/services/pressure-washing", permanent: true },
      { source: "/types-pressure-washing-brisbane", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/the-art-of-restoration-exploring-gold-coasts-pressure-cleaning-renaissance", destination: "/services/pressure-washing", permanent: true },
      { source: "/pressure-washing-gold-coast-a-necessity-for-commercial-properties", destination: "/services/pressure-washing", permanent: true },
      { source: "/diy-concrete-sealing-step-by-step-guide", destination: "/services/driveway-cleaning", permanent: true },
      { source: "/clean-solar-panels-for-maximum-efficiency-in-gold-coast", destination: "/services/solar-panel-cleaning", permanent: true },
      { source: "/maximizing-solar-efficiency-brisbane-gold-coast-panel-cleaning", destination: "/services/solar-panel-cleaning", permanent: true },
      { source: "/gutter-cleaning-brisbane-danger-of-diy", destination: "/services/gutter-cleaning/brisbane", permanent: true },
      { source: "/hiring-a-gutter-cleaning-service-in-brisbane", destination: "/services/gutter-cleaning/brisbane", permanent: true },
      { source: "/the-best-time-of-year-to-schedule-gutter-cleaning-in-brisbane", destination: "/services/gutter-cleaning/brisbane", permanent: true },
      { source: "/the-importance-of-preventing-gutter-clogs", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/house-washing-north-brisbane", destination: "/services/house-washing/brisbane", permanent: true },
      { source: "/professional-house-washing-services-in-brisbane", destination: "/services/house-washing/brisbane", permanent: true },
      { source: "/exterior-house-cleaning", destination: "/services/house-washing", permanent: true },
      { source: "/enhance-property-value-with-strata-cleaning", destination: "/services/strata-cleaning", permanent: true },
      { source: "/the-importance-of-regular-strata-cleaning-brisbane", destination: "/services/strata-cleaning/brisbane", permanent: true },
      { source: "/why-choose-wsi-cleaning-for-your-windows-in-brisbane-and-gold-coast", destination: "/services/window-cleaning/brisbane", permanent: true },
      { source: "/window-cleaning", destination: "/services/window-cleaning", permanent: true },
      { source: "/cooporate-pressure-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/commercial-building-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/office-cleaning-brisbane", destination: "/services/commercial-cleaning/brisbane", permanent: true },
      { source: "/office-cleaning-brisbane-service-transform-your-office-space", destination: "/services/commercial-cleaning/brisbane", permanent: true },
      { source: "/top-quality-office-cleaning-services-in-brisbane-qld-choose-the-best-with-wsi-cleaning", destination: "/services/commercial-cleaning/brisbane", permanent: true },
      { source: "/pest-control", destination: "/", permanent: true },
      { source: "/blog-wsi-external-cleaning-services", destination: "/guides", permanent: true },

      // --- Legacy commercial / janitorial service pages (no longer offered) ---
      { source: "/services/body-corporate-cleaning", destination: "/services/strata-cleaning", permanent: true },
      { source: "/services/concrete-sealing", destination: "/services/driveway-cleaning", permanent: true },
      { source: "/services/driveways-parking-cleaning", destination: "/services/driveway-cleaning", permanent: true },
      { source: "/services/soft-washing", destination: "/services/house-washing", permanent: true },
      { source: "/services/window-cleaning-3", destination: "/services/window-cleaning", permanent: true },
      { source: "/services/industrial-and-warehouse-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/corridor-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/dusting-wiping", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/fire-exits-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/garbage-removal", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/kitchen-and-pantry", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/lift-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/toilets-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/vacuuming-and-mopping", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/services/residential-pest-control", destination: "/", permanent: true },

      // --- Legacy WordPress service-category archives ---
      { source: "/service-category/house-washing", destination: "/services/house-washing", permanent: true },
      { source: "/service-category/pressure-washing", destination: "/services/pressure-washing", permanent: true },
      { source: "/service-category/strata-cleaning", destination: "/services/strata-cleaning", permanent: true },
      { source: "/service-category/commercial", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/service-category/office-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/service-category/residential", destination: "/", permanent: true },

      // --- Legacy WordPress blog category archives ---
      { source: "/category/house-washing-brisbane/pressure-washing-brisbane", destination: "/services/pressure-washing/brisbane", permanent: true },
      { source: "/category/house-washing-brisbane", destination: "/services/house-washing/brisbane", permanent: true },
      { source: "/category/house-washing-gold-coast/pressure-washing-gold-coast", destination: "/services/pressure-washing", permanent: true },
      { source: "/category/house-washing-gold-coast", destination: "/services/house-washing", permanent: true },
      { source: "/category/commercial-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/category/cleaning-tips", destination: "/guides", permanent: true },
      { source: "/category/diy-cleaning", destination: "/guides", permanent: true },

      // --- Legacy WordPress tag archives ---
      { source: "/tag/gutter-cleaning", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/tag/pressure-washing", destination: "/services/pressure-washing", permanent: true },
      { source: "/tag/solar-panel-cleaning", destination: "/services/solar-panel-cleaning", permanent: true },
      { source: "/tag/strata-cleaning", destination: "/services/strata-cleaning", permanent: true },
      { source: "/tag/concrete-sealing", destination: "/services/driveway-cleaning", permanent: true },
      { source: "/tag/office-cleaning", destination: "/services/commercial-cleaning", permanent: true },
      { source: "/tag/tips", destination: "/guides", permanent: true },

      // --- Legacy testimonial + thank-you pages ---
      { source: "/testimonials/kate-plokstys", destination: "/about", permanent: true },
      { source: "/testimonials/sarah-kelly", destination: "/about", permanent: true },
      { source: "/testimonials/stephanus-potgieter", destination: "/about", permanent: true },
      { source: "/testimonials/tais-sombini", destination: "/about", permanent: true },
      { source: "/thank-you-house-washing", destination: "/services/house-washing", permanent: true },
      { source: "/thank-you-strata-cleaning", destination: "/services/strata-cleaning", permanent: true },

      // --- Wildcard fallbacks for any legacy WP archive not mapped above ---
      { source: "/category/:path*", destination: "/guides", permanent: true },
      { source: "/tag/:path*", destination: "/guides", permanent: true },
      { source: "/service-category/:path*", destination: "/", permanent: true },
      { source: "/testimonials/:path*", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
