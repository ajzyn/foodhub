import { getCategories } from '@/server/db/products'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import CategoryCard from './components/category-card'

export default async function Restaurant() {
  const categories = await getCategories()

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-blue-600">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80"
            alt="Hero background"
            className="h-full w-full object-cover opacity-20"
            fill
            priority
            quality={75}
          />
        </div>
        <div className="relative px-8 py-24 sm:px-12 lg:px-16">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl font-bold sm:text-5xl">Discover Amazing Products</h1>
            <p className="mt-4 text-lg text-blue-100">
              Shop the latest trends across various categories with our curated collection
            </p>
            <button className="mt-8 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-600 shadow-lg transition-colors hover:bg-blue-50">
              Start Shopping
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shop by Category</h2>
        <p className="mt-2 text-gray-600">Browse through our wide selection of categories</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </main>
  )
}
