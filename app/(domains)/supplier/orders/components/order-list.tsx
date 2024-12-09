'use client'

import { CacheKeys } from '@/api/cache-keys'
import { getOrders } from '@/api/orders'
import TableWithPagination from '@/components/table-with-pagination'
import { Button } from '@/components/ui/button'
import { useTableFilters } from '@/hooks/use-table-filters'
import { Plus, Search } from 'lucide-react'
import { Link } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'

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
  const {
    tableParams: { page, pageSize, search },
    setSearch,
    setPage,
    setPageSize
  } = useTableFilters()

  const { data, isFetching, error } = useQuery({
    queryKey: [CacheKeys.ORDERS, { page, pageSize }, search],
    queryFn: () => getOrders({ page, pageSize, search })
  })

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Zamówienia</h1>

      <div className="mb-4 flex justify-between sm:items-center flex-col-reverse sm:flex-row items-end">
        <div className="flex rounded-md shadow-sm w-full sm:max-w-md">
          <Input
            type="text"
            placeholder="Szukaj zamówień..."
            className="flex-1 rounded-none rounded-l-md focus-visible:ring-0 focus-visible:border-2"
            value={search}
            onChange={handleSearchChange}
          />
          <Button
            type="button"
            className="-ml-px relative inline-flex items-center rounded-l-none rounded-r-md outline-none"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Szukaj</span>
          </Button>
        </div>
      </div>

      <TableWithPagination
        columns={columns}
        data={data?.data ?? []}
        pagination={{
          page,
          pageSize,
          totalPages: data?.pagination.totalPages ?? 1,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange
        }}
      />
    </div>
  )
}
