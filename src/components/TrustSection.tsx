import { Shield, Clock, Award, User, ThumbsUp, MessageCircle } from "lucide-react";

const trustPoints = [
  {
    icon: User,
    title: "Owner-Operated",
    description: "Work directly with James, not a rotating crew or call center",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full liability coverage for complete peace of mind on every job",
  },
  {
    icon: Award,
    title: "24 Years Experience",
    description: "Nearly three decades of reliable service to local property owners",
  },
  {
    icon: Clock,
    title: "Reliable & Consistent",
    description: "Same person, same quality, same attention to detail every time",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "No middlemen—talk directly to the person doing the work",
  },
  {
    icon: ThumbsUp,
    title: "Approval Required",
    description: "No work performed without your explicit confirmation first",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 md:py-28 section-gradient">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            Why Choose a Local Contractor
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Private Contractor Difference
          </h2>
          <p className="text-lg text-muted-foreground">
            Large companies prioritize volume. I prioritize your property. 
            Here's why working with a local, owner-operated contractor makes 
            all the difference.
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
