import { stripe } from "@/lib/stripe"
import ProductCarousel from "../ProductCarousel"
import Stripe from "stripe";

interface ProductSectionProps {
  section: string;
  category: string;
}

export default async function ProductSection({ section, category }: ProductSectionProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=${category}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })

  let products = []
  if (response.ok) {
    const { products: receivedProducts } = await response.json()
    products = receivedProducts
  }

  return (
    <section className="keen-slider max-w-[1280px] flex-col gap-4">
      <h1 className="text-zinc-50 text-4xl">{section.toUpperCase()}</h1>
      <ProductCarousel products={products} />
    </section>
  )
}