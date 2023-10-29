import { stripe } from "@/lib/stripe"
import { randomUUID } from "crypto"
import { NextRequest } from "next/server"
import { prisma } from "../../../../../db/prisma"

interface UpdateStockRequest extends NextRequest {}

async function updateStock(request: UpdateStockRequest) {
  const { product_id, quantity } = await request.json()

  console.log(product_id, quantity)

  const stock = await prisma.productStock.create({
    data: {
      id: randomUUID(),
      productId: product_id,
      quantity
    }
  })

  return new Response(JSON.stringify({ stock }))
}

export { updateStock as PATCH }