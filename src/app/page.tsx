import { BeforeAfter } from "@/components/site/before-after";
import { FAQ } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Nav } from "@/components/site/nav";
import { Process } from "@/components/site/process";
import { QuoteSection } from "@/components/site/quote-section";
import { Reviews } from "@/components/site/reviews";
import { ServiceAreas } from "@/components/site/service-areas";
import { ServicesSection } from "@/components/site/services-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { WhyUs } from "@/components/site/why-us";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema, graph } from "@/lib/seo/schema";

export default function Home() {
  const homeSchema = graph(faqPageSchema());

  return (
    <>
      <JsonLd data={homeSchema} />
      <div className="accent-cyan density-regular hero-split">
        <TopBar />
        <Nav />
        <Hero />
        <Marquee />
        <ServicesSection />
        <BeforeAfter />
        <WhyUs />
        <ServiceAreas />
        <Process />
        <Reviews />
        <FAQ />
        <QuoteSection />
        <Footer />
        <StickyCTA />
      </div>
    </>
  );
}
