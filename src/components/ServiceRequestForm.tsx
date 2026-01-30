import { useState } from "react";
import { ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FULL_DISCLAIMER, CONFIRMATION_MESSAGE, type Service } from "@/lib/services";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ServiceRequestFormProps {
  selectedServices: (Service & { estimatedPrice: number })[];
  quarterAcres: number;
  total: number;
  onBack: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  address: z.string().min(5, "Please enter a complete address").max(200),
});

// Zapier webhook URL - can be configured here
const ZAPIER_WEBHOOK_URL = "";

const ServiceRequestForm = ({
  selectedServices,
  quarterAcres,
  total,
  onBack,
}: ServiceRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const acreDisplay = (quarterAcres * 0.25).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!disclaimerAccepted) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-service-request", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          propertySizeAcres: quarterAcres * 0.25,
          services: selectedServices.map((s) => ({
            id: s.id,
            name: s.name,
            estimatedPrice: s.estimatedPrice,
          })),
          estimatedTotal: total,
          zapierWebhookUrl: ZAPIER_WEBHOOK_URL || undefined,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log("Service request submitted:", data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting service request:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-12 sm:py-20 md:py-28 section-gradient">
        <div className="container">
          <Card className="max-w-2xl mx-auto p-5 sm:p-8 text-center">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="w-6 sm:w-8 h-6 sm:h-8 text-secondary" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Request Submitted!
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{CONFIRMATION_MESSAGE}</p>
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-2 text-sm sm:text-base">
                Your Request Summary
              </h4>
              <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <p>Property Size: {acreDisplay} acres</p>
                <p>Services: {selectedServices.map((s) => s.name).join(", ")}</p>
                <p>Estimated Total: ${total.toLocaleString()}</p>
              </div>
            </div>
            <Button onClick={onBack} variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start New Estimate
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 md:py-28 section-gradient">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Estimator
          </button>

          <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
            {/* Form */}
            <div className="md:col-span-3">
              <Card className="p-4 sm:p-6 md:p-8">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                  Request Service
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-sm sm:text-base">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className={`mt-1.5 ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-xs sm:text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm sm:text-base">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`mt-1.5 ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-xs sm:text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(612) 555-0123"
                      className={`mt-1.5 ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone && (
                      <p className="text-xs sm:text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm sm:text-base">Property Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St, Minneapolis, MN 55401"
                      className={`mt-1.5 ${errors.address ? "border-destructive" : ""}`}
                    />
                    {errors.address && (
                      <p className="text-xs sm:text-sm text-destructive mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-xs sm:text-sm text-muted-foreground">{FULL_DISCLAIMER}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <Checkbox
                      id="disclaimer"
                      checked={disclaimerAccepted}
                      onCheckedChange={(checked) =>
                        setDisclaimerAccepted(checked as boolean)
                      }
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="disclaimer"
                      className="text-xs sm:text-sm text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      I understand that all prices are estimates, do not include sales
                      tax, and that final pricing will be determined after an on-site
                      evaluation. I agree that no work will be performed without my
                      approval of the final estimate.
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!disclaimerAccepted || isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Request
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Summary */}
            <div className="md:col-span-2 order-first md:order-last">
              <Card className="p-4 sm:p-6 md:sticky md:top-24">
                <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                  Order Summary
                </h3>

                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Property Size</span>
                    <span className="font-medium">{acreDisplay} acres</span>
                  </div>
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between py-2 border-b border-border text-xs sm:text-sm"
                    >
                      <span className="text-foreground">{service.name}</span>
                      <span className="font-medium">
                        ${service.estimatedPrice.toLocaleString()}
                        {service.isPerVisit && "+"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-border pt-3 sm:pt-4">
                  <div className="flex justify-between">
                    <span className="font-heading font-semibold text-sm sm:text-base">Estimated Total</span>
                    <span className="font-heading font-bold text-lg sm:text-xl text-secondary">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 italic">
                    * Estimate only. Final pricing determined after on-site evaluation.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceRequestForm;
