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
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount as number / 100),
    paymentId: price.id,
    description: response.description
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-start w-screen gap-8 pt-7">
      <ProductCheckout product={product} />
    </main>
  )
}
