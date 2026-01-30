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
    <section id="about" className="py-12 sm:py-20 md:py-28 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary/10 text-secondary text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
              About Us
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              A Family-Owned Business<br />
              <span className="text-gradient">You Can Trust</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              We're a family-owned, licensed and insured company providing quality outdoor 
              property maintenance to homeowners and businesses in our local community. 
              Based right here in St. Michael, we've spent the past 24 years building lasting 
              relationships with property owners who value reliability, attention to detail, 
              and honest communication.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              We take a hands-on approach to every property we service. When you call, 
              you're talking directly to the people who actually do the work. This means consistent
              results, personalized service, and someone who knows your property inside and out.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              Whether you need help keeping the lawn pristine during summer or the snow 
              cleared safely during winter, we take pride in making properties look and feel 
              better through detail-oriented work and direct customer communication. We personally 
              review every job to ensure it meets our standards.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-secondary-foreground">JP</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-foreground text-sm sm:text-base">JP Grounds & Snow</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Family-Owned & Operated</div>
                </div>
              </div>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <a href="tel:612-298-5590">
                  <Phone className="w-4 h-4 mr-2" />
                  612-298-5590
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-4 sm:p-6 bg-background border-border"
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="w-5 sm:w-6 h-5 sm:h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOwner;
