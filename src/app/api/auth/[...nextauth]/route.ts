import NextAuth, { NextAuthOptions, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../../../../../db/prisma"
import { AdapterUser } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"

type CredentialsSessionProps = { newSession: any; trigger: "update"; } & {
  session: Session & {
    id?: string
    token?: string
    image?: string
    jwt?: string
  }
  token: JWT
  user: AdapterUser
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any

        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password
          })
        })

        const user = await response.json()

        if (response.ok && user) {
          return user
        }

        return null
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt", // useful for google provider + prisma and manual credentials
  },
  callbacks: {
    session: async ({ session, token }: CredentialsSessionProps) => {
      session.id = token.id as string
      session.jwt = token.jwt as string
      return Promise.resolve(session)
    },
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.jwt = user.token;
      }
      return Promise.resolve(token);
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }