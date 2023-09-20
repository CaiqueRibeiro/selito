'use client'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {

  const { data: session } = useSession()

  return (
    <>
      Signed in as {session?.user?.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}
