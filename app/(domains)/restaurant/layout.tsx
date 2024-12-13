import Footer from '@/components/footer'
import Navigation from '@/components/navigation'

import type { Metadata } from 'next'
import { NavItem } from '@/types/nav-items'
import { ShoppingCart } from 'lucide-react'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Foodhub - Restauracja',
  description: 'Foodhub - Restauracja'
}

const navItems: NavItem[] = [
  // { href: '/products', label: 'Szukaj produktów', icon: <Package className="h-5 w-5" /> },
  { href: '/orders', label: 'Moje Zamówienia', icon: <ShoppingCart className="h-5 w-5" /> }
]

export default async function RestaurantLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <Navigation navItems={navItems} />
      <div className="mt-16 lg:ml-64 min-h-[calc(100vh-4rem)] flex flex-col">
        <main className="p-4 bg-gray-100 flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
