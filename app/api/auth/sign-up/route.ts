import { userSchema } from '@/api/schemas/user'
import { createUser } from '@/server/db/auth'
import { hashPassword } from '@/utils/password'
import { UserType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userType, ...authData } = await request.json()

    if (!Object.values(UserType).includes(userType)) {
      return NextResponse.json({ message: 'Invalid user type', error: 'Invalid user type' }, { status: 400 })
    }

    const validatedData = userSchema.parse(authData)

    const hashedPassword = await hashPassword(validatedData.password)

    const user = await createUser(validatedData.email, hashedPassword, userType)

    return NextResponse.json({ message: 'User created successfully', data: user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error }, { status: 400 })
  }
}
