import { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { TopBar } from "@/components/site/top-bar";
import { GalleryClient } from "@/components/site/gallery-client";

export const metadata: Metadata = {
  title: "Gallery | WSI Cleaning",
  description: "Explore our portfolio of exterior cleaning projects across Brisbane and Queensland, including house washing, pressure cleaning, and commercial maintenance.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main className="page-shell bg-[#fcfdfe]">
      <TopBar />
      <Nav />
      <GalleryClient />
      <QuoteSection />
      <Footer />
    </main>
  );
}
