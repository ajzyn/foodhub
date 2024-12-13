import { CacheKeys } from '@/api/cache-keys'
import { getProducts } from '@/api/products'
import ProductList from '@/app/(domains)/supplier/products/components/product-list'
import { getCategories } from '@/server/db/products'
import { isValidNumber } from '@/utils/numbers'
import { Category } from '@prisma/client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

interface ProductsPageProps {
  searchParams: {
    page?: string
    pageSize?: string
    search?: string
    category: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const categories = await getCategories()

  if (!categories.find((category) => category.name === searchParams.category)) {
    return redirect(`/products?category=${categories[0].name}`)
  }

  if (!isValidNumber(searchParams.page) || !isValidNumber(searchParams.pageSize)) {
    return redirect(`/products?category=${searchParams.category}&page=1&pageSize=10`)
  }

  const search = searchParams.search ?? ''

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [
      CacheKeys.PRODUCTS,
      { page: searchParams.page, pageSize: searchParams.pageSize, search, category: searchParams.category }
    ],
    queryFn: () =>
      getProducts({
        page: Number(searchParams.page),
        pageSize: Number(searchParams.pageSize),
        search,
        category: searchParams.category
      })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList categories={categories} />
    </HydrationBoundary>
  )
}
