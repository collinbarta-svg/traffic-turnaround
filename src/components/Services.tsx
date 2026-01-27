import { Snowflake, TreeDeciduous, Flower2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import snowPlowingImg from "@/assets/snow-plowing.jpg";
import lawnCareImg from "@/assets/lawn-care.jpg";
import landscapingImg from "@/assets/landscaping.jpg";

const services = [
  {
    icon: Snowflake,
    title: "Snow Plowing & Ice Control",
    description: "Reliable snow removal for driveways, parking lots, and walkways. We keep your property safe and accessible during winter storms.",
    image: snowPlowingImg,
    features: ["24/7 Emergency Service", "Ice Control & Salting", "Commercial & Residential"],
  },
  {
    icon: TreeDeciduous,
    title: "Lawn Care Services",
    description: "Complete lawn maintenance including mowing, trimming, fertilizing, aeration, and seasonal cleanups to keep your lawn pristine.",
    image: lawnCareImg,
    features: ["Weekly Maintenance", "Fertilizing & Weed Control", "Spring & Fall Cleanup"],
  },
  {
    icon: Flower2,
    title: "Landscaping Services",
    description: "Transform your outdoor space with professional landscaping, mulch installation, shrub pruning, and garden maintenance.",
    image: landscapingImg,
    features: ["Mulch Installation", "Plant & Shrub Pruning", "Rock Bed Cleanup"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 section-gradient">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Our Services
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Year-Round Property Maintenance
          </h2>
          <p className="text-lg text-muted-foreground">
            From harsh Minnesota winters to beautiful summers, we provide comprehensive 
            outdoor services to keep your property in top condition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-xl overflow-hidden card-elevated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 p-3 bg-primary rounded-lg">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <a href="#contact">
                    Get Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
