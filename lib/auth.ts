import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import prisma from './prisma'
import authConfig from './auth-config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    updateAge: 15 * 60,
    maxAge: 60 * 15,
    strategy: 'jwt'
  },
  ...authConfig
})
