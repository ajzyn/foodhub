import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import prisma from './lib/prisma'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        domain: '.lvh.me',
        path: '/',
        secure: false // Ustaw na true w środowisku produkcyjnym z HTTPS
      }
    }
  },
  session: {
    strategy: 'database'
  }
})
