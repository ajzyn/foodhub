import fetchFromApi from '@/lib/fetch-from-api'
import { PaginatedResponse, PaginationRequestParams } from '@/types/pagination'
import { Order } from '@prisma/client'

// export async function createOrder(product: Product): Promise<Order> {
//   const response = await fetchFromApi('/products', {
//     method: 'POST',
//     body: JSON.stringify(product)
//   })
//   return response.data
// }

export async function getOrderById(id: string) {
  return await fetchFromApi<Order>(`/products/${id}`)
}

export async function getOrders(paginationParams: PaginationRequestParams) {
  const queryString = new URLSearchParams({
    page: paginationParams.page?.toString() ?? '1',
    pageSize: paginationParams.pageSize?.toString() ?? '10',
    search: paginationParams.search ?? ''
  }).toString()

  const urlWithParams = `/orders?${queryString}`

  return await fetchFromApi<PaginatedResponse<Order>>(urlWithParams)
}
