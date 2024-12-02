import { CacheKeys } from '@/api2/cache-keys'
import { getProducts } from '@/api2/products'
import ProductList from '@/domains/supplier/pages/products/product-list'
import { Category } from '@prisma/client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

export default async function ProductsPage({ searchParams }: { searchParams: { category: Category } }) {
  if (!Object.values(Category).includes(searchParams.category?.toUpperCase() as Category)) {
    return redirect(`/products?category=${Category.MEAT}`)
  }
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [CacheKeys.PRODUCTS, searchParams.category],
    queryFn: () => getProducts(searchParams.category)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  )
}
