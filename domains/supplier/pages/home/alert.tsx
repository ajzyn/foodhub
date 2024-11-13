'use client'

import CustomAlert from '@/components/custom-alert'
import { useState } from 'react'

export default function Alert() {
  const [showAccountAlert, setShowAccountAlert] = useState(true)

  return (
    <>
      {showAccountAlert && (
        <CustomAlert
          onClose={() => setShowAccountAlert(false)}
          title="Complete your account setup"
          description="Please provide your business details to fully activate your account."
          buttonText="Complete now"
        />
      )}
    </>
  )
}
