import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const businessHours = [
  { day: "Monday - Friday", hours: "7:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Contact Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Call us today for a free estimate. We're happy to discuss your needs and 
              provide transparent, competitive pricing for all our services.
            </p>

            <div className="space-y-6">
              <a
                href="tel:612-461-4022"
                className="flex items-center gap-4 p-4 bg-primary rounded-xl text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm opacity-80">Call Now</div>
                  <div className="text-xl font-heading font-bold">612-461-4022</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-background rounded-xl">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Based in</div>
                  <div className="font-heading font-bold text-foreground">Saint Michael, Minnesota</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background p-6 md:p-8 rounded-xl card-elevated">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="font-heading text-xl font-bold text-foreground">Business Hours</h3>
            </div>

            <div className="space-y-4 mb-8">
              {businessHours.map((item) => (
                <div key={item.day} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                  <span className="text-foreground font-medium">{item.day}</span>
                  <span className="text-muted-foreground">{item.hours}</span>
                </div>
              ))}
            </div>

            <div className="bg-secondary/10 p-4 rounded-lg mb-6">
              <p className="text-sm text-foreground">
                <strong>Emergency Snow Removal:</strong> We're available 24/7 during winter storms 
                for commercial accounts.
              </p>
            </div>

            <Button size="lg" className="w-full" asChild>
              <a href="tel:612-461-4022">
                <Phone className="mr-2 w-5 h-5" />
                Call for Free Estimate
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
