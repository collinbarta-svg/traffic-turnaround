import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { services, calculateServicePrice, calculateTotal, CONFIRMATION_MESSAGE, hasCustomEstimateRequired } from "@/lib/services";
import EstimateProgress from "@/components/estimate/EstimateProgress";
import ServiceSelection from "@/components/estimate/ServiceSelection";
import AddOnsNotes from "@/components/estimate/AddOnsNotes";
import ReviewSubmit from "@/components/estimate/ReviewSubmit";

// Services that get the full flow (frequency + notes step)
const FULL_FLOW_SERVICES = ["lawn-mowing", "snow-plowing", "fertilizer-weed-control"];

const EstimatePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pre-select service from URL param
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const validIds = services.map(s => s.id);
      if (validIds.includes(serviceParam)) {
        setSelectedServices(prev => prev.includes(serviceParam) ? prev : [serviceParam]);
      }
    }
  }, [searchParams]);
  const [quarterAcres, setQuarterAcres] = useState(2);
  const [address, setAddress] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [pricingAcknowledged, setPricingAcknowledged] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "phone",
    timeframe: "flexible",
  });

  // Determine if step 2 (frequency/notes) is needed
  const needsFullFlow = selectedServices.some(id => FULL_FLOW_SERVICES.includes(id));
  const totalSteps = needsFullFlow ? 3 : 2;

  // Map current step to logical step
  const getReviewStep = () => needsFullFlow ? 3 : 2;

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedServices.length > 0;
    if (currentStep === 2 && needsFullFlow) return true; // frequency/notes step is optional
    if (currentStep === getReviewStep()) {
      return (
        agreed &&
        pricingAcknowledged &&
        contactInfo.name.trim() &&
        contactInfo.email.trim() &&
        contactInfo.phone.trim()
      );
    }
    return false;
  };

  const handleNext = () => {
    if (currentStep < totalSteps && canProceed()) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);

    try {
      const estimatedTotal = calculateTotal(selectedServices, quarterAcres);
      
      const serviceDetails = selectedServices.map((id) => {
        const service = services.find((s) => s.id === id);
        return {
          id,
          name: service?.name,
          price: service ? calculateServicePrice(service, quarterAcres) : 0,
        };
      });

      const { error } = await supabase.from("service_requests").insert({
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: address,
        property_size_acres: quarterAcres * 0.25,
        services: {
          selected: serviceDetails,
          frequency,
          preferredContact: contactInfo.preferredContact,
          timeframe: contactInfo.timeframe,
          notes,
        },
        estimated_total: estimatedTotal,
        status: "new",
      });

      if (error) throw error;

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
          <div className="container flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <span className="font-heading font-bold text-secondary-foreground text-sm">MO</span>
            </div>
            <span className="font-heading font-semibold text-foreground hidden sm:block">
              Mason Outdoor Service LLC
            </span>
            </Link>
          </div>
        </header>

        <main className="container py-12 sm:py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Request Received!
            </h1>
            <p className="text-muted-foreground mb-8">
              {CONFIRMATION_MESSAGE}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/">Return Home</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:612-461-4022">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 612-461-4022
                </a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <span className="font-heading font-bold text-secondary-foreground text-sm">MO</span>
            </div>
            <span className="font-heading font-semibold text-foreground hidden sm:block">
              Mason Outdoor Service LLC
            </span>
          </Link>
          <a
            href="tel:612-461-4022"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">612-461-4022</span>
          </a>
        </div>
      </header>

      <main className="container py-6 sm:py-10">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <EstimateProgress currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          {/* Pre-selected service confirmation */}
          {currentStep === 1 && selectedServices.length > 0 && searchParams.get("service") && (
            <div className="mb-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <p className="text-sm text-foreground">
                <span className="font-medium">Selected service: </span>
                {services.filter(s => selectedServices.includes(s.id)).map(s => s.name).join(", ")}
              </p>
            </div>
          )}

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && (
              <ServiceSelection
                selectedServices={selectedServices}
                onToggleService={toggleService}
              />
            )}
            {currentStep === 2 && (
              <AddOnsNotes
                frequency={frequency}
                notes={notes}
                onFrequencyChange={setFrequency}
                onNotesChange={setNotes}
              />
            )}
            {currentStep === 3 && (
              <ReviewSubmit
                selectedServices={selectedServices}
                quarterAcres={quarterAcres}
                address={address}
                frequency={frequency}
                notes={notes}
                contactInfo={contactInfo}
                onContactInfoChange={setContactInfo}
                agreed={agreed}
                onAgreedChange={setAgreed}
                pricingAcknowledged={pricingAcknowledged}
                onPricingAcknowledgedChange={setPricingAcknowledged}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex-1 sm:flex-none"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < TOTAL_STEPS ? (
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 sm:flex-none bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex-1 sm:flex-none bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Live Estimate Preview (Step 1-3) */}
          {currentStep < 4 && selectedServices.length > 0 && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
                </span>
                {hasCustomEstimateRequired(selectedServices, quarterAcres * 0.25) ? (
                  <span className="text-sm font-medium text-accent">
                    Call for estimate
                  </span>
                ) : (
                  <span className="font-heading font-bold text-foreground">
                    Est. ${calculateTotal(selectedServices, quarterAcres)}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Estimated price based on public property data.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EstimatePage;
