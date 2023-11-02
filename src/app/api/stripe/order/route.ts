import { stripe } from "@/lib/stripe"
import { NextRequest } from "next/server"

interface CheckoutRequest extends NextRequest {
  checkout_details: {
    payment_id: string
    quantity: number
  }[]
}

async function createCheckout(request: Request) {
  /*
  const { payment_id, quantity } = await request.json()
  
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    line_items: [
      { price: payment_id, quantity },
    ],
    mode: 'payment',
  });
  */

  const { checkout_details } = await request.json() as CheckoutRequest
  
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    line_items: checkout_details,
    mode: 'payment',
  });

  return new Response(JSON.stringify({ url: session.url }))
}

interface CheckoutSessionRequest extends NextRequest {
  session_id: string
}

async function getCheckoutSession(request: CheckoutSessionRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")

  if(!sessionId) {
    return new Response(JSON.stringify({ error: 'Session ID not informed' }))
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if(!session) {
    return new Response(JSON.stringify({ error: 'Session not found or customer does not exist' }))
  }

  const output = {
    amount_total: session.amount_total,
    amount_subtotal: session.amount_subtotal,
    currency: session.currency,
    payment_method_types: session.payment_method_types,
    payment_status: session.payment_status,
    total_details: session.total_details,
    customer: session.customer_details
  }

  return new Response(JSON.stringify({ output }))
}

export { createCheckout as POST, getCheckoutSession as GET }