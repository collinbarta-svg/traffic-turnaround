import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info } from "lucide-react";

interface AddOnsNotesProps {
  frequency: string;
  notes: string;
  onFrequencyChange: (frequency: string) => void;
  onNotesChange: (notes: string) => void;
}

const frequencyOptions = [
  { value: "weekly", label: "Weekly Service", description: "Recommended for best results" },
  { value: "bi-weekly", label: "Bi-Weekly Service", description: "Every other week" },
  { value: "seasonal", label: "Seasonal", description: "Per season contract" },
];

const AddOnsNotes = ({
  frequency,
  notes,
  onFrequencyChange,
  onNotesChange,
}: AddOnsNotesProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">
          Additional Details
        </h2>
        <p className="text-primary-foreground/60">
          Help us understand your needs better
        </p>
      </div>

      {/* Service Frequency */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-primary-foreground">Preferred Service Frequency</Label>
        <RadioGroup
          value={frequency}
          onValueChange={onFrequencyChange}
          className="grid gap-3"
        >
          {frequencyOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                frequency === option.value
                  ? "border-secondary bg-secondary/15"
                  : "border-primary-foreground/15 hover:border-secondary/50"
              }`}
            >
              <RadioGroupItem value={option.value} className="flex-shrink-0 border-primary-foreground/30 text-secondary" />
              <div className="flex-1">
                <div className="font-medium text-primary-foreground">{option.label}</div>
                <div className="text-sm text-primary-foreground/50">
                  {option.description}
                </div>
              </div>
            </label>
          ))}
        </RadioGroup>

        {/* Scheduling note */}
        <div className="flex items-start gap-2 p-3 bg-secondary/15 rounded-lg border border-secondary/25">
          <Info className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-primary-foreground/80">
            Our lawn maintenance routes run on a weekly schedule to keep lawns looking their best. Lawns that are regularly maintained are typically serviced weekly.
          </p>
        </div>
      </div>

      {/* Special Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-base font-medium text-primary-foreground">
          Notes & Special Instructions
        </Label>
        <Textarea
          id="notes"
          placeholder={"Include any helpful details such as:\n• Gate access codes or entry instructions\n• Lawn conditions or problem areas\n• Areas needing extra attention\n• Pet waste status\n• Any other special requests"}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[140px] text-base resize-none bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30"
        />
        <p className="text-xs text-primary-foreground/50">
          Optional — but helpful for providing accurate service
        </p>
      </div>

      {/* Waste Policy */}
      <div className="flex items-start gap-2 p-3 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
        <Info className="w-4 h-4 text-primary-foreground/40 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-primary-foreground/60">
          <span className="font-medium text-primary-foreground">Pet Waste Policy:</span> Lawns containing animal waste must be cleaned prior to service. Lawns with excessive animal waste may not be serviced and may incur a $50 fee.
        </p>
      </div>
    </div>
  );
};

export default AddOnsNotes;
