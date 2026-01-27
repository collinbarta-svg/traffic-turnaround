import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, MoreVertical, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Database } from "@/integrations/supabase/types";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

interface InvoiceListProps {
  invoices: Invoice[];
  isLoading: boolean;
  onRefresh: () => void;
}

const InvoiceList = ({ invoices, isLoading, onRefresh }: InvoiceListProps) => {
  const copyLink = async (id: string) => {
    const url = `${window.location.origin}/invoice/${id}`;
    await navigator.clipboard.writeText(url);
    toast.success("Invoice link copied!");
  };

  const updateStatus = async (id: string, status: "pending" | "paid" | "overdue") => {
    const updateData: { status: string; paid_at?: string | null } = { status };
    if (status === "paid") {
      updateData.paid_at = new Date().toISOString();
    } else {
      updateData.paid_at = null;
    }

    const { error } = await supabase
      .from("invoices")
      .update(updateData)
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Invoice marked as ${status}`);
      onRefresh();
    }
  };

  const serviceLabels: Record<string, string> = {
    lawn_care: "Lawn Care",
    snow_removal: "Snow Removal",
    landscaping: "Landscaping",
  };

  const statusConfig = {
    pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
    paid: { label: "Paid", variant: "default" as const, icon: CheckCircle },
    overdue: { label: "Overdue", variant: "destructive" as const, icon: AlertCircle },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No invoices yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {invoices.map((invoice) => {
        const status = statusConfig[invoice.status as keyof typeof statusConfig];
        const StatusIcon = status.icon;
        
        return (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-medium truncate">{invoice.customer_name}</span>
                <Badge variant={status.variant} className="gap-1 text-xs">
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{serviceLabels[invoice.service_type]}</span>
                <span>•</span>
                <span className="font-mono">{invoice.invoice_number}</span>
                <span>•</span>
                <span>{new Date(invoice.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">
                ${Number(invoice.amount).toFixed(2)}
              </span>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyLink(invoice.id)}
                  title="Copy invoice link"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(`/invoice/${invoice.id}`, '_blank')}
                  title="View invoice"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateStatus(invoice.id, "pending")}>
                      <Clock className="w-4 h-4 mr-2" />
                      Mark Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateStatus(invoice.id, "paid")}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Paid
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateStatus(invoice.id, "overdue")}>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Mark Overdue
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceList;
