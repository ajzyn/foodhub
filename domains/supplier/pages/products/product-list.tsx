'use client'

import { Edit, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api2/products'
import { CacheKeys } from '@/api2/cache-keys'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category, Product } from '@prisma/client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMedia } from '@/hooks/use-media'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import TableWithPagination from '@/components/table-with-pagination'

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
  const searchParams = useSearchParams()
  const { isSmall } = useMedia()
  const router = useRouter()
  const category = searchParams.get('category') as Category

  const page = parseInt(searchParams.get('page') ?? '1')
  const pageSize = parseInt(searchParams.get('pageSize') ?? '10')
  const search = searchParams.get('search') ?? ''

  const { data, isFetching, error } = useQuery({
    queryKey: [CacheKeys.PRODUCTS, { page, pageSize }, search, category],
    queryFn: () => getProducts(category, { page, pageSize, search })
  })

  const handleCategoryChange = (category: string) => {
    router.push(`/products?category=${category}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Produkty</h1>

      <div className="mb-4 flex justify-between sm:items-center flex-col-reverse sm:flex-row items-end">
        <div className="flex rounded-md shadow-sm w-full sm:max-w-md">
          <Input
            type="text"
            placeholder="Szukaj produktów..."
            className="flex-1 rounded-none rounded-l-md focus-visible:ring-0 focus-visible:border-2"
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
          <Button {...(!isSmall && { title: 'Dodaj produkt' })}>
            <span className="hidden sm:inline">Dodaj produkt</span> <Plus className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="my-8">
        {isSmall ? (
          <Tabs value={category} onValueChange={handleCategoryChange}>
            <TabsList className="grid w-full grid-cols-4">
              {Object.values(Category).map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Kategoria</p>
            <Select value={category} onValueChange={handleCategoryChange}>
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
        )}
      </div>

      <TableWithPagination
        columns={columns}
        data={data?.data ?? []}
        pagination={{
          page,
          pageSize,
          totalPages: data?.pagination.totalPages ?? 1
        }}
      />
    </div>
  )
}
