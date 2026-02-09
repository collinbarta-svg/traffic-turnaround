import { ArrowRight, Snowflake, TreeDeciduous, Leaf, Sprout, Droplets, Trees, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: TreeDeciduous,
    title: "Lawn Mowing",
    slug: "lawn-mowing",
    description: "Professional mowing with attention to detail—clean edges, proper trimming, and debris cleared. Same team every visit.",
    highlights: ["Mowing & edging", "String trimming", "Debris cleanup"],
  },
  {
    icon: Leaf,
    title: "Dethatching",
    slug: "dethatching",
    description: "Remove harmful thatch buildup that chokes your lawn. Complete waste removal and disposal included.",
    highlights: ["Thatch removal", "Waste hauled away", "Proper disposal"],
  },
  {
    icon: Droplets,
    title: "Aerating",
    slug: "aerating",
    description: "Core aeration to improve soil health, water absorption, and root growth for a stronger lawn.",
    highlights: ["Core aeration", "Better drainage", "Healthier roots"],
  },
  {
    icon: Sprout,
    title: "Fertilizer & Weed Control",
    slug: "fertilizer-weed-control",
    description: "Four seasonal treatments designed for Minnesota lawns. Balanced nutrition and targeted weed prevention.",
    highlights: ["4 treatments/season", "Weed prevention", "Lawn nutrition"],
  },
  {
    icon: Snowflake,
    title: "Snow Plowing",
    slug: "snow-plowing",
    description: "Reliable snow removal with hand-cleared edges, walkways, and steps. Salt & sand applied as needed for safety.",
    highlights: ["Driveway plowing", "Hand shoveling", "Salt & sand"],
  },
  {
    icon: Trees,
    title: "Brush Cleanup",
    slug: null,
    description: "Professional brush and debris removal for your property. Contact us for a custom quote based on your specific needs.",
    highlights: ["Brush removal", "Debris hauling", "Custom pricing"],
  },
];

const ServicesGrid = () => {
  const navigate = useNavigate();

  const handleServiceClick = (slug: string | null) => {
    if (slug) {
      navigate(`/estimate?service=${slug}`);
    } else {
      navigate('/estimate');
    }
  };

  return (
    <section id="services" className="py-12 sm:py-20 md:py-28 hero-gradient text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Our Services
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Year-Round Property Care
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 px-2">
            From spring lawn care through winter snow removal, we provide consistent, 
            quality service with careful attention to detail on every property.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group p-4 sm:p-6 transition-all duration-300 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 cursor-pointer hover:bg-primary-foreground/15"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleServiceClick(service.slug)}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <service.icon className="w-5 sm:w-6 h-5 sm:h-6 text-secondary" />
              </div>
              
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-primary-foreground mb-1.5 sm:mb-2">
                {service.title}
              </h3>
              <p className="text-primary-foreground/70 mb-3 sm:mb-4 text-xs sm:text-sm">
                {service.description}
              </p>
              
              <ul className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/70">
                    <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-secondary flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-primary-foreground/20">
                <span className="text-sm font-medium text-secondary">Book This Service</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </div>
            </Card>
          ))}
        </div>


        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto" asChild>
            <a href="/estimate">
              Get Your Estimate
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
