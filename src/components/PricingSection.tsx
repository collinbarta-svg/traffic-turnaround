import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const pricingData = [
  {
    title: "Lawn Mowing",
    tiers: [
      { size: "¼ Acre Lot", price: "$65" },
      { size: "½ Acre Lot", price: "$90" },
      { size: "¾ Acre Lot", price: "$115" },
      { size: "1 Acre Lot", price: "$140" },
    ],
  },
  {
    title: "Spring Clean Up",
    tiers: [
      { size: "¼ Acre", price: "$275" },
      { size: "½ Acre", price: "$315" },
      { size: "¾ Acre", price: "$355" },
      { size: "1 Acre", price: "$395" },
    ],
  },
  {
    title: "Fall / Leaf Clean Up",
    tiers: [
      { size: "¼ Acre", price: "$300" },
      { size: "½ Acre", price: "$340" },
      { size: "¾ Acre", price: "$380" },
      { size: "1 Acre", price: "$420" },
    ],
  },
  {
    title: "Lawn Fertilizing & Weed Control",
    tiers: [
      { size: "¼ Acre", price: "$155" },
      { size: "½ Acre", price: "$185" },
      { size: "¾ Acre", price: "$215" },
      { size: "1 Acre", price: "$260" },
    ],
  },
  {
    title: "Lawn Dethatching",
    tiers: [
      { size: "¼ Acre", price: "$240" },
      { size: "½ Acre", price: "$285" },
      { size: "¾ Acre", price: "$320" },
      { size: "1 Acre", price: "$380" },
    ],
  },
  {
    title: "Lawn Aeration",
    tiers: [
      { size: "¼ Acre", price: "$220" },
      { size: "½ Acre", price: "$245" },
      { size: "¾ Acre", price: "$260" },
      { size: "1 Acre", price: "$300" },
    ],
  },
  {
    title: "Lawn Overseeding",
    tiers: [
      { size: "¼ Acre", price: "$295" },
      { size: "½ Acre", price: "$500" },
      { size: "¾ Acre", price: "$700" },
      { size: "1 Acre", price: "$945" },
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-12 sm:py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Pricing
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Straightforward pricing based on your lot size. No hidden fees.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {pricingData.map((service) => (
            <Card key={service.title} className="p-4 sm:p-6 bg-card border-border">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4">
                {service.title}
              </h3>
              <ul className="space-y-2.5">
                {service.tiers.map((tier) => (
                  <li key={tier.size} className="flex items-baseline justify-between text-sm">
                    <span className="text-muted-foreground">{tier.size}</span>
                    <div className="text-right">
                      <span className="font-semibold text-foreground">{tier.price}</span>
                      {'note' in tier && (tier as { note?: string }).note && (
                        <p className="text-[10px] text-muted-foreground">{(tier as { note?: string }).note}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}

          {/* Snow Plowing */}
          <Card className="p-4 sm:p-6 bg-card border-border">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4">
              Snow Plowing
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Starting at <span className="font-semibold text-foreground">$75</span> per visit for most residential driveways.
            </p>
            <p className="text-xs text-muted-foreground">
              Commercial parking lots are priced by project size.
            </p>
          </Card>

          {/* Custom Project Pricing */}
          <Card className="p-4 sm:p-6 bg-card border-border">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4">
              Custom Project Pricing
            </h3>
            <ul className="space-y-1.5 mb-4">
              {["Landscape Gardening", "Plant & Shrub Pruning", "Tree Trimming", "Rock Bed Clean Up", "Mulch Installation"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              Pricing is based on project size. Customers must request a quote.
            </p>
            <Button size="sm" className="mt-3 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
              <a href="tel:612-461-4022">
                <Phone className="w-4 h-4 mr-2" />
                Request a Quote
              </a>
            </Button>
          </Card>
        </div>

        <div className="text-center mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto" asChild>
            <a href="/estimate">
              Get Your Estimate
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <a href="tel:612-461-4022">
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
