import { Check, Snowflake, TreeDeciduous, Leaf, Sprout, Droplets, Trees } from "lucide-react";
import { services } from "@/lib/services";

interface ServiceSelectionProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  grass: TreeDeciduous,
  rake: Leaf,
  shovel: Droplets,
  spray: Sprout,
  snowflake: Snowflake,
};

const ServiceSelection = ({ selectedServices, onToggleService }: ServiceSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Select Your Services
        </h2>
        <p className="text-muted-foreground">
          Choose all the services you're interested in
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          const Icon = iconMap[service.icon] || TreeDeciduous;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onToggleService(service.id)}
              className={`w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? "border-secondary bg-secondary/5 shadow-md"
                  : "border-border bg-card hover:border-secondary/50 hover:bg-muted/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading font-semibold text-foreground">
                      {service.name}
                    </h3>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? "border-secondary bg-secondary"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-secondary-foreground" />}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-semibold text-foreground">
                      From ${service.basePrice}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {service.isPerVisit ? "per visit" : "starting (¼ acre)"}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Add Brush Cleanup notice */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start gap-3">
          <Trees className="w-5 h-5 text-secondary mt-0.5" />
          <div>
            <p className="font-medium text-foreground text-sm">Need Brush Cleanup?</p>
            <p className="text-xs text-muted-foreground mt-1">
              Brush cleanup requires a custom quote. Continue with your estimate and mention it in the notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;
