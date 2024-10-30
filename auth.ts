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
      name: `next-auth.session-token`,
      options: {
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        path: '/',
        secure: process.env.NEXTAUTH_URL?.includes('https')
      }
    }
  },
  session: {
    strategy: 'database'
  }
})
