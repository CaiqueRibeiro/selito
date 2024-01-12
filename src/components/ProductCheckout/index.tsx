'use client'
import Image from "next/image"
import { ChangeEvent, useState } from "react"
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
  const [isSending, setIsSending] = useState<boolean>(false)

  const { goToCheckoutPage } = useCart()

  async function handleCheckout() {
    setIsSending(true)
    await goToCheckoutPage([{
      productId: product.id,
      paymentId: product.paymentId,
      quantity
    }])
    setIsSending(false)
  }

  function handleChangeQuantity(element: ChangeEvent<HTMLInputElement>) {
    const quantity = element.target.value
    setQuantity(parseInt(quantity))
  }

  return (
    <div className="flex flex-col w-full max-w-[1280px] gap-14 flex-1 border-b border-slate-200 border-opacity-10 p-8">
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex justify-center items-center flex-col bg-gradient-to-b from-gray-900 to-gray-700 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
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
                {
                  isSending ?
                    <>
                      <div aria-label="Loading..." role="status">
                        <svg className="animate-spin w-6 h-6 fill-zinc-50" viewBox="3 3 18 18">
                          <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                          </path>
                          <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                          </path>
                        </svg>
                      </div>
                      <span>Loading...</span>
                    </>
                    :
                    'Buy'
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      <span className="text-justify text-zinc-50 font-light">{product.description}</span>
    </div>
  )
}