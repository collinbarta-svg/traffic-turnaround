import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Smartphone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

const InvoicePage = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const fetchInvoice = async () => {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      console.error(error);
    } else {
      setInvoice(data);
      setIsPaid(data.status === "paid");
    }
    setIsLoading(false);
  };

  const handlePayment = async () => {
    if (!invoice) return;

    setIsPaying(true);
    
    // Demo mode: simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { error } = await supabase
      .from("invoices")
      .update({ 
        status: "paid", 
        paid_at: new Date().toISOString() 
      })
      .eq("id", invoice.id);

    setIsPaying(false);

    if (error) {
      toast.error("Payment failed. Please try again.");
    } else {
      setIsPaid(true);
      toast.success("Payment successful!");
    }
  };

  const serviceLabels: Record<string, string> = {
    lawn_care: "Lawn Care",
    snow_removal: "Snow Removal",
    landscaping: "Landscaping",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h1 className="text-xl font-semibold mb-2">Invoice Not Found</h1>
            <p className="text-muted-foreground">
              This invoice doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-600">Payment Complete!</h1>
              <p className="text-muted-foreground mt-2">
                Thank you for your payment of ${Math.round(Number(invoice.amount)).toLocaleString()}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p className="font-medium">{invoice.invoice_number}</p>
              <p className="text-muted-foreground">{serviceLabels[invoice.service_type]}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              A confirmation has been sent. Keep this page for your records.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6 space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-4">
            <h1 className="font-heading text-xl font-bold text-foreground">
              West Metro<span className="text-primary"> Snow Plowing</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Lawn Care • Snow Removal • Landscaping
            </p>
          </div>

          {/* Invoice Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Invoice</p>
                <p className="font-mono text-sm">{invoice.invoice_number}</p>
              </div>
              <Badge variant="secondary">Due Today</Badge>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer</span>
                <span className="font-medium">{invoice.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{serviceLabels[invoice.service_type]}</span>
              </div>
              {invoice.job_description && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{invoice.job_description}</p>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{new Date(invoice.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Total */}
            <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Due</p>
              <p className="text-4xl font-bold text-foreground">
                ${Math.round(Number(invoice.amount)).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Payment Button */}
          <Button 
            size="lg" 
            className="w-full h-14 text-lg font-semibold gap-2"
            onClick={handlePayment}
            disabled={isPaying}
          >
            {isPaying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Pay Now
              </>
            )}
          </Button>

          {/* Payment Methods Note */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Secure payment powered by Stripe
            </p>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <CreditCard className="w-5 h-5" />
              <Smartphone className="w-5 h-5" />
              <span className="text-xs">Apple Pay • Google Pay</span>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            <strong>Demo Mode:</strong> This is a test invoice. No real payment will be processed.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicePage;
