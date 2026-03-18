import { Check } from "lucide-react";

interface EstimateProgressProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: "Services" },
  { number: 2, label: "Property" },
  { number: 3, label: "Details" },
  { number: 4, label: "Review" },
];

const EstimateProgress = ({ currentStep, totalSteps }: EstimateProgressProps) => {
  return (
    <div className="w-full">
      {/* Mobile: Simple text indicator */}
      <div className="sm:hidden text-center mb-4">
        <span className="text-sm font-medium text-primary-foreground/60">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Desktop: Full progress bar */}
      <div className="hidden sm:flex items-center justify-between max-w-xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step.number < currentStep
                    ? "bg-secondary text-secondary-foreground"
                    : step.number === currentStep
                    ? "bg-primary-foreground/20 text-primary-foreground ring-4 ring-secondary/30"
                    : "bg-primary-foreground/10 text-primary-foreground/40"
                }`}
              >
                {step.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step.number <= currentStep
                    ? "text-primary-foreground"
                    : "text-primary-foreground/40"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 lg:w-24 h-1 mx-2 rounded-full transition-all duration-300 ${
                  step.number < currentStep ? "bg-secondary" : "bg-primary-foreground/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstimateProgress;
