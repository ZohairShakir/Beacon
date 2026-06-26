import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { ReportSection } from "@/components/ReportSection";
import { WhyBeacon } from "@/components/WhyBeacon";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeJsonLd } from "@/lib/seo/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeatureCards />
        <ReportSection />
        <WhyBeacon />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
