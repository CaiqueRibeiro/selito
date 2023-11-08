import { stripe } from "@/lib/stripe"
import { randomUUID } from "crypto"
import { NextRequest } from "next/server"
import Stripe from "stripe"
import { prisma } from "../../../../db/prisma"

interface ListProductsRequest extends NextRequest { }

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
      expand: ['data.default_price'],
      limit: 100
    })
  }

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

  return new Response(JSON.stringify({ products }))
}

interface CreateProductRequest extends NextRequest { }

async function createProduct(request: CreateProductRequest) {
  const body = await request.formData()

  const name = body.get('name')?.toString()
  const description = body.get('description')?.toString()
  const category = body.get('category')?.toString()
  const price = body.get('price')?.valueOf() as number
  const image = body.get('image')

  if (!name || !description || !category || !price) {
    return new Response(JSON.stringify({ ok: false }))
  }

  let imageUrl = undefined;

  if (body.get('image')) {
      const { id } = await stripe.files.create({
        purpose: "product_image" as any,
        file: {
          data: Buffer.from(await (image as any)?.arrayBuffer()),
          name: `${name}-${randomUUID()}.png`
        }
      })
      
      if(id) {
        const fileLink = await stripe.fileLinks.create({
          file: id,
        });

        imageUrl = fileLink.url
      }
  }

  const input = {
    name: name!,
    description: description,
    default_price_data: {
      currency: 'brl',
      unit_amount: Math.ceil(price * 100)
    },
    metadata: {
      category: category!
    }
  } as Stripe.ProductCreateParams

  if(imageUrl) {
    input.images = [imageUrl]
  }

  const product = await stripe.products.create(input)

  await prisma.product.create({
    data: {
      id: product.id,
      name: name,
      description: description,
      category: category,
      imageUrl: imageUrl,
      active: product.active,
      price: Math.ceil(price * 100),
      createdAt: new Date()
    }
  })

  return new Response(JSON.stringify({ product }))
}

interface InactivateProductRequest extends NextRequest {
  product_id: string
}


export { getProducts as GET, createProduct as POST }