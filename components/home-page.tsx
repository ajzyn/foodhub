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
import { useRouter } from 'next/router'

export function HomePageComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showAccountAlert, setShowAccountAlert] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => setIsSidebarOpen(false)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  const sidebarLinks = [
    { href: '/products', label: 'Produkty', icon: <Package className="h-5 w-5" /> },
    { href: '/orders', label: 'Zamówienia', icon: <ShoppingCart className="h-5 w-5" /> },
    { href: '/analytics', label: 'Analizy', icon: <BarChart2 className="h-5 w-5" /> },
    { href: '/add-product', label: 'Dodaj produkt', icon: <PlusCircle className="h-5 w-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen flex-shrink-0 ${
          isSidebarOpen ? 'fixed inset-y-0 left-0 z-50' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:sticky lg:translate-x-0 lg:top-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link href="/" className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold lg:hidden">RS</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-1 pt-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                router.pathname === link.href ? 'bg-gray-100 border-r-4 border-indigo-500' : ''
              }`}
            >
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="lg:hidden mr-2"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <Link href="/" className="flex items-center">
                  <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
                  <span className="text-xl font-bold hidden lg:inline">Restaurant Supply</span>
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
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Account settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Notification area */}
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
        </main>
      </div>
    </div>
  )
}
