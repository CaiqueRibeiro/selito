'use client'
import { useSession, signOut } from 'next-auth/react'
export function AdminHeader() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-center h-20 border-b border-slate-200 border-opacity-10 sticky py-2 text-slate-300 font-semibold">
      <div className="w-full max-w-[1280px] flex align-center justify-between">
        <div className='flex items-center justify-center'>
          <span className='font-bold text-4xl'>SELITO</span>
        </div>

        <button className="flex items-center justify-center gap-4">
          <span className=''>{session?.user?.name}</span>
          <img className="rounded-full h-12 w-12 bg-red-600" src={session?.user?.image} alt="User Image" />
        </button>
      </div>
    </div>
  )
}