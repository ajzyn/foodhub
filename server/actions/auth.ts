'use server'

import { signIn } from '@/auth'

export async function handleGoogleSignIn() {
  await signIn('google', { redirectTo: `/auth/complete-sign-up?type=` })
}

export async function handleGithubSignIn() {
  await signIn('github', { redirectTo: `/auth/complete-sign-up?type=` })
}
