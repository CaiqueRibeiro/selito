'use client'

import { useCart } from "@/contexts/CartContext"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function CartWidget() {
  const { items } = useCart()
  return (
    <Link href="/cart" className="flex justify-center items-center text-zinc-50 gap-2">
      <ShoppingCart />
      Cart ({items.length})
    </Link>
  )
}