'use client'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProductsTable from '@/components/ProductsTable'
import NewProductModal from '@/components/NewProductModal'
import NewCategoryModal from '@/components/NewCategoryModal'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  quantity: number
  active: boolean
}

interface CategoryResponse {
  categories: {
    id: string
    name: string
    description: string
    quantity: number
    createdAt: Date
    updatedAt: Date
  }[]
}

interface Category {
  value: string
  name: string
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showProductModal, setShowProductModal] = useState<boolean>(false)
  const [chosenCategory, setChosenCategory] = useState<string>('')
  const [categoryCreated, setCategoryCreated] = useState<boolean>(false)
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false)

  function handleOpenCategoryModal() {
    setShowCategoryModal(true)
  }

  function handleCloseCategoryModal() {
    setShowCategoryModal(false)
  }

  function handleUpdateProducts(product: Product) {
    setProducts(products => {
      const productIndex = products.findIndex(item => item.id === product.id)
      products[productIndex] = product
      return products
    })
  }

  function handleOpenProductModal() {
    setShowProductModal(true)
  }

  function handleCloseProductModal() {
    setShowProductModal(false)
  }

  function handleChooseCategory(element: any) {
    setChosenCategory(element.target.value)
  }

  useEffect(() => {
    async function getCategories() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: 'no-cache'
      })

      if (response.ok) {
        const { categories } = await response.json() as CategoryResponse
        const categoriesFormatted = categories.map(category => ({
          value: category.name.toLowerCase(),
          name: category.name
        }))
        setCategories(categoriesFormatted)
      }
    }

    getCategories()
  }, [categoryCreated])

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=${chosenCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: 'no-cache'
      })

      if (response.ok) {
        const { products } = await response.json()
        console.log(products)
        setProducts(products)
      }
    }

    getProduct()
  }, [chosenCategory])

  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-8 mt-8 px-8">

      <NewCategoryModal
        show={showCategoryModal}
        hideModal={handleCloseCategoryModal}
        categoryCreated={categoryCreated}
        setCategoryCreated={setCategoryCreated}
      />
      <NewProductModal
        show={showProductModal}
        hideModal={handleCloseProductModal}
      />

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

          <select id="countries" value={chosenCategory} onChange={handleChooseCategory} className="group bg-violet-700 text-zinc-50 text-sm rounded-sm w-1/5 p-3">
            {categories.map(category => (
              <option value={category.value} key={category.name}>{category.name}</option>
            ))}
          </select>

          <button onClick={handleOpenCategoryModal} className="bg-orange-500 text-zinc-50 rounded-sm p-2.5 hover:bg-orange-600">
            New Category
          </button>

          <button onClick={handleOpenProductModal} className="bg-cyan-600 text-zinc-50 rounded-sm p-2.5 hover:bg-cyan-700">
            New Product
          </button>
        </div>

        <ProductsTable products={products} updateProducts={handleUpdateProducts} />
      </div>
    </main>
  )
}
