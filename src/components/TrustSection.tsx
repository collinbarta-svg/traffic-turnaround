import { Clock, ThumbsUp, MessageCircle } from "lucide-react";

const trustPoints = [
  {
    icon: Clock,
    title: "Reliable & Consistent",
    description: "Same team, same quality, same attention to detail every time",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "No middlemen—talk directly to the people doing the work",
  },
  {
    icon: ThumbsUp,
    title: "Approval Required",
    description: "No work performed without your explicit confirmation first",
  },
];

const TrustSection = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28 hero-gradient text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            The Family-Owned Difference
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 px-2">
            We prioritize your property and take pride in every job. 
            Here's what you can expect when working with our 
            family-owned team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
          {trustPoints.map((point, index) => (
            <div
              key={point.title}
              className="group p-4 sm:p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <point.icon className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="font-heading text-sm sm:text-xl font-semibold text-primary-foreground mb-1 sm:mb-2">
                {point.title}
              </h3>
              <p className="text-xs sm:text-base text-primary-foreground/70">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
