import { getCategories } from '@/server/db/products'

import Link from 'next/link'

interface CategoryNavProps {
  categoryName?: string
}

export default async function CategoryNav({ categoryName }: CategoryNavProps) {
  const categories = await getCategories()
  const category = categories.find((c) => c.name === categoryName)

  return (
    <nav className="mb-8 overflow-x-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category?.name}</h1>
        <p className="mt-2 text-gray-600">{category?.description}</p>
      </div>
      <div className="flex gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products/category/${category.name}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              categoryName === category.name ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
