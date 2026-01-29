import { MapPin, CheckCircle, Clock, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const primaryAreas = [
  "St. Michael",
  "Albertville", 
  "Hanover",
  "Otsego",
];

const benefits = [
  {
    icon: Clock,
    title: "Faster Response Times",
    description: "Being local means I can respond quickly, especially during snow emergencies when timing matters most.",
  },
  {
    icon: MapPin,
    title: "Property Familiarity",
    description: "Serving a focused area means I know the properties, the neighborhoods, and the specific needs of each location.",
  },
  {
    icon: Shield,
    title: "Consistent Quality",
    description: "By not overextending, I can give every property the attention it deserves—no rushed jobs, no corners cut.",
  },
];

const ServiceAreaSection = () => {
  return (
    <section id="areas" className="py-20 md:py-28 hero-gradient text-primary-foreground">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary-foreground/20 text-primary-foreground text-sm font-semibold rounded-full mb-4">
              Service Area
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Proudly Serving the<br />
              <span className="text-secondary">West Metro Area</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              I intentionally keep my service area focused to ensure every customer receives 
              the quality and reliability they deserve. This means faster response times, 
              familiarity with your property, and consistent results you can count on.
            </p>

            <div className="mb-8">
              <h3 className="font-heading font-semibold text-lg mb-4 text-primary-foreground/90">
                Primary Service Locations
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {primaryAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="font-medium">{area}, MN</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-primary-foreground/70 text-sm">
              Live nearby but don't see your city listed? Give me a call—I may still be able to help 
              depending on location and schedule.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="p-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-primary-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-primary-foreground/70 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
