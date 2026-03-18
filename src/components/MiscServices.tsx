import { Phone, ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const MiscServices = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Wrench className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Miscellaneous Services
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8">
            Have a project that's not listed? We handle a wide range of outdoor work and property maintenance tasks. If you're unsure, just reach out — we're happy to take a look and provide a quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto" asChild>
              <a href="tel:612-461-4022">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <a href="/estimate">
                Request a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiscServices;
