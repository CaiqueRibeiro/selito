import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Product } from '@/types/product'

interface SearchProps {
  searchParams: {
    q: string
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  async function searchProducts(query: string): Promise<Product[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/search?q=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 }
    })
    const products = await response.json()
    return products
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm mt-11 text-zinc-50">
        Results to: <span className="font-semibold">{query}</span>
      </p>

      <div className="flex-1 w-full max-w-[1280px] grid sm: grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 xl:px-0">
        {products.map((product) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} className="group flex w-[400px] h-[400px] justify-center items-center flex-col bg-gradient-to-b from-purple-950 to-violet-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
              <Image src={product.imageUrl} width={520} height={480} quality={100} alt="" className="h-[400px] w-fit" />
              <footer className="
                              bottom-1
                              absolute
                              left-1
                              right-1
                              flex
                              justify-between
                              items-center
                              p-4
                              bg-black/[.6]
                              rounded-lg
                              opacity-0
                              translate-y-full
                              transition
                              ease-in-out
                              duration-2000
                              group-hover:opacity-100
                              group-hover:translate-y-0"
              >
                <strong className="text-zinc-200 text-lg">{product.name}</strong>
                <span className="text-zinc-200 text-xl font-bold">{product.price}</span>
              </footer>
            </Link>
          )
        })}
      </div>
    </div>
  )
}