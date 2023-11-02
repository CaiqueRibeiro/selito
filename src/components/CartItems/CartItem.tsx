'use client'

import Image from "next/image"
import { ChangeEvent } from "react"
import { useCart } from "@/contexts/CartContext"
import { LucideTrash, LucideTrash2 } from "lucide-react"

interface CartItemProps {
  product: {
    productId: string
    productName: string
    productImage: string
    productPrice: number
    quantity: number
  }
}

export default function CartItem({ product }: CartItemProps) {
  const { changeQuantity, removeItem } = useCart()

  function handleChangeQuantity(element: ChangeEvent<HTMLInputElement>) {
    changeQuantity(product.productId, Number(element.target.value))
  }

  function handleRemoveItem() {
    removeItem(product.productId)
  }

  return (
    <div className="flex items-start justify-between self-stretch py-2 gap-2 border-b last:border-b-0">
      <div className="flex items-center justify-start gap-2 flex-1">
        <Image className="h-24 w-auto border" src={product.productImage} alt={product.productName} width={200} height={200} />
        <div className="flex flex-col items-start justify-center">
          <h3 className="font-semibold text-violet-700">{product.productName}</h3>
          <span className="text-sm text-zinc-600">Teste de descrição para adicionar ao product description</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-24 self-stretch gap-1">
        <label htmlFor="quantity" className="font-bold text-violet-700">Quant.</label>
        <input
          className="w-10 text-center"
          type="number"
          name="quantity"
          id="quantity"
          min={1}
          value={product.quantity}
          onChange={handleChangeQuantity}
          onKeyDown={e => e.preventDefault()} />

          <button onClick={handleRemoveItem} className="flex items-center justify-center mt-2 text-red-600 hover:text-white hover:bg-red-600 p-1 rounded-sm">
            <LucideTrash2 className="h-4" />
            <span className="text-xs font-semibold">REMOVE</span>
          </button>
      </div>

      <div className="flex flex-col items-center justify-start w-28 self-stretch">
        <span className="font-bold text-violet-700">Price</span>
        <span className="text-lg font-semibold text-emerald-500 mt-4">
          {(product.productPrice * product.quantity).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
    </div>
  )
}