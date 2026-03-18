import { ArrowRight, Snowflake, TreeDeciduous, Leaf, Sprout, Droplets, Scissors, Phone, Flower2, Shovel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: TreeDeciduous,
    title: "Lawn Mowing",
    description: "Professional weekly lawn mowing services designed to keep your lawn clean, healthy, and well-maintained.",
    highlights: ["Clean cut", "Weekly service", "Well-maintained lawn"],
    slug: "lawn-mowing",
  },
  {
    icon: Leaf,
    title: "Spring Clean Up",
    description: "Removal of winter debris including leaves, twigs, branches, and garden bed clean up with perennial care.",
    highlights: ["Debris removal", "Garden bed cleaning", "Perennial care"],
    slug: "brush-yard-cleanup",
  },
  {
    icon: Leaf,
    title: "Fall / Leaf Clean Up",
    description: "Full leaf and debris removal to prevent lawn damage and prepare your yard for winter.",
    highlights: ["Leaf removal", "Lawn protection", "Winter prep"],
    slug: "brush-yard-cleanup",
  },
  {
    icon: Sprout,
    title: "Lawn Fertilizing & Weed Control",
    description: "Application of essential nutrients to promote thicker, greener grass while reducing weed growth.",
    highlights: ["Essential nutrients", "Weed reduction", "Greener grass"],
    slug: "fertilizer-weed-control",
  },
  {
    icon: Leaf,
    title: "Lawn Dethatching",
    description: "Removal of built-up organic matter to improve water, oxygen, and nutrient absorption.",
    highlights: ["Thatch removal", "Better absorption", "Healthier lawn"],
    slug: "dethatching",
  },
  {
    icon: Droplets,
    title: "Lawn Aeration",
    description: "Core plug aeration to relieve soil compaction and promote deeper root growth.",
    highlights: ["Core aeration", "Reduced compaction", "Deeper roots"],
    slug: "aerating",
  },
  {
    icon: Sprout,
    title: "Lawn Overseeding",
    description: "Filling in thin areas and improving turf density for a fuller, healthier lawn.",
    highlights: ["Fills thin areas", "Turf density", "Healthier lawn"],
    slug: null,
    isCallOnly: true,
  },
  {
    icon: Snowflake,
    title: "Snow Plowing & Ice Control",
    description: "Snow removal for driveways and walkways to maintain safe access during winter.",
    highlights: ["Driveway plowing", "Ice control", "Safe access"],
    slug: "snow-plowing",
  },
  {
    icon: Flower2,
    title: "Custom Landscaping Services",
    description: "Landscape gardening, plant & shrub pruning, tree trimming, rock bed clean up, and mulch installation. All custom services are estimated based on project size.",
    highlights: ["Landscaping & pruning", "Tree trimming", "Mulch & rock beds"],
    slug: null,
    isCallOnly: true,
  },
];

const ServicesGrid = () => {
  const navigate = useNavigate();

  const handleServiceClick = (slug: string | null, isCallOnly?: boolean) => {
    if (isCallOnly || !slug) {
      window.location.href = "tel:612-461-4022";
      return;
    }
    navigate(`/estimate?service=${slug}`);
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
            From spring cleanup through winter snow removal, we provide consistent, 
            quality service on a reliable weekly schedule.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group p-4 sm:p-6 transition-all duration-300 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 cursor-pointer hover:bg-primary-foreground/15"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => handleServiceClick(service.slug, service.isCallOnly)}
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
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-primary-foreground/20">
                {service.isCallOnly || !service.slug ? (
                  <>
                    <Phone className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium text-secondary">Call for Estimate</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium text-secondary">Book Service</span>
                    <ArrowRight className="w-4 h-4 text-secondary" />
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto" asChild>
            <a href="/estimate">
              Book Service
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 w-full sm:w-auto" asChild>
            <a href="tel:612-461-4022">
              <Phone className="w-4 h-4 mr-2" />
              Call for Project Estimate
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
