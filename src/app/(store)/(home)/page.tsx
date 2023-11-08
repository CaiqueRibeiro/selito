import ProductSection from "@/components/ProductSection"
import { Category } from "@/types/category"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Home',
}

interface CategoryResponse {
  categories: {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
  }[]
}

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 30 }
  })

  let categories: Category[] = []
  if (response.ok) {
    const { categories: receivedCategories } = await response.json() as CategoryResponse
    const categoriesFormatted = receivedCategories.map(category => ({
      value: category.name.toLowerCase(),
      name: category.name
    }))
    categories = categoriesFormatted
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-8 mt-8 px-8">
      {categories.map((category) => (
        <ProductSection key={category.value} section={category.name} category={category.value} />
      ))}
    </main>
  )
}
