import { ArrowRight, Snowflake, TreeDeciduous, Leaf, Sprout, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: TreeDeciduous,
    title: "Lawn Mowing",
    description: "Professional mowing with string trimming and debris cleanup for a pristine lawn.",
    price: "$75",
    unit: "per ¼ acre",
  },
  {
    icon: Leaf,
    title: "Dethatching",
    description: "Remove harmful thatch buildup with complete waste haul-away and disposal.",
    price: "$165",
    unit: "per ¼ acre",
  },
  {
    icon: Droplets,
    title: "Aerating",
    description: "Core aeration to improve soil health, drainage, and root development.",
    price: "$175",
    unit: "per ¼ acre",
  },
  {
    icon: Sprout,
    title: "Fertilizer & Weed Control",
    description: "Four seasonal treatments for optimal lawn nutrition and weed prevention.",
    price: "$150",
    unit: "per ¼ acre",
  },
  {
    icon: Snowflake,
    title: "Snow Plowing",
    description: "Reliable snow removal including driveway plowing and walkway shoveling.",
    price: "$75+",
    unit: "per visit",
  },
];

const ServicesGrid = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            Our Services
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Year-Round Property Care
          </h2>
          <p className="text-lg text-muted-foreground">
            From spring thaw to winter blizzards, we keep your property looking its best
            with professional-grade equipment and experienced crews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group p-6 hover:border-secondary/30 transition-all duration-300 card-elevated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {service.description}
              </p>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-heading text-2xl font-bold text-foreground">
                  {service.price}
                </span>
                <span className="text-sm text-muted-foreground">{service.unit}</span>
              </div>
              
              <p className="text-xs text-muted-foreground italic">
                *Preliminary estimate. Final pricing after evaluation.
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
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
