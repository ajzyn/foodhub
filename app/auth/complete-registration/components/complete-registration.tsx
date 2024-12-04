'use client'

import { UserType } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { setUserType } from '@/api/auth'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function CompleteRegistration({ userType }: { userType: UserType }) {
  const session = useSession()
  const { toast } = useToast()
  const destinationDomainUrl = `${process.env.NEXT_PUBLIC_SCHEME}${userType.toLocaleLowerCase()}.${
    process.env.NEXT_PUBLIC_DOMAIN
  }`
  const { mutate: setUserTypeMutation, isPending } = useMutation({
    mutationFn: async (data: UserType): Promise<void> => {
      return setUserType(data)
    },
    onSuccess: () => {
      window.location.href = destinationDomainUrl
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: error.message
      })

      redirect('/sign-in')
    }
  })

  useEffect(() => {
    if (session.status === 'authenticated' && !session?.data?.user.type) {
      setUserTypeMutation(userType)
      return
    }

    window.location.href = destinationDomainUrl
  }, [session])

  //TODO: suggestiom to complete profile
  return <Loader2 className="animate-spin" />
}
