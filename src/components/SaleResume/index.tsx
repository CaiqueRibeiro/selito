import { useCart } from "@/contexts/CartContext"

export default function SaleResume() {
  const { totalValue } = useCart()
  return (
    <div className="col-span-1 row-span-4 flex flex-col items-center justify-between bg-white p-8 rounded-sm shadow-lg overflow-y-scroll">
      <div className="rounded-sm bg-emerald-100 flex flex-col items-center justify-between self-stretch p-3 text-emerald-700">
        <span>Total value</span>

        <span className="text text-4xl font-bold">
          {totalValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          }
        </span>

        <span>
          (Paying in <strong>12x</strong> of <strong>{(totalValue / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>)
        </span>
      </div>

      <button className="mt-8 self-stretch flex items-center justify-center gap-4 rounded-sm py-2 font-semibold text-zinc-800 bg-violet-500 transition ease-in-out hover:text-zinc-50 hover:bg-violet-900 duration-300">
        GO TO PAYMENT
      </button>
    </div>
  )
}