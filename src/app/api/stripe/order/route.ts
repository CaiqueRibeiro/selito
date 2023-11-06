import { stripe } from "@/lib/stripe"
import { NextRequest } from "next/server"
import { prisma } from "../../../../../db/prisma"

interface CheckoutRequest extends NextRequest {
  user_id: string
  checkout_details: {
    product_id: string
    price: string
    quantity: number
  }[]
}

async function createCheckout(request: Request) {
  const { user_id, checkout_details } = await request.json() as CheckoutRequest

  const stripeCheckoutDetails = checkout_details.map(item => {
    return {
      price: item.price,
      quantity: item.quantity
    }
  })
  
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    line_items: stripeCheckoutDetails,
    mode: 'payment',
  })

  const createdSale = await prisma.sale.create({
    data: {
      checkoutSessionId: session.id,
      userId: user_id,
    }
  })

  const saleItems = checkout_details.map(item => {
    return {
      saleId: createdSale.id,
      productId: item.product_id,
      quantity: item.quantity
    }
  })

  await prisma.saleItem.createMany({
    data: saleItems,
  })

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