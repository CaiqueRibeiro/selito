'use client'
import { useSession, signOut } from 'next-auth/react'

export default function Admin() {
  const { data: session } = useSession()

  return (
    <>
    <h1>ADMIN</h1>
    </>
  )
}
