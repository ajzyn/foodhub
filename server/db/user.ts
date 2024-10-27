import prisma from '@/lib/prisma'
import { UserType } from '@prisma/client'

export async function setUserType(userId: string, userType: UserType) {
  await prisma.user.update({
    where: { id: userId },
    data: { type: userType }
  })
}
