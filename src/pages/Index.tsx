import HeroNew from "@/components/HeroNew";
import ServicesGrid from "@/components/ServicesGrid";
import SeasonalServices from "@/components/SeasonalServices";
import SodShowcase from "@/components/SodShowcase";
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
      <SeasonalServices />
      <SodShowcase />
      <ProjectGallery />
      <AboutOwner />
      <TrustSection />
      <ServiceAreaSection />
      <FooterNew />
    </div>
  );
};

export default Index;
