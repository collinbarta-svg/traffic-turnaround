import { Shield, Clock, Users, ThumbsUp, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed company with comprehensive liability coverage for complete peace of mind on every project.",
  },
  {
    icon: Clock,
    title: "24 Years Experience",
    description: "Nearly three decades of hands-on experience serving local property owners with reliable, quality work.",
  },
  {
    icon: Users,
    title: "Family-Owned",
    description: "Direct communication with the people doing the work. No call centers, no middlemen, no runaround.",
  },
  {
    icon: ThumbsUp,
    title: "Work Confirmed First",
    description: "No work is ever performed without your explicit approval. Every estimate is reviewed with you on-site.",
  },
];

const AboutOwner = () => {
  return (
    <section id="about" className="py-12 sm:py-20 md:py-28 hero-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div>
            
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6">
              A Family-Owned Business<br />
              <span className="text-secondary">You Can Trust</span>
            </h2>
            <p className="text-base sm:text-lg text-primary-foreground/80 mb-4 sm:mb-6">
              We're a family-owned, licensed and insured company providing quality outdoor 
              property maintenance to homeowners and businesses in our local community. 
              Based right here in St. Michael, we've spent the past 24 years building lasting 
              relationships with property owners who value reliability, attention to detail, 
              and honest communication.
            </p>
            <p className="text-base sm:text-lg text-primary-foreground/80 mb-4 sm:mb-6">
              We take a hands-on approach to every property we service. When you call, 
              you're talking directly to the people who actually do the work. This means consistent
              results, personalized service, and someone who knows your property inside and out.
            </p>
            <p className="text-base sm:text-lg text-primary-foreground/80 mb-6 sm:mb-8">
              Whether you need help keeping the lawn pristine during summer or the snow 
              cleared safely during winter, we take pride in making properties look and feel 
              better through detail-oriented work and direct customer communication. We personally 
              review every job to ensure it meets our standards.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-secondary-foreground">MO</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-primary-foreground text-sm sm:text-base">Mason Outdoor Service LLC</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/70">Family-Owned & Operated</div>
                </div>
              </div>
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" asChild>
                <a href="tel:612-298-5590">
                  <Phone className="w-4 h-4 mr-2" />
                  612-298-5590
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOwner;
