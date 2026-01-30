import { ArrowRight, Snowflake, TreeDeciduous, Leaf, Sprout, Droplets, Trees, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: TreeDeciduous,
    title: "Lawn Mowing",
    description: "Professional mowing with attention to detail—clean edges, proper trimming, and debris cleared. Same team every visit.",
    price: "$75",
    unit: "starting (¼ acre)",
    highlights: ["Mowing & edging", "String trimming", "Debris cleanup"],
  },
  {
    icon: Leaf,
    title: "Dethatching",
    description: "Remove harmful thatch buildup that chokes your lawn. Complete waste removal and disposal included.",
    price: "$165",
    unit: "starting (¼ acre)",
    highlights: ["Thatch removal", "Waste hauled away", "Proper disposal"],
  },
  {
    icon: Droplets,
    title: "Aerating",
    description: "Core aeration to improve soil health, water absorption, and root growth for a stronger lawn.",
    price: "$175",
    unit: "starting (¼ acre)",
    highlights: ["Core aeration", "Better drainage", "Healthier roots"],
  },
  {
    icon: Sprout,
    title: "Fertilizer & Weed Control",
    description: "Four seasonal treatments designed for Minnesota lawns. Balanced nutrition and targeted weed prevention.",
    price: "$150",
    unit: "starting (¼ acre)",
    highlights: ["4 treatments/season", "Weed prevention", "Lawn nutrition"],
  },
  {
    icon: Snowflake,
    title: "Snow Plowing",
    description: "Reliable snow removal with hand-cleared edges, walkways, and steps. Salt & sand applied as needed for safety.",
    price: "$75+",
    unit: "per visit",
    highlights: ["Driveway plowing", "Hand shoveling", "Salt & sand ($25)"],
  },
  {
    icon: Trees,
    title: "Brush Cleanup",
    description: "Professional brush and debris removal for your property. Contact us for a custom quote based on your specific needs.",
    price: "Custom",
    unit: "quote",
    highlights: ["Brush removal", "Debris hauling", "Custom pricing"],
  },
];

const ServicesGrid = () => {
  return (
    <section id="services" className="py-12 sm:py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary/10 text-secondary text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Services & Pricing
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Year-Round Property Care
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            From spring lawn care through winter snow removal, we provide consistent, 
            quality service with the attention to detail that larger companies can't match.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group p-4 sm:p-6 transition-all duration-300 card-elevated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-muted flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <service.icon className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm">
                {service.description}
              </p>
              
              <ul className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-secondary flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-baseline gap-2 pt-3 sm:pt-4 border-t border-border">
                <span className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                  {service.price}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">{service.unit}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 max-w-2xl mx-auto">
          <p className="text-center text-xs sm:text-sm text-muted-foreground italic px-4">
            *All pricing shown is preliminary. Every property is different—final pricing 
            confirmed after on-site evaluation. No work performed without your approval.
          </p>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto" asChild>
            <a href="#estimator">
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
