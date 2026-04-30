import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import {
  graph,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo/schema";
import { site, SITE_URL } from "@/lib/site";

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
    default:
      "WSI Cleaning — Premium Exterior Cleaning Brisbane & Sunshine Coast",
    template: "%s | WSI Cleaning",
  },
  description: `Brisbane's exterior cleaning specialists since ${site.foundingYear}. Pressure washing, soft-wash house cleaning, roof, gutter, window, solar, strata and commercial — ${site.insuranceLabel.toLowerCase()}, ${site.rating}/5 from ${site.reviewCount} Google reviews, fixed quotes in 24 hours.`,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Cleaning Services",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "WSI Cleaning — Premium Exterior Cleaning Brisbane & Sunshine Coast",
    description:
      "Pressure washing, house washing, roof and gutter cleaning across South East Queensland. $20M insured. 162 five-star Google reviews. Fixed quotes in 24 hours.",
    url: SITE_URL,
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
    description: `${site.rating}/5 from ${site.reviewCount} Google reviews · ${site.insuranceLabel} · Brisbane, Sunshine Coast`,
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
        <JsonLd data={globalSchema} />
        {children}
      </body>
    </html>
  );
}
