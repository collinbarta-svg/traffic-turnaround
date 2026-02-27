import { Shield, Clock, Award, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed contractor with comprehensive insurance for your peace of mind.",
  },
  {
    icon: Clock,
    title: "24 Years Experience",
    description: "Nearly three decades of reliable service to the West Metro community.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "We take pride in delivering exceptional results on every job, big or small.",
  },
  {
    icon: ThumbsUp,
    title: "Free Estimates",
    description: "No obligation quotes for all services. Transparent pricing with no hidden fees.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              About Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Trusted Local<br />
              <span className="text-gradient">Property Expert</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're a family-owned, licensed and insured company providing quality outdoor 
              property maintenance. Based in St. Michael, we serve our local community 
              with pride.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              With 24 years of experience, we enjoy making peoples' homes and businesses look 
              and feel nicer. Whether you need help keeping the lawn nice during summer or 
              the snow cleared during winter — we look forward to serving you.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="font-heading text-2xl font-bold text-primary-foreground">MO</span>
              </div>
              <div>
                <div className="font-heading font-bold text-foreground">Mason's Outdoor Property Service</div>
                <div className="text-sm text-muted-foreground">Family-Owned & Operated</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 bg-background rounded-xl card-elevated"
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
