import { Phone, ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const MiscServices = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-foreground/95 text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-5">
            <Wrench className="w-7 h-7 text-secondary" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Miscellaneous Services
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/70 mb-8">
            Have a project that's not listed? We handle a wide range of outdoor work and property maintenance tasks. If you're unsure, just reach out — we're happy to take a look and provide a quote.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto" asChild>
            <a href="tel:612-461-4022">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MiscServices;
