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
        domain: '.a96f-80-94-17-242.ngrok-free.app',
        path: '/',
        secure: true // Ustaw na true w środowisku produkcyjnym z HTTPS
      }
    }
  },
  session: {
    strategy: 'database'
  }
})
