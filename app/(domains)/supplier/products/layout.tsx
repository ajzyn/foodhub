import getSession from '@/lib/get-session'
import { UserType } from '@prisma/client'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Foodhub - Supplier',
  description: 'Foodhub - Products'
}

export default async function ProductsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  if (!session || session.user.type !== UserType.SUPPLIER) {
    redirect('/sign-in')
  }

  return children
}
