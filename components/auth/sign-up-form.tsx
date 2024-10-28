import { UserType } from '@prisma/client'
import { Button } from '../ui/button'
import { handleGoogleSignIn } from '@/server/actions/auth'

export default function SignUpForm({ type }: { type: UserType }) {
  return (
    <form action={() => handleGoogleSignIn(type)}>
      <Button type="submit">Zarejestruj</Button>
    </form>
  )
}
