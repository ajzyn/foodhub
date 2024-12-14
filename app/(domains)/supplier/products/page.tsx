import { CacheKeys } from '@/api/cache-keys'
import { getProducts } from '@/api/products'
import ProductList from '@/app/(domains)/supplier/products/components/product-list'
import { getCategories } from '@/server/db/products'
import { isValidNumber } from '@/utils/numbers'
import { Category } from '@prisma/client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'
import { ProductListSkeleton } from './components/product-list-seleton'
import { queryClientConfig } from '@/lib/query-client-config'

interface ProductsPageProps {
  searchParams: {
    page?: string
    pageSize?: string
    search?: string
    category: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  let categories: Category[] = []

  try {
    categories = await getCategories()
  } catch (error) {
    console.error('Error getting categories:', error)
    return notFound()
  }

  const page = isValidNumber(searchParams.page) ? Number(searchParams.page) : 1
  const pageSize = isValidNumber(searchParams.pageSize) ? Number(searchParams.pageSize) : 10

  const category =
    searchParams.category && categories.some((cat) => cat.name === searchParams.category)
      ? searchParams.category
      : categories[0].name ?? ''

  const search = searchParams.search ?? ''

  if (
    (category && searchParams.category !== category) ||
    !isValidNumber(searchParams.page) ||
    !isValidNumber(searchParams.pageSize) ||
    searchParams.search !== search
  ) {
    return redirect(`/products?page=${page}&pageSize=${pageSize}&category=${category}&search=${search}`)
  }

  const queryClient = new QueryClient(queryClientConfig)

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [CacheKeys.PRODUCTS, { page, pageSize, search, category }],
      queryFn: () =>
        getProducts({
          page,
          pageSize,
          search,
          category
        })
    }),
    queryClient.prefetchQuery({
      queryKey: [CacheKeys.CATEGORIES],
      queryFn: () => getCategories()
    })
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList initialCategory={category} />
      </Suspense>
    </HydrationBoundary>
  )
}
