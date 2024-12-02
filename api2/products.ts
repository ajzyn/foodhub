import fetchFromApi from '@/lib/fetchFromAPI'
import { PaginationRequestParams } from '@/types/pagination'
import { PaginatedResponse } from '@/types/pagination'
import { Category, Product } from '@prisma/client'

export async function addProduct(product: Product): Promise<Product> {
  const response = await fetchFromApi('/products', {
    method: 'POST',
    body: JSON.stringify(product)
  })
  return response.data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetchFromApi(`/products/${id}`)
  return response.data
}

export async function getProducts(
  category: Category,
  paginationParams: PaginationRequestParams
): Promise<PaginatedResponse<Product>> {
  const queryString = new URLSearchParams({
    page: paginationParams.page?.toString() ?? '1',
    pageSize: paginationParams.pageSize?.toString() ?? '10',
    search: paginationParams.search ?? '',
    category: category
  }).toString()

  const urlWithParams = `/products?${queryString}`

  const response = await fetchFromApi(urlWithParams)
  return { data: response.data, pagination: response.pagination }
}
