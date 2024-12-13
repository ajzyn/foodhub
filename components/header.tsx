'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X, User, LogOut, Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useMobileNavigationStore } from '@/stores/use-mobile-navigation-store'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const session = useSession()
  const { toggleNavOpen, isNavOpened } = useMobileNavigationStore()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white shadow-sm fixed top-0 inset-x-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="lg:hidden mr-2" onClick={toggleNavOpen} aria-label="Toggle sidebar">
              {isNavOpened ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="FoodHub" width={40} height={40} className="rounded-md" />
              <span className="text-xl font-bold">FoodHub</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs leading-none text-muted-foreground">{session.data?.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Account settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
