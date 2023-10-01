import Image from "next/image"

import camiseta from '../../../../../public/1.png'
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export default async function Product({ params }: { params: { id: string } }) {
  const productId = params.id

  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = response.default_price as Stripe.Price

  const product = {
    id: response.id,
    name: response.name,
    imageUrl: response.images[0],
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount as number / 100),
    description: response.description
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-start w-screen gap-8 pt-7">
      <div className="flex flex-col w-full max-w-[1280px] gap-14 flex-1 border-b border-slate-200 border-opacity-10 p-8">
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="flex justify-center items-center flex-col bg-gradient-to-b from-purple-950 to-violet-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={product.imageUrl} width={520} height={480} alt="" className="object-cover" />
          </div>

          <div className="flex flex-col flex-1 items-center justify-around">
            <h3 className="text-zinc-50 text-3xl font-bold">{product.name}</h3>
            <div className="flex flex-col items-center justify-center gap-8 md:w-96">
              <h1 className="text-zinc-50 text-6xl font-bold">{product.price}</h1>
              <button className="self-stretch flex items-center justify-center gap-4 rounded-sm py-2 font-semibold text-zinc-800 bg-violet-500 transition ease-in-out hover:text-zinc-50 hover:bg-violet-900 duration-300">
                Buy
              </button>
            </div>
          </div>
        </div>

        <span className="text-justify text-zinc-50 font-light">{product.description}</span>
      </div>

    </main>
  )
}
