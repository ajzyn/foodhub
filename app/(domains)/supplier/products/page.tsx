import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { isValidNumber } from '@/utils/numbers'
import { queryClientConfig } from '@/lib/query-client-config'
import { getProducts } from '@/api/products'
import { CacheKeys } from '@/api/cache-keys'
import { Suspense } from 'react'
import { ProductListSkeleton } from './components/product-list-seleton'
import ProductList from './components/product-list'
import { getCachedCategories } from '@/api/categories'

interface ProductsPageProps {
  searchParams: {
    page?: string
    pageSize?: string
    search?: string
    category: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const response = await getCachedCategories()

  const page = isValidNumber(searchParams.page) ? Number(searchParams.page) : 1
  const pageSize = isValidNumber(searchParams.pageSize) ? Number(searchParams.pageSize) : 10
  const category = response?.data?.find((c: any) => c.name === searchParams.category)?.name ?? 'owoce'
  const search = searchParams.search ?? ''

  const queryClient = new QueryClient(queryClientConfig)

  queryClient.prefetchQuery({
    queryKey: [CacheKeys.PRODUCTS, { page, pageSize, search, category }],
    queryFn: () =>
      getProducts({
        paginationParams: { page, pageSize, search, category }
      })
  })

  queryClient.prefetchQuery({
    queryKey: [CacheKeys.CATEGORIES],
    queryFn: () => getCachedCategories(),
    initialData: response
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList initialCategory={category} />
      </Suspense>
    </HydrationBoundary>
  )
}
