import { hashPassword, verifyPassword } from '@/utils/password'
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

export async function createUser(email: string, password: string, type: UserType) {
  const user = await prisma.user.create({
    data: {
      email,
      type,
      password
    }
  })

  if (type === UserType.SUPPLIER) {
    await prisma.supplier.create({
      data: {
        id: user.id
      }
    })
  }

  if (type === UserType.RESTAURANT) {
    await prisma.restaurant.create({
      data: {
        id: user.id
      }
    })
  }

  return user
}

export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  })
}

export async function getUserProviders(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      accounts: {
        select: {
          provider: true
        }
      }
    }
  })
}
