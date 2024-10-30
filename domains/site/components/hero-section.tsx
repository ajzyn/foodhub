'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Car, Utensils } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Simplify Ordering and Supply Management</h1>
          <p className="text-xl text-muted-foreground mb-8">Connect restaurants with the best suppliers effortlessly</p>
          <div className="flex flex-col md:flex-row justify-center md:space-x-4 space-y-4 md:space-y-0 mt-10">
            <Link
              href={`${process.env.NEXT_PUBLIC_SCHEME}restaurant.${process.env.NEXT_PUBLIC_DOMAIN}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                Zarejestruj się jako Restaurator
                <Utensils className="ml-1" />
              </Button>
            </Link>
            <Link href={`supplier.${process.env.NEXT_PUBLIC_APP_URL}`}>
              <Button size="lg" variant="default">
                Zarejestruj się jako Dostawca
                <Car className="ml-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
