import { Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">
              West Metro<span className="text-secondary"> Snow Plowing</span> LLC
            </h3>
            <p className="text-background/70 text-sm">
              Professional outdoor property maintenance serving the West Metro area. 
              Licensed, insured, and dedicated to quality.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Snow Plowing & Ice Control</li>
              <li>Lawn Mowing & Maintenance</li>
              <li>Landscaping & Mulching</li>
              <li>Spring & Fall Cleanup</li>
              <li>Tree & Shrub Pruning</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Contact</h4>
            <a
              href="tel:612-461-4022"
              className="inline-flex items-center gap-2 text-secondary font-semibold mb-2"
            >
              <Phone className="w-4 h-4" />
              612-461-4022
            </a>
            <p className="text-sm text-background/70">
              Saint Michael, Minnesota<br />
              Serving the West Metro Area
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
          <p>© {currentYear} West Metro Snow Plowing LLC. All rights reserved.</p>
          <p className="mt-1">Licensed & Insured Contractor</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
