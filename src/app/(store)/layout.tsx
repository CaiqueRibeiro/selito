import { Header } from '@/components/Header'
import CartProvider from '@/contexts/CartContext'
import React from 'react'

interface AdminProps {
  children: React.ReactNode,
}

export default function AdminLayout({ children }: AdminProps) {
  return (
    <CartProvider>
      <div className='flex flex-1 flex-col'>
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
