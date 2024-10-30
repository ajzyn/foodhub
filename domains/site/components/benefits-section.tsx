'use client'

import { motion } from 'framer-motion'

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">For Restaurants</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Simplified ordering process</li>
              <li>Real-time inventory tracking</li>
              <li>Cost optimization through data-driven insights</li>
              <li>Access to a wide network of reliable suppliers</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">For Suppliers</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Expanded customer base</li>
              <li>Streamlined order management</li>
              <li>Improved demand forecasting</li>
              <li>Enhanced visibility and brand exposure</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
