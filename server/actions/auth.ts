'use server'

import { signIn } from '@/auth'
import { UserType } from '@prisma/client'

export async function handleGoogleSignIn(userType: UserType) {
  await signIn('google', { redirectTo: `/auth/complete-sign-up?type=${userType}` })
}

export async function handleGithubSignIn(userType: UserType) {
  await signIn('github', { redirectTo: `/auth/complete-sign-up?type=${userType}` })
}
