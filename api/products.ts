import fetchFromApi from '@/lib/fetch-from-api'
import { PaginationRequestParams } from '@/types/pagination'
import { PaginatedResponse } from '@/types/pagination'
import { Category, Product } from '@prisma/client'

export async function addProduct(product: Product) {
  return await fetchFromApi<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(product)
  })
}

export async function getProductById(id: string) {
  return await fetchFromApi<Product>(`/products/${id}`)
}

export async function getProducts(category: Category, paginationParams: PaginationRequestParams) {
  const queryString = new URLSearchParams({
    page: paginationParams.page?.toString() ?? '1',
    pageSize: paginationParams.pageSize?.toString() ?? '10',
    search: paginationParams.search ?? '',
    category: category
  }).toString()

  const urlWithParams = `/products?${queryString}`

  return await fetchFromApi<PaginatedResponse<Product>>(urlWithParams)
}
