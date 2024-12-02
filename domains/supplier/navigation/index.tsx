'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Package, ShoppingCart, BarChart2, PlusCircle } from 'lucide-react'

import { usePathname } from 'next/navigation'
import { useMobileNavigationStore } from '@/stores/use-mobile-navigation-store'

export default function Navigation() {
  const { isNavOpened, setNavOpen } = useMobileNavigationStore()
  const pathname = usePathname()

  useEffect(() => {
    setNavOpen(false)
  }, [pathname, setNavOpen])

  const navItems = [
    { href: '/products', label: 'Produkty', icon: <Package className="h-5 w-5" /> },
    { href: '/orders', label: 'Zamówienia', icon: <ShoppingCart className="h-5 w-5" /> },
    { href: '/analytics', label: 'Analizy', icon: <BarChart2 className="h-5 w-5" /> },
    { href: '/add-product', label: 'Dodaj produkt', icon: <PlusCircle className="h-5 w-5" /> }
  ]

  return (
    <>
      {isNavOpened && <div className="fixed inset-0 bg-black/50 lg:hidden z-10" onClick={() => setNavOpen(false)} />}
      <aside
        className={`fixed bg-white w-64 min-h-screen flex-shrink-0 ${
          isNavOpened ? ' inset-0 left-0 ' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 pt-16 z-20`}
      >
        <nav className="flex-1 pt-4 relative">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                pathname === link.href ? 'bg-gray-100 border-r-4 border-indigo-500' : ''
              }`}
            >
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
