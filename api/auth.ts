import fetchFromApi from '@/lib/fetch-from-api'
import { User, UserType } from '@prisma/client'
import { signIn } from 'next-auth/react'
import { User as UserSchema } from './schemas/user'

export async function setUserType(userType: UserType) {
  const response = await fetchFromApi<void>('/auth/user-type', {
    method: 'POST',
    body: JSON.stringify({ userType })
  })

  return response
}

export async function signUp(data: UserSchema, userType: UserType) {
  return await fetchFromApi<User>('/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      userType
    })
  })
}
