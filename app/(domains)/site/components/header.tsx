'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'features', 'benefits']
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Features', href: 'features' },
    { name: 'Benefits', href: 'benefits' }
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="FoodHub" width={40} height={40} className="rounded-md" />
              <span className="text-xl font-bold">FoodHub</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.href ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-16 z-50 bg-white shadow-md md:hidden"
        >
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`py-2 text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.href ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  )
}
