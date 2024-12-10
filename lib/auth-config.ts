import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { getUser, getUserProviders } from '../server/db/auth'
import { verifyPassword } from '../utils/password'
import { UserType } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [
    Google,
    Github,
    Credentials({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials

        if (!email || !password) {
          return null
        }

        const user = await getUser(credentials.email as string)

        if (user && user.password && (await verifyPassword(credentials.password as string, user.password))) {
          return {
            ...user,
            type: user.type as UserType
          }
        }

        return null
      }
    })
  ],
  cookies: {
    sessionToken: {
      name: `session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NEXTAUTH_URL?.includes('https'),
        domain: process.env.NODE_ENV === 'production' ? `.${process.env.NEXT_PUBLIC_DOMAIN}` : '.myapp.local'
      }
    }
  },

  callbacks: {
    async signIn({ user, account }) {
      const existingUserProviders = await getUserProviders(user.email as string)

      if (existingUserProviders && existingUserProviders.accounts.some((acc) => acc.provider === account?.provider)) {
        //TODO: check if throwing error is the best way to handle this
        throw new Error('Email is already registered with a different provider')
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.type = user.type
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        type: token.type
      }
      return session
    }
  }
} satisfies NextAuthConfig
