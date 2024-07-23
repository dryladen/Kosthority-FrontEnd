import type { DefaultSession, NextAuthConfig } from 'next-auth'
import { AxiosError } from 'axios'
import Credentials from 'next-auth/providers/credentials'
import Axios from './lib/axios'
import NextAuth from 'next-auth'

export type UserSession = {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
  token: string
}

declare module 'next-auth' {
  interface Session {
    user: UserSession & DefaultSession['user']
  }
}
export const authConfig = {
  trustHost: true,
  providers: [
    Credentials({
      authorize: async (
        credentials: Partial<Record<'email' | 'password', unknown>>,
      ) => {
        try {
          // const res = await makeRequest('post', '/login', credentials , csrf)
          // return res.data
          const res = await Axios.post<{ data: UserSession }>(
            '/api/login',
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            },
          )
          const { data: user } = res.data
          console.log("user" , user)
          return user
        } catch (e: unknown) {
          console.log("Error nih : ")
          console.log(e)
          if (e instanceof AxiosError) {
            throw new Error(e.message)
          }
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user }
    },
    session({ session, token }) {
      return { ...session, user: token }
    },
  },
  secret: 'nCD9KYO42/6NESGwYuW6zPjYGPLJwFqC/LoKDTfWsCEW',
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
