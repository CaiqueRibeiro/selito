import { DollarSign, FileImage, LayersIcon, ShoppingBasket } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"


interface StockProps {
  product: any
  handleStockAction: (success: boolean) => void
}

export default function ProductStockInput({ product, handleStockAction }: StockProps) {
  const [isSending, setIsSending] = useState<boolean>(false)

  const quantityRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event: any) {
    event.preventDefault()

    setIsSending(true)

    const quantity = quantityRef.current!.value

    const body = {
      product_id: product.id,
      quantity: quantity
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/stock`, {
      method: "PATCH",
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const result = await response.json()
      handleStockAction(true)
    } else {
      handleStockAction(false)
    }

    setIsSending(false)
  }

  return (
    <form className="flex flex-col md:flex-row items-center gap-4 flex-1 overflow-y-scroll" onSubmit={handleSubmit}>
      <div className="w-full flex-1 p-4 flex flex-col items-center md:h-full">
        <h1 className="text-zinc-600 font-bold text-2xl">Product stock - {product.name}</h1>

        <div className="group flex flex-col gap-2 self-stretch pb-4 mb-4 border-b">
          <label htmlFor="quantity" className="font-semibold group-focus-within:text-violet-700">Quantity</label>
          <div className='flex'>
            <span className="
              rounded-md
              flex-1
              bg-transparent
              border-slate-400/30
              border
              px-5
              py-3
              flex
              gap-3
              focus-within:bg-zinc-100"
            >
              <LayersIcon className="text-zinc-400 h-5 group-focus-within:text-violet-700" />
              <input
                required={true}
                step="1"
                min={0}
                ref={quantityRef}
                name="quantity"
                id="quantity"
                className="flex-1 text-sm bg-transparent text-zinc-800 placeholder-zinc-400 focus:outline-none"
                type="number"
                placeholder='Insert quantity'
              />
            </span>
          </div>
        </div>

        <button type="submit" className="bg-cyan-600 text-zinc-50 rounded-md p-2.5 mt-6 self-stretch flex justify-center items-center gap-3">
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
              'Register'
          }
        </button>
      </div>
    </form>
  )
}