import { Suspense } from 'react'
import SignUp from './sign-up'
import { Loader2 } from 'lucide-react'

export default function SignUpPage() {
  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <SignUp />
    </Suspense>
  )
}
