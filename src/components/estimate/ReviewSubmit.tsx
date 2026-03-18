import { useState } from "react";
import { Check, Phone, Mail, MapPin, User, Clock, AlertCircle, Info, Droplets } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { services, calculateServicePrice, FULL_DISCLAIMER, getEstimateTier, hasCustomEstimateRequired } from "@/lib/services";

interface ReviewSubmitProps {
  selectedServices: string[];
  quarterAcres: number;
  address: string;
  frequency: string;
  notes: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    preferredContact: string;
    timeframe: string;
  };
  onContactInfoChange: (info: ReviewSubmitProps["contactInfo"]) => void;
  agreed: boolean;
  onAgreedChange: (agreed: boolean) => void;
  pricingAcknowledged: boolean;
  onPricingAcknowledgedChange: (val: boolean) => void;
  isProjectService?: boolean;
}

const timeframeOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "this-week", label: "This week" },
  { value: "next-week", label: "Next week" },
  { value: "flexible", label: "Flexible / No rush" },
];

const ReviewSubmit = ({
  selectedServices,
  quarterAcres,
  address,
  frequency,
  notes,
  contactInfo,
  onContactInfoChange,
  agreed,
  onAgreedChange,
  pricingAcknowledged,
  onPricingAcknowledgedChange,
  isProjectService = false,
}: ReviewSubmitProps) => {
  const selectedServiceDetails = services.filter((s) =>
    selectedServices.includes(s.id)
  );

  const total = selectedServiceDetails.reduce(
    (sum, service) => sum + calculateServicePrice(service, quarterAcres),
    0
  );

  const acres = quarterAcres * 0.25;
  const acreDisplay = acres.toFixed(2);
  const anyCustom = hasCustomEstimateRequired(selectedServices, acres);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">
          {isProjectService ? "Request an Estimate" : "Review & Submit"}
        </h2>
        <p className="text-primary-foreground/60">
          {isProjectService
            ? "Submit your info and we'll get back to you with pricing"
            : "Confirm your details and get your estimate"}
        </p>
      </div>

      {/* Project service messaging */}
      {isProjectService && (
        <div className="flex items-start gap-3 p-4 bg-secondary/15 rounded-xl border border-secondary/25">
          <Info className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-primary-foreground/80 leading-relaxed">
            Many landscaping services require a quick review of the property before pricing. Submit your information and we will contact you with an estimate.
          </p>
        </div>
      )}

      {/* Estimate Summary Card */}
      <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-4 sm:p-6 space-y-4">
        <h3 className="font-heading font-semibold text-lg text-primary-foreground">
          Your Estimate Summary
        </h3>

        {/* Property Info */}
        <div className="flex items-start gap-3 pb-4 border-b border-primary-foreground/10">
          <MapPin className="w-5 h-5 text-secondary mt-0.5" />
          <div>
            <p className="font-medium text-primary-foreground">
              {address || "Address not provided"}
            </p>
            <p className="text-sm text-primary-foreground/50">
              {acreDisplay} acres • {frequency.replace("-", " ")}
            </p>
          </div>
        </div>

        {/* Services Breakdown with Tiers */}
        <div className="space-y-3">
          {selectedServiceDetails.map((service) => {
            const tier = getEstimateTier(service.id, acres);
            return (
              <div key={service.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary" />
                  <span className="text-primary-foreground">{service.name}</span>
                </div>
                <span className={`text-sm font-medium ${tier.requiresCustom ? "text-secondary" : "text-primary-foreground/50"}`}>
                  {tier.requiresCustom ? "Call for estimate" : tier.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Estimate notice */}
        <div className="pt-4 border-t border-primary-foreground/10">
          <div className="flex items-start gap-2 p-3 bg-secondary/15 rounded-lg">
            <Info className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-primary-foreground/80">
              {anyCustom
                ? "One or more services require a phone estimate. Call us at 612-461-4022 or we'll follow up after submission."
                : "Estimated price based on public property data. Final pricing will be confirmed before service."}
            </p>
          </div>
        </div>

        {/* Notes if any */}
        {notes && (
          <div className="pt-4 border-t border-primary-foreground/10">
            <p className="text-sm text-primary-foreground/50">
              <span className="font-medium text-primary-foreground/70">Notes:</span> {notes}
            </p>
          </div>
        )}
      </div>

      {/* Lawn Watering Notice */}
      {selectedServices.some(id => ["lawn-mowing", "fertilizer-weed-control", "dethatching", "aerating"].includes(id)) && (
        <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Droplets className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-heading font-semibold text-primary-foreground text-sm">Weekly Service Schedule</p>
              <p className="text-sm text-primary-foreground/50 mt-1">
                Lawns that are regularly maintained are typically serviced on a weekly schedule. Our routes run weekly to keep lawns looking their best.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-primary-foreground">
          Your Contact Information
        </h3>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary-foreground">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={contactInfo.name}
                onChange={(e) =>
                  onContactInfoChange({ ...contactInfo, name: e.target.value })
                }
                className="pl-10 h-11 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary-foreground">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(612) 555-0123"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    onContactInfoChange({ ...contactInfo, phone: e.target.value })
                  }
                  className="pl-10 h-11 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={contactInfo.email}
                  onChange={(e) =>
                    onContactInfoChange({ ...contactInfo, email: e.target.value })
                  }
                  className="pl-10 h-11 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30"
                  required
                />
              </div>
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <Label className="text-primary-foreground">Preferred Contact Method</Label>
            <RadioGroup
              value={contactInfo.preferredContact}
              onValueChange={(value) =>
                onContactInfoChange({ ...contactInfo, preferredContact: value })
              }
              className="flex gap-4"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="phone" className="border-primary-foreground/30 text-secondary" />
                <span className="text-sm text-primary-foreground">Phone</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="email" className="border-primary-foreground/30 text-secondary" />
                <span className="text-sm text-primary-foreground">Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="text" className="border-primary-foreground/30 text-secondary" />
                <span className="text-sm text-primary-foreground">Text</span>
              </label>
            </RadioGroup>
          </div>

          {/* Timeframe */}
          <div className="space-y-2">
            <Label className="text-primary-foreground">When do you need service?</Label>
            <div className="grid grid-cols-2 gap-2">
              {timeframeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    onContactInfoChange({
                      ...contactInfo,
                      timeframe: option.value,
                    })
                  }
                  className={`p-3 rounded-lg border-2 text-sm text-left transition-all ${
                    contactInfo.timeframe === option.value
                      ? "border-secondary bg-secondary/15 text-primary-foreground"
                      : "border-primary-foreground/15 hover:border-secondary/50 text-primary-foreground/70"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review notice */}
      <p className="text-sm text-secondary font-medium text-center">
        Please review and check both boxes below before submitting your request.
      </p>

      {/* Pricing Acknowledgment Checkbox */}
      <div className="flex items-start gap-3 p-4 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
        <Checkbox
          id="pricing-acknowledgment"
          checked={pricingAcknowledged}
          onCheckedChange={(checked) => onPricingAcknowledgedChange(checked as boolean)}
          className="mt-0.5 border-primary-foreground/30"
        />
        <Label
          htmlFor="pricing-acknowledgment"
          className="text-sm text-primary-foreground/60 leading-relaxed cursor-pointer"
        >
          This is an estimated price. Final pricing is confirmed after an on-site
          assessment and follow-up. No work is performed without your approval.
        </Label>
      </div>

      {/* Agreement Checkbox */}
      <div className="flex items-start gap-3 p-4 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
        <Checkbox
          id="agreement"
          checked={agreed}
          onCheckedChange={(checked) => onAgreedChange(checked as boolean)}
          className="mt-0.5 border-primary-foreground/30"
        />
        <Label
          htmlFor="agreement"
          className="text-sm text-primary-foreground/60 leading-relaxed cursor-pointer"
        >
          By submitting, you understand that all prices are estimates, do not
          include sales tax, and that final pricing will be determined after an
          on-site evaluation. No work will be performed without your approval of
          the final estimate.
        </Label>
      </div>
    </div>
  );
};

export default ReviewSubmit;
