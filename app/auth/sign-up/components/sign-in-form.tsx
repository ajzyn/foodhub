'use client'

import { UserType } from '@prisma/client'
import { userSchema } from '@/api/schemas/user'
import { User } from '@/api/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { FormTextField } from '@/components/form-fields/text-field'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { signUp } from '@/api/auth'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function SignInForm({ userType, isSignInMode = true }: { userType: UserType; isSignInMode?: boolean }) {
  const destinationDomainUrl = `${process.env.NEXT_PUBLIC_SCHEME}${userType.toLocaleLowerCase()}.${
    process.env.NEXT_PUBLIC_DOMAIN
  }`

  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)

  const methods = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { mutate: registerUser } = useMutation({
    mutationFn: async (data: User) => {
      return await signUp(data, userType)
    },
    onSuccess: () => {
      signUserIn(methods.getValues())
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: error.message
      })
      setIsPending(false)
    }
  })

  const signUserIn = async (data: User) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    setIsPending(false)

    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description:
          result.error === 'CredentialsSignin'
            ? 'Nieprawidłowy e-mail lub hasło'
            : 'Wystąpił błąd. Spróbuj ponownie później'
      })
      return
    }

    window.location.href = destinationDomainUrl
  }

  const handleSubmit = async (formData: User) => {
    setIsPending(true)

    if (isSignInMode) {
      signUserIn(formData)
    } else {
      registerUser(formData)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        <FormTextField name="email" label="E-mail" placeholder="Wprowadź e-mail" />
        <FormTextField name="password" type="password" label="Hasło" placeholder="Wprowadź hasło" />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : isSignInMode ? 'Zaloguj się' : 'Załóż konto'}
        </Button>
      </form>
    </FormProvider>
  )
}
