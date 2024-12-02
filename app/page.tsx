'use client'

import { useState } from 'react'
import { categories } from '../lib/data'
import { ProductGrid } from './components/product-grid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductCategoriesView() {
  const [activeTab, setActiveTab] = useState(categories[0].id)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Nasze Produkty</h1>
          <p className="mt-1 text-sm text-gray-500">Przeglądaj nasze produkty według kategorii</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <ProductGrid products={category.products} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}

