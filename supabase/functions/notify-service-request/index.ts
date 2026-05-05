import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const OWNER_EMAIL = "masonoutdoorservicesllc@gmail.com";

interface ServiceItem {
  id?: string;
  name?: string;
  price?: number;
}

interface NotifyRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  propertySizeAcres: number;
  services: ServiceItem[];
  frequency?: string;
  timeframe?: string;
  notes?: string;
  estimatedTotal: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: NotifyRequest = await req.json();
    console.log("Notifying owner of new service request from", body.email);

    const servicesHtml = (body.services || [])
      .map(
        (s) =>
          `<tr><td style="padding:6px 0;color:#374151;">${s.name ?? s.id ?? ""}</td><td style="padding:6px 0;text-align:right;color:#111827;font-weight:600;">$${(s.price ?? 0).toLocaleString()}</td></tr>`
      )
      .join("");

    const emailResponse = await resend.emails.send({
      from: "Mason Outdoor Service <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      reply_to: body.email,
      subject: `New Service Request — ${body.name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f5f5f5;padding:20px;">
          <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.08);">
            <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:20px 24px;color:#fff;">
              <h1 style="margin:0;font-size:18px;">New Service Request</h1>
              <p style="margin:4px 0 0;font-size:12px;opacity:.8;">Mason Outdoor Service</p>
            </div>
            <div style="padding:24px;">
              <h2 style="font-size:16px;margin:0 0 12px;color:#111827;">Customer</h2>
              <p style="margin:0 0 4px;color:#374151;"><strong>${body.name}</strong></p>
              <p style="margin:0 0 4px;color:#374151;">📞 <a href="tel:${body.phone}" style="color:#1e40af;text-decoration:none;">${body.phone}</a></p>
              <p style="margin:0 0 4px;color:#374151;">✉️ <a href="mailto:${body.email}" style="color:#1e40af;text-decoration:none;">${body.email}</a></p>
              <p style="margin:0 0 16px;color:#374151;">📍 ${body.address || "—"}</p>

              <h2 style="font-size:16px;margin:16px 0 8px;color:#111827;">Property</h2>
              <p style="margin:0 0 4px;color:#374151;">Size: <strong>${body.propertySizeAcres.toFixed(2)} acres</strong></p>
              ${body.frequency ? `<p style="margin:0 0 4px;color:#374151;">Frequency: ${body.frequency}</p>` : ""}
              ${body.timeframe ? `<p style="margin:0 0 4px;color:#374151;">Timeframe: ${body.timeframe}</p>` : ""}

              <h2 style="font-size:16px;margin:16px 0 8px;color:#111827;">Services Requested</h2>
              <table style="width:100%;border-collapse:collapse;">${servicesHtml}</table>
              <div style="border-top:1px solid #e5e7eb;margin-top:12px;padding-top:12px;display:flex;justify-content:space-between;">
                <span style="font-weight:600;color:#111827;">Estimated Total</span>
                <span style="font-weight:700;color:#1e40af;">$${body.estimatedTotal.toLocaleString()}</span>
              </div>

              ${body.notes ? `<h2 style="font-size:16px;margin:16px 0 8px;color:#111827;">Notes</h2><p style="margin:0;color:#374151;white-space:pre-wrap;">${body.notes}</p>` : ""}
            </div>
          </div>
        </div>
      `,
    });

    console.log("Owner notification sent:", emailResponse);

    // Customer confirmation email
    try {
      const customerResponse = await resend.emails.send({
        from: "Mason Outdoor Service <onboarding@resend.dev>",
        to: [body.email],
        reply_to: OWNER_EMAIL,
        subject: "We received your service request — Mason Outdoor Service",
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f5f5f5;padding:20px;">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.08);">
              <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:24px;color:#fff;text-align:center;">
                <h1 style="margin:0;font-size:20px;">Thanks, ${body.name}!</h1>
                <p style="margin:6px 0 0;font-size:13px;opacity:.85;">We've received your service request</p>
              </div>
              <div style="padding:24px;color:#374151;">
                <p style="margin:0 0 16px;font-size:14px;">
                  Thanks for reaching out to Mason Outdoor Service. A team member will review your request and contact you shortly to confirm details and schedule an on-site evaluation.
                </p>

                <h2 style="font-size:15px;margin:20px 0 8px;color:#111827;">Your Request Summary</h2>
                <p style="margin:0 0 4px;font-size:14px;">📍 ${body.address || "—"}</p>
                <p style="margin:0 0 12px;font-size:14px;">Property size: <strong>${body.propertySizeAcres.toFixed(2)} acres</strong></p>

                <h3 style="font-size:14px;margin:16px 0 6px;color:#111827;">Services</h3>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">${servicesHtml}</table>
                <div style="border-top:1px solid #e5e7eb;margin-top:12px;padding-top:12px;display:flex;justify-content:space-between;">
                  <span style="font-weight:600;color:#111827;">Estimated Total</span>
                  <span style="font-weight:700;color:#1e40af;">$${body.estimatedTotal.toLocaleString()}</span>
                </div>

                <p style="margin:20px 0 0;font-size:12px;color:#6b7280;font-style:italic;">
                  This is a preliminary estimate based on the information provided. Final pricing is confirmed after an on-site evaluation. No work is performed without your approval.
                </p>

                <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center;">
                  <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Questions? Call us anytime</p>
                  <a href="tel:612-461-4022" style="font-size:18px;font-weight:700;color:#1e40af;text-decoration:none;">612-461-4022</a>
                </div>
              </div>
              <div style="background:#f9fafb;padding:14px 24px;text-align:center;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;color:#6b7280;">Mason Outdoor Service LLC • Saint Michael, MN</p>
              </div>
            </div>
          </div>
        `,
      });
      console.log("Customer confirmation sent:", customerResponse);
    } catch (custErr) {
      console.error("Customer confirmation failed (non-blocking):", custErr);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending owner notification:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
