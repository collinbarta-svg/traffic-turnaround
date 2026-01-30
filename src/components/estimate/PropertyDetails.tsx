import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PropertyDetailsProps {
  address: string;
  quarterAcres: number;
  onAddressChange: (address: string) => void;
  onQuarterAcresChange: (quarterAcres: number) => void;
}

const PropertyDetails = ({
  address,
  quarterAcres,
  onAddressChange,
  onQuarterAcresChange,
}: PropertyDetailsProps) => {
  const acreDisplay = (quarterAcres * 0.25).toFixed(2);
  
  const sizeLabels = [
    { quarters: 1, label: "¼ acre", description: "Small lot" },
    { quarters: 2, label: "½ acre", description: "Average lot" },
    { quarters: 3, label: "¾ acre", description: "Large lot" },
    { quarters: 4, label: "1 acre", description: "Very large" },
    { quarters: 5, label: "1¼ acre", description: "Estate" },
    { quarters: 6, label: "1½ acre", description: "Estate+" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Property Details
        </h2>
        <p className="text-muted-foreground">
          Tell us about your property
        </p>
      </div>

      {/* Address Input */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-base font-medium">
          Property Address
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="address"
            type="text"
            placeholder="Enter your property address"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            className="pl-11 h-12 text-base"
          />
        </div>
      </div>

      {/* Property Size */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Property Size</Label>
          <span className="text-lg font-semibold text-secondary">
            {acreDisplay} acres
          </span>
        </div>

        <div className="px-2">
          <Slider
            value={[quarterAcres]}
            onValueChange={(value) => onQuarterAcresChange(value[0])}
            min={1}
            max={6}
            step={1}
            className="w-full"
          />
        </div>

        {/* Size quick select buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {sizeLabels.map((size) => (
            <button
              key={size.quarters}
              type="button"
              onClick={() => onQuarterAcresChange(size.quarters)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                quarterAcres === size.quarters
                  ? "border-secondary bg-secondary/10"
                  : "border-border hover:border-secondary/50"
              }`}
            >
              <div className="font-semibold text-sm text-foreground">
                {size.label}
              </div>
              <div className="text-xs text-muted-foreground hidden sm:block">
                {size.description}
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Don't know your lot size? We'll confirm during the on-site evaluation.
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;
