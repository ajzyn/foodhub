import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import CompleteRegistration from './components/complete-registration'
import { UserType } from '@prisma/client'
import getSession from '@/lib/get-session'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

export default async function CompleteRegistrationPage({ searchParams }: { searchParams: { type: UserType } }) {
  const session = await getSession()
  const isUserTypeValid = Object.values(UserType).includes(searchParams.type)

  if (!session) {
    return redirect('/sign-in')
  }

  if (!isUserTypeValid) {
    return notFound()
  }

  return <CompleteRegistration userType={searchParams.type} />
}
