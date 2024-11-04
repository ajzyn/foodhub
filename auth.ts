import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import prisma from './lib/prisma'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, Github],
  cookies: {
    sessionToken: {
      name: `session-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        secure: process.env.NEXTAUTH_URL?.includes('https'),
        domain: process.env.NODE_ENV === 'production' ? `.${process.env.NEXT_PUBLIC_DOMAIN}` : '.myapp.local'
      }
    }
  },
  callbacks: {
    async session({ session, user }) {
      session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        type: user.type
      }
      return session
    }
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60
  },
  debug: true
})
