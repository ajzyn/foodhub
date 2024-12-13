import { getCategories } from '@/server/db/products'

import Link from 'next/link'

interface CategoryNavProps {
  searchParams: {
    category?: string
  }
}

export default async function CategoryNav({ searchParams }: CategoryNavProps) {
  const categories = await getCategories()

  return (
    <nav className="mb-8 overflow-x-auto">
      <div className="flex gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              searchParams.category === category.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
