'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function RegisterPage() {
  const [userType, setUserType] = useState<'restaurant' | 'supplier'>('restaurant')

  const handleSignIn = async () => {
    await signIn('google', {
      callbackUrl: `/auth/complete-registration?userType=${userType}`,
      redirect: true
    })
  }

  return (
    <div>
      <h1>Zarejestruj się</h1>
      <select value={userType} onChange={(e) => setUserType(e.target.value as 'restaurant' | 'supplier')}>
        <option value="restaurant">Restauracja</option>
        <option value="supplier">Dostawca</option>
      </select>
      <button onClick={handleSignIn}>Zaloguj się przez Google</button>
    </div>
  )
}
