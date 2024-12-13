'use client'

import { NavItem } from '@/types/nav-items'
import { useMobileNavigationStore } from '@/stores/use-mobile-navigation-store'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({ navItems }: { navItems: NavItem[] }) {
  const { isNavOpened, setNavOpen } = useMobileNavigationStore()
  const pathname = usePathname()

  useEffect(() => {
    setNavOpen(false)
  }, [pathname, setNavOpen])

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
                pathname.includes(link.href) ? 'bg-gray-100 border-r-4 border-indigo-500' : ''
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
