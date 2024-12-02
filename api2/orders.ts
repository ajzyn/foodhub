import fetchFromApi from '@/lib/fetchFromAPI'
import { PaginatedResponse, PaginationRequestParams } from '@/types/pagination'
import { Order } from '@prisma/client'

// export async function createOrder(product: Product): Promise<Order> {
//   const response = await fetchFromApi('/products', {
//     method: 'POST',
//     body: JSON.stringify(product)
//   })
//   return response.data
// }

export async function getOrderById(id: string): Promise<Order> {
  const response = await fetchFromApi(`/products/${id}`)
  return response.data
}

export async function getOrders(paginationParams: PaginationRequestParams): Promise<PaginatedResponse<Order>> {
  const queryString = new URLSearchParams({
    page: paginationParams.page?.toString() ?? '1',
    pageSize: paginationParams.pageSize?.toString() ?? '10',
    search: paginationParams.search ?? ''
  }).toString()

  const urlWithParams = `/orders?${queryString}`

  const response = await fetchFromApi(urlWithParams)
  return { data: response.data, pagination: response.pagination }
}
