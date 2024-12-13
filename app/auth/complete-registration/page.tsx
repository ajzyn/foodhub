import CompleteRegistration from './components/complete-registration'
import { UserType } from '@prisma/client'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

export default async function CompleteRegistrationPage({ searchParams }: { searchParams: { type: UserType } }) {
  const session = await auth()
  const isUserTypeValid = Object.values(UserType).includes(searchParams.type)

  if (!session) {
    return redirect('/sign-in')
  }

  if (!isUserTypeValid) {
    return notFound()
  }

  return <CompleteRegistration userType={searchParams.type} />
}
