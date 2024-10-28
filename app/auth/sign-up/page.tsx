'use client'

import SignUpForm from '@/components/auth/sign-up-form'
import { UserType } from '@prisma/client'
import { useSearchParams } from 'next/navigation'

export default function SignUpTypePage() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as UserType

  return <SignUpForm type={type} />
}
