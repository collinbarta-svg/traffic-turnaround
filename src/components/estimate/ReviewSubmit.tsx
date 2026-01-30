import { useState } from "react";
import { Check, Phone, Mail, MapPin, User, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { services, calculateServicePrice, FULL_DISCLAIMER } from "@/lib/services";

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
}: ReviewSubmitProps) => {
  const selectedServiceDetails = services.filter((s) =>
    selectedServices.includes(s.id)
  );

  const total = selectedServiceDetails.reduce(
    (sum, service) => sum + calculateServicePrice(service, quarterAcres),
    0
  );

  const acreDisplay = (quarterAcres * 0.25).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Review & Submit
        </h2>
        <p className="text-muted-foreground">
          Confirm your details and get your estimate
        </p>
      </div>

      {/* Estimate Summary Card */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Your Estimate Summary
        </h3>

        {/* Property Info */}
        <div className="flex items-start gap-3 pb-4 border-b border-border">
          <MapPin className="w-5 h-5 text-secondary mt-0.5" />
          <div>
            <p className="font-medium text-foreground">
              {address || "Address not provided"}
            </p>
            <p className="text-sm text-muted-foreground">
              {acreDisplay} acres • {frequency.replace("-", " ")}
            </p>
          </div>
        </div>

        {/* Services Breakdown */}
        <div className="space-y-3">
          {selectedServiceDetails.map((service) => {
            const price = calculateServicePrice(service, quarterAcres);
            return (
              <div
                key={service.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary" />
                  <span className="text-foreground">{service.name}</span>
                </div>
                <span className="font-semibold text-foreground">${price}</span>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-lg text-foreground">
              Estimated Total
            </span>
            <span className="font-heading font-bold text-2xl text-secondary">
              ${total}
            </span>
          </div>
          {frequency === "weekly" && (
            <p className="text-xs text-muted-foreground mt-1">
              *Per service visit
            </p>
          )}
        </div>

        {/* Notes if any */}
        {notes && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Notes:</span> {notes}
            </p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
        <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-muted-foreground">
          This is an estimated price. Final pricing is confirmed after an on-site
          assessment and follow-up. No work is performed without your approval.
        </p>
      </div>

      {/* Contact Form */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Your Contact Information
        </h3>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={contactInfo.name}
                onChange={(e) =>
                  onContactInfoChange({ ...contactInfo, name: e.target.value })
                }
                className="pl-10 h-11"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(612) 555-0123"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    onContactInfoChange({ ...contactInfo, phone: e.target.value })
                  }
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={contactInfo.email}
                  onChange={(e) =>
                    onContactInfoChange({ ...contactInfo, email: e.target.value })
                  }
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <Label>Preferred Contact Method</Label>
            <RadioGroup
              value={contactInfo.preferredContact}
              onValueChange={(value) =>
                onContactInfoChange({ ...contactInfo, preferredContact: value })
              }
              className="flex gap-4"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="phone" />
                <span className="text-sm">Phone</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="email" />
                <span className="text-sm">Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="text" />
                <span className="text-sm">Text</span>
              </label>
            </RadioGroup>
          </div>

          {/* Timeframe */}
          <div className="space-y-2">
            <Label>When do you need service?</Label>
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
                      ? "border-secondary bg-secondary/10"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
        <Checkbox
          id="agreement"
          checked={agreed}
          onCheckedChange={(checked) => onAgreedChange(checked as boolean)}
          className="mt-0.5"
        />
        <Label
          htmlFor="agreement"
          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
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
