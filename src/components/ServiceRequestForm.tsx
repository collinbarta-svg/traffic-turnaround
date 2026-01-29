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
      <section className="py-20 md:py-28 section-gradient">
        <div className="container">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Request Submitted!
            </h2>
            <p className="text-muted-foreground mb-6">{CONFIRMATION_MESSAGE}</p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-2">
                Your Request Summary
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Property Size: {acreDisplay} acres</p>
                <p>Services: {selectedServices.map((s) => s.name).join(", ")}</p>
                <p>Estimated Total: ${total.toLocaleString()}</p>
              </div>
            </div>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start New Estimate
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 section-gradient">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Estimator
          </button>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Form */}
            <div className="md:col-span-3">
              <Card className="p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Request Service
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(612) 555-0123"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Property Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St, Minneapolis, MN 55401"
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-sm text-muted-foreground">{FULL_DISCLAIMER}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="disclaimer"
                      checked={disclaimerAccepted}
                      onCheckedChange={(checked) =>
                        setDisclaimerAccepted(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="disclaimer"
                      className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
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
            <div className="md:col-span-2">
              <Card className="p-6 sticky top-24">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Property Size</span>
                    <span className="font-medium">{acreDisplay} acres</span>
                  </div>
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between py-2 border-b border-border text-sm"
                    >
                      <span className="text-foreground">{service.name}</span>
                      <span className="font-medium">
                        ${service.estimatedPrice.toLocaleString()}
                        {service.isPerVisit && "+"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-heading font-semibold">Estimated Total</span>
                    <span className="font-heading font-bold text-xl text-secondary">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
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
