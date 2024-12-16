import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import { NavItem } from '@/types/nav-items'

import type { Metadata } from 'next'
import { Package, ShoppingCart, BarChart2, PlusCircle } from 'lucide-react'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Foodhub - Supplier',
  description: 'Foodhub - Supplier Management'
}

const navItems: NavItem[] = [
  {
    href: '/products?page=1&pageSize=10&search=&category=owoce',
    label: 'Produkty',
    icon: <Package className="h-5 w-5" />
  },
  { href: '/orders', label: 'Zamówienia', icon: <ShoppingCart className="h-5 w-5" /> },
  { href: '/analytics', label: 'Analizy', icon: <BarChart2 className="h-5 w-5" /> },
  { href: '/add-product', label: 'Dodaj produkt', icon: <PlusCircle className="h-5 w-5" /> }
]

export default async function SupplierLayout({
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
