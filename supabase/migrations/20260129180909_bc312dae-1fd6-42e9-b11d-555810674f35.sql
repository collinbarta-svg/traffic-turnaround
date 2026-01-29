-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create a table for service requests
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  property_size_acres NUMERIC NOT NULL,
  services JSONB NOT NULL,
  estimated_total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert service requests (public form)
CREATE POLICY "Anyone can submit service requests"
ON public.service_requests
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view service requests (for admin dashboard)
CREATE POLICY "Anyone can view service requests"
ON public.service_requests
FOR SELECT
USING (true);

-- Allow anyone to update service requests (for status changes)
CREATE POLICY "Anyone can update service requests"
ON public.service_requests
FOR UPDATE
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();