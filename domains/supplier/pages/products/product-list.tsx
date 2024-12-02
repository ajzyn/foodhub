'use client'

import { Edit, Plus, Trash2 } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api2/products'
import { CacheKeys } from '@/api2/cache-keys'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProductGrid from './product-grid'
import { useMedia } from '@/hooks/use-media'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ProductList() {
  const searchParams = useSearchParams()
  const { isSmall } = useMedia()
  const router = useRouter()
  const category = searchParams.get('category') as Category

  const { data: products } = useQuery({
    queryKey: [CacheKeys.PRODUCTS, category],
    queryFn: () => getProducts(category)
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

      <ProductGrid products={products ?? []} />
    </div>
  )
}
