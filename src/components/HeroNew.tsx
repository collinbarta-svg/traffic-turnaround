import { ArrowRight, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const HeroNew = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 container pt-8 sm:pt-12 pb-12 sm:pb-16 flex flex-col items-center">
        {/* Brand name */}
        <div className="mb-12 sm:mb-16 opacity-0 animate-fade-up">
          <img src={logo} alt="Mason Outdoor Service LLC" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover" />
        </div>

        <div className="max-w-4xl text-center">
          <div className="flex justify-center items-center mb-4 sm:mb-6 opacity-0 animate-fade-up">
            <a href="#about" className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors cursor-pointer">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
              <span className="text-primary-foreground/90 text-xs sm:text-sm font-medium">
                About Us
              </span>
            </a>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-4 sm:mb-6 opacity-0 animate-fade-up stagger-1">
            Your Local Property
            <br />
            <span className="text-gradient">Maintenance Experts</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-6 sm:mb-8 opacity-0 animate-fade-up stagger-2 leading-relaxed">
            Family-owned, licensed, and based in St. Michael with 24 years 
            of experience. We service lawns on a reliable weekly route schedule 
            so your property always looks its best.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 opacity-0 animate-fade-up stagger-3">
            <Button
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground accent-glow w-full sm:w-auto"
              asChild
            >
              <a href="/estimate">
                Book Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 w-full sm:w-auto"
              asChild
            >
              <a href="tel:612-461-4022">
                <Phone className="w-5 h-5 mr-2" />
                Call for Estimate
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg mx-auto opacity-0 animate-fade-up stagger-4">
            <div>
              <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
                24+
              </div>
              <div className="text-xs sm:text-sm text-primary-foreground/70">Years Experience</div>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
                Local
              </div>
              <div className="text-xs sm:text-sm text-primary-foreground/70">Family-Owned</div>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
                Weekly
              </div>
              <div className="text-xs sm:text-sm text-primary-foreground/70">Route Schedule</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hide on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-5 hidden sm:block">
        <a href="#how-it-works" className="flex flex-col items-center gap-2 text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroNew;
