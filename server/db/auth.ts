import prisma from '@/lib/prisma'
import { UserType } from '@prisma/client'

export async function setUserType(userId: string, userType: UserType) {
  await prisma.user.update({
    where: { id: userId },
    data: { type: userType }
  })

  if (userType === UserType.SUPPLIER) {
    await prisma.supplier.create({
      data: {
        id: userId
      }
    })
  }

  if (userType === UserType.RESTAURANT) {
    await prisma.restaurant.create({
      data: {
        id: userId
      }
    })
  }
}
