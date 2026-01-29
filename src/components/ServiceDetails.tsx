import { Snowflake, TreeDeciduous, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const snowFeatures = [
  "Driveway plowing with precision and care",
  "Hand shoveling in front of garage doors",
  "Sidewalk clearing from door to street",
  "Front steps and entryway cleared",
  "All edges carefully finished—no snow ridges left behind",
  "Salt and sand applied as needed for traction and safety",
  "Every property evaluated individually for fair pricing",
  "Reliable service, not mass-produced—quality over volume",
];

const lawnFeatures = [
  "Professional mowing with consistent cut height",
  "String trimming around all edges and obstacles",
  "Debris blown clean from driveways and walkways",
  "Dethatching to remove harmful buildup",
  "Core aeration for healthier root development",
  "Seasonal fertilizer and weed control treatments",
  "Attention to detail on every visit",
  "Personalized service from the same person every time",
];

const ServiceDetails = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            How We Work
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Quality Work, Done Right
          </h2>
          <p className="text-lg text-muted-foreground">
            As a private contractor, I take the time to do things properly. 
            No rushing, no cutting corners, no rotating crews. Just consistent, 
            detail-focused work from someone who takes pride in the results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Snow Services */}
          <Card className="p-8 border-secondary/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Snowflake className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Snow Services
                </h3>
                <p className="text-muted-foreground">Winter property care</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              When winter hits, you need someone you can count on. My snow services 
              go beyond basic plowing—I clear edges, shovel walkways by hand, and 
              make sure your property is safe and accessible. No rushing to the 
              next job, no sloppy work.
            </p>

            <ul className="space-y-3 mb-8">
              {snowFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Snow plowing starts at $75 per visit</strong> — 
                includes plowing plus hand shoveling. Final pricing based on property 
                evaluation. Salt/sand applied as conditions require.
              </p>
            </div>
          </Card>

          {/* Lawn Services */}
          <Card className="p-8 border-secondary/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                <TreeDeciduous className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Lawn & Property Care
                </h3>
                <p className="text-muted-foreground">Spring through fall</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Your lawn deserves more than a quick once-over. I take time on every 
              property to ensure clean edges, proper trimming, and the kind of 
              attention to detail that large crews simply can't provide. Consistent 
              service from the same person every time.
            </p>

            <ul className="space-y-3 mb-8">
              {lawnFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">All lawn services priced per quarter acre</strong> — 
                use the estimator above for preliminary pricing. Final pricing confirmed 
                after on-site evaluation.
              </p>
            </div>
          </Card>
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

export default ServiceDetails;
