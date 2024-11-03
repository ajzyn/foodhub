import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import CompleteRegistration from './complete-registration'

export default function CompleteRegistrationPage() {
  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <CompleteRegistration />
    </Suspense>
  )
}
