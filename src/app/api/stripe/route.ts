import { stripe } from "@/lib/stripe"
import { NextRequest } from "next/server"

interface CheckoutRequest extends NextRequest {
  payment_id: string
}

async function createCheckout(request: CheckoutRequest) {
  const { payment_id, quantity } = await request.json()

  const session = await stripe.checkout.sessions.create({
    success_url: 'https://google.com',
    line_items: [
      { price: payment_id, quantity },
    ],
    mode: 'payment',
  });

  return new Response(JSON.stringify({ url: session.url }))
}

export { createCheckout as POST }