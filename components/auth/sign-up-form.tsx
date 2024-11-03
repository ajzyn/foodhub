import { UserType } from '@prisma/client'
import { Button } from '../ui/button'
import { handleGithubSignIn, handleGoogleSignIn } from '@/server/actions/auth'

export default function SignUpForm({ userType }: { userType: UserType }) {
  return (
    <>
      <form action={() => handleGoogleSignIn(userType)}>
        <Button type="submit">Zarejestruj przez Google</Button>
      </form>
      <form action={() => handleGithubSignIn(userType)}>
        <Button type="submit">Zarejestruj przez Github</Button>
      </form>
    </>
  )
}
