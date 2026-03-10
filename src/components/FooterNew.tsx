import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const FooterNew = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-10 sm:py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img src={logo} alt="Mason Outdoor Service LLC" className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg object-cover flex-shrink-0" />
              <div>
                <div className="font-heading font-bold text-base sm:text-lg">Mason Outdoor Service LLC</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70">Family-Owned & Locally Operated</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-primary-foreground/80 max-w-sm mb-4 sm:mb-6">
              Family-owned property maintenance proudly based in St. Michael, MN.
              Licensed, insured, and committed to quality results for over 24 years.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="tel:612-461-4022"
                className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                612-461-4022
              </a>
              <a
                href="mailto:info@jpgroundsandsnow.com"
                className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-primary-foreground/80 hover:text-secondary transition-colors break-all"
              >
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
                info@jpgroundsandsnow.com
              </a>
              <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-primary-foreground/80">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>Locally operated in St. Michael, Minnesota</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a href="#about" className="text-sm sm:text-base text-primary-foreground/70 hover:text-secondary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm sm:text-base text-primary-foreground/70 hover:text-secondary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/estimate" className="text-sm sm:text-base text-primary-foreground/70 hover:text-secondary transition-colors">
                  Book Service
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm sm:text-base text-primary-foreground/70 hover:text-secondary transition-colors">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#areas" className="text-sm sm:text-base text-primary-foreground/70 hover:text-secondary transition-colors">
                  Service Areas
                </a>
              </li>
              <li>
                <a href="/admin" className="text-xs sm:text-sm text-primary-foreground/50 hover:text-secondary transition-colors">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-base sm:text-lg mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><span className="text-sm sm:text-base text-primary-foreground/70">Lawn Mowing</span></li>
              <li><span className="text-sm sm:text-base text-primary-foreground/70">Dethatching</span></li>
              <li><span className="text-sm sm:text-base text-primary-foreground/70">Aerating</span></li>
              <li><span className="text-sm sm:text-base text-primary-foreground/70">Fertilizer & Weed Control</span></li>
              <li><span className="text-sm sm:text-base text-primary-foreground/70">Snow Plowing</span></li>
              <li><span className="text-sm sm:text-base text-primary-foreground/70">Brush & Yard Cleanup</span></li>
              <li><span className="text-sm sm:text-base text-primary-foreground/70">Sod Installation</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-primary-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} Mason Outdoor Service LLC. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-primary-foreground/60 text-center md:text-right">
              Licensed & Insured | Family-Owned Since {new Date().getFullYear() - 24}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
