'use client'

import { Edit, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/products'
import { Category, Product } from '@prisma/client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import TableWithPagination from '@/components/table-with-pagination'
import { useTableFilters } from '@/hooks/use-table-filters'

const columns = [
  {
    header: 'Nazwa',
    accessorKey: 'name' as const
  },
  {
    header: 'Cena',
    accessorKey: 'price' as const
  },
  {
    header: 'Stan',
    accessorKey: 'stock' as const
  },
  {
    header: '',
    cell: (product: Product) => (
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" className="hover:text-info">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }
]

export default function ProductList() {
  const {
    tableParams: { page, pageSize, search },
    additionalFilters: { category },
    setSearch,
    setPage,
    setPageSize,
    setFilter
  } = useTableFilters<{ category: Category }>({
    initialFilters: {
      category: Category.MEAT
    }
  })

  const { data, isFetching } = useQuery({
    queryKey: ['products', { page, pageSize }, search, category],
    queryFn: () =>
      getProducts({
        page,
        pageSize,
        search,
        category
      })
  })

  const handleCategoryChange = (category: string) => {
    setFilter('category', category)
  }

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
      <h1 className="text-3xl font-bold mb-6">Produkty</h1>

      <div className="mb-4 flex justify-between sm:items-center flex-col-reverse sm:flex-row items-end">
        <div className="flex rounded-md shadow-sm w-full sm:max-w-md">
          <Input
            type="text"
            placeholder="Szukaj produktów..."
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
        <Link href={`/products/create?category=${category}`} className="mb-4 sm:mb-0 ml-2">
          <Button>
            <span className="hidden sm:inline">Dodaj produkt</span> <Plus className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="my-8">
        <Tabs className="sm:hidden" value={category as string} onValueChange={handleCategoryChange}>
          <TabsList className="grid w-full grid-cols-4">
            {Object.values(Category).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="hidden sm:block">
          <p className="text-sm text-muted-foreground mb-2">Kategoria</p>
          <Select value={category as string} onValueChange={handleCategoryChange}>
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Wybierz kategorię" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Category).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
