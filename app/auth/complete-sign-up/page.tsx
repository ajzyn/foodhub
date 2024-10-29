'use client'

import { UserType } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CompleteRegistration() {
  const { data: session, update } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') as UserType
  const isUserTypeValid = Object.values(UserType).includes(userType)

  useEffect(() => {
    const completeRegistration = async () => {
      if (session?.user && userType && !isLoading) {
        setIsLoading(true)

        const response = await fetch('/api/auth/user-type', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userType })
        })

        if (response.ok) {
          await update({ type: userType })
          // window.location.href = `${process.env.NEXT_PUBLIC_SCHEME}${userType.toLocaleLowerCase()}.${
          //   process.env.NEXT_PUBLIC_DOMAIN
          // }`
          setIsLoading(false)
        }
      }
    }

    if (isUserTypeValid) {
      completeRegistration()
    }
  }, [session, userType, isUserTypeValid, update, isLoading])

  if (!isUserTypeValid) {
    return <div>Nieprawidłowy typ użytkownika</div>
  }

  return (
    <>
      <Link href={`${process.env.NEXT_PUBLIC_SCHEME}${userType.toLocaleLowerCase()}.${process.env.NEXT_PUBLIC_DOMAIN}`}>
        <button>Przejdź do strony</button>
      </Link>
      <div>Kończenie rejestracji...</div>
    </>
  )
}
