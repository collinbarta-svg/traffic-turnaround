import { ArrowRight, Snowflake, TreeDeciduous, Leaf, Sprout, Droplets, Trees, Check, Phone, Flower2, Scissors, TreePine, Shovel, Sun, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Leaf,
    title: "Spring Yard Clean Up",
    slug: "brush-yard-cleanup",
    description: "Removes winter debris such as leaves, twigs, pine cones, fallen branches, and litter. Includes cleaning garden beds and cutting back perennials for healthy spring growth.",
    highlights: ["Debris removal", "Garden bed cleaning", "Perennial care"],
  },
  {
    icon: TreeDeciduous,
    title: "Weekly Lawn Mowing",
    slug: "lawn-mowing",
    description: "Promotes a thicker, healthier lawn by encouraging consistent growth. Controls weeds, improves nutrient recycling, prevents thatch buildup, and boosts curb appeal.",
    highlights: ["Mowing & trimming", "Weed control", "Improved curb appeal"],
  },
  {
    icon: Sprout,
    title: "Fertilizer & Weed Control",
    slug: "fertilizer-weed-control",
    description: "Provides essential nutrients like nitrogen, phosphorus, and potassium for faster growth, deeper roots, and a thicker, greener lawn with improved drought resistance.",
    highlights: ["Essential nutrients", "Deeper roots", "Weed suppression"],
  },
  {
    icon: Leaf,
    title: "Lawn Dethatching",
    slug: "dethatching",
    description: "Removes compacted organic matter so water, oxygen, and nutrients reach the soil. Promotes deeper root growth, prevents disease, and improves fertilizer efficiency.",
    highlights: ["Thatch removal", "Better air circulation", "Healthier lawn"],
  },
  {
    icon: Droplets,
    title: "Lawn Core Plug Aeration",
    slug: "aerating",
    description: "Relieves soil compaction, allowing air, water, and nutrients to penetrate deeper. Encourages stronger grass, improves fertilizer efficiency, and builds drought-resistant lawns.",
    highlights: ["Core aeration", "Reduced compaction", "Deeper roots"],
  },
  {
    icon: Sprout,
    title: "Lawn Overseeding",
    slug: null,
    description: "Thickens your lawn and fills bare patches for a lush, vibrant appearance. Enhances resistance to disease, pests, and drought while naturally suppressing weeds.",
    highlights: ["Fills bare patches", "Disease resistance", "Weed suppression"],
    isCallOnly: true,
  },
  {
    icon: Trees,
    title: "Rock Bed Landscape Clean Up",
    slug: null,
    description: "Removes debris, weeds, and organic matter to restore a clean, organized look. Improves curb appeal, drainage, weed prevention, and moisture retention for plants.",
    highlights: ["Weed removal", "Improved drainage", "Better curb appeal"],
    isCallOnly: true,
  },
  {
    icon: Paintbrush,
    title: "Colored Mulch Installation",
    slug: null,
    description: "Enhances landscapes with vibrant, long-lasting colors. Suppresses weeds, retains soil moisture, reduces watering needs, and regulates soil temperature to protect roots.",
    highlights: ["Vibrant colors", "Weed suppression", "Moisture retention"],
    isCallOnly: true,
  },
  {
    icon: Flower2,
    title: "Landscape Gardening",
    slug: null,
    description: "Increases property value by an estimated 12–20%. Improves mental well-being by reducing stress and creating a relaxing outdoor environment.",
    highlights: ["Increased value", "Stress reduction", "Beautiful design"],
    isCallOnly: true,
  },
  {
    icon: Scissors,
    title: "Plant & Shrub Pruning",
    slug: null,
    description: "Removes diseased, dead, or damaged branches to prevent pest infestations. Encourages flower and fruit production, improves air circulation and light penetration.",
    highlights: ["Disease prevention", "Better growth", "Shape maintenance"],
    isCallOnly: true,
  },
  {
    icon: TreePine,
    title: "Tree Trimming",
    slug: null,
    description: "Promotes tree longevity by removing dead, diseased, or decaying branches. Improves airflow and sunlight through the canopy, reducing fungal risks.",
    highlights: ["Tree health", "Canopy care", "Disease prevention"],
    isCallOnly: true,
  },
  {
    icon: Leaf,
    title: "Fall Clean Up",
    slug: "brush-yard-cleanup",
    description: "Removes fallen leaves and debris that can suffocate your lawn. Eliminates pest habitats, reduces thatch buildup, prevents slippery walkways, and prepares for spring.",
    highlights: ["Leaf removal", "Pest prevention", "Spring prep"],
  },
  {
    icon: Snowflake,
    title: "Snow Plowing & Ice Control",
    slug: "snow-plowing",
    description: "Keeps sidewalks, driveways, and parking lots safe during winter. Prevents slips and falls, reduces ice buildup, and ensures safe property access.",
    highlights: ["Driveway plowing", "Ice control", "Safe access"],
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
                    <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-secondary flex-shrink-0" />
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
