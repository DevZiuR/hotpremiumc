import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProblemGrid } from "@/components/sections/ProblemGrid";
import { IndustriesWeServe } from "@/components/sections/IndustriesWeServe";
import { GlobalCoverage } from "@/components/sections/GlobalCoverage";
import { AboutMax } from "@/components/sections/AboutMax";
import { Testimonials } from "@/components/sections/Testimonials";
import { ComplianceStandards } from "@/components/sections/ComplianceStandards";
import { FAQSection } from "@/components/sections/FAQSection";
import { PartnerPortfolioCTA } from "@/components/sections/PartnerPortfolioCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <Hero />
        <AboutSection />
        {/* <HowItWorks /> */}
        <ProblemGrid />
        <IndustriesWeServe />
        <GlobalCoverage />
        <AboutMax />
        {/* PLACEHOLDER TESTIMONIALS, replace with real quotes before launch */}
        <Testimonials />
        <ComplianceStandards />
        <FAQSection />
        <PartnerPortfolioCTA />
      </main>
      <Footer />
    </>
  );
}
