'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function CompleteRegistration() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = searchParams.get('userType') as 'supplier' | 'restaurant'

  useEffect(() => {
    const completeRegistration = async () => {
      if (session?.user?.id && userType) {
        const response = await fetch('/api/set-user-type', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: session.user.id, userType })
        })

        if (response.ok) {
          await update({ type: userType })
          router.push('/dashboard')
        }
      }
    }

    completeRegistration()
  }, [session, userType, router, update])

  return <div>Kończenie rejestracji...</div>
}
