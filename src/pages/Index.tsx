import HeaderNew from "@/components/HeaderNew";
import HeroNew from "@/components/HeroNew";
import HowItWorks from "@/components/HowItWorks";
import ServiceEstimator from "@/components/ServiceEstimator";
import ServicesGrid from "@/components/ServicesGrid";
import TrustSection from "@/components/TrustSection";
import FooterNew from "@/components/FooterNew";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeaderNew />
      <HeroNew />
      <HowItWorks />
      <ServiceEstimator />
      <ServicesGrid />
      <TrustSection />
      <FooterNew />
    </div>
  );
};

export default Index;
