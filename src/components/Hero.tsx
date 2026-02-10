import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-snow.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container text-center text-primary-foreground pt-20">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 bg-secondary/90 text-secondary-foreground text-sm font-semibold rounded-full mb-6 animate-fade-up opacity-0">
            ✓ Licensed & Insured • 24 Years Experience
          </span>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight animate-fade-up opacity-0 stagger-1">
            Reliable Snow Plowing &<br />
            <span className="text-secondary">Lawn Care Services</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 animate-fade-up opacity-0 stagger-2">
            Serving the West Metro area with professional outdoor property maintenance. 
            From snow removal to lawn care — we keep your property looking its best year-round.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0 stagger-3">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 accent-glow" asChild>
              <a href="#contact">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" asChild>
              <a href="tel:612-298-5590">
                <Phone className="mr-2 w-5 h-5" />
                612-298-5590
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto mt-12 animate-fade-up opacity-0 stagger-4">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-secondary">24+</div>
              <div className="text-sm text-primary-foreground/80">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-secondary">500+</div>
              <div className="text-sm text-primary-foreground/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-secondary">7</div>
              <div className="text-sm text-primary-foreground/80">Days a Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/80 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
