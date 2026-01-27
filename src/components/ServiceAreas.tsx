import { MapPin } from "lucide-react";

const areas = [
  "Saint Michael",
  "Albertville", 
  "Otsego",
  "Elk River",
  "Rogers",
  "Maple Grove",
  "Plymouth",
  "Corcoran",
  "Hanover",
  "Buffalo",
  "Champlin",
  "Dayton",
];

const ServiceAreas = () => {
  return (
    <section id="areas" className="py-20 md:py-28 hero-gradient text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-foreground/20 text-primary-foreground text-sm font-semibold rounded-full mb-4">
            Service Areas
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Serving the West Metro Area
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Based in Saint Michael, we proudly serve residential and commercial 
            customers throughout the West Metro region.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-primary-foreground/20 transition-colors"
            >
              <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="font-medium">{area} MN</span>
            </div>
          ))}
        </div>

        <p className="text-center text-primary-foreground/70 mt-8">
          Don't see your area? Give us a call — we may still be able to help!
        </p>
      </div>
    </section>
  );
};

export default ServiceAreas;
