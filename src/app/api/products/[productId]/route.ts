import { stripe } from "@/lib/stripe"
import { NextRequest } from "next/server"
import Stripe from "stripe"
import { prisma } from "../../../../../db/prisma"

interface GetProductByIdRequest {
  params: {
    productId: string
  }
}

async function getProductById(request: Request, { params }: GetProductByIdRequest) {
  const productId = params.productId

  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = response.default_price as Stripe.Price

  const productStock = await prisma.productStock.findFirst({
    where: {
      productId: productId
    }
  })

  const product = {
    id: response.id,
    name: response.name,
    imageUrl: response.images[0],
    price: price.unit_amount ? price.unit_amount / 100 : 0,
    paymentId: price.id,
    description: response.description,
    quantity: productStock ? productStock.quantity : 0
  }

  return new Response(JSON.stringify({ product }))
}

interface InactivateProductRequest {
  params: {
    productId: string
  }
}

async function inactivateProduct(request: Request, { params }: InactivateProductRequest) {
  const productId = params.productId

  if(!productId) {
    return new Response(JSON.stringify({ error: 'Product ID not informed' }), { status: 400 })
  }

  const product = await stripe.products.update(productId, { active: false })

  if(!product) {
    return new Response(JSON.stringify({ error: 'It was not possible to inactivate product' }), { status: 500 })
  }

  const price = product.default_price as Stripe.Price

  const output = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    active: product.active,
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount as number / 100)
  }

  return new Response(JSON.stringify({ message: 'Product inactivated', product: output }))
}

export { getProductById as GET, inactivateProduct as DELETE }