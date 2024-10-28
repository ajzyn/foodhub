'use server'

import { signIn } from '@/auth'
import { UserType } from '@prisma/client'

export async function handleGoogleSignIn(type: UserType) {
  await signIn('google', { redirectTo: `/auth/complete-sign-up?type=${type}` })
}
