import { getProductsByCategory } from '@/server/db/products'
import CategoryNav from './components/category-nav'
import { QueryClient } from '@tanstack/react-query'
import { queryClientConfig } from '@/lib/query-client-config'
import { CacheKeys } from '@/api/cache-keys'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  console.log('category', category)

  const queryClient = new QueryClient(queryClientConfig)

  await queryClient.fetchQuery({
    queryKey: [CacheKeys.PRODUCTS_BY_CATEGORY, category],
    queryFn: () => getProductsByCategory(category)
  })

  console.log(category, 'przed')
  return (
    <div>
      <CategoryNav categoryName={category} />
      {/* {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))} */}
    </div>
  )
}
