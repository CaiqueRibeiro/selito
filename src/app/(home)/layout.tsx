import { Header } from '@/components/Header'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Selito - Dashboard',
  description: 'Next.js Ecommerce',
}

interface AdminProps {
  children: React.ReactNode,
}

export default function AdminLayout({ children }: AdminProps) {
  return (
    <div className='flex flex-1 flex-col'>
      <Header />
      {children}
    </div>
  )
}
