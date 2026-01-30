import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddOnsNotesProps {
  frequency: string;
  notes: string;
  onFrequencyChange: (frequency: string) => void;
  onNotesChange: (notes: string) => void;
}

const frequencyOptions = [
  { value: "one-time", label: "One-Time Service", description: "Single visit" },
  { value: "weekly", label: "Weekly", description: "Best for lawn care" },
  { value: "bi-weekly", label: "Bi-Weekly", description: "Every 2 weeks" },
  { value: "monthly", label: "Monthly", description: "Light maintenance" },
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
      </div>

      {/* Special Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-base font-medium">
          Special Requests or Notes
        </Label>
        <Textarea
          id="notes"
          placeholder="Tell us anything else we should know about your property or service needs. For example: 'Gate code is 1234', 'Please avoid flower beds', 'Need brush cleanup quote', etc."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[120px] text-base resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Optional — but helpful for providing an accurate quote
        </p>
      </div>
    </div>
  );
};

export default AddOnsNotes;
