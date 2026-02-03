import HeaderNew from "@/components/HeaderNew";
import HeroNew from "@/components/HeroNew";
import ServiceDetails from "@/components/ServiceDetails";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectGallery from "@/components/ProjectGallery";
import AboutOwner from "@/components/AboutOwner";
import TrustSection from "@/components/TrustSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import FooterNew from "@/components/FooterNew";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeaderNew />
      <HeroNew />
      <ServicesGrid />
      <ServiceDetails />
      <ProjectGallery />
      <AboutOwner />
      <TrustSection />
      <ServiceAreaSection />
      <FooterNew />
    </div>
  );
};

export default Index;
