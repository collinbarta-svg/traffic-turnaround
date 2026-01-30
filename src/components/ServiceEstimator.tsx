import { useState } from "react";
import { Check, Plus, Minus, Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services, DISCLAIMER_TEXT, calculateServicePrice, calculateTotal, type Service } from "@/lib/services";
import ServiceRequestForm from "./ServiceRequestForm";

const ServiceIcon = ({ icon }: { icon: string }) => {
  const iconClass = "w-5 h-5";
  switch (icon) {
    case "grass":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22V8M12 8c0-3-2-5-5-6 3 1 5 3 5 6M12 8c0-3 2-5 5-6-3 1-5 3-5 6M5 22V12c0-2-1-3-3-4 2 1 3 2 3 4M19 22V12c0-2 1-3 3-4-2 1-3 2-3 4" />
        </svg>
      );
    case "rake":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 20L12 12M12 12L20 4M12 12L8 4M12 12L16 4M12 12V4" />
        </svg>
      );
    case "shovel":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 22L12 12M12 12l4-4a4 4 0 015.66 5.66L17.5 18M12 12l2.5 2.5" />
        </svg>
      );
    case "spray":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12h8M4 12a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2v-6a2 2 0 00-2-2M4 12V8a2 2 0 012-2h4a2 2 0 012 2v4M8 6V2M16 6l2-4M18 10l4-2M18 14l4 2" />
        </svg>
      );
    case "snowflake":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M12 6l4-4M12 6l-4-4M12 18l4 4M12 18l-4 4M2 12h20M6 12l-4-4M6 12l-4 4M18 12l4-4M18 12l4 4" />
        </svg>
      );
    default:
      return null;
  }
};

const getPriceDisplay = (service: Service) => {
  if (service.isPerVisit) {
    return { price: `$${service.basePrice}`, unit: "starting price per visit" };
  }
  return { price: `$${service.basePrice}`, unit: "for first ¼ acre (+$25/additional)" };
};

const ServiceEstimator = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [quarterAcres, setQuarterAcres] = useState(1);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const incrementAcres = () => setQuarterAcres((prev) => Math.min(prev + 1, 20));
  const decrementAcres = () => setQuarterAcres((prev) => Math.max(prev - 1, 1));

  const total = calculateTotal(selectedServices, quarterAcres);
  const acreDisplay = (quarterAcres * 0.25).toFixed(2);

  const selectedServiceDetails = selectedServices.map((id) => {
    const service = services.find((s) => s.id === id)!;
    return {
      ...service,
      estimatedPrice: calculateServicePrice(service, quarterAcres),
    };
  });

  if (showRequestForm) {
    return (
      <ServiceRequestForm
        selectedServices={selectedServiceDetails}
        quarterAcres={quarterAcres}
        total={total}
        onBack={() => setShowRequestForm(false)}
      />
    );
  }

  return (
    <section id="estimator" className="py-20 md:py-28 section-gradient tech-grid">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            <Calculator className="w-4 h-4" />
            Instant Estimate
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get Your Free Estimate
          </h2>
          <p className="text-lg text-muted-foreground">
            Select your services and property size to see preliminary pricing instantly.
            All estimates are subject to on-site evaluation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
              1. Select Services
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const priceInfo = getPriceDisplay(service);
                return (
                  <Card
                    key={service.id}
                    className={`p-5 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-secondary bg-secondary/5 ring-2 ring-secondary/20"
                        : "hover:border-muted-foreground/30"
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2.5 rounded-lg transition-colors ${
                          isSelected
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <ServiceIcon icon={service.icon} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-heading font-semibold text-foreground">
                            {service.name}
                          </h4>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-secondary border-secondary"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-secondary-foreground" />}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {service.description}
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="font-heading font-bold text-lg text-foreground">
                            {priceInfo.price}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {priceInfo.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Property Size */}
            <div className="mt-8">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                2. Property Size
              </h3>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground mb-1">
                      Enter your property size in quarter-acre increments
                    </p>
                    <p className="text-sm text-muted-foreground">
                      (rounded up to the nearest ¼ acre)
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementAcres}
                      disabled={quarterAcres <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="text-center min-w-[100px]">
                      <div className="font-heading text-3xl font-bold text-foreground">
                        {acreDisplay}
                      </div>
                      <div className="text-sm text-muted-foreground">acres</div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementAcres}
                      disabled={quarterAcres >= 20}
                      className="h-10 w-10"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Estimate Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6 border-secondary/20 bg-card">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Your Estimate
              </h3>

              {selectedServices.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Select services to see your estimate</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {selectedServiceDetails.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between py-2 border-b border-border last:border-0"
                      >
                        <span className="text-foreground">{service.name}</span>
                        <span className="font-heading font-semibold">
                          ${service.estimatedPrice.toLocaleString()}
                          {service.isPerVisit && "+"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-border pt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-lg">
                        Estimated Total
                      </span>
                      <span className="font-heading font-bold text-2xl text-secondary">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      for {acreDisplay} acres
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-muted-foreground italic">
                      {DISCLAIMER_TEXT}
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowRequestForm(true)}
                  >
                    Request Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceEstimator;
