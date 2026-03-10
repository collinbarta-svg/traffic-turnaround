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
  { value: "weekly", label: "Weekly Service", description: "Recommended for maintained lawns" },
  { value: "one-time", label: "One-Time Service", description: "Single visit" },
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
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Additional Details
        </h2>
        <p className="text-muted-foreground">
          Help us understand your needs better
        </p>
      </div>

      {/* Service Frequency */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Preferred Service Frequency</Label>
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
                  ? "border-secondary bg-secondary/5"
                  : "border-border hover:border-secondary/50"
              }`}
            >
              <RadioGroupItem value={option.value} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-foreground">{option.label}</div>
                <div className="text-sm text-muted-foreground">
                  {option.description}
                </div>
              </div>
            </label>
          ))}
        </RadioGroup>

        {/* Scheduling note */}
        <div className="flex items-start gap-2 p-3 bg-secondary/10 rounded-lg">
          <Info className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">
            Our lawn maintenance routes run on a weekly schedule to keep lawns looking their best. Lawns that are regularly maintained are typically serviced weekly.
          </p>
        </div>
      </div>

      {/* Special Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-base font-medium">
          Notes & Special Instructions
        </Label>
        <Textarea
          id="notes"
          placeholder={"Include any helpful details such as:\n• Gate access codes or entry instructions\n• Lawn conditions or problem areas\n• Areas needing extra attention\n• Pet waste status\n• Any other special requests"}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[140px] text-base resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Optional — but helpful for providing accurate service
        </p>
      </div>

      {/* Waste Policy */}
      <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg border border-border">
        <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Pet Waste Policy:</span> Lawns containing animal waste must be cleaned prior to service. Lawns with excessive animal waste may not be serviced and may incur a $50 fee.
        </p>
      </div>
    </div>
  );
};

export default AddOnsNotes;
