import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const HeaderNew = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "/estimate", label: "Get Started" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container overflow-visible">
        <div className="flex items-center justify-between h-16 md:h-20 overflow-visible">
          {/* Logo - overflows header for polished effect */}
          <a href="/" className="flex items-center gap-3 relative">
            <img src={logo} alt="Mason Outdoor Service LLC" className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-xl object-cover shadow-lg ring-2 ring-background/50 relative z-[60] translate-y-12" />
            <div className="hidden sm:block">
              <div className={`font-heading font-bold text-lg leading-tight ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
                Mason Outdoor Service LLC
              </div>
              <div className={`text-xs ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                Family-Owned Since {new Date().getFullYear() - 24}
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:612-461-4022"
              className={`flex items-center gap-2 text-sm font-medium ${
                isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              <Phone className="w-4 h-4" />
              612-461-4022
            </a>
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
              <a href="/estimate">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${
              isScrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-card/95 backdrop-blur-md">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:612-461-4022"
                className="flex items-center gap-2 text-foreground font-medium py-2"
              >
                <Phone className="w-4 h-4" />
                612-461-4022
              </a>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-2" asChild>
                <a href="/estimate">Get Started</a>
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Mobile Sticky Call Bar */}
      <div className="md:hidden fixed left-0 right-0 z-40 top-16 bg-secondary border-b border-border/50">
        <div className="container">
          <a
            href="tel:612-461-4022"
            className="flex items-center justify-center gap-1.5 py-2.5 text-secondary-foreground"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span className="text-sm font-normal">Tap To Call</span>
            <span className="text-base font-bold">(612) 461-4022</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeaderNew;
