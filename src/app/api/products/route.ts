import { stripe } from "@/lib/stripe"
import { NextRequest } from "next/server"
import Stripe from "stripe"

interface ListProductsRequest extends NextRequest {
  query: {
    category: string
  }
}

async function getProducts(request: ListProductsRequest) {
  const category = request.nextUrl.searchParams.get("category")

  let response

  if (category) {
    response = await stripe.products.search({
      query: `active:\'true\' AND metadata[\'category\']:\'${category}\'`,
      expand: ['data.default_price']
    })
  } else {
    response = await stripe.products.list({
      expand: ['data.default_price']
    })
  }

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount as number / 100)
    }
  })

  return new Response(JSON.stringify({ products }))
}

export { getProducts as GET }