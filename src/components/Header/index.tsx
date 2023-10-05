'use client'
import { useSession, signOut, signIn } from 'next-auth/react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User2Icon } from 'lucide-react'
import Image from 'next/image'

export function Header() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 z-10 flex items-center justify-center h-20 bg-violet-700 py-2 text-slate-300 font-semibold">
      {session ?
        <div className="w-full max-w-[1280px] flex align-center justify-between px-6">
          <div className='flex items-center justify-center'>
          <Link href={`/`} className='font-bold text-4xl'>SELITO</Link>
          </div>

          <DropdownMenu>
            <div className='flex items-center justify-center gap-4 border-none'>
              <span className=''>{session?.user?.name}</span>
              <DropdownMenuTrigger className='border-none active:border-none'>
                <Image className="rounded-full h-12 w-12 bg-white border-none" src={session?.user?.image || ""} alt="User Image" />
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

        :

        <div className="w-full max-w-[1280px] flex align-center justify-between px-6">
          <div className='flex items-center justify-center'>
            <Link href={`/`} className='font-bold text-4xl'>SELITO</Link>
          </div>

          <DropdownMenu>
            <div className='flex items-center justify-center gap-4 border-none'>
              <span className=''>Not logged</span>
              <DropdownMenuTrigger className='border-none active:border-none'>
                <User2Icon className="rounded-full h-12 w-12 bg-white border-none" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={async () => signIn("google", { callbackUrl: "/"})}>Sign In</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    </div>
  )
}