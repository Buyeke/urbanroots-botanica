
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@3.4.0"; // Using a recent version of Resend

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSubscriptionRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterSubscriptionRequest = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate email format (basic)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const resend = new Resend(resendApiKey);

    // Add email to newsletter_subscribers table
    const { data: existingSubscriber, error: selectError } = await supabaseClient
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116: "Query returned 0 rows"
      console.error("Error checking existing subscriber:", selectError);
      return new Response(JSON.stringify({ error: "Database error checking subscription" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (existingSubscriber) {
      return new Response(JSON.stringify({ message: "Email already subscribed" }), {
        status: 200, // Or 409 Conflict, depending on desired behavior
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { error: insertError } = await supabaseClient
      .from("newsletter_subscribers")
      .insert({ email });

    if (insertError) {
      console.error("Error inserting subscriber:", insertError);
      return new Response(JSON.stringify({ error: "Could not subscribe email" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send welcome email
    // IMPORTANT: Replace 'onboarding@resend.dev' with your verified domain in Resend
    // Also, customize the email content as needed.
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Urban Roots <welcome@yourverifieddomain.com>", // CHANGE THIS to your verified sender
      to: [email],
      subject: "Welcome to Urban Roots Newsletter!",
      html: `
        <h1>Welcome to the Urban Roots family!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>Stay tuned for updates on sustainable agriculture, technology, and community empowerment.</p>
        <p>Best regards,<br>The Urban Roots Team</p>
      `,
    });

    if (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Don't fail the whole request if email sending fails, but log it.
      // The user is subscribed, which is the primary goal.
    } else {
      console.log("Welcome email sent successfully:", emailData);
    }

    return new Response(JSON.stringify({ message: "Successfully subscribed and welcome email sent!" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in subscribe-newsletter function:", error);
    return new Response(JSON.stringify({ error: error.message || "An unexpected error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);

