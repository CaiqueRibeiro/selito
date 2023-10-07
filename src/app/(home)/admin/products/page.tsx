'use client'
import { useSession } from 'next-auth/react'
import { RectangleCard } from '@/components/RetangleCard'
import { Edit, Search, ShoppingBasket, ShoppingBasketIcon, X } from 'lucide-react'
import Image from 'next/image'



export default function ProductsList() {
  const { data: session } = useSession()

  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-8 mt-8 px-8">
      <div className="w-full max-w-[1280px] flex flex-col">

        <div className="flex items-center justify-between gap-7">
          <div className='flex flex-1'>
            <span className="rounded-md flex-1 bg-transparent border-slate-400/30 border px-5 py-3 flex gap-3 focus-within:border-fuchsia-900 focus-within:bg-zinc-950/30">
              <Search className="text-zinc-400 h-5" />
              <input
                id="email-input"
                className="flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none"
                type="text"
                placeholder='Search by name'
              />
            </span>
          </div>

          <select id="countries" defaultChecked={false} className="group bg-violet-700 text-zinc-50 text-sm rounded-md w-1/5 p-3">
            <option value="">All</option>
            <option value="US">Highlights</option>
            <option value="CA">Clothes</option>
            <option value="FR">Mangás</option>
            <option value="DE">Drugs</option>
          </select>
        </div>

        <div className="mt-10">
          <table className="w-full table-auto border-collapse text-white text-left text-xs">

            <thead className="text-xs uppercase font-bold">
              <tr className="">
                <td className="px-4 py-2">Product</td>
                <td className="px-4 py-2 text-center">Category</td>
                <td className="px-4 py-2 text-center">Quantity</td>
                <td className="px-4 py-2 text-center">Price</td>
                <td className="px-4 py-2 w-24"></td>
              </tr>
            </thead>

            <tbody className="[&>tr:hover]:bg-violet-500 [&>*:nth-child(odd)]:bg-violet-500/20 [&>*:nth-child(even)]:bg-violet-500/5">
              <tr className="border-b border-white/20">
                <td className="px-4 py-2 flex items-center gap-4">
                  <Image
                    className="rounded-full h-10 w-10 border-none"
                    width={48}
                    height={48}
                    alt="User Image"
                    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  />
                  <span>Alfreds Futterkiste</span>
                </td>
                <td className="px-4 py-2  text-center">HighLights</td>
                <td className="px-4 py-2 text-center">184</td>
                <td className="px-4 py-2  text-center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(50)}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="rounded-sm bg-violet-700 p-2 w-fit">
                      <Edit size={12} />
                    </div>
                    <div className="rounded-sm bg-red-600 p-2 w-fit">
                      <X size={12} />
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="border-b border-white/20">
                <td className="px-4 py-2 flex items-center gap-4">
                  <Image
                    className="rounded-full h-10 w-10 border-none"
                    width={48}
                    height={48}
                    alt="User Image"
                    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  />
                  <span>Alfreds Futterkiste</span>
                </td>
                <td className="px-4 py-2  text-center">HighLights</td>
                <td className="px-4 py-2 text-center">184</td>
                <td className="px-4 py-2  text-center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(50)}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="rounded-sm bg-violet-700 p-2 w-fit">
                      <Edit size={12} />
                    </div>
                    <div className="rounded-sm bg-red-600 p-2 w-fit">
                      <X size={12} />
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="border-b border-white/20">
                <td className="px-4 py-2 flex items-center gap-4">
                  <Image
                    className="rounded-full h-10 w-10 border-none"
                    width={48}
                    height={48}
                    alt="User Image"
                    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  />
                  <span>Alfreds Futterkiste</span>
                </td>
                <td className="px-4 py-2  text-center">HighLights</td>
                <td className="px-4 py-2 text-center">184</td>
                <td className="px-4 py-2  text-center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(50)}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="rounded-sm bg-violet-700 p-2 w-fit">
                      <Edit size={12} />
                    </div>
                    <div className="rounded-sm bg-red-600 p-2 w-fit">
                      <X size={12} />
                    </div>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
