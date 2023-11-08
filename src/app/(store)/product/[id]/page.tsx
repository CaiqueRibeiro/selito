import ProductCheckout from "@/components/ProductCheckout"
import { Product } from "@/types/product"
import { Metadata } from "next"

interface ProductPageProps {
  params: { id: string }
}

async function getProduct(id: string): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 30 }
  })

  const { product } = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id)
  return {
    title: product.name,
  }
}


export default async function Product({ params }: ProductPageProps) {
  const productId = params.id
  const product = await getProduct(productId)


  return (
    <main className="flex-1 flex flex-col items-center justify-start w-screen gap-8 pt-7">
      <ProductCheckout product={product} />
    </main>
  )
}
