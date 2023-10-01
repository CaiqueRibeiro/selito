import { stripe } from "@/lib/stripe"
import ProductCarousel from "../ProductCarousel"
import Stripe from "stripe";

interface ProductSectionProps {
  section: string;
  category: string;
}

export default async function ProductSection({ section, category }: ProductSectionProps) {
  const response = await stripe.products.search({
    query: `active:\'true\' AND metadata[\'category\']:\'${category}\'`,
    expand: ['data.default_price']
  })

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

  return (
    <section className="keen-slider max-w-[1280px] flex-col gap-4">
      <h1 className="text-zinc-50 text-4xl">{section.toUpperCase()}</h1>
      <ProductCarousel products={products} />
    </section>
  )
}