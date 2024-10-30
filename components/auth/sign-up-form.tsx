import { Button } from '../ui/button'
import { handleGithubSignIn, handleGoogleSignIn } from '@/server/actions/auth'

export default function SignUpForm() {
  return (
    <>
      <form action={() => handleGoogleSignIn()}>
        <Button type="submit">Zarejestruj przez Google</Button>
      </form>
      <form action={() => handleGithubSignIn()}>
        <Button type="submit">Zarejestruj przez Github</Button>
      </form>
    </>
  )
}
