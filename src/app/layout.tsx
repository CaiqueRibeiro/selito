import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { NextAuthProvider } from '@/components/NextAuthProvider'

export const metadata: Metadata = {
  title: {
    template: '%s | Selito',
    default: 'Selito',
  },
  description: 'Next.js Ecommerce',
}

interface RootProps {
  children: React.ReactNode,
  session: any
}

export default function RootLayout({
  children,
  session
}: RootProps) {
  return (
    <html lang="en">
      <NextAuthProvider session={session}>
        <body className="h-screen w-full overflow-x-hidden bg-gradient-to-r from-zinc-900 from-30% to-violet-950 to-95% flex justify-center">
          <div className='flex flex-1'>
            {children}
          </div>
        </body>
      </NextAuthProvider>
    </html>
  )
}
