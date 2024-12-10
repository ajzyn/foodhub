import { UserType } from '@prisma/client'
import { notFound } from 'next/navigation'
import SignIn from './components/sign-in'

export default function SignUpPage({ searchParams }: { searchParams: { userType: UserType } }) {
  if (!searchParams.userType || !Object.values(UserType).includes(searchParams.userType)) {
    return notFound()
  }

  return <SignIn userType={searchParams.userType} />
}
