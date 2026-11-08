import { JobGallery } from "@/components/site/job-gallery";
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
import { breadcrumbSchema, faqPageSchema, graph } from "@/lib/seo/schema";

export default function Home() {
  const homeSchema = graph(
    breadcrumbSchema([{ name: "Home", url: "/" }]),
    faqPageSchema(),
  );

  return (
    <>
      <JsonLd data={homeSchema} />
      <div className="accent-cyan density-regular hero-split">
        <TopBar />
        <Nav />
        <Hero />
        <Marquee />
        <div className="band-tint">
          <ServicesSection />
        </div>
        <section className="content-section">
          <h2>
            Your home deserves the best residential exterior cleaning in Brisbane
          </h2>
          <p>
            Your home deserves to look its best with professional residential exterior cleaning Brisbane services from WSI Cleaning. Since 2014, we’ve helped Greater Brisbane homeowners refresh and protect their properties with expert soft washing, pressure cleaning, window polishing, gutter cleaning and roof restoration. With $20m public liability insurance, a 4.9 rating on Google and over 12 years of local experience, you can trust our team to deliver reliable, high-quality results every time.
          </p>
          <h2>Professional residential exterior cleaning Brisbane services</h2>
          <p>
            Keep your home looking its best with WSI Cleaning’s professional residential exterior cleaning Brisbane services. We remove dirt, mould, algae, grime, and stains from walls, driveways, roofs, patios, fences, and other outdoor surfaces using safe, effective cleaning methods. Our experienced team delivers reliable results that enhance your property’s appearance, protect exterior surfaces, and improve curb appeal. Trust WSI Cleaning for affordable, high-quality residential exterior cleaning services tailored to Greater Brisbane homes.
          </p>
        </section>
        <JobGallery />
        <WhyUs />
        <div className="band-tint">
          <ServiceAreas />
        </div>
        <Process />
        <div className="band-tint">
          <Reviews />
        </div>
        <FAQ />
        <QuoteSection />
        <Footer />
        <StickyCTA />
      </div>
    </>
  );
}
