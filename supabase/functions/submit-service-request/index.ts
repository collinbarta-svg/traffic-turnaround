import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ServiceRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  propertySizeAcres: number;
  services: { id: string; name: string; estimatedPrice: number }[];
  estimatedTotal: number;
  zapierWebhookUrl?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: ServiceRequest = await req.json();
    console.log("Received service request:", JSON.stringify(body, null, 2));

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.address) {
      throw new Error("Missing required fields");
    }

    // Insert into database
    const { data: insertedRequest, error: insertError } = await supabase
      .from("service_requests")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        property_size_acres: body.propertySizeAcres,
        services: body.services,
        estimated_total: body.estimatedTotal,
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error(`Failed to save request: ${insertError.message}`);
    }

    console.log("Service request saved:", insertedRequest.id);

    // If a Zapier webhook URL is provided, send notification
    if (body.zapierWebhookUrl) {
      try {
        console.log("Sending Zapier notification to:", body.zapierWebhookUrl);
        
        const zapierPayload = {
          request_id: insertedRequest.id,
          customer_name: body.name,
          customer_email: body.email,
          customer_phone: body.phone,
          property_address: body.address,
          property_size_acres: body.propertySizeAcres,
          services: body.services.map(s => s.name).join(", "),
          estimated_total: `$${body.estimatedTotal.toLocaleString()}`,
          submitted_at: new Date().toISOString(),
        };

        const zapierResponse = await fetch(body.zapierWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(zapierPayload),
        });

        console.log("Zapier response status:", zapierResponse.status);
      } catch (zapierError) {
        // Log but don't fail the request if Zapier notification fails
        console.error("Zapier notification failed:", zapierError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        requestId: insertedRequest.id,
        message: "Service request submitted successfully" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error processing service request:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
