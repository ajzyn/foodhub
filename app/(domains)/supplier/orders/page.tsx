import { CacheKeys } from '@/api/cache-keys'
import { getOrders } from '@/api/orders'
import OrderList from '@/domains/supplier/pages/orders/order-list'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

interface OrdersPageProps {
  searchParams: {
    page: number
    pageSize: number
    search: string
  }
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const page = searchParams.page ?? 1
  const pageSize = searchParams.pageSize ?? 10
  const search = searchParams.search ?? ''

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [CacheKeys.ORDERS, { page, pageSize }, search],
    queryFn: () => getOrders({ page, pageSize, search })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderList />
    </HydrationBoundary>
  )
}
