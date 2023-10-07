'use client'
import { Edit, X } from 'lucide-react'
import Image from 'next/image'

interface Products {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function ProductsTable({ products }: Products) {
  return (
    <div className="mt-10">
        <table className="w-full table-auto border-collapse text-white text-left text-xs">

          <thead className="text-xs uppercase font-bold">
            <tr className="">
              <td className="px-4 py-2">Product</td>
              <td className="px-4 py-2 text-center">Product ID</td>
              <td className="px-4 py-2 text-center">Quantity</td>
              <td className="px-4 py-2 text-center">Price</td>
              <td className="px-4 py-2 w-24"></td>
            </tr>
          </thead>

          <tbody className="[&>tr:hover]:bg-violet-500 [&>*:nth-child(odd)]:bg-violet-500/20 [&>*:nth-child(even)]:bg-violet-500/5">
            {products.map(product => (
              <tr className="border-b border-white/20" key={product.id}>

                <td className="px-4 py-2 flex items-center gap-4">
                  <Image
                    className="rounded-full h-10 w-10 border-none"
                    width={48}
                    height={48}
                    alt="Product image"
                    src={product.imageUrl}
                  />
                  <span>{product.name}</span>
                </td>

                <td className="px-4 py-2  text-center">{product.id}</td>
                <td className="px-4 py-2 text-center">124</td>
                <td className="px-4 py-2  text-center">{product.price}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <button className="rounded-sm bg-violet-700 p-2 w-fit hover:bg-violet-900">
                      <Edit size={12} />
                    </button>
                    <button className="rounded-sm bg-red-600 p-2 w-fit hover:bg-red-800">
                      <X size={12} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}