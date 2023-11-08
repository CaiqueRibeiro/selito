'use client'
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { AddToCartButton } from "../AddToCartButton";
import { useCart } from "@/contexts/CartContext";

interface ProductCheckoutProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    paymentId: string;
    description: string | null;
  },
}

export default function ProductCheckout({ product }: ProductCheckoutProps) {
  const [quantity, setQuantity] = useState<number>(product.quantity > 0 ? 1 : 0)
  const { goToCheckoutPage } = useCart()

  async function handleCheckout() {
    goToCheckoutPage([{ price: product.paymentId, quantity }])
  }

  function handleChangeQuantity(element: ChangeEvent<HTMLInputElement>) {
    const quantity = element.target.value
    setQuantity(parseInt(quantity))
  }

  return (
    <div className="flex flex-col w-full max-w-[1280px] gap-14 flex-1 border-b border-slate-200 border-opacity-10 p-8">
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex justify-center items-center flex-col bg-gradient-to-b from-purple-950 to-violet-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
          <Image src={product.imageUrl} width={520} height={480} alt="" className="object-cover" />
        </div>

        <div className="flex flex-col flex-1 items-center justify-around">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-zinc-50 text-3xl font-bold">{product.name}</h3>
            {product.quantity === 0 && <span className="text-sm font-light text-zinc-200 ">Out of stock</span>}
          </div>

          <div className="flex flex-col items-center justify-center gap-8 md:w-96">
            <h1 className="text-zinc-50 text-6xl font-bold">{product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}</h1>
            <div className="flex gap-4">
              <label htmlFor="quantity" className="text-xl text-zinc-50">Quantity</label>
              <input
                disabled={product.quantity === 0}
                className="w-16 rounded-sm outline-none ring-input pl-4"
                type="number"
                name="quantity"
                id="quantity"
                pattern="[0-9]*"
                min={product.quantity > 0 ? 1 : 0}
                max={product.quantity}
                value={quantity}
                onChange={handleChangeQuantity}
                onKeyDown={e => e.preventDefault()}
              />

            </div>

            <div className="flex flex-col self-stretch gap-2">
              <AddToCartButton product={{ ...product, quantity }} />
              <button
                disabled={product.quantity === 0}
                onClick={handleCheckout}
                className="self-stretch flex items-center justify-center gap-4 rounded-sm py-2 font-semibold text-zinc-800 bg-violet-500 transition ease-in-out hover:text-zinc-50 hover:bg-violet-900 duration-300 disabled:bg-gray-500 disabled:text-zinc-800">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      <span className="text-justify text-zinc-50 font-light">{product.description}</span>
    </div>
  )
}