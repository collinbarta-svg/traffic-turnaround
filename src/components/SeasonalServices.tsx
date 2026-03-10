import { Leaf, Sun, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const seasons = [
  {
    icon: Leaf,
    title: "Spring Services",
    items: ["Yard cleanup", "Dethatching", "Brush cleanup", "Leaf removal", "General debris removal"],
  },
  {
    icon: Sun,
    title: "Summer Services",
    items: ["Weekly lawn mowing", "String trimming", "Edging", "Routine maintenance", "Fertilizer & weed control"],
  },
];

const SeasonalServices = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28 hero-gradient text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Seasonal Care
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Services by Season
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 px-2">
            We offer year-round property care tailored to Minnesota's seasons.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-8 sm:mb-12">
          {seasons.map((season) => (
            <div
              key={season.title}
              className="p-5 sm:p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <season.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-semibold text-primary-foreground">
                  {season.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {season.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Full Cleanup Explanation */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="p-5 sm:p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
            <h3 className="font-heading text-lg font-semibold text-primary-foreground mb-3">
              What's Included in a Full Cleanup?
            </h3>
            <p className="text-sm text-primary-foreground/70 mb-3">
              A full cleanup covers everything needed to get your yard back in shape:
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {["Debris removal", "Brush cleanup", "Leaf removal", "Dethatching", "General yard cleanup"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dethatching Explanation */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="p-5 sm:p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
            <h3 className="font-heading text-lg font-semibold text-primary-foreground mb-2">
              What Is Dethatching?
            </h3>
            <p className="text-sm text-primary-foreground/70">
              Dethatching removes the layer of dead grass buildup in your lawn, helping improve water, air, and nutrient flow to the soil. It's one of the best things you can do to keep your lawn healthy and green.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto" asChild>
            <a href="/estimate">
              Request Service
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

export default SeasonalServices;
