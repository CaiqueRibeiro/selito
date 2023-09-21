'use client'
import { useSession, signOut } from 'next-auth/react'

export default function Admin() {
  const { data: session } = useSession()

  return (
    <>
      Signed in as {session?.user?.name} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}
