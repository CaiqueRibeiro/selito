'use client'
import { Check, Edit, X } from 'lucide-react'
import Image from 'next/image'

interface Products {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    active: boolean
  }[]
  updateProducts: (product: any) => void
}

export default function ProductsTable({ products, updateProducts }: Products) {

  async function handleInactivateProduct(productId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?product_id=${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok) {
      const { message, product } = await response.json()
      updateProducts(product)
    } else {
      const { message } = await response.json()
    }
  }

  return (
    <div className="mt-10 h-5/6 overflow-y-auto">
      <table className="w-full table-auto border-collapse text-white text-left text-xs">

        <thead className="text-xs uppercase font-bold sticky top-0 bg-violet-500">
          <tr className="">
            <td className="px-4 py-2">Product</td>
            <td className="px-4 py-2 text-center">Product ID</td>
            <td className="px-4 py-2 text-center">Quantity</td>
            <td className="px-4 py-2 text-center">Price</td>
            <td className="px-4 py-2 w-24"></td>
          </tr>
        </thead>

        <tbody className=" [&>tr:hover]:bg-violet-500 [&>*:nth-child(odd)]:bg-violet-500/20 [&>*:nth-child(even)]:bg-violet-500/5">
          {products.map(product => (
            <tr key={product.id}>

              <td className="px-4 py-2 flex items-center gap-4">
                <Image
                  className="rounded-full h-10 w-10 border-none"
                  width={48}
                  height={48}
                  alt="Product image"
                  src={product.imageUrl}
                />
                <span>{product.name} {!product.active && (<strong><i>(Inactive)</i></strong>)}</span>
              </td>

              <td className="px-4 py-2  text-center">{product.id}</td>
              <td className="px-4 py-2 text-center">124</td>
              <td className="px-4 py-2  text-center">{product.price}</td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-between gap-2">
                  <button className="rounded-sm bg-violet-700 p-2 w-fit hover:bg-violet-900 disabled:bg-zinc-400" disabled={!product.active}>
                    <Edit size={12} />
                  </button>
                  {
                    product.active
                      ?
                      <button onClick={() => handleInactivateProduct(product.id)} className="rounded-sm bg-red-600 p-2 w-fit hover:bg-red-800">
                        <X size={12} />
                      </button>
                      :
                      <button onClick={() => handleInactivateProduct(product.id)} className="rounded-sm bg-green-500 p-2 w-fit hover:bg-green-700">
                        <Check size={12} />
                      </button>
                  }
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}