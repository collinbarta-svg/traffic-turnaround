import { Check, Snowflake, TreeDeciduous, Leaf, Sprout, Droplets, Trees, Phone } from "lucide-react";
import { services } from "@/lib/services";
import { useMemo } from "react";

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
  trees: Trees,
};

const ServiceSelection = ({ selectedServices, onToggleService }: ServiceSelectionProps) => {
  const sortedServices = useMemo(() => {
    const selected = selectedServices
      .map(id => services.find(s => s.id === id))
      .filter(Boolean) as typeof services;
    const unselected = services.filter(s => !selectedServices.includes(s.id));
    return [...selected, ...unselected];
  }, [selectedServices]);

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary-foreground mb-1">
          Select Your Services
        </h2>
        <p className="text-sm text-primary-foreground/60">
          Choose all the services you're interested in
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {sortedServices.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          const Icon = iconMap[service.icon] || TreeDeciduous;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onToggleService(service.id)}
              className={`relative p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? "border-secondary bg-secondary/15 shadow-md"
                  : "border-primary-foreground/15 bg-primary-foreground/5 hover:border-secondary/50 hover:bg-primary-foreground/10"
              }`}
            >
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 text-[10px] font-semibold text-secondary bg-secondary/20 px-1.5 py-0.5 rounded-full">
                  Selected
                </span>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary-foreground/10 text-primary-foreground/60"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ml-auto ${
                      isSelected
                        ? "border-secondary bg-secondary"
                        : "border-primary-foreground/20"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-secondary-foreground" />}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary-foreground text-sm sm:text-base leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-xs text-primary-foreground/50 mt-0.5 line-clamp-2 hidden sm:block">
                    {service.description}
                  </p>
                  <div className="mt-1">
                    {service.isCustom ? (
                      <span className="text-xs font-medium text-secondary flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Call for estimate
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-primary-foreground">
                        From ${service.basePrice}
                        <span className="font-normal text-primary-foreground/50 ml-1">
                          {service.isPerVisit ? "/visit" : ""}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;
