import { redirect } from 'next/navigation'

import getSession from '@/lib/get-session'
import { UserType } from '@prisma/client'

export async function useCheckSupplierAuthentication() {
  const session = await getSession()

  if (!session || session.user.type !== UserType.SUPPLIER) {
    redirect('/sign-in')
  }
}
