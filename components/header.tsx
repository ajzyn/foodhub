import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import getSession from '@/lib/getSession'
import { signOut } from '@/auth'

export default async function Header() {
  const session = await getSession()

  const handleSignOut = async () => {
    'use server'
    await signOut()
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/images/logo.png" alt="FoodHub" width={40} height={40} className="rounded-md" />
        <span className="text-xl font-bold">FoodHub</span>
      </Link>
      <nav className="space-x-4">
        {session ? (
          <form action={handleSignOut}>
            <Button type="submit">Wyloguj</Button>
          </form>
        ) : (
          <>
            <Link href="/auth/sign-up/type">
              <Button>Zarejestruj</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
