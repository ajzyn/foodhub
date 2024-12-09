'use client'

import { motion } from 'framer-motion'
import { Clipboard, BarChart3, TrendingUp } from 'lucide-react'

export default function KeyFeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <Clipboard className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Streamlined Ordering</h3>
            <p className="text-muted-foreground">Effortlessly place and manage orders with your preferred suppliers</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <BarChart3 className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Supply Management</h3>
            <p className="text-muted-foreground">Keep track of inventory and manage your supply chain efficiently</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Insightful Analytics</h3>
            <p className="text-muted-foreground">
              Gain valuable insights into your ordering patterns and supplier performance
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
