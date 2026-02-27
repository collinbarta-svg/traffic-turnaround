import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#areas", label: "Service Areas" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-heading font-bold text-lg md:text-xl text-foreground">
          West Metro<span className="text-primary"> Snow Plowing</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:612-461-4022"
            className="flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <Phone className="w-4 h-4" />
            612-461-4022
          </a>
          <Button asChild>
            <a href="#contact">Free Estimate</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:612-461-4022"
              className="flex items-center gap-2 text-base font-semibold text-primary"
            >
              <Phone className="w-5 h-5" />
              612-461-4022
            </a>
            <Button asChild className="w-full">
              <a href="#contact">Free Estimate</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
