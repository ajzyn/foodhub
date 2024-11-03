'use client'

import SignUpForm from '@/components/auth/sign-up-form'
import { UserType } from '@prisma/client'
import { notFound } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function SignUpTypePage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('userType') as UserType

  if (!userType || !Object.values(UserType).includes(userType)) {
    return notFound()
  }

  return <SignUpForm userType={userType} />
}
