'use client'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AdminHeader() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-center h-20 border-b border-slate-200 border-opacity-10 sticky py-2 text-slate-300 font-semibold">
      <div className="w-full max-w-[1280px] flex align-center justify-between">
        <div className='flex items-center justify-center'>
          <span className='font-bold text-4xl'>SELITO</span>
        </div>

        <DropdownMenu>
          <div className='flex items-center justify-center gap-4 border-none'>
            <span className=''>{session?.user?.name}</span>
            <DropdownMenuTrigger className='border-none active:border-none'>
              <img className="rounded-full h-12 w-12 bg-white border-none" src={session?.user?.image || ""} alt="User Image" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={async () => signOut()}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}