'use client'
import { signIn } from "next-auth/react"
import { SiGoogle } from "@icons-pack/react-simple-icons"
import { User, Lock, Eye, EyeOff } from "lucide-react"
import { useRef, useState } from "react"

type SignInObjectProps = {
  callbackUrl: string
  username?: string
  password?: string
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const username = useRef('')
  const password = useRef('')

  function handleShowPassword() {
    setShowPassword(state => !state)
  }

  async function onSubmit(provider: string) {
    const signInObject: SignInObjectProps = {
      callbackUrl: "/admin"
    }

    if(provider === "credentials") {
      signInObject.username = username.current
      signInObject.password = password.current
    }
    
    await signIn(provider, signInObject)
  }

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="rounded-lg p-1">

        <div className="
          w-[600px]
          rounded-lg
          gap-4
          py-9
          px-16
          bg-gradient-to-b
          from-zinc-900/50
          backdrop-blur-lg
          border
          border-slate-500/30
          shadow-2xl
          flex
          flex-col
          items-center">

          <div className="self-stretch flex flex-col">
            <div className="flex flex-col self-stretch mb-4 gap-4">
              <div>
                <label htmlFor="email-input" className="text-slate-50 font-bold">Email</label>
                <div className='flex py-1'>
                  <span className="
              rounded-md
              flex-1
              bg-transparent
              border-slate-400/30
              border
              px-5
              py-3
              flex
              gap-3
              focus-within:border-fuchsia-900
              focus-within:bg-zinc-950/30"
                  >
                    <User className="text-zinc-400 h-5" />
                    <input
                      id="email-input"
                      className="flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none"
                      type="text"
                      placeholder='Insert email'
                    />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="password-input" className="text-slate-50 font-bold">Password</label>
                <div className='flex py-1'>
                  <span className="
              rounded-md
              flex-1
              bg-transparent
              border-slate-400/30
              border
              px-5
              py-3
              flex
              gap-3
              focus-within:border-fuchsia-900
              focus-within:bg-zinc-950/30"
                  >
                    <Lock className="text-zinc-400 h-5" />
                    <input
                      id="password-input"
                      className="flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none"
                      type={showPassword ? "text" : "password"}
                      placeholder='Insert password'
                    />
                    <button>
                      {showPassword ?
                        <EyeOff className="text-zinc-400 h-5" onClick={handleShowPassword} />
                        :
                        <Eye className="text-zinc-400 h-5" onClick={handleShowPassword} />
                      }
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <button className="
          self-stretch
          flex
          items-center
          justify-center
          gap-4
          rounded-sm
          py-2
          font-semibold
          text-white
          bg-gradient-to-r
          from-purple-900
          to-fuchsia-500
          transition
          ease-in-out
          hover:from-purple-950
          hover:to-fuchsia-800
          duration-1000
          "
              onClick={async () => await onSubmit("credentials")}>
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-between self-stretch gap-3">
            <div className="w-full h-[1px] bg-slate-200"></div>
            <p className="text-slate-200">or</p>
            <div className="w-full h-[1px] bg-slate-200"></div>
          </div>

          <button className="self-stretch bg-slate-200 flex items-center justify-center gap-4 rounded-sm py-2 text-slate-500"
            onClick={async () => await onSubmit("google")}>
            <SiGoogle size={30} className="fill-sky-500" />
            Sign In with Google
          </button>
        </div>

      </div>
    </main>
  )
}