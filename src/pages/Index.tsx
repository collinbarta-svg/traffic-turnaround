import HeroNew from "@/components/HeroNew";
import ServicesGrid from "@/components/ServicesGrid";
import PricingSection from "@/components/PricingSection";
import SodShowcase from "@/components/SodShowcase";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ProjectGallery from "@/components/ProjectGallery";
import AboutOwner from "@/components/AboutOwner";
import TrustSection from "@/components/TrustSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import FooterNew from "@/components/FooterNew";

const Index = () => {
  return (
    <div className="min-h-screen">
      
      <HeroNew />
      <ServicesGrid />
      <PricingSection />
      <SodShowcase />
      <BeforeAfterSection />
      <ProjectGallery />
      <AboutOwner />
      <TrustSection />
      <ServiceAreaSection />
      <FooterNew />
    </div>
  );
};

export default Index;
