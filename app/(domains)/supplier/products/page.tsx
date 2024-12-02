import { CacheKeys } from '@/api2/cache-keys'
import { getProducts } from '@/api2/products'
import ProductList from '@/domains/supplier/pages/products/product-list'
import { Category } from '@prisma/client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

interface ProductsPageProps {
  searchParams: {
    page?: number
    pageSize?: number
    search?: string
    category: Category
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  if (!Object.values(Category).includes(searchParams.category?.toUpperCase() as Category)) {
    return redirect(`/products?category=${Category.MEAT}`)
  }

  const page = searchParams.page ?? 1
  const pageSize = searchParams.pageSize ?? 10
  const search = searchParams.search ?? ''

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [CacheKeys.PRODUCTS, { page, pageSize }, search, searchParams.category],
    queryFn: () => getProducts(searchParams.category, { page, pageSize, search })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  )
}
