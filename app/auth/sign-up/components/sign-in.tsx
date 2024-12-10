'use client'

import { UserType } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { handleGithubSignIn, handleGoogleSignIn } from '@/server/actions/auth'
import { Separator } from '@/components/ui/separator'
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import { Github } from 'lucide-react'
import SignInForm from './sign-in-form'

export default function SignUp({ userType }: { userType: UserType }) {
  return (
    <Card>
      <div>
        <CardHeader>
          <CardTitle>Zaloguj się lub utwórz nowe konto!</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Logowanie</TabsTrigger>
              <TabsTrigger value="register">Rejestracja</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <SignInForm userType={userType} />
            </TabsContent>
            <TabsContent value="register">
              <SignInForm userType={userType} isSignInMode={false} />
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Separator className="my-4" />
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => handleGithubSignIn(userType)}>
                <Github className="mr-2 h-4 w-4" />
                Kontynuuj z GitHub
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleGoogleSignIn(userType)}>
                <Github className="mr-2 h-4 w-4" />
                Kontynuuj z Google
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
