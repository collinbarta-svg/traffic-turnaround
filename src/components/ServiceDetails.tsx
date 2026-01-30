import { Snowflake, TreeDeciduous, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const snowFeatures = [
  "Driveway plowing with precision and care",
  "Hand shoveling in front of garage doors",
  "Sidewalk clearing from door to street",
  "Front steps and entryway cleared",
  "All edges carefully finished—no snow ridges left behind",
  "Salt and sand available at $25 per application",
  "Every property evaluated individually for fair pricing",
  "Reliable service with consistent results—quality over volume",
];

const lawnFeatures = [
  "Professional mowing with consistent cut height",
  "String trimming around all edges and obstacles",
  "Debris blown clean from driveways and walkways",
  "Dethatching to remove harmful buildup",
  "Core aeration for healthier root development",
  "Seasonal fertilizer and weed control treatments",
  "Attention to detail on every visit",
  "Personalized service with work personally reviewed",
];

const ServiceDetails = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary/10 text-secondary text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            How We Work
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Quality Work, Done Right
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            As a family-owned company, we take the time to do things properly. 
            No rushing, no cutting corners, no rotating crews. Just consistent, 
            detail-focused work from people who take pride in the results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Snow Services */}
          <Card className="p-5 sm:p-8 border-secondary/20">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Snowflake className="w-6 sm:w-7 h-6 sm:h-7 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                  Snow Services
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">Winter property care</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              When winter hits, you need someone you can count on. Our snow services 
              go beyond basic plowing—we clear edges, shovel walkways by hand, and 
              make sure your property is safe and accessible. We take pride in 
              providing reliable service and fair, transparent pricing.
            </p>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {snowFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 sm:w-5 h-4 sm:h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                <strong className="text-foreground">Snow plowing starts at $75 per visit</strong> — 
                includes plowing plus hand shoveling. Final pricing based on property 
                evaluation. Salt & sand: $25 per application.
              </p>
            </div>
          </Card>

          {/* Lawn Services */}
          <Card className="p-5 sm:p-8 border-secondary/20">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <TreeDeciduous className="w-6 sm:w-7 h-6 sm:h-7 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                  Lawn & Property Care
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">Spring through fall</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Your lawn deserves more than a quick once-over. We take time on every 
              property to ensure clean edges, proper trimming, and careful attention 
              to detail. Consistent service from the same team every time, with work 
              personally reviewed.
            </p>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {lawnFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 sm:w-5 h-4 sm:h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                <strong className="text-foreground">Lawn services priced per quarter acre</strong> — 
                base price for first ¼ acre, then $25 for each additional ¼ acre.
                Use the estimator above for preliminary pricing. Final pricing confirmed 
                after on-site evaluation.
              </p>
            </div>
          </Card>
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

export default ServiceDetails;
