import prisma from '@/lib/prisma'
import { UserType } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function setUserType(userId: string, userType: UserType) {
  await prisma.user.update({
    where: { id: userId },
    data: { type: userType }
  })
}

export async function getUserBySessionToken() {
  const session = await prisma.session.findFirst()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return session
}
