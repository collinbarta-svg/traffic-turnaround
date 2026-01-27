-- Create invoices table
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  service_type TEXT NOT NULL CHECK (service_type IN ('lawn_care', 'snow_removal', 'landscaping')),
  job_description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date DATE NOT NULL DEFAULT CURRENT_DATE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but allow public access for customer invoice viewing)
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view invoices by ID (for customer payment links)
CREATE POLICY "Anyone can view invoices" 
ON public.invoices 
FOR SELECT 
USING (true);

-- Allow anyone to insert invoices (admin access via direct URL)
CREATE POLICY "Anyone can create invoices" 
ON public.invoices 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update invoices (for status changes)
CREATE POLICY "Anyone can update invoices" 
ON public.invoices 
FOR UPDATE 
USING (true);

-- Create function to generate invoice numbers
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.invoice_number := 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate invoice numbers
CREATE TRIGGER set_invoice_number
BEFORE INSERT ON public.invoices
FOR EACH ROW
WHEN (NEW.invoice_number IS NULL OR NEW.invoice_number = '')
EXECUTE FUNCTION public.generate_invoice_number();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_invoice_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_invoices_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW
EXECUTE FUNCTION public.update_invoice_updated_at();

-- Enable realtime for invoice status updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.invoices;