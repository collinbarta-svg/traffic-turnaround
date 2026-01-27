import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvoiceEmailRequest {
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  serviceType: string;
  amount: number;
  invoiceUrl: string;
}

const serviceLabels: Record<string, string> = {
  lawn_care: "Lawn Care",
  snow_removal: "Snow Removal",
  landscaping: "Landscaping",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, invoiceNumber, serviceType, amount, invoiceUrl }: InvoiceEmailRequest = await req.json();

    // Validate required fields
    if (!customerEmail || !invoiceNumber || !invoiceUrl) {
      throw new Error("Missing required fields: customerEmail, invoiceNumber, or invoiceUrl");
    }

    console.log(`Sending invoice email to ${customerEmail} for invoice ${invoiceNumber}`);

    const emailResponse = await resend.emails.send({
      from: "West Metro Snow Plowing <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Invoice ${invoiceNumber} - West Metro Snow Plowing`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
          <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 20px;">West Metro Snow Plowing</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 12px;">Lawn Care • Snow Removal • Landscaping</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px 24px;">
              <p style="color: #374151; font-size: 16px; margin: 0 0 24px;">
                Hi ${customerName || 'Valued Customer'},
              </p>
              
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px;">
                Thank you for choosing West Metro Snow Plowing. Here's your invoice for the recent service.
              </p>
              
              <!-- Invoice Details Box -->
              <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 0 0 24px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px;">Invoice</span>
                  <span style="color: #111827; font-size: 14px; font-weight: 600;">${invoiceNumber}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px;">Service</span>
                  <span style="color: #111827; font-size: 14px; font-weight: 600;">${serviceLabels[serviceType] || serviceType}</span>
                </div>
                <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 12px;">
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #111827; font-size: 16px; font-weight: 600;">Total Due</span>
                    <span style="color: #1e40af; font-size: 20px; font-weight: 700;">$${amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <!-- Pay Now Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${invoiceUrl}" style="display: inline-block; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; text-decoration: none; padding: 16px 48px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                  Pay Now
                </a>
              </div>
              
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 24px 0 0;">
                Payment is due today. Click the button above to pay securely online.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                West Metro Snow Plowing LLC<br>
                Questions? Call 612-298-5590
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    console.log("Invoice email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending invoice email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
