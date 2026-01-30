import { MousePointerClick, Calculator, ClipboardCheck, CheckCircle, Wrench } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Select Services",
    description: "Choose the services you need from our comprehensive offerings",
  },
  {
    icon: Calculator,
    title: "View Estimate",
    description: "Get instant preliminary pricing based on your property size",
  },
  {
    icon: ClipboardCheck,
    title: "On-Site Evaluation",
    description: "We visit your property to assess and finalize accurate pricing",
  },
  {
    icon: CheckCircle,
    title: "Final Approval",
    description: "Review and approve the final estimate before any work begins",
  },
  {
    icon: Wrench,
    title: "Service Performed",
    description: "Our team completes the work to your satisfaction",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary/10 text-secondary text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Simple Process
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Our transparent process ensures you know exactly what to expect—from
            estimate to completion.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number background for desktop */}
                <div className="hidden lg:block absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-card z-10" />

                {/* Icon container */}
                <div className="relative z-20 w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-muted flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                  <step.icon className="w-5 sm:w-7 h-5 sm:h-7" />
                  {/* Step number */}
                  <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-secondary text-secondary-foreground text-[10px] sm:text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>

                <h3 className="font-heading text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-[180px] sm:max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
