import { stripe } from "@/lib/stripe"
import { NextRequest } from "next/server"
import Stripe from "stripe"
import { prisma } from "../../../../../db/prisma"


async function searchProductsByName(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const query = searchParams.get("q")

  let response

  response = await stripe.products.search({
    query: `name~\"${query}\"`,
    expand: ['data.default_price']
  })

  const productStock = await prisma.productStock.findMany()

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    const quantity = productStock.find(stock => stock.productId === product.id)?.quantity

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      active: product.active,
      quantity: quantity ?? 0,
      paymentId: price.id,
      description: product.description,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount as number / 100)
    }
  })

  return Response.json(products)
}

export { searchProductsByName as GET }