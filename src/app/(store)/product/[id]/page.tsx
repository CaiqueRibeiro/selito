import ProductCheckout from "@/components/ProductCheckout"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export default async function Product({ params }: { params: { id: string } }) {
  const productId = params.id

  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = response.default_price as Stripe.Price

  const product = {
    id: response.id,
    name: response.name,
    imageUrl: response.images[0],
    price: price.unit_amount ? price.unit_amount / 100 : 0,
    paymentId: price.id,
    description: response.description
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-start w-screen gap-8 pt-7">
      <ProductCheckout product={product} />
    </main>
  )
}
