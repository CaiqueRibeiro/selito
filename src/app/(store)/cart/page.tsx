'use client'

import CartItems from "@/components/CartItems"
import SaleResume from "@/components/SaleResume"
import { useCart } from "@/contexts/CartContext"

export default function CartPage() {
  const { items } = useCart()

  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-8 mt-8 px-8">
      <div className="w-full max-w-[1280px] flex flex-col items-start gap-8">
        <h1 className="text-2xl text-white font-extrabold">Cart Details</h1>

        <div className="self-stretch grid grid-cols-3 grid-rows-4 gap-4 max-h-[700px]">
          {
            items.length > 0 ?
              <>
              <CartItems />
              <SaleResume />
              </>
              :
              <h2 className="font-bold text-white text-4xl col-span-3 row-span-3 flex items-center justify-center h-[700px]">No products in you cart :(</h2>
          }
        </div>
      </div>
    </main>
  )
}