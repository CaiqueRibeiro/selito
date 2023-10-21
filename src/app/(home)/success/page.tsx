import { ArrowBigLeftDash, Check } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'
import MaleHandsUp from "public/male-handsup.svg"


interface SuccessProps {
  searchParams: {
    session_id: string
  };
}

interface PaymentInfos {
  amount_total: number | string
  amount_subtotal: number | string
  currency: string
  payment_method_types: string[]
  payment_status: string
  total_details: {
    amount_discount: number
    amount_shipping: number
    amount_tax: number
  }
  customer: {
    address: {
      city: string | null
      country: string | null
      line1: string | null
      line2: string | null
      postal_code: string | null
      state: string | null
    }
    email: string
    name: string
    phone: string | null
    tax_exempt: string
    tax_ids: string[]
  }
}

async function Success({ searchParams }: SuccessProps) {
  const sessionId = searchParams.session_id

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/order?session_id=${sessionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })

  const { output: paymentInfos } = await response.json() as { output: PaymentInfos }

  paymentInfos.amount_total = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(paymentInfos.amount_total as number / 100)

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 px-11">

      <Link href={`/`} className="flex items-center text-white gap-4">
      <ArrowBigLeftDash className="text-white animate-horizontal-bounce" />
        <span>Go back to home page</span>
      </Link>


      <div className="w-full max-w-[1280px] flex items-center justify-between gap-8 mt-8">
        <div className="flex flex-col flex-1">
          <div className="rounded-2xl bg-white flex flex-col items-center justify-between gap-4 p-14">
            <div className="animate-show-up repeat-1 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="text-white h-14 w-14" />
            </div>
            <h2 className="font-semibold text-5xl text-green-500">Payment Succesful!</h2>
            <span className="text-zinc-400 text-md">You paid your product(s), {paymentInfos.customer.name}.</span>
            <span className="text-zinc-400 text-md">No worries, we will get in contact soon.</span>
          </div>

          <div className="rounded-2xl bg-white flex flex-col items-center justify-between gap-2 p-14 border-t border-dashed border-zinc-400">
            <div className="self-stretch flex justify-between items-center border-b border-zinc-200 pb-2">
              <span className="text-zinc-400 text-md">Amount paid:</span>
              <span className="text-violet-700 text-lg font-semibold">{paymentInfos.amount_total}</span>
            </div>

            <div className="self-stretch flex justify-between items-center">
              <span className="text-zinc-400 text-md">Method:</span>
              <span className="text-violet-700 text-lg font-semibold">{paymentInfos.payment_method_types.join(', ').toLocaleUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-2/5">
          <Image src={MaleHandsUp} alt={""} />
        </div>

      </div>
    </main>
  )
}

export default Success