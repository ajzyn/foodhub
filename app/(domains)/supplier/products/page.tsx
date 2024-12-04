import { CacheKeys } from '@/api/cache-keys'
import { getProducts } from '@/api/products'
import ProductList from '@/domains/supplier/pages/products/product-list'
import { isValidNumber } from '@/lib/utils'
import { Category } from '@prisma/client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

interface ProductsPageProps {
  searchParams: {
    page?: string
    pageSize?: string
    search?: string
    category: Category
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  if (!Object.values(Category).includes(searchParams.category?.toUpperCase() as Category)) {
    return redirect(`/products?category=${Category.MEAT}`)
  }

  if (!isValidNumber(searchParams.page) || !isValidNumber(searchParams.pageSize)) {
    return redirect(`/products?category=${searchParams.category}&page=1&pageSize=10`)
  }

  const search = searchParams.search ?? ''

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [
      CacheKeys.PRODUCTS,
      { page: searchParams.page, pageSize: searchParams.pageSize },
      search,
      searchParams.category
    ],
    queryFn: () =>
      getProducts(searchParams.category, {
        page: Number(searchParams.page),
        pageSize: Number(searchParams.pageSize),
        search
      })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  )
}
