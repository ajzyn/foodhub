'use client'

import { UserType } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CompleteRegistration() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') as UserType
  const isUserTypeValid = Object.values(UserType).includes(userType)

  useEffect(() => {
    const completeRegistration = async () => {
      setIsLoading(true)

      const response = await fetch('/api/auth/user-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userType })
      })

      if (response.ok) {
        window.location.href = `${process.env.NEXT_PUBLIC_SCHEME}${userType.toLocaleLowerCase()}.${
          process.env.NEXT_PUBLIC_DOMAIN
        }`
      }
    }

    if (isUserTypeValid && session?.user && !isLoading) {
      completeRegistration()
    }
  }, [session, userType, isUserTypeValid, isLoading])

  if (!isUserTypeValid) {
    return notFound()
  }

  return <div>Kończenie rejestracji...</div>
}
