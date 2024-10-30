'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Revolutionizing Restaurant Supply Chain</h2>
          <p className="text-lg text-muted-foreground mb-8">
            SupplyConnect is designed to bridge the gap between restaurants and suppliers, creating a seamless ecosystem
            for ordering, inventory management, and supply chain optimization. Our platform empowers both restaurants
            and suppliers to focus on what they do best, while we handle the complexities of supply chain logistics.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
