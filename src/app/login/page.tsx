'use client'
import { signIn } from "next-auth/react"

export default function Login() {
  async function onSubmit(provider: string) {
    await signIn("google", {
      callbackUrl: "/"
    })
  }

  return (
    <main>
      <button onClick={async () => await onSubmit("google")}>Login</button>
    </main>
  )
}