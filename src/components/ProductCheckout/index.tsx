'use client'
import Image from "next/image"
import { ChangeEvent, useState } from "react"

interface ProductCheckoutProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    paymentId: string;
    description: string | null;
  },
}

export default function ProductCheckout({ product }: ProductCheckoutProps) {
  const [quantity, setQuantity] = useState<number>(1)

  async function getCheckoutLink() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe`, {
      method: "POST",
      body: JSON.stringify({ payment_id: product.paymentId, quantity })
    })

    const { url } = await response.json()

    window.open(url, '_blank')
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
          <h3 className="text-zinc-50 text-3xl font-bold">{product.name}</h3>
          <div className="flex flex-col items-center justify-center gap-8 md:w-96">
            <h1 className="text-zinc-50 text-6xl font-bold">{product.price}</h1>
            <div className="flex gap-4">
              <label htmlFor="quantity" className="text-xl text-zinc-50">Quantity</label>
              <input
                className="w-16 rounded-sm outline-none ring-input pl-4"
                type="number"
                name="quantity"
                id="quantity"
                pattern="[0-9]*"
                min={1}
                max={50}
                value={quantity}
                onChange={handleChangeQuantity}
                onKeyDown={e => e.preventDefault()}
                />

            </div>
            <button onClick={getCheckoutLink} className="self-stretch flex items-center justify-center gap-4 rounded-sm py-2 font-semibold text-zinc-800 bg-violet-500 transition ease-in-out hover:text-zinc-50 hover:bg-violet-900 duration-300">
              Buy
            </button>
          </div>
        </div>
      </div>

      <span className="text-justify text-zinc-50 font-light">{product.description}</span>
    </div>
  )
}