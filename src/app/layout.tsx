import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { GtmNoScript, TrackingScripts } from "@/components/analytics/tracking-scripts";
import { TrackingEvents } from "@/components/analytics/tracking-events";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { BASELINE_META } from "@/lib/seo/baseline-meta";
import {
  graph,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo/schema";
import { site, SITE_URL } from "@/lib/site";

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const homeMeta = BASELINE_META["/"];

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F2A66",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeMeta.title,
    template: "%s | WSI Cleaning",
  },
  description: homeMeta.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Cleaning Services",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "TIm6oNA-_X5XqEUOLnBjYqJsBrpqJEHKYlGWrw5xHF4",
  },
  openGraph: {
    title: homeMeta.title,
    description: homeMeta.description,
    url: `${SITE_URL}/`,
    siteName: site.name,
    images: [
      {
        url: "/images/house-wash.jpg",
        width: 1600,
        height: 1200,
        alt: "WSI Cleaning crew soft-washing a Queenslander home in Brisbane",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WSI Cleaning — Exterior Cleaning Brisbane",
    description: `${site.rating}/5 from ${site.reviewCount} Google reviews \u00b7 ${site.insuranceLabel} \u00b7 Brisbane, Sunshine Coast`,
    images: ["/images/house-wash.jpg"],
  },
  formatDetection: {
    telephone: true,
    address: false,
    email: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSchema = graph(
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema()
  );

  return (
    <html
      lang="en-AU"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <GtmNoScript />
        <JsonLd data={globalSchema} />
        <TrackingEvents />
        {children}
        <WhatsAppButton />
        <SpeedInsights />
        <TrackingScripts />
      </body>
      {clarityProjectId ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
          `}
        </Script>
      ) : null}
    </html>
  );
}
