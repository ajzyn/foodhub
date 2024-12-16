import { ResponseParams } from './response'

export interface PaginationRequestParams {
  page?: number
  pageSize?: number
  search?: string
  [key: string]: any
}

export interface PaginationDBParams {
  page: number
  pageSize: number
  search: string
}

export interface PaginatedResponse<T> extends Omit<ResponseParams<T>, 'data'> {
  data?: T[]
  pagination?: {
    currentPage: number
    pageSize: number
    totalPages: number
    totalItems: number
  }
}
