'use client'

import { useCart } from '@/contexts/CartContext'

export interface AddtoCartButtonProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    quantity: number
    paymentId: string
  }
}

export function AddToCartButton({ product }: AddtoCartButtonProps) {
  const { addToCart } = useCart()

  function handleProductAddToCart() {
    addToCart({
      productId: product.id,
      productImage: product.imageUrl,
      productName: product.name,
      productPrice: product.price,
      quantity: product.quantity,
      paymentId: product.paymentId
    })
  }

  return (
    <button
      type="button"
      onClick={handleProductAddToCart}
      className="self-stretch flex items-center justify-center gap-4 rounded-sm py-2 font-semibold text-zinc-50 bg-emerald-500 transition ease-in-out  hover:bg-emerald-900 duration-300"
    >
      Adicionar ao carrinho
    </button>
  )
}