import { Phone, Mail, MapPin } from "lucide-react";

const FooterNew = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <span className="font-heading font-bold text-secondary-foreground text-lg">
                  WM
                </span>
              </div>
              <div>
                <div className="font-heading font-bold text-lg">West Metro</div>
                <div className="text-sm text-primary-foreground/70">Snow Plowing LLC</div>
              </div>
            </div>
            <p className="text-primary-foreground/80 max-w-sm mb-6">
              Professional property maintenance services serving the West Metro area
              for over 24 years. Licensed, insured, and committed to your satisfaction.
            </p>
            <div className="space-y-3">
              <a
                href="tel:612-298-5590"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Phone className="w-5 h-5" />
                612-298-5590
              </a>
              <a
                href="mailto:info@westmetrosnowplowing.com"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@westmetrosnowplowing.com
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>Serving the West Metro Area, Minnesota</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#estimator"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Get Estimate
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Our Work
                </a>
              </li>
              <li>
                <a
                  href="#areas"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Service Areas
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="text-primary-foreground/50 hover:text-secondary transition-colors text-sm"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-primary-foreground/70">Lawn Mowing</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Dethatching</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Aerating</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Fertilizer & Weed Control</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Snow Plowing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} West Metro Snow Plowing LLC. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Licensed & Insured | Serving Minnesota Since {new Date().getFullYear() - 24}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
