import { useState } from "react";
import { ArrowLeft, Phone, Send, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import sodFinished from "@/assets/projects/sod-finished-lawn.jpg";

const SodEstimatePage = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    yardSize: "",
    currentCondition: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, phone, and address.",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Request Sent!",
      description: "We'll be in touch soon with your sod estimate.",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center shadow-xl">
          <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Request Received!
          </h2>
          <p className="text-muted-foreground mb-6">
            Thanks, {form.name}! We'll review your sod project details and reach out within 1–2 business days with an estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <a href="/">Back to Home</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:612-461-4022">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="hero-gradient">
        <div className="container py-6">
          <a href="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="Mason Outdoor Service LLC" className="w-14 h-14 rounded-xl object-cover shadow-lg" />
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                Sod Installation Estimate
              </h1>
              <p className="text-primary-foreground/70 text-sm sm:text-base">
                Tell us about your project and we'll provide a custom quote
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8 sm:py-12">
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                <h3 className="font-heading font-semibold text-lg text-foreground">Your Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="John Smith" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="(612) 555-1234" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Property Address *</Label>
                  <Input id="address" placeholder="123 Main St, St. Michael, MN" value={form.address} onChange={(e) => handleChange("address", e.target.value)} />
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                <h3 className="font-heading font-semibold text-lg text-foreground">Project Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Approximate Yard Size</Label>
                    <Select value={form.yardSize} onValueChange={(v) => handleChange("yardSize", v)}>
                      <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (under 2,000 sq ft)</SelectItem>
                        <SelectItem value="medium">Medium (2,000–5,000 sq ft)</SelectItem>
                        <SelectItem value="large">Large (5,000–10,000 sq ft)</SelectItem>
                        <SelectItem value="xlarge">Extra Large (10,000+ sq ft)</SelectItem>
                        <SelectItem value="unsure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Current Lawn Condition</Label>
                    <Select value={form.currentCondition} onValueChange={(v) => handleChange("currentCondition", v)}>
                      <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bare">Bare dirt / no lawn</SelectItem>
                        <SelectItem value="patchy">Patchy — needs full replacement</SelectItem>
                        <SelectItem value="weedy">Overgrown with weeds</SelectItem>
                        <SelectItem value="new-construction">New construction</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any details about your project — grading needs, obstacles, timeline preferences, etc."
                    rows={4}
                    value={form.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Request Sod Estimate
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <a href="tel:612-461-4022">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Instead
                  </a>
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl overflow-hidden border border-border">
              <img src={sodFinished} alt="Finished sod installation" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-secondary" />
                <h3 className="font-heading font-semibold text-foreground">What's Included</h3>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  Full ground prep with compact track loader & tiller
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  Grading and soil leveling
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  Premium sod delivery & installation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  Initial watering & care instructions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  Cleanup of all debris
                </li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-xl p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Prefer to talk?</p>
              <a href="tel:612-461-4022" className="font-heading font-bold text-lg text-foreground hover:text-secondary transition-colors">
                612-461-4022
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SodEstimatePage;
