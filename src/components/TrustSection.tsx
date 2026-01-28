import { Shield, Clock, Award, Users, ThumbsUp, Zap } from "lucide-react";

const trustPoints = [
  {
    icon: Award,
    title: "24 Years of Excellence",
    description: "Over two decades of reliable service to the West Metro community",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full liability coverage for complete peace of mind",
  },
  {
    icon: Clock,
    title: "Reliable & Punctual",
    description: "We show up on time, every time—no exceptions",
  },
  {
    icon: Users,
    title: "500+ Happy Clients",
    description: "Building lasting relationships with property owners",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "We're not done until you're completely satisfied",
  },
  {
    icon: Zap,
    title: "24/7 Emergency Service",
    description: "Available when you need us most during snow emergencies",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 md:py-28 section-gradient">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Hundreds of Property Owners
          </h2>
          <p className="text-lg text-muted-foreground">
            We've built our reputation on reliability, transparency, and quality
            workmanship. Here's why property owners continue to choose us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point, index) => (
            <div
              key={point.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-secondary/30 transition-all duration-300 card-elevated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <point.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {point.title}
              </h3>
              <p className="text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
