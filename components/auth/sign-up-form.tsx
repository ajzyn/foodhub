import { UserType } from '@prisma/client'
import { Button } from '../ui/button'
import { handleGithubSignIn, handleGoogleSignIn } from '@/server/actions/auth'

export default function SignUpForm({ type }: { type: UserType }) {
  return (
    <>
      <form action={() => handleGoogleSignIn(type)}>
        <Button type="submit">Zarejestruj przez Google</Button>
      </form>
      <form action={() => handleGithubSignIn(type)}>
        <Button type="submit">Zarejestruj przez Github</Button>
      </form>
    </>
  )
}
