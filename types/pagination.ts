export interface PaginationRequestParams {
  page?: number | string
  pageSize?: number | string
  search?: string
  [key: string]: any
}

export interface PaginationDBParams {
  page: number
  pageSize: number
  search: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    currentPage: number
    pageSize: number
    totalPages: number
    totalItems: number
  }
}
