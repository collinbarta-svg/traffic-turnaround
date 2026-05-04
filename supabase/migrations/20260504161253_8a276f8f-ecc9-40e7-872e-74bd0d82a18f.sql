-- Lock down service_requests: keep public INSERT (estimate form), remove public SELECT/UPDATE
DROP POLICY IF EXISTS "Anyone can view service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Anyone can update service requests" ON public.service_requests;