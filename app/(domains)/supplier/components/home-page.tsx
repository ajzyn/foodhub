'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search, Menu, X, User, LogOut, Bell, Package, ShoppingCart, BarChart2, PlusCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'

export function HomePageComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showAccountAlert, setShowAccountAlert] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const sidebarLinks = [
    { href: '/products', label: 'Produkty', icon: <Package className="h-5 w-5" /> },
    { href: '/orders', label: 'Zamówienia', icon: <ShoppingCart className="h-5 w-5" /> },
    { href: '/analytics', label: 'Analizy', icon: <BarChart2 className="h-5 w-5" /> },
    { href: '/add-product', label: 'Dodaj produkt', icon: <PlusCircle className="h-5 w-5" /> }
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showAccountAlert && (
        <Alert className="mb-6">
          <AlertTitle>Complete your account setup</AlertTitle>
          <AlertDescription>
            Please provide your business details to fully activate your account.
            <Button variant="link" className="p-0 h-auto font-normal" onClick={() => setShowAccountAlert(false)}>
              Complete now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Restaurant Supply Platform</h1>
      <p className="text-gray-600 mb-8">Streamline your supply chain and grow your business</p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button className="justify-center" asChild>
            <Link href="/add-product">Dodaj produkt</Link>
          </Button>
          <Button className="justify-center" variant="outline" asChild>
            <Link href="/orders">Ostatnie zamówienia</Link>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Szukaj produktów</h2>
        <div className="flex rounded-md shadow-sm">
          <Input type="text" placeholder="Szukaj produktów..." className="flex-1 rounded-none rounded-l-md" />
          <Button type="button" className="-ml-px relative inline-flex items-center rounded-r-md">
            <Search className="h-5 w-5" />
            <span className="sr-only">Szukaj</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
