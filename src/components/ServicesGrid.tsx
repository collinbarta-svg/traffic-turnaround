import { ArrowRight, Snowflake, TreeDeciduous, Leaf, Sprout, Droplets, Trees, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: TreeDeciduous,
    title: "Lawn Mowing",
    slug: "lawn-mowing",
    description: "Mowing, string trimming, edging, and debris cleanup. Same team every visit.",
    highlights: ["Mowing & edging", "String trimming", "Debris cleanup"],
  },
  {
    icon: Leaf,
    title: "Dethatching",
    slug: "dethatching",
    description: "Removes dead grass buildup to improve water, air, and nutrient flow to the soil.",
    highlights: ["Thatch removal", "Waste hauled away", "Healthier lawn"],
  },
  {
    icon: Droplets,
    title: "Aerating",
    slug: "aerating",
    description: "Core aeration for better drainage, healthier roots, and stronger lawn growth.",
    highlights: ["Core aeration", "Better drainage", "Healthier roots"],
  },
  {
    icon: Sprout,
    title: "Fertilizer & Weed Control",
    slug: "fertilizer-weed-control",
    description: "Seasonal treatments for a healthy, weed-free lawn all year long.",
    highlights: ["Seasonal treatments", "Weed prevention", "Lawn nutrition"],
  },
  {
    icon: Snowflake,
    title: "Snow Plowing",
    slug: "snow-plowing",
    description: "Driveway plowing, sidewalk shoveling, and steps cleared. Salt & sand as needed.",
    highlights: ["Driveway plowing", "Hand shoveling", "Salt & sand"],
  },
  {
    icon: Trees,
    title: "Brush & Yard Cleanup",
    slug: "brush-yard-cleanup",
    description: "Removal of brush, branches, leaves, sticks, and general yard debris. Ideal for seasonal cleanup.",
    highlights: ["Brush removal", "Leaf & debris cleanup", "Seasonal cleanup"],
    isCallOnly: true,
  },
  {
    icon: Droplets,
    title: "Sod Installation",
    slug: "sod-installation",
    description: "Ground prep, grading, sod delivery, and professional install for a brand new lawn.",
    highlights: ["Ground preparation", "Grading & tilling", "Sod install"],
    isCallOnly: true,
  },
];

const ServicesGrid = () => {
  const navigate = useNavigate();

  const handleServiceClick = (slug: string | null, isCallOnly?: boolean) => {
    if (isCallOnly) {
      window.location.href = "tel:612-461-4022";
      return;
    }
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
            From spring cleanup through winter snow removal, we provide consistent, 
            quality service on a reliable weekly schedule.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group p-4 sm:p-6 transition-all duration-300 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 cursor-pointer hover:bg-primary-foreground/15"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                    <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-secondary flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-primary-foreground/20">
                {service.isCallOnly ? (
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
              Book Lawn Service
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
