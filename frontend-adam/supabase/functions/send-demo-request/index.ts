
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, company, phone, message } = await req.json()

    // Create email content
    const emailContent = `
      New Demo Request:
      Name: ${name}
      Email: ${email}
      Company: ${company}
      Phone: ${phone}
      Message: ${message || 'No message provided'}
    `

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LogiTrade Demo Requests <onboarding@resend.dev>',
        to: 'adamvirani1@gmail.com',
        subject: `New Demo Request from ${name} at ${company}`,
        text: emailContent,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
