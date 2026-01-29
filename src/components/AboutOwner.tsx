import { Shield, Clock, Award, ThumbsUp, MapPin, Phone, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed contractor with comprehensive liability coverage for complete peace of mind on every project.",
  },
  {
    icon: Clock,
    title: "24 Years Experience",
    description: "Nearly three decades of hands-on experience serving the West Metro community with reliable, quality work.",
  },
  {
    icon: User,
    title: "Owner-Operated",
    description: "Direct communication with the person doing the work. No call centers, no middlemen, no runaround.",
  },
  {
    icon: ThumbsUp,
    title: "Work Confirmed First",
    description: "No work is ever performed without your explicit approval. Every estimate is reviewed with you on-site.",
  },
];

const AboutOwner = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
              About Your Contractor
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              A Local, Private Contractor<br />
              <span className="text-gradient">You Can Trust</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm James, a private, licensed and insured contractor providing quality outdoor 
              property maintenance to homeowners and businesses throughout the West Metro area. 
              Based right here in St. Michael, I've spent the past 24 years building lasting 
              relationships with property owners who value reliability, attention to detail, 
              and honest communication.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Unlike large national franchises that rotate crews and prioritize volume, I take 
              a hands-on approach to every property I service. When you call, you're talking 
              directly to me—the person who actually does the work. This means consistent 
              results, personalized service, and someone who knows your property inside and out.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you need help keeping the lawn pristine during summer or the snow 
              cleared safely during winter, I take pride in making properties look and feel 
              better through detail-oriented work and direct customer communication.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-secondary-foreground">J</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-foreground">James</div>
                  <div className="text-sm text-muted-foreground">Owner & Operator</div>
                </div>
              </div>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:612-298-5590">
                  <Phone className="w-4 h-4 mr-2" />
                  612-298-5590
                </a>
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 bg-background border-border hover:border-secondary/30 transition-colors"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
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
