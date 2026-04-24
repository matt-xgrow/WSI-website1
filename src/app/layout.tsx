import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WSI Cleaning — Premium Exterior Cleaning Brisbane, Sunshine Coast & Gold Coast",
    template: "%s | WSI Cleaning",
  },
  description:
    "Brisbane's most-reviewed exterior cleaning team. Pressure washing, soft-wash house cleaning, roof cleaning, gutters, windows and commercial strata — $20M insured, 100+ five-star reviews, fixed quotes in 24 hours.",
  keywords: [
    "pressure cleaning Brisbane",
    "house washing Gold Coast",
    "roof cleaning Queensland",
    "gutter cleaning Gold Coast",
    "exterior cleaning Sunshine Coast",
    "soft wash Brisbane",
    "commercial pressure washing",
    "strata cleaning",
  ],
  openGraph: {
    title: "WSI Cleaning — Premium Exterior Cleaning Services",
    description:
      "Pressure washing, house washing, roof and gutter cleaning across Queensland. $20M insured. 100+ five-star reviews. Fixed quotes in 24 hours.",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/house-wash.jpg",
        width: 1600,
        height: 1200,
        alt: "WSI Cleaning — house wash job in Brisbane",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  alternates: {
    canonical: site.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
