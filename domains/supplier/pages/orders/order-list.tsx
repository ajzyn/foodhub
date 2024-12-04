'use client'

import { CacheKeys } from '@/api/cache-keys'
import { getOrders } from '@/api/orders'
import TableWithPagination from '@/components/table-with-pagination'
import { parseNumberWithDefault } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const columns = [
  {
    header: 'ID',
    accessorKey: 'id' as const
  },
  {
    header: 'Restauracja',
    accessorKey: 'restaurantId' as const
  },
  {
    header: 'Status',
    accessorKey: 'status' as const
  },
  {
    header: 'Data zamówienia',
    accessorKey: 'orderDate' as const
  },
  {
    header: 'Łączna kwota',
    accessorKey: 'totalAmount' as const
  }
]

export default function OrderList() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = parseNumberWithDefault(searchParams.get('page'), 1)
  const pageSize = parseNumberWithDefault(searchParams.get('pageSize'), 10)
  const search = searchParams.get('search') || ''

  const { data, isFetching, error } = useQuery({
    queryKey: [CacheKeys.ORDERS, { page, pageSize }, search],
    queryFn: () => getOrders({ page, pageSize, search })
  })

  return null
  // <TableWithPagination
  //   columns={columns}
  //   data={data?.data ?? []}
  //   pagination={{
  //     page,
  //     pageSize,
  //     totalPages: data?.pagination.totalPages ?? 1
  //   }}
  // />
}
