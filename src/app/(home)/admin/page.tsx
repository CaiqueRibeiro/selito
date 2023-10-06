'use client'
import { useSession } from 'next-auth/react'
import { RectangleCard } from '@/components/RetangleCard'
import { ShoppingBasket } from 'lucide-react'


export default function Admin() {
  const { data: session } = useSession()

  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-8 mt-8">
      <div className="w-full max-w-[1280px] grid grid-cols-3 gap-4">
        <button>
          <RectangleCard title="Products list" icon={ShoppingBasket} />
        </button>
      </div>
    </main>
  )
}
