import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import prisma from './lib/prisma'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log('signIn000000000000000000000000000000000')
      // console.log(user, account, profile)
      // // Tutaj nie możemy ustawić typu użytkownika, ponieważ nie mamy do niego dostępu
      // return true
    },
    async session({ session, token }) {
      // if (session.user) {
      //   session.user.type = token.userType as string | null
      // }
      // return session
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
      } else {
        return `${baseUrl}/supplier`
      }
    }
  }
})
