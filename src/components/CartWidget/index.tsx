'use client'

import { useCart } from "@/contexts/CartContext"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function CartWidget() {
  const { items } = useCart()
  return (
    <Link href="/cart" className="relative flex justify-center items-center text-zinc-50 gap-1">
      <ShoppingCart />
      {items.length > 0 &&
        <span className="absolute -top-1 right-8 h-4 w-4 rounded-full bg-emerald-500 flex justify-center items-center items text-xs animate-bounce "><span>{items.length}</span></span>
      }
      <span className="ml-1.5">Cart</span>
    </Link>
  )
}