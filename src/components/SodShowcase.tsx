import { ArrowRight, Truck, Wrench, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import sodTruck from "@/assets/projects/sod-truck-arrival.jpg";
import sodBobcat from "@/assets/projects/sod-bobcat-tiller.jpg";
import sodGroundPrep from "@/assets/projects/sod-ground-prep.jpg";
import sodFinished from "@/assets/projects/sod-finished-lawn.jpg";

const steps = [
  {
    step: 1,
    icon: Truck,
    title: "Sod Delivery",
    description: "Fresh sod rolls arrive on-site, ready for installation.",
    image: sodTruck,
  },
  {
    step: 2,
    icon: Wrench,
    title: "Ground Preparation",
    description: "Compact track loader with tiller attachment breaks up and levels the soil for a perfect base.",
    image: sodBobcat,
  },
  {
    step: 3,
    icon: Layers,
    title: "Graded & Ready",
    description: "The yard is fully tilled, graded, and prepped — ready for fresh sod to be laid.",
    image: sodGroundPrep,
  },
  {
    step: 4,
    icon: Sparkles,
    title: "Finished Lawn",
    description: "Fresh sod installed, watered, and looking great — a brand new lawn in just days.",
    image: sodFinished,
  },
];

const SodShowcase = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28 hero-gradient text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Featured Project
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Full Sod Installation
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 px-2">
            From delivery to a finished lawn — see the complete process of how we transform a yard with professional sod installation.
          </p>
        </div>

        {/* Timeline steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {steps.map((item) => (
            <div key={item.step} className="group relative">
              {/* Step number badge */}
              <div className="absolute -top-3 left-4 z-10 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-heading font-bold text-sm shadow-md">
                {item.step}
              </div>

              <div className="rounded-xl overflow-hidden bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1.5">
                    <item.icon className="w-4 h-4 text-secondary flex-shrink-0" />
                    <h3 className="font-heading font-semibold text-primary-foreground text-sm sm:text-base">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-primary-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-primary-foreground/80 mb-4 text-sm sm:text-base">
            Need a new lawn? We handle everything from ground prep to finished sod.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto" asChild>
            <a href="/estimate">
              Get a Sod Estimate
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SodShowcase;
