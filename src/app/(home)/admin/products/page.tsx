'use client'
import { useSession } from 'next-auth/react'
import { Search } from 'lucide-react'
import { ChangeEventHandler, useEffect, useState } from 'react'
import ProductsTable from '@/components/ProductsTable'
import NewProductModal from '@/components/NewProductModal'

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

interface Category {
  value: string
  name: string
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([
    { value: '', name: 'All' },
    { value: 'Highlights', name: 'Highlights' },
    { value: 'Clothes', name: 'Clothes' }
  ])
  const [chosenCategory, setChosenCategory] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const { data: session } = useSession()

  function handleOpenProductModal() {
    setShowModal(true)
  }

  function handleCloseProductModal() {
    setShowModal(false)
  }

  function handleChooseCategory(element: any) {
    setChosenCategory(element.target.value)
  }

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=${chosenCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })

      if (response.ok) {
        const { products } = await response.json()
        setProducts(products)
      }
    }

    getProduct()
  }, [chosenCategory])

  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-8 mt-8 px-8">
      <NewProductModal show={showModal} hideModal={handleCloseProductModal} />
      <div className="w-full max-w-[1280px] flex flex-col">

        <div className="flex items-center justify-between gap-7">
          <div className='flex flex-1'>
            <span className="rounded-md flex-1 bg-transparent border-slate-400/30 border px-5 py-3 flex gap-3 focus-within:border-fuchsia-900 focus-within:bg-zinc-950/30">
              <Search className="text-zinc-400 h-5" />
              <input
                id="email-input"
                className="flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none"
                type="text"
                placeholder='Search by name'
              />
            </span>
          </div>

          <select id="countries" value={chosenCategory} onChange={handleChooseCategory} className="group bg-violet-700 text-zinc-50 text-sm rounded-md w-1/5 p-3">
            {categories.map(category => (
              <option value={category.value} key={category.name}>{category.name}</option>
            ))}
          </select>

          <button onClick={handleOpenProductModal} className="bg-cyan-600 text-zinc-50 rounded-md p-2.5">
            New Product
          </button>
        </div>

        <ProductsTable products={products} />
      </div>
    </main>
  )
}
