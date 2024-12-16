import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type Validator<T> = (value: T | null | undefined, initialValue?: T) => T | null

interface FilterConfig<T> {
  initialValue?: T
  validator?: Validator<T>
}

interface UseTableFiltersProps<T> {
  delayMs?: number
  updateUrl?: boolean
  filters?: Partial<{
    [K in keyof T]: FilterConfig<T[K]>
  }>
}

interface TableParams {
  page: number
  pageSize: number
  search: string
}

export const useTableFilters = <T extends { page?: number; pageSize?: number }>({
  delayMs = 1000,
  updateUrl = true,
  filters = {} as { [K in keyof T]: FilterConfig<T[K]> }
}: UseTableFiltersProps<T> = {}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const defaultValidators: { [key: string]: Validator<any> } = {
    page: (value) => {
      const parsedPage = parseInt(String(value), 10)
      return isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage
    },
    pageSize: (value) => {
      const parsedPageSize = parseInt(String(value), 10)
      return isNaN(parsedPageSize) || parsedPageSize < 1 ? 10 : parsedPageSize
    }
  }

  const validateFilters = () => {
    const validatedFilters: Partial<T> = {}

    const page = defaultValidators.page(searchParams.get('page'), filters.page?.initialValue ?? 1)
    const pageSize = defaultValidators.pageSize(searchParams.get('pageSize'), filters.pageSize?.initialValue ?? 10)

    Object.keys(filters).forEach((key) => {
      if (key !== 'page' && key !== 'pageSize') {
        const filterConfig = filters[key as keyof T]
        const validator = filterConfig?.validator || ((value) => value)
        const urlValue = searchParams.get(key)

        validatedFilters[key as keyof T] = validator(urlValue as T[keyof T], filterConfig?.initialValue) as T[keyof T]
      }
    })

    return {
      page,
      pageSize,
      filters: validatedFilters
    }
  }

  const { page, pageSize, filters: validatedFilters } = validateFilters()

  const [tableParams, setTableParams] = useState<TableParams>({
    page,
    pageSize,
    search: searchParams.get('search') || ''
  })

  const [additionalFilters, setAdditionalFilters] = useState<T>(validatedFilters as T)

  const updateUrlParams = (params: Record<string, string | number | undefined>) => {
    if (!updateUrl) return

    const current = new URLSearchParams(Array.from(searchParams.entries()))

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        current.set(key, String(value))
      } else {
        current.delete(key)
      }
    })

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  const debouncedUpdateParams = debounce(updateUrlParams, delayMs)

  useEffect(() => {
    const allParams = {
      ...tableParams,
      ...additionalFilters
    }

    debouncedUpdateParams(allParams)

    return () => {
      debouncedUpdateParams.cancel()
    }
  }, [tableParams, additionalFilters, debouncedUpdateParams])

  const setSearch = (search: string) => {
    setTableParams((prev) => ({
      ...prev,
      search,
      page: 1
    }))
  }

  const setPage = (page: number) => {
    setTableParams((prev) => ({ ...prev, page }))
  }

  const setPageSize = (pageSize: number) => {
    setTableParams((prev) => ({
      ...prev,
      pageSize,
      page: 1
    }))
  }

  const setFilter = (key: keyof T, value: string | number | null) => {
    setAdditionalFilters((prev) => {
      const newFilters = { ...prev }
      const filterConfig = filters[key]

      if (value === null) {
        delete newFilters[key]
      } else {
        const validator = filterConfig?.validator || ((v) => v)
        newFilters[key as keyof T] = validator(value as T[keyof T], filterConfig?.initialValue) as T[keyof T]
      }

      return newFilters
    })

    setTableParams((prev) => ({ ...prev, page: 1 }))
  }

  return {
    tableParams,
    additionalFilters,
    setSearch,
    setPage,
    setPageSize,
    setFilter
  }
}
