'use server'

import { UserType } from '@prisma/client'
import { signIn } from '@/auth'

export async function handleGoogleSignIn(userType: UserType) {
  await signIn('google', { redirectTo: `/auth/complete-registration?type=${userType}` })
}

export async function handleGithubSignIn(userType: UserType) {
  await signIn('github', { redirectTo: `/auth/complete-registration?type=${userType}` })
}
